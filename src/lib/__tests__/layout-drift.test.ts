/**
 * Guards against positional drift.
 *
 * Column packing is memoized across a band of zoom, so it runs at one ppy and
 * is reused at neighbouring ones. If the layout stored pixels, every marker
 * would slide off its date until the next repack. It stores years instead, and
 * the renderer resolves them with the scale of the frame. These tests pin that
 * property: a reused layout must place every marker exactly where a layout
 * built at that ppy would place it.
 */

import { describe, expect, it } from "vitest";
import {
  computeLayout,
  resolveLayout,
  visibleImportance,
  zoomBucketOf,
  type LayoutConfig,
} from "../layout";
import { clampPpy, MAX_PPY, MIN_PPY, TimeScale } from "../scale";
import { NOW_YEAR } from "../data";

const base: Omit<LayoutConfig, "ppy"> = {
  topYear: NOW_YEAR,
  compact: false,
  lanesOff: [],
  minImportance: 1,
  regionsOn: null,
};

/** Deterministic PRNG so a failure is always reproducible. */
function rng(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0x100000000;
  };
}

/** Screen y for every item/cluster, keyed by record id, as the canvas paints it. */
function positions(cfg: LayoutConfig, renderPpy: number) {
  const layout = computeLayout(cfg);
  const scale = new TimeScale(renderPpy, NOW_YEAR);
  const r = resolveLayout(layout, scale);
  const out = new Map<string, { yTop: number; yBottom: number; x: number }>();
  for (const i of r.items)
    out.set(i.record.id, { yTop: i.yTop, yBottom: i.yBottom, x: i.x });
  for (const c of r.clusters)
    out.set(c.key, { yTop: c.y, yBottom: c.y, x: c.x });
  return out;
}

describe("layout carries no stale pixels", () => {
  it("never exposes a pixel field on a layout item", () => {
    const layout = computeLayout({ ...base, ppy: 2.6 });
    expect(layout.items.length).toBeGreaterThan(50);
    for (const i of layout.items.slice(0, 40)) {
      expect(i).not.toHaveProperty("yTop");
      expect(i).not.toHaveProperty("yBottom");
      expect(Number.isFinite(i.yearTop)).toBe(true);
      expect(Number.isFinite(i.yearBottom)).toBe(true);
    }
    for (const c of layout.clusters.slice(0, 20)) {
      expect(c).not.toHaveProperty("y");
      expect(Number.isFinite(c.midYear)).toBe(true);
    }
  });

  it("places markers identically whether packed at the render ppy or reused", () => {
    const rand = rng(20260918);
    let worst = 0;
    let compared = 0;
    for (let trial = 0; trial < 240; trial++) {
      // a packing ppy anywhere in range, and a render ppy up to a full zoom
      // bucket away in either direction (a bucket is exp(1/4) wide)
      // Two zoom levels inside one bucket: exactly the case where a memoized
      // layout gets reused instead of repacked. Crossing a bucket repacks in
      // the app too, so it is not the case under test.
      const bucket =
        Math.ceil(Math.log(MIN_PPY) * 4) +
        Math.floor(rand() * (Math.floor(Math.log(MAX_PPY) * 4) - Math.ceil(Math.log(MIN_PPY) * 4)));
      const inBucket = (t: number) => clampPpy(Math.exp((bucket + t) / 4));
      const packPpy = inBucket(rand() - 0.5);
      const renderPpy = inBucket(rand() - 0.5);
      // A visibility threshold inside the bucket changes which records exist,
      // which the app treats as a repack too (it is in the memo key).
      if (
        zoomBucketOf(packPpy) !== zoomBucketOf(renderPpy) ||
        visibleImportance(packPpy) !== visibleImportance(renderPpy)
      )
        continue;

      const reused = positions({ ...base, ppy: packPpy }, renderPpy);
      const fresh = positions({ ...base, ppy: renderPpy }, renderPpy);
      for (const [id, p] of fresh) {
        const q = reused.get(id);
        if (!q) continue; // a different bucket may show a different record set
        compared++;
        worst = Math.max(
          worst,
          Math.abs(p.yTop - q.yTop),
          Math.abs(p.yBottom - q.yBottom),
          Math.abs(p.x - q.x),
        );
      }
    }
    expect(compared).toBeGreaterThan(10000);
    console.log(
      `drift unit test: ${compared} marker positions compared across reused layouts, max error ${worst.toFixed(6)} px`,
    );
    expect(worst).toBeLessThan(0.5);
  });

  it("puts every marker on its own year on the axis", () => {
    const rand = rng(7);
    let worst = 0;
    for (let trial = 0; trial < 60; trial++) {
      const ppy = clampPpy(
        Math.exp(
          Math.log(MIN_PPY) + rand() * (Math.log(MAX_PPY) - Math.log(MIN_PPY)),
        ),
      );
      const layout = computeLayout({ ...base, ppy: ppy * 1.1 });
      const scale = new TimeScale(ppy, NOW_YEAR);
      for (const i of resolveLayout(layout, scale).items) {
        // reading the axis back at the marker's pixel must return its year
        worst = Math.max(worst, Math.abs(scale.yearOf(i.yTop) - i.yearTop));
      }
    }
    expect(worst).toBeLessThan(1e-6);
  });
});

/**
 * Timeline layout engine.
 *
 * Turns records into positioned markers around the central line:
 * - LEFT (power): battles · states (bands) · wider world
 * - LINE (origin): the Prophetic era ﷺ
 * - RIGHT (knowledge): books · institutions · people (bars) · movements
 *
 * Columns are packed per lane group so items never overlap vertically at the
 * current zoom; lower-importance items appear as you zoom in (or through the
 * hover lens).
 */

import { getAllRecords, getSpan, NOW_YEAR } from "./data";
import { TimeScale } from "./scale";
import type { LaneId, TimelineRecord } from "./types";

export type MarkerShape =
  | "sirah"
  | "battle"
  | "book"
  | "institution"
  | "personBar"
  | "stateBand"
  | "worldBand"
  | "worldDot"
  | "thread"
  | "dot";

export interface PositionedItem {
  record: TimelineRecord;
  shape: MarkerShape;
  /** x offset from the central line, px */
  x: number;
  /**
   * Year at the recent end (top) of the marker. Deliberately a YEAR and not a
   * pixel: packing is memoized across a zoom bucket, so any pixel stored here
   * would be stale the moment ppy moved inside that bucket. Every on-screen
   * position is derived from the scale that is rendering the frame, in
   * `resolveLayout`/`itemsInWindow`.
   */
  yearTop: number;
  /** Year at the older end (bottom); equals yearTop for points. */
  yearBottom: number;
  point: boolean;
  startApprox: boolean;
  endApprox: boolean;
  ongoing: boolean;
  column: number;
  side: -1 | 0 | 1;
}

export interface ClusterItem {
  key: string;
  x: number;
  side: -1 | 0 | 1;
  records: TimelineRecord[];
  /** Year at the cluster centre. Resolved to pixels at render time. */
  midYear: number;
}

export interface LayoutResult {
  items: PositionedItem[];
  clusters: ClusterItem[];
  /** The ppy the column packing was computed at (diagnostics and tests). */
  packedAtPpy: number;
}

/** A layout item with pixels resolved against one specific scale. */
export type ResolvedItem = PositionedItem & { yTop: number; yBottom: number };
/** A cluster with pixels resolved against one specific scale. */
export type ResolvedCluster = ClusterItem & { y: number };

export interface ResolvedLayout {
  items: ResolvedItem[];
  clusters: ResolvedCluster[];
}

export interface LayoutConfig {
  ppy: number;
  topYear: number;
  compact: boolean; // mobile
  lanesOff: LaneId[];
  minImportance: number;
  regionsOn: string[] | null;
}

/**
 * Packing is memoized across a band of zoom, so it must not depend on where
 * inside that band the zoom happened to be when the memo was filled. Snapping
 * the packing scale to the band's own value makes the layout a pure function of
 * the memo key: the same view reached by scrolling, by pinching, or by opening
 * its link is laid out identically.
 */
export const ZOOM_BUCKETS_PER_E = 4;

export function zoomBucketOf(ppy: number): number {
  return Math.round(Math.log(ppy) * ZOOM_BUCKETS_PER_E);
}

/** The one scale a whole zoom bucket packs at. */
export function packingPpy(ppy: number): number {
  return Math.exp(zoomBucketOf(ppy) / ZOOM_BUCKETS_PER_E);
}

/** Importance needed for a marker to exist at this zoom. */
export function visibleImportance(ppy: number): number {
  if (ppy >= 40) return 1;
  if (ppy >= 12) return 2;
  if (ppy >= 2.2) return 3;
  if (ppy >= 0.9) return 4;
  return 5;
}

/** Month-aware fractional year for on-screen placement (math elsewhere stays integer). */
function yearFrac(d: { year: number; month?: number }): number {
  return d.year + ((d.month ?? 6.5) - 0.5) / 12;
}

/** Importance needed for a persistent label at this zoom. */
export function labelImportance(ppy: number): number {
  return Math.min(visibleImportance(ppy) + 1, 5);
}

interface SlotSpec {
  shape: MarkerShape;
  side: -1 | 0 | 1;
  base: number; // px from center
  step: number; // px between columns
  maxCols: number;
  point: boolean;
}

function slotFor(r: TimelineRecord, compact: boolean): SlotSpec | null {
  const m = compact ? 0.62 : 1;
  switch (r.lane) {
    case "sirah":
      // The Prophet's ﷺ lifespan renders as a bar on the central line itself;
      // sīra events, and the earlier prophets عليهم السلام, whose lifespans are
      // not dated, sit on the line as ringed points.
      if (r.kind === "person" && r.start.year >= 500)
        return {
          shape: "personBar",
          side: 1,
          base: 0,
          step: 0,
          maxCols: 1,
          point: false,
        };
      if (r.kind === "person" && r.end)
        return {
          shape: "personBar",
          side: 1,
          base: 0,
          step: 0,
          maxCols: 1,
          point: false,
        }; // ʿĪsā-era spans
      return {
        shape: "sirah",
        side: 0,
        base: 0,
        step: 0,
        maxCols: 1,
        point: true,
      };
    case "battles":
      return {
        shape: "battle",
        side: -1,
        base: -54 * m,
        step: 16 * m,
        maxCols: 2,
        point: true,
      };
    case "states":
      if (r.kind === "person")
        return {
          shape: "personBar",
          side: -1,
          base: -86 * m,
          step: 12 * m,
          maxCols: 2,
          point: false,
        };
      return {
        shape: "stateBand",
        side: -1,
        base: -110 * m,
        step: 32 * m,
        maxCols: compact ? 3 : 6,
        point: false,
      };
    case "world":
      return r.kind === "empire"
        ? {
            shape: "worldBand",
            side: -1,
            base: -318 * m - (compact ? 26 : 0),
            step: 18 * m,
            maxCols: 3,
            point: false,
          }
        : {
            shape: "worldDot",
            side: -1,
            base: -304 * m - (compact ? 26 : 0),
            step: 14 * m,
            maxCols: 2,
            point: true,
          };
    case "books":
      return {
        shape: "book",
        side: 1,
        base: 50 * m,
        step: 15 * m,
        maxCols: 2,
        point: true,
      };
    case "companions":
    case "scholars":
    case "science":
    case "culture":
      if (
        r.kind === "movement" ||
        (r.kind === "institution" && r.ongoing && r.lane === "scholars")
      )
        return {
          shape: "thread",
          side: 1,
          base: 236 * m,
          step: 21 * m,
          maxCols: compact ? 3 : 5,
          point: false,
        };
      if (r.kind === "person")
        return {
          shape: "personBar",
          side: 1,
          base: 108 * m,
          step: 30 * m,
          maxCols: compact ? 4 : 6,
          point: false,
        };
      if (r.kind === "institution" || r.kind === "place")
        return {
          shape: "institution",
          side: 1,
          base: 80 * m,
          step: 15 * m,
          maxCols: 2,
          point: true,
        };
      // events/books inside knowledge lanes
      return {
        shape: "dot",
        side: 1,
        base: 80 * m,
        step: 15 * m,
        maxCols: 2,
        point: true,
      };
    default:
      return null;
  }
}

/**
 * Greedy interval packing into columns. Items must be sorted by yTop.
 * Returns -1 (drop) for low-importance overflow rather than overlapping.
 */
function pack(
  items: { yTop: number; yBottom: number; imp: number }[],
  pad: number,
  maxCols: number,
): number[] {
  const colEnds: number[] = [];
  return items.map((it) => {
    for (let c = 0; c < colEnds.length; c++) {
      if (it.yTop > colEnds[c] + pad) {
        colEnds[c] = it.yBottom;
        return c;
      }
    }
    if (colEnds.length < maxCols) {
      colEnds.push(it.yBottom);
      return colEnds.length - 1;
    }
    if (it.imp < 4) return -1; // hide quiet items instead of overlapping
    let best = 0;
    for (let c = 1; c < colEnds.length; c++)
      if (colEnds[c] < colEnds[best]) best = c;
    colEnds[best] = Math.max(colEnds[best], it.yBottom);
    return best;
  });
}

export function computeLayout(cfg: LayoutConfig): LayoutResult {
  const packPpy = packingPpy(cfg.ppy);
  const scale = new TimeScale(packPpy, cfg.topYear);
  const minVis = Math.max(visibleImportance(cfg.ppy), cfg.minImportance);
  const records = getAllRecords().filter((r) => {
    if (cfg.lanesOff.includes(r.lane)) return false;
    if (cfg.regionsOn && !cfg.regionsOn.includes(r.region)) return false;
    // sirah stays visible longer: it is the origin of the whole instrument
    const floor = r.lane === "sirah" ? Math.min(minVis, 4) : minVis;
    return r.importance >= floor;
  });

  // group records by slot signature
  const groups = new Map<string, { spec: SlotSpec; recs: TimelineRecord[] }>();
  for (const r of records) {
    const spec = slotFor(r, cfg.compact);
    if (!spec) continue;
    const key = `${spec.shape}:${spec.side}:${spec.base}`;
    if (!groups.has(key)) groups.set(key, { spec, recs: [] });
    groups.get(key)!.recs.push(r);
  }

  const items: PositionedItem[] = [];
  const clusters: ClusterItem[] = [];

  for (const { spec, recs } of groups.values()) {
    const positioned = recs
      .map((r) => {
        const span = getSpan(r);
        // points anchor at their START (founding/occurrence), month-aware;
        // spans run from end (recent, top) down to start (old, bottom).
        const startYear = Math.min(yearFrac(r.start), NOW_YEAR);
        const endYear = r.ongoing
          ? NOW_YEAR
          : r.end
            ? yearFrac(r.end)
            : span.end;
        const yearTop = spec.point
          ? startYear
          : Math.min(endYear, NOW_YEAR);
        const yearBottom = startYear;
        // Pixels here exist only to drive the packing/clustering decisions at
        // this one ppy. They never leave this function.
        return {
          r,
          span,
          yearTop,
          yearBottom,
          yTop: scale.yOf(yearTop),
          yBottom: scale.yOf(yearBottom),
          imp: r.importance,
        };
      })
      .sort((a, b) => a.yTop - b.yTop);

    if (spec.point) {
      // cluster nearby points in the same slot
      const CLUSTER_PX = 15;
      let bucket: typeof positioned = [];
      const flush = () => {
        if (bucket.length === 0) return;
        if (bucket.length === 1 || bucket.some((b) => b.r.importance >= 5)) {
          // emit individually (importance-5 markers resist clustering)
          for (const b of bucket) {
            items.push({
              record: b.r,
              shape: spec.shape,
              x: spec.base + spec.side * 0,
              yearTop: b.yearTop,
              yearBottom: b.yearBottom,
              point: true,
              startApprox: b.span.startApprox,
              endApprox: b.span.endApprox,
              ongoing: b.r.ongoing ?? false,
              column: 0,
              side: spec.side,
            });
          }
        } else {
          const midY = bucket.reduce((s, b) => s + b.yTop, 0) / bucket.length;
          const midYear = scale.yearOf(midY);
          clusters.push({
            key: `${spec.shape}:${midYear.toFixed(3)}`,
            x: spec.base,
            side: spec.side,
            records: bucket.map((b) => b.r),
            midYear,
          });
        }
        bucket = [];
      };
      for (const p of positioned) {
        if (
          bucket.length > 0 &&
          p.yTop - bucket[bucket.length - 1].yTop < CLUSTER_PX
        )
          bucket.push(p);
        else {
          flush();
          bucket = [p];
        }
      }
      flush();
    } else {
      const pad = spec.shape === "thread" ? 4 : 14;
      const cols = pack(positioned, pad, spec.maxCols);
      positioned.forEach((p, i) => {
        if (cols[i] < 0) return; // dropped overflow
        items.push({
          record: p.r,
          shape: spec.shape,
          x: spec.base + spec.side * cols[i] * spec.step,
          yearTop: p.yearTop,
          yearBottom: p.yearBottom,
          point: false,
          startApprox: p.span.startApprox,
          endApprox: p.span.endApprox,
          ongoing: p.r.ongoing ?? false,
          column: cols[i],
          side: spec.side,
        });
      });
    }
  }

  return { items, clusters, packedAtPpy: packPpy };
}

/** Resolve every stored year into pixels on `scale`. The only pixel source. */
export function resolveLayout(
  layout: LayoutResult,
  scale: TimeScale,
): ResolvedLayout {
  return {
    items: layout.items.map((i) => ({
      ...i,
      yTop: scale.yOf(i.yearTop),
      yBottom: scale.yOf(i.yearBottom),
    })),
    clusters: layout.clusters.map((c) => ({ ...c, y: scale.yOf(c.midYear) })),
  };
}

/**
 * Records whose marker or span crosses the given absolute y window, with every
 * position resolved against `scale`. Taking the scale here is what makes it
 * impossible to paint a marker with a pixel from an older zoom.
 */
export function itemsInWindow(
  layout: LayoutResult,
  yMin: number,
  yMax: number,
  scale: TimeScale,
): ResolvedLayout {
  const r = resolveLayout(layout, scale);
  return {
    items: r.items.filter((i) => i.yTop <= yMax && i.yBottom >= yMin),
    clusters: r.clusters.filter((c) => c.y >= yMin && c.y <= yMax),
  };
}

export { NOW_YEAR };

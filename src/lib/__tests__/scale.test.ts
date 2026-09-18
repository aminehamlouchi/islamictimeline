import { describe, expect, it } from "vitest";
import {
  ceTicks,
  clampPpy,
  COMPRESS_PX,
  COMPRESS_START,
  DOMAIN_BOTTOM,
  LINEAR_FLOOR,
  TimeScale,
  zoomAroundYear,
  zoomLevelFor,
} from "../scale";

const TOP = 2026;

describe("TimeScale", () => {
  it("puts the top year at y=0 and grows downward into the past", () => {
    const s = new TimeScale(2, TOP);
    expect(s.yOf(TOP)).toBe(0);
    expect(s.yOf(TOP - 100)).toBe(200);
    expect(s.yOf(1000)).toBeGreaterThan(s.yOf(1500));
  });

  it("keeps ONE uniform scale across the whole dated span, before Islam included", () => {
    const s = new TimeScale(2.6, TOP);
    // equal year gaps must map to equal pixel gaps everywhere above the floor
    const g1 = s.yOf(1300) - s.yOf(1400); // 100 yrs in the Islamic era
    const g2 = s.yOf(-1400) - s.yOf(-1300); // 100 yrs in the era of Musa (BCE)
    expect(g1).toBeCloseTo(g2, 6);
    expect(g1).toBeCloseTo(100 * 2.6, 6);
  });

  it("is invertible across the linear zone", () => {
    const s = new TimeScale(3.7, TOP);
    for (const y of [TOP, 1924, 1258, 622, 570, 1, -622, -1300, LINEAR_FLOOR]) {
      expect(s.yearOf(s.yOf(y))).toBeCloseTo(y, 6);
    }
  });

  it("keeps the undated ordinal cap at a fixed pixel height regardless of zoom", () => {
    const s1 = new TimeScale(1, TOP);
    const s2 = new TimeScale(50, TOP);
    const cap1 = s1.yOf(DOMAIN_BOTTOM) - s1.yOf(COMPRESS_START);
    const cap2 = s2.yOf(DOMAIN_BOTTOM) - s2.yOf(COMPRESS_START);
    expect(cap1).toBeCloseTo(COMPRESS_PX);
    expect(cap2).toBeCloseTo(COMPRESS_PX);
    expect(s1.isCompressed(-4000)).toBe(true); // in the undated prophets' cap
    expect(s1.isCompressed(-1300)).toBe(false); // BCE but dated → honest scale
    expect(s1.isCompressed(-2560)).toBe(false); // the pyramids: dated, honest scale
    expect(s1.isCompressed(632)).toBe(false);
  });

  it("inverts inside the ordinal cap too", () => {
    const s = new TimeScale(2.6, TOP);
    expect(s.yearOf(s.yOf(-4000))).toBeCloseTo(-4000, 4);
    expect(s.yearOf(s.yOf(DOMAIN_BOTTOM))).toBeCloseTo(DOMAIN_BOTTOM, 4);
  });

  it("keeps the anchor year fixed while zooming", () => {
    const center = 1300;
    const anchor = 1187;
    const oldPpy = 2.6;
    const newPpy = 11;
    const newCenter = zoomAroundYear(center, oldPpy, newPpy, anchor);
    // anchor's screen offset before and after must match
    const before = (center - anchor) * oldPpy;
    const after = (newCenter - anchor) * newPpy;
    expect(after).toBeCloseTo(before, 6);
  });

  it("clamps zoom and produces sensible ticks", () => {
    expect(clampPpy(0.0001)).toBeGreaterThan(0.1);
    expect(clampPpy(100000)).toBeLessThan(1000);
    const ticks = ceTicks(2.6, 1200, 1500);
    expect(ticks.length).toBeGreaterThan(3);
    expect(ticks.every((t) => t.year >= 1150 && t.year <= 1501)).toBe(true);
    const majors = ticks.filter((t) => t.major);
    expect(majors.length).toBeGreaterThan(0);
    expect(zoomLevelFor(2.6).id).toBe("century");
    expect(zoomLevelFor(46).id).toBe("year");
  });
});

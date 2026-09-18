import { describe, expect, it } from "vitest";
import {
  getRecord,
  NOW_YEAR,
  contemporariesOf,
  statesActiveIn,
  relationsOf,
} from "../data";
import { describePair, gapYears, overlapYears, spanOf } from "../overlap";
import { observationFor } from "../observations";
import { search } from "../search";
import { parseState, serializeState } from "../urlState";

describe("overlap & comparison sentences (generated, not hardcoded)", () => {
  it("computes the al-Bukhārī → Ibn Taymiyya gap from data", () => {
    const b = getRecord("al-bukhari")!;
    const t = getRecord("ibn-taymiyya")!;
    const gap = gapYears(spanOf(b, NOW_YEAR), spanOf(t, NOW_YEAR));
    expect(gap).toBe(t.start.year - b.end!.year); // 1263 - 870 = 393
    const text = describePair(b, t, NOW_YEAR);
    expect(text).toContain("al-Bukhārī");
    expect(text).toContain(String(gap));
    expect(text).toContain("before");
  });

  it("detects contemporaries: Ibn Taymiyya & Ibn al-Qayyim overlapped", () => {
    const a = getRecord("ibn-taymiyya")!;
    const q = getRecord("ibn-al-qayyim")!;
    const ov = overlapYears(spanOf(a, NOW_YEAR), spanOf(q, NOW_YEAR));
    expect(ov).toBeGreaterThan(30);
    const text = describePair(a, q, NOW_YEAR);
    expect(text.toLowerCase()).toContain("overlap");
  });

  it("describes coexisting empires", () => {
    const text = describePair(
      getRecord("ottoman-empire")!,
      getRecord("safavid-empire")!,
      NOW_YEAR,
    );
    expect(text).toContain("coexisted");
  });

  it("contemporariesOf finds al-Nawawī near Ibn al-Nafīs and Rūmī", () => {
    const ids = contemporariesOf("al-nawawi", { limit: 20 }).map((r) => r.id);
    expect(ids).toContain("ibn-al-nafis");
    expect(ids).toContain("rumi");
  });

  it("statesActiveIn(1550) includes the three gunpowder empires", () => {
    const ids = statesActiveIn(1550).map((s) => s.id);
    for (const want of ["ottoman-empire", "safavid-empire", "mughal-empire"])
      expect(ids).toContain(want);
  });

  it("relations resolve inverses (Ibn Taymiyya wrote the Wāsiṭiyya ⇄ book written_by him)", () => {
    const fromBook = relationsOf("aqida-wasitiyya").map(
      (r) => `${r.type}:${r.record.id}`,
    );
    expect(fromBook).toContain("written_by:ibn-taymiyya");
    const fromAuthor = relationsOf("ibn-taymiyya").map(
      (r) => `${r.type}:${r.record.id}`,
    );
    expect(fromAuthor).toContain("wrote:aqida-wasitiyya");
    expect(fromAuthor).toContain("teacher_of:ibn-al-qayyim");
  });
});

describe("observations", () => {
  it("produces an observation for representative years", () => {
    for (const y of [700, 1000, 1100, 1300, 1550, 1800]) {
      const o = observationFor(y);
      expect(o, `year ${y}`).not.toBeNull();
      expect(o!.text.length).toBeGreaterThan(10);
      expect(o!.ids.length).toBeGreaterThanOrEqual(1);
    }
  });

  it("is deterministic within a 25-year bucket", () => {
    expect(observationFor(1301)!.text).toBe(observationFor(1310)!.text);
  });
});

describe("search", () => {
  it("finds records diacritic-insensitively and by alias", () => {
    expect(search("bukhari").some((r) => r.record?.id === "al-bukhari")).toBe(
      true,
    );
    expect(search("averroes").some((r) => r.record?.id === "ibn-rushd")).toBe(
      true,
    );
    expect(
      search("saladin")[0]?.record?.id ?? search("ayyubid")[0]?.record?.id,
    ).toBeDefined();
    expect(search("ibn taymiyya")[0]?.record?.id).toBe("ibn-taymiyya");
  });

  it("supports year and Hijri-year queries", () => {
    const ah = search("656 AH");
    expect(ah[0]?.kind).toBe("year");
    expect(Math.abs((ah[0].year ?? 0) - 1258)).toBeLessThanOrEqual(1);
    const ce = search("1453");
    expect(ce.some((r) => r.kind === "year" && r.year === 1453)).toBe(true);
  });
});

describe("URL state", () => {
  it("round-trips a full view", () => {
    const q = serializeState({
      centerYear: 1298.4,
      ppy: 11,
      selectedId: "ibn-taymiyya",
      compareIds: ["al-bukhari", "ibn-taymiyya"],
      compareOpen: true,
      mapOpen: true,
      mapFollow: false,
      mapYear: 1300,
      lanesOff: ["world"],
      minImportance: 3,
      regionsOn: ["levant"],
      theme: "dark",
    });
    const s = parseState(q);
    expect(s.centerYear).toBeCloseTo(1298.4, 1);
    expect(s.ppy).toBeCloseTo(11, 3);
    expect(s.selectedId).toBe("ibn-taymiyya");
    expect(s.compareIds).toEqual(["al-bukhari", "ibn-taymiyya"]);
    expect(s.compareOpen).toBe(true);
    expect(s.mapOpen).toBe(true);
    expect(s.mapFollow).toBe(false);
    expect(s.mapYear).toBe(1300);
    expect(s.lanesOff).toEqual(["world"]);
    expect(s.minImportance).toBe(3);
    expect(s.regionsOn).toEqual(["levant"]);
    expect(s.theme).toBe("dark");
  });

  it("parses an empty query into an empty patch", () => {
    expect(parseState("")).toEqual({});
  });
});

import { describe, expect, it } from "vitest";
import { allRecords } from "@/data/records";
import { getRecord, declaredRelations, NOW_YEAR } from "../data";
import { ceYearForHijriYearStart } from "../dates";
import { DOMAIN_BOTTOM } from "../scale";

const LANES = [
  "sirah",
  "companions",
  "scholars",
  "books",
  "states",
  "battles",
  "science",
  "culture",
  "world",
];
const KINDS = [
  "person",
  "book",
  "empire",
  "battle",
  "event",
  "institution",
  "movement",
  "place",
];
const REGIONS = [
  "arabia",
  "levant",
  "iraq-iran",
  "egypt-north-africa",
  "andalus-maghrib",
  "anatolia-balkans",
  "central-asia",
  "south-asia",
  "southeast-asia",
  "west-africa",
  "east-africa",
  "europe-world",
];

describe("dataset integrity", () => {
  it("has a substantial dataset", () => {
    expect(allRecords.length).toBeGreaterThanOrEqual(140);
  });

  it("has unique ids", () => {
    const ids = allRecords.map((r) => r.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("uses valid lanes, kinds, regions and importance", () => {
    for (const r of allRecords) {
      expect(LANES, r.id).toContain(r.lane);
      expect(KINDS, r.id).toContain(r.kind);
      expect(REGIONS, r.id).toContain(r.region);
      expect(r.importance, r.id).toBeGreaterThanOrEqual(1);
      expect(r.importance, r.id).toBeLessThanOrEqual(5);
    }
  });

  it("every record has at least one citation", () => {
    for (const r of allRecords) {
      expect(
        r.citations.length,
        `record ${r.id} must cite a source`,
      ).toBeGreaterThanOrEqual(1);
      for (const c of r.citations)
        expect(c.source.length, r.id).toBeGreaterThan(5);
    }
  });

  it("dates are chronologically sane and inside the display domain", () => {
    for (const r of allRecords) {
      expect(r.start.year, r.id).toBeGreaterThanOrEqual(DOMAIN_BOTTOM);
      expect(r.start.year, r.id).toBeLessThanOrEqual(NOW_YEAR);
      if (r.end) {
        expect(r.end.year, r.id).toBeGreaterThanOrEqual(r.start.year);
        expect(r.end.year, r.id).toBeLessThanOrEqual(NOW_YEAR);
      }
      if (r.start.endYear !== undefined)
        expect(r.start.endYear, r.id).toBeGreaterThanOrEqual(r.start.year);
      if (r.start.precision === "exact" && r.start.month) {
        expect(r.start.month, r.id).toBeGreaterThanOrEqual(1);
        expect(r.start.month, r.id).toBeLessThanOrEqual(12);
      }
    }
  });

  it("people have an end date or are marked ongoing (living)", () => {
    for (const r of allRecords) {
      // The prophets before 570 CE عليهم السلام are deliberately point-records:
      // tradition preserves their order, not their lifespans.
      if (r.kind === "person" && r.start.year >= 570) {
        expect(
          r.end !== undefined || r.ongoing === true,
          `person ${r.id} needs end or ongoing`,
        ).toBe(true);
      }
    }
  });

  it("undated records only exist in the ordinal band, and BCE records carry no exact/plain-year precision", () => {
    for (const r of allRecords) {
      if (r.start.precision === "unknown") {
        expect(
          r.start.year,
          `${r.id} (undated) must sit in the ordinal band`,
        ).toBeLessThan(-2400);
        expect(r.lane, r.id).toBe("sirah");
      }
      if (r.start.year < 570 && r.start.year >= -2400 && r.lane === "sirah") {
        expect(
          ["circa", "disputed"],
          `${r.id}: pre-Islamic dating must be circa/disputed`,
        ).toContain(r.start.precision);
      }
    }
  });

  it("attested Hijri years agree with the CE year within tabular tolerance", () => {
    for (const r of allRecords) {
      for (const d of [r.start, r.end]) {
        if (!d || !d.hijri || d.hijri.source !== "attested") continue;
        const ceOfAh = ceYearForHijriYearStart(d.hijri.year);
        // An AH year straddles two CE years; allow ±2 for range/circa records.
        expect(
          Math.abs(ceOfAh - d.year),
          `${r.id}: ${d.hijri.year} AH vs ${d.year} CE`,
        ).toBeLessThanOrEqual(2);
      }
    }
  });

  it("all relation targets resolve to real records", () => {
    for (const { from, rel } of declaredRelations()) {
      expect(getRecord(rel.target), `${from} → ${rel.target}`).toBeDefined();
    }
  });

  it("includes the record types the product requires", () => {
    for (const id of [
      "prophet-muhammad",
      "battle-of-badr",
      "sahih-al-bukhari",
      "aqida-wasitiyya",
      "al-muqaddima",
      "ibn-taymiyya",
      "ibn-al-qayyim",
      "al-nawawi",
      "al-bukhari",
      "salih-al-fawzan",
      "mughal-empire",
      "ottoman-empire",
      "safavid-empire",
      "abbasid-caliphate",
      "mamluk-sultanate",
      "conquest-of-constantinople",
      "sack-of-baghdad",
      "battle-of-ayn-jalut",
      "conquest-of-jerusalem-637",
      "mali-empire",
      "malacca-sultanate",
      "kanem-bornu",
      "khanate-of-bukhara",
    ]) {
      expect(getRecord(id), id).toBeDefined();
    }
  });

  it("demonstrates key overlaps (Ibn Taymiyya & Ibn al-Qayyim; Ottoman/Safavid/Mughal)", () => {
    const it_ = getRecord("ibn-taymiyya")!;
    const iq = getRecord("ibn-al-qayyim")!;
    expect(iq.start.year).toBeLessThan(it_.end!.year); // overlapping lifetimes
    const ot = getRecord("ottoman-empire")!;
    const sf = getRecord("safavid-empire")!;
    const mg = getRecord("mughal-empire")!;
    const overlapAll =
      Math.min(ot.end!.year, sf.end!.year, mg.end!.year) -
      Math.max(ot.start.year, sf.start.year, mg.start.year);
    expect(overlapAll).toBeGreaterThan(150); // three empires coexisted for centuries
  });
});

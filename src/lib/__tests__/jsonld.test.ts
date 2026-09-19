/**
 * The record pages' JSON-LD never presents an approximate date as exact. This
 * runs the rule over every record rather than a sample, because the failure
 * would be one record with a birthDate its sources do not support.
 */

import { describe, expect, it } from "vitest";
import { allRecords } from "@/data/records";
import {
  DATE_PROPERTIES,
  SCHEMA_TYPE,
  datesInWords,
  isMachineDate,
  isoDate,
  jsonLdFor,
  jsonLdScript,
} from "../jsonld";
import type { HDate, TimelineRecord } from "../types";

const URL_OF = (r: TimelineRecord) => `https://example.test/r/${r.id}/`;
const ISO = /^\d{4}(-\d{2}(-\d{2})?)?$/;

describe("isoDate", () => {
  it("carries exact and year dates only, zero-padded to four digits", () => {
    expect(isoDate({ year: 810, precision: "year" })).toBe("0810");
    expect(isoDate({ year: 1258, precision: "year" })).toBe("1258");
    expect(
      isoDate({ year: 624, month: 3, day: 13, precision: "exact" }),
    ).toBe("0624-03-13");
    expect(isoDate({ year: 1453, month: 5, precision: "exact" })).toBe(
      "1453-05",
    );
  });
  it("refuses circa, range, disputed and unknown", () => {
    for (const precision of ["circa", "range", "disputed", "unknown"] as const)
      expect(isoDate({ year: 570, precision })).toBeNull();
  });
  it("refuses any year before 1 CE, whatever its precision", () => {
    expect(isoDate({ year: -551, precision: "year" })).toBeNull();
    expect(isoDate({ year: -27, precision: "year" })).toBeNull();
    expect(isoDate({ year: 0, precision: "exact", month: 1, day: 1 })).toBeNull();
    expect(isoDate({ year: 1, precision: "year" })).toBe("0001");
  });
});

describe("JSON-LD over every record", () => {
  const cases = allRecords.map((r) => ({
    rec: r,
    ld: jsonLdFor(r, URL_OF(r)),
  }));

  it("covers all 392 records", () => {
    expect(cases.length).toBeGreaterThanOrEqual(392);
  });

  it("emits a machine date only for an exact or year HDate from 1 CE on", () => {
    for (const { rec, ld } of cases) {
      const dated: Record<string, HDate | undefined> = {
        birthDate: rec.start,
        startDate: rec.start,
        foundingDate: rec.start,
        datePublished: rec.start,
        deathDate: rec.end,
        endDate: rec.end,
        dissolutionDate: rec.end,
      };
      for (const key of DATE_PROPERTIES) {
        if (!(key in ld)) continue;
        const source = dated[key];
        expect(source, `${rec.id}: ${key} without a source date`).toBeDefined();
        expect(
          isMachineDate(source!),
          `${rec.id}: ${key}=${String(ld[key])} from a ${source!.precision} date`,
        ).toBe(true);
        expect(ld[key], `${rec.id}: ${key} is not ISO 8601`).toMatch(ISO);
        expect(ld[key]).toBe(isoDate(source!));
      }
    }
  });

  it("does emit the machine date when the sources support one and the type has a slot", () => {
    let emitted = 0;
    for (const { rec, ld } of cases) {
      const type = SCHEMA_TYPE[rec.kind];
      if (type === "Thing" || type === "Place") {
        for (const key of DATE_PROPERTIES) expect(ld).not.toHaveProperty(key);
        continue;
      }
      const startKey =
        type === "Person"
          ? "birthDate"
          : type === "Event"
            ? "startDate"
            : type === "Organization"
              ? "foundingDate"
              : "datePublished";
      if (isMachineDate(rec.start)) {
        expect(ld[startKey], `${rec.id}: ${startKey} missing`).toBe(
          isoDate(rec.start),
        );
        emitted++;
      } else {
        expect(ld).not.toHaveProperty(startKey);
      }
    }
    expect(emitted).toBeGreaterThan(100);
  });

  it("writes every withheld date into the description in words", () => {
    let withheld = 0;
    for (const { rec, ld } of cases) {
      const description = String(ld.description);
      expect(description).toContain(rec.summary);
      expect(description).toContain(datesInWords(rec));
      if (!isMachineDate(rec.start)) {
        withheld++;
        if (rec.start.precision === "circa") expect(description).toContain("c. ");
        if (rec.start.precision === "range")
          expect(description).toContain("–");
        if (rec.start.precision === "disputed")
          expect(description).toContain("?");
        if (rec.start.precision === "unknown")
          expect(description).toContain("Dating unknown");
        if (rec.start.year < 1 && rec.start.precision !== "unknown")
          expect(description).toContain("BCE");
      }
      for (const d of [rec.start, rec.end])
        for (const alt of d?.altYears ?? [])
          expect(description).toContain(String(Math.abs(alt)));
    }
    expect(withheld).toBeGreaterThan(100);
  });

  it("maps every kind to its schema.org type, movements to Thing", () => {
    for (const { rec, ld } of cases) expect(ld["@type"]).toBe(SCHEMA_TYPE[rec.kind]);
    expect(SCHEMA_TYPE.movement).toBe("Thing");
    expect(SCHEMA_TYPE.empire).toBe("Organization");
    expect(SCHEMA_TYPE.institution).toBe("Organization");
  });

  it("carries the citations as text and never a sameAs", () => {
    for (const { rec, ld } of cases) {
      expect(ld).not.toHaveProperty("sameAs");
      expect(ld.citation).toHaveLength(rec.citations.length);
      expect(ld.name).toBe(rec.name);
      expect(ld.url).toBe(URL_OF(rec));
    }
  });

  it("contains no em dash and survives the script escape", () => {
    for (const { ld } of cases) {
      const text = jsonLdScript(ld);
      expect(text).not.toContain("\u2014");
      expect(text).not.toContain("</");
      expect(JSON.parse(text)).toEqual(ld);
    }
  });

  it("holds for the records the amendment names", () => {
    const by = (id: string) => cases.find((c) => c.rec.id === id)!;
    expect(by("al-bukhari").ld.birthDate).toBe("0810");
    expect(by("al-bukhari").ld.deathDate).toBe("0870");
    for (const id of ["confucius", "aristotle", "alexander-great"]) {
      expect(by(id).ld).not.toHaveProperty("birthDate");
      expect(String(by(id).ld.description)).toContain("BCE");
    }
    for (const id of ["roman-empire", "han-dynasty"]) {
      expect(by(id).ld).not.toHaveProperty("foundingDate");
      expect(String(by(id).ld.description)).toContain("BCE");
    }
  });
});

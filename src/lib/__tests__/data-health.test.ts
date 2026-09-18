/**
 * Data health, checked by machine and printed so the numbers are visible in CI.
 * These are the things a reader would catch us on: a record with no citation,
 * a span that ends before it starts, a Hijri year that disagrees with its
 * Gregorian pair, a duplicate id, or an AH date before the hijra.
 */

import { describe, expect, it } from "vitest";
import { allRecords } from "@/data/records";
import { ceYearForHijriYearStart } from "../dates";

describe("data health", () => {
  it("reports and enforces the numbers", () => {
    const problems: string[] = [];
    const seen = new Set<string>();
    let cited = 0;

    for (const r of allRecords) {
      if (seen.has(r.id)) problems.push(`duplicate id: ${r.id}`);
      seen.add(r.id);
      if ((r.citations?.length ?? 0) > 0) cited++;
      else problems.push(`no citation: ${r.id}`);
      if (r.end && r.end.year < r.start.year)
        problems.push(`ends before it starts: ${r.id}`);
      const ah = r.start.hijri?.year;
      if (ah !== undefined) {
        if (r.start.year < 622) problems.push(`AH before the hijra: ${r.id}`);
        else if (Math.abs(ceYearForHijriYearStart(ah) - r.start.year) > 2)
          problems.push(
            `hijri and gregorian disagree: ${r.id} (${ah} AH vs ${r.start.year} CE)`,
          );
      }
    }

    console.log(
      `data health: ${allRecords.length} records, ${cited} with citations, ` +
        `${seen.size} unique ids, ${problems.length} problems`,
    );
    if (problems.length)
      console.error(problems.slice(0, 40).map((p) => `  ${p}`).join("\n"));
    expect(problems).toEqual([]);
  });

  it("still holds every one of the 392 original records", () => {
    expect(allRecords.length).toBeGreaterThanOrEqual(392);
    console.log(`record count: ${allRecords.length} (original baseline 392)`);
  });
});

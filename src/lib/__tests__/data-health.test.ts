/**
 * Data health, checked by machine and printed so the numbers are visible in CI.
 * These are the things a reader would catch us on: a record with no citation,
 * a span that ends before it starts, a Hijri year that disagrees with its
 * Gregorian pair, a duplicate id, or an AH date before the hijra.
 *
 * The baseline is the 392 ids the site launched with, frozen in
 * src/data/baseline-ids.json. A baseline record may be edited but never
 * dropped. A record outside the baseline is new, and a new record needs two
 * distinct citations and a CHANGELOG line (BRIEF section 5.3).
 */

import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { allRecords } from "@/data/records";
import baselineIds from "@/data/baseline-ids.json";
import { ceYearForHijriYearStart } from "../dates";

const ROOT = resolve(__dirname, "../../..");

/** CHANGELOG.md plus any entry waiting in changelog.d/ to be folded into it. */
function changelogText(): string {
  const parts = [readFileSync(join(ROOT, "CHANGELOG.md"), "utf8")];
  const pending = join(ROOT, "changelog.d");
  if (existsSync(pending))
    for (const name of readdirSync(pending))
      if (name.endsWith(".md")) parts.push(readFileSync(join(pending, name), "utf8"));
  return parts.join("\n");
}

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

  it("still resolves every one of the 392 baseline ids", () => {
    const ids = new Set(allRecords.map((r) => r.id));
    const missing = baselineIds.filter((id) => !ids.has(id));
    console.log(
      `record count: ${allRecords.length} (baseline ${baselineIds.length}, ` +
        `${missing.length} baseline ids missing)`,
    );
    expect(baselineIds.length).toBe(392);
    expect(new Set(baselineIds).size).toBe(baselineIds.length);
    if (missing.length)
      console.error(missing.map((id) => `  baseline id missing: ${id}`).join("\n"));
    expect(missing).toEqual([]);
  });

  it("holds every record added since the baseline to two citations and a CHANGELOG line", () => {
    const baseline = new Set(baselineIds);
    const added = allRecords.filter((r) => !baseline.has(r.id));
    const changelog = changelogText();
    const problems: string[] = [];

    for (const r of added) {
      const distinct = new Set(
        r.citations.map((c) => `${c.source}|${c.detail ?? ""}`),
      );
      if (distinct.size < 2)
        problems.push(
          `${r.id}: ${distinct.size} distinct citation(s); a record added after the baseline needs two`,
        );
      if (!changelog.includes(r.id))
        problems.push(`${r.id}: no line in CHANGELOG.md or changelog.d/`);
    }

    console.log(
      `records added since the baseline: ${added.length}, ${problems.length} problems`,
    );
    if (problems.length) console.error(problems.map((p) => `  ${p}`).join("\n"));
    expect(problems).toEqual([]);
  });
});

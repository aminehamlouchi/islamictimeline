import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  formatCitation,
  formatDatesLine,
  formatRecordText,
  instrumentLinkOf,
  permalinkOf,
} from "../citation";
import { getAllRecords, getRecord } from "../data";
import { SITE_URL } from "../site";
import type { TimelineRecord } from "../types";

const ACCESSED = new Date(2026, 8, 19);
const EM_DASH = String.fromCodePoint(0x2014);

function pick(id: string): TimelineRecord {
  const rec = getRecord(id);
  expect(rec, `record ${id} exists`).toBeDefined();
  return rec!;
}

describe("formatCitation", () => {
  it("cites Ibn Taymiyya in one line, then the record's own sources", () => {
    const rec = pick("ibn-taymiyya");
    const [line, heading, ...sources] = formatCitation(rec, ACCESSED).split("\n");
    expect(line).toBe(
      "Ibn Taymiyya (ابن تيمية), 1263 – 1328 CE · 661 – 728 AH. " +
        `The Islamic Timeline. ${SITE_URL}/r/ibn-taymiyya/. Accessed 19 September 2026.`,
    );
    expect(heading).toBe("Sources cited by this record:");
    expect(sources).toHaveLength(rec.citations.length);
    expect(sources[0]).toMatch(/^1\. /);
    expect(sources[0]).toContain(rec.citations[0].source);
  });

  it("keeps the precision words: c. for circa, disputed, range", () => {
    const circa = pick("hanafi-school");
    expect(circa.start.precision).toBe("circa");
    expect(formatCitation(circa, ACCESSED).split("\n")[0]).toContain("c. ");

    const disputed = pick("battle-of-qadisiyya");
    expect(disputed.start.precision).toBe("disputed");
    expect(formatCitation(disputed, ACCESSED).split("\n")[0]).toContain("disputed");

    const range = pick("al-muwatta");
    expect(range.start.precision).toBe("range");
    expect(formatCitation(range, ACCESSED).split("\n")[0]).toContain("range");
  });

  it("prints present for an ongoing record", () => {
    const rec = pick("hanafi-school");
    expect(rec.ongoing).toBe(true);
    expect(formatCitation(rec, ACCESSED).split("\n")[0]).toContain("present");
  });

  it("carries the record page as the permalink, not the instrument", () => {
    const rec = pick("al-bukhari");
    const line = formatCitation(rec, ACCESSED).split("\n")[0];
    expect(line).toContain(`${SITE_URL}/r/al-bukhari/`);
    expect(line).not.toContain("?sel=");
    expect(permalinkOf(rec)).toBe(`${SITE_URL}/r/al-bukhari/`);
    expect(instrumentLinkOf(rec)).toBe(`${SITE_URL}/?sel=al-bukhari`);
  });

  it("does not name the style, an author or a publisher", () => {
    const text = formatCitation(pick("ibn-taymiyya"), ACCESSED);
    expect(text).not.toMatch(/chicago/i);
    expect(text).not.toMatch(/hamlouchi\b(?!\.com)/i);
  });
});

describe("formatRecordText", () => {
  it("lays out Ibn Taymiyya head to foot", () => {
    const rec = pick("ibn-taymiyya");
    const text = formatRecordText(rec, ACCESSED);
    const lines = text.split("\n");
    expect(lines.slice(0, 6)).toEqual([
      "Ibn Taymiyya",
      "ابن تيمية",
      "Person",
      "Dates: 1263 – 1328 CE · 661 – 728 AH",
      "Born: 22 January 1263 CE · 661 AH",
      "Died: 26 September 1328 CE · 728 AH",
    ]);
    expect(text).toContain(`Note: ${rec.start.note} ${rec.end!.note}`);
    expect(text).toContain("Place: Damascus");
    expect(text).toContain(`\n${rec.summary}\n`);
    // connections grouped under the panel's own labels
    expect(text).toMatch(/^Students: .*Qayyim/m);
    expect(text).toMatch(/^Works: /m);
    // sources as source plus detail, numbered
    expect(text).toContain("\nSources:\n1. ");
    const c = rec.citations[0];
    expect(text).toContain(c.detail ? `${c.source}, ${c.detail}` : c.source);
    // both addresses, the record page first
    expect(text).toContain(`Permalink: ${SITE_URL}/r/ibn-taymiyya/`);
    expect(text).toContain(`Open in the instrument: ${SITE_URL}/?sel=ibn-taymiyya`);
    expect(lines[lines.length - 1]).toBe(
      "The Islamic Timeline, accessed 19 September 2026.",
    );
  });

  it("shows the precision badge and the alternative years", () => {
    const rec = pick("battle-of-qadisiyya");
    const text = formatRecordText(rec, ACCESSED);
    expect(formatDatesLine(rec)).toContain("(disputed)");
    expect(text).toContain("Dates: " + formatDatesLine(rec));
    expect(text).toContain(`(also reported: ${rec.start.altYears!.join(", ")})`);
  });

  it("says a living record continues to the present", () => {
    const text = formatRecordText(pick("hanafi-school"), ACCESSED);
    expect(text).toContain("Continues to the present.");
    expect(text).toContain("present");
  });
});

describe("every record, both formatters", () => {
  it("contains no em dash and always both addresses", () => {
    for (const rec of getAllRecords()) {
      const cite = formatCitation(rec, ACCESSED);
      const full = formatRecordText(rec, ACCESSED);
      expect(cite, rec.id).not.toContain(EM_DASH);
      expect(full, rec.id).not.toContain(EM_DASH);
      expect(cite, rec.id).toContain(`/r/${rec.id}/`);
      expect(full, rec.id).toContain(`/r/${rec.id}/`);
      expect(full, rec.id).toContain(`?sel=${rec.id}`);
      expect(cite.split("\n")[0], rec.id).toContain(rec.name);
    }
  });
});

describe("issue forms", () => {
  const dir = join(process.cwd(), ".github", "ISSUE_TEMPLATE");
  const files = readdirSync(dir).filter((f) => f.endsWith(".yml"));

  it("ship the two forms and the config", () => {
    expect(files.sort()).toEqual(["config.yml", "correct-record.yml", "suggest-record.yml"]);
  });

  it("contain no em dash", () => {
    for (const f of files)
      expect(readFileSync(join(dir, f), "utf8"), f).not.toContain(EM_DASH);
  });

  it("declare a name, a description, a label and unique field ids", () => {
    for (const f of ["suggest-record.yml", "correct-record.yml"]) {
      const text = readFileSync(join(dir, f), "utf8");
      expect(text, f).toMatch(/^name: /m);
      expect(text, f).toMatch(/^description: /m);
      expect(text, f).toMatch(/^labels: \["(suggestion|correction)"\]$/m);
      expect(text, f).toMatch(/^body:$/m);
      const ids = [...text.matchAll(/^\s+id: (\S+)$/gm)].map((m) => m[1]);
      expect(ids.length, f).toBeGreaterThan(3);
      expect(new Set(ids).size, f).toBe(ids.length);
    }
    expect(readFileSync(join(dir, "config.yml"), "utf8")).toMatch(
      /^blank_issues_enabled: false$/m,
    );
  });

  it("accept the fields the app fills in", () => {
    const suggest = readFileSync(join(dir, "suggest-record.yml"), "utf8");
    for (const id of ["name", "kind", "dates", "region", "why", "sources"])
      expect(suggest, id).toMatch(new RegExp(`^\\s+id: ${id}$`, "m"));
    const correct = readFileSync(join(dir, "correct-record.yml"), "utf8");
    for (const id of ["record", "name", "dates", "url", "wrong", "correct", "sources"])
      expect(correct, id).toMatch(new RegExp(`^\\s+id: ${id}$`, "m"));
  });
});

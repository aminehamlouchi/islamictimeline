/**
 * Plain-text renderings of a record, for citing it in an essay or pasting it
 * into notes. Both formatters are pure: a record and the date of access in, a
 * string out, nothing read from the page. Dates come from the helpers the
 * panel itself uses, so the copied text cannot say something the screen does
 * not.
 *
 * The permalink is the record's own page under /r/<id>/, the stable address a
 * citation should carry. The instrument, with the record selected, is given on
 * its own line so a reader can open it there.
 */

import { relationsOf, type ResolvedRelation } from "./data";
import { formatFullDate, formatSpanDual, precisionBadge } from "./dates";
import { KIND_LABEL, REL_LABEL } from "./labels";
import { SITE_URL } from "./site";
import type { Citation, HDate, RelationType, TimelineRecord } from "./types";

export const SITE_NAME = "The Islamic Timeline";

/** The record's own page: stable and crawlable, the address to cite. */
export function permalinkOf(rec: TimelineRecord): string {
  return `${SITE_URL}/r/${encodeURIComponent(rec.id)}/`;
}

/** The same record selected inside the instrument. */
export function instrumentLinkOf(rec: TimelineRecord): string {
  return `${SITE_URL}/?sel=${encodeURIComponent(rec.id)}`;
}

/** "19 September 2026", spelled the same wherever the visitor is. */
export function formatAccessed(accessed: Date): string {
  return accessed.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** The precision words the panel shows as badges, deduplicated across start and end. */
function precisionWords(rec: TimelineRecord): string[] {
  const words = [precisionBadge(rec.start)];
  if (rec.end) words.push(precisionBadge(rec.end));
  return [...new Set(words.filter((w): w is string => w !== null))];
}

/**
 * Dual-calendar span with the precision spelled out, e.g.
 * "c. 570 – 632 CE · d. 11 AH (approximate)".
 */
export function formatDatesLine(rec: TimelineRecord): string {
  const span = formatSpanDual(rec.start, rec.end, rec.ongoing);
  const words = precisionWords(rec);
  return words.length ? `${span} (${words.join("; ")})` : span;
}

function alsoReported(d: HDate): string {
  return d.altYears && d.altYears.length > 0
    ? ` (also reported: ${d.altYears.join(", ")})`
    : "";
}

function formatSource(c: Citation): string {
  const head = c.detail ? `${c.source}, ${c.detail}` : c.source;
  return c.url ? `${head}. ${c.url}` : head;
}

function sourcesBlock(rec: TimelineRecord, heading: string): string[] {
  return [heading, ...rec.citations.map((c, i) => `${i + 1}. ${formatSource(c)}`)];
}

/**
 * One citation line, then the record's own sources. The line carries the
 * name, the dual dates with their precision, the site, the record page and
 * the date of access; it names no author and no publisher, because the site
 * has not decided on either.
 */
export function formatCitation(rec: TimelineRecord, accessed: Date): string {
  const title = rec.arabic ? `${rec.name} (${rec.arabic})` : rec.name;
  const line =
    `${title}, ${formatDatesLine(rec)}. ${SITE_NAME}. ` +
    `${permalinkOf(rec)}. Accessed ${formatAccessed(accessed)}.`;
  return [line, ...sourcesBlock(rec, "Sources cited by this record:")].join(
    "\n",
  );
}

/**
 * The whole record as plain text: name, Arabic, kind, dates with their
 * precision and alternative years, notes, place, summary, connections grouped
 * the way the panel groups them, sources, and both addresses.
 */
export function formatRecordText(
  rec: TimelineRecord,
  accessed: Date,
  relations: ResolvedRelation[] = relationsOf(rec.id),
): string {
  const out: string[] = [rec.name];
  if (rec.arabic) out.push(rec.arabic);
  out.push(KIND_LABEL[rec.kind] ?? rec.kind);
  out.push(`Dates: ${formatDatesLine(rec)}`);

  const startWord =
    rec.kind === "person" ? "Born" : rec.kind === "book" ? "Composed" : "Begins";
  const endWord = rec.kind === "person" ? "Died" : "Ends";
  out.push(`${startWord}: ${formatFullDate(rec.start)}${alsoReported(rec.start)}`);
  if (rec.end)
    out.push(`${endWord}: ${formatFullDate(rec.end)}${alsoReported(rec.end)}`);
  if (rec.ongoing) out.push("Continues to the present.");
  const note = [rec.start.note, rec.end?.note].filter(Boolean).join(" ");
  if (note) out.push(`Note: ${note}`);
  if (rec.location)
    out.push(
      `Place: ${rec.location.name}${rec.location.approximate ? " (approximate location)" : ""}`,
    );

  out.push("", rec.summary);

  const grouped = new Map<RelationType, ResolvedRelation[]>();
  for (const r of relations) {
    if (!grouped.has(r.type)) grouped.set(r.type, []);
    grouped.get(r.type)!.push(r);
  }
  if (grouped.size > 0) {
    out.push("");
    for (const t of Object.keys(REL_LABEL) as RelationType[]) {
      const list = grouped.get(t);
      if (!list) continue;
      const names = list.map((r) =>
        r.note ? `${r.record.name} (${r.note})` : r.record.name,
      );
      out.push(`${REL_LABEL[t]}: ${names.join("; ")}`);
    }
  }

  out.push("", ...sourcesBlock(rec, "Sources:"));
  out.push(
    "",
    `Permalink: ${permalinkOf(rec)}`,
    `Open in the instrument: ${instrumentLinkOf(rec)}`,
    `${SITE_NAME}, accessed ${formatAccessed(accessed)}.`,
  );
  return out.join("\n");
}

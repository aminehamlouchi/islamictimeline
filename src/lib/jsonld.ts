/**
 * schema.org JSON-LD for a record page.
 *
 * One rule governs the machine-readable dates. A date goes into a machine
 * field (birthDate, deathDate, startDate, endDate, foundingDate,
 * dissolutionDate, datePublished) only when the sources give it to the year or
 * better, that is when the HDate's precision is 'exact' or 'year'. A circa,
 * range, disputed or undated HDate is written out in words in the description,
 * with its "c.", its range or its alternatives, and never as a value a crawler
 * would read as attested.
 *
 * The machine fields are ISO 8601. Years below 1000 are zero-padded to four
 * digits ("0810"), and years before 1 CE get no machine field at all: a BCE
 * year needs the expanded "-0551" form, which most consumers reject, and "0000"
 * means 1 BCE only by convention. Those dates too go into the description.
 *
 * No record carries a citation URL, so nothing here emits sameAs.
 */

import { formatFullDate, formatYearCE } from "./dates";
import { dateLabels } from "./labels";
import type { HDate, RecordKind, TimelineRecord } from "./types";

export type SchemaType =
  | "Person"
  | "Book"
  | "Event"
  | "Organization"
  | "Place"
  | "Thing";

/** A school of thought is not an organization, so 'movement' maps to Thing. */
export const SCHEMA_TYPE: Record<RecordKind, SchemaType> = {
  person: "Person",
  book: "Book",
  battle: "Event",
  event: "Event",
  empire: "Organization",
  institution: "Organization",
  movement: "Thing",
  place: "Place",
};

/** Every property this module may fill with a date, for the tests. */
export const DATE_PROPERTIES = [
  "birthDate",
  "deathDate",
  "startDate",
  "endDate",
  "foundingDate",
  "dissolutionDate",
  "datePublished",
] as const;

/** Which properties carry the start and the end for each type; none for Thing and Place. */
const DATE_SLOTS: Record<SchemaType, [start: string, end: string] | null> = {
  Person: ["birthDate", "deathDate"],
  Event: ["startDate", "endDate"],
  Organization: ["foundingDate", "dissolutionDate"],
  Book: ["datePublished", ""],
  Place: null,
  Thing: null,
};

/** True when a machine may carry this date as a value. */
export function isMachineDate(d: HDate): boolean {
  return (d.precision === "exact" || d.precision === "year") && d.year >= 1;
}

/** The ISO 8601 form of a date the machine may carry, or null. */
export function isoDate(d: HDate): string | null {
  if (!isMachineDate(d)) return null;
  const y = String(d.year).padStart(4, "0");
  if (d.precision !== "exact" || !d.month) return y;
  const m = String(d.month).padStart(2, "0");
  return d.day ? `${y}-${m}-${String(d.day).padStart(2, "0")}` : `${y}-${m}`;
}

function alsoReported(d: HDate): string {
  if (!d.altYears || d.altYears.length === 0) return "";
  return `, also reported ${d.altYears.map(formatYearCE).join(", ")}`;
}

/** The dates in words, exactly as the page prints them, for the description. */
export function datesInWords(rec: TimelineRecord): string {
  if (rec.start.precision === "unknown") return `${formatFullDate(rec.start)}.`;
  const [startLabel, endLabel] = dateLabels(rec.kind);
  const parts = [
    `${startLabel} ${formatFullDate(rec.start)}${alsoReported(rec.start)}`,
  ];
  if (rec.end)
    parts.push(
      `${endLabel.toLowerCase()} ${formatFullDate(rec.end)}${alsoReported(rec.end)}`,
    );
  else if (rec.ongoing) parts.push("continues to the present");
  return `${parts.join("; ")}.`;
}

/** The JSON-LD object for a record served at `url`. */
export function jsonLdFor(
  rec: TimelineRecord,
  url: string,
): Record<string, unknown> {
  const type = SCHEMA_TYPE[rec.kind];
  const ld: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": type,
    "@id": url,
    url,
    mainEntityOfPage: url,
    name: rec.name,
    description: `${rec.summary} ${datesInWords(rec)}`,
  };
  const names = [rec.arabic, ...(rec.aliases ?? [])].filter(
    (n): n is string => !!n,
  );
  if (names.length) ld.alternateName = names;

  const slots = DATE_SLOTS[type];
  if (slots) {
    const [startKey, endKey] = slots;
    const start = isoDate(rec.start);
    const end = rec.end ? isoDate(rec.end) : null;
    if (start && startKey) ld[startKey] = start;
    if (end && endKey) ld[endKey] = end;
  }

  // A place belongs to an event or an organization. A person's `location` is
  // the place they are associated with, not a birthplace, so it stays in words.
  if (rec.location && (type === "Event" || type === "Organization")) {
    const place: Record<string, unknown> = {
      "@type": "Place",
      name: rec.location.name,
    };
    if (!rec.location.approximate)
      place.geo = {
        "@type": "GeoCoordinates",
        latitude: rec.location.lat,
        longitude: rec.location.lng,
      };
    ld.location = place;
  }

  ld.citation = rec.citations.map((c) =>
    c.detail ? `${c.source}, ${c.detail}` : c.source,
  );
  return ld;
}

/** The object serialized for a <script type="application/ld+json">, safe inside HTML. */
export function jsonLdScript(ld: Record<string, unknown>): string {
  return JSON.stringify(ld).replace(/</g, "\\u003c");
}

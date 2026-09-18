/**
 * Client-side search with autocomplete.
 * Supports: names (diacritic-insensitive), Arabic, aliases, kinds, tags,
 * plus temporal queries: "1258", "656 AH", "7th century".
 */

import { getAllRecords } from "./data";
import { ceYearForHijriYearStart } from "./dates";
import type { TimelineRecord } from "./types";

export interface SearchResult {
  kind: "record" | "year";
  record?: TimelineRecord;
  year?: number;
  label: string;
  sublabel?: string;
  score: number;
}

/** Strip diacritics/special letters for matching: Ṣaḥīḥ → sahih, ʿUmar → umar. */
export function fold(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[ʿʾ''`]/g, "")
    .replace(/[āàáâ]/g, "a")
    .replace(/[īìíî]/g, "i")
    .replace(/[ūùúû]/g, "u")
    .replace(/ḥ/g, "h")
    .replace(/ṣ/g, "s")
    .replace(/ḍ/g, "d")
    .replace(/ṭ/g, "t")
    .replace(/ẓ/g, "z")
    .replace(/[^a-z0-9؀-ۿ\s-]/g, "")
    .trim();
}

interface Entry {
  record: TimelineRecord;
  keys: string[];
}

let index: Entry[] | null = null;

function buildIndex(): Entry[] {
  if (index) return index;
  index = getAllRecords().map((r) => ({
    record: r,
    keys: [
      fold(r.name),
      ...(r.arabic ? [r.arabic] : []),
      ...(r.aliases ?? []).map(fold),
      ...(r.tags ?? []).map(fold),
    ],
  }));
  return index;
}

const KIND_LABEL: Record<string, string> = {
  person: "Person",
  book: "Book",
  empire: "State",
  battle: "Battle",
  event: "Event",
  institution: "Institution",
  movement: "Movement",
  place: "Place",
};

function yearQueries(q: string): SearchResult[] {
  const out: SearchResult[] = [];
  const ah = q.match(/^(\d{1,4})\s*(ah|هـ)$/i);
  if (ah) {
    const y = ceYearForHijriYearStart(parseInt(ah[1], 10));
    out.push({
      kind: "year",
      year: y,
      label: `${ah[1]} AH`,
      sublabel: `≈ ${y} CE, jump to year`,
      score: 100,
    });
  }
  const ce = q.match(/^(\d{3,4})$/);
  if (ce) {
    const y = parseInt(ce[1], 10);
    if (y >= 200 && y <= new Date().getFullYear())
      out.push({
        kind: "year",
        year: y,
        label: `${y} CE`,
        sublabel: "Jump to year",
        score: 90,
      });
  }
  const cent = q.match(/^(\d{1,2})(st|nd|rd|th)?\s*century$/i);
  if (cent) {
    const c = parseInt(cent[1], 10);
    const y = (c - 1) * 100 + 50;
    if (y >= 200 && y <= 2100)
      out.push({
        kind: "year",
        year: y,
        label: `${c}th century CE`,
        sublabel: `Jump to c. ${y}`,
        score: 90,
      });
  }
  return out;
}

export function search(query: string, limit = 8): SearchResult[] {
  const q = fold(query);
  if (!q) return [];
  const results: SearchResult[] = yearQueries(query.trim().toLowerCase());

  for (const e of buildIndex()) {
    let score = 0;
    for (const k of e.keys) {
      if (!k) continue;
      if (k === q) score = Math.max(score, 80);
      else if (k.startsWith(q)) score = Math.max(score, 60);
      else if (k.includes(` ${q}`)) score = Math.max(score, 45);
      else if (k.includes(q)) score = Math.max(score, 30);
    }
    if (score > 0) {
      const r = e.record;
      const startY = r.start.year;
      results.push({
        kind: "record",
        record: r,
        label: r.name,
        sublabel: `${KIND_LABEL[r.kind]} · ${startY < 0 ? `${-startY} BCE` : startY}${r.end ? `–${r.end.year}` : r.ongoing ? "–present" : ""}`,
        score: score + r.importance,
      });
    }
  }
  results.sort((a, b) => b.score - a.score);
  return results.slice(0, limit);
}

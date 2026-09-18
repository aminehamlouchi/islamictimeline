/**
 * Span mathematics: overlaps, gaps and human-readable comparisons.
 * All comparison sentences in the UI are generated here from structured
 * dates, never hardcoded.
 */

import type { TimelineRecord } from "./types";

export interface Span {
  start: number;
  end: number; // for point events end === start
  point: boolean;
  startApprox: boolean;
  endApprox: boolean;
  /** true when the record has no real dating (precision 'unknown'): the year is a layout slot only */
  undated: boolean;
}

export function spanOf(r: TimelineRecord, nowYear: number): Span {
  const start = r.start.year;
  const end = r.ongoing
    ? nowYear
    : r.end
      ? r.end.year
      : (r.start.endYear ?? r.start.year);
  const approx = (p: string) =>
    p === "circa" || p === "disputed" || p === "range" || p === "unknown";
  return {
    start,
    end,
    point: !r.end && !r.ongoing && r.start.endYear === undefined,
    startApprox: approx(r.start.precision),
    endApprox: r.end ? approx(r.end.precision) : approx(r.start.precision),
    undated: r.start.precision === "unknown" || r.end?.precision === "unknown",
  };
}

export function overlapYears(a: Span, b: Span): number {
  return Math.max(0, Math.min(a.end, b.end) - Math.max(a.start, b.start));
}

export function overlapRange(a: Span, b: Span): [number, number] | null {
  const lo = Math.max(a.start, b.start);
  const hi = Math.min(a.end, b.end);
  return hi >= lo ? [lo, hi] : null;
}

/** Positive gap between two non-overlapping spans (earlier.end → later.start). */
export function gapYears(a: Span, b: Span): number {
  const [first, second] = a.end <= b.start ? [a, b] : [b, a];
  return Math.max(0, second.start - first.end);
}

function approxWord(approx: boolean): string {
  return approx ? "roughly " : "";
}

/**
 * A generated, neutral, human-readable comparison of two records.
 * Examples:
 * - "Imam al-Bukhārī died roughly 393 years before Ibn Taymiyya was born."
 * - "Their lifetimes overlapped for 15 years (1263–1277)."
 * - "The Ottoman and Safavid states coexisted for about 235 years."
 */
export function describePair(
  a: TimelineRecord,
  b: TimelineRecord,
  nowYear: number,
): string {
  const sa = spanOf(a, nowYear);
  const sb = spanOf(b, nowYear);

  // Undated records (earliest prophets) carry a traditional ORDER, never an interval.
  if (sa.undated || sb.undated) {
    const [first, second] = sa.start <= sb.start ? [a, b] : [b, a];
    return `Tradition places ${first.name} before ${second.name}; the interval between them is not known.`;
  }

  const approx =
    sa.startApprox || sa.endApprox || sb.startApprox || sb.endApprox;

  const ov = overlapRange(sa, sb);
  if (ov) {
    const n = ov[1] - ov[0];
    if (sa.point && sb.point) {
      return n === 0
        ? `${a.name} and ${b.name} fall in the same year (${ov[0]}).`
        : `${a.name} and ${b.name} occurred within ${approxWord(approx)}${n} years of each other.`;
    }
    const subject =
      a.kind === "person" && b.kind === "person"
        ? "Their lifetimes"
        : a.kind === "empire" && b.kind === "empire"
          ? `The two states`
          : "Their periods";
    if (a.kind === "empire" && b.kind === "empire") {
      return `${a.name} and ${b.name} coexisted for ${approxWord(approx)}${n} years (${ov[0]}–${ov[1]} CE).`;
    }
    return `${subject} overlapped for ${approxWord(approx)}${n} years (${ov[0]}–${ov[1]} CE).`;
  }

  const [first, second] = sa.end <= sb.start ? [a, b] : [b, a];
  const [sf, ss] = sa.end <= sb.start ? [sa, sb] : [sb, sa];
  const gap = ss.start - sf.end;
  const firstVerb =
    first.kind === "person"
      ? "died"
      : first.kind === "empire"
        ? "ended"
        : "took place";
  const secondVerb =
    second.kind === "person"
      ? "was born"
      : second.kind === "empire"
        ? "arose"
        : second.kind === "book"
          ? "was composed"
          : "took place";
  return `${first.name} ${firstVerb} ${approxWord(approx)}${gap} years before ${second.name} ${secondVerb}.`;
}

/** Records whose spans include the given year. */
export function aliveIn<T extends TimelineRecord>(
  records: T[],
  year: number,
  nowYear: number,
): T[] {
  return records.filter((r) => {
    const s = spanOf(r, nowYear);
    return s.start <= year && year <= s.end;
  });
}

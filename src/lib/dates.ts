/**
 * Calendar utilities.
 *
 * Policy (see the Methodology page):
 * - When sources record a Hijri date, the record stores it (`hijri.source === 'attested'`)
 * and the UI shows it plainly, e.g. "256 AH".
 * - When no attested Hijri date exists, we derive one arithmetically from the
 * *tabular (civil) Islamic calendar* and ALWAYS label it "≈ … AH (calc.)".
 * Tabular conversion can differ from historically observed months by ±1–2 days
 * (and, at year granularity, occasionally ±1 year at year boundaries).
 * - Dates before the Hijra (622 CE) get no calculated AH value at all.
 */

import type { HDate } from "./types";

/* ---------------------------------------------------------------- */
/* Julian Day Number conversions (integer JDN, noon-based) */
/* ---------------------------------------------------------------- */

export function gregorianToJdn(
  year: number,
  month: number,
  day: number,
): number {
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  return (
    day +
    Math.floor((153 * m + 2) / 5) +
    365 * y +
    Math.floor(y / 4) -
    Math.floor(y / 100) +
    Math.floor(y / 400) -
    32045
  );
}

export function jdnToGregorian(jdn: number): {
  year: number;
  month: number;
  day: number;
} {
  const a = jdn + 32044;
  const b = Math.floor((4 * a + 3) / 146097);
  const c = a - Math.floor((146097 * b) / 4);
  const d = Math.floor((4 * c + 3) / 1461);
  const e = c - Math.floor((1461 * d) / 4);
  const m = Math.floor((5 * e + 2) / 153);
  return {
    day: e - Math.floor((153 * m + 2) / 5) + 1,
    month: m + 3 - 12 * Math.floor(m / 10),
    year: 100 * b + d - 4800 + Math.floor(m / 10),
  };
}

/** Civil (tabular) Islamic calendar, epoch Friday 16 July 622 CE (Julian) = JDN 1948440. */
const ISLAMIC_EPOCH_JDN = 1948440;

export function islamicToJdn(year: number, month: number, day: number): number {
  return (
    day +
    Math.ceil(29.5 * (month - 1)) +
    (year - 1) * 354 +
    Math.floor((3 + 11 * year) / 30) +
    ISLAMIC_EPOCH_JDN -
    1
  );
}

export function jdnToIslamic(jdn: number): {
  year: number;
  month: number;
  day: number;
} {
  let l = jdn - ISLAMIC_EPOCH_JDN + 10632;
  const n = Math.floor((l - 1) / 10631);
  l = l - 10631 * n + 354;
  const j =
    Math.floor((10985 - l) / 5316) * Math.floor((50 * l) / 17719) +
    Math.floor(l / 5670) * Math.floor((43 * l) / 15238);
  l =
    l -
    Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) -
    Math.floor(j / 16) * Math.floor((15238 * j) / 43) +
    29;
  const month = Math.floor((24 * l) / 709);
  const day = l - Math.floor((709 * month) / 24);
  const year = 30 * n + j - 30;
  return { year, month, day };
}

export const HIJRI_MONTHS = [
  "Muḥarram",
  "Ṣafar",
  "Rabīʿ al-Awwal",
  "Rabīʿ al-Thānī",
  "Jumādā al-Ūlā",
  "Jumādā al-Ākhira",
  "Rajab",
  "Shaʿbān",
  "Ramaḍān",
  "Shawwāl",
  "Dhū al-Qaʿda",
  "Dhū al-Ḥijja",
] as const;

/* ---------------------------------------------------------------- */
/* Year-level helpers used across the app */
/* ---------------------------------------------------------------- */

/** Approximate AH year in force at the middle of a given CE year (calculated, tabular). */
export function hijriYearForCE(ceYear: number): number | null {
  if (ceYear < 622) return null; // no calculated AH before the Hijra
  return jdnToIslamic(gregorianToJdn(ceYear, 7, 1)).year;
}

/** CE year in which a given AH year begins (tabular). Used for the AH axis. */
export function ceYearForHijriYearStart(ah: number): number {
  return jdnToGregorian(islamicToJdn(ah, 1, 1)).year;
}

/** Today's date in the tabular Islamic calendar (always labeled "calculated"). */
export function todayHijri(now: Date = new Date()): {
  year: number;
  month: number;
  day: number;
} {
  return jdnToIslamic(
    gregorianToJdn(now.getFullYear(), now.getMonth() + 1, now.getDate()),
  );
}

/* ---------------------------------------------------------------- */
/* Formatting */
/* ---------------------------------------------------------------- */

export function formatYearCE(year: number): string {
  if (year < 0) return `${-year} BCE`;
  return `${year}`;
}

/** "c. 570", "1263", "833–848", "570 (disputed)", or "undated" for precision 'unknown'. */
export function formatCEPart(d: HDate): string {
  if (d.precision === "unknown") return "undated";
  const y = formatYearCE(d.year);
  switch (d.precision) {
    case "circa":
      return `c. ${y}`;
    case "range":
      return d.endYear !== undefined ? `${y}–${formatYearCE(d.endYear)}` : y;
    case "disputed":
      return `${y}?`;
    default:
      return y;
  }
}

/** Hijri display for a single HDate: "256 AH" (attested) or "≈ 641 AH (calc.)" or null. */
export function formatAHPart(d: HDate): string | null {
  if (d.precision === "unknown") return null;
  if (d.hijri) {
    return d.hijri.source === "attested"
      ? `${d.hijri.year} AH`
      : `≈ ${d.hijri.year} AH (calc.)`;
  }
  const calc = hijriYearForCE(d.year);
  if (calc === null) return null;
  return `≈ ${calc} AH (calc.)`;
}

/** Effective AH year (attested if present, else calculated); null before the Hijra. */
export function ahYearOf(d: HDate): number | null {
  if (d.hijri) return d.hijri.year;
  return hijriYearForCE(d.year);
}

export function isAHCalculated(d: HDate): boolean {
  return !d.hijri || d.hijri.source === "calculated";
}

/**
 * Compact dual-calendar span, e.g.
 * "1263 – 1328 CE · 661 – 728 AH"
 * "c. 570 – 632 CE · d. 11 AH"
 */
export function formatSpanDual(
  start: HDate,
  end?: HDate,
  ongoing?: boolean,
): string {
  const ceStart = formatCEPart(start);
  const ceEnd = ongoing ? "present" : end ? formatCEPart(end) : null;
  const ce = ceEnd ? `${ceStart} – ${ceEnd} CE` : `${ceStart} CE`;

  const ahS = ahYearOf(start);
  const ahE = ongoing ? null : end ? ahYearOf(end) : null;
  const anyCalc = isAHCalculated(start) || (end ? isAHCalculated(end) : false);
  let ah = "";
  if (ahS !== null && ahE !== null) {
    ah = `${anyCalc ? "≈ " : ""}${ahS} – ${ahE} AH${anyCalc ? " (calc.)" : ""}`;
  } else if (ahS !== null && ongoing) {
    ah = `${isAHCalculated(start) ? "≈ " : ""}${ahS} AH${isAHCalculated(start) ? " (calc.)" : ""} – present`;
  } else if (ahS !== null && !end) {
    ah = `${isAHCalculated(start) ? "≈ " : ""}${ahS} AH${isAHCalculated(start) ? " (calc.)" : ""}`;
  } else if (ahS === null && ahE !== null && end) {
    ah = `d. ${isAHCalculated(end) ? "≈ " : ""}${ahE} AH${isAHCalculated(end) ? " (calc.)" : ""}`;
  }
  return ah ? `${ce} · ${ah}` : ce;
}

/** Badge text describing precision, or null when nothing special. */
export function precisionBadge(d: HDate): string | null {
  switch (d.precision) {
    case "circa":
      return "approximate";
    case "disputed":
      return "disputed";
    case "range":
      return "date range";
    case "unknown":
      return "undated, order per tradition";
    default:
      return null;
  }
}

const GREG_MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/** Full single-date string for detail panels, e.g. "29 May 1453 CE · 20 Jumādā al-Ūlā 857 AH". */
export function formatFullDate(d: HDate): string {
  if (d.precision === "unknown")
    return "Dating unknown, placed by traditional sequence only";
  let ce = formatCEPart(d);
  if (d.precision === "exact" && d.month) {
    ce = d.day
      ? `${d.day} ${GREG_MONTHS[d.month - 1]} ${formatYearCE(d.year)}`
      : `${GREG_MONTHS[d.month - 1]} ${formatYearCE(d.year)}`;
  }
  const ah = formatAHPart(d);
  return ah ? `${ce} CE · ${ah}` : `${ce} CE`;
}

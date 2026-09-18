/**
 * Classification and colour for the "schools & movements" column: madhāhib
 * (schools of law), schools of creed, branches of Islam, Sufi orders, and
 * modern currents. Uses a record's `tags[0]` when present, with a fallback map
 * for the older records that predate the tag.
 */
import type { TimelineRecord } from "./types";

export type SchoolCategory =
  "branch" | "madhhab" | "madhhab-shia" | "creed" | "tariqa" | "current";

const FALLBACK: Record<string, SchoolCategory> = {
  "hanafi-school": "madhhab",
  "maliki-school": "madhhab",
  "shafii-school": "madhhab",
  "hanbali-school": "madhhab",
  mutazila: "creed",
  "ashari-school": "creed",
  "maturidi-school": "creed",
  "twelver-shiism": "branch",
  "sufi-orders": "tariqa",
};

const VALID: SchoolCategory[] = [
  "branch",
  "madhhab",
  "madhhab-shia",
  "creed",
  "tariqa",
  "current",
];

export function schoolCategory(rec: TimelineRecord): SchoolCategory | null {
  const t = rec.tags?.[0];
  if (t && (VALID as string[]).includes(t)) return t as SchoolCategory;
  return FALLBACK[rec.id] ?? null;
}

export const CATEGORY_COLOR: Record<SchoolCategory, string> = {
  branch: "var(--brick)",
  madhhab: "var(--green)",
  "madhhab-shia": "var(--teal)",
  creed: "var(--lapis)",
  tariqa: "var(--gold)",
  current: "var(--plum)",
};

export const CATEGORY_LABEL: Record<SchoolCategory, string> = {
  branch: "Branch of Islam",
  madhhab: "School of law (Sunni)",
  "madhhab-shia": "School of law (Shīʿī)",
  creed: "School of creed",
  tariqa: "Sufi order",
  current: "Modern current",
};

/**
 * Data-access layer.
 *
 * All UI components read historical data through this module, never from the
 * record files directly. Replacing the static import with a database or CMS
 * later means changing only this file.
 */

import { allRecords } from "@/data/records";
import type {
  LaneId,
  RecordKind,
  Relation,
  RelationType,
  TimelineRecord,
} from "./types";
import { aliveIn, spanOf, type Span } from "./overlap";

export const NOW_YEAR = new Date().getFullYear();

/* ------------------------------ indexes ------------------------------ */

const byId = new Map<string, TimelineRecord>();
for (const r of allRecords) {
  if (byId.has(r.id)) throw new Error(`Duplicate record id: ${r.id}`);
  byId.set(r.id, r);
}

const INVERSE: Record<RelationType, RelationType> = {
  teacher_of: "student_of",
  student_of: "teacher_of",
  wrote: "written_by",
  written_by: "wrote",
  fought_in: "participant",
  participant: "fought_in",
  ruled_during: "occurred_under",
  occurred_under: "ruled_during",
  part_of: "related",
  founded: "founded_by",
  founded_by: "founded",
  influenced: "related",
  related: "related",
};

/** relations including inverses, resolved per record id */
const relationIndex = new Map<
  string,
  { type: RelationType; target: string; note?: string; inverse: boolean }[]
>();
for (const r of allRecords) relationIndex.set(r.id, []);
for (const r of allRecords) {
  for (const rel of r.relations ?? []) {
    if (!byId.has(rel.target)) continue; // integrity test flags these
    relationIndex.get(r.id)!.push({ ...rel, inverse: false });
    relationIndex.get(rel.target)!.push({
      type: INVERSE[rel.type],
      target: r.id,
      note: rel.note,
      inverse: true,
    });
  }
}

/* ------------------------------ queries ------------------------------ */

export function getAllRecords(): TimelineRecord[] {
  return allRecords;
}

export function getRecord(id: string): TimelineRecord | undefined {
  return byId.get(id);
}

export function getSpan(r: TimelineRecord): Span {
  return spanOf(r, NOW_YEAR);
}

export interface ResolvedRelation {
  type: RelationType;
  record: TimelineRecord;
  note?: string;
}

/** All relations of a record (declared + inverse), deduplicated. */
export function relationsOf(id: string): ResolvedRelation[] {
  const seen = new Set<string>();
  const out: ResolvedRelation[] = [];
  for (const rel of relationIndex.get(id) ?? []) {
    const key = `${rel.type}:${rel.target}`;
    if (seen.has(key)) continue;
    seen.add(key);
    const rec = byId.get(rel.target);
    if (rec) out.push({ type: rel.type, record: rec, note: rel.note });
  }
  return out;
}

/** Notable records whose spans overlap this record's span. */
export function contemporariesOf(
  id: string,
  opts?: { minImportance?: number; limit?: number },
): TimelineRecord[] {
  const rec = byId.get(id);
  if (!rec) return [];
  const s = getSpan(rec);
  const minImp = opts?.minImportance ?? 3;
  const related = new Set((relationIndex.get(id) ?? []).map((r) => r.target));
  const out = allRecords.filter((o) => {
    if (o.id === id || related.has(o.id)) return false;
    if (o.importance < minImp) return false;
    const so = getSpan(o);
    return so.start <= s.end && s.start <= so.end;
  });
  out.sort(
    (a, b) =>
      b.importance - a.importance ||
      Math.abs(getSpan(a).start - s.start) -
        Math.abs(getSpan(b).start - s.start),
  );
  return out.slice(0, opts?.limit ?? 10);
}

/** States/empires active in a given year, most important first. */
export function statesActiveIn(year: number): TimelineRecord[] {
  return aliveIn(
    allRecords.filter((r) => r.kind === "empire"),
    year,
    NOW_YEAR,
  ).sort((a, b) => b.importance - a.importance);
}

/** People alive in a given year (min importance filter), most important first. */
export function peopleAliveIn(
  year: number,
  minImportance = 3,
): TimelineRecord[] {
  return aliveIn(
    allRecords.filter(
      (r) => r.kind === "person" && r.importance >= minImportance,
    ),
    year,
    NOW_YEAR,
  ).sort((a, b) => b.importance - a.importance);
}

/** Everything whose span covers the year, for "what existed at this time". */
export function activeIn(year: number, minImportance = 2): TimelineRecord[] {
  return aliveIn(
    allRecords.filter((r) => r.importance >= minImportance),
    year,
    NOW_YEAR,
  ).sort((a, b) => b.importance - a.importance);
}

export function recordsByLane(lane: LaneId): TimelineRecord[] {
  return allRecords.filter((r) => r.lane === lane);
}

export function recordsByKind(kind: RecordKind): TimelineRecord[] {
  return allRecords.filter((r) => r.kind === kind);
}

/** Raw declared relations (for tests). */
export function declaredRelations(): { from: string; rel: Relation }[] {
  const out: { from: string; rel: Relation }[] = [];
  for (const r of allRecords)
    for (const rel of r.relations ?? []) out.push({ from: r.id, rel });
  return out;
}

/**
 * Human labels for record kinds, lanes and relation types, shared by the
 * detail panel, the record pages and the marker accessibility names.
 */
import type { LaneId, RecordKind, RelationType } from "./types";

export const KIND_LABEL: Record<string, string> = {
  person: "Person",
  book: "Book",
  empire: "State / dynasty",
  battle: "Battle",
  event: "Event",
  institution: "Institution",
  movement: "Movement",
  place: "Place",
};

/** The lane names as the legend and the filters spell them. */
export const LANE_LABEL: Record<LaneId, string> = {
  sirah: "Prophets & Sīrah عليهم السلام ﷺ",
  companions: "Companions & successors",
  scholars: "Scholars & schools",
  books: "Books & works",
  states: "States & dynasties",
  battles: "Battles & politics",
  science: "Science & medicine",
  culture: "Culture & institutions",
  world: "Wider world",
};

export const REL_LABEL: Record<RelationType, string> = {
  teacher_of: "Students",
  student_of: "Teachers",
  wrote: "Works",
  written_by: "Author",
  fought_in: "Battles",
  participant: "Participants",
  ruled_during: "Rulers & figures",
  occurred_under: "Under",
  part_of: "Part of",
  founded: "Founded",
  founded_by: "Founded by",
  influenced: "Influence",
  related: "Related",
};

/** The order the connection groups are listed in, author and teachers first. */
export const REL_ORDER: RelationType[] = [
  "written_by",
  "wrote",
  "student_of",
  "teacher_of",
  "founded_by",
  "founded",
  "occurred_under",
  "ruled_during",
  "fought_in",
  "participant",
  "part_of",
  "influenced",
  "related",
];

/** The word before each date: born and died for a person, composed for a book. */
export function dateLabels(kind: RecordKind): [start: string, end: string] {
  if (kind === "person") return ["Born", "Died"];
  if (kind === "book") return ["Composed", "Ends"];
  return ["Begins", "Ends"];
}

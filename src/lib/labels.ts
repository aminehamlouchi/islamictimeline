/**
 * Human labels for record kinds, relation types and lanes, shared by the detail panel,
 * the record pages and the marker accessibility names.
 */
import type { LaneId, RelationType } from "./types";

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

/** The lanes in the order the instrument draws them, and the filter panel lists them. */
export const LANE_ORDER: LaneId[] = [
  "sirah",
  "companions",
  "scholars",
  "books",
  "states",
  "battles",
  "science",
  "culture",
  "world",
];

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

/**
 * Human labels for record kinds and relation types, shared by the detail panel,
 * the record pages and the marker accessibility names.
 */
import type { RelationType } from "./types";

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

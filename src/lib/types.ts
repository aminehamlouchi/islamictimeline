/**
 * The Islamic Timeline, core data model.
 *
 * Every historical record in the app conforms to `TimelineRecord`.
 * The model is deliberately explicit about *date precision* and *uncertainty*:
 * nothing in the UI is allowed to present an approximate date as exact.
 *
 * See README.md ("Adding historical records") for authoring guidance.
 */

/** Broad content lane. Lanes are rendered as parallel columns beside the central line. */
export type LaneId =
  | "sirah" // The Prophet ﷺ & the earliest community (rendered on the central line)
  | "companions" // Companions & early generations
  | "scholars" // Scholars & intellectual history (hadith, fiqh, tafsir, theology…)
  | "books" // Books & written works as historical milestones
  | "states" // Caliphates, dynasties and states
  | "battles" // Battles, conquests, political-military events
  | "science" // Science, medicine, mathematics, technology
  | "culture" // Literature, art, architecture, institutions, trade
  | "world"; // Wider world context

export type RecordKind =
  | "person"
  | "book"
  | "empire"
  | "battle"
  | "event"
  | "institution"
  | "movement"
  | "place";

/** How confident we are in a date, and how it should be displayed. */
export type DatePrecision =
  | "exact" // attested to the day or month in mainstream sources
  | "year" // year is solid, day unknown
  | "circa" // approximate, displayed with "c."
  | "range" // known only within a range (use `endYear`)
  | "disputed" // sources disagree, see `note` and `altYears`
  | "unknown"; // no dating exists (earliest prophets): `year` is a LAYOUT slot only and is never displayed

export interface HijriDate {
  /** Hijri year (AH). */
  year: number;
  /**
   * 'attested', the AH date is the one recorded in the sources (typical for scholars' deaths).
   * 'calculated', derived arithmetically from the Gregorian year; displayed with "≈ … (calc.)".
   */
  source: "attested" | "calculated";
}

export interface HDate {
  /** Gregorian / Common Era year. Negative = BCE. */
  year: number;
  /** Optional month (1–12) and day when precision is 'exact'. */
  month?: number;
  day?: number;
  precision: DatePrecision;
  /** For precision 'range': the end of the plausible window. */
  endYear?: number;
  /** Attested Hijri year, when the sources record one. Omit to auto-calculate (labeled). */
  hijri?: HijriDate;
  /** Alternative years reported by other sources (for 'disputed'). */
  altYears?: number[];
  /** Human uncertainty note, e.g. "Year of the Elephant; traditional dating." */
  note?: string;
}

export type RelationType =
  | "teacher_of"
  | "student_of"
  | "wrote"
  | "written_by"
  | "fought_in"
  | "participant"
  | "ruled_during"
  | "occurred_under"
  | "part_of"
  | "founded"
  | "founded_by"
  | "influenced"
  | "related";

export interface Relation {
  type: RelationType;
  /** id of the target record. */
  target: string;
  /** Optional qualifier, e.g. "narrated from him", "present at the battle". */
  note?: string;
}

export interface Citation {
  /** e.g. "Encyclopaedia of Islam, 2nd ed. (Brill)" */
  source: string;
  /** e.g. 's.v. "Ibn Taymiyya" (H. Laoust)' */
  detail?: string;
  /** Optional stable URL. Only include when certain it exists. */
  url?: string;
}

export interface GeoPoint {
  name: string;
  lat: number;
  lng: number;
  /** true when the precise site is uncertain (e.g. some early battlefields). */
  approximate?: boolean;
}

/** A dated sub-event used to build nested timelines inside a record. */
export interface DetailEvent {
  date: HDate;
  label: string;
  note?: string;
}

export type RegionId =
  | "arabia"
  | "levant"
  | "iraq-iran"
  | "egypt-north-africa"
  | "andalus-maghrib"
  | "anatolia-balkans"
  | "central-asia"
  | "south-asia"
  | "southeast-asia"
  | "west-africa"
  | "east-africa"
  | "europe-world";

export interface TimelineRecord {
  id: string;
  kind: RecordKind;
  lane: LaneId;
  /** Display name (scholarly-lite transliteration). */
  name: string;
  /** Arabic name, rendered RTL. */
  arabic?: string;
  /** Short alternative names for search: "Averroes", "Saladin"… */
  aliases?: string[];
  /** Birth / founding / start / composition-start. */
  start: HDate;
  /** Death / fall / end. Omit for point events; `null` forbidden, use undefined. For living people / ongoing entities set `ongoing: true`. */
  end?: HDate;
  /** Still alive / still standing / still active. */
  ongoing?: boolean;
  /**
   * Editorial estimate of historical influence, 1–5.
   * Controls *display prominence only* (size, when a marker appears while zooming).
   * It is not a theological or moral endorsement, see the Methodology page.
   */
  importance: 1 | 2 | 3 | 4 | 5;
  region: RegionId;
  location?: GeoPoint;
  /** Extra geo points (e.g. birthplace vs. place of death, travel stations). */
  places?: GeoPoint[];
  summary: string;
  relations?: Relation[];
  citations: Citation[];
  tags?: string[];
  /** Nested timeline: reigns, imprisonments, compositions, campaign stages… */
  details?: DetailEvent[];
}

/** Era bands: broad orientation labels behind the timeline (not political claims). */
export interface Era {
  id: string;
  label: string;
  arabic?: string;
  startYear: number;
  endYear: number; // exclusive-ish; the most recent era may end at "now"
  tint: string; // css color token
}

/* ------------------------------------------------------------------ */
/* Map model */
/* ------------------------------------------------------------------ */

/**
 * Approximate, schematic extent of a state at a period snapshot.
 * Rendered as soft dashed ellipses, deliberately NOT precise borders.
 */
export interface ExtentBlob {
  /** center */
  lat: number;
  lng: number;
  /** radii in degrees of lon/lat (schematic) */
  rLng: number;
  rLat: number;
  label?: string;
}

export interface StateExtent {
  /** id of the `empire` record this extent belongs to */
  stateId: string;
  /** valid from (inclusive) … */
  fromYear: number;
  /** … to (exclusive) */
  toYear: number;
  blobs: ExtentBlob[];
}

export interface TradeRoute {
  id: string;
  label: string;
  /** [lng, lat] waypoints */
  points: [number, number][];
  fromYear: number;
  toYear: number;
}

export interface City {
  id: string;
  name: string;
  arabic?: string;
  lat: number;
  lng: number;
  /** year the city becomes relevant on the map (founding or rise) */
  fromYear: number;
  toYear?: number;
  /** center of learning, capital, port… shown in tooltip */
  role?: string;
  recordId?: string;
}

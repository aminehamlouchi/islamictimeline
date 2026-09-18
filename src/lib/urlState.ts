/**
 * Shareable URL state. Everything needed to reconstruct a view lives in the
 * query string: date, zoom, selection, comparison tray, filters, map, theme.
 */

import type { AppState } from "./store";
import type { LaneId } from "./types";

export type UrlState = Partial<
  Pick<
    AppState,
    | "centerYear"
    | "ppy"
    | "selectedId"
    | "compareIds"
    | "compareOpen"
    | "mapOpen"
    | "mapFollow"
    | "mapYear"
    | "lanesOff"
    | "minImportance"
    | "regionsOn"
    | "theme"
  >
>;

const LANES: LaneId[] = [
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

/** Shortest decimal string that still reproduces the view to the pixel. */
function num(v: number, digits: number): string {
  return String(Number(v.toPrecision(digits)));
}

export function serializeState(s: UrlState): string {
  const p = new URLSearchParams();
  // A tenth of a year was visible as a ~19 px jump at Detail zoom, so a shared
  // link no longer reproduced the view it was copied from. These keep the
  // reopened view pixel-identical; older, coarser links still parse.
  if (s.centerYear !== undefined)
    p.set("y", String(Number(s.centerYear.toFixed(5))));
  if (s.ppy !== undefined) p.set("z", num(s.ppy, 10));
  if (s.selectedId) p.set("sel", s.selectedId);
  if (s.compareIds && s.compareIds.length > 0)
    p.set("cmp", s.compareIds.join(","));
  if (s.compareOpen) p.set("cv", "1");
  if (s.mapOpen) p.set("map", "1");
  if (s.mapFollow === false) p.set("mf", "0");
  if (s.mapFollow === false && s.mapYear !== undefined)
    p.set("my", String(Math.round(s.mapYear)));
  if (s.lanesOff && s.lanesOff.length > 0) p.set("xl", s.lanesOff.join(","));
  if (s.minImportance && s.minImportance > 1)
    p.set("imp", String(s.minImportance));
  if (s.regionsOn && s.regionsOn.length > 0) p.set("rg", s.regionsOn.join(","));
  if (s.theme && s.theme !== "auto") p.set("th", s.theme);
  return p.toString();
}

export function parseState(query: string): UrlState {
  const p = new URLSearchParams(query);
  const out: UrlState = {};
  const y = parseFloat(p.get("y") ?? "");
  if (Number.isFinite(y)) out.centerYear = y;
  const z = parseFloat(p.get("z") ?? "");
  if (Number.isFinite(z) && z > 0) out.ppy = z;
  const sel = p.get("sel");
  if (sel) out.selectedId = sel;
  const cmp = p.get("cmp");
  if (cmp) out.compareIds = cmp.split(",").filter(Boolean).slice(0, 4);
  if (p.get("cv") === "1") out.compareOpen = true;
  if (p.get("map") === "1") out.mapOpen = true;
  if (p.get("mf") === "0") out.mapFollow = false;
  const my = parseInt(p.get("my") ?? "", 10);
  if (Number.isFinite(my)) out.mapYear = my;
  const xl = p.get("xl");
  if (xl)
    out.lanesOff = xl
      .split(",")
      .filter((l): l is LaneId => (LANES as string[]).includes(l));
  const imp = parseInt(p.get("imp") ?? "", 10);
  if (Number.isFinite(imp) && imp >= 1 && imp <= 5) out.minImportance = imp;
  const rg = p.get("rg");
  if (rg) out.regionsOn = rg.split(",").filter(Boolean);
  const th = p.get("th");
  if (th === "light" || th === "dark") out.theme = th;
  return out;
}

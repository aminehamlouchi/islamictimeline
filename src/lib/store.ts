"use client";

import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { clampCenterYear, clampPpy, TimeScale } from "./scale";
import { NOW_YEAR, getRecord, getSpan } from "./data";
import type { LaneId } from "./types";

export type Theme = "auto" | "light" | "dark";

export interface FlyTarget {
  year: number;
  ppy: number;
}

export interface AppState {
  centerYear: number;
  ppy: number;
  flyTarget: FlyTarget | null;
  selectedId: string | null;
  compareIds: string[];
  compareOpen: boolean;
  mapOpen: boolean;
  mapFollow: boolean;
  mapYear: number; // used when mapFollow is false
  legendOpen: boolean;
  filtersOpen: boolean;
  searchOpen: boolean;
  helpOpen: boolean;
  supportOpen: boolean;
  suggestOpen: boolean;
  /** Year currently under the pointer (null when not hovering the canvas). */
  hoverYear: number | null;
  lanesOff: LaneId[];
  minImportance: number;
  regionsOn: string[] | null; // null = all regions
  theme: Theme;
  onboardStep: number; // -1 = done/skip, 0..3 active
  // actions
  setView: (year: number, ppy: number) => void;
  panBy: (dYears: number) => void;
  /** Pan by a fixed number of SCREEN pixels, uniform speed across compressed bands. */
  panByPixels: (dpx: number) => void;
  setPpy: (ppy: number, anchorYear?: number) => void;
  flyTo: (year: number, ppy?: number) => void;
  cancelFly: () => void;
  returnToToday: () => void;
  select: (id: string | null, opts?: { fly?: boolean }) => void;
  toggleCompare: (id: string) => void;
  clearCompare: () => void;
  setCompareOpen: (open: boolean) => void;
  setMapOpen: (open: boolean) => void;
  setMapFollow: (follow: boolean) => void;
  setMapYear: (year: number) => void;
  setLegendOpen: (open: boolean) => void;
  setFiltersOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  setHelpOpen: (open: boolean) => void;
  setSupportOpen: (open: boolean) => void;
  setSuggestOpen: (open: boolean) => void;
  setHoverYear: (year: number | null) => void;
  toggleLane: (lane: LaneId) => void;
  setMinImportance: (imp: number) => void;
  toggleRegion: (region: string) => void;
  clearFilters: () => void;
  setTheme: (t: Theme) => void;
  setOnboardStep: (s: number) => void;
  hydrate: (partial: Partial<AppState>) => void;
}

export const DEFAULT_PPY = 2.6; // century view

/** Zoom needed for a record's span to fill ~55% of the viewport. */
export function ppyForSpan(spanYears: number, viewportH: number): number {
  const target = (viewportH * 0.55) / Math.max(spanYears, 2);
  return clampPpy(Math.min(target, 60));
}

export const useApp = create<AppState>()(
  subscribeWithSelector((set, get) => ({
    centerYear: NOW_YEAR - 130, // today sits ~110px from the top edge at century zoom
    ppy: DEFAULT_PPY,
    flyTarget: null,
    selectedId: null,
    compareIds: [],
    compareOpen: false,
    mapOpen: false,
    mapFollow: true,
    mapYear: 1258,
    legendOpen: false,
    filtersOpen: false,
    searchOpen: false,
    helpOpen: false,
    supportOpen: false,
    suggestOpen: false,
    hoverYear: null,
    lanesOff: [],
    minImportance: 1,
    regionsOn: null,
    theme: "auto",
    onboardStep: 0, // shown in the first frame; the head script hides it for returning visitors

    setView: (year, ppy) =>
      set({ centerYear: clampCenterYear(year, NOW_YEAR), ppy: clampPpy(ppy) }),
    panBy: (dYears) =>
      set((s) => ({
        centerYear: clampCenterYear(s.centerYear + dYears, NOW_YEAR),
        flyTarget: null,
      })),
    panByPixels: (dpx) =>
      set((s) => {
        const sc = new TimeScale(s.ppy, NOW_YEAR);
        const y = sc.yOf(s.centerYear) + dpx;
        return {
          centerYear: clampCenterYear(sc.yearOf(y), NOW_YEAR),
          flyTarget: null,
        };
      }),
    setPpy: (ppy, anchorYear) =>
      set((s) => {
        const next = clampPpy(ppy);
        if (anchorYear === undefined) return { ppy: next };
        // keep anchorYear at the same screen offset
        const offset = (s.centerYear - anchorYear) * s.ppy;
        return {
          ppy: next,
          centerYear: clampCenterYear(anchorYear + offset / next, NOW_YEAR),
        };
      }),
    flyTo: (year, ppy) =>
      set((s) => ({
        flyTarget: {
          year: clampCenterYear(year, NOW_YEAR),
          ppy: clampPpy(ppy ?? s.ppy),
        },
      })),
    cancelFly: () => set({ flyTarget: null }),
    returnToToday: () =>
      set({
        flyTarget: { year: NOW_YEAR - 130, ppy: DEFAULT_PPY },
        selectedId: null,
      }),
    select: (id, opts) => {
      set({ selectedId: id });
      if (id && opts?.fly !== false) {
        const rec = getRecord(id);
        if (rec) {
          const span = getSpan(rec);
          const mid = (span.start + span.end) / 2;
          const vh = typeof window !== "undefined" ? window.innerHeight : 900;
          const spanYears = span.end - span.start;
          const targetPpy =
            spanYears > 2 ? ppyForSpan(spanYears, vh) : Math.max(get().ppy, 11);
          set({
            flyTarget: {
              year: clampCenterYear(mid, NOW_YEAR),
              ppy: clampPpy(targetPpy),
            },
          });
        }
      }
    },
    toggleCompare: (id) =>
      set((s) => ({
        compareIds: s.compareIds.includes(id)
          ? s.compareIds.filter((x) => x !== id)
          : s.compareIds.length >= 4
            ? s.compareIds
            : [...s.compareIds, id],
      })),
    clearCompare: () => set({ compareIds: [], compareOpen: false }),
    setCompareOpen: (open) => set({ compareOpen: open }),
    setMapOpen: (open) => set({ mapOpen: open }),
    setMapFollow: (follow) => set({ mapFollow: follow }),
    setMapYear: (year) => set({ mapYear: Math.round(year) }),
    setLegendOpen: (open) => set({ legendOpen: open }),
    setFiltersOpen: (open) => set({ filtersOpen: open }),
    setSearchOpen: (open) => set({ searchOpen: open }),
    setHelpOpen: (open) => set({ helpOpen: open }),
    setSupportOpen: (open) => set({ supportOpen: open }),
    setSuggestOpen: (open) => set({ suggestOpen: open }),
    setHoverYear: (year) => set({ hoverYear: year }),
    toggleLane: (lane) =>
      set((s) => ({
        lanesOff: s.lanesOff.includes(lane)
          ? s.lanesOff.filter((l) => l !== lane)
          : [...s.lanesOff, lane],
      })),
    setMinImportance: (imp) => set({ minImportance: imp }),
    toggleRegion: (region) =>
      set((s) => {
        const cur = s.regionsOn;
        if (cur === null) return { regionsOn: [region] };
        const next = cur.includes(region)
          ? cur.filter((r) => r !== region)
          : [...cur, region];
        return { regionsOn: next.length === 0 ? null : next };
      }),
    clearFilters: () =>
      set({ lanesOff: [], minImportance: 1, regionsOn: null }),
    setTheme: (t) => set({ theme: t }),
    setOnboardStep: (s) => set({ onboardStep: s }),
    hydrate: (partial) => set(partial),
  })),
);

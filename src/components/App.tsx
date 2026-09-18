"use client";

/**
 * Application shell: wires URL state, keyboard navigation, and theme,
 * and composes the instrument with its chrome.
 */

import { useEffect } from "react";
import TimelineCanvas from "./TimelineCanvas";
import DetailPanel from "./DetailPanel";
import dynamic from "next/dynamic";

// The atlas carries the coastline, the schematic extents and the city list, and
// none of it is needed to paint the timeline. It arrives when it is opened.
const MapPanel = dynamic(() => import("./MapPanel"), { ssr: false });
import { CompareTray, CompareView } from "./Compare";
import {
  FiltersPanel,
  HelpSheet,
  Legend,
  LibraryPopover,
  Onboarding,
  SearchPalette,
} from "./Overlays";
import SupportCard from "./Support";
import SuggestModal from "./Suggest";
import {
  MobileYearPill,
  Observations,
  ReturnToToday,
  TopBar,
  YearIndicator,
  YearRail,
  ZoomControl,
} from "./Chrome";
import { useApp } from "@/lib/store";
import { parseState, serializeState } from "@/lib/urlState";

export default function App() {
  /* ------------------------- URL → store (load) ------------------------- */
  useEffect(() => {
    const patch = parseState(window.location.search);
    if (Object.keys(patch).length > 0) {
      useApp.getState().hydrate(patch);
      if (patch.selectedId) useApp.getState().select(patch.selectedId); // fly to it
    }
    // The atlas opens by default on screens wide enough to host it beside the
    // line, unless the URL says otherwise or the user closed it before.
    if (patch.mapOpen === undefined && window.innerWidth >= 1100) {
      let closedBefore = false;
      try {
        closedBefore = !!localStorage.getItem("itl-map-closed");
      } catch {}
      if (!closedBefore) useApp.getState().setMapOpen(true);
    }
    // Remember an explicit close so we don't nag on the next visit.
    let prev = useApp.getState().mapOpen;
    return useApp.subscribe(
      (s) => s.mapOpen,
      (open) => {
        if (open === prev) return;
        prev = open;
        try {
          if (open) localStorage.removeItem("itl-map-closed");
          else localStorage.setItem("itl-map-closed", "1");
        } catch {}
      },
    );
  }, []);

  /* ------------------------- store → URL (share) ------------------------ */
  useEffect(() => {
    let t: ReturnType<typeof setTimeout> | null = null;
    const unsub = useApp.subscribe(
      (s) => ({
        centerYear: s.centerYear,
        ppy: s.ppy,
        selectedId: s.selectedId,
        compareIds: s.compareIds,
        compareOpen: s.compareOpen,
        mapOpen: s.mapOpen,
        mapFollow: s.mapFollow,
        mapYear: s.mapYear,
        lanesOff: s.lanesOff,
        minImportance: s.minImportance,
        regionsOn: s.regionsOn,
        theme: s.theme,
      }),
      (slice) => {
        if (t) clearTimeout(t);
        t = setTimeout(() => {
          const q = serializeState(slice);
          window.history.replaceState(
            null,
            "",
            q ? `?${q}` : window.location.pathname,
          );
        }, 350);
      },
      { equalityFn: (a, b) => JSON.stringify(a) === JSON.stringify(b) },
    );
    return () => {
      unsub();
      if (t) clearTimeout(t);
    };
  }, []);

  /* ------------------------------- theme ------------------------------- */
  const theme = useApp((s) => s.theme);
  useEffect(() => {
    const el = document.documentElement;
    if (theme === "auto") el.removeAttribute("data-theme");
    else el.setAttribute("data-theme", theme);
  }, [theme]);

  /* ------------------------------ keyboard ----------------------------- */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const st = useApp.getState();
      const target = e.target as HTMLElement;
      const typing =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        st.setSearchOpen(true);
        return;
      }
      // Escape is the way out of a dialog, so it has to work while the cursor
      // is still in one of its fields.
      if (e.key === "Escape") {
        if (st.searchOpen) st.setSearchOpen(false);
        else if (st.suggestOpen) st.setSuggestOpen(false);
        else if (st.supportOpen) st.setSupportOpen(false);
        else if (st.helpOpen) st.setHelpOpen(false);
        else if (st.compareOpen) st.setCompareOpen(false);
        else if (st.legendOpen) st.setLegendOpen(false);
        else if (st.filtersOpen) st.setFiltersOpen(false);
        else if (st.selectedId) st.select(null);
        else if (st.mapOpen) st.setMapOpen(false);
        return;
      }
      if (typing) return;
      switch (e.key) {
        case "/":
          e.preventDefault();
          st.setSearchOpen(true);
          break;
        case "ArrowDown":
          e.preventDefault();
          st.panByPixels(e.shiftKey ? 600 : 120); // down → into the past
          break;
        case "ArrowUp":
          e.preventDefault();
          st.panByPixels(e.shiftKey ? -600 : -120); // up → toward today
          break;
        case "PageDown":
          e.preventDefault();
          st.flyTo(st.centerYear - 100);
          break;
        case "PageUp":
          e.preventDefault();
          st.flyTo(st.centerYear + 100);
          break;
        case "+":
        case "=":
          st.setPpy(st.ppy * 1.5, st.centerYear);
          break;
        case "-":
        case "_":
          st.setPpy(st.ppy / 1.5, st.centerYear);
          break;
        case "Home":
        case "0":
          st.returnToToday();
          break;
        case "m":
          st.setMapOpen(!st.mapOpen);
          break;
        case "c":
          if (st.compareIds.length >= 2) st.setCompareOpen(!st.compareOpen);
          break;
        case "l":
          st.setLegendOpen(!st.legendOpen);
          break;
        case "f":
          st.setFiltersOpen(!st.filtersOpen);
          break;
        case "?":
          st.setHelpOpen(!st.helpOpen);
          break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <main className="relative h-dvh w-full overflow-hidden">
      <TimelineCanvas />
      <TopBar />
      <YearIndicator />
      <MobileYearPill />
      <ReturnToToday />
      <ZoomControl />
      <YearRail />
      <Observations />
      <CompareTray />
      <CompareView />
      <MapPanel />
      <DetailPanel />
      <FiltersPanel />
      <Legend />
      <SearchPalette />
      <HelpSheet />
      <LibraryPopover />
      <SupportCard />
      <SuggestModal />
      <Onboarding />
    </main>
  );
}

"use client";

/**
 * Search palette (⌘K), filters, legend, onboarding, help & library.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import { getRecord } from "@/lib/data";
import { search, type SearchResult } from "@/lib/search";
import { useApp } from "@/lib/store";
import type { LaneId } from "@/lib/types";

/* ------------------------------- search ------------------------------- */

export function SearchPalette() {
  const open = useApp((s) => s.searchOpen);
  const { setSearchOpen, select, flyTo } = useApp.getState();
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const results = useMemo(() => search(q), [q]);

  useEffect(() => {
    if (open) {
      setQ("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open]);

  if (!open) return null;

  const go = (r: SearchResult) => {
    setSearchOpen(false);
    if (r.kind === "year" && r.year !== undefined) flyTo(r.year);
    else if (r.record) select(r.record.id);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[14vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Search"
    >
      <div
        className="absolute inset-0"
        style={{
          background: "color-mix(in srgb, var(--bg) 65%, transparent)",
          backdropFilter: "blur(2px)",
        }}
        onClick={() => setSearchOpen(false)}
      />
      <div
        className="panel relative w-[min(92vw,560px)] overflow-hidden"
        data-testid="search-palette"
      >
        <input
          ref={inputRef}
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setActive(0);
          }}
          onKeyDown={(e) => {
            if (e.key === "Escape") setSearchOpen(false);
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setActive((a) => Math.min(a + 1, results.length - 1));
            }
            if (e.key === "ArrowUp") {
              e.preventDefault();
              setActive((a) => Math.max(a - 1, 0));
            }
            if (e.key === "Enter" && results[active]) go(results[active]);
          }}
          placeholder="Search people, books, battles, states… or a year (1258, 656 AH, 13th century)"
          className="w-full bg-transparent px-4 py-3.5 text-[14.5px] outline-none"
          style={{ color: "var(--ink)" }}
          aria-label="Search the historical record"
          role="combobox"
          aria-expanded={results.length > 0}
          aria-controls="search-results"
          aria-autocomplete="list"
        />
        {results.length > 0 && (
          <ul
            id="search-results"
            className="nice-scroll max-h-[46vh] overflow-y-auto border-t"
            style={{ borderColor: "var(--panel-border)" }}
            role="listbox"
          >
            {results.map((r, i) => (
              <li
                key={`${r.kind}-${r.record?.id ?? r.year}-${i}`}
                role="option"
                aria-selected={i === active}
              >
                <button
                  className="flex w-full items-baseline justify-between gap-3 px-4 py-2 text-left"
                  style={{
                    background:
                      i === active
                        ? "color-mix(in srgb, var(--gold) 10%, transparent)"
                        : "transparent",
                  }}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => go(r)}
                >
                  <span
                    className="text-[13.5px]"
                    style={{ color: "var(--ink)" }}
                  >
                    {r.kind === "year" ? "⌖ " : ""}
                    {r.label}
                    {r.record?.arabic && (
                      <span
                        className="font-arabic ml-2 text-[13px]"
                        dir="rtl"
                        lang="ar"
                        style={{ color: "var(--ink-faint)" }}
                      >
                        {r.record.arabic}
                      </span>
                    )}
                  </span>
                  <span
                    className="shrink-0 text-[11px]"
                    style={{ color: "var(--ink-faint)" }}
                  >
                    {r.sublabel}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
        {q && results.length === 0 && (
          <p
            className="border-t px-4 py-3 text-[12.5px]"
            style={{
              color: "var(--ink-faint)",
              borderColor: "var(--panel-border)",
            }}
          >
            Nothing found, try another spelling (diacritics are optional), an
            alias, or a year.
          </p>
        )}
      </div>
    </div>
  );
}

/* ------------------------------- filters ------------------------------ */

const LANE_INFO: { id: LaneId; label: string; color: string }[] = [
  {
    id: "sirah",
    label: "Prophets & Sīrah عليهم السلام ﷺ",
    color: "var(--gold)",
  },
  { id: "companions", label: "Companions & successors", color: "var(--green)" },
  { id: "scholars", label: "Scholars & schools", color: "var(--green)" },
  { id: "books", label: "Books & works", color: "var(--gold)" },
  { id: "states", label: "States & dynasties", color: "var(--lapis)" },
  { id: "battles", label: "Battles & politics", color: "var(--brick)" },
  { id: "science", label: "Science & medicine", color: "var(--teal)" },
  { id: "culture", label: "Culture & institutions", color: "var(--plum)" },
  { id: "world", label: "Wider world", color: "var(--slate)" },
];

const REGION_INFO: { id: string; label: string }[] = [
  { id: "arabia", label: "Arabia" },
  { id: "levant", label: "Levant" },
  { id: "iraq-iran", label: "Iraq & Iran" },
  { id: "egypt-north-africa", label: "Egypt & N. Africa" },
  { id: "andalus-maghrib", label: "al-Andalus & Maghrib" },
  { id: "anatolia-balkans", label: "Anatolia & Balkans" },
  { id: "central-asia", label: "Central Asia" },
  { id: "south-asia", label: "South Asia" },
  { id: "southeast-asia", label: "Southeast Asia" },
  { id: "west-africa", label: "West Africa" },
  { id: "east-africa", label: "East Africa" },
  { id: "europe-world", label: "Europe & world" },
];

export function FiltersPanel() {
  const open = useApp((s) => s.filtersOpen);
  const lanesOff = useApp((s) => s.lanesOff);
  const regionsOn = useApp((s) => s.regionsOn);
  const minImportance = useApp((s) => s.minImportance);
  const {
    setFiltersOpen,
    toggleLane,
    toggleRegion,
    setMinImportance,
    clearFilters,
    flyTo,
  } = useApp.getState();

  if (!open) return null;
  return (
    <div
      className="panel nice-scroll fade-up fixed right-3 top-14 z-40 max-h-[80vh] w-[min(92vw,330px)] overflow-y-auto px-4 py-3.5"
      role="dialog"
      aria-label="Filters"
      data-testid="filters-panel"
    >
      <div className="mb-2.5 flex items-center justify-between">
        <h2 className="font-display text-[16px] font-semibold">Filters</h2>
        <div className="flex gap-1.5">
          <button className="btn" onClick={clearFilters}>
            Reset
          </button>
          <button
            className="btn"
            onClick={() => setFiltersOpen(false)}
            aria-label="Close filters"
          >
            ✕
          </button>
        </div>
      </div>

      <h3
        className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.14em]"
        style={{ color: "var(--ink-faint)" }}
      >
        Lanes
      </h3>
      <div className="mb-3 space-y-1">
        {LANE_INFO.map((l) => (
          <label
            key={l.id}
            className="flex cursor-pointer items-center gap-2 text-[13px]"
          >
            <input
              type="checkbox"
              checked={!lanesOff.includes(l.id)}
              onChange={() => toggleLane(l.id)}
              className="accent-[var(--gold)]"
            />
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ background: l.color }}
            />
            {l.label}
          </label>
        ))}
      </div>

      <h3
        className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.14em]"
        style={{ color: "var(--ink-faint)" }}
      >
        Regions {regionsOn === null ? "(all)" : `(${regionsOn.length})`}
      </h3>
      <div className="mb-3 flex flex-wrap gap-1">
        {REGION_INFO.map((r) => (
          <button
            key={r.id}
            className="chip"
            aria-pressed={regionsOn?.includes(r.id) ?? false}
            style={
              regionsOn?.includes(r.id)
                ? { borderColor: "var(--gold)", color: "var(--ink)" }
                : undefined
            }
            onClick={() => toggleRegion(r.id)}
          >
            {r.label}
          </button>
        ))}
      </div>

      <h3
        className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.14em]"
        style={{ color: "var(--ink-faint)" }}
      >
        Minimum prominence
      </h3>
      <input
        type="range"
        min={1}
        max={5}
        value={minImportance}
        onChange={(e) => setMinImportance(parseInt(e.target.value, 10))}
        className="w-full accent-[var(--gold)]"
        aria-label="Minimum prominence"
      />
      <p className="mb-3 text-[11px]" style={{ color: "var(--ink-faint)" }}>
        {minImportance === 1
          ? "Showing everything the zoom level allows."
          : `Only items of prominence ${minImportance}+.`}
      </p>

      <h3
        className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.14em]"
        style={{ color: "var(--ink-faint)" }}
      >
        Jump to century
      </h3>
      <div className="flex flex-wrap gap-1">
        {[7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21].map((c) => (
          <button
            key={c}
            className="chip"
            onClick={() => flyTo((c - 1) * 100 + 50, 2.6)}
          >
            {c}th
          </button>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------- legend ------------------------------- */

export function Legend() {
  const open = useApp((s) => s.legendOpen);
  const setLegendOpen = useApp((s) => s.setLegendOpen);
  if (!open) return null;
  return (
    <div
      className="panel fade-up fixed bottom-4 right-3 z-40 w-[min(92vw,330px)] px-4 py-3.5"
      role="dialog"
      aria-label="Legend"
      data-testid="legend"
    >
      <div className="mb-2 flex items-center justify-between">
        <h2 className="font-display text-[16px] font-semibold">Legend</h2>
        <button
          className="btn"
          onClick={() => setLegendOpen(false)}
          aria-label="Close legend"
        >
          ✕
        </button>
      </div>
      <ul
        className="space-y-1.5 text-[12.5px]"
        style={{ color: "var(--ink-soft)" }}
      >
        <li>
          <span style={{ color: "var(--gold)" }}>●</span> Prophetic era ﷺ (on
          the line) · <span style={{ color: "var(--gold)" }}>❧</span> books
        </li>
        <li>
          <span style={{ color: "var(--green)" }}>▮</span> people, lifespan
          bars, thicker = more prominent
        </li>
        <li>
          <span style={{ color: "var(--lapis)" }}>⬒</span> states & dynasties,
          translucent bands (left)
        </li>
        <li>
          <span style={{ color: "var(--brick)" }}>◆</span> battles & political
          events (left of the line)
        </li>
        <li>
          <span style={{ color: "var(--teal)" }}>◠</span> institutions ·{" "}
          <span style={{ color: "var(--slate)" }}>▪</span> wider world (far
          left)
        </li>
        <li>│ thin threads (far right), schools & movements</li>
      </ul>
      <h3
        className="mb-1 mt-3 text-[11px] font-semibold uppercase tracking-[0.14em]"
        style={{ color: "var(--ink-faint)" }}
      >
        Certainty
      </h3>
      <ul
        className="space-y-1 text-[12.5px]"
        style={{ color: "var(--ink-soft)" }}
      >
        <li>Solid caps/fills, attested dates · hollow or ≈, approximate</li>
        <li>Dashed outlines, approximate or disputed ranges</li>
        <li>
          “1258 CE · 656 AH”, attested Hijri; “≈ 656 AH (calc.)”, computed,
          tabular
        </li>
        <li>
          Atlas ellipses, schematic core regions, <em>never</em> precise borders
        </li>
      </ul>
      <h3
        className="mb-1 mt-3 text-[11px] font-semibold uppercase tracking-[0.14em]"
        style={{ color: "var(--ink-faint)" }}
      >
        Prominence sizing
      </h3>
      <p className="text-[12px]" style={{ color: "var(--ink-soft)" }}>
        Marker size reflects an editorial estimate of historical influence for
        display only, it is not a religious ranking. Zoom in (or hover) to
        reveal less prominent records.
      </p>
    </div>
  );
}

/* ----------------------------- onboarding ----------------------------- */

const STEPS = [
  {
    title: "Today is at the top",
    body: "Scroll, drag, or press ↓ to travel back through fourteen centuries, and beyond, along the line of the prophets عليهم السلام all the way to Ādam عليه السلام. Where dates are honest, spacing is true to time; where only tradition's order survives, the line says so.",
  },
  {
    title: "Hover near the line",
    body: "Move your pointer along the central line: the nearby decades magnify and quieter records reveal themselves. You are inspecting time, not reading a list.",
  },
  {
    title: "Click anything",
    body: "Every person, book, battle, and state opens a focused view, its own inner timeline, teachers and students, sources, and what else existed at that moment.",
  },
  {
    title: "Zoom, compare, map",
    body: "Use the zoom presets (bottom-left), add records to the comparison tray, and open the Atlas to watch the political map shift with the centuries. Press ? anytime for shortcuts.",
  },
];

export function Onboarding() {
  const step = useApp((s) => s.onboardStep);
  const setOnboardStep = useApp((s) => s.setOnboardStep);

  useEffect(() => {
    try {
      if (!localStorage.getItem("itl-onboarded")) setOnboardStep(0);
    } catch {
      /* private mode */
    }
  }, [setOnboardStep]);

  if (step < 0 || step >= STEPS.length) return null;
  const done = () => {
    try {
      localStorage.setItem("itl-onboarded", "1");
    } catch {}
    setOnboardStep(-1);
  };
  const s = STEPS[step];
  return (
    <div
      className="fixed inset-x-0 bottom-16 z-50 flex justify-center px-4"
      role="dialog"
      aria-label="Introduction"
    >
      <div
        className="panel fade-up w-[min(94vw,440px)] px-5 py-4"
        data-testid="onboarding"
      >
        <div
          className="mb-1 text-[10.5px] uppercase tracking-[0.18em]"
          style={{ color: "var(--gold)" }}
        >
          {step + 1} / {STEPS.length}
        </div>
        <h2
          className="font-display text-[18px] font-semibold"
          style={{ color: "var(--ink)" }}
        >
          {s.title}
        </h2>
        <p
          className="mt-1 text-[13px] leading-relaxed"
          style={{ color: "var(--ink-soft)" }}
        >
          {s.body}
        </p>
        <div className="mt-3 flex justify-between">
          <button className="btn" onClick={done}>
            Skip
          </button>
          <button
            className="btn"
            style={{ borderColor: "var(--gold)", color: "var(--gold-ink)" }}
            onClick={() =>
              step === STEPS.length - 1 ? done() : setOnboardStep(step + 1)
            }
          >
            {step === STEPS.length - 1 ? "Begin exploring" : "Next →"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------- help -------------------------------- */

export function HelpSheet() {
  const open = useApp((s) => s.helpOpen);
  const setHelpOpen = useApp((s) => s.setHelpOpen);
  if (!open) return null;
  const rows: [string, string][] = [
    ["↓ / ↑ · scroll · drag", "travel through time"],
    ["Shift + scroll", "travel faster"],
    ["+ / − · ⌘ scroll · pinch", "zoom (around the cursor)"],
    ["Double-click", "zoom into a moment"],
    ["Home / 0", "return to today"],
    ["PgUp / PgDn", "jump a century"],
    ["⌘K or /", "search"],
    ["Enter / Space on a marker", "open details"],
    ["Esc", "close panels, clear selection"],
    ["m · c · l · f", "atlas · compare · legend · filters"],
  ];
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Help"
    >
      <div
        className="absolute inset-0"
        style={{ background: "color-mix(in srgb, var(--bg) 70%, transparent)" }}
        onClick={() => setHelpOpen(false)}
      />
      <div className="panel relative w-[min(94vw,420px)] px-5 py-4">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="font-display text-[18px] font-semibold">
            Using the instrument
          </h2>
          <button
            className="btn"
            onClick={() => setHelpOpen(false)}
            aria-label="Close help"
          >
            ✕
          </button>
        </div>
        <table className="w-full text-[12.5px]">
          <tbody>
            {rows.map(([k, v]) => (
              <tr key={k}>
                <td className="py-1 pr-3" style={{ color: "var(--gold)" }}>
                  {k}
                </td>
                <td style={{ color: "var(--ink-soft)" }}>{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ------------------------------- library ------------------------------ */

export function LibraryPopover() {
  const [openList, setOpenList] = useState(false);
  const [ids, setIds] = useState<string[]>([]);
  const select = useApp((s) => s.select);
  useEffect(() => {
    if (!openList) return;
    try {
      setIds(JSON.parse(localStorage.getItem("itl-bookmarks") ?? "[]"));
    } catch {
      setIds([]);
    }
  }, [openList]);
  return (
    <div className="fixed bottom-4 right-12 z-30 hidden sm:block">
      <button
        className="btn"
        aria-pressed={openList}
        onClick={() => setOpenList(!openList)}
        aria-label="Saved records"
      >
        ★
      </button>
      {openList && (
        <div
          className="panel absolute bottom-10 right-0 w-64 px-3 py-2.5"
          data-testid="library"
        >
          <h3
            className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.14em]"
            style={{ color: "var(--ink-faint)" }}
          >
            Saved
          </h3>
          {ids.length === 0 ? (
            <p className="text-[12px]" style={{ color: "var(--ink-faint)" }}>
              Nothing saved yet, open a record and press ☆.
            </p>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {ids.map((id) => {
                const r = getRecord(id);
                return r ? (
                  <button
                    key={id}
                    className="chip"
                    onClick={() => {
                      select(id);
                      setOpenList(false);
                    }}
                  >
                    {r.name}
                  </button>
                ) : null;
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

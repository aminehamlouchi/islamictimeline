"use client";

/**
 * App chrome around the instrument: wordmark bar, year indicator, zoom
 * control, era rail, observations strip, return-to-today.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import { NOW_YEAR } from "@/lib/data";
import { hijriYearForCE, todayHijri, HIJRI_MONTHS } from "@/lib/dates";
import { eraForYear, ERAS } from "@/lib/eras";
import { observationFor } from "@/lib/observations";
import { DEFAULT_PPY, useApp } from "@/lib/store";
import {
  bandOf,
  DOMAIN_BOTTOM,
  TimeScale,
  ZOOM_LEVELS,
  zoomLevelFor,
} from "@/lib/scale";
import { getAllRecords, getSpan } from "@/lib/data";

/* ------------------------------ top bar ------------------------------ */

export function TopBar() {
  const {
    setSearchOpen,
    setFiltersOpen,
    setLegendOpen,
    setMapOpen,
    setCompareOpen,
    setHelpOpen,
    setSupportOpen,
    setSuggestOpen,
    setTheme,
  } = useApp.getState();
  const compareIds = useApp((s) => s.compareIds);
  const mapOpen = useApp((s) => s.mapOpen);
  const filtersOpen = useApp((s) => s.filtersOpen);
  const legendOpen = useApp((s) => s.legendOpen);
  const theme = useApp((s) => s.theme);

  const cycleTheme = () =>
    setTheme(theme === "auto" ? "dark" : theme === "dark" ? "light" : "auto");

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 flex items-start justify-between gap-3 px-4 pt-3 sm:px-5">
      <div className="pointer-events-auto shrink-0 select-none">
        <h1
          className="font-display whitespace-nowrap text-[16px] font-semibold leading-tight tracking-wide sm:text-[19px]"
          style={{ color: "var(--ink)" }}
        >
          The Islamic Timeline
        </h1>
        <p
          className="font-arabic hidden text-[15px] leading-tight sm:block"
          style={{ color: "var(--ink-soft)" }}
          dir="rtl"
          lang="ar"
        >
          الخطّ الزمني للتاريخ الإسلامي
        </p>
      </div>
      <nav
        className="pointer-events-auto flex flex-wrap items-center justify-end gap-1.5"
        aria-label="Application controls"
      >
        <button
          className="btn"
          style={{ borderColor: "var(--gold)", color: "var(--gold)" }}
          onClick={() => setSupportOpen(true)}
          data-testid="support-button"
          aria-label="Support this project"
        >
          ♥ <span className="hidden sm:inline">Support</span>
        </button>
        <button
          className="btn"
          onClick={() => setSearchOpen(true)}
          aria-keyshortcuts="Meta+K"
          aria-label="Search"
        >
          ⌕ <span className="hidden sm:inline">Search</span>{" "}
          <kbd className="badge hidden sm:inline">⌘K</kbd>
        </button>
        <button
          className="btn"
          onClick={() => setSuggestOpen(true)}
          aria-label="Suggest a record"
          title="Suggest a record"
        >
          ＋ <span className="hidden sm:inline">Suggest</span>
        </button>
        <button
          className="btn"
          aria-pressed={filtersOpen}
          onClick={() => setFiltersOpen(!filtersOpen)}
          aria-label="Filters"
        >
          ⚙ <span className="hidden sm:inline">Filters</span>
        </button>
        <button
          className="btn"
          aria-pressed={compareIds.length > 0}
          onClick={() => setCompareOpen(true)}
          disabled={compareIds.length === 0}
          style={compareIds.length === 0 ? { opacity: 0.55 } : undefined}
          aria-label="Compare"
        >
          ⇄{" "}
          <span className="hidden sm:inline">
            Compare{compareIds.length > 0 ? ` (${compareIds.length})` : ""}
          </span>
          {compareIds.length > 0 ? (
            <span className="sm:hidden">{compareIds.length}</span>
          ) : null}
        </button>
        <button
          className="btn"
          aria-pressed={mapOpen}
          onClick={() => setMapOpen(!mapOpen)}
          aria-label="Atlas"
        >
          ⌖ <span className="hidden sm:inline">Atlas</span>
        </button>
        <button
          className="btn hidden sm:inline-flex"
          aria-pressed={legendOpen}
          onClick={() => setLegendOpen(!legendOpen)}
        >
          Legend
        </button>
        <button
          className="btn"
          onClick={cycleTheme}
          aria-label={`Theme: ${theme}. Click to change.`}
          title={`Theme: ${theme}`}
        >
          {theme === "dark" ? "◐" : theme === "light" ? "○" : "◑"}
        </button>
        <button
          className="btn hidden sm:inline-flex"
          onClick={() => setHelpOpen(true)}
          aria-label="Keyboard shortcuts and help"
        >
          ?
        </button>
        <a className="btn hidden sm:inline-flex" href="./methodology/">
          Methodology
        </a>
      </nav>
    </header>
  );
}

/* ------------------------- mobile year pill ------------------------- */

export function MobileYearPill() {
  const centerYear = useApp((s) => s.centerYear);
  const y = Math.round(Math.min(centerYear, NOW_YEAR));
  const band = bandOf(y);
  const ah = hijriYearForCE(y);
  const atToday = NOW_YEAR - y < 6;
  const label = band
    ? "earliest prophets"
    : atToday
      ? "Today"
      : y < 0
        ? `${-y} BCE`
        : `${y} CE`;
  return (
    <div className="pointer-events-none fixed left-1/2 top-14 z-30 -translate-x-1/2 sm:hidden">
      <div
        className="panel px-3 py-1 text-center"
        style={{ borderRadius: 999 }}
        aria-live="polite"
      >
        <span
          className="font-display text-[15px] font-semibold"
          style={{ color: band ? "var(--gold)" : "var(--ink)" }}
        >
          {label}
        </span>
        {ah !== null && !band && (
          <span className="ml-1.5 text-[11px]" style={{ color: "var(--gold)" }}>
            ≈ {ah} AH
          </span>
        )}
      </div>
    </div>
  );
}

/* --------------------------- year indicator --------------------------- */

export function YearIndicator() {
  const centerYear = useApp((s) => s.centerYear);
  const hoverYear = useApp((s) => s.hoverYear);
  const ppy = useApp((s) => s.ppy);
  // The readout follows the cursor when hovering the timeline; otherwise it
  // reports the year passing through the middle of the viewport.
  const tracking = hoverYear !== null;
  const refYear = hoverYear ?? centerYear;
  const y = Math.round(Math.min(refYear, NOW_YEAR));
  const ah = hijriYearForCE(y);
  const era = eraForYear(y);
  const level = zoomLevelFor(ppy);
  const back = NOW_YEAR - y;

  const today = useMemo(() => {
    const h = todayHijri();
    const d = new Date();
    return { h, d };
  }, []);

  // "Today" card while the today-cap is on screen and we're not tracking a cursor
  const vh = typeof window !== "undefined" ? window.innerHeight : 900;
  const atToday = !tracking && (NOW_YEAR - centerYear) * ppy < vh / 2 + 20;

  return (
    <div
      className="panel pointer-events-none fixed left-4 top-1/2 z-30 hidden -translate-y-1/2 px-4 py-3 sm:block"
      aria-live="polite"
      aria-atomic="true"
      data-testid="year-indicator"
    >
      {atToday ? (
        <>
          <div
            className="font-display text-[26px] font-semibold leading-none"
            style={{ color: "var(--today)" }}
          >
            Today
          </div>
          <div
            className="mt-1.5 text-[12px]"
            style={{ color: "var(--ink-soft)" }}
          >
            {today.d.toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>
          <div className="text-[12px]" style={{ color: "var(--ink-soft)" }}>
            ≈ {today.h.day} {HIJRI_MONTHS[today.h.month - 1]} {today.h.year} AH{" "}
            <span style={{ color: "var(--ink-faint)" }}>(calc.)</span>
          </div>
        </>
      ) : (
        (() => {
          const band = bandOf(y);
          if (band && !band.dated) {
            return (
              <>
                <div
                  className="font-display text-[21px] font-semibold leading-tight"
                  style={{ color: "var(--gold)" }}
                >
                  Earliest prophets
                </div>
                <div
                  className="font-arabic text-[17px]"
                  dir="rtl"
                  lang="ar"
                  style={{ color: "var(--ink-soft)" }}
                >
                  عليهم السلام
                </div>
                <div
                  className="mt-1.5 text-[11.5px]"
                  style={{ color: "var(--ink-soft)" }}
                >
                  dating unknown, order per tradition
                </div>
              </>
            );
          }
          return (
            <>
              <div
                className="font-display text-[30px] font-semibold leading-none"
                style={{ color: "var(--ink)" }}
              >
                {y < 0 ? -y : y}{" "}
                <span
                  className="text-[15px]"
                  style={{ color: "var(--ink-faint)" }}
                >
                  {y < 0 ? "BCE" : "CE"}
                </span>
              </div>
              {ah !== null && (
                <div
                  className="mt-1 text-[13px]"
                  style={{ color: "var(--gold)" }}
                >
                  ≈ {ah} AH{" "}
                  <span style={{ color: "var(--ink-faint)" }}>(calc.)</span>
                </div>
              )}
              {band && band.dated && band.from <= -100 && (
                <div
                  className="mt-1 text-[11px]"
                  style={{ color: "var(--brick)" }}
                >
                  traditional dating, disputed
                </div>
              )}
              <div
                className="mt-1.5 text-[11.5px] uppercase tracking-widest"
                style={{ color: "var(--ink-faint)" }}
              >
                {era.label}
              </div>
              <div
                className="mt-0.5 text-[11.5px]"
                style={{ color: "var(--ink-soft)" }}
              >
                {back.toLocaleString()} years back ·{" "}
                {tracking ? "at cursor" : `${level.label.toLowerCase()} view`}
              </div>
            </>
          );
        })()
      )}
    </div>
  );
}

/* ---------------------------- zoom control ---------------------------- */

export function ZoomControl() {
  const ppy = useApp((s) => s.ppy);
  const { setPpy } = useApp.getState();
  const centerYear = useApp((s) => s.centerYear);
  const mapOpen = useApp((s) => s.mapOpen);
  const level = zoomLevelFor(ppy);
  return (
    <div
      className={`panel fixed bottom-4 left-4 z-30 flex items-center gap-1 px-2 py-1.5 ${
        mapOpen ? "sm:left-[calc(min(94vw,560px)+2rem)] 2xl:left-[668px]" : ""
      }`}
      role="group"
      aria-label="Zoom"
    >
      <button
        className="btn"
        style={{ padding: "3px 9px" }}
        onClick={() => setPpy(ppy / 1.9, centerYear)}
        aria-label="Zoom out"
      >
        −
      </button>
      <div className="flex flex-col items-stretch">
        {ZOOM_LEVELS.map((z) => (
          <button
            key={z.id}
            onClick={() => setPpy(z.ppy, centerYear)}
            aria-pressed={level.id === z.id}
            className="rounded px-2 py-[1px] text-left text-[10.5px] leading-[1.5] transition-colors"
            style={{
              color: level.id === z.id ? "var(--gold)" : "var(--ink-faint)",
              fontWeight: level.id === z.id ? 650 : 400,
            }}
          >
            {z.label}
          </button>
        ))}
      </div>
      <button
        className="btn"
        style={{ padding: "3px 9px" }}
        onClick={() => setPpy(ppy * 1.9, centerYear)}
        aria-label="Zoom in"
      >
        +
      </button>
    </div>
  );
}

/* --------------------------- return to today --------------------------- */

export function ReturnToToday() {
  const centerYear = useApp((s) => s.centerYear);
  const returnToToday = useApp((s) => s.returnToToday);
  if (NOW_YEAR - centerYear < 60) return null;
  return (
    <button
      className="btn fade-up fixed left-1/2 top-[6.5rem] z-30 -translate-x-1/2 sm:top-16"
      style={{ borderColor: "var(--gold)", color: "var(--gold)" }}
      onClick={returnToToday}
      data-testid="return-to-today"
    >
      ↑ Return to today
    </button>
  );
}

/* ------------------------------ era rail ------------------------------ */

export function YearRail() {
  const ref = useRef<HTMLDivElement>(null);
  const centerYear = useApp((s) => s.centerYear);
  const ppy = useApp((s) => s.ppy);
  const flyTo = useApp((s) => s.flyTo);
  const [h, setH] = useState(600);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setH(el.clientHeight));
    ro.observe(el);
    setH(el.clientHeight);
    return () => ro.disconnect();
  }, []);

  const yFor = (year: number) =>
    ((NOW_YEAR - year) / (NOW_YEAR - DOMAIN_BOTTOM)) * h;
  const yearFor = (py: number) =>
    NOW_YEAR - (py / h) * (NOW_YEAR - DOMAIN_BOTTOM);

  const majors = useMemo(
    () => getAllRecords().filter((r) => r.importance >= 5),
    [],
  );

  // viewport window on the rail
  const scale = new TimeScale(ppy, NOW_YEAR);
  const vh = typeof window !== "undefined" ? window.innerHeight : 800;
  const winTopYear = scale.yearOf(scale.yOf(centerYear) - vh / 2);
  const winBottomYear = scale.yearOf(scale.yOf(centerYear) + vh / 2);

  const onPointer = (e: React.PointerEvent) => {
    if (e.buttons !== 1 && e.type !== "pointerdown") return;
    const rect = ref.current!.getBoundingClientRect();
    flyTo(yearFor(e.clientY - rect.top));
  };

  return (
    <div
      ref={ref}
      className="fixed bottom-2 right-2 top-14 z-30 hidden w-7 cursor-pointer sm:block"
      onPointerDown={onPointer}
      onPointerMove={onPointer}
      role="slider"
      aria-label="Era navigation rail, click to jump through history"
      aria-valuemin={DOMAIN_BOTTOM}
      aria-valuemax={NOW_YEAR}
      aria-valuenow={Math.round(centerYear)}
      aria-orientation="vertical"
      tabIndex={0}
      data-testid="year-rail"
    >
      <svg width="28" height={h} className="block overflow-visible">
        {ERAS.map((era, i) => {
          const y1 = yFor(Math.min(era.endYear, NOW_YEAR));
          const y2 = yFor(era.startYear);
          return (
            <rect
              key={era.id}
              x={10}
              y={y1}
              width={8}
              height={Math.max(y2 - y1, 1)}
              rx={2}
              fill={i % 2 ? "var(--ink)" : "var(--sand)"}
              opacity={i % 2 ? 0.14 : 0.5}
            >
              <title>{era.label}</title>
            </rect>
          );
        })}
        {majors.map((r) => {
          const s = getSpan(r);
          return (
            <circle
              key={r.id}
              cx={14}
              cy={yFor((s.start + s.end) / 2)}
              r={1.6}
              fill="var(--gold)"
              opacity={0.9}
            />
          );
        })}
        {/* viewport window */}
        <rect
          x={7}
          y={yFor(Math.min(winTopYear, NOW_YEAR))}
          width={14}
          height={Math.max(
            yFor(winBottomYear) - yFor(Math.min(winTopYear, NOW_YEAR)),
            8,
          )}
          rx={4}
          fill="none"
          stroke="var(--gold)"
          strokeWidth={1.6}
        />
      </svg>
    </div>
  );
}

/* ---------------------------- observations ---------------------------- */

export function Observations() {
  const centerYear = useApp((s) => s.centerYear);
  const select = useApp((s) => s.select);
  const selectedId = useApp((s) => s.selectedId);
  const compareOpen = useApp((s) => s.compareOpen);
  const [obs, setObs] = useState<{ text: string; ids: string[] } | null>(null);

  // settle: update after the viewport rests briefly
  useEffect(() => {
    const t = setTimeout(() => setObs(observationFor(centerYear)), 260);
    return () => clearTimeout(t);
  }, [centerYear]);

  if (!obs || selectedId || compareOpen) return null;
  return (
    <button
      className="fade-up fixed bottom-4 left-1/2 z-20 max-w-[min(88vw,640px)] -translate-x-1/2 px-4 py-1.5 text-center"
      style={{
        background: "transparent",
        border: "none",
        cursor: obs.ids.length ? "pointer" : "default",
      }}
      onClick={() => obs.ids[0] && select(obs.ids[0])}
      aria-live="polite"
      data-testid="observation"
    >
      <span
        className="font-display text-[14.5px] italic"
        style={{ color: "var(--ink-soft)" }}
      >
        {obs.text}
      </span>
    </button>
  );
}

/* ------------------------------- pre-hijra note ------------------------ */

export function DefaultPpyNote() {
  return null;
}

export { DEFAULT_PPY };

"use client";

/**
 * Synchronized historical atlas, an offline schematic SVG map.
 * Land outline: Natural Earth (public domain). State extents are soft,
 * dashed, clearly-approximate ellipses (see Methodology); cities, battles,
 * routes and selected-figure journeys render on top.
 */

import { useEffect, useMemo, useState } from "react";
import { cities } from "@/data/geo/cities";
import { tradeRoutes } from "@/data/geo/routes";
import {
  LAND_PATH,
  LAND_VIEWBOX,
  projectX,
  projectY,
} from "@/data/geo/land-path";
import {
  loadBorderYear,
  nearestBorderKeyframe,
  type BorderYear,
} from "@/data/geo/borders-meta";
import { getAllRecords, getRecord, NOW_YEAR, statesActiveIn } from "@/lib/data";
import { hijriYearForCE } from "@/lib/dates";
import { useApp } from "@/lib/store";

const STATE_COLORS = [
  "var(--lapis)",
  "var(--green)",
  "var(--brick)",
  "var(--plum)",
  "var(--teal)",
  "var(--gold)",
  "var(--slate)",
];

export default function MapPanel() {
  const mapOpen = useApp((s) => s.mapOpen);
  const mapFollow = useApp((s) => s.mapFollow);
  const mapYear = useApp((s) => s.mapYear);
  const centerYear = useApp((s) => s.centerYear);
  const hoverYear = useApp((s) => s.hoverYear);
  const selectedId = useApp((s) => s.selectedId);
  const { setMapOpen, setMapFollow, setMapYear, flyTo, select } =
    useApp.getState();

  // When following the timeline, the atlas tracks the cursor if you are
  // hovering the line, otherwise the middle of the viewport.
  const followYear = hoverYear ?? centerYear;
  const year = Math.round(Math.min(mapFollow ? followYear : mapYear, NOW_YEAR));
  const ah = hijriYearForCE(year);

  const activeStates = useMemo(() => statesActiveIn(year), [year]);
  /** Muslim-ruled states active in this exact year (from the timeline records). */
  const muslimStates = useMemo(
    () => activeStates.filter((s) => s.lane === "states"),
    [activeStates],
  );

  /* Real border polygons (Historical Basemaps), lazy-loaded per keyframe. */
  const kf = nearestBorderKeyframe(year);
  const [borders, setBorders] = useState<BorderYear | null>(null);
  useEffect(() => {
    let alive = true;
    loadBorderYear(kf)
      .then((b) => {
        if (alive) setBorders(b);
      })
      .catch(() => {
        if (alive) setBorders(null);
      });
    return () => {
      alive = false;
    };
  }, [kf]);

  const colorFor = (name: string) => {
    let h = 0;
    for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) | 0;
    return STATE_COLORS[Math.abs(h) % STATE_COLORS.length];
  };
  const pathOf = (rings: [number, number][][]) =>
    rings.map((r) => `M${r.map(([x, y]) => `${x},${y}`).join("L")}Z`).join("");

  const visibleCities = useMemo(
    () =>
      cities.filter(
        (c) =>
          year >= c.fromYear && (c.toYear === undefined || year <= c.toYear),
      ),
    [year],
  );

  const battles = useMemo(
    () =>
      getAllRecords().filter(
        (r) =>
          (r.kind === "battle" ||
            (r.kind === "event" && r.lane === "battles")) &&
          r.location &&
          Math.abs(r.start.year - year) <= 12,
      ),
    [year],
  );

  const routes = useMemo(
    () => tradeRoutes.filter((r) => year >= r.fromYear && year <= r.toYear),
    [year],
  );

  const selected = selectedId ? getRecord(selectedId) : undefined;
  const journey =
    selected?.places && selected.places.length > 1 ? selected.places : null;

  if (!mapOpen) return null;

  const { w, h } = LAND_VIEWBOX;

  return (
    <div
      className="panel fade-up fixed bottom-16 left-4 z-30 w-[min(94vw,560px)] overflow-hidden 2xl:w-[620px]"
      role="region"
      aria-label={`Historical atlas, ${year} CE`}
      data-testid="map-panel"
    >
      <div
        className="flex items-center justify-between gap-2 px-3.5 py-2"
        style={{ borderBottom: "1px solid var(--panel-border)" }}
      >
        <div className="min-w-0">
          <span
            className="font-display text-[15px] font-semibold"
            style={{ color: "var(--ink)" }}
          >
            Atlas · {year < 0 ? `${-year} BCE` : `${year} CE`}
            {ah !== null ? ` · ≈${ah} AH` : ""}
          </span>
          <span
            className="ml-2 text-[10.5px] uppercase tracking-wider"
            style={{ color: "var(--brick)" }}
          >
            borders c. {kf < 0 ? `${-kf} BCE` : `${kf} CE`}, approximate
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            className="btn"
            aria-pressed={mapFollow}
            onClick={() => {
              setMapYear(year);
              setMapFollow(!mapFollow);
            }}
            title={
              mapFollow
                ? "Following the timeline. Click to control the year manually."
                : "Manual year. Click to follow the timeline."
            }
          >
            {mapFollow ? "🔗 follows timeline" : "✋ manual"}
          </button>
          <button
            className="btn"
            onClick={() => setMapOpen(false)}
            aria-label="Close atlas"
          >
            ✕
          </button>
        </div>
      </div>

      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="block w-full"
        style={{ background: "var(--bg-sunken)" }}
      >
        {/* graticule */}
        {Array.from({ length: 13 }, (_, i) => -10 + i * 10).map((lon) => (
          <line
            key={`gl${lon}`}
            x1={projectX(lon)}
            y1={0}
            x2={projectX(lon)}
            y2={h}
            stroke="var(--rule)"
            strokeWidth={0.4}
            opacity={0.5}
          />
        ))}
        {Array.from({ length: 7 }, (_, i) => i * 10).map((lat) => (
          <line
            key={`gt${lat}`}
            x1={0}
            y1={projectY(lat)}
            x2={w}
            y2={projectY(lat)}
            stroke="var(--rule)"
            strokeWidth={0.4}
            opacity={0.5}
          />
        ))}
        {/* land */}
        <path
          d={LAND_PATH}
          fill="var(--bg-raised)"
          stroke="var(--rule-faint)"
          strokeWidth={0.6}
          opacity={0.95}
        />

        {/* trade routes */}
        {routes.map((r) => (
          <g key={r.id}>
            <polyline
              points={r.points
                .map(([lng, lat]) => `${projectX(lng)},${projectY(lat)}`)
                .join(" ")}
              fill="none"
              stroke="var(--gold-soft)"
              strokeWidth={1.6}
              strokeDasharray="1.5 5"
              strokeLinecap="round"
              opacity={0.85}
            >
              <title>{r.label}</title>
            </polyline>
          </g>
        ))}

        {/* political borders (Historical Basemaps), colored = Muslim-ruled, grey = other */}
        {borders &&
          borders.s.map((e, i) => {
            const muslim = e.m === 1;
            const color = muslim ? colorFor(e.n) : "var(--slate)";
            return (
              <g
                key={`${e.n}-${i}`}
                className={e.r ? "tl-item" : undefined}
                onClick={e.r ? () => select(e.r!) : undefined}
              >
                <path
                  d={pathOf(e.p)}
                  fillRule="evenodd"
                  fill={color}
                  fillOpacity={muslim ? 0.3 : 0.07}
                  stroke={color}
                  strokeWidth={muslim ? 1.1 : 0.55}
                  strokeOpacity={muslim ? 0.9 : 0.5}
                  strokeLinejoin="round"
                >
                  <title>{`${e.n}, borders c. ${borders.y} (approximate)`}</title>
                </path>
              </g>
            );
          })}
        {!borders && (
          <text
            x={w / 2}
            y={h / 2}
            textAnchor="middle"
            className="tl-label"
            style={{ fontSize: 12 }}
          >
            loading borders…
          </text>
        )}

        {/* cities */}
        {visibleCities.map((c) => (
          <g key={c.id}>
            <circle
              cx={projectX(c.lng)}
              cy={projectY(c.lat)}
              r={1.9}
              fill="var(--ink)"
              opacity={0.85}
            >
              <title>{`${c.name}${c.role ? `, ${c.role}` : ""}`}</title>
            </circle>
            <text
              x={projectX(c.lng) + 4}
              y={projectY(c.lat) + 3}
              className="tl-label"
              style={{ fontSize: 8 }}
            >
              {c.name}
            </text>
          </g>
        ))}

        {/* battles near this year */}
        {battles.map((b) => (
          <g
            key={b.id}
            className="tl-item pulse-soft"
            onClick={() => select(b.id)}
          >
            <rect
              x={projectX(b.location!.lng) - 4}
              y={projectY(b.location!.lat) - 4}
              width={8}
              height={8}
              transform={`rotate(45 ${projectX(b.location!.lng)} ${projectY(b.location!.lat)})`}
              fill="var(--brick)"
            >
              <title>{`${b.name} (${b.start.year})${b.location!.approximate ? ", site approximate" : ""}`}</title>
            </rect>
          </g>
        ))}

        {/* selected record journey / place */}
        {selected?.location && (
          <circle
            cx={projectX(selected.location.lng)}
            cy={projectY(selected.location.lat)}
            r={6}
            fill="none"
            stroke="var(--gold)"
            strokeWidth={2}
            className="pulse-soft"
          />
        )}
        {journey && (
          <g>
            <polyline
              points={journey
                .map((p) => `${projectX(p.lng)},${projectY(p.lat)}`)
                .join(" ")}
              fill="none"
              stroke="var(--gold)"
              strokeWidth={1.4}
              strokeDasharray="4 3"
              opacity={0.9}
            />
            {journey.map((p, i) => (
              <g key={i}>
                <circle
                  cx={projectX(p.lng)}
                  cy={projectY(p.lat)}
                  r={3}
                  fill="var(--gold)"
                />
                <title>{p.name}</title>
              </g>
            ))}
          </g>
        )}
      </svg>

      {/* Muslim states in this year */}
      <div
        className="flex flex-wrap items-center gap-1 px-3.5 py-2"
        style={{ borderTop: "1px solid var(--panel-border)" }}
      >
        <span
          className="mr-1 text-[10px] uppercase tracking-[0.14em]"
          style={{ color: "var(--ink-faint)" }}
        >
          {year < 632 ? "Pre-caliphate world" : `Muslim states, ${year}`}
        </span>
        {muslimStates.slice(0, 6).map((s, i) => (
          <button
            key={s.id}
            className="chip"
            style={{ borderColor: STATE_COLORS[i % STATE_COLORS.length] }}
            onClick={() => select(s.id)}
          >
            {s.name}
          </button>
        ))}
        {muslimStates.length > 6 && (
          <span className="text-[10.5px]" style={{ color: "var(--ink-faint)" }}>
            +{muslimStates.length - 6} more
          </span>
        )}
        {year >= 632 && muslimStates.length === 0 && (
          <span className="text-[11px]" style={{ color: "var(--ink-faint)" }}>
            none in the dataset for this year
          </span>
        )}
      </div>

      {/* year control */}
      <div
        className="flex items-center gap-2 px-3.5 py-2.5"
        style={{ borderTop: "1px solid var(--panel-border)" }}
      >
        <input
          type="range"
          min={-1500}
          max={NOW_YEAR}
          value={year}
          aria-label="Atlas year"
          className="w-full accent-[var(--gold)]"
          onChange={(e) => {
            const v = parseInt(e.target.value, 10);
            setMapFollow(false);
            setMapYear(v);
          }}
        />
        <button
          className="btn"
          onClick={() => flyTo(year)}
          title="Fly the timeline to this year"
        >
          ↥ timeline
        </button>
      </div>
      <p
        className="px-3.5 pb-2 text-[10.5px] leading-snug"
        style={{ color: "var(--ink-faint)" }}
      >
        Borders: nearest snapshot (c. {kf < 0 ? `${-kf} BCE` : `${kf} CE`}) from
        Historical Basemaps (Ourednik, GPL-3.0), world-scale approximations, not
        survey lines. Deep-past frontiers are especially uncertain. Colored =
        Muslim-ruled · grey = other powers. See{" "}
        <a className="underline decoration-dotted" href="./methodology/">
          methodology
        </a>
        .
      </p>
    </div>
  );
}

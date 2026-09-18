"use client";

/**
 * The central instrument: a full-viewport, virtualized, zoomable vertical
 * timeline. Today sits at the top; scrolling down travels into the past.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  computeLayout,
  itemsInWindow,
  labelImportance,
  visibleImportance,
  zoomBucketOf,
  type ResolvedCluster,
  type ResolvedItem,
} from "@/lib/layout";
import { NOW_YEAR, relationsOf } from "@/lib/data";
import { BANDS, ceTicks, clampPpy, LINEAR_FLOOR, TimeScale } from "@/lib/scale";
import { ceYearForHijriYearStart } from "@/lib/dates";
import { ERAS } from "@/lib/eras";
import { CATEGORY_COLOR, schoolCategory } from "@/lib/schools";
import { useApp } from "@/lib/store";
import { formatSpanDual } from "@/lib/dates";

const LANE_COLOR: Record<string, string> = {
  sirah: "var(--gold)",
  companions: "var(--green)",
  scholars: "var(--green)",
  books: "var(--gold)",
  states: "var(--lapis)",
  battles: "var(--brick)",
  science: "var(--teal)",
  culture: "var(--plum)",
  world: "var(--slate)",
};

function barWidth(imp: number): number {
  return imp >= 5 ? 8 : imp === 4 ? 6.5 : imp === 3 ? 5 : 4;
}
function bandWidth(imp: number): number {
  return imp >= 5 ? 28 : imp === 4 ? 23 : imp === 3 ? 18 : 13;
}
function dotR(imp: number): number {
  return imp >= 5 ? 7 : imp === 4 ? 5.5 : imp === 3 ? 4.5 : 3.5;
}

export default function TimelineCanvas() {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 1200, h: 800 });
  const centerYear = useApp((s) => s.centerYear);
  const ppy = useApp((s) => s.ppy);
  const selectedId = useApp((s) => s.selectedId);
  const lanesOff = useApp((s) => s.lanesOff);
  const minImportance = useApp((s) => s.minImportance);
  const regionsOn = useApp((s) => s.regionsOn);
  const flyTarget = useApp((s) => s.flyTarget);
  const { setPpy, setView, select, cancelFly } = useApp.getState();

  const [hoverY, setHoverY] = useState<number | null>(null);
  const [dragging, setDragging] = useState(false);
  const reducedMotion = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );

  /* ------------------------------ sizing ------------------------------ */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() =>
      setSize({ w: el.clientWidth, h: el.clientHeight }),
    );
    ro.observe(el);
    setSize({ w: el.clientWidth, h: el.clientHeight });
    return () => ro.disconnect();
  }, []);

  const compact = size.w < 760;
  const cx = compact ? size.w * 0.42 : size.w * 0.46;

  /* --------------------------- fly animation -------------------------- */
  useEffect(() => {
    if (!flyTarget) return;
    const s0 = {
      year: useApp.getState().centerYear,
      ppy: useApp.getState().ppy,
    };
    if (reducedMotion) {
      setView(flyTarget.year, flyTarget.ppy);
      useApp.setState({ flyTarget: null });
      return;
    }
    const t0 = performance.now();
    const dur = 680;
    let raf = 0;
    const step = (t: number) => {
      const cur = useApp.getState().flyTarget;
      if (!cur) return; // cancelled
      const k = Math.min(1, (t - t0) / dur);
      const e = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
      const year = s0.year + (cur.year - s0.year) * e;
      const zoom = Math.exp(
        Math.log(s0.ppy) + (Math.log(cur.ppy) - Math.log(s0.ppy)) * e,
      );
      setView(year, zoom);
      if (k < 1) raf = requestAnimationFrame(step);
      else useApp.setState({ flyTarget: null });
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [flyTarget, reducedMotion, setView]);

  /* ------------------------------ layout ------------------------------ */
  // Column packing is expensive, so it is memoized across a band of zoom. The
  // key also carries the visibility threshold, so the set of markers is always
  // the set the current zoom asks for. What the packing must never do is hand
  // back pixels: it stores years, and the render below converts them with the
  // scale of this very frame. That is what keeps markers on their dates while
  // ppy moves inside a bucket.
  const zoomBucket = zoomBucketOf(ppy);
  const layoutKey = `${zoomBucket}:${visibleImportance(ppy)}`;
  const layout = useMemo(
    () =>
      computeLayout({
        ppy,
        topYear: NOW_YEAR,
        compact,
        lanesOff,
        minImportance,
        regionsOn,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [layoutKey, compact, lanesOff, minImportance, regionsOn],
  );

  const scale = useMemo(() => new TimeScale(ppy, NOW_YEAR), [ppy]);
  const offsetY = scale.yOf(centerYear) - size.h / 2;
  const win = itemsInWindow(layout, offsetY - 300, offsetY + size.h + 300, scale);

  // Publish the year under the cursor from the current render's scale/offset, so
  // scrolling and zooming keep it in sync (the cursor stays put; the year under
  // it changes). Runs whenever the view or the pointer position changes.
  useEffect(() => {
    useApp
      .getState()
      .setHoverYear(hoverY === null ? null : scale.yearOf(offsetY + hoverY));
  }, [hoverY, offsetY, scale]);

  const related = useMemo(() => {
    if (!selectedId) return null;
    const set = new Set<string>([selectedId]);
    for (const r of relationsOf(selectedId)) set.add(r.record.id);
    return set;
  }, [selectedId]);

  /* --------------------------- interactions --------------------------- */
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const drag = useRef<{ y: number; y0: number; moved: number } | null>(null);
  const pinch = useRef<{ dist: number; ppy: number } | null>(null);

  // Single source of truth for the cursor year: recompute it from the SAME
  // scale/offset the canvas just rendered with, every time the view (centerYear,
  // ppy, size) or the cursor moves. This keeps the left readout, the floating
  // chip, and the atlas exactly in step while scrolling and zooming.
  const yearAtClientY = useCallback(
    (clientY: number) => scale.yearOf(offsetY + clientY),
    [scale, offsetY],
  );

  const onWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();
      cancelFly();
      const st = useApp.getState();
      if (e.ctrlKey || e.metaKey) {
        const factor = Math.exp(-e.deltaY * 0.0022);
        st.setPpy(st.ppy * factor, yearAtClientY(e.clientY));
      } else {
        // Scroll down (deltaY > 0) travels into the past; pixel-based so the
        // speed is uniform even through the compressed pre-Islamic bands.
        st.panByPixels((e.shiftKey ? 3 : 1) * e.deltaY);
      }
    },
    [cancelFly, yearAtClientY],
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [onWheel]);

  const onPointerDown = (e: React.PointerEvent) => {
    try {
      (e.target as Element).setPointerCapture?.(e.pointerId);
    } catch {
      // capture is an optimisation, not a requirement for the gesture
    }
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size === 1) {
      cancelFly();
      drag.current = {
        y: e.clientY,
        y0: scale.yOf(useApp.getState().centerYear),
        moved: 0,
      };
    } else if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      pinch.current = {
        dist: Math.hypot(a.x - b.x, a.y - b.y),
        ppy: useApp.getState().ppy,
      };
      drag.current = null;
    }
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const p = pointers.current.get(e.pointerId);
    if (p) pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pinch.current && pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      const mid = (a.y + b.y) / 2;
      setPpy(
        (pinch.current.ppy * dist) / pinch.current.dist,
        yearAtClientY(mid),
      );
      return;
    }
    if (drag.current && p) {
      const dy = e.clientY - drag.current.y;
      drag.current.moved = Math.max(drag.current.moved, Math.abs(dy));
      if (drag.current.moved > 4) setDragging(true);
      // Grab-and-pull: dragging the content down brings more recent years into
      // view (toward today). Pixel-based, so it never stalls in the deep past.
      setView(scale.yearOf(drag.current.y0 - dy), useApp.getState().ppy);
    } else {
      // The effect above publishes the year under the cursor from the current
      // render's scale, so hover, scroll and zoom stay in sync.
      setHoverY(e.clientY);
    }
  };
  const endPointer = (e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) pinch.current = null;
    if (pointers.current.size === 0) {
      const wasDrag = (drag.current?.moved ?? 0) > 4;
      drag.current = null;
      setDragging(false);
      if (!wasDrag && e.target === e.currentTarget) select(null);
    }
  };

  const onDoubleClick = (e: React.MouseEvent) => {
    const st = useApp.getState();
    st.setPpy(st.ppy * 2.2, yearAtClientY(e.clientY));
  };

  /* ------------------------------ lens ------------------------------- */
  const lensYear =
    hoverY !== null && !dragging ? scale.yearOf(offsetY + hoverY) : null;
  const lensBoost = useCallback(
    (screenY: number) => {
      if (hoverY === null || dragging) return 0;
      const d = Math.abs(screenY - hoverY);
      return Math.exp(-(d * d) / (2 * 95 * 95));
    },
    [hoverY, dragging],
  );

  /* ------------------------------ render ------------------------------ */
  const yearTop = scale.yearOf(offsetY);
  const yearBottom = scale.yearOf(offsetY + size.h);
  const ticks = ceTicks(ppy, yearBottom, Math.min(yearTop, NOW_YEAR)).filter(
    // inside compressed bands the pixel spacing is fixed, drop ticks that would collide
    (t, i, arr) => {
      if (t.year >= LINEAR_FLOOR) return true;
      const prev = arr[i - 1];
      return !prev || Math.abs(scale.yOf(prev.year) - scale.yOf(t.year)) > 26;
    },
  );
  const labelImp = labelImportance(ppy);

  const ahMarks = useMemo(() => {
    const step = ppy >= 30 ? 10 : ppy >= 8 ? 50 : 100;
    const out: { ah: number; ce: number }[] = [];
    for (let ah = step; ah <= 1500; ah += step) {
      const ce = ceYearForHijriYearStart(ah);
      if (ce >= yearBottom - 40 && ce <= Math.min(yearTop + 40, NOW_YEAR))
        out.push({ ah, ce });
    }
    return out;
  }, [ppy, yearBottom, yearTop]);

  const sy = (absY: number) => absY - offsetY;

  /* ------------------- label collision management ------------------- */
  // Horizontal labels (points + person bars) are deduplicated by priority;
  // vertical band labels manage themselves (columns are wide enough).
  const keepLabels = (() => {
    const keep = new Set<string>();
    const rects: { x1: number; y1: number; x2: number; y2: number }[] = [];
    const cands: {
      id: string;
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      pri: number;
    }[] = [];
    for (const it of win.items) {
      if (
        it.shape === "stateBand" ||
        it.shape === "worldBand" ||
        it.shape === "thread"
      )
        continue;
      const r = it.record;
      const b = lensBoost(
        it.point
          ? sy(it.yTop)
          : (Math.max(sy(it.yTop), 0) + Math.min(sy(it.yBottom), size.h)) / 2,
      );
      const persistent = r.importance >= labelImp;
      const lensShow = b > 0.42;
      if (!persistent && !lensShow && selectedId !== r.id) continue;
      const fs = 10.5 + r.importance * 0.8 + 2.5 * b;
      const textLen = Math.min(r.name.length, compact ? 18 : 34);
      const w = textLen * fs * 0.52;
      let y: number;
      if (it.point) y = sy(it.yTop);
      else
        y =
          (Math.max(sy(it.yTop), 0) + Math.min(sy(it.yBottom), size.h)) / 2 +
          it.column * 14;
      const anchorEnd = it.side < 0;
      const xEdge = cx + it.x + (anchorEnd ? -10 : 10);
      const x1 = anchorEnd ? xEdge - w : xEdge;
      cands.push({
        id: r.id,
        x1,
        y1: y - fs * 0.7,
        x2: x1 + w,
        y2: y + fs * 0.7,
        pri: (selectedId === r.id ? 1000 : 0) + r.importance * 10 + b * 30,
      });
    }
    cands.sort((a, b2) => b2.pri - a.pri);
    for (const c of cands) {
      let clash = false;
      for (const rct of rects) {
        // generous gutters so labels never crowd each other
        if (
          c.x1 < rct.x2 + 8 &&
          c.x2 > rct.x1 - 8 &&
          c.y1 < rct.y2 + 5 &&
          c.y2 > rct.y1 - 5
        ) {
          clash = true;
          break;
        }
      }
      if (!clash) {
        keep.add(c.id);
        rects.push(c);
      }
    }
    return keep;
  })();

  return (
    <div
      ref={ref}
      data-testid="timeline-canvas"
      data-ppy={ppy}
      data-offset-y={offsetY}
      data-now-year={NOW_YEAR}
      className={`tl-canvas absolute inset-0 overflow-hidden ${dragging ? "dragging" : ""}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endPointer}
      onPointerCancel={endPointer}
      onPointerLeave={(e) => {
        setHoverY(null); // the effect clears hoverYear in sync
        endPointer(e);
      }}
      onDoubleClick={onDoubleClick}
      role="application"
      aria-label="Vertical timeline of Islamic history. Today at top; scroll down to travel into the past. Use arrow keys to pan, plus and minus to zoom, Home for today."
    >
      <svg width={size.w} height={size.h} className="block">
        <defs>
          <pattern
            id="hatch"
            width="7"
            height="7"
            patternTransform="rotate(45)"
            patternUnits="userSpaceOnUse"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="7"
              stroke="var(--ink-faint)"
              strokeWidth="0.75"
              opacity="0.5"
            />
          </pattern>
          <pattern
            id="hatch2"
            width="4.5"
            height="4.5"
            patternTransform="rotate(45)"
            patternUnits="userSpaceOnUse"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="4.5"
              stroke="var(--ink-faint)"
              strokeWidth="0.7"
              opacity="0.55"
            />
          </pattern>
        </defs>

        {/* era bands */}
        {ERAS.map((era, i) => {
          const y1 = sy(scale.yOf(Math.min(era.endYear, NOW_YEAR)));
          const y2 = sy(scale.yOf(era.startYear));
          if (y2 < -40 || y1 > size.h + 40) return null;
          const h = y2 - y1;
          return (
            <g key={era.id}>
              <rect
                x={0}
                y={y1}
                width={size.w}
                height={h}
                fill={i % 2 === 0 ? "var(--sand)" : "var(--ink)"}
                opacity={i % 2 === 0 ? 0.1 : 0.025}
              />
              <line
                x1={0}
                y1={y2}
                x2={size.w}
                y2={y2}
                className="hairline"
                opacity={0.6}
              />
              {h > 46 && (
                <text
                  x={compact ? 10 : 18}
                  y={Math.min(Math.max(y1 + 26, 66), y2 - 12)}
                  className="tl-label display"
                  style={{
                    fontSize: 13,
                    fill: "var(--ink-faint)",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                  }}
                >
                  {era.label}
                </text>
              )}
            </g>
          );
        })}

        {/* compressed deep-past bands, each hatched and captioned */}
        {BANDS.map((b) => {
          const y1 = sy(scale.yOf(b.from));
          const y2 = sy(scale.yOf(b.to));
          if (y2 < 0 || y1 > size.h) return null;
          return (
            <g key={b.from}>
              <rect
                x={0}
                y={y1}
                width={size.w}
                height={y2 - y1}
                fill={b.dated ? "url(#hatch)" : "url(#hatch2)"}
                opacity={b.dated ? 0.45 : 0.55}
              />
              <line
                x1={0}
                y1={y1}
                x2={size.w}
                y2={y1}
                stroke="var(--ink-faint)"
                strokeWidth={1}
                strokeDasharray="6 5"
                opacity={0.7}
              />
              <text
                x={cx}
                y={y1 + 22}
                textAnchor="middle"
                className="tl-label"
                style={{ fontSize: 11.5, fill: "var(--ink-soft)" }}
              >
                ⌇ {b.label} ⌇
              </text>
            </g>
          );
        })}

        {/* the origin cap at the very bottom of the line */}
        {(() => {
          const yEnd = sy(scale.yOf(BANDS[BANDS.length - 1].to));
          if (yEnd < -40 || yEnd > size.h + 40) return null;
          return (
            <text
              x={cx}
              y={Math.min(yEnd + 34, size.h - 14)}
              textAnchor="middle"
              className="tl-label display"
              style={{ fontSize: 13, fill: "var(--gold)" }}
            >
              ﴾ the line begins with Ādam عليه السلام, dates unknown, order
              preserved ﴿
            </text>
          );
        })()}

        {/* CE ticks (left of line) */}
        {ticks.map((t) => {
          const y = sy(scale.yOf(t.year));
          return (
            <g key={t.year} opacity={t.major ? 0.9 : 0.45}>
              <line
                x1={cx - (t.major ? 26 : 14)}
                y1={y}
                x2={cx - 6}
                y2={y}
                className="hairline"
              />
              {t.major && t.label && (
                <text
                  x={cx - 32}
                  y={y + 4}
                  textAnchor="end"
                  className="tl-label"
                  style={{ fontSize: 11, fill: "var(--ink-faint)" }}
                >
                  {t.label}
                </text>
              )}
            </g>
          );
        })}

        {/* AH marks (right of line, gold, label tucked under the tick) */}
        {ahMarks.map((m) => {
          const y = sy(scale.yOf(m.ce));
          return (
            <g key={m.ah} opacity={0.85}>
              <line
                x1={cx + 6}
                y1={y}
                x2={cx + 20}
                y2={y}
                stroke="var(--gold)"
                strokeWidth={1}
              />
              <text
                x={cx + 9}
                y={y + 12}
                className="tl-label"
                style={{ fontSize: 9.5, fill: "var(--gold)" }}
              >
                {m.ah} AH
              </text>
            </g>
          );
        })}

        {/* the future: quiet zone above today */}
        {(() => {
          const yT = sy(scale.yOf(NOW_YEAR));
          if (yT <= 0) return null;
          return (
            <rect
              x={0}
              y={0}
              width={size.w}
              height={Math.max(yT, 0)}
              fill="var(--bg)"
              opacity={0.62}
              pointerEvents="none"
            />
          );
        })()}

        {/* central line */}
        <line
          x1={cx}
          y1={0}
          x2={cx}
          y2={size.h}
          stroke="var(--line)"
          strokeWidth={2.25}
          data-testid="central-line"
        />

        {/* lens glow on the line + a year readout that follows the cursor */}
        {lensYear !== null && lensYear <= NOW_YEAR && (
          <g pointerEvents="none">
            <rect
              x={0}
              y={hoverY! - 110}
              width={size.w}
              height={220}
              fill="var(--lens)"
            />
            <circle
              cx={cx}
              cy={hoverY!}
              r={5}
              fill="none"
              stroke="var(--gold)"
              strokeWidth={1.5}
            />
            <line
              x1={cx - 40}
              y1={hoverY!}
              x2={cx + 40}
              y2={hoverY!}
              stroke="var(--gold)"
              strokeWidth={0.75}
              opacity={0.7}
            />
            {(() => {
              const yr = Math.round(lensYear);
              const inCap = yr < LINEAR_FLOOR;
              const label = inCap
                ? "undated"
                : yr < 0
                  ? `${-yr} BCE`
                  : `${yr} CE`;
              const w = Math.max(label.length * 7.6 + 18, 58);
              const lx = cx + 16;
              return (
                <g transform={`translate(${lx}, ${hoverY! - 12})`}>
                  <rect
                    x={0}
                    y={0}
                    width={w}
                    height={24}
                    rx={12}
                    fill="var(--bg-raised)"
                    stroke="var(--gold)"
                    strokeWidth={1}
                  />
                  <text
                    x={w / 2}
                    y={16}
                    textAnchor="middle"
                    className="tl-label strong"
                    style={{
                      fontSize: 12,
                      fill: "var(--gold)",
                      stroke: "none",
                    }}
                  >
                    {label}
                  </text>
                </g>
              );
            })()}
          </g>
        )}

        {/* today cap */}
        {(() => {
          const y = sy(scale.yOf(NOW_YEAR));
          if (y < -60 || y > size.h + 60) return null;
          return (
            <g>
              <line
                x1={cx - 70}
                y1={y}
                x2={cx + 70}
                y2={y}
                stroke="var(--today)"
                strokeWidth={2.5}
              />
              <circle cx={cx} cy={y} r={5.5} fill="var(--today)" />
              <text
                x={cx + 80}
                y={y + 4}
                className="tl-label strong"
                style={{
                  fill: "var(--today)",
                  fontSize: 12,
                  letterSpacing: "0.16em",
                }}
              >
                TODAY
              </text>
            </g>
          );
        })()}

        {/* markers */}
        <g>
          {win.items.map((it) => (
            <Marker
              key={it.record.id}
              it={it}
              cx={cx}
              sy={sy}
              boost={lensBoost(
                (sy(it.yTop) + sy(Math.min(it.yBottom, it.yTop + size.h * 2))) /
                  2,
              )}
              pointBoost={lensBoost(sy(it.yTop))}
              showLabel={keepLabels.has(it.record.id)}
              dimmed={related !== null && !related.has(it.record.id)}
              selected={selectedId === it.record.id}
              compact={compact}
              viewportH={size.h}
            />
          ))}
          {win.clusters.map((c) => (
            <ClusterMarker
              key={c.key}
              c={c}
              cx={cx}
              sy={sy}
              boost={lensBoost(sy(c.y))}
              screenY={sy(c.y)}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}

/* ---------------------------------------------------------------------- */

function Marker({
  it,
  cx,
  sy,
  boost,
  pointBoost,
  showLabel: keepLabel,
  dimmed,
  selected,
  compact,
  viewportH,
}: {
  it: ResolvedItem;
  cx: number;
  sy: (y: number) => number;
  boost: number;
  pointBoost: number;
  showLabel: boolean;
  dimmed: boolean;
  selected: boolean;
  compact: boolean;
  viewportH: number;
}) {
  const select = useApp((s) => s.select);
  const r = it.record;
  const color = LANE_COLOR[r.lane] ?? "var(--ink)";
  const x = cx + it.x;
  const y1 = sy(it.yTop);
  const y2 = sy(it.yBottom);
  const b = it.point ? pointBoost : boost;
  const showLabel = keepLabel || selected;
  const opacity = dimmed ? 0.18 : 1;
  const strokeDash = it.startApprox || it.endApprox ? "4 3" : undefined;

  const maxLen = compact ? (it.side < 0 ? 16 : 18) : 34;
  const label =
    r.name.length > maxLen ? r.name.slice(0, maxLen - 1) + "…" : r.name;
  const aria = `${r.name}, ${formatSpanDual(r.start, r.end, r.ongoing)}`;

  const common = {
    className: "tl-item",
    // Stable hooks for the path-independence suite: the id to match markers
    // across loads, and the year this marker claims, to check against the axis.
    "data-id": r.id,
    "data-year-top": String(it.yearTop),
    "data-year-bottom": String(it.yearBottom),
    "data-anchor-y": String(y1),
    role: "button" as const,
    tabIndex: dimmed ? -1 : 0,
    "aria-label": aria,
    onClick: (e: React.MouseEvent) => {
      e.stopPropagation();
      // Open the detail without flying the viewport: the timeline stays put.
      select(r.id, { fly: false });
    },
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        select(r.id, { fly: false });
      }
    },
  };

  /* ---- spans ---- */
  if (it.shape === "personBar") {
    const w = barWidth(r.importance) * (1 + 0.35 * b) * (selected ? 1.25 : 1);
    const h = Math.max(y2 - y1, 3);
    const midY = (Math.max(y1, 0) + Math.min(y2, viewportH)) / 2;
    if (h < 7) {
      // too small at this zoom → render as dot
      return (
        <g {...common} opacity={opacity} transform={`translate(${x}, ${y1})`}>
          <circle r={3.5 + 2 * b} fill={color} />
          {showLabel && (
            <text
              x={it.side * 10}
              y={4}
              textAnchor={it.side === 1 ? "start" : "end"}
              className="tl-label"
            >
              {label}
            </text>
          )}
        </g>
      );
    }
    return (
      <g {...common} opacity={opacity}>
        <rect
          x={x - w / 2}
          y={y1}
          width={w}
          height={h}
          rx={w / 2}
          fill={color}
          opacity={selected ? 1 : 0.82}
          stroke={selected ? "var(--ink)" : "none"}
          strokeWidth={selected ? 1.2 : 0}
        />
        {/* end caps: hollow = approximate */}
        <circle
          cx={x}
          cy={y2}
          r={w / 2 + 1.5}
          fill={it.startApprox ? "var(--bg)" : color}
          stroke={color}
          strokeWidth={1.4}
        />
        {!it.ongoing && (
          <circle
            cx={x}
            cy={y1}
            r={w / 2 + 1.5}
            fill={it.endApprox ? "var(--bg)" : color}
            stroke={color}
            strokeWidth={1.4}
          />
        )}
        {it.ongoing && (
          <line
            x1={x}
            y1={y1}
            x2={x}
            y2={y1 - 12}
            stroke={color}
            strokeWidth={1.6}
            strokeDasharray="2 3"
          />
        )}
        {showLabel && (
          <text
            x={x + it.side * (w / 2 + 7)}
            y={midY + it.column * 14 + 4}
            textAnchor={it.side === 1 ? "start" : "end"}
            className={`tl-label ${r.importance >= 4 ? "strong" : ""}`}
            style={{ fontSize: 11 + r.importance * 0.6 + 2.5 * b }}
          >
            {label}
          </text>
        )}
      </g>
    );
  }

  if (it.shape === "stateBand" || it.shape === "worldBand") {
    const world = it.shape === "worldBand";
    const w = (world ? 9 : bandWidth(r.importance)) * (1 + 0.15 * b);
    const h = Math.max(y2 - y1, 4);
    const clampedTop = Math.max(y1, -40);
    const clampedBottom = Math.min(y2, viewportH + 40);
    const midY = Math.min(
      Math.max((Math.max(y1, 0) + Math.min(y2, viewportH)) / 2, 76),
      viewportH - 34,
    );
    const showBandLabel =
      (r.importance >= 3 || b > 0.42 || selected) &&
      clampedBottom - clampedTop > 54;
    return (
      <g {...common} opacity={opacity * (world ? 0.8 : 1)}>
        <rect
          x={x - w / 2}
          y={y1}
          width={w}
          height={h}
          rx={6}
          fill={color}
          opacity={world ? 0.1 : 0.13}
          stroke={color}
          strokeOpacity={selected ? 1 : 0.55}
          strokeWidth={selected ? 1.8 : 1.1}
          strokeDasharray={strokeDash}
        />
        {showBandLabel && (
          <text
            transform={`translate(${x}, ${midY}) rotate(90)`}
            textAnchor="middle"
            className="tl-label display"
            style={{
              fontSize: world ? 10.5 : 11.5 + r.importance * 0.7,
              fill: color,
              letterSpacing: "0.09em",
            }}
          >
            {label}
          </text>
        )}
      </g>
    );
  }

  if (it.shape === "thread") {
    // Schools of law, creed, branches, orders and modern currents: a soft
    // labelled band coloured by category (madhhab / creed / branch / order).
    const cat = schoolCategory(r);
    const tcolor = cat ? CATEGORY_COLOR[cat] : "var(--green-soft)";
    const h = Math.max(y2 - y1, 4);
    const midY = Math.min(
      Math.max((Math.max(y1, 0) + Math.min(y2, viewportH)) / 2, 74),
      viewportH - 30,
    );
    const showThreadLabel = r.importance >= 3 || b > 0.35 || selected;
    return (
      <g {...common} opacity={opacity * 0.92}>
        <rect
          x={x - 3}
          y={y1}
          width={6}
          height={h}
          rx={3}
          fill={tcolor}
          opacity={0.16}
          stroke={tcolor}
          strokeOpacity={0.5}
          strokeWidth={selected ? 1.4 : 0.9}
          strokeDasharray={strokeDash}
        />
        {r.ongoing && (
          <line
            x1={x}
            y1={y1}
            x2={x}
            y2={y1 - 10}
            stroke={tcolor}
            strokeWidth={1.4}
            strokeDasharray="2 3"
          />
        )}
        {showThreadLabel && (
          <text
            transform={`translate(${x}, ${midY}) rotate(90)`}
            textAnchor="middle"
            className="tl-label display"
            style={{
              fontSize: 10.5 + (r.importance >= 4 ? 1.5 : 0),
              fill: tcolor,
              letterSpacing: "0.04em",
            }}
          >
            {label}
          </text>
        )}
      </g>
    );
  }

  /* ---- points ---- */
  const rr = dotR(r.importance) * (1 + 0.5 * b) * (selected ? 1.3 : 1);
  const approx = it.startApprox;
  let glyph: React.ReactNode;
  if (it.shape === "battle") {
    glyph = (
      <rect
        x={-rr}
        y={-rr}
        width={rr * 2}
        height={rr * 2}
        transform="rotate(45)"
        fill={approx ? "var(--bg)" : color}
        stroke={color}
        strokeWidth={1.5}
      />
    );
  } else if (it.shape === "book") {
    glyph = (
      <g>
        <path
          d={`M${-rr * 1.2},${-rr * 0.75} Q0,${-rr * 1.25} ${rr * 1.2},${-rr * 0.75} L${rr * 1.2},${rr * 0.75} Q0,${rr * 0.25} ${-rr * 1.2},${rr * 0.75} Z`}
          fill={approx ? "var(--bg)" : color}
          stroke={color}
          strokeWidth={1.3}
        />
        <line
          x1={0}
          y1={-rr * 1.0}
          x2={0}
          y2={rr * 0.45}
          stroke={approx ? color : "var(--bg)"}
          strokeWidth={0.9}
        />
      </g>
    );
  } else if (it.shape === "institution") {
    glyph = (
      <g>
        <path
          d={`M${-rr},${rr * 0.8} L${-rr},0 A${rr},${rr} 0 0 1 ${rr},0 L${rr},${rr * 0.8} Z`}
          fill={approx ? "var(--bg)" : color}
          stroke={color}
          strokeWidth={1.3}
        />
      </g>
    );
  } else if (it.shape === "sirah") {
    glyph = (
      <g>
        <circle
          r={rr + 2.5}
          fill="none"
          stroke={color}
          strokeWidth={1}
          opacity={0.65}
        />
        <circle
          r={rr}
          fill={approx ? "var(--bg)" : color}
          stroke={color}
          strokeWidth={1.4}
        />
      </g>
    );
  } else {
    glyph = (
      <circle
        r={rr}
        fill={approx ? "var(--bg)" : color}
        stroke={color}
        strokeWidth={1.3}
      />
    );
  }

  return (
    <g {...common} transform={`translate(${x}, ${y1})`} opacity={opacity}>
      {glyph}
      {approx && (
        <text
          x={0}
          y={-rr - 3}
          textAnchor="middle"
          className="tl-label"
          style={{ fontSize: 9, fill: "var(--ink-faint)" }}
        >
          ≈
        </text>
      )}
      {showLabel && (
        <text
          x={it.side >= 0 ? rr + 8 : -rr - 8}
          y={4}
          textAnchor={it.side >= 0 ? "start" : "end"}
          className={`tl-label ${r.importance >= 4 ? "strong" : ""} ${it.shape === "sirah" ? "display" : ""}`}
          style={{ fontSize: 10.5 + r.importance * 0.8 + 2.5 * b }}
        >
          {label}
        </text>
      )}
    </g>
  );
}

function ClusterMarker({
  c,
  cx,
  sy,
  boost,
  screenY,
}: {
  c: ResolvedCluster;
  cx: number;
  sy: (y: number) => number;
  boost: number;
  screenY: number;
}) {
  const flyTo = useApp((s) => s.flyTo);
  const r = 8 + Math.min(c.records.length, 6) + 4 * boost;
  // Zoom in while keeping the cluster fixed where it already sits on screen, so
  // it expands in place instead of the timeline scrolling out from under you.
  const zoomHere = () => {
    const st = useApp.getState();
    const vh = typeof window !== "undefined" ? window.innerHeight : 900;
    const newPpy = clampPpy(st.ppy * 2.4);
    const sc = new TimeScale(newPpy, NOW_YEAR);
    const newOffset = sc.yOf(c.midYear) - screenY;
    flyTo(sc.yearOf(newOffset + vh / 2), newPpy);
  };
  return (
    <g
      className="tl-item"
      data-id={`cluster:${c.key}`}
      data-year-top={String(c.midYear)}
      data-year-bottom={String(c.midYear)}
      data-anchor-y={String(sy(c.y))}
      transform={`translate(${cx + c.x}, ${sy(c.y)})`}
      role="button"
      tabIndex={0}
      aria-label={`${c.records.length} items around ${Math.round(c.midYear)}, zoom in`}
      onClick={(e) => {
        e.stopPropagation();
        zoomHere();
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") zoomHere();
      }}
    >
      <circle
        r={r}
        fill="var(--bg-raised)"
        stroke="var(--ink-faint)"
        strokeWidth={1.2}
        strokeDasharray="3 2"
      />
      <text
        y={4}
        textAnchor="middle"
        className="tl-label strong"
        style={{ fontSize: 10.5 }}
      >
        {c.records.length}
      </text>
    </g>
  );
}

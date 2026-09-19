"use client";

/**
 * Comparison tray (bottom) + comparison view (overlay): lifespans/durations
 * on one shared scale, computed overlap/gap sentences, shared context.
 */

import { useMemo } from "react";
import { activeIn, getRecord, getSpan, NOW_YEAR } from "@/lib/data";
import { formatSpanDual } from "@/lib/dates";
import { describePair } from "@/lib/overlap";
import { useApp } from "@/lib/store";

const COLORS = ["var(--green)", "var(--lapis)", "var(--brick)", "var(--plum)"];

export function CompareTray() {
  const compareIds = useApp((s) => s.compareIds);
  const compareOpen = useApp((s) => s.compareOpen);
  const { toggleCompare, setCompareOpen, clearCompare } = useApp.getState();
  if (compareIds.length === 0 || compareOpen) return null;
  return (
    <div
      className="panel fade-up fixed bottom-4 left-1/2 z-30 flex max-w-[92vw] -translate-x-1/2 items-center gap-1.5 px-3 py-2"
      data-testid="compare-tray"
    >
      <span
        className="mr-1 text-[11px] uppercase tracking-widest"
        style={{ color: "var(--ink-faint)" }}
      >
        Compare
      </span>
      {compareIds.map((id, i) => {
        const r = getRecord(id);
        if (!r) return null;
        return (
          <button
            key={id}
            className="chip"
            style={{ borderColor: COLORS[i] }}
            onClick={() => toggleCompare(id)}
            title="Remove from comparison"
          >
            {r.name} ✕
          </button>
        );
      })}
      <button
        className="btn"
        style={{ borderColor: "var(--gold)", color: "var(--gold-ink)" }}
        onClick={() => setCompareOpen(true)}
        disabled={compareIds.length < 2}
      >
        Open →
      </button>
      <button
        className="btn"
        onClick={clearCompare}
        aria-label="Clear comparison"
      >
        ✕
      </button>
    </div>
  );
}

export function CompareView() {
  const compareIds = useApp((s) => s.compareIds);
  const compareOpen = useApp((s) => s.compareOpen);
  const { setCompareOpen, toggleCompare, select } = useApp.getState();

  const all = useMemo(
    () => compareIds.map((id) => getRecord(id)).filter((r) => r !== undefined),
    [compareIds],
  );
  // Undated records (earliest prophets عليهم السلام) can be compared only by order,
  // never on a measured scale, they are listed, not charted.
  const records = useMemo(() => all.filter((r) => !getSpan(r).undated), [all]);
  const undated = useMemo(() => all.filter((r) => getSpan(r).undated), [all]);

  const domain = useMemo(() => {
    if (records.length === 0) return null;
    let lo = Infinity;
    let hi = -Infinity;
    for (const r of records) {
      const s = getSpan(r);
      lo = Math.min(lo, s.start);
      hi = Math.max(hi, s.end);
    }
    const pad = Math.max((hi - lo) * 0.07, 8);
    return { lo: lo - pad, hi: Math.min(hi + pad, NOW_YEAR) };
  }, [records]);

  const pairs = useMemo(() => {
    const out: string[] = [];
    for (let i = 0; i < all.length; i++)
      for (let j = i + 1; j < all.length; j++)
        out.push(describePair(all[i], all[j], NOW_YEAR));
    return out;
  }, [all]);

  const shared = useMemo(() => {
    if (records.length < 2 || !domain) return [];
    const ids = new Set(records.map((r) => r.id));
    const mid = Math.round((domain.lo + domain.hi) / 2);
    return activeIn(mid, 4)
      .filter((r) => !ids.has(r.id))
      .slice(0, 6);
  }, [records, domain]);

  if (!compareOpen || all.length < 2) return null;

  const W = 640;
  const dLo = domain?.lo ?? 0;
  const dHi = domain?.hi ?? 1;
  const xFor = (year: number) => ((year - dLo) / (dHi - dLo)) * (W - 40) + 20;
  const ticks: number[] = [];
  const span = dHi - dLo;
  const step =
    span > 900 ? 200 : span > 400 ? 100 : span > 160 ? 50 : span > 60 ? 20 : 10;
  for (let y = Math.ceil(dLo / step) * step; y <= dHi; y += step) ticks.push(y);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label="Comparison view"
      data-testid="compare-view"
    >
      <div
        className="absolute inset-0"
        style={{
          background: "color-mix(in srgb, var(--bg) 72%, transparent)",
          backdropFilter: "blur(3px)",
        }}
        onClick={() => setCompareOpen(false)}
      />
      <div className="panel nice-scroll relative max-h-[92vh] w-full max-w-[760px] overflow-y-auto px-5 py-4 sm:px-7 sm:py-6">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <h2
              className="font-display text-[20px] font-semibold"
              style={{ color: "var(--ink)" }}
            >
              Comparison
            </h2>
            {domain && records.length >= 2 && (
              <p className="text-[12px]" style={{ color: "var(--ink-faint)" }}>
                One shared scale ·{" "}
                {domain.lo < 0
                  ? `${Math.round(-domain.lo)} BCE`
                  : Math.round(domain.lo)}{" "}
                –{" "}
                {domain.hi < 0
                  ? `${Math.round(-domain.hi)} BCE`
                  : `${Math.round(domain.hi)} CE`}
              </p>
            )}
          </div>
          <button
            className="btn"
            onClick={() => setCompareOpen(false)}
            aria-label="Close comparison"
          >
            ✕
          </button>
        </div>

        {/* undated records: order only, never charted */}
        {undated.length > 0 && (
          <p
            className="mb-3 rounded-md px-3 py-2 text-[12.5px]"
            style={{ background: "var(--bg-sunken)", color: "var(--ink-soft)" }}
          >
            {undated.map((r) => r.name).join(" · ")}, undated: tradition
            preserves the order of the earliest prophets عليهم السلام, not the
            intervals, so they are not drawn on the measured scale below.
          </p>
        )}

        {/* shared-scale chart */}
        {domain && records.length >= 1 && (
          <svg
            viewBox={`0 0 ${W} ${records.length * 54 + 46}`}
            className="w-full"
            role="img"
            aria-label="Spans on a shared time scale"
          >
            {ticks.map((t) => (
              <g key={t}>
                <line
                  x1={xFor(t)}
                  y1={8}
                  x2={xFor(t)}
                  y2={records.length * 54 + 18}
                  className="hairline"
                  opacity={0.6}
                />
                <text
                  x={xFor(t)}
                  y={records.length * 54 + 34}
                  textAnchor="middle"
                  className="tl-label"
                  style={{ fontSize: 10.5 }}
                >
                  {t < 0 ? `${-t} BCE` : t}
                </text>
              </g>
            ))}
            {records.map((r, i) => {
              const s = getSpan(r);
              const y = 26 + i * 54;
              const x1 = xFor(s.start);
              const x2 = xFor(s.end);
              const isPoint = s.point;
              const color = COLORS[i];
              return (
                <g
                  key={r.id}
                  className="tl-item"
                  onClick={() => {
                    setCompareOpen(false);
                    select(r.id);
                  }}
                >
                  <text
                    x={20}
                    y={y - 9}
                    className="tl-label strong"
                    style={{ fontSize: 12.5 }}
                  >
                    {r.name}
                  </text>
                  <text
                    x={W - 20}
                    y={y - 9}
                    textAnchor="end"
                    className="tl-label"
                    style={{ fontSize: 10.5, fill: "var(--ink-faint)" }}
                  >
                    {formatSpanDual(r.start, r.end, r.ongoing)}
                  </text>
                  {isPoint ? (
                    <g transform={`translate(${x1}, ${y + 6})`}>
                      <rect
                        x={-5}
                        y={-5}
                        width={10}
                        height={10}
                        transform="rotate(45)"
                        fill={color}
                      />
                    </g>
                  ) : (
                    <g>
                      <rect
                        x={x1}
                        y={y}
                        width={Math.max(x2 - x1, 3)}
                        height={12}
                        rx={6}
                        fill={color}
                        opacity={0.8}
                        strokeDasharray={
                          s.startApprox || s.endApprox ? "5 3" : undefined
                        }
                        stroke={color}
                        strokeWidth={1}
                      />
                      {r.ongoing && (
                        <line
                          x1={x2}
                          y1={y + 6}
                          x2={x2 + 10}
                          y2={y + 6}
                          stroke={color}
                          strokeWidth={1.6}
                          strokeDasharray="2 3"
                        />
                      )}
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
        )}

        {/* computed sentences */}
        <div className="mt-3 space-y-1.5">
          {pairs.map((p, i) => (
            <p
              key={i}
              className="font-display text-[14px] italic leading-snug"
              style={{ color: "var(--ink-soft)" }}
            >
              , {p}
            </p>
          ))}
        </div>

        {/* shared context */}
        {shared.length > 0 && (
          <div className="mt-4">
            <h3
              className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em]"
              style={{ color: "var(--ink-faint)" }}
            >
              Meanwhile in this period
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {shared.map((r) => (
                <button
                  key={r.id}
                  className="chip"
                  onClick={() => {
                    setCompareOpen(false);
                    select(r.id);
                  }}
                >
                  {r.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* manage */}
        <div
          className="mt-4 flex flex-wrap gap-1.5 border-t pt-3"
          style={{ borderColor: "var(--panel-border)" }}
        >
          {records.map((r, i) => (
            <button
              key={r.id}
              className="chip"
              style={{ borderColor: COLORS[i] }}
              onClick={() => toggleCompare(r.id)}
            >
              {r.name} ✕
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

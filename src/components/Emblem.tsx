"use client";

/**
 * Decorative, offline, copyright-clean artwork for the detail panel.
 *
 * People get a calligraphic medallion: their name in Arabic (Amiri), set in an
 * eight-point star (khātam) frame. This is deliberately the treatment for the
 * Prophet ﷺ, the other prophets, and the Companions, who are honored with
 * calligraphy rather than any image. Books, battles, states, institutions,
 * places, and events get a geometric emblem in the lane colour. No photographs,
 * no depictions of persons.
 */

import type { TimelineRecord } from "@/lib/types";

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

/** Honorific to show under a person's name, by record provenance. */
function honorific(rec: TimelineRecord): string | null {
  const a = rec.arabic ?? "";
  if (/ﷺ/.test(a) || /عليه السلام|عليهم السلام/.test(a)) return null; // already carried in the name
  if (rec.id.startsWith("prophet-")) return "عليه السلام";
  if (rec.lane === "companions") return "رضي الله عنه";
  return null;
}

/** Eight-point star (two overlaid squares) as a framing motif. */
function Khatam({
  cx,
  cy,
  r,
  color,
  opacity = 1,
}: {
  cx: number;
  cy: number;
  r: number;
  color: string;
  opacity?: number;
}) {
  const sq = (rot: number) => {
    const pts = [];
    for (let i = 0; i < 4; i++) {
      const a = (Math.PI / 2) * i + rot;
      pts.push(
        `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`,
      );
    }
    return pts.join(" ");
  };
  return (
    <g opacity={opacity}>
      <polygon
        points={sq(Math.PI / 4)}
        fill="none"
        stroke={color}
        strokeWidth={1.2}
      />
      <polygon points={sq(0)} fill="none" stroke={color} strokeWidth={1.2} />
    </g>
  );
}

function KindGlyph({ kind, color }: { kind: string; color: string }) {
  const c = color;
  switch (kind) {
    case "book":
      return (
        <g stroke={c} strokeWidth={2} fill="none" strokeLinejoin="round">
          <path
            d="M22 20 Q40 12 58 20 L58 52 Q40 44 22 52 Z"
            fill={`color-mix(in srgb, ${c} 12%, transparent)`}
          />
          <line x1={40} y1={16} x2={40} y2={48} />
          <line x1={28} y1={26} x2={35} y2={26} strokeWidth={1.3} />
          <line x1={28} y1={32} x2={35} y2={32} strokeWidth={1.3} />
          <line x1={45} y1={26} x2={52} y2={26} strokeWidth={1.3} />
          <line x1={45} y1={32} x2={52} y2={32} strokeWidth={1.3} />
        </g>
      );
    case "battle":
      return (
        <g stroke={c} strokeWidth={2} fill="none" strokeLinecap="round">
          <path d="M24 24 L52 52" />
          <path d="M56 24 L28 52" />
          <path d="M22 22 L28 24 L26 30 Z" fill={c} />
          <path d="M58 22 L52 24 L54 30 Z" fill={c} />
        </g>
      );
    case "empire":
      return (
        <g stroke={c} strokeWidth={2} fill="none">
          <path
            d="M20 52 L20 40 Q20 30 30 30 Q30 22 40 22 Q50 22 50 30 Q60 30 60 40 L60 52 Z"
            fill={`color-mix(in srgb, ${c} 12%, transparent)`}
            strokeLinejoin="round"
          />
          <circle cx={40} cy={18} r={3.2} fill={c} stroke="none" />
          <line x1={40} y1={30} x2={40} y2={52} strokeWidth={1.2} />
        </g>
      );
    case "institution":
    case "place":
      return (
        <g stroke={c} strokeWidth={2} fill="none" strokeLinejoin="round">
          <path
            d="M26 54 L26 34 Q26 24 40 24 Q54 24 54 34 L54 54 Z"
            fill={`color-mix(in srgb, ${c} 12%, transparent)`}
          />
          <path d="M40 24 L40 16" />
          <circle cx={40} cy={14} r={2.4} fill={c} stroke="none" />
          <line x1={18} y1={54} x2={62} y2={54} strokeLinecap="round" />
        </g>
      );
    case "movement":
      return (
        <g stroke={c} strokeWidth={1.8} fill="none">
          <Khatam cx={40} cy={38} r={18} color={c} />
          <circle
            cx={40}
            cy={38}
            r={5}
            fill={`color-mix(in srgb, ${c} 30%, transparent)`}
            stroke={c}
          />
        </g>
      );
    default: // event
      return (
        <g stroke={c} strokeWidth={1.8} fill="none">
          <circle cx={40} cy={38} r={13} />
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (Math.PI / 4) * i;
            return (
              <line
                key={i}
                x1={40 + 15 * Math.cos(a)}
                y1={38 + 15 * Math.sin(a)}
                x2={40 + 21 * Math.cos(a)}
                y2={38 + 21 * Math.sin(a)}
                strokeLinecap="round"
              />
            );
          })}
        </g>
      );
  }
}

export default function Emblem({ rec }: { rec: TimelineRecord }) {
  const color = LANE_COLOR[rec.lane] ?? "var(--ink)";
  const isPerson = rec.kind === "person";
  const hon = isPerson ? honorific(rec) : null;

  return (
    <div
      className="relative mb-3 flex items-center justify-center overflow-hidden rounded-lg"
      style={{
        height: 118,
        background: `color-mix(in srgb, ${color} 8%, var(--bg-sunken))`,
        border: "1px solid var(--panel-border)",
      }}
      aria-hidden="true"
    >
      {/* faint geometric field */}
      <svg
        viewBox="0 0 320 118"
        width="100%"
        height="118"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0"
      >
        <Khatam cx={40} cy={20} r={40} color={color} opacity={0.1} />
        <Khatam cx={280} cy={98} r={44} color={color} opacity={0.1} />
        <Khatam cx={300} cy={12} r={26} color={color} opacity={0.08} />
      </svg>

      {isPerson ? (
        <div className="relative flex flex-col items-center px-6 text-center">
          <div
            className="font-arabic leading-tight"
            dir="rtl"
            lang="ar"
            style={{
              fontSize: rec.arabic && rec.arabic.length > 16 ? 24 : 30,
              color,
            }}
          >
            {rec.arabic ?? rec.name}
          </div>
          {hon && (
            <div
              className="font-arabic mt-0.5 text-[14px]"
              dir="rtl"
              lang="ar"
              style={{ color: "var(--ink-soft)" }}
            >
              {hon}
            </div>
          )}
        </div>
      ) : (
        <div className="relative flex items-center gap-3 px-6">
          <svg viewBox="0 0 80 68" width="72" height="62">
            <KindGlyph kind={rec.kind} color={color} />
          </svg>
          {rec.arabic && (
            <div
              className="font-arabic max-w-[190px] text-right leading-tight"
              dir="rtl"
              lang="ar"
              style={{ fontSize: 22, color }}
            >
              {rec.arabic}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

"use client";

/**
 * Focused view for a selected record: dual-calendar dates with precision
 * badges, summary, nested timeline, connections, computed context,
 * citations, bookmark, compare, map focus, share, copy as a citation or as
 * plain text, and a report link with the record's id filled in.
 */

import { useEffect, useMemo, useState } from "react";
import {
  contemporariesOf,
  getRecord,
  getSpan,
  NOW_YEAR,
  relationsOf,
  statesActiveIn,
  type ResolvedRelation,
} from "@/lib/data";
import { formatFullDate, formatSpanDual, precisionBadge } from "@/lib/dates";
import { describePair } from "@/lib/overlap";
import { TimeScale } from "@/lib/scale";
import { useApp } from "@/lib/store";
import { CATEGORY_LABEL, schoolCategory } from "@/lib/schools";
import type { DetailEvent, RelationType, TimelineRecord } from "@/lib/types";
import Emblem from "./Emblem";
import { KIND_LABEL, REL_LABEL } from "@/lib/labels";
import {
  formatCitation,
  formatRecordText,
  instrumentLinkOf,
} from "@/lib/citation";
import { EMAIL, REPO } from "./Suggest";

/** What the last copy button put on the clipboard, for the confirmation label. */
type CopyKind = "link" | "citation" | "text";

const REL_ORDER: RelationType[] = [
  "written_by",
  "wrote",
  "student_of",
  "teacher_of",
  "founded_by",
  "founded",
  "occurred_under",
  "ruled_during",
  "fought_in",
  "participant",
  "part_of",
  "influenced",
  "related",
];

function useBookmarks(): [string[], (id: string) => void] {
  const [list, setList] = useState<string[]>([]);
  useEffect(() => {
    try {
      setList(JSON.parse(localStorage.getItem("itl-bookmarks") ?? "[]"));
    } catch {
      setList([]);
    }
  }, []);
  const toggle = (id: string) => {
    setList((cur) => {
      const next = cur.includes(id)
        ? cur.filter((x) => x !== id)
        : [...cur, id];
      localStorage.setItem("itl-bookmarks", JSON.stringify(next));
      return next;
    });
  };
  return [list, toggle];
}

export default function DetailPanel() {
  const selectedId = useApp((s) => s.selectedId);
  const select = useApp((s) => s.select);
  const toggleCompare = useApp((s) => s.toggleCompare);
  const compareIds = useApp((s) => s.compareIds);
  const setMapOpen = useApp((s) => s.setMapOpen);
  const [bookmarks, toggleBookmark] = useBookmarks();
  const [copied, setCopied] = useState<CopyKind | null>(null);

  const rec = selectedId ? getRecord(selectedId) : undefined;

  const relations = useMemo(() => (rec ? relationsOf(rec.id) : []), [rec]);
  const contemporaries = useMemo(
    () => (rec ? contemporariesOf(rec.id, { limit: 8 }) : []),
    [rec],
  );
  const states = useMemo(() => {
    if (!rec || rec.kind === "empire") return [];
    const s = getSpan(rec);
    const mid = Math.round((s.start + s.end) / 2);
    return statesActiveIn(mid).slice(0, 4);
  }, [rec]);

  useEffect(() => setCopied(null), [selectedId]);

  if (!rec) return null;
  const span = getSpan(rec);
  const grouped = new Map<RelationType, ResolvedRelation[]>();
  for (const r of relations) {
    if (!grouped.has(r.type)) grouped.set(r.type, []);
    grouped.get(r.type)!.push(r);
  }

  // The text is built before the first await so Safari still sees the click.
  const copy = async (what: CopyKind, text: () => string) => {
    try {
      await navigator.clipboard.writeText(text());
      setCopied(what);
      setTimeout(() => setCopied((cur) => (cur === what ? null : cur)), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };
  const share = () => copy("link", () => window.location.href);

  const shownDates = formatSpanDual(rec.start, rec.end, rec.ongoing);
  const reportUrl = reportIssueUrl(rec, shownDates, currentAddress(rec));
  const reportMail =
    `mailto:${EMAIL}` +
    `?subject=${encodeURIComponent(`Islamic Timeline: correction for ${rec.id}`)}` +
    `&body=${encodeURIComponent(
      `Record: ${rec.name} (${rec.id})\nDates shown: ${shownDates}\n` +
        `Address: ${currentAddress(rec)}\n\nWhat is wrong:\n\nWhat it should say:\n\nSources:\n`,
    )}`;

  return (
    <aside
      className="panel nice-scroll fade-up fixed inset-x-0 bottom-0 z-40 max-h-[68vh] overflow-y-auto rounded-b-none rounded-t-2xl border-b-0 sm:inset-x-auto sm:bottom-3 sm:right-3 sm:top-14 sm:max-h-none sm:w-[420px] sm:rounded-xl sm:border"
      role="dialog"
      aria-label={`Details: ${rec.name}`}
      data-testid="detail-panel"
    >
      {/* header */}
      <div
        className="sticky top-0 z-10 px-5 pb-3 pt-4"
        style={{
          background: "var(--panel)",
          borderBottom: "1px solid var(--panel-border)",
        }}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="mb-1 flex flex-wrap items-center gap-1.5">
              <span className="badge">
                {(() => {
                  const c = schoolCategory(rec);
                  return c ? CATEGORY_LABEL[c] : KIND_LABEL[rec.kind];
                })()}
              </span>
              <span
                className="badge"
                title="Editorial display-prominence estimate, see Methodology"
              >
                {"●".repeat(rec.importance)}
                {"○".repeat(5 - rec.importance)}
              </span>
              {precisionBadge(rec.start) && (
                <span className="badge warn">{precisionBadge(rec.start)}</span>
              )}
              {rec.end &&
                precisionBadge(rec.end) &&
                precisionBadge(rec.end) !== precisionBadge(rec.start) && (
                  <span className="badge warn">{precisionBadge(rec.end)}</span>
                )}
            </div>
            <h2
              className="font-display text-[22px] font-semibold leading-tight"
              style={{ color: "var(--ink)" }}
            >
              {rec.name}
            </h2>
            {rec.arabic && (
              <div
                className="font-arabic mt-0.5 text-[19px] leading-snug"
                dir="rtl"
                lang="ar"
                style={{ color: "var(--ink-soft)" }}
              >
                {rec.arabic}
              </div>
            )}
            <div
              className="mt-1 text-[13px]"
              style={{ color: "var(--gold)" }}
              data-testid="record-dates"
            >
              {shownDates}
            </div>
          </div>
          <button
            className="btn"
            onClick={() => select(null)}
            aria-label="Close details"
          >
            ✕
          </button>
        </div>
        {/* actions */}
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          <button
            className="btn"
            aria-pressed={compareIds.includes(rec.id)}
            onClick={() => toggleCompare(rec.id)}
          >
            {compareIds.includes(rec.id) ? "✓ In comparison" : "⇄ Compare"}
          </button>
          {rec.location && (
            <button className="btn" onClick={() => setMapOpen(true)}>
              ⌖ Atlas
            </button>
          )}
          <button
            className="btn"
            aria-pressed={bookmarks.includes(rec.id)}
            onClick={() => toggleBookmark(rec.id)}
          >
            {bookmarks.includes(rec.id) ? "★ Saved" : "☆ Save"}
          </button>
          <button className="btn" onClick={share}>
            {copied === "link" ? "✓ Link copied" : "⎘ Share view"}
          </button>
        </div>
      </div>

      <div className="space-y-5 px-5 py-4">
        {/* calligraphy medallion / geometric emblem */}
        <Emblem rec={rec} />

        {/* dates detail */}
        <section>
          <div
            className="text-[12.5px] leading-relaxed"
            style={{ color: "var(--ink-soft)" }}
          >
            <div>
              <span style={{ color: "var(--ink-faint)" }}>
                {rec.kind === "person"
                  ? "Born"
                  : rec.kind === "book"
                    ? "Composed"
                    : "Begins"}
                :{" "}
              </span>
              {formatFullDate(rec.start)}
              {rec.start.altYears && rec.start.altYears.length > 0 && (
                <span style={{ color: "var(--brick)" }}>
                  {" "}
                  · also reported: {rec.start.altYears.join(", ")}
                </span>
              )}
            </div>
            {rec.end && (
              <div>
                <span style={{ color: "var(--ink-faint)" }}>
                  {rec.kind === "person" ? "Died" : "Ends"}:{" "}
                </span>
                {formatFullDate(rec.end)}
                {rec.end.altYears && rec.end.altYears.length > 0 && (
                  <span style={{ color: "var(--brick)" }}>
                    {" "}
                    · also reported: {rec.end.altYears.join(", ")}
                  </span>
                )}
              </div>
            )}
            {rec.ongoing && (
              <div style={{ color: "var(--ink-faint)" }}>
                Continues to the present.
              </div>
            )}
            {(rec.start.note || rec.end?.note) && (
              <p
                className="mt-1.5 rounded-md px-2.5 py-1.5 text-[12px]"
                style={{
                  background: "var(--bg-sunken)",
                  color: "var(--ink-soft)",
                }}
              >
                {rec.start.note} {rec.end?.note}
              </p>
            )}
          </div>
        </section>

        {/* summary */}
        <section>
          <p
            className="text-[13.5px] leading-relaxed"
            style={{ color: "var(--ink)" }}
            data-testid="record-summary"
          >
            {rec.summary}
          </p>
          {rec.location && (
            <p
              className="mt-1.5 text-[12px]"
              style={{ color: "var(--ink-faint)" }}
            >
              ⌖ {rec.location.name}
              {rec.location.approximate ? " (approximate location)" : ""}
            </p>
          )}
        </section>

        {/* nested timeline */}
        {rec.details && rec.details.length > 0 && (
          <section>
            <h3
              className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em]"
              style={{ color: "var(--ink-faint)" }}
            >
              Within this{" "}
              {rec.kind === "person"
                ? "life"
                : KIND_LABEL[rec.kind].toLowerCase()}
            </h3>
            <NestedTimeline rec={rec} events={rec.details} />
          </section>
        )}

        {/* connections */}
        {grouped.size > 0 && (
          <section>
            <h3
              className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em]"
              style={{ color: "var(--ink-faint)" }}
            >
              Connections
            </h3>
            <div className="space-y-2.5">
              {REL_ORDER.filter((t) => grouped.has(t)).map((t) => (
                <div key={t}>
                  <div
                    className="mb-1 text-[11.5px]"
                    style={{ color: "var(--ink-faint)" }}
                  >
                    {REL_LABEL[t]}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {grouped.get(t)!.map((r) => (
                      <button
                        key={`${t}-${r.record.id}`}
                        className="chip"
                        onClick={() => select(r.record.id)}
                        title={r.note}
                      >
                        {r.record.name}
                        {r.note ? (
                          <span style={{ color: "var(--ink-faint)" }}>
                            ·{" "}
                            {r.note.length > 26
                              ? r.note.slice(0, 25) + "…"
                              : r.note}
                          </span>
                        ) : null}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* computed context */}
        <section>
          <h3
            className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em]"
            style={{ color: "var(--ink-faint)" }}
          >
            In its time{" "}
            <span className="normal-case tracking-normal">
              ({span.start}–{span.end === NOW_YEAR ? "present" : span.end})
            </span>
          </h3>
          {states.length > 0 && (
            <div className="mb-2 flex flex-wrap gap-1.5">
              {states.map((s) => (
                <button
                  key={s.id}
                  className="chip"
                  style={{
                    borderColor:
                      "color-mix(in srgb, var(--lapis) 45%, transparent)",
                  }}
                  onClick={() => select(s.id)}
                >
                  ⬒ {s.name}
                </button>
              ))}
            </div>
          )}
          {contemporaries.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {contemporaries.map((c) => (
                <button
                  key={c.id}
                  className="chip"
                  onClick={() => select(c.id)}
                  title={describePair(rec, c, NOW_YEAR)}
                >
                  {c.name}
                </button>
              ))}
            </div>
          )}
        </section>

        {/* citations */}
        <section>
          <h3
            className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em]"
            style={{ color: "var(--ink-faint)" }}
          >
            Sources
          </h3>
          <ul
            className="space-y-1.5 text-[12px] leading-relaxed"
            style={{ color: "var(--ink-soft)" }}
          >
            {rec.citations.map((c, i) => (
              <li key={i} className="pl-3" style={{ textIndent: "-0.75rem" }}>
                {c.url ? (
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noreferrer"
                    className="underline decoration-dotted underline-offset-2"
                  >
                    {c.source}
                  </a>
                ) : (
                  c.source
                )}
                {c.detail ? `, ${c.detail}` : ""}
              </li>
            ))}
          </ul>
          {/* The copy buttons sit with the sources they draw on. In the sticky
              header they pushed the action row to three lines on a 360 px
              phone; here the header keeps its shape at every width. */}
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            <button
              className="btn"
              onClick={() =>
                copy("citation", () => formatCitation(rec, new Date()))
              }
            >
              {copied === "citation" ? "✓ Citation copied" : "❝ Copy citation"}
            </button>
            <button
              className="btn"
              onClick={() => copy("text", () => formatRecordText(rec, new Date()))}
            >
              {copied === "text" ? "✓ Text copied" : "¶ Copy as text"}
            </button>
          </div>
          <p className="mt-2 text-[11px]" style={{ color: "var(--ink-faint)" }}>
            Dates follow the cited references; see the{" "}
            <a className="underline decoration-dotted" href="./methodology/">
              methodology
            </a>{" "}
            for conventions and the full bibliography.
          </p>
          <p className="mt-1.5 text-[11px]" style={{ color: "var(--ink-faint)" }}>
            <a
              className="underline decoration-dotted"
              href={reportUrl}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => {
                // The address may have moved since this rendered; send the live one.
                e.currentTarget.href = reportIssueUrl(
                  rec,
                  shownDates,
                  currentAddress(rec),
                );
              }}
            >
              Report a problem
            </a>{" "}
            with this record, or{" "}
            <a className="underline decoration-dotted" href={reportMail}>
              email a correction
            </a>
            .
          </p>
        </section>
      </div>
    </aside>
  );
}

/* ---------------------------- report a problem ---------------------------- */

/** The page's own address when there is one, else the record inside the instrument. */
function currentAddress(rec: TimelineRecord): string {
  return typeof window === "undefined" ? instrumentLinkOf(rec) : window.location.href;
}

/** The correction form on the repository, with this record filled in. */
function reportIssueUrl(rec: TimelineRecord, dates: string, address: string): string {
  return (
    `https://github.com/${REPO}/issues/new` +
    `?template=correct-record.yml` +
    `&title=${encodeURIComponent(`Correction: ${rec.name}`)}` +
    `&record=${encodeURIComponent(rec.id)}` +
    `&name=${encodeURIComponent(rec.name)}` +
    `&dates=${encodeURIComponent(dates)}` +
    `&url=${encodeURIComponent(address)}`
  );
}

/* --------------------------- nested timeline --------------------------- */

function NestedTimeline({
  rec,
  events,
}: {
  rec: TimelineRecord;
  events: DetailEvent[];
}) {
  const flyTo = useApp((s) => s.flyTo);
  const span = getSpan(rec);
  const pad = Math.max((span.end - span.start) * 0.06, 1);
  const y0 = span.start - pad;
  const y1 = span.end + pad;
  const sorted = [...events].sort((a, b) => b.date.year - a.date.year); // recent first (top)
  const GAP = 30;
  const H = Math.max(sorted.length * GAP + 44, 150);
  const yFor = (year: number) => ((y1 - year) / (y1 - y0)) * (H - 24) + 12;
  const scale = new TimeScale(1, NOW_YEAR);
  void scale;

  // spread labels so they never overlap; keep dots true to time, add leaders
  let prev = -Infinity;
  const rows = sorted.map((ev) => {
    const yDot = Math.min(Math.max(yFor(ev.date.year), 10), H - 10);
    const yLabel = Math.max(yDot, prev + GAP);
    prev = yLabel;
    return { ev, yDot, yLabel };
  });
  const height = Math.max(H, (rows[rows.length - 1]?.yLabel ?? 0) + 26);

  return (
    <svg
      width="100%"
      height={height}
      viewBox={`0 0 380 ${height}`}
      className="overflow-visible"
      role="img"
      aria-label={`Nested timeline of ${rec.name}`}
    >
      <line
        x1={16}
        y1={yFor(span.end)}
        x2={16}
        y2={yFor(span.start)}
        stroke="var(--line)"
        strokeWidth={1.8}
      />
      <circle cx={16} cy={yFor(span.start)} r={3.5} fill="var(--line)" />
      {rec.ongoing ? (
        <line
          x1={16}
          y1={yFor(span.end)}
          x2={16}
          y2={yFor(span.end) - 8}
          stroke="var(--line)"
          strokeDasharray="2 3"
        />
      ) : (
        <circle cx={16} cy={yFor(span.end)} r={3.5} fill="var(--line)" />
      )}
      {rows.map(({ ev, yDot, yLabel }, i) => (
        <g
          key={i}
          className="tl-item"
          onClick={() =>
            flyTo(ev.date.year, Math.max(useApp.getState().ppy, 24))
          }
        >
          <circle
            cx={16}
            cy={yDot}
            r={3}
            fill={ev.date.precision === "exact" ? "var(--gold)" : "var(--bg)"}
            stroke="var(--gold)"
            strokeWidth={1.3}
          />
          {Math.abs(yLabel - yDot) > 4 && (
            <path
              d={`M19,${yDot} C24,${yDot} 22,${yLabel} 27,${yLabel}`}
              fill="none"
              stroke="var(--rule)"
              strokeWidth={1}
            />
          )}
          <text
            x={30}
            y={yLabel - 1}
            className="tl-label strong"
            style={{ fontSize: 11.5 }}
          >
            {ev.label.length > 52 ? ev.label.slice(0, 51) + "…" : ev.label}
          </text>
          <text
            x={30}
            y={yLabel + 11}
            className="tl-label"
            style={{ fontSize: 10.5, fill: "var(--ink-faint)" }}
          >
            {formatFullDate(ev.date)}
            {ev.date.precision === "circa" ? " (approx.)" : ""}
          </text>
        </g>
      ))}
    </svg>
  );
}

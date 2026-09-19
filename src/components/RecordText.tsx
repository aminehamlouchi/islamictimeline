/**
 * The text of a record: its dates, summary, nested events, connections and
 * sources. Server-safe and hook-free, so the static record pages render it
 * and the detail panel can adopt it later. Every connection links to
 * `hrefFor(id)`; the caller decides where a sibling record lives.
 *
 * Nothing here reads the clock. "Present" comes from the record's own
 * `ongoing` flag, never from the year of the build.
 */

import Link from "next/link";
import type { ResolvedRelation } from "@/lib/data";
import { formatFullDate, formatYearCE } from "@/lib/dates";
import { dateLabels, KIND_LABEL, REL_LABEL, REL_ORDER } from "@/lib/labels";
import type { HDate, RelationType, TimelineRecord } from "@/lib/types";

const HEADING =
  "mb-2 text-[12px] font-semibold uppercase tracking-[0.14em]";

function AlsoReported({ d }: { d: HDate }) {
  if (!d.altYears || d.altYears.length === 0) return null;
  return (
    <span style={{ color: "var(--brick)" }}>
      {" "}
      · also reported: {d.altYears.map(formatYearCE).join(", ")}
    </span>
  );
}

export default function RecordText({
  rec,
  relations,
  hrefFor,
  heading = "h2",
}: {
  rec: TimelineRecord;
  relations: ResolvedRelation[];
  hrefFor: (id: string) => string;
  /** h2 on a page whose h1 is the record; h3 inside a panel. */
  heading?: "h2" | "h3";
}) {
  const H = heading;
  const [startLabel, endLabel] = dateLabels(rec.kind);
  const grouped = new Map<RelationType, ResolvedRelation[]>();
  for (const r of relations) {
    if (!grouped.has(r.type)) grouped.set(r.type, []);
    grouped.get(r.type)!.push(r);
  }
  // Earliest first: this is a list to read, not the instrument's scale.
  const details = [...(rec.details ?? [])].sort(
    (a, b) => a.date.year - b.date.year,
  );

  return (
    <div className="space-y-6">
      <section>
        <div
          className="text-[13.5px] leading-relaxed"
          style={{ color: "var(--ink-soft)" }}
        >
          {rec.start.precision === "unknown" ? (
            <div>{formatFullDate(rec.start)}</div>
          ) : (
            <>
              <div>
                <span style={{ color: "var(--ink-soft)" }}>
                  {startLabel}:{" "}
                </span>
                {formatFullDate(rec.start)}
                <AlsoReported d={rec.start} />
              </div>
              {rec.end && (
                <div>
                  <span style={{ color: "var(--ink-soft)" }}>
                    {endLabel}:{" "}
                  </span>
                  {formatFullDate(rec.end)}
                  <AlsoReported d={rec.end} />
                </div>
              )}
              {rec.ongoing && (
                <div style={{ color: "var(--ink-soft)" }}>
                  Continues to the present.
                </div>
              )}
            </>
          )}
          {(rec.start.note || rec.end?.note) && (
            <p
              className="mt-2 rounded-md px-3 py-2 text-[13px]"
              style={{
                background: "var(--bg-sunken)",
                color: "var(--ink-soft)",
              }}
            >
              {[rec.start.note, rec.end?.note].filter(Boolean).join(" ")}
            </p>
          )}
        </div>
      </section>

      <section>
        <p
          className="text-[15px] leading-relaxed"
          style={{ color: "var(--ink)" }}
        >
          {rec.summary}
        </p>
        {rec.location && (
          <p className="mt-2 text-[13px]" style={{ color: "var(--ink-soft)" }}>
            ⌖ {rec.location.name}
            {rec.location.approximate ? " (approximate location)" : ""}
          </p>
        )}
      </section>

      {details.length > 0 && (
        <section>
          <H className={HEADING} style={{ color: "var(--ink-soft)" }}>
            Within this{" "}
            {rec.kind === "person" ? "life" : KIND_LABEL[rec.kind].toLowerCase()}
          </H>
          <ol className="space-y-2 text-[13.5px] leading-relaxed">
            {details.map((ev, i) => (
              <li key={i}>
                <span style={{ color: "var(--ink)" }}>{ev.label}</span>
                <span style={{ color: "var(--ink-soft)" }}>
                  {" "}
                  · {formatFullDate(ev.date)}
                  {ev.date.precision === "circa" ? " (approx.)" : ""}
                </span>
                {ev.note && (
                  <span
                    className="block text-[12.5px]"
                    style={{ color: "var(--ink-soft)" }}
                  >
                    {ev.note}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </section>
      )}

      {grouped.size > 0 && (
        <section>
          <H className={HEADING} style={{ color: "var(--ink-soft)" }}>
            Connections
          </H>
          <div className="space-y-3">
            {REL_ORDER.filter((t) => grouped.has(t)).map((t) => (
              <div key={t}>
                <div
                  className="mb-1 text-[12px]"
                  style={{ color: "var(--ink-soft)" }}
                >
                  {REL_LABEL[t]}
                </div>
                <ul className="flex flex-wrap gap-1.5">
                  {grouped.get(t)!.map((r) => (
                    <li key={`${t}-${r.record.id}`}>
                      <Link
                        href={hrefFor(r.record.id)}
                        prefetch={false}
                        className="chip"
                      >
                        {r.record.name}
                        {r.note ? (
                          <span style={{ color: "var(--ink-soft)" }}>
                            · {r.note}
                          </span>
                        ) : null}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      <section>
        <H className={HEADING} style={{ color: "var(--ink-soft)" }}>
          Sources
        </H>
        <ul
          className="space-y-1.5 text-[13px] leading-relaxed"
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
        <p className="mt-2 text-[12px]" style={{ color: "var(--ink-soft)" }}>
          Dates follow the cited references; see the{" "}
          <Link
            href="/methodology/"
            prefetch={false}
            className="underline decoration-dotted"
          >
            methodology
          </Link>{" "}
          for conventions and the full bibliography.
        </p>
      </section>
    </div>
  );
}

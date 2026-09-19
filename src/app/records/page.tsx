import type { Metadata } from "next";
import { getAllRecords } from "@/lib/data";
import { formatSpanDual, formatYearCE, precisionBadge } from "@/lib/dates";
import { ERAS, eraForYear } from "@/lib/eras";
import { KIND_LABEL, LANE_LABEL, LANE_ORDER } from "@/lib/labels";
import { SITE_URL } from "@/lib/site";
import type { Era, LaneId, TimelineRecord } from "@/lib/types";

/**
 * The record index: every record, grouped by era and lane, as plain HTML.
 *
 * This is the text alternative to the canvas. It is rendered once at build
 * time and ships no script of its own: the rows are ordinary links into the
 * instrument (`/?sel=<id>`, which App.tsx selects on load), the era sections
 * are permalinks (`/records/#abbasid`), and the page prints as a list.
 *
 * Rows deliberately carry no importance, summary or citations; those belong
 * to the record view. Undated records (the earliest prophets, whose `year` is
 * a layout slot) are listed in traditional order with no year at all, and
 * nothing here reads the clock, so the document is the same on every visit.
 */

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const RECORDS = getAllRecords();
const COUNT = RECORDS.length;

const TITLE = "Index of records, The Islamic Timeline";
const DESCRIPTION = `All ${COUNT} records of The Islamic Timeline, listed by era and lane with Hijri and Gregorian dates. Each name opens the timeline at that record.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/records/` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/records/`,
    images: [`${SITE_URL}/og.png`],
    type: "article",
  },
};

/* ------------------------------ grouping ------------------------------ */

interface LaneGroup {
  lane: LaneId;
  records: TimelineRecord[];
}

interface EraGroup {
  era: Era;
  count: number;
  lanes: LaneGroup[];
}

const undated = (r: TimelineRecord) => r.start.precision === "unknown";

/** Chronological within a lane, never by importance; the name breaks ties. */
function byStart(a: TimelineRecord, b: TimelineRecord): number {
  return a.start.year - b.start.year || a.name.localeCompare(b.name, "en");
}

function groupByEra(records: TimelineRecord[]): EraGroup[] {
  const buckets = new Map<string, TimelineRecord[]>(
    ERAS.map((e) => [e.id, [] as TimelineRecord[]]),
  );
  for (const r of records) {
    // An undated record's year is a layout slot, not a date, so it never goes
    // through eraForYear: it belongs to the undated band by definition.
    const era = undated(r) ? ERAS[0] : eraForYear(r.start.year);
    buckets.get(era.id)!.push(r);
  }
  return ERAS.map((era) => {
    const list = buckets.get(era.id)!;
    const lanes = LANE_ORDER.map((lane) => ({
      lane,
      records: list.filter((r) => r.lane === lane).sort(byStart),
    })).filter((g) => g.records.length > 0);
    return { era, count: list.length, lanes };
  });
}

const GROUPS = groupByEra(RECORDS);

/* ------------------------------ rendering ----------------------------- */

function plural(n: number): string {
  return n === 1 ? "1 record" : `${n} records`;
}

function Dates({ r }: { r: TimelineRecord }) {
  if (undated(r)) {
    return <span className="ri-date">{precisionBadge(r.start)}</span>;
  }
  const badges: string[] = [];
  for (const d of [r.start, r.end]) {
    const b = d ? precisionBadge(d) : null;
    if (b && !badges.includes(b)) badges.push(b);
  }
  const alsoReported = [
    ...(r.start.altYears ?? []),
    ...(r.end?.altYears ?? []),
  ].map(formatYearCE);
  return (
    <span className="ri-date">
      {formatSpanDual(r.start, r.end, r.ongoing)}
      {badges.map((b) => (
        <span key={b} className="badge warn ri-badge">
          {b}
        </span>
      ))}
      {alsoReported.length > 0 && (
        <span className="ri-alt">also reported {alsoReported.join(", ")}</span>
      )}
    </span>
  );
}

function Row({ r }: { r: TimelineRecord }) {
  return (
    <li className="ri-row" data-record={r.id}>
      <a
        className="ri-name"
        href={`${BASE_PATH}/?sel=${encodeURIComponent(r.id)}`}
      >
        {r.name}
      </a>
      {r.arabic && (
        <span className="ri-arabic font-arabic" lang="ar" dir="rtl">
          {r.arabic}
        </span>
      )}
      <span className="ri-meta">
        <span className="ri-kind">{KIND_LABEL[r.kind]}</span>
        <Dates r={r} />
      </span>
    </li>
  );
}

export default function RecordsIndex() {
  return (
    <main className="records-index mx-auto max-w-[960px] px-4 py-10 sm:px-6">
      <div className="ri-chrome mb-6 flex flex-wrap items-center gap-2">
        <a href="../" className="btn inline-flex">
          ← Back to the timeline
        </a>
        <a href="../methodology/" className="btn inline-flex">
          Methodology &amp; sources
        </a>
      </div>

      <h1
        className="font-display text-[30px] font-semibold leading-tight"
        style={{ color: "var(--ink)" }}
      >
        Index of records
      </h1>
      <p
        className="mt-2 text-[14px] leading-relaxed"
        style={{ color: "var(--ink-soft)" }}
      >
        {COUNT} records by era and lane; each name opens the timeline at that
        record.
      </p>

      <nav aria-label="Records by era" className="ri-nav mt-6">
        <ul className="flex flex-wrap gap-1.5">
          {GROUPS.map(({ era, count }) => (
            <li key={era.id}>
              <a className="chip ri-jump" href={`#${era.id}`}>
                {era.label}
                <span className="ri-jump-count">{count}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {GROUPS.map(({ era, count, lanes }) => (
        <section
          key={era.id}
          id={era.id}
          className="ri-era mt-12"
          // a size estimate for the skipped section: heading, lane headings, rows
          style={{
            containIntrinsicSize: `auto ${80 + lanes.length * 40 + count * 46}px`,
          }}
        >
          <h2
            className="font-display text-[22px] font-semibold leading-tight"
            style={{ color: "var(--ink)" }}
          >
            {era.label}
            <span className="ri-count">{plural(count)}</span>
          </h2>
          {era.arabic && (
            <p
              className="font-arabic mt-0.5 text-[17px]"
              dir="rtl"
              lang="ar"
              style={{ color: "var(--ink-soft)" }}
            >
              {era.arabic}
            </p>
          )}
          {lanes.map(({ lane, records }) => (
            <div key={lane} className="mt-5">
              <h3
                className="mb-1 text-[12px] font-semibold uppercase tracking-[0.06em]"
                style={{ color: "var(--ink-soft)" }}
              >
                {LANE_LABEL[lane]}
              </h3>
              <ul className="ri-list">
                {records.map((r) => (
                  <Row key={r.id} r={r} />
                ))}
              </ul>
            </div>
          ))}
        </section>
      ))}

      <footer
        className="ri-chrome mt-12 border-t pt-4 text-[12px]"
        style={{ borderColor: "var(--rule)", color: "var(--ink-soft)" }}
      >
        <a href="../" className="btn inline-flex">
          ← Back to the timeline
        </a>
      </footer>
    </main>
  );
}

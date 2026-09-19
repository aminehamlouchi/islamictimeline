/**
 * One static page per record, built from the fields the instrument already
 * shows, with JSON-LD that never presents an approximate date as exact.
 *
 * Nothing on this page reads the clock. contemporariesOf and getSpan resolve
 * "present" against the year of the build, which would bake that year into
 * every ongoing record's page; the text block and the dates use the record's
 * own fields instead.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Emblem from "@/components/Emblem";
import RecordText from "@/components/RecordText";
import { getAllRecords, getRecord, relationsOf } from "@/lib/data";
import {
  formatCEPart,
  formatFullDate,
  formatSpanDual,
  precisionBadge,
} from "@/lib/dates";
import { jsonLdFor, jsonLdScript } from "@/lib/jsonld";
import { KIND_LABEL, LANE_LABEL } from "@/lib/labels";
import { CATEGORY_LABEL, schoolCategory } from "@/lib/schools";
import { SITE_URL } from "@/lib/site";
import type { TimelineRecord } from "@/lib/types";

type Params = { id: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return getAllRecords().map((r) => ({ id: r.id }));
}

const pageUrl = (rec: TimelineRecord) => `${SITE_URL}/r/${rec.id}/`;

/** The Common Era span alone, "c. 780 – 850 CE" or "1935 CE – present", for the title. */
function ceSpan(rec: TimelineRecord): string | null {
  if (rec.start.precision === "unknown") return null;
  const start = formatCEPart(rec.start);
  if (rec.ongoing) return `${start} CE – present`;
  return rec.end ? `${start} – ${formatCEPart(rec.end)} CE` : `${start} CE`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { id } = await params;
  const rec = getRecord(id);
  if (!rec) return {};
  const span = ceSpan(rec);
  const title = `${rec.name}${span ? ` (${span})` : ""}, The Islamic Timeline`;
  const url = pageUrl(rec);
  return {
    title,
    description: rec.summary,
    alternates: { canonical: url },
    openGraph: {
      title: rec.name,
      description: rec.summary,
      url,
      images: [`${SITE_URL}/og.png`],
      siteName: "The Islamic Timeline",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: rec.name,
      description: rec.summary,
      images: [`${SITE_URL}/og.png`],
    },
  };
}

export default async function RecordPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;
  const rec = getRecord(id);
  if (!rec) notFound();

  const relations = relationsOf(rec.id);
  const category = schoolCategory(rec);
  const kindLabel = category ? CATEGORY_LABEL[category] : KIND_LABEL[rec.kind];
  const startBadge = precisionBadge(rec.start);
  const endBadge = rec.end ? precisionBadge(rec.end) : null;
  const dates =
    rec.start.precision === "unknown"
      ? formatFullDate(rec.start)
      : formatSpanDual(rec.start, rec.end, rec.ongoing);
  const ld = jsonLdFor(rec, pageUrl(rec));

  return (
    <main className="mx-auto max-w-[760px] px-5 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(ld) }}
      />
      <p
        className="mb-6 text-[11px] font-semibold uppercase tracking-[0.14em]"
        style={{ color: "var(--ink-soft)" }}
      >
        <Link href="/" prefetch={false}>
          The Islamic Timeline
        </Link>
      </p>

      <header>
        <div className="mb-2 flex flex-wrap items-center gap-1.5">
          <span className="badge">{kindLabel}</span>
          <span className="badge">{LANE_LABEL[rec.lane]}</span>
          {startBadge && <span className="badge warn">{startBadge}</span>}
          {endBadge && endBadge !== startBadge && (
            <span className="badge warn">{endBadge}</span>
          )}
        </div>
        <h1
          className="font-display text-[30px] font-semibold leading-tight"
          style={{ color: "var(--ink)" }}
        >
          {rec.name}
        </h1>
        {rec.arabic && (
          <p
            className="font-arabic mt-1 text-[24px] leading-snug"
            dir="rtl"
            lang="ar"
            style={{ color: "var(--ink-soft)" }}
          >
            {rec.arabic}
          </p>
        )}
        <p className="mt-2 text-[14px]" style={{ color: "var(--gold-ink)" }}>
          {dates}
        </p>
        <p className="mt-4">
          <Link href={`/?sel=${rec.id}`} prefetch={false} className="btn">
            Open in the instrument
          </Link>
        </p>
      </header>

      <div className="mt-6">
        <Emblem rec={rec} />
        <RecordText
          rec={rec}
          relations={relations}
          hrefFor={(target) => `/r/${target}/`}
        />
      </div>

      <footer
        className="mt-10 flex flex-wrap gap-2 border-t pt-4 text-[12px]"
        style={{ borderColor: "var(--rule)", color: "var(--ink-soft)" }}
      >
        <Link href="/" prefetch={false} className="btn">
          ← Back to the timeline
        </Link>
        <Link href="/methodology/" prefetch={false} className="btn">
          Methodology &amp; sources
        </Link>
      </footer>
    </main>
  );
}

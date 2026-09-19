import type { Metadata } from "next";
import Link from "next/link";

/** The site's own 404, exported as out/404.html, which GitHub Pages serves for any address that has no page. */

export const metadata: Metadata = {
  title: "Page not found, The Islamic Timeline",
};

export default function NotFound() {
  return (
    <main className="mx-auto max-w-[760px] px-5 py-10">
      <p
        className="mb-6 text-[11px] font-semibold uppercase tracking-[0.14em]"
        style={{ color: "var(--ink-soft)" }}
      >
        The Islamic Timeline
      </p>
      <h1
        className="font-display text-[30px] font-semibold leading-tight"
        style={{ color: "var(--ink)" }}
      >
        Page not found
      </h1>
      <p
        className="mt-3 text-[14px] leading-relaxed"
        style={{ color: "var(--ink-soft)" }}
      >
        There is no page at this address.
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        <Link href="/" prefetch={false} className="btn">
          ← Back to the timeline
        </Link>
        <Link href="/methodology/" prefetch={false} className="btn">
          Methodology &amp; sources
        </Link>
          <Link href="/records/" prefetch={false} className="btn">
            All records
          </Link>
      </div>
    </main>
  );
}

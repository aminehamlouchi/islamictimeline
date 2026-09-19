"use client";

/**
 * "Suggest a record" form. The site is static, so a submission opens a
 * prefilled GitHub issue on the public repository (trackable, free), with a
 * mailto fallback. No data leaves the browser until the user chooses to send.
 */

import { useEffect, useState } from "react";
import { useApp } from "@/lib/store";

const REPO = "aminehamlouchi/islamictimeline";
const EMAIL = "aminehamlouchibusiness@gmail.com";

const KINDS = [
  "person",
  "book",
  "empire / dynasty",
  "battle / event",
  "institution / place",
  "school / movement",
];

export default function SuggestModal() {
  const open = useApp((s) => s.suggestOpen);
  const setOpen = useApp((s) => s.setSuggestOpen);
  const [name, setName] = useState("");
  const [kind, setKind] = useState(KINDS[0]);
  const [dates, setDates] = useState("");
  const [region, setRegion] = useState("");
  const [why, setWhy] = useState("");
  const [sources, setSources] = useState("");

  useEffect(() => {
    if (open) {
      setName("");
      setKind(KINDS[0]);
      setDates("");
      setRegion("");
      setWhy("");
      setSources("");
    }
  }, [open]);

  if (!open) return null;

  const body = `**Name:** ${name}
**Kind:** ${kind}
**Approx. dates:** ${dates}
**Region:** ${region}

**Why it belongs on the timeline:**
${why}

**Sources (please cite reputable references):**
${sources}

_Submitted via the in-app "Suggest a record" form._`;

  // The structured form on the repository takes each field by its id, so the
  // issue arrives as data rather than as a block of prose.
  const issueUrl =
    `https://github.com/${REPO}/issues/new` +
    `?template=suggest-record.yml` +
    `&title=${encodeURIComponent(`Suggested record: ${name || "(unnamed)"}`)}` +
    `&name=${encodeURIComponent(name)}` +
    `&kind=${encodeURIComponent(kind)}` +
    `&dates=${encodeURIComponent(dates)}` +
    `&region=${encodeURIComponent(region)}` +
    `&why=${encodeURIComponent(why)}` +
    `&sources=${encodeURIComponent(sources)}`;

  const mailUrl =
    `mailto:${EMAIL}` +
    `?subject=${encodeURIComponent(`Islamic Timeline: suggested record, ${name || "(unnamed)"}`)}` +
    `&body=${encodeURIComponent(body)}`;

  const ok = name.trim().length > 1;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label="Suggest a record"
    >
      <div
        className="absolute inset-0"
        style={{
          background: "color-mix(in srgb, var(--bg) 72%, transparent)",
          backdropFilter: "blur(3px)",
        }}
        onClick={() => setOpen(false)}
      />
      <div className="panel nice-scroll relative max-h-[92vh] w-full max-w-[520px] overflow-y-auto px-5 py-4 sm:px-6 sm:py-5">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <h2
              className="font-display text-[20px] font-semibold"
              style={{ color: "var(--ink)" }}
            >
              Suggest a record
            </h2>
            <p className="text-[12px]" style={{ color: "var(--ink-faint)" }}>
              Missing a scholar, book, battle, or event? Propose it. It opens a
              tracked issue on the project.
            </p>
          </div>
          <button
            className="btn"
            onClick={() => setOpen(false)}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="space-y-2.5">
          <Field label="Name">
            <input
              className="itl-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Fāṭima al-Fihrī, al-Muwaṭṭaʾ, Battle of Nahāwand"
              autoFocus
            />
          </Field>
          <div className="grid grid-cols-2 gap-2.5">
            <Field label="Kind">
              <select
                className="itl-input"
                value={kind}
                onChange={(e) => setKind(e.target.value)}
              >
                {KINDS.map((k) => (
                  <option key={k} value={k}>
                    {k}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Approx. dates">
              <input
                className="itl-input"
                value={dates}
                onChange={(e) => setDates(e.target.value)}
                placeholder="e.g. 780–855 CE / 164–241 AH"
              />
            </Field>
          </div>
          <Field label="Region (optional)">
            <input
              className="itl-input"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              placeholder="e.g. al-Andalus, Khurasan, West Africa"
            />
          </Field>
          <Field label="Why it belongs">
            <textarea
              className="itl-input"
              rows={2}
              value={why}
              onChange={(e) => setWhy(e.target.value)}
              placeholder="A sentence on its significance."
            />
          </Field>
          <Field label="Sources">
            <textarea
              className="itl-input"
              rows={2}
              value={sources}
              onChange={(e) => setSources(e.target.value)}
              placeholder="Reputable references (encyclopedias, academic works, primary sources)."
            />
          </Field>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-end gap-2">
          <a
            className="btn"
            href={mailUrl}
            style={ok ? undefined : { opacity: 0.5, pointerEvents: "none" }}
          >
            ✉ Email instead
          </a>
          <a
            className="btn"
            href={ok ? issueUrl : undefined}
            target="_blank"
            rel="noreferrer"
            onClick={() => ok && setOpen(false)}
            style={{
              borderColor: "var(--gold)",
              color: "var(--gold)",
              fontWeight: 600,
              ...(ok ? {} : { opacity: 0.5, pointerEvents: "none" }),
            }}
          >
            Open a suggestion →
          </a>
        </div>
        <p className="mt-2 text-[10.5px]" style={{ color: "var(--ink-faint)" }}>
          Records are added by hand after review, with citations. Thank you for
          helping the timeline grow.
        </p>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span
        className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.12em]"
        style={{ color: "var(--ink-faint)" }}
      >
        {label}
      </span>
      {children}
    </label>
  );
}

/** Shared with the record panel's "Report a problem" link. */
export { EMAIL, REPO };

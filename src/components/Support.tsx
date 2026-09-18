"use client";

/**
 * Support card: a quiet, dismissible ask. Appears once automatically after
 * the visitor has explored for a while (localStorage-gated), and anytime via
 * the "♥ Support" header button. No tracking, no nagging.
 */

import { useEffect, useState } from "react";
import { SUPPORT } from "@/lib/support";
import { useApp } from "@/lib/store";

const DISMISS_KEY = "itl-support-dismissed";

export default function SupportCard() {
  const open = useApp((s) => s.supportOpen);
  const setOpen = useApp((s) => s.setSupportOpen);
  const onboardStep = useApp((s) => s.onboardStep);
  const [autoShown, setAutoShown] = useState(false);

  // one-time auto show, only after onboarding is out of the way
  useEffect(() => {
    if (!SUPPORT.enabled || onboardStep >= 0) return;
    let dismissed = false;
    try {
      dismissed = !!localStorage.getItem(DISMISS_KEY);
    } catch {}
    if (dismissed) return;
    const t = setTimeout(() => setAutoShown(true), SUPPORT.autoShowAfterMs);
    return () => clearTimeout(t);
  }, [onboardStep]);

  if (!SUPPORT.enabled || (!open && !autoShown)) return null;

  const dismiss = () => {
    try {
      localStorage.setItem(DISMISS_KEY, "1");
    } catch {}
    setAutoShown(false);
    setOpen(false);
  };

  return (
    <div
      className="panel fade-up fixed bottom-4 right-3 z-50 w-[min(94vw,330px)] px-4 py-3.5 sm:right-12"
      role="dialog"
      aria-label="Support this project"
      data-testid="support-card"
    >
      <div className="flex items-start justify-between gap-2">
        <h2
          className="font-display text-[17px] font-semibold leading-snug"
          style={{ color: "var(--ink)" }}
        >
          Keep this instrument free
        </h2>
        <button
          className="btn"
          onClick={dismiss}
          aria-label="Dismiss support card"
          style={{ padding: "2px 8px" }}
        >
          ✕
        </button>
      </div>
      <p
        className="mt-1 text-[12.5px] leading-relaxed"
        style={{ color: "var(--ink-soft)" }}
      >
        The Islamic Timeline is free, open, and ad-free. If it benefits you, you
        can support {SUPPORT.name}&apos;s work, every bit helps keep it that
        way.
      </p>
      <div className="mt-3 flex flex-col gap-1.5">
        <a
          className="btn justify-center"
          style={{
            borderColor: "var(--gold)",
            color: "var(--gold)",
            fontWeight: 600,
          }}
          href={SUPPORT.cashApp.url}
          target="_blank"
          rel="noreferrer"
          onClick={dismiss}
        >
          Cash App · {SUPPORT.cashApp.tag}
        </a>
        <a
          className="btn justify-center"
          href={SUPPORT.linkHub}
          target="_blank"
          rel="noreferrer"
          onClick={dismiss}
        >
          All links · Patreon, PayPal & more
        </a>
      </div>
      <button
        className="mt-2 w-full text-center text-[11px] underline decoration-dotted underline-offset-2"
        style={{ color: "var(--ink-faint)" }}
        onClick={dismiss}
      >
        Not now, don&apos;t show this again
      </button>
    </div>
  );
}

/**
 * Contextual observations, generated from structured dates, never hardcoded.
 * As the viewport passes through a year, we surface one quiet, factual line
 * such as: "Imam al-Bukhārī died roughly 393 years before Ibn Taymiyya was born."
 */

import {
  getAllRecords,
  getSpan,
  statesActiveIn,
  peopleAliveIn,
  NOW_YEAR,
} from "./data";
import { describePair } from "./overlap";
import type { TimelineRecord } from "./types";

export interface Observation {
  text: string;
  /** record ids involved, for making the line clickable */
  ids: string[];
}

function famousPeople(): TimelineRecord[] {
  // undated records (earliest prophets) are excluded from computed intervals
  return getAllRecords().filter(
    (r) =>
      r.kind === "person" &&
      r.importance >= 4 &&
      r.start.precision !== "unknown",
  );
}

/** Deterministic pick so the line is stable while the user dwells in a period. */
function pick<T>(arr: T[], seed: number): T | undefined {
  if (arr.length === 0) return undefined;
  return arr[Math.abs(seed) % arr.length];
}

/**
 * Gap observation: two famous people whose death→birth gap brackets `year`.
 */
function gapObservation(year: number, seed: number): Observation | null {
  const people = famousPeople();
  const pairs: { a: TimelineRecord; b: TimelineRecord; gap: number }[] = [];
  for (const a of people) {
    const sa = getSpan(a);
    if (sa.end >= year) continue;
    for (const b of people) {
      const sb = getSpan(b);
      if (sb.start <= year) continue;
      const gap = sb.start - sa.end;
      if (gap > 0 && gap < 700) pairs.push({ a, b, gap });
    }
  }
  if (pairs.length === 0) return null;
  // prefer tighter brackets around the year, then bigger names
  pairs.sort(
    (p, q) =>
      p.gap - q.gap ||
      q.a.importance + q.b.importance - (p.a.importance + p.b.importance),
  );
  const top = pairs.slice(0, 6);
  const chosen = pick(top, seed)!;
  return {
    text: describePair(chosen.a, chosen.b, NOW_YEAR),
    ids: [chosen.a.id, chosen.b.id],
  };
}

/** Simultaneity of states: "In 1300, the Mamluks ruled from Cairo while the Ilkhans held Tabriz." */
function statesObservation(year: number, seed: number): Observation | null {
  const states = statesActiveIn(year).filter((s) => s.importance >= 3);
  if (states.length < 2) return null;
  const a = states[0];
  const rest = states.slice(1);
  const b = pick(rest, seed);
  if (!b) return null;
  const capA = a.location?.name ?? a.region;
  const capB = b.location?.name ?? b.region;
  const art = (n: string) => (/^(The|al-|Ṭ)/.test(n) ? n : `the ${n}`);
  return {
    text: `In ${year}, ${art(a.name)} ruled from ${capA} while ${art(b.name)} held ${capB}.`,
    ids: [a.id, b.id],
  };
}

/** Who was alive: "Alive in 1270: al-Nawawī, Rūmī, Ibn al-Nafīs…" */
function aliveObservation(year: number): Observation | null {
  const people = peopleAliveIn(year, 4).slice(0, 4);
  if (people.length < 2) return null;
  return {
    text: `Alive in ${year}: ${people.map((p) => p.name).join(" · ")}`,
    ids: people.map((p) => p.id),
  };
}

/** Overlap observation between two famous contemporaries. */
function overlapObservation(year: number, seed: number): Observation | null {
  const people = famousPeople().filter((p) => {
    const s = getSpan(p);
    return s.start <= year && year <= s.end;
  });
  if (people.length < 2) return null;
  const a = people[0];
  const b = pick(people.slice(1), seed);
  if (!b) return null;
  return { text: describePair(a, b, NOW_YEAR), ids: [a.id, b.id] };
}

/**
 * The observation for a given viewport year. Rotates deterministically with
 * the 25-year bucket so it changes as you travel, not as you twitch.
 */
export function observationFor(year: number): Observation | null {
  if (Math.round(year) > NOW_YEAR) return null;
  const seed = Math.floor(Math.round(year) / 25);
  // Quantize to the bucket midpoint so the observation is stable while the
  // user dwells inside a 25-year window.
  const y = Math.min(seed * 25 + 12, NOW_YEAR);
  const kind = Math.abs(seed) % 4;
  const generators =
    kind === 0
      ? [
          gapObservation,
          statesObservation,
          aliveObservation,
          overlapObservation,
        ]
      : kind === 1
        ? [
            statesObservation,
            overlapObservation,
            gapObservation,
            aliveObservation,
          ]
        : kind === 2
          ? [
              aliveObservation,
              gapObservation,
              statesObservation,
              overlapObservation,
            ]
          : [
              overlapObservation,
              aliveObservation,
              gapObservation,
              statesObservation,
            ];
  for (const g of generators) {
    const o = g(y, seed);
    if (o) return o;
  }
  return null;
}

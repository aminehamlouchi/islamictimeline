/**
 * Time to pixel mapping for the vertical timeline.
 *
 * Orientation: TODAY is at the top; y grows downward as years decrease.
 * The scale is ONE uniform pixels-per-year ruler from today all the way back
 * to LINEAR_FLOOR, so the spatial distance between any two dated events is
 * honest across the whole span, before Islam included (Ibrahim to Musa to Isa
 * read at true scale).
 *
 * Below LINEAR_FLOOR sits a single short ordinal cap for the earliest prophets
 * whose dates are unknown (Adam, Idris, Nuh, Hud, Salih). Positions there are
 * layout slots, not dates; the cap is fixed-height, clearly labeled "not to
 * scale", and the UI never shows a year inside it.
 */

export const LINEAR_FLOOR = -3300; // uniform, honest scale from today back to here (covers ancient dated history)
export const ORDINAL_TOP = LINEAR_FLOOR;
export const ORDINAL_BOTTOM = -4400;
export const ORDINAL_PX = 320; // fixed pixel height of the undated cap (earliest prophets)

/** Back-compat aliases used by a few components/tests. */
export const COMPRESS_START = LINEAR_FLOOR;
export const COMPRESS_PX = ORDINAL_PX;
export const DOMAIN_BOTTOM = ORDINAL_BOTTOM;

export interface Band {
  from: number;
  to: number;
  px: number;
  dated: boolean;
  label: string;
}

/** The one compressed cap, exposed as an array for the canvas renderer. */
export const BANDS: Band[] = [
  {
    from: ORDINAL_TOP,
    to: ORDINAL_BOTTOM,
    px: ORDINAL_PX,
    dated: false,
    label:
      "earliest prophets, order per tradition, dating unknown, not to scale",
  },
];

export interface ZoomLevel {
  id: string;
  label: string;
  ppy: number; // pixels per year
}

export const ZOOM_LEVELS: ZoomLevel[] = [
  { id: "millennium", label: "Millennium", ppy: 0.62 },
  { id: "century", label: "Century", ppy: 2.6 },
  { id: "decade", label: "Decade", ppy: 11 },
  { id: "year", label: "Year", ppy: 46 },
  { id: "detail", label: "Detail", ppy: 190 },
];

export const MIN_PPY = 0.34;
export const MAX_PPY = 380;

export function zoomLevelFor(ppy: number): ZoomLevel {
  let best = ZOOM_LEVELS[0];
  let bestDist = Infinity;
  for (const z of ZOOM_LEVELS) {
    const d = Math.abs(Math.log(ppy) - Math.log(z.ppy));
    if (d < bestDist) {
      bestDist = d;
      best = z;
    }
  }
  return best;
}

/** Which band a year falls in (null = the honest linear zone). */
export function bandOf(year: number): Band | null {
  if (year >= LINEAR_FLOOR) return null;
  return BANDS[0];
}

export class TimeScale {
  constructor(
    public ppy: number,
    public topYear: number,
  ) {}

  /** Absolute y (px) for a year; y=0 at `topYear`, increasing downward into the past. */
  yOf(year: number): number {
    if (year >= LINEAR_FLOOR) return (this.topYear - year) * this.ppy;
    const yFloor = (this.topYear - LINEAR_FLOOR) * this.ppy;
    const clamped = Math.max(year, ORDINAL_BOTTOM);
    const frac = (LINEAR_FLOOR - clamped) / (LINEAR_FLOOR - ORDINAL_BOTTOM);
    return yFloor + frac * ORDINAL_PX;
  }

  /** Inverse of yOf. */
  yearOf(y: number): number {
    const yFloor = (this.topYear - LINEAR_FLOOR) * this.ppy;
    if (y <= yFloor) return this.topYear - y / this.ppy;
    const frac = Math.min((y - yFloor) / ORDINAL_PX, 1);
    return LINEAR_FLOOR - frac * (LINEAR_FLOOR - ORDINAL_BOTTOM);
  }

  totalHeight(): number {
    return this.yOf(ORDINAL_BOTTOM);
  }

  isCompressed(year: number): boolean {
    return year < LINEAR_FLOOR;
  }
}

export interface Tick {
  year: number;
  major: boolean;
  label?: string;
}

const STEPS = [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000];

/** CE/BCE ticks between two years (yearHigh > yearLow), adaptive to zoom. */
export function ceTicks(
  ppy: number,
  yearLow: number,
  yearHigh: number,
): Tick[] {
  let step = STEPS[STEPS.length - 1];
  for (const s of STEPS) {
    if (s * ppy >= 64) {
      step = s;
      break;
    }
  }
  const minor = step >= 10 && (step / 5) * ppy >= 12 ? step / 5 : null;
  const ticks: Tick[] = [];
  const lo = Math.max(Math.floor(yearLow), LINEAR_FLOOR); // no numeric ticks in the ordinal cap
  const hi = Math.ceil(yearHigh);
  const gran = minor ?? step;
  const start = Math.ceil(lo / gran) * gran;
  for (let y = start; y <= hi; y += gran) {
    const major = y % step === 0;
    const label = major
      ? y < 0
        ? `${-y} BCE`
        : y === 0
          ? "1 CE"
          : `${y}`
      : undefined;
    ticks.push({ year: y, major, label });
  }
  return ticks;
}

export function clampPpy(ppy: number): number {
  return Math.min(MAX_PPY, Math.max(MIN_PPY, ppy));
}

export function clampCenterYear(year: number, topYear: number): number {
  return Math.min(topYear, Math.max(ORDINAL_BOTTOM, year));
}

/**
 * Given a zoom action around an anchor (a fixed on-screen year), return the new
 * center year that keeps `anchorYear` at the same screen offset (linear zone).
 */
export function zoomAroundYear(
  centerYear: number,
  ppyOld: number,
  ppyNew: number,
  anchorYear: number,
): number {
  const offset = (centerYear - anchorYear) * ppyOld;
  return anchorYear + offset / ppyNew;
}

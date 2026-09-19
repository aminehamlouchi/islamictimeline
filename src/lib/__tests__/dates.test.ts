import { describe, expect, it } from "vitest";
import {
  ahYearOf,
  ceYearForHijriYearStart,
  formatAHPart,
  formatCEPart,
  formatCESpan,
  formatSpanDual,
  gregorianToJdn,
  hijriYearForCE,
  islamicToJdn,
  jdnToGregorian,
  jdnToIslamic,
  todayHijri,
} from "../dates";

describe("Julian Day conversions", () => {
  it("computes the Islamic epoch correctly (1 Muharram 1 AH = 19 July 622 CE Gregorian)", () => {
    expect(gregorianToJdn(622, 7, 19)).toBe(1948440);
    expect(islamicToJdn(1, 1, 1)).toBe(1948440);
    const g = jdnToGregorian(islamicToJdn(1, 1, 1));
    expect(g).toEqual({ year: 622, month: 7, day: 19 });
  });

  it("round-trips Gregorian dates", () => {
    for (const [y, m, d] of [
      [622, 7, 19],
      [1258, 2, 10],
      [1453, 5, 29],
      [2026, 7, 3],
      [800, 12, 25],
    ] as const) {
      expect(jdnToGregorian(gregorianToJdn(y, m, d))).toEqual({
        year: y,
        month: m,
        day: d,
      });
    }
  });

  it("round-trips Islamic dates", () => {
    for (const [y, m, d] of [
      [1, 1, 1],
      [656, 4, 10],
      [857, 5, 20],
      [1447, 1, 1],
      [1000, 12, 29],
    ] as const) {
      expect(jdnToIslamic(islamicToJdn(y, m, d))).toEqual({
        year: y,
        month: m,
        day: d,
      });
    }
  });

  it("matches attested AH↔CE year pairs within tabular tolerance (±1 year)", () => {
    // [AH, CE] pairs attested in standard references
    const pairs: [number, number][] = [
      [1, 622], // Hijra
      [2, 624], // Badr
      [11, 632],
      [145, 762], // founding of Baghdad
      [656, 1258], // sack of Baghdad
      [698, 1299], // al-Wasitiyya (698 AH began Oct 1298)
      [857, 1453], // Constantinople
      [1342, 1924], // abolition of the caliphate
    ];
    for (const [ah, ce] of pairs) {
      expect(Math.abs(ceYearForHijriYearStart(ah) - ce)).toBeLessThanOrEqual(1);
      const calc = hijriYearForCE(ce);
      expect(calc).not.toBeNull();
      expect(Math.abs((calc as number) - ah)).toBeLessThanOrEqual(1);
    }
  });

  it("1 Muharram 1445 AH = 19 July 2023 (tabular civil)", () => {
    expect(jdnToGregorian(islamicToJdn(1445, 1, 1))).toEqual({
      year: 2023,
      month: 7,
      day: 19,
    });
  });

  it("gives no calculated Hijri year before the Hijra", () => {
    expect(hijriYearForCE(570)).toBeNull();
    expect(hijriYearForCE(621)).toBeNull();
    expect(hijriYearForCE(623)).toBeGreaterThanOrEqual(1);
  });

  it("todayHijri returns a plausible current Hijri date", () => {
    const h = todayHijri(new Date(2026, 6, 3)); // 3 July 2026
    expect(h.year).toBeGreaterThanOrEqual(1447);
    expect(h.year).toBeLessThanOrEqual(1448);
    expect(h.month).toBeGreaterThanOrEqual(1);
    expect(h.month).toBeLessThanOrEqual(12);
  });
});

describe("formatting honors precision and Hijri policy", () => {
  it("labels attested vs calculated Hijri years differently", () => {
    expect(
      formatAHPart({
        year: 870,
        precision: "year",
        hijri: { year: 256, source: "attested" },
      }),
    ).toBe("256 AH");
    expect(formatAHPart({ year: 870, precision: "year" })).toMatch(
      /^≈ \d+ AH \(calc\.\)$/,
    );
    expect(formatAHPart({ year: 570, precision: "circa" })).toBeNull();
  });

  it("formats circa/disputed/range CE parts", () => {
    expect(formatCEPart({ year: 570, precision: "circa" })).toBe("c. 570");
    expect(formatCEPart({ year: 636, precision: "disputed" })).toBe("636?");
    expect(formatCEPart({ year: 832, precision: "range", endYear: 848 })).toBe(
      "832–848",
    );
  });

  it("builds dual spans", () => {
    const s = formatSpanDual(
      {
        year: 1263,
        precision: "exact",
        month: 1,
        day: 22,
        hijri: { year: 661, source: "attested" },
      },
      {
        year: 1328,
        precision: "exact",
        month: 9,
        day: 26,
        hijri: { year: 728, source: "attested" },
      },
    );
    expect(s).toContain("1263");
    expect(s).toContain("1328");
    expect(s).toContain("661 – 728 AH");
    expect(s).not.toContain("calc");
  });

  it("ahYearOf prefers attested values", () => {
    expect(
      ahYearOf({
        year: 1258,
        precision: "year",
        hijri: { year: 656, source: "attested" },
      }),
    ).toBe(656);
  });
});

describe("the era word sits only after a Common Era year", () => {
  const d = (year: number, precision: "exact" | "year" | "circa" = "year") =>
    ({ year, precision }) as unknown as Parameters<typeof formatCESpan>[0];
  it("never writes CE after BCE", () => {
    expect(formatCESpan(d(-551), d(-479))).toBe("551 BCE – 479 BCE");
    expect(formatCESpan(d(-3200, "circa"))).toBe("c. 3200 BCE");
    expect(formatSpanDual(d(-551), d(-479))).not.toMatch(/BCE CE/);
  });
  it("crosses the era boundary in one span", () => {
    expect(formatCESpan(d(-27), d(476))).toBe("27 BCE – 476 CE");
  });
  it("treats present as a word, not a year", () => {
    expect(formatCESpan(d(1935, "circa"), undefined, true)).toBe("c. 1935 CE – present");
    expect(formatCESpan(d(-2560, "circa"), undefined, true)).toBe("c. 2560 BCE – present");
  });
});

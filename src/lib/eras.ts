import type { Era } from "./types";

/**
 * Broad orientation bands rendered behind the timeline.
 * These are editorial labels for navigation, not political claims.
 * Many states overlapped across these bands (see the parallel lanes).
 */
export const ERAS: Era[] = [
  {
    id: "earliest-prophets",
    label: "Earliest prophets عليهم السلام, undated",
    arabic: "الأنبياء الأوائل عليهم السلام",
    startYear: -3600,
    endYear: -2400,
    tint: "era-x",
  },
  {
    id: "traditional-prophets",
    label: "Era of the prophets, traditional dating",
    arabic: "عصر الأنبياء عليهم السلام",
    startYear: -2400,
    endYear: -100,
    tint: "era-y",
  },
  {
    id: "isa-fatra",
    label: "ʿĪsā عليه السلام & the fatra",
    arabic: "عيسى عليه السلام وزمن الفترة",
    startYear: -100,
    endYear: 570,
    tint: "era-a",
  },
  {
    id: "prophetic",
    label: "Prophetic era",
    arabic: "العهد النبوي",
    startYear: 570,
    endYear: 632,
    tint: "era-b",
  },
  {
    id: "rashidun",
    label: "Rashidun era",
    arabic: "عهد الخلفاء الراشدين",
    startYear: 632,
    endYear: 661,
    tint: "era-c",
  },
  {
    id: "umayyad",
    label: "Umayyad era",
    arabic: "العصر الأموي",
    startYear: 661,
    endYear: 750,
    tint: "era-d",
  },
  {
    id: "abbasid",
    label: "Abbasid era",
    arabic: "العصر العباسي",
    startYear: 750,
    endYear: 1258,
    tint: "era-e",
  },
  {
    id: "sultanates",
    label: "Mamluks & successor states",
    arabic: "عصر المماليك والدول المتعاقبة",
    startYear: 1258,
    endYear: 1517,
    tint: "era-f",
  },
  {
    id: "gunpowder",
    label: "Ottoman–Safavid–Mughal age",
    arabic: "عصر الإمبراطوريات الثلاث",
    startYear: 1517,
    endYear: 1798,
    tint: "era-g",
  },
  {
    id: "reform",
    label: "Reform & colonial era",
    arabic: "عصر الإصلاح والاستعمار",
    startYear: 1798,
    endYear: 1924,
    tint: "era-h",
  },
  {
    id: "contemporary",
    label: "Contemporary era",
    arabic: "العصر الحديث",
    startYear: 1924,
    endYear: 2100,
    tint: "era-i",
  },
];

export function eraForYear(year: number): Era {
  for (const e of ERAS) if (year >= e.startYear && year < e.endYear) return e;
  // Off the ends: the undated cap below the first era belongs with the first
  // era, and anything past today belongs with the last. Falling through to the
  // last era for every year put the earliest prophets in the contemporary era.
  return year < ERAS[0].startYear ? ERAS[0] : ERAS[ERAS.length - 1];
}

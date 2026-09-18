/**
 * SCHEMATIC state extents, deliberately approximate.
 *
 * These are NOT historical borders. Each entry is a set of soft ellipses
 * marking the core regions a state is generally agreed to have controlled
 * during the given window (per standard reference atlases). The map renders
 * them dashed and translucent, labeled "approximate". Precise, sourced
 * boundary polygons can replace them later via the same interface.
 *
 * General reference: Hugh Kennedy (ed.), An Historical Atlas of Islam, 2nd ed.
 * (Brill, 2002); C.E. Bosworth, The New Islamic Dynasties (1996).
 */
import type { StateExtent } from "@/lib/types";

export const stateExtents: StateExtent[] = [
  /* Rashidun */
  {
    stateId: "rashidun-caliphate",
    fromYear: 632,
    toYear: 640,
    blobs: [{ lat: 24, lng: 42, rLng: 8, rLat: 7, label: "Arabia" }],
  },
  {
    stateId: "rashidun-caliphate",
    fromYear: 640,
    toYear: 661,
    blobs: [
      { lat: 24, lng: 42, rLng: 8.5, rLat: 7.5, label: "Arabia" },
      { lat: 33.5, lng: 38, rLng: 5.5, rLat: 3.8, label: "Syria" },
      { lat: 32.5, lng: 44.5, rLng: 4.5, rLat: 3.6, label: "Iraq" },
      { lat: 29, lng: 30.5, rLng: 4.2, rLat: 4.2, label: "Egypt" },
      { lat: 32.5, lng: 52, rLng: 7, rLat: 5, label: "Iran (from 642)" },
    ],
  },
  /* Umayyads */
  {
    stateId: "umayyad-caliphate",
    fromYear: 661,
    toYear: 711,
    blobs: [
      { lat: 33.5, lng: 38, rLng: 6, rLat: 4, label: "Syria (center)" },
      { lat: 24, lng: 42, rLng: 8.5, rLat: 7.5 },
      { lat: 32.5, lng: 46, rLng: 6, rLat: 4.2 },
      { lat: 29, lng: 30.5, rLng: 4.5, rLat: 4.5 },
      { lat: 33, lng: 57, rLng: 9, rLat: 6, label: "Iran & Khurasan" },
      { lat: 33, lng: 6, rLng: 10, rLat: 3.5, label: "Ifrīqiya & Maghrib" },
    ],
  },
  {
    stateId: "umayyad-caliphate",
    fromYear: 711,
    toYear: 750,
    blobs: [
      { lat: 33.5, lng: 38, rLng: 6, rLat: 4, label: "Syria (center)" },
      { lat: 24, lng: 42, rLng: 8.5, rLat: 7.5 },
      { lat: 33, lng: 52, rLng: 12, rLat: 6.5, label: "Iraq–Iran–Khurasan" },
      { lat: 29, lng: 30.5, rLng: 4.5, rLat: 4.5 },
      { lat: 33, lng: 3, rLng: 12, rLat: 3.5, label: "Maghrib" },
      { lat: 38.5, lng: -4.5, rLng: 5.5, rLat: 3.5, label: "al-Andalus" },
      { lat: 39, lng: 66, rLng: 5, rLat: 3.5, label: "Transoxiana" },
      { lat: 26.5, lng: 68.5, rLng: 3, rLat: 3, label: "Sind" },
    ],
  },
  /* Abbasids */
  {
    stateId: "abbasid-caliphate",
    fromYear: 750,
    toYear: 870,
    blobs: [
      { lat: 33, lng: 44, rLng: 6.5, rLat: 4.5, label: "Iraq (center)" },
      { lat: 33.5, lng: 38, rLng: 5, rLat: 3.6 },
      { lat: 24, lng: 42, rLng: 8, rLat: 7 },
      { lat: 29, lng: 30.5, rLng: 4.5, rLat: 4.5 },
      { lat: 33, lng: 55, rLng: 11, rLat: 6.5, label: "Iran & Khurasan" },
      { lat: 39.5, lng: 66, rLng: 5.5, rLat: 3.5 },
    ],
  },
  {
    stateId: "abbasid-caliphate",
    fromYear: 870,
    toYear: 1055,
    blobs: [
      {
        lat: 33,
        lng: 44,
        rLng: 6,
        rLat: 4.2,
        label: "Iraq (direct rule shrinking)",
      },
      {
        lat: 33.5,
        lng: 39,
        rLng: 4.5,
        rLat: 3.2,
        label: "Jazīra & Syria (fluctuating)",
      },
    ],
  },
  {
    stateId: "abbasid-caliphate",
    fromYear: 1055,
    toYear: 1258,
    blobs: [
      { lat: 33, lng: 44, rLng: 5, rLat: 3.8, label: "Iraq (caliphal domain)" },
    ],
  },
  /* al-Andalus */
  {
    stateId: "cordoba-umayyads",
    fromYear: 756,
    toYear: 1031,
    blobs: [
      { lat: 38.2, lng: -4.5, rLng: 5.8, rLat: 3.6, label: "al-Andalus" },
    ],
  },
  {
    stateId: "taifa-kingdoms",
    fromYear: 1031,
    toYear: 1091,
    blobs: [
      { lat: 38, lng: -4.3, rLng: 5.2, rLat: 3.2, label: "ṭāʾifa states" },
    ],
  },
  {
    stateId: "almoravids",
    fromYear: 1060,
    toYear: 1147,
    blobs: [
      { lat: 31, lng: -6.5, rLng: 5.5, rLat: 4.5, label: "Maghrib al-Aqṣā" },
      {
        lat: 37.8,
        lng: -4.5,
        rLng: 5,
        rLat: 3,
        label: "al-Andalus (from 1090)",
      },
      { lat: 20, lng: -8, rLng: 6, rLat: 5, label: "Saharan reach" },
    ],
  },
  {
    stateId: "almohads",
    fromYear: 1147,
    toYear: 1230,
    blobs: [
      { lat: 31, lng: -6, rLng: 6, rLat: 4.5 },
      {
        lat: 34,
        lng: 3,
        rLng: 9,
        rLat: 3.5,
        label: "central Maghrib & Ifrīqiya",
      },
      {
        lat: 37.8,
        lng: -4.5,
        rLng: 5,
        rLat: 3,
        label: "al-Andalus (to 1212–28)",
      },
    ],
  },
  {
    stateId: "nasrids",
    fromYear: 1232,
    toYear: 1492,
    blobs: [{ lat: 37.0, lng: -3.7, rLng: 2.4, rLat: 1.5, label: "Granada" }],
  },
  {
    stateId: "marinids",
    fromYear: 1244,
    toYear: 1465,
    blobs: [{ lat: 32.5, lng: -6, rLng: 5.5, rLat: 4 }],
  },
  {
    stateId: "hafsids",
    fromYear: 1229,
    toYear: 1574,
    blobs: [{ lat: 35.5, lng: 9.5, rLng: 4.5, rLat: 3 }],
  },
  {
    stateId: "idrisids",
    fromYear: 788,
    toYear: 974,
    blobs: [{ lat: 33.5, lng: -5.5, rLng: 3.5, rLat: 2.5 }],
  },
  {
    stateId: "aghlabids",
    fromYear: 800,
    toYear: 909,
    blobs: [
      { lat: 35.2, lng: 9.8, rLng: 4.5, rLat: 3 },
      {
        lat: 37.4,
        lng: 14.2,
        rLng: 2.6,
        rLat: 1.6,
        label: "Sicily (from 827)",
      },
    ],
  },
  /* Egypt & Levant dynasties */
  {
    stateId: "tulunids",
    fromYear: 868,
    toYear: 905,
    blobs: [
      { lat: 28.5, lng: 30.8, rLng: 4.5, rLat: 5 },
      { lat: 33.8, lng: 37, rLng: 4, rLat: 3 },
    ],
  },
  {
    stateId: "fatimid-caliphate",
    fromYear: 909,
    toYear: 969,
    blobs: [{ lat: 34.5, lng: 7, rLng: 7, rLat: 3.5, label: "Ifrīqiya" }],
  },
  {
    stateId: "fatimid-caliphate",
    fromYear: 969,
    toYear: 1171,
    blobs: [
      { lat: 28.5, lng: 30.8, rLng: 4.8, rLat: 5.2, label: "Egypt (center)" },
      {
        lat: 33,
        lng: 36.5,
        rLng: 3.8,
        rLat: 3.2,
        label: "Palestine & Syria (fluctuating)",
      },
      { lat: 22, lng: 40, rLng: 4, rLat: 5, label: "Hijaz (suzerainty)" },
    ],
  },
  {
    stateId: "ayyubids",
    fromYear: 1171,
    toYear: 1250,
    blobs: [
      { lat: 28.5, lng: 30.8, rLng: 4.8, rLat: 5.2, label: "Egypt" },
      { lat: 34, lng: 37.5, rLng: 4.5, rLat: 3.8, label: "Syria" },
      { lat: 15.5, lng: 44.5, rLng: 3.5, rLat: 3.5, label: "Yemen" },
    ],
  },
  {
    stateId: "mamluk-sultanate",
    fromYear: 1250,
    toYear: 1517,
    blobs: [
      { lat: 28.5, lng: 30.8, rLng: 4.8, rLat: 5.2, label: "Egypt (center)" },
      { lat: 34, lng: 37.5, rLng: 4.5, rLat: 4, label: "Syria" },
      { lat: 22, lng: 40, rLng: 4, rLat: 5, label: "Hijaz (protectorate)" },
    ],
  },
  /* East: Iranian & Turkic dynasties */
  {
    stateId: "samanids",
    fromYear: 819,
    toYear: 999,
    blobs: [
      { lat: 39.5, lng: 66, rLng: 6, rLat: 4, label: "Transoxiana" },
      { lat: 35.5, lng: 60, rLng: 5.5, rLat: 3.5, label: "Khurasan" },
    ],
  },
  {
    stateId: "buyids",
    fromYear: 934,
    toYear: 1055,
    blobs: [
      { lat: 32, lng: 49, rLng: 7, rLat: 5, label: "Iran (west & south)" },
      { lat: 33, lng: 44.5, rLng: 3.5, rLat: 3, label: "Iraq (945–1055)" },
    ],
  },
  {
    stateId: "ghaznavids",
    fromYear: 977,
    toYear: 1040,
    blobs: [
      { lat: 34, lng: 66, rLng: 7, rLat: 4.5, label: "Afghanistan & Khurasan" },
      { lat: 31.5, lng: 73, rLng: 4.5, rLat: 3.5, label: "Punjab" },
    ],
  },
  {
    stateId: "ghaznavids",
    fromYear: 1040,
    toYear: 1186,
    blobs: [
      { lat: 33.5, lng: 68.5, rLng: 4.5, rLat: 3.5 },
      { lat: 31.5, lng: 73.5, rLng: 4.5, rLat: 3.5, label: "Punjab" },
    ],
  },
  {
    stateId: "qarakhanids",
    fromYear: 999,
    toYear: 1211,
    blobs: [
      { lat: 41.5, lng: 72, rLng: 8, rLat: 4, label: "Semirechye & Kashgaria" },
      {
        lat: 39.8,
        lng: 65.5,
        rLng: 4.5,
        rLat: 2.8,
        label: "Transoxiana (to 1089 indep.)",
      },
    ],
  },
  {
    stateId: "great-seljuks",
    fromYear: 1040,
    toYear: 1092,
    blobs: [
      { lat: 34, lng: 52, rLng: 12, rLat: 7, label: "Iran (center)" },
      { lat: 33, lng: 44, rLng: 4.5, rLat: 3.5, label: "Iraq (from 1055)" },
      { lat: 37, lng: 38, rLng: 6, rLat: 3.5, label: "Jazīra & Syria" },
      { lat: 39, lng: 63, rLng: 6, rLat: 4, label: "Khurasan & Merv" },
    ],
  },
  {
    stateId: "great-seljuks",
    fromYear: 1092,
    toYear: 1194,
    blobs: [
      { lat: 34, lng: 54, rLng: 10, rLat: 6, label: "Iran (fragmenting)" },
    ],
  },
  {
    stateId: "seljuks-of-rum",
    fromYear: 1077,
    toYear: 1308,
    blobs: [
      { lat: 38.7, lng: 33.5, rLng: 6.5, rLat: 3.2, label: "central Anatolia" },
    ],
  },
  {
    stateId: "ilkhanate",
    fromYear: 1256,
    toYear: 1335,
    blobs: [
      { lat: 34, lng: 50, rLng: 12, rLat: 7, label: "Iran (center)" },
      { lat: 33.5, lng: 43.5, rLng: 4.5, rLat: 3.5, label: "Iraq" },
      {
        lat: 39.5,
        lng: 44,
        rLng: 4.5,
        rLat: 3,
        label: "Azerbaijan & Anatolian marches",
      },
    ],
  },
  {
    stateId: "golden-horde",
    fromYear: 1242,
    toYear: 1450,
    blobs: [
      { lat: 48, lng: 45, rLng: 14, rLat: 6, label: "Qipchaq steppe" },
      { lat: 45, lng: 34, rLng: 3.5, rLat: 2, label: "Crimea" },
    ],
  },
  {
    stateId: "timurids",
    fromYear: 1370,
    toYear: 1450,
    blobs: [
      { lat: 39.5, lng: 66, rLng: 6.5, rLat: 4, label: "Transoxiana (center)" },
      { lat: 34.5, lng: 56, rLng: 10, rLat: 6, label: "Iran & Khurasan" },
    ],
  },
  {
    stateId: "timurids",
    fromYear: 1450,
    toYear: 1507,
    blobs: [
      { lat: 36.5, lng: 63, rLng: 7, rLat: 4.5, label: "Khurasan (Herat)" },
      { lat: 39.6, lng: 66.5, rLng: 4.5, rLat: 3, label: "Transoxiana" },
    ],
  },
  {
    stateId: "khanate-of-bukhara",
    fromYear: 1500,
    toYear: 1920,
    blobs: [
      { lat: 39.6, lng: 65.5, rLng: 5.5, rLat: 3.2, label: "Transoxiana" },
    ],
  },
  /* Ottomans */
  {
    stateId: "ottoman-empire",
    fromYear: 1299,
    toYear: 1360,
    blobs: [{ lat: 40.2, lng: 29.5, rLng: 2.6, rLat: 1.6, label: "Bithynia" }],
  },
  {
    stateId: "ottoman-empire",
    fromYear: 1360,
    toYear: 1453,
    blobs: [
      { lat: 40.5, lng: 29, rLng: 4.5, rLat: 2.6, label: "NW Anatolia" },
      { lat: 41.8, lng: 24.5, rLng: 5, rLat: 2.8, label: "Rumelia (Balkans)" },
    ],
  },
  {
    stateId: "ottoman-empire",
    fromYear: 1453,
    toYear: 1517,
    blobs: [
      { lat: 41, lng: 28.5, rLng: 3, rLat: 2, label: "Istanbul (center)" },
      { lat: 42, lng: 23.5, rLng: 6.5, rLat: 3.5, label: "Balkans" },
      { lat: 39.5, lng: 33, rLng: 7.5, rLat: 3.2, label: "Anatolia" },
    ],
  },
  {
    stateId: "ottoman-empire",
    fromYear: 1517,
    toYear: 1699,
    blobs: [
      { lat: 41, lng: 28.5, rLng: 3, rLat: 2, label: "Istanbul (center)" },
      { lat: 43.5, lng: 21.5, rLng: 8, rLat: 4.5, label: "Balkans & Hungary" },
      { lat: 39, lng: 34, rLng: 8.5, rLat: 3.5, label: "Anatolia" },
      { lat: 34, lng: 37.5, rLng: 4.5, rLat: 4, label: "Syria" },
      { lat: 28.5, lng: 30.8, rLng: 4.5, rLat: 5, label: "Egypt" },
      { lat: 33, lng: 43.5, rLng: 4.5, rLat: 3.5, label: "Iraq" },
      { lat: 22, lng: 40, rLng: 3.5, rLat: 5.5, label: "Hijaz" },
      {
        lat: 35.5,
        lng: 8,
        rLng: 8,
        rLat: 3,
        label: "Maghrib regencies (loose)",
      },
    ],
  },
  {
    stateId: "ottoman-empire",
    fromYear: 1699,
    toYear: 1830,
    blobs: [
      { lat: 41, lng: 28.5, rLng: 3, rLat: 2 },
      { lat: 42, lng: 23, rLng: 6.5, rLat: 3.5, label: "Balkans" },
      { lat: 39, lng: 34, rLng: 8.5, rLat: 3.5 },
      { lat: 34, lng: 37.5, rLng: 4.5, rLat: 4 },
      {
        lat: 28.5,
        lng: 30.8,
        rLng: 4.5,
        rLat: 5,
        label: "Egypt (autonomous from 1805)",
      },
      { lat: 33, lng: 43.5, rLng: 4.5, rLat: 3.5 },
    ],
  },
  {
    stateId: "ottoman-empire",
    fromYear: 1830,
    toYear: 1918,
    blobs: [
      { lat: 41, lng: 28.5, rLng: 3, rLat: 2 },
      { lat: 39, lng: 34, rLng: 8.5, rLat: 3.5, label: "Anatolia" },
      { lat: 34, lng: 37.5, rLng: 4.5, rLat: 4, label: "Syria" },
      { lat: 33, lng: 43.5, rLng: 4.5, rLat: 3.5, label: "Iraq" },
      { lat: 22, lng: 40, rLng: 3.5, rLat: 5.5, label: "Hijaz" },
    ],
  },
  /* Safavids & Mughals */
  {
    stateId: "safavid-empire",
    fromYear: 1501,
    toYear: 1736,
    blobs: [
      { lat: 33.5, lng: 52, rLng: 10.5, rLat: 6.5, label: "Iran (center)" },
      { lat: 38.5, lng: 46.5, rLng: 4.5, rLat: 2.8, label: "Azerbaijan" },
      { lat: 36, lng: 59.5, rLng: 5, rLat: 3.2, label: "Khurasan (contested)" },
    ],
  },
  {
    stateId: "mughal-empire",
    fromYear: 1526,
    toYear: 1556,
    blobs: [
      {
        lat: 28.5,
        lng: 77,
        rLng: 5.5,
        rLat: 3.5,
        label: "Hindustan (Delhi–Agra)",
      },
    ],
  },
  {
    stateId: "mughal-empire",
    fromYear: 1556,
    toYear: 1658,
    blobs: [
      { lat: 27.5, lng: 77.5, rLng: 7.5, rLat: 5, label: "Hindustan (center)" },
      {
        lat: 31.5,
        lng: 73,
        rLng: 5,
        rLat: 3.5,
        label: "Punjab & Kabul marches",
      },
      { lat: 23.5, lng: 72.5, rLng: 4, rLat: 3, label: "Gujarat" },
      { lat: 24.5, lng: 88, rLng: 4.5, rLat: 3, label: "Bengal" },
    ],
  },
  {
    stateId: "mughal-empire",
    fromYear: 1658,
    toYear: 1720,
    blobs: [
      {
        lat: 26,
        lng: 78,
        rLng: 9,
        rLat: 7,
        label: "Hindustan & Deccan (greatest extent)",
      },
      { lat: 31.5, lng: 73, rLng: 5, rLat: 3.5 },
      { lat: 24.5, lng: 88, rLng: 4.5, rLat: 3 },
    ],
  },
  {
    stateId: "mughal-empire",
    fromYear: 1720,
    toYear: 1857,
    blobs: [
      {
        lat: 28.6,
        lng: 77.2,
        rLng: 3,
        rLat: 2,
        label: "Delhi region (nominal)",
      },
    ],
  },
  /* Delhi Sultanate */
  {
    stateId: "delhi-sultanate",
    fromYear: 1206,
    toYear: 1290,
    blobs: [{ lat: 28.5, lng: 77.5, rLng: 5.5, rLat: 3.5, label: "Hindustan" }],
  },
  {
    stateId: "delhi-sultanate",
    fromYear: 1290,
    toYear: 1398,
    blobs: [
      {
        lat: 26.5,
        lng: 77.5,
        rLng: 7.5,
        rLat: 5.5,
        label: "Hindustan & Deccan raids",
      },
    ],
  },
  {
    stateId: "delhi-sultanate",
    fromYear: 1398,
    toYear: 1526,
    blobs: [
      { lat: 28.5, lng: 77.3, rLng: 4, rLat: 2.6, label: "Delhi region" },
    ],
  },
  /* Africa */
  {
    stateId: "mali-empire",
    fromYear: 1235,
    toYear: 1450,
    blobs: [
      { lat: 13.5, lng: -6, rLng: 8, rLat: 4, label: "upper Niger (center)" },
      { lat: 16.5, lng: -2.5, rLng: 3.5, rLat: 1.8, label: "Timbuktu & Gao" },
    ],
  },
  {
    stateId: "mali-empire",
    fromYear: 1450,
    toYear: 1600,
    blobs: [
      { lat: 12.5, lng: -8.5, rLng: 4.5, rLat: 2.6, label: "Mande heartland" },
    ],
  },
  {
    stateId: "songhai-empire",
    fromYear: 1464,
    toYear: 1591,
    blobs: [
      { lat: 16, lng: -1, rLng: 7.5, rLat: 3, label: "Niger bend (center)" },
      { lat: 14, lng: -8, rLng: 5, rLat: 2.5, label: "western reaches" },
    ],
  },
  {
    stateId: "kanem-bornu",
    fromYear: 1075,
    toYear: 1893,
    blobs: [
      { lat: 13.5, lng: 14.5, rLng: 4.5, rLat: 3, label: "Lake Chad basin" },
    ],
  },
  {
    stateId: "sokoto-caliphate",
    fromYear: 1804,
    toYear: 1903,
    blobs: [{ lat: 12, lng: 7, rLng: 6, rLat: 3.2, label: "Hausaland" }],
  },
  {
    stateId: "kilwa-sultanate",
    fromYear: 1000,
    toYear: 1513,
    blobs: [
      { lat: -8.5, lng: 39.8, rLng: 2, rLat: 3.5, label: "Swahili coast" },
    ],
  },
  {
    stateId: "adal-sultanate",
    fromYear: 1415,
    toYear: 1577,
    blobs: [
      { lat: 9.5, lng: 43.5, rLng: 4, rLat: 2.6, label: "Horn of Africa" },
    ],
  },
  /* Southeast Asia */
  {
    stateId: "samudera-pasai",
    fromYear: 1267,
    toYear: 1521,
    blobs: [
      { lat: 5.2, lng: 96.8, rLng: 2, rLat: 1.4, label: "north Sumatra" },
    ],
  },
  {
    stateId: "malacca-sultanate",
    fromYear: 1400,
    toYear: 1511,
    blobs: [
      { lat: 2.5, lng: 102, rLng: 2.6, rLat: 1.8, label: "straits emporium" },
    ],
  },
  {
    stateId: "aceh-sultanate",
    fromYear: 1496,
    toYear: 1903,
    blobs: [{ lat: 4.8, lng: 96, rLng: 2.6, rLat: 1.8 }],
  },
  {
    stateId: "demak-sultanate",
    fromYear: 1475,
    toYear: 1554,
    blobs: [
      {
        lat: -6.9,
        lng: 110.5,
        rLng: 2.6,
        rLat: 1.2,
        label: "north Java coast",
      },
    ],
  },
  /* Arabia modern */
  {
    stateId: "emirate-of-diriyah",
    fromYear: 1744,
    toYear: 1818,
    blobs: [
      { lat: 24.8, lng: 45.5, rLng: 4.5, rLat: 3.2, label: "Najd" },
      { lat: 22, lng: 40.2, rLng: 3, rLat: 4, label: "Hijaz (1803–13)" },
    ],
  },
  /* World-lane empires for context */
  {
    stateId: "byzantine-empire",
    fromYear: 570,
    toYear: 636,
    blobs: [
      { lat: 39.5, lng: 30, rLng: 8, rLat: 4, label: "Anatolia" },
      { lat: 34, lng: 37, rLng: 4.5, rLat: 4, label: "Syria (to 636)" },
      { lat: 29, lng: 30.5, rLng: 4.2, rLat: 4.2, label: "Egypt (to 641)" },
    ],
  },
  {
    stateId: "byzantine-empire",
    fromYear: 636,
    toYear: 1071,
    blobs: [
      { lat: 39.5, lng: 31, rLng: 8, rLat: 4, label: "Anatolia" },
      { lat: 41.5, lng: 24, rLng: 5.5, rLat: 3, label: "Balkans" },
    ],
  },
  {
    stateId: "byzantine-empire",
    fromYear: 1071,
    toYear: 1453,
    blobs: [
      { lat: 41, lng: 27.5, rLng: 4, rLat: 2.2, label: "shrinking core" },
    ],
  },
  {
    stateId: "sasanian-empire",
    fromYear: 570,
    toYear: 651,
    blobs: [
      { lat: 33, lng: 51, rLng: 11, rLat: 7, label: "Iran" },
      { lat: 33, lng: 44.5, rLng: 3.8, rLat: 3.2, label: "Mesopotamia" },
    ],
  },
  {
    stateId: "mongol-empire",
    fromYear: 1206,
    toYear: 1260,
    blobs: [
      { lat: 46, lng: 95, rLng: 18, rLat: 8, label: "Inner Asia (center)" },
      { lat: 42, lng: 65, rLng: 9, rLat: 5, label: "Khwārazm (from 1220)" },
    ],
  },
  {
    stateId: "tang-dynasty",
    fromYear: 618,
    toYear: 907,
    blobs: [{ lat: 34, lng: 109, rLng: 11, rLat: 8, label: "China (Tang)" }],
  },
  {
    stateId: "ming-dynasty",
    fromYear: 1368,
    toYear: 1644,
    blobs: [{ lat: 33, lng: 110, rLng: 10, rLat: 8, label: "China (Ming)" }],
  },
];

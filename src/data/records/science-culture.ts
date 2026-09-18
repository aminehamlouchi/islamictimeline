/**
 * Science, medicine, mathematics & technology; institutions, architecture,
 * literature, and trade.
 */
import type { TimelineRecord } from "@/lib/types";

const EI2 = (entry: string, author?: string) => ({
  source: "Encyclopaedia of Islam, 2nd ed. (Brill)",
  detail: `s.v. "${entry}"${author ? ` (${author})` : ""}`,
});
const SALIBA = {
  source:
    "George Saliba, Islamic Science and the Making of the European Renaissance (MIT, 2007)",
};
const MAKDISI = {
  source: "George Makdisi, The Rise of Colleges (Edinburgh UP, 1981)",
};

export const scienceCultureRecords: TimelineRecord[] = [
  /* ----------------------------- scientists ----------------------------- */
  {
    id: "al-khwarizmi",
    kind: "person",
    lane: "science",
    name: "al-Khwārizmī",
    arabic: "الخوارزمي",
    aliases: ["Algoritmi"],
    start: { year: 780, precision: "circa" },
    end: {
      year: 850,
      precision: "circa",
      note: "Both dates approximate; active under al-Maʾmūn.",
    },
    importance: 5,
    region: "iraq-iran",
    location: { name: "Baghdad", lat: 33.34, lng: 44.4 },
    summary:
      'Mathematician-astronomer of al-Maʾmūn\'s Baghdad whose books gave the world algebra and the Hindu-Arabic numerals, and whose Latinized name became "algorithm".',
    relations: [
      { type: "wrote", target: "kitab-al-jabr" },
      { type: "related", target: "bayt-al-hikma" },
    ],
    citations: [EI2("al-Khwārazmī", "J. Vernet"), SALIBA],
  },
  {
    id: "al-kindi",
    kind: "person",
    lane: "science",
    name: "al-Kindī",
    arabic: "الكندي",
    start: { year: 801, precision: "circa" },
    end: { year: 873, precision: "circa", note: "Death c. 252–260 AH." },
    importance: 3,
    region: "iraq-iran",
    location: { name: "Baghdad", lat: 33.34, lng: 44.4 },
    summary:
      '"The Philosopher of the Arabs": polymath of the translation movement who naturalized Greek philosophy in Arabic and wrote on everything from cryptanalysis to music.',
    relations: [{ type: "related", target: "translation-movement" }],
    citations: [EI2("al-Kindī", "J. Jolivet & R. Rashed")],
  },
  {
    id: "al-razi-physician",
    kind: "person",
    lane: "science",
    name: "Abū Bakr al-Rāzī (Rhazes)",
    arabic: "أبو بكر الرازي",
    aliases: ["Rhazes"],
    start: {
      year: 865,
      precision: "year",
      hijri: { year: 251, source: "attested" },
    },
    end: {
      year: 925,
      precision: "year",
      hijri: { year: 313, source: "attested" },
    },
    importance: 4,
    region: "iraq-iran",
    location: { name: "Rayy (Tehran)", lat: 35.59, lng: 51.43 },
    summary:
      "The greatest clinician of the medieval world: chief physician at Baghdad's hospital, first to distinguish smallpox from measles, author of the encyclopedic al-Ḥāwī.",
    citations: [EI2("al-Rāzī", "L.E. Goodman"), SALIBA],
  },
  {
    id: "al-farabi",
    kind: "person",
    lane: "science",
    name: "al-Fārābī",
    arabic: "الفارابي",
    start: { year: 872, precision: "circa" },
    end: {
      year: 950,
      precision: "year",
      hijri: { year: 339, source: "attested" },
    },
    importance: 4,
    region: "central-asia",
    location: {
      name: "Farab (Otrar)",
      lat: 42.85,
      lng: 68.3,
      approximate: true,
    },
    summary:
      '"The Second Teacher" after Aristotle: philosopher of logic, music, and the virtuous city whose system framed all later Islamic philosophy, including Ibn Sīnā\'s.',
    relations: [{ type: "influenced", target: "ibn-sina" }],
    citations: [EI2("al-Fārābī", "R. Walzer")],
  },
  {
    id: "al-zahrawi",
    kind: "person",
    lane: "science",
    name: "al-Zahrāwī (Abulcasis)",
    arabic: "الزهراوي",
    aliases: ["Abulcasis"],
    start: { year: 936, precision: "circa" },
    end: { year: 1013, precision: "circa" },
    importance: 3,
    region: "andalus-maghrib",
    location: { name: "Madīnat al-Zahrāʾ (Córdoba)", lat: 37.89, lng: -4.87 },
    summary:
      "Court physician of Umayyad Córdoba whose surgical encyclopedia al-Taṣrīf, with its illustrated instruments, taught surgery to both civilizations for centuries.",
    citations: [EI2("al-Zahrāwī"), SALIBA],
  },
  {
    id: "ibn-al-haytham",
    kind: "person",
    lane: "science",
    name: "Ibn al-Haytham (Alhazen)",
    arabic: "ابن الهيثم",
    aliases: ["Alhazen"],
    start: {
      year: 965,
      precision: "year",
      hijri: { year: 354, source: "attested" },
    },
    end: {
      year: 1040,
      precision: "circa",
      hijri: { year: 430, source: "attested" },
      note: "Died c. 430–432 AH in Cairo.",
    },
    importance: 5,
    region: "egypt-north-africa",
    location: { name: "Cairo", lat: 30.04, lng: 31.24 },
    places: [
      { name: "Basra (birth)", lat: 30.51, lng: 47.81 },
      { name: "Cairo (career)", lat: 30.04, lng: 31.24 },
    ],
    summary:
      "Physicist of light and vision whose insistence on experiment, famously while feigning madness under the Fatimid al-Ḥākim, marks him as a founder of the scientific method.",
    relations: [
      { type: "wrote", target: "kitab-al-manazir" },
      { type: "related", target: "fatimid-caliphate" },
    ],
    citations: [
      {
        source:
          "A.I. Sabra, The Optics of Ibn al-Haytham (Warburg Institute, 1989)",
      },
      EI2("Ibn al-Haytham"),
    ],
  },
  {
    id: "al-biruni",
    kind: "person",
    lane: "science",
    name: "al-Bīrūnī",
    arabic: "البيروني",
    start: {
      year: 973,
      precision: "year",
      hijri: { year: 362, source: "attested" },
    },
    end: {
      year: 1048,
      precision: "circa",
      hijri: { year: 440, source: "attested" },
      note: "Death 440 AH commonly cited; some give 442.",
    },
    importance: 4,
    region: "central-asia",
    location: { name: "Ghazni", lat: 33.55, lng: 68.42 },
    summary:
      "Perhaps the most original scientist of the age: measured the Earth's radius from a mountain in Punjab, compared calendars and cultures, and wrote the first great ethnography of India.",
    relations: [
      {
        type: "related",
        target: "ghaznavids",
        note: "attached to Maḥmūd's court",
      },
    ],
    citations: [EI2("al-Bīrūnī", "D.J. Boilot"), SALIBA],
  },
  {
    id: "ibn-sina",
    kind: "person",
    lane: "science",
    name: "Ibn Sīnā (Avicenna)",
    arabic: "ابن سينا",
    aliases: ["Avicenna"],
    start: {
      year: 980,
      precision: "year",
      hijri: { year: 370, source: "attested" },
    },
    end: {
      year: 1037,
      precision: "year",
      hijri: { year: 428, source: "attested" },
    },
    importance: 5,
    region: "central-asia",
    location: { name: "Bukhara", lat: 39.77, lng: 64.42 },
    places: [
      { name: "Bukhara (birth)", lat: 39.77, lng: 64.42 },
      { name: "Hamadan (death)", lat: 34.8, lng: 48.51 },
    ],
    summary:
      'Philosopher-physician who systematized both medicine (the Canon) and metaphysics (al-Shifāʾ); "Avicenna" dominated European universities as thoroughly as he did the madrasas\' philosophical curriculum.',
    relations: [
      { type: "wrote", target: "qanun-fi-al-tibb" },
      {
        type: "related",
        target: "samanids",
        note: "formed in Samanid Bukhara's libraries",
      },
      {
        type: "influenced",
        target: "al-ghazali",
        note: "al-Ghazālī wrote his critique against this school",
      },
    ],
    citations: [EI2("Ibn Sīnā", "A.-M. Goichon"), SALIBA],
  },
  {
    id: "omar-khayyam",
    kind: "person",
    lane: "science",
    name: "ʿUmar Khayyām",
    arabic: "عمر الخيام",
    start: {
      year: 1048,
      precision: "year",
      hijri: { year: 439, source: "attested" },
    },
    end: {
      year: 1131,
      precision: "year",
      hijri: { year: 526, source: "attested" },
    },
    importance: 3,
    region: "iraq-iran",
    location: { name: "Nishapur", lat: 36.21, lng: 58.8 },
    summary:
      "Mathematician of cubic equations and architect of the Seljuk calendar reform (1079), remembered in the West, through FitzGerald, for quatrains he may only partly have written.",
    relations: [
      {
        type: "related",
        target: "great-seljuks",
        note: "calendar reform under Malik-Shāh",
      },
    ],
    citations: [EI2("ʿUmar Khayyām"), SALIBA],
  },
  {
    id: "al-idrisi",
    kind: "person",
    lane: "science",
    name: "al-Idrīsī",
    arabic: "الإدريسي",
    start: { year: 1100, precision: "circa" },
    end: { year: 1165, precision: "circa" },
    importance: 3,
    region: "andalus-maghrib",
    location: { name: "Palermo", lat: 38.12, lng: 13.36 },
    summary:
      "Geographer at the Norman court of Sicily whose world map and Book of Roger (1154) were the most accurate of their century, a Muslim scholar mapping the world for a Christian king.",
    citations: [EI2("al-Idrīsī", "G. Oman")],
  },
  {
    id: "al-jazari",
    kind: "person",
    lane: "science",
    name: "al-Jazarī",
    arabic: "الجزري",
    start: { year: 1136, precision: "circa" },
    end: {
      year: 1206,
      precision: "circa",
      note: "Completed his book of machines in 602 AH / 1206 CE.",
    },
    importance: 3,
    region: "anatolia-balkans",
    location: { name: "Diyarbakır (Artuqid court)", lat: 37.91, lng: 40.24 },
    summary:
      "Engineer of the Artuqid court whose Book of Ingenious Mechanical Devices (1206), water clocks, automata, pumps with crankshafts, is the masterpiece of the Islamic mechanical tradition.",
    citations: [
      {
        source:
          "Donald R. Hill (tr.), The Book of Knowledge of Ingenious Mechanical Devices (Reidel, 1974)",
      },
    ],
  },
  {
    id: "nasir-al-din-al-tusi",
    kind: "person",
    lane: "science",
    name: "Naṣīr al-Dīn al-Ṭūsī",
    arabic: "نصير الدين الطوسي",
    start: {
      year: 1201,
      precision: "year",
      hijri: { year: 597, source: "attested" },
    },
    end: {
      year: 1274,
      precision: "year",
      hijri: { year: 672, source: "attested" },
    },
    importance: 4,
    region: "iraq-iran",
    location: { name: "Maragha", lat: 37.39, lng: 46.24 },
    summary:
      'Polymath who survived the Mongol storm to build the Maragha observatory under Hülegü; his "Ṭūsī couple" reappears in Copernicus, and his recension of Euclid taught geometry for centuries.',
    relations: [
      { type: "related", target: "maragha-observatory" },
      { type: "related", target: "ilkhanate" },
    ],
    citations: [SALIBA, EI2("al-Ṭūsī, Naṣīr al-Dīn")],
  },
  {
    id: "ibn-al-nafis",
    kind: "person",
    lane: "science",
    name: "Ibn al-Nafīs",
    arabic: "ابن النفيس",
    start: {
      year: 1210,
      precision: "circa",
      hijri: { year: 607, source: "attested" },
      note: "Born c. 607 AH / 1210–11 CE in Damascus.",
    },
    end: {
      year: 1288,
      precision: "year",
      hijri: { year: 687, source: "attested" },
    },
    importance: 4,
    region: "egypt-north-africa",
    location: { name: "Cairo", lat: 30.04, lng: 31.24 },
    summary:
      "Chief physician of Mamluk Egypt who, correcting Galen and Ibn Sīnā, first described the pulmonary circulation of the blood, three centuries before European anatomists.",
    relations: [{ type: "related", target: "mamluk-sultanate" }],
    citations: [EI2("Ibn al-Nafīs", "M. Meyerhof & J. Schacht"), SALIBA],
  },
  {
    id: "ibn-al-shatir",
    kind: "person",
    lane: "science",
    name: "Ibn al-Shāṭir",
    arabic: "ابن الشاطر",
    start: {
      year: 1304,
      precision: "year",
      hijri: { year: 704, source: "attested" },
    },
    end: {
      year: 1375,
      precision: "year",
      hijri: { year: 777, source: "attested" },
    },
    importance: 3,
    region: "levant",
    location: { name: "Damascus", lat: 33.51, lng: 36.29 },
    summary:
      "Timekeeper of the Umayyad Mosque whose planetary models are mathematically identical to those Copernicus used a century and a half later, the strongest case for a Damascus–Renaissance connection.",
    citations: [SALIBA],
  },
  /* ------------------------- poets & men of letters ---------------------- */
  {
    id: "ferdowsi",
    kind: "person",
    lane: "culture",
    name: "Firdawsī",
    arabic: "الفردوسي",
    start: { year: 940, precision: "circa" },
    end: { year: 1020, precision: "circa", note: "Death c. 411–416 AH." },
    importance: 4,
    region: "iraq-iran",
    location: { name: "Tus", lat: 36.49, lng: 59.51 },
    summary:
      "Poet of Tus whose Shāhnāma, sixty thousand couplets, thirty years' labor, preserved the pre-Islamic Persian epic within Islamic civilization and fixed the New Persian language.",
    relations: [{ type: "wrote", target: "shahnameh" }],
    citations: [EI2("Firdawsī", "Cl. Huart & H. Massé")],
  },
  {
    id: "rumi",
    kind: "person",
    lane: "culture",
    name: "Jalāl al-Dīn Rūmī",
    arabic: "جلال الدين الرومي",
    aliases: ["Mevlana", "Rumi"],
    start: {
      year: 1207,
      precision: "year",
      hijri: { year: 604, source: "attested" },
    },
    end: {
      year: 1273,
      precision: "year",
      hijri: { year: 672, source: "attested" },
    },
    importance: 4,
    region: "anatolia-balkans",
    location: { name: "Konya", lat: 37.87, lng: 32.49 },
    places: [
      { name: "Balkh (family origin)", lat: 36.76, lng: 66.9 },
      { name: "Konya (life & death)", lat: 37.87, lng: 32.49 },
    ],
    summary:
      "Refugee from the Mongol advance who settled in Seljuk Konya, jurist turned ecstatic poet after meeting Shams of Tabriz; the Mevlevi order and the Masnavī carry his voice worldwide.",
    relations: [
      { type: "wrote", target: "masnavi" },
      { type: "related", target: "seljuks-of-rum" },
      {
        type: "related",
        target: "sufi-orders",
        note: "the Mevlevi order formed around his legacy",
      },
    ],
    citations: [
      {
        source:
          "Franklin Lewis, Rumi: Past and Present, East and West (Oneworld, 2000)",
      },
      EI2("Djalāl al-Dīn Rūmī"),
    ],
  },
  {
    id: "sadi-shirazi",
    kind: "person",
    lane: "culture",
    name: "Saʿdī of Shiraz",
    arabic: "سعدي الشيرازي",
    start: { year: 1210, precision: "circa" },
    end: {
      year: 1292,
      precision: "circa",
      hijri: { year: 691, source: "attested" },
      note: "Death reported 690–694 AH.",
    },
    importance: 3,
    region: "iraq-iran",
    location: { name: "Shiraz", lat: 29.6, lng: 52.54 },
    summary:
      'Persian moralist-poet of the Gulistān and Būstān, whose verse on the unity of humankind, "the children of Adam are limbs of one body", travels as far as any lines in the language.',
    citations: [EI2("Saʿdī")],
  },
  {
    id: "hafez",
    kind: "person",
    lane: "culture",
    name: "Ḥāfiẓ of Shiraz",
    arabic: "حافظ الشيرازي",
    start: { year: 1315, precision: "circa" },
    end: {
      year: 1390,
      precision: "circa",
      hijri: { year: 792, source: "attested" },
    },
    importance: 3,
    region: "iraq-iran",
    location: { name: "Shiraz", lat: 29.6, lng: 52.54 },
    summary:
      "Master of the Persian ghazal, Qurʾan-memorizer by name (Ḥāfiẓ) and by craft, whose dīwān remains the most consulted book of poetry in the Persianate world.",
    citations: [EI2("Ḥāfiẓ")],
  },
  {
    id: "ibn-battuta",
    kind: "person",
    lane: "culture",
    name: "Ibn Baṭṭūṭa",
    arabic: "ابن بطوطة",
    start: {
      year: 1304,
      precision: "year",
      hijri: { year: 703, source: "attested" },
    },
    end: {
      year: 1368,
      precision: "disputed",
      altYears: [1377],
      hijri: { year: 770, source: "attested" },
      note: "Death reported 770 AH or 779 AH.",
    },
    importance: 4,
    region: "andalus-maghrib",
    location: { name: "Tangier", lat: 35.78, lng: -5.81 },
    places: [
      { name: "Tangier (birth)", lat: 35.78, lng: -5.81 },
      { name: "Makkah", lat: 21.42, lng: 39.83 },
      { name: "Delhi (qāḍī for years)", lat: 28.61, lng: 77.21 },
      { name: "Kilwa", lat: -8.96, lng: 39.5 },
      { name: "Mali (Niani)", lat: 11.38, lng: -8.65 },
      { name: "Quanzhou (China)", lat: 24.87, lng: 118.68 },
    ],
    summary:
      "The greatest traveler of the pre-modern world: thirty years, some 120,000 km, and nearly every Muslim land from Tangier to China, living proof, on this map, of how far a single legal education could carry a man.",
    relations: [
      { type: "wrote", target: "rihla-ibn-battuta" },
      { type: "related", target: "mali-empire", note: "visited 1352–53" },
      {
        type: "related",
        target: "delhi-sultanate",
        note: "served as judge under Muḥammad b. Tughluq",
      },
    ],
    citations: [
      {
        source:
          "Ross E. Dunn, The Adventures of Ibn Battuta (California UP, 1986)",
      },
      EI2("Ibn Baṭṭūṭa"),
    ],
  },
  {
    id: "sinan",
    kind: "person",
    lane: "culture",
    name: "Mimar Sinan",
    arabic: "معمار سنان",
    start: { year: 1489, precision: "circa" },
    end: {
      year: 1588,
      precision: "year",
      hijri: { year: 996, source: "attested" },
    },
    importance: 4,
    region: "anatolia-balkans",
    location: { name: "Istanbul", lat: 41.01, lng: 28.98 },
    summary:
      "Chief Ottoman architect for half a century, over three hundred structures, from the Süleymaniye in Istanbul to his self-declared masterpiece, the Selimiye at Edirne.",
    relations: [
      { type: "related", target: "suleymaniye" },
      { type: "related", target: "ottoman-empire" },
    ],
    citations: [
      { source: "Gülru Necipoğlu, The Age of Sinan (Reaktion, 2005)" },
    ],
  },
  /* --------------------------- institutions ----------------------------- */
  {
    id: "founding-of-baghdad",
    kind: "event",
    lane: "culture",
    name: "Founding of Baghdad",
    arabic: "تأسيس بغداد",
    start: {
      year: 762,
      precision: "year",
      hijri: { year: 145, source: "attested" },
    },
    importance: 5,
    region: "iraq-iran",
    location: { name: "Baghdad", lat: 33.34, lng: 44.4 },
    summary:
      "Caliph al-Manṣūr's perfectly round \"City of Peace\" on the Tigris, laid out by astrologers' calculations, within a century the largest and most learned city west of China.",
    relations: [{ type: "occurred_under", target: "abbasid-caliphate" }],
    citations: [
      {
        source:
          "Hugh Kennedy, The Prophet and the Age of the Caliphates (Longman, 2nd ed. 2004)",
      },
      EI2("Baghdād"),
    ],
  },
  {
    id: "bayt-al-hikma",
    kind: "institution",
    lane: "culture",
    name: "Bayt al-Ḥikma (House of Wisdom)",
    arabic: "بيت الحكمة",
    start: {
      year: 800,
      precision: "circa",
      note: "A palace library attested under Hārūn and al-Maʾmūn; its scale and function are debated by modern scholarship.",
    },
    end: {
      year: 1258,
      precision: "year",
      note: "Destroyed with Baghdad's libraries in the Mongol sack.",
    },
    importance: 4,
    region: "iraq-iran",
    location: { name: "Baghdad", lat: 33.34, lng: 44.4 },
    summary:
      'The Abbasid palace library that became shorthand for the whole Greco-Arabic translation enterprise. Sober scholarship cautions it was a library, not a "university", the movement around it was the real marvel.',
    relations: [
      { type: "related", target: "translation-movement" },
      { type: "related", target: "al-khwarizmi" },
    ],
    citations: [
      {
        source:
          "Dimitri Gutas, Greek Thought, Arabic Culture (Routledge, 1998)",
        detail: "on the institution's debated nature",
      },
    ],
  },
  {
    id: "paper-in-islamic-world",
    kind: "event",
    lane: "science",
    name: "Papermaking spreads to the Islamic world",
    arabic: "انتشار صناعة الورق",
    start: {
      year: 751,
      precision: "circa",
      note: "Traditional link to Talas prisoners; paper mills attested in Samarkand by the later 8th century and Baghdad c. 794.",
    },
    importance: 3,
    region: "central-asia",
    location: { name: "Samarkand", lat: 39.65, lng: 66.96 },
    summary:
      "Cheap paper, via Samarkand, then Baghdad, is the quiet technology beneath everything on this timeline's right side: without it, no mass book culture, no paper-based bureaucracy, no affordable Qurʾan copies.",
    relations: [{ type: "related", target: "battle-of-talas" }],
    citations: [
      { source: "Jonathan Bloom, Paper Before Print (Yale UP, 2001)" },
    ],
  },
  {
    id: "dome-of-the-rock",
    kind: "institution",
    lane: "culture",
    name: "Dome of the Rock",
    arabic: "قبة الصخرة",
    start: {
      year: 692,
      precision: "year",
      hijri: { year: 72, source: "attested" },
      note: "Completion year 72 AH per the founding inscription.",
    },
    ongoing: true,
    importance: 4,
    region: "levant",
    location: { name: "Jerusalem", lat: 31.78, lng: 35.24 },
    summary:
      "ʿAbd al-Malik's golden octagon over the rock of the Ḥaram al-Sharīf, the earliest surviving monument of Islamic architecture, its mosaic inscription among the earliest dated Qurʾanic texts.",
    relations: [{ type: "occurred_under", target: "umayyad-caliphate" }],
    citations: [
      { source: "Oleg Grabar, The Dome of the Rock (Harvard UP, 2006)" },
    ],
  },
  {
    id: "great-mosque-of-damascus",
    kind: "institution",
    lane: "culture",
    name: "Great Mosque of Damascus",
    arabic: "الجامع الأموي",
    start: {
      year: 706,
      precision: "range",
      endYear: 715,
      hijri: { year: 87, source: "attested" },
    },
    ongoing: true,
    importance: 3,
    region: "levant",
    location: { name: "Damascus", lat: 33.51, lng: 36.31 },
    summary:
      "Al-Walīd I's imperial mosque with its golden vine mosaics, prototype of the congregational mosque, and the visual heart of the city where so many scholars on this timeline taught.",
    relations: [{ type: "occurred_under", target: "umayyad-caliphate" }],
    citations: [
      {
        source: "Finbarr B. Flood, The Great Mosque of Damascus (Brill, 2001)",
      },
    ],
  },
  {
    id: "great-mosque-of-cordoba",
    kind: "institution",
    lane: "culture",
    name: "Great Mosque of Córdoba",
    arabic: "جامع قرطبة",
    start: {
      year: 785,
      precision: "year",
      hijri: { year: 169, source: "attested" },
      note: "Begun 785–786; expanded repeatedly to 987.",
    },
    ongoing: true,
    importance: 4,
    region: "andalus-maghrib",
    location: { name: "Córdoba", lat: 37.88, lng: -4.78 },
    summary:
      "ʿAbd al-Raḥmān I's forest of double horseshoe arches, enlarged by his heirs into al-Andalus's masterpiece; a cathedral since 1236, it remains the emblem of Córdoba's centuries.",
    relations: [{ type: "occurred_under", target: "cordoba-umayyads" }],
    citations: [
      { source: "Hugh Kennedy, Muslim Spain and Portugal (Longman, 1996)" },
    ],
  },
  {
    id: "al-qarawiyyin",
    kind: "institution",
    lane: "culture",
    name: "al-Qarawiyyīn",
    arabic: "جامعة القرويين",
    start: {
      year: 859,
      precision: "circa",
      hijri: { year: 245, source: "attested" },
      note: "Traditional founding as a mosque by Fāṭima al-Fihrī; teaching institution grew over following centuries.",
    },
    ongoing: true,
    importance: 4,
    region: "andalus-maghrib",
    location: { name: "Fez", lat: 34.06, lng: -4.97 },
    summary:
      "Founded, by tradition, with the inheritance of Fāṭima al-Fihrī, and often cited as the world's oldest continuously operating institution of higher learning; Ibn Khaldūn taught here.",
    relations: [{ type: "founded_by", target: "fatima-al-fihri" }],
    citations: [EI2("al-Ḳarawiyyīn"), MAKDISI],
  },
  {
    id: "fatima-al-fihri",
    kind: "person",
    lane: "culture",
    name: "Fāṭima al-Fihrī",
    arabic: "فاطمة الفهرية",
    start: {
      year: 800,
      precision: "circa",
      note: "Biography rests on later tradition (notably Ibn Abī Zarʿ, 14th c.); dates approximate.",
    },
    end: { year: 880, precision: "circa" },
    importance: 2,
    region: "andalus-maghrib",
    location: { name: "Fez", lat: 34.06, lng: -4.97 },
    summary:
      "The merchant's daughter credited with endowing the Qarawiyyīn mosque of Fez in 859, a founding story, transmitted by later chroniclers, that made her the patron saint of Muslim women's philanthropy.",
    relations: [{ type: "founded", target: "al-qarawiyyin" }],
    citations: [
      EI2("al-Ḳarawiyyīn"),
      {
        source: "Ibn Abī Zarʿ, Rawḍ al-Qirṭās",
        detail: "primary (later) source for the tradition",
      },
    ],
  },
  {
    id: "al-azhar",
    kind: "institution",
    lane: "culture",
    name: "al-Azhar",
    arabic: "الجامع الأزهر",
    start: {
      year: 972,
      precision: "year",
      hijri: { year: 361, source: "attested" },
      note: "Mosque completed 361 AH; teaching began within years.",
    },
    ongoing: true,
    importance: 4,
    region: "egypt-north-africa",
    location: { name: "Cairo", lat: 30.05, lng: 31.26 },
    summary:
      "Founded by the Fatimids with their new capital, later re-founded as the Sunni world's most famous seat of learning, a living thread from the 10th century to today's global fatwa councils.",
    relations: [{ type: "occurred_under", target: "fatimid-caliphate" }],
    citations: [EI2("al-Azhar"), MAKDISI],
  },
  {
    id: "nizamiyya-baghdad",
    kind: "institution",
    lane: "culture",
    name: "Niẓāmiyya of Baghdad",
    arabic: "المدرسة النظامية",
    start: {
      year: 1067,
      precision: "year",
      hijri: { year: 459, source: "attested" },
    },
    end: {
      year: 1258,
      precision: "circa",
      note: "Declined after the Mongol sack; buildings attested into the 14th century.",
    },
    importance: 4,
    region: "iraq-iran",
    location: { name: "Baghdad", lat: 33.34, lng: 44.4 },
    summary:
      "Flagship of the madrasa network founded by the vizier Niẓām al-Mulk, state-endowed colleges of law that standardized Sunni higher education; al-Ghazālī held its most celebrated chair.",
    relations: [
      { type: "occurred_under", target: "great-seljuks" },
      { type: "related", target: "al-ghazali" },
    ],
    citations: [MAKDISI],
  },
  {
    id: "maragha-observatory",
    kind: "institution",
    lane: "science",
    name: "Maragha observatory",
    arabic: "مرصد مراغة",
    start: {
      year: 1259,
      precision: "year",
      hijri: { year: 657, source: "attested" },
    },
    end: {
      year: 1316,
      precision: "circa",
      note: "Active into the early 14th century.",
    },
    importance: 3,
    region: "iraq-iran",
    location: { name: "Maragha", lat: 37.39, lng: 46.24 },
    summary:
      "Built by al-Ṭūsī for Hülegü one year after Baghdad burned, proof that the observatory tradition not only survived the Mongols but was funded by them; its planetary models traveled as far as Copernicus.",
    relations: [
      { type: "founded_by", target: "nasir-al-din-al-tusi" },
      { type: "occurred_under", target: "ilkhanate" },
    ],
    citations: [SALIBA],
  },
  {
    id: "alhambra",
    kind: "institution",
    lane: "culture",
    name: "The Alhambra",
    arabic: "قصر الحمراء",
    start: {
      year: 1238,
      precision: "range",
      endYear: 1391,
      note: "Nasrid palace-city developed principally between the 13th and late 14th centuries.",
    },
    ongoing: true,
    importance: 4,
    region: "andalus-maghrib",
    location: { name: "Granada", lat: 37.18, lng: -3.59 },
    summary:
      'The "red fortress" of the Nasrids: courtyards of water and muqarnas where the poetry is carved into the walls, the most complete surviving medieval Islamic palace.',
    relations: [{ type: "occurred_under", target: "nasrids" }],
    citations: [{ source: "Robert Irwin, The Alhambra (Harvard UP, 2004)" }],
  },
  {
    id: "sankore-timbuktu",
    kind: "institution",
    lane: "culture",
    name: "Sankoré & the Timbuktu manuscripts",
    arabic: "جامع سنكري ومخطوطات تمبكتو",
    start: {
      year: 1325,
      precision: "circa",
      note: "Mosque attributed to Mansa Mūsā's era; scholarly apogee 15th–16th centuries.",
    },
    end: {
      year: 1600,
      precision: "circa",
      note: "Decline after the Moroccan conquest of 1591; manuscript culture persisted.",
    },
    importance: 3,
    region: "west-africa",
    location: { name: "Timbuktu", lat: 16.77, lng: -3.01 },
    summary:
      "Timbuktu's mosque-college and the private libraries around it, hundreds of thousands of surviving manuscripts in law, theology, astronomy, and poetry that refute every cliché about Africa and the written word.",
    relations: [
      { type: "related", target: "mali-empire" },
      { type: "related", target: "songhai-empire" },
      { type: "related", target: "ahmad-baba" },
    ],
    citations: [
      {
        source:
          "John O. Hunwick, Timbuktu and the Songhay Empire (Brill, 1999)",
      },
      {
        source:
          "Shamil Jeppie & S.B. Diagne (eds.), The Meanings of Timbuktu (HSRC, 2008)",
      },
    ],
  },
  {
    id: "ulugh-beg-observatory",
    kind: "institution",
    lane: "science",
    name: "Ulugh Beg observatory",
    arabic: "مرصد أولوغ بيك",
    start: {
      year: 1424,
      precision: "circa",
      hijri: { year: 827, source: "attested" },
    },
    end: {
      year: 1449,
      precision: "year",
      note: "Work ceased after Ulugh Beg's murder.",
    },
    importance: 3,
    region: "central-asia",
    location: { name: "Samarkand", lat: 39.68, lng: 67.01 },
    summary:
      "The Timurid prince-astronomer's giant sextant at Samarkand produced the finest star catalogue before Tycho Brahe, a ruler doing science, until politics killed him.",
    relations: [{ type: "occurred_under", target: "timurids" }],
    citations: [SALIBA, EI2("Ulugh Beg")],
  },
  {
    id: "suleymaniye",
    kind: "institution",
    lane: "culture",
    name: "Süleymaniye complex",
    arabic: "جامع السليمانية",
    start: {
      year: 1550,
      precision: "range",
      endYear: 1557,
      hijri: { year: 957, source: "attested" },
    },
    ongoing: true,
    importance: 3,
    region: "anatolia-balkans",
    location: { name: "Istanbul", lat: 41.02, lng: 28.96 },
    summary:
      "Sinan's mosque-city for Süleymān, madrasas, hospital, soup kitchen, and baths around the great dome above the Golden Horn: the Ottoman ideal of state, faith, and welfare in stone.",
    relations: [
      { type: "founded_by", target: "sinan" },
      { type: "occurred_under", target: "ottoman-empire" },
    ],
    citations: [
      { source: "Gülru Necipoğlu, The Age of Sinan (Reaktion, 2005)" },
    ],
  },
  {
    id: "naqsh-e-jahan",
    kind: "institution",
    lane: "culture",
    name: "Naqsh-e Jahān Square, Isfahan",
    arabic: "ميدان نقش جهان",
    start: { year: 1598, precision: "range", endYear: 1629 },
    ongoing: true,
    importance: 3,
    region: "iraq-iran",
    location: { name: "Isfahan", lat: 32.66, lng: 51.68 },
    summary:
      "Shah ʿAbbās's royal square, mosque, palace, and bazaar composed around one vast maidan, the set-piece of Safavid Isfahan, \"half the world\" in the era's proverb.",
    relations: [{ type: "occurred_under", target: "safavid-empire" }],
    citations: [
      { source: "Roger Savory, Iran under the Safavids (Cambridge, 1980)" },
    ],
  },
  {
    id: "taj-mahal",
    kind: "institution",
    lane: "culture",
    name: "Taj Mahal",
    arabic: "تاج محل",
    start: {
      year: 1632,
      precision: "range",
      endYear: 1653,
      hijri: { year: 1041, source: "attested" },
    },
    ongoing: true,
    importance: 4,
    region: "south-asia",
    location: { name: "Agra", lat: 27.17, lng: 78.04 },
    summary:
      "Shāh Jahān's white-marble mausoleum for Mumtāz Maḥal, with its Qurʾanic calligraphy and paradise garden, the most famous building of the Islamic world, raised while the Ottomans and Safavids built their own capitals' jewels.",
    relations: [{ type: "occurred_under", target: "mughal-empire" }],
    citations: [
      { source: "Ebba Koch, The Complete Taj Mahal (Thames & Hudson, 2006)" },
    ],
  },
  {
    id: "muteferrika-press",
    kind: "event",
    lane: "culture",
    name: "Müteferrika press in Istanbul",
    arabic: "مطبعة إبراهيم متفرقة",
    start: {
      year: 1727,
      precision: "year",
      hijri: { year: 1139, source: "attested" },
    },
    importance: 3,
    region: "anatolia-balkans",
    location: { name: "Istanbul", lat: 41.01, lng: 28.98 },
    summary:
      "İbrahim Müteferrika's press, the first Ottoman Muslim printing house for Arabic-script books (Jewish and Christian presses operated earlier), printed maps, dictionaries, and histories, three centuries after Gutenberg.",
    relations: [
      { type: "occurred_under", target: "ottoman-empire" },
      { type: "related", target: "gutenberg-press" },
    ],
    citations: [
      EI2("Ibrāhīm Müteferriḳa"),
      {
        source:
          "Orlin Sabev, Waiting for Müteferrika (Academic Studies Press, 2018)",
      },
    ],
  },
  {
    id: "zheng-he-voyages",
    kind: "event",
    lane: "culture",
    name: "Zheng He's treasure voyages",
    arabic: "رحلات تشنغ خه",
    start: { year: 1405, precision: "year" },
    end: { year: 1433, precision: "year" },
    importance: 3,
    region: "southeast-asia",
    location: { name: "Malacca", lat: 2.2, lng: 102.25 },
    summary:
      "Seven Ming expeditions to the Indian Ocean commanded by the Muslim admiral Zheng He, giant fleets calling at Malacca, Calicut, Hormuz, and Jeddah, knitting the maritime Islamic world to China.",
    relations: [
      { type: "related", target: "malacca-sultanate" },
      { type: "related", target: "ming-dynasty" },
    ],
    citations: [
      {
        source:
          "Edward L. Dreyer, Zheng He: China and the Oceans in the Early Ming Dynasty (Pearson, 2007)",
      },
    ],
  },
  {
    id: "piri-reis-map",
    kind: "event",
    lane: "science",
    name: "Pīrī Reʾīs world map",
    arabic: "خريطة بيري ريس",
    start: {
      year: 1513,
      precision: "year",
      hijri: { year: 919, source: "attested" },
    },
    importance: 2,
    region: "anatolia-balkans",
    location: { name: "Gallipoli", lat: 40.41, lng: 26.67 },
    summary:
      "The Ottoman admiral's world map, compiled, by his own note, from some twenty sources including a chart of Columbus: the Islamic world mapping the Americas within two decades of 1492.",
    relations: [{ type: "related", target: "columbus-1492" }],
    citations: [
      {
        source:
          "Svat Soucek, Piri Reis and Turkish Mapmaking after Columbus (Nour Foundation, 1996)",
      },
    ],
  },
  {
    id: "suez-canal",
    kind: "event",
    lane: "culture",
    name: "Suez Canal opens",
    arabic: "افتتاح قناة السويس",
    start: {
      year: 1869,
      precision: "year",
      hijri: { year: 1286, source: "attested" },
    },
    importance: 3,
    region: "egypt-north-africa",
    location: { name: "Suez", lat: 29.97, lng: 32.55 },
    summary:
      "The canal re-drew the world's trade map through Egypt, and drew imperial powers onto it: within thirteen years Britain occupied the country.",
    citations: [
      {
        source:
          "Zachary Karabell, Parting the Desert: The Creation of the Suez Canal (Knopf, 2003)",
      },
    ],
  },
  {
    id: "hejaz-railway",
    kind: "event",
    lane: "culture",
    name: "Hejaz Railway",
    arabic: "سكة حديد الحجاز",
    start: {
      year: 1900,
      precision: "year",
      hijri: { year: 1318, source: "attested" },
    },
    end: {
      year: 1908,
      precision: "year",
      hijri: { year: 1326, source: "attested" },
      note: "Damascus–Madinah line completed 1908; service collapsed in WWI.",
    },
    importance: 2,
    region: "arabia",
    location: { name: "Madinah", lat: 24.47, lng: 39.61 },
    summary:
      "Abdülhamid II's pan-Islamic project, funded partly by worldwide Muslim subscription, carried pilgrims from Damascus to Madinah in days instead of weeks, until the Great War wrecked it.",
    relations: [{ type: "occurred_under", target: "ottoman-empire" }],
    citations: [
      { source: "William Ochsenwald, The Hijaz Railroad (Virginia UP, 1980)" },
    ],
  },
];

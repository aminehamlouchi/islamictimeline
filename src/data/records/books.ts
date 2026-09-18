/**
 * Books and written works as historical milestones.
 * Composition dates are often approximate, flagged accordingly.
 */
import type { TimelineRecord } from "@/lib/types";

const EI2 = (entry: string, author?: string) => ({
  source: "Encyclopaedia of Islam, 2nd ed. (Brill)",
  detail: `s.v. "${entry}"${author ? ` (${author})` : ""}`,
});

export const bookRecords: TimelineRecord[] = [
  {
    id: "uthmanic-codex",
    kind: "event",
    lane: "books",
    name: "Standardization of the Qurʾanic codex",
    arabic: "جمع المصحف العثماني",
    start: {
      year: 650,
      precision: "circa",
      hijri: { year: 30, source: "attested" },
      note: "Under Caliph ʿUthmān, c. 25–30 AH; copies sent to the garrison cities.",
    },
    importance: 5,
    region: "arabia",
    location: { name: "Madinah", lat: 24.47, lng: 39.61 },
    summary:
      "Caliph ʿUthmān had an authoritative written copy of the Qurʾan prepared from the collection made under Abū Bakr, and master copies dispatched to the major cities, fixing the written text that Muslims use to this day.",
    relations: [
      { type: "related", target: "uthman-ibn-affan" },
      { type: "related", target: "zayd-ibn-thabit" },
    ],
    citations: [
      EI2("al-Ḳurʾān"),
      {
        source:
          "M.M. al-Azami, The History of the Qurʾānic Text (UK Islamic Academy, 2003)",
      },
    ],
  },
  {
    id: "al-muwatta",
    kind: "book",
    lane: "books",
    name: "al-Muwaṭṭaʾ",
    arabic: "الموطأ",
    start: {
      year: 760,
      precision: "range",
      endYear: 795,
      note: "Compiled and refined over decades in the mid-2nd century AH; Mālik kept revising it until his death.",
    },
    importance: 5,
    region: "arabia",
    location: { name: "Madinah", lat: 24.47, lng: 39.61 },
    summary:
      'Mālik\'s "well-trodden path": the earliest surviving book of law and hadith arranged for practice, recording the transmitted norms of Madinah. Al-Shāfiʿī called it the soundest book after the Qurʾan, before the Ṣaḥīḥs existed.',
    relations: [{ type: "written_by", target: "malik-ibn-anas" }],
    citations: [
      EI2("Mālik b. Anas", "J. Schacht"),
      { source: "Yasin Dutton, The Origins of Islamic Law (Curzon, 1999)" },
    ],
  },
  {
    id: "kitab-al-umm",
    kind: "book",
    lane: "books",
    name: "Kitāb al-Umm",
    arabic: "كتاب الأم",
    start: {
      year: 814,
      precision: "range",
      endYear: 820,
      hijri: { year: 200, source: "attested" },
      note: 'The Egyptian-period corpus of al-Shāfiʿī\'s "new" doctrine, c. 199–204 AH, partly compiled by his students.',
    },
    importance: 4,
    region: "egypt-north-africa",
    location: { name: "Fustat (Cairo)", lat: 30.0, lng: 31.23 },
    summary:
      "The collected legal doctrine of al-Shāfiʿī's final years in Egypt, the foundation text of the Shāfiʿī school, transmitted with his methodological treatise al-Risāla.",
    relations: [{ type: "written_by", target: "al-shafii" }],
    citations: [EI2("al-Shāfiʿī", "E. Chaumont")],
  },
  {
    id: "musnad-ahmad",
    kind: "book",
    lane: "books",
    name: "Musnad Aḥmad",
    arabic: "مسند أحمد",
    start: {
      year: 820,
      precision: "range",
      endYear: 855,
      note: "Assembled across Aḥmad's career from a much larger corpus; final arrangement completed by his son ʿAbdullāh.",
    },
    importance: 4,
    region: "iraq-iran",
    location: { name: "Baghdad", lat: 33.34, lng: 44.4 },
    summary:
      "One of the largest early hadith collections, some thirty thousand reports arranged by narrating Companion rather than by topic, the lifework of Aḥmad ibn Ḥanbal.",
    relations: [{ type: "written_by", target: "ahmad-ibn-hanbal" }],
    citations: [EI2("Aḥmad b. Ḥanbal", "H. Laoust")],
  },
  {
    id: "sahih-al-bukhari",
    kind: "book",
    lane: "books",
    name: "Ṣaḥīḥ al-Bukhārī",
    arabic: "صحيح البخاري",
    start: {
      year: 832,
      precision: "range",
      endYear: 848,
      note: "Tradition reports sixteen years of compilation; completed well before al-Bukhārī's death in 256 AH / 870 CE.",
    },
    importance: 5,
    region: "central-asia",
    location: { name: "Bukhara", lat: 39.77, lng: 64.42 },
    summary:
      "Al-Jāmiʿ al-Ṣaḥīḥ: roughly 7,400 reports (with repetitions) distilled from hundreds of thousands, arranged as a complete curriculum of law and belief. Sunni tradition ranks it the most authentic book after the Qurʾan.",
    relations: [
      { type: "written_by", target: "al-bukhari" },
      {
        type: "related",
        target: "fath-al-bari",
        note: "its definitive commentary, five centuries later",
      },
    ],
    citations: [
      EI2("al-Bukhārī", "J. Robson"),
      {
        source:
          "Jonathan Brown, The Canonization of al-Bukhārī and Muslim (Brill, 2007)",
      },
    ],
  },
  {
    id: "sahih-muslim",
    kind: "book",
    lane: "books",
    name: "Ṣaḥīḥ Muslim",
    arabic: "صحيح مسلم",
    start: {
      year: 850,
      precision: "range",
      endYear: 865,
      note: "Compiled in Nishapur over roughly fifteen years, per the classical reports.",
    },
    importance: 5,
    region: "iraq-iran",
    location: { name: "Nishapur", lat: 36.21, lng: 58.8 },
    summary:
      "Muslim's Ṣaḥīḥ, admired for gathering the routes of each hadith in one place with exacting consistency; paired with al-Bukhārī's as the \"two Ṣaḥīḥs\" at the summit of Sunni hadith.",
    relations: [
      { type: "written_by", target: "imam-muslim" },
      {
        type: "related",
        target: "al-nawawi",
        note: "al-Nawawī wrote its standard commentary",
      },
    ],
    citations: [
      EI2("Muslim b. al-Ḥadjdjādj", "G.H.A. Juynboll"),
      {
        source:
          "Jonathan Brown, The Canonization of al-Bukhārī and Muslim (Brill, 2007)",
      },
    ],
  },
  {
    id: "tafsir-al-tabari",
    kind: "book",
    lane: "books",
    name: "Tafsīr al-Ṭabarī (Jāmiʿ al-bayān)",
    arabic: "جامع البيان في تأويل القرآن",
    start: {
      year: 896,
      precision: "range",
      endYear: 903,
      note: "Reportedly dictated to students c. 283–290 AH.",
    },
    importance: 5,
    region: "iraq-iran",
    location: { name: "Baghdad", lat: 33.34, lng: 44.4 },
    summary:
      "The mother of Qurʾan commentaries: al-Ṭabarī gathered the whole earlier exegetical tradition with chains of transmission, weighing readings and meanings verse by verse.",
    relations: [{ type: "written_by", target: "al-tabari" }],
    citations: [EI2("al-Ṭabarī", "C.E. Bosworth")],
  },
  {
    id: "tarikh-al-tabari",
    kind: "book",
    lane: "books",
    name: "Tārīkh al-Ṭabarī",
    arabic: "تاريخ الرسل والملوك",
    start: {
      year: 902,
      precision: "circa",
      note: "The universal history was brought down to the year 302 AH / 915 CE.",
    },
    importance: 4,
    region: "iraq-iran",
    location: { name: "Baghdad", lat: 33.34, lng: 44.4 },
    summary:
      "The History of Prophets and Kings, the backbone of early Islamic historiography, preserving layer upon layer of earlier reports from creation to the author's own decade.",
    relations: [{ type: "written_by", target: "al-tabari" }],
    citations: [
      EI2("al-Ṭabarī", "C.E. Bosworth"),
      {
        source:
          "Franz Rosenthal, A History of Muslim Historiography (Brill, 1968)",
      },
    ],
  },
  {
    id: "aqida-tahawiyya",
    kind: "book",
    lane: "books",
    name: "al-ʿAqīda al-Ṭaḥāwiyya",
    arabic: "العقيدة الطحاوية",
    start: {
      year: 910,
      precision: "circa",
      note: "Early 4th century AH; exact composition date unrecorded.",
    },
    importance: 3,
    region: "egypt-north-africa",
    location: { name: "Fustat (Cairo)", lat: 30.0, lng: 31.23 },
    summary:
      "A brief creed by the Egyptian Ḥanafī al-Ṭaḥāwī, prized ever since as a statement of belief acceptable across Sunni theological schools.",
    relations: [{ type: "written_by", target: "al-tahawi" }],
    citations: [EI2("al-Ṭaḥāwī")],
  },
  {
    id: "kitab-al-jabr",
    kind: "book",
    lane: "books",
    name: "Kitāb al-Jabr wa-l-Muqābala",
    arabic: "كتاب الجبر والمقابلة",
    start: {
      year: 820,
      precision: "circa",
      note: "Written under Caliph al-Maʾmūn (r. 813–833).",
    },
    importance: 5,
    region: "iraq-iran",
    location: { name: "Baghdad", lat: 33.34, lng: 44.4 },
    summary:
      'Al-Khwārizmī\'s compendium on solving equations gave the world the word "algebra" (al-jabr), and, through Latin translations of his name, "algorithm". Written for practical use: inheritance shares, trade, surveying.',
    relations: [
      { type: "written_by", target: "al-khwarizmi" },
      { type: "related", target: "bayt-al-hikma" },
    ],
    citations: [
      EI2("al-Khwārazmī", "J. Vernet"),
      {
        source:
          "Roshdi Rashed, Al-Khwārizmī: The Beginnings of Algebra (Saqi, 2009)",
      },
    ],
  },
  {
    id: "qanun-fi-al-tibb",
    kind: "book",
    lane: "books",
    name: "al-Qānūn fī al-Ṭibb (Canon of Medicine)",
    arabic: "القانون في الطب",
    start: {
      year: 1025,
      precision: "circa",
      note: "Completed c. 1025 after long composition across Ibn Sīnā's wanderings.",
    },
    importance: 5,
    region: "iraq-iran",
    location: { name: "Hamadan", lat: 34.8, lng: 48.51 },
    summary:
      "Ibn Sīnā's systematic encyclopedia of Greco-Arabic medicine, the standard medical textbook in both the Islamic world and European universities into the 17th century.",
    relations: [{ type: "written_by", target: "ibn-sina" }],
    citations: [EI2("Ibn Sīnā", "A.-M. Goichon")],
  },
  {
    id: "kitab-al-manazir",
    kind: "book",
    lane: "books",
    name: "Kitāb al-Manāẓir (Book of Optics)",
    arabic: "كتاب المناظر",
    start: {
      year: 1011,
      precision: "range",
      endYear: 1021,
      note: "Written in Cairo during Ibn al-Haytham's Fatimid years.",
    },
    importance: 4,
    region: "egypt-north-africa",
    location: { name: "Cairo", lat: 30.04, lng: 31.24 },
    summary:
      "Ibn al-Haytham overturned ancient theories of vision with controlled experiment and mathematics, a landmark of scientific method whose Latin translation shaped Kepler and the European study of light.",
    relations: [
      { type: "written_by", target: "ibn-al-haytham" },
      { type: "occurred_under", target: "fatimid-caliphate" },
    ],
    citations: [
      {
        source:
          "A.I. Sabra (ed./tr.), The Optics of Ibn al-Haytham, Books I–III (Warburg Institute, 1989)",
      },
    ],
  },
  {
    id: "ihya-ulum-al-din",
    kind: "book",
    lane: "books",
    name: "Iḥyāʾ ʿUlūm al-Dīn",
    arabic: "إحياء علوم الدين",
    start: {
      year: 1096,
      precision: "range",
      endYear: 1102,
      note: "Begun during al-Ghazālī's retreat years after 488 AH / 1095 CE; dating approximate.",
    },
    importance: 5,
    region: "levant",
    location: { name: "Damascus", lat: 33.51, lng: 36.29 },
    summary:
      '"The Revival of the Religious Sciences": forty books re-ordering law, worship, habits of the heart, and the path to God, arguably the most influential work of Islamic spirituality ever written.',
    relations: [{ type: "written_by", target: "al-ghazali" }],
    citations: [EI2("al-Ghazālī", "W. Montgomery Watt")],
  },
  {
    id: "bidayat-al-mujtahid",
    kind: "book",
    lane: "books",
    name: "Bidāyat al-Mujtahid",
    arabic: "بداية المجتهد ونهاية المقتصد",
    start: {
      year: 1168,
      precision: "circa",
      hijri: { year: 564, source: "attested" },
      note: "Main text completed 564 AH per its colophon; the ḥajj section added later.",
    },
    importance: 4,
    region: "andalus-maghrib",
    location: { name: "Córdoba", lat: 37.88, lng: -4.78 },
    summary:
      'Ibn Rushd\'s "Primer for the Independent Jurist": a masterclass in comparative law that explains *why* the schools disagree, still a standard text for studying juristic difference.',
    relations: [{ type: "written_by", target: "ibn-rushd" }],
    citations: [EI2("Ibn Rushd", "R. Arnaldez")],
  },
  {
    id: "masnavi",
    kind: "book",
    lane: "books",
    name: "Masnavī-yi Maʿnavī",
    arabic: "مثنوی معنوی",
    start: {
      year: 1258,
      precision: "range",
      endYear: 1273,
      note: "Dictated over Rūmī's last fifteen years; left unfinished at his death.",
    },
    importance: 4,
    region: "anatolia-balkans",
    location: { name: "Konya", lat: 37.87, lng: 32.49 },
    summary:
      'Rūmī\'s vast Persian poem of stories and spiritual teaching, so revered it was called "the Qurʾan in Persian", begun in the very decade Baghdad fell to the Mongols.',
    relations: [{ type: "written_by", target: "rumi" }],
    citations: [
      EI2("Mathnawī"),
      {
        source:
          "Franklin Lewis, Rumi: Past and Present, East and West (Oneworld, 2000)",
      },
    ],
  },
  {
    id: "riyad-al-salihin",
    kind: "book",
    lane: "books",
    name: "Riyāḍ al-Ṣāliḥīn",
    arabic: "رياض الصالحين",
    start: {
      year: 1272,
      precision: "year",
      hijri: { year: 670, source: "attested" },
      note: "Completed Ramadan 670 AH per its conclusion.",
    },
    importance: 4,
    region: "levant",
    location: { name: "Damascus", lat: 33.51, lng: 36.29 },
    summary:
      'Al-Nawawī\'s "Gardens of the Righteous", the everyday hadith anthology of the Muslim world, read in homes and mosques from Morocco to Malaysia; his Forty Hadith comes from the same Damascus years.',
    relations: [{ type: "written_by", target: "al-nawawi" }],
    citations: [EI2("al-Nawawī", "W. Heffening")],
  },
  {
    id: "aqida-wasitiyya",
    kind: "book",
    lane: "books",
    name: "al-ʿAqīda al-Wāsiṭiyya",
    arabic: "العقيدة الواسطية",
    start: {
      year: 1298,
      precision: "year",
      hijri: { year: 698, source: "attested" },
      note: "Written 698 AH at the request of a judge from Wāsiṭ; later the subject of formal hearings in 705 AH / 1306 CE.",
    },
    importance: 4,
    region: "levant",
    location: { name: "Damascus", lat: 33.51, lng: 36.29 },
    summary:
      "Ibn Taymiyya's concise statement of creed, written in one sitting for a Wāsiṭ judge, defended by its author in three public tribunals, and studied ever since wherever his school has influence.",
    relations: [
      { type: "written_by", target: "ibn-taymiyya" },
      { type: "related", target: "ibn-uthaymin", note: "modern commentator" },
    ],
    citations: [
      EI2("Ibn Taymiyya", "H. Laoust"),
      {
        source: "Ibn Kathīr, al-Bidāya wa-l-Nihāya",
        detail: "account of the 705 AH hearings",
      },
    ],
  },
  {
    id: "zad-al-maad",
    kind: "book",
    lane: "books",
    name: "Zād al-Maʿād",
    arabic: "زاد المعاد في هدي خير العباد",
    start: {
      year: 1340,
      precision: "circa",
      note: "Composed during ḥajj journeys, per the author; precise date unrecorded.",
    },
    importance: 3,
    region: "levant",
    location: { name: "Damascus", lat: 33.51, lng: 36.29 },
    summary:
      "Ibn al-Qayyim's \"Provision for the Hereafter\": the Prophet's ﷺ guidance in worship, conduct, and medicine, distilled by Ibn Taymiyya's foremost student.",
    relations: [{ type: "written_by", target: "ibn-al-qayyim" }],
    citations: [EI2("Ibn Ḳayyim al-Djawziyya", "H. Laoust")],
  },
  {
    id: "al-muqaddima",
    kind: "book",
    lane: "books",
    name: "al-Muqaddima",
    arabic: "المقدمة",
    start: {
      year: 1377,
      precision: "year",
      hijri: { year: 779, source: "attested" },
      note: "First draft written in about five months at Qalʿat Banī Salāma; revised for years afterward.",
    },
    importance: 5,
    region: "egypt-north-africa",
    location: {
      name: "Qalʿat Banī Salāma (Algeria)",
      lat: 35.3,
      lng: 1.2,
      approximate: true,
    },
    summary:
      "Ibn Khaldūn's Introduction to history: a theory of civilization, solidarity, economics, and the life-cycle of dynasties, written in a desert castle, often called the founding work of sociology and the philosophy of history.",
    relations: [{ type: "written_by", target: "ibn-khaldun" }],
    citations: [
      { source: "Franz Rosenthal (tr.), The Muqaddimah (Princeton UP, 1958)" },
      EI2("Ibn Khaldūn", "M. Talbi"),
    ],
  },
  {
    id: "fath-al-bari",
    kind: "book",
    lane: "books",
    name: "Fatḥ al-Bārī",
    arabic: "فتح الباري بشرح صحيح البخاري",
    start: {
      year: 1414,
      precision: "range",
      endYear: 1438,
      hijri: { year: 817, source: "attested" },
      note: "Begun 817 AH, completed 842 AH; celebrated with a famous banquet.",
    },
    importance: 4,
    region: "egypt-north-africa",
    location: { name: "Cairo", lat: 30.04, lng: 31.24 },
    summary:
      "Ibn Ḥajar's monumental commentary on Ṣaḥīḥ al-Bukhārī, twenty-five years in the making and, by common consent, the greatest commentary on any hadith collection.",
    relations: [
      { type: "written_by", target: "ibn-hajar" },
      { type: "related", target: "sahih-al-bukhari" },
    ],
    citations: [EI2("Ibn Ḥadjar al-ʿAsḳalānī", "F. Rosenthal")],
  },
  {
    id: "rihla-ibn-battuta",
    kind: "book",
    lane: "books",
    name: "The Riḥla of Ibn Baṭṭūṭa",
    arabic: "رحلة ابن بطوطة",
    start: {
      year: 1355,
      precision: "year",
      hijri: { year: 756, source: "attested" },
      note: "Dictated to Ibn Juzayy at the Marinid court, completed 756 AH.",
    },
    importance: 3,
    region: "andalus-maghrib",
    location: { name: "Fez", lat: 34.06, lng: -4.98 },
    summary:
      "The travel account of three decades and some 120,000 km, from Tangier to China, Mali to the Volga, our richest eyewitness panorama of the 14th-century Muslim world.",
    relations: [{ type: "written_by", target: "ibn-battuta" }],
    citations: [
      {
        source:
          "H.A.R. Gibb (tr.), The Travels of Ibn Baṭṭūṭa (Hakluyt Society, 1958–2000)",
      },
    ],
  },
  {
    id: "tarjuman-al-mustafid",
    kind: "book",
    lane: "books",
    name: "Tarjumān al-Mustafīd",
    arabic: "ترجمان المستفيد",
    start: {
      year: 1675,
      precision: "circa",
      note: "Late 17th century; precise date debated.",
    },
    importance: 2,
    region: "southeast-asia",
    location: { name: "Aceh", lat: 5.55, lng: 95.32 },
    summary:
      "The first complete Qurʾan commentary in Malay, by ʿAbd al-Raʾūf al-Sinkīlī of Aceh, a milestone in the naturalization of Islamic learning in Southeast Asia.",
    relations: [{ type: "written_by", target: "abd-al-rauf-al-sinkili" }],
    citations: [
      {
        source:
          "Peter Riddell, Islam and the Malay-Indonesian World (Hurst, 2001)",
      },
    ],
  },
  {
    id: "fatawa-alamgiri",
    kind: "book",
    lane: "books",
    name: "al-Fatāwā al-ʿĀlamgīriyya",
    arabic: "الفتاوى العالمكيرية",
    start: {
      year: 1667,
      precision: "range",
      endYear: 1675,
      note: "Compiled by a large commission over roughly eight years.",
    },
    importance: 3,
    region: "south-asia",
    location: { name: "Delhi", lat: 28.61, lng: 77.21 },
    summary:
      "The great Ḥanafī legal compendium commissioned by the Mughal emperor Aurangzeb ʿĀlamgīr, an imperial codification project employing hundreds of scholars.",
    relations: [{ type: "occurred_under", target: "mughal-empire" }],
    citations: [
      { source: "John F. Richards, The Mughal Empire (Cambridge, 1993)" },
      EI2("al-Fatāwā al-ʿĀlamgīriyya"),
    ],
  },
  {
    id: "hujjat-allah-al-baligha",
    kind: "book",
    lane: "books",
    name: "Ḥujjat Allāh al-Bāligha",
    arabic: "حجة الله البالغة",
    start: {
      year: 1755,
      precision: "circa",
      note: "Mid-18th century; written after the author's return from the Hijaz.",
    },
    importance: 3,
    region: "south-asia",
    location: { name: "Delhi", lat: 28.61, lng: 77.21 },
    summary:
      'Shāh Walīullāh\'s "Conclusive Argument from God": a philosophy of the sharia explaining the purposes behind its rulings, a bridge between classical thought and modern South Asian reform.',
    relations: [{ type: "written_by", target: "shah-waliullah" }],
    citations: [
      {
        source:
          "Marcia K. Hermansen (tr.), The Conclusive Argument from God (Brill, 1996)",
      },
    ],
  },
  {
    id: "kitab-al-tawhid",
    kind: "book",
    lane: "books",
    name: "Kitāb al-Tawḥīd",
    arabic: "كتاب التوحيد",
    start: {
      year: 1740,
      precision: "circa",
      note: "Composed during the author's early preaching career; precise date unrecorded.",
    },
    importance: 3,
    region: "arabia",
    location: { name: "Diriyah", lat: 24.73, lng: 46.57 },
    summary:
      "Muḥammad ibn ʿAbd al-Wahhāb's hadith-arranged manifesto on pure monotheism, the doctrinal core of his movement, studied and contested from his day to ours.",
    relations: [{ type: "written_by", target: "ibn-abd-al-wahhab" }],
    citations: [EI2("Ibn ʿAbd al-Wahhāb", "H. Laoust")],
  },
  {
    id: "encyclopaedia-of-islam",
    kind: "book",
    lane: "books",
    name: "Encyclopaedia of Islam (1st ed.)",
    arabic: "دائرة المعارف الإسلامية",
    start: {
      year: 1913,
      precision: "range",
      endYear: 1938,
      note: "Published in fascicules at Leiden, 1913–1938.",
    },
    importance: 2,
    region: "europe-world",
    location: { name: "Leiden", lat: 52.16, lng: 4.49 },
    summary:
      "The first great Western reference work of Islamic studies, begun under Ottoman skies and finished in another world; its successor editions are among the sources cited throughout this site.",
    citations: [
      {
        source: "Encyclopaedia of Islam, 2nd ed. (Brill)",
        detail: "historical introduction",
      },
    ],
  },
  {
    id: "king-fahd-quran-complex",
    kind: "institution",
    lane: "books",
    name: "King Fahd Qurʾan Printing Complex",
    arabic: "مجمع الملك فهد لطباعة المصحف الشريف",
    start: {
      year: 1984,
      precision: "year",
      hijri: { year: 1405, source: "attested" },
    },
    ongoing: true,
    importance: 2,
    region: "arabia",
    location: { name: "Madinah", lat: 24.47, lng: 39.61 },
    summary:
      "The Madinah printing complex that produces millions of muṣḥafs and translations each year, the industrial-age chapter of the same textual history that begins with the ʿUthmānic codex at the other end of this lane.",
    relations: [{ type: "related", target: "uthmanic-codex" }],
    citations: [
      {
        source: "King Fahd Glorious Qur'an Printing Complex (Madinah)",
        detail: "institutional publications",
      },
    ],
  },
];

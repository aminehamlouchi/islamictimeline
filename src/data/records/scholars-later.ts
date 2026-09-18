/**
 * Scholars of the early-modern and modern periods (10th–15th AH / 16th–21st CE).
 * Modern coverage is intentionally selective; see the Methodology page.
 */
import type { TimelineRecord } from "@/lib/types";

const EI2 = (entry: string, author?: string) => ({
  source: "Encyclopaedia of Islam, 2nd ed. (Brill)",
  detail: `s.v. "${entry}"${author ? ` (${author})` : ""}`,
});

export const laterScholarRecords: TimelineRecord[] = [
  {
    id: "ahmad-sirhindi",
    kind: "person",
    lane: "scholars",
    name: "Aḥmad Sirhindī",
    arabic: "أحمد السرهندي",
    start: {
      year: 1564,
      precision: "year",
      hijri: { year: 971, source: "attested" },
    },
    end: {
      year: 1624,
      precision: "year",
      hijri: { year: 1034, source: "attested" },
    },
    importance: 3,
    region: "south-asia",
    location: { name: "Sirhind", lat: 30.64, lng: 76.38 },
    summary:
      'Naqshbandī reformer of Mughal India, called "Renewer of the Second Millennium" (Mujaddid-i Alf-i Thānī); pressed for sharia-centered practice at Jahangir\'s court and was briefly imprisoned for it.',
    relations: [
      {
        type: "related",
        target: "mughal-empire",
        note: "active under Akbar and Jahangir",
      },
    ],
    citations: [
      EI2("Aḥmad Sirhindī", "J.G.J. ter Haar"),
      {
        source:
          "Yohanan Friedmann, Shaykh Aḥmad Sirhindī (McGill-Queen's, 1971)",
      },
    ],
  },
  {
    id: "mulla-sadra",
    kind: "person",
    lane: "scholars",
    name: "Mullā Ṣadrā",
    arabic: "ملا صدرا",
    start: {
      year: 1571,
      precision: "circa",
      note: "Born c. 979–980 AH in Shiraz.",
    },
    end: {
      year: 1640,
      precision: "circa",
      hijri: { year: 1050, source: "attested" },
      note: "Died at Basra returning from his seventh pilgrimage; 1045 AH also reported.",
    },
    importance: 3,
    region: "iraq-iran",
    location: { name: "Shiraz", lat: 29.6, lng: 52.54 },
    summary:
      'The major philosopher of Safavid Iran, whose "transcendent wisdom" (al-ḥikma al-mutaʿāliya) synthesized Avicennan philosophy, illuminationism, and mysticism; still central to philosophy curricula in Iran.',
    relations: [{ type: "related", target: "safavid-empire" }],
    citations: [
      EI2("Mullā Ṣadrā Shīrāzī"),
      {
        source:
          "S.H. Nasr, Ṣadr al-Dīn Shīrāzī and His Transcendent Theosophy (Tehran, 1978)",
      },
    ],
  },
  {
    id: "ahmad-baba",
    kind: "person",
    lane: "scholars",
    name: "Aḥmad Bābā al-Timbuktī",
    arabic: "أحمد بابا التمبكتي",
    start: {
      year: 1556,
      precision: "year",
      hijri: { year: 963, source: "attested" },
    },
    end: {
      year: 1627,
      precision: "year",
      hijri: { year: 1036, source: "attested" },
    },
    importance: 3,
    region: "west-africa",
    location: { name: "Timbuktu", lat: 16.77, lng: -3.01 },
    summary:
      "The most famous scholar of Songhai-era Timbuktu. Deported to Marrakesh after the Moroccan conquest of 1591, he taught there for years before returning; his biographical dictionary and his fatwa against enslaving free Muslims traveled far beyond West Africa.",
    relations: [
      { type: "related", target: "songhai-empire" },
      { type: "related", target: "sankore-timbuktu" },
      {
        type: "related",
        target: "battle-of-tondibi",
        note: "exiled in its aftermath",
      },
    ],
    citations: [
      {
        source:
          "John O. Hunwick, Timbuktu and the Songhay Empire (Brill, 1999)",
      },
      EI2("Aḥmad Bābā"),
    ],
  },
  {
    id: "abd-al-rauf-al-sinkili",
    kind: "person",
    lane: "scholars",
    name: "ʿAbd al-Raʾūf al-Sinkīlī",
    arabic: "عبد الرؤوف السنكيلي",
    start: { year: 1615, precision: "circa" },
    end: { year: 1693, precision: "circa" },
    importance: 2,
    region: "southeast-asia",
    location: { name: "Aceh", lat: 5.55, lng: 95.32 },
    summary:
      "Acehnese scholar trained in Arabia for nearly two decades; as chief religious authority of Aceh he produced the Tarjumān al-Mustafīd, the first complete Qurʾan commentary in Malay.",
    relations: [
      { type: "wrote", target: "tarjuman-al-mustafid" },
      { type: "related", target: "aceh-sultanate" },
    ],
    citations: [
      {
        source:
          "Peter Riddell, Islam and the Malay-Indonesian World (Hurst, 2001)",
      },
      {
        source:
          "Azyumardi Azra, The Origins of Islamic Reformism in Southeast Asia (Allen & Unwin/UH Press, 2004)",
      },
    ],
  },
  {
    id: "shah-waliullah",
    kind: "person",
    lane: "scholars",
    name: "Shāh Walīullāh al-Dihlawī",
    arabic: "شاه ولي الله الدهلوي",
    start: {
      year: 1703,
      precision: "year",
      hijri: { year: 1114, source: "attested" },
    },
    end: {
      year: 1762,
      precision: "year",
      hijri: { year: 1176, source: "attested" },
    },
    importance: 4,
    region: "south-asia",
    location: { name: "Delhi", lat: 28.61, lng: 77.21 },
    summary:
      "Delhi's great hadith scholar and reformer in the twilight of Mughal power; translated the Qurʾan into Persian and wrote Ḥujjat Allāh al-Bāligha on the purposes of the law. Nearly every later South Asian Islamic current claims his lineage.",
    relations: [
      { type: "wrote", target: "hujjat-allah-al-baligha" },
      {
        type: "related",
        target: "mughal-empire",
        note: "witnessed the empire's decline",
      },
    ],
    citations: [
      EI2("al-Dihlawī, Shāh Walī Allāh", "A.S. Bazmee Ansari"),
      {
        source:
          "J.M.S. Baljon, Religion and Thought of Shāh Walī Allāh (Brill, 1986)",
      },
    ],
  },
  {
    id: "ibn-abd-al-wahhab",
    kind: "person",
    lane: "scholars",
    name: "Muḥammad ibn ʿAbd al-Wahhāb",
    arabic: "محمد بن عبد الوهاب",
    start: {
      year: 1703,
      precision: "year",
      hijri: { year: 1115, source: "attested" },
    },
    end: {
      year: 1792,
      precision: "year",
      hijri: { year: 1206, source: "attested" },
    },
    importance: 4,
    region: "arabia",
    location: { name: "Diriyah", lat: 24.73, lng: 46.57 },
    summary:
      "Najdī reformer who preached a strict return to tawḥīd and campaigned against practices he considered idolatrous. His 1744 pact with Muḥammad ibn Saʿūd founded the first Saudi state; his movement remains influential and contested.",
    relations: [
      { type: "wrote", target: "kitab-al-tawhid" },
      {
        type: "related",
        target: "emirate-of-diriyah",
        note: "religious partner of the founding pact",
      },
      {
        type: "influenced",
        target: "ibn-taymiyya",
        note: "drew heavily on his works (reverse influence)",
      },
    ],
    citations: [
      EI2("Ibn ʿAbd al-Wahhāb", "H. Laoust"),
      { source: 'Michael Cook, "On the Origins of Wahhābism", JRAS 2 (1992)' },
    ],
  },
  {
    id: "al-shawkani",
    kind: "person",
    lane: "scholars",
    name: "al-Shawkānī",
    arabic: "الشوكاني",
    start: {
      year: 1759,
      precision: "year",
      hijri: { year: 1173, source: "attested" },
    },
    end: {
      year: 1834,
      precision: "year",
      hijri: { year: 1250, source: "attested" },
    },
    importance: 3,
    region: "arabia",
    location: { name: "Sanaa", lat: 15.35, lng: 44.21 },
    summary:
      "Chief judge of Yemen who argued against blind imitation (taqlīd) and for direct engagement with Qurʾan and Sunna; his Nayl al-Awṭār remains a standard reference of comparative law.",
    citations: [
      EI2("al-Shawkānī"),
      {
        source:
          "Bernard Haykel, Revival and Reform in Islam: The Legacy of Muhammad al-Shawkānī (Cambridge, 2003)",
      },
    ],
  },
  {
    id: "usman-dan-fodio",
    kind: "person",
    lane: "scholars",
    name: "ʿUthmān dan Fodio",
    arabic: "عثمان بن فودي",
    aliases: ["Usman dan Fodio", "Shehu"],
    start: {
      year: 1754,
      precision: "year",
      hijri: { year: 1168, source: "attested" },
    },
    end: {
      year: 1817,
      precision: "year",
      hijri: { year: 1232, source: "attested" },
    },
    importance: 4,
    region: "west-africa",
    location: { name: "Sokoto", lat: 13.06, lng: 5.24 },
    summary:
      "Fulani scholar-preacher whose 1804 jihad against the Hausa rulers created the Sokoto Caliphate, the largest state in 19th-century West Africa; a prolific author in Arabic and Fulfulde, as were his brother and his daughter Nana Asmaʾu.",
    relations: [{ type: "founded", target: "sokoto-caliphate" }],
    citations: [
      {
        source:
          "Mervyn Hiskett, The Sword of Truth: The Life and Times of the Shehu Usuman dan Fodio (OUP, 1973)",
      },
      {
        source:
          "Nehemia Levtzion & Randall Pouwels (eds.), The History of Islam in Africa (Ohio UP, 2000)",
      },
    ],
  },
  {
    id: "muhammad-abduh",
    kind: "person",
    lane: "scholars",
    name: "Muḥammad ʿAbduh",
    arabic: "محمد عبده",
    start: {
      year: 1849,
      precision: "year",
      hijri: { year: 1266, source: "attested" },
    },
    end: {
      year: 1905,
      precision: "year",
      hijri: { year: 1323, source: "attested" },
    },
    importance: 3,
    region: "egypt-north-africa",
    location: { name: "Cairo", lat: 30.04, lng: 31.24 },
    summary:
      "Grand Mufti of Egypt and central figure of Islamic modernism, arguing that revelation and reason are allies; his students and journal al-Manār spread reformist ideas across the Muslim world.",
    relations: [
      { type: "related", target: "al-azhar", note: "reformer within al-Azhar" },
    ],
    citations: [
      EI2("Muḥammad ʿAbduh", "J. Schacht"),
      {
        source:
          "Albert Hourani, Arabic Thought in the Liberal Age (Cambridge, 1983)",
      },
    ],
  },
  {
    id: "muhammad-iqbal",
    kind: "person",
    lane: "culture",
    name: "Muḥammad Iqbāl",
    arabic: "محمد إقبال",
    start: { year: 1877, precision: "year" },
    end: {
      year: 1938,
      precision: "year",
      hijri: { year: 1357, source: "attested" },
    },
    importance: 3,
    region: "south-asia",
    location: { name: "Lahore", lat: 31.55, lng: 74.34 },
    summary:
      "Poet-philosopher of Lahore writing in Urdu and Persian; his call for Muslim self-realization and a separate polity in northwest India made him the intellectual father of Pakistan.",
    relations: [{ type: "related", target: "partition-pakistan" }],
    citations: [
      EI2("Iḳbāl, Muḥammad", "A. Schimmel"),
      { source: "Annemarie Schimmel, Gabriel's Wing (Brill, 1963)" },
    ],
  },
  {
    id: "said-nursi",
    kind: "person",
    lane: "scholars",
    name: "Badīʿuzzamān Saʿīd Nursî",
    arabic: "بديع الزمان سعيد النورسي",
    start: { year: 1877, precision: "circa", note: "1876–1878 reported." },
    end: {
      year: 1960,
      precision: "year",
      hijri: { year: 1379, source: "attested" },
    },
    importance: 3,
    region: "anatolia-balkans",
    location: { name: "Urfa", lat: 37.16, lng: 38.79 },
    summary:
      "Kurdish-Ottoman scholar whose Risale-i Nur, written largely in internal exile in the early Turkish Republic, argued faith through reflection on the cosmos; his readership became one of modern Turkey's most significant religious movements.",
    citations: [
      {
        source:
          "Şükran Vahide, Islam in Modern Turkey: An Intellectual Biography of Bediuzzaman Said Nursi (SUNY, 2005)",
      },
    ],
  },
  {
    id: "hamka",
    kind: "person",
    lane: "scholars",
    name: "Hamka (Haji Abdul Malik Karim Amrullah)",
    arabic: "حمكا",
    start: { year: 1908, precision: "year" },
    end: {
      year: 1981,
      precision: "year",
      hijri: { year: 1401, source: "attested" },
    },
    importance: 3,
    region: "southeast-asia",
    location: { name: "Jakarta", lat: -6.2, lng: 106.85 },
    summary:
      "Indonesian scholar, novelist, and first chairman of the Indonesian Ulema Council; his Tafsir al-Azhar, begun during political imprisonment, is the landmark modern Qurʾan commentary in Indonesian.",
    relations: [{ type: "related", target: "muhammadiyah" }],
    citations: [
      {
        source:
          "M.C. Ricklefs, A History of Modern Indonesia since c. 1200 (Palgrave, 4th ed. 2008)",
      },
    ],
  },
  {
    id: "ibn-baz",
    kind: "person",
    lane: "scholars",
    name: "ʿAbd al-ʿAzīz ibn Bāz",
    arabic: "عبد العزيز بن باز",
    start: {
      year: 1912,
      precision: "year",
      hijri: { year: 1330, source: "attested" },
    },
    end: {
      year: 1999,
      precision: "year",
      hijri: { year: 1420, source: "attested" },
    },
    importance: 3,
    region: "arabia",
    location: { name: "Riyadh", lat: 24.71, lng: 46.68 },
    summary:
      "Blind from young adulthood, he rose to become Grand Mufti of Saudi Arabia (1993–1999) and one of the most widely consulted jurists of the late 20th century.",
    citations: [
      {
        source:
          "General Presidency of Scholarly Research and Iftāʾ (Saudi Arabia)",
        detail: "official biography",
      },
    ],
  },
  {
    id: "al-albani",
    kind: "person",
    lane: "scholars",
    name: "Muḥammad Nāṣir al-Dīn al-Albānī",
    arabic: "محمد ناصر الدين الألباني",
    start: {
      year: 1914,
      precision: "year",
      hijri: { year: 1333, source: "attested" },
    },
    end: {
      year: 1999,
      precision: "year",
      hijri: { year: 1420, source: "attested" },
    },
    importance: 3,
    region: "levant",
    location: { name: "Damascus", lat: 33.51, lng: 36.29 },
    places: [
      { name: "Shkodër, Albania (birth)", lat: 42.07, lng: 19.51 },
      { name: "Damascus (formation)", lat: 33.51, lng: 36.29 },
      { name: "Amman (death)", lat: 31.95, lng: 35.93 },
    ],
    summary:
      "Albanian-born, self-trained hadith specialist who re-graded thousands of reports and argued for following authenticated hadith over school tradition, widely influential and widely debated.",
    citations: [
      {
        source:
          'Stéphane Lacroix, "Between Revolution and Apoliticism: al-Albani and his Impact", in Global Salafism (Hurst/OUP, 2009)',
      },
    ],
  },
  {
    id: "ibn-uthaymin",
    kind: "person",
    lane: "scholars",
    name: "Muḥammad ibn al-ʿUthaymīn",
    arabic: "محمد بن العثيمين",
    start: {
      year: 1929,
      precision: "year",
      hijri: { year: 1347, source: "attested" },
    },
    end: {
      year: 2001,
      precision: "year",
      hijri: { year: 1421, source: "attested" },
    },
    importance: 3,
    region: "arabia",
    location: { name: "Unayzah", lat: 26.09, lng: 43.99 },
    summary:
      "Saudi jurist of Unayzah famed for clear legal teaching; his commentaries, including on Ibn Taymiyya's al-ʿAqīda al-Wāsiṭiyya, circulate worldwide.",
    relations: [
      {
        type: "related",
        target: "aqida-wasitiyya",
        note: "author of a widely used commentary",
      },
    ],
    citations: [
      {
        source:
          "General Presidency of Scholarly Research and Iftāʾ (Saudi Arabia)",
        detail: "official biography",
      },
    ],
  },
  {
    id: "salih-al-fawzan",
    kind: "person",
    lane: "scholars",
    name: "Ṣāliḥ al-Fawzān",
    arabic: "صالح الفوزان",
    start: {
      year: 1935,
      precision: "circa",
      hijri: { year: 1354, source: "attested" },
      note: "Born 1354 AH; CE equivalent approximate.",
    },
    ongoing: true,
    importance: 2,
    region: "arabia",
    location: { name: "Riyadh", lat: 24.71, lng: 46.68 },
    summary:
      "Senior Saudi jurist, member of the Council of Senior Scholars and the Permanent Committee for Iftāʾ; author of widely used creed and fiqh textbooks.",
    citations: [
      {
        source:
          "General Presidency of Scholarly Research and Iftāʾ (Saudi Arabia)",
        detail: "official biography",
      },
    ],
  },
];

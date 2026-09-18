/**
 * Schools of law and theology, intellectual and spiritual movements,
 * plus remaining regional records and modern events.
 * Long-lived movements render as quiet spans in the scholars lane.
 */
import type { TimelineRecord } from "@/lib/types";

const EI2 = (entry: string, author?: string) => ({
  source: "Encyclopaedia of Islam, 2nd ed. (Brill)",
  detail: `s.v. "${entry}"${author ? ` (${author})` : ""}`,
});
const MELCHERT = {
  source:
    "Christopher Melchert, The Formation of the Sunni Schools of Law (Brill, 1997)",
};

export const movementRegionalRecords: TimelineRecord[] = [
  /* ------------------------- schools of law ------------------------- */
  {
    id: "hanafi-school",
    kind: "movement",
    lane: "scholars",
    name: "Ḥanafī school",
    arabic: "المذهب الحنفي",
    start: {
      year: 767,
      precision: "circa",
      note: "Dated here from Abū Ḥanīfa's death; schools crystallized gradually over the following two centuries.",
    },
    ongoing: true,
    importance: 3,
    region: "iraq-iran",
    location: { name: "Kufa", lat: 32.03, lng: 44.4 },
    summary:
      "The most widely followed school of Sunni law, carried by Abbasid judges, Seljuk and Ottoman patronage, and Central & South Asian adoption from the Balkans to Bengal.",
    relations: [{ type: "founded_by", target: "abu-hanifa" }],
    citations: [MELCHERT, EI2("Ḥanafiyya")],
  },
  {
    id: "maliki-school",
    kind: "movement",
    lane: "scholars",
    name: "Mālikī school",
    arabic: "المذهب المالكي",
    start: {
      year: 795,
      precision: "circa",
      note: "Dated here from Mālik's death; crystallization was gradual.",
    },
    ongoing: true,
    importance: 3,
    region: "andalus-maghrib",
    location: { name: "Madinah", lat: 24.47, lng: 39.61 },
    summary:
      "The law of Madinah's practice, which became the school of al-Andalus and virtually all of North and West Africa, the fiqh of Córdoba, Fez, Kairouan, and Timbuktu alike.",
    relations: [{ type: "founded_by", target: "malik-ibn-anas" }],
    citations: [MELCHERT, EI2("Mālikiyya")],
  },
  {
    id: "shafii-school",
    kind: "movement",
    lane: "scholars",
    name: "Shāfiʿī school",
    arabic: "المذهب الشافعي",
    start: {
      year: 820,
      precision: "circa",
      note: "Dated here from al-Shāfiʿī's death.",
    },
    ongoing: true,
    importance: 3,
    region: "egypt-north-africa",
    location: { name: "Cairo", lat: 30.04, lng: 31.24 },
    summary:
      "Dominant historically in Egypt, the Levant, Yemen, East Africa, and Southeast Asia, the school of al-Nawawī, Ibn Ḥajar, and the Malay world's madrasas.",
    relations: [{ type: "founded_by", target: "al-shafii" }],
    citations: [MELCHERT, EI2("al-Shāfiʿiyya")],
  },
  {
    id: "hanbali-school",
    kind: "movement",
    lane: "scholars",
    name: "Ḥanbalī school",
    arabic: "المذهب الحنبلي",
    start: {
      year: 855,
      precision: "circa",
      note: "Dated here from Aḥmad's death.",
    },
    ongoing: true,
    importance: 3,
    region: "iraq-iran",
    location: { name: "Baghdad", lat: 33.34, lng: 44.4 },
    summary:
      "The smallest classical school, Baghdad's, then Damascus's, tradition of strict textualism and creed, home to Ibn Qudāma, Ibn Taymiyya, and Ibn al-Qayyim; today the official school of Saudi Arabia.",
    relations: [
      { type: "founded_by", target: "ahmad-ibn-hanbal" },
      { type: "related", target: "ibn-taymiyya" },
    ],
    citations: [MELCHERT, EI2("Ḥanābila")],
  },
  /* ------------------------ theology & sufism ------------------------ */
  {
    id: "mutazila",
    kind: "movement",
    lane: "scholars",
    name: "Muʿtazila",
    arabic: "المعتزلة",
    start: {
      year: 748,
      precision: "circa",
      note: "Emerging in Basra in the early 8th century; dating conventional.",
    },
    end: {
      year: 1100,
      precision: "circa",
      note: "Gradual decline after the 11th century; ideas persisted in other traditions.",
    },
    importance: 3,
    region: "iraq-iran",
    location: { name: "Basra", lat: 30.51, lng: 47.81 },
    summary:
      "The rationalist theologians of Basra and Baghdad, champions of divine justice and the created Qurʾan, ascendant during the miḥna, then eclipsed by Ashʿarī and Ḥanbalī reactions.",
    relations: [{ type: "related", target: "mihna" }],
    citations: [EI2("Muʿtazila", "D. Gimaret")],
  },
  {
    id: "mihna",
    kind: "event",
    lane: "scholars",
    name: "The Miḥna (inquisition)",
    arabic: "المحنة",
    start: {
      year: 833,
      precision: "year",
      hijri: { year: 218, source: "attested" },
    },
    end: {
      year: 848,
      precision: "circa",
      hijri: { year: 234, source: "attested" },
      note: "Wound down under al-Mutawakkil, c. 848–851.",
    },
    importance: 3,
    region: "iraq-iran",
    location: { name: "Baghdad", lat: 33.34, lng: 44.4 },
    summary:
      "Al-Maʾmūn's test compelling scholars to affirm the created Qurʾan. Aḥmad ibn Ḥanbal's endurance under flogging made him a folk hero, and helped settle, permanently, that creed belongs to scholars rather than caliphs.",
    relations: [
      { type: "related", target: "ahmad-ibn-hanbal" },
      { type: "occurred_under", target: "abbasid-caliphate" },
    ],
    citations: [EI2("Miḥna", "M. Hinds")],
  },
  {
    id: "ashari-school",
    kind: "movement",
    lane: "scholars",
    name: "Ashʿarī theology",
    arabic: "المدرسة الأشعرية",
    start: {
      year: 936,
      precision: "circa",
      note: "Dated from al-Ashʿarī's death; school consolidated over the next two centuries.",
    },
    ongoing: true,
    importance: 3,
    region: "iraq-iran",
    location: { name: "Baghdad", lat: 33.34, lng: 44.4 },
    summary:
      "The dominant Sunni theological method of the central and western lands, al-Juwaynī, al-Ghazālī, and al-Rāzī its most famous voices.",
    relations: [{ type: "founded_by", target: "al-ashari" }],
    citations: [EI2("Ashʿariyya", "W. Montgomery Watt")],
  },
  {
    id: "maturidi-school",
    kind: "movement",
    lane: "scholars",
    name: "Māturīdī theology",
    arabic: "المدرسة الماتريدية",
    start: {
      year: 944,
      precision: "circa",
      note: "Dated from al-Māturīdī's death.",
    },
    ongoing: true,
    importance: 3,
    region: "central-asia",
    location: { name: "Samarkand", lat: 39.65, lng: 66.96 },
    summary:
      "Samarkand's theological school, traveling with Ḥanafī law among Turkic peoples into the Ottoman, Central Asian, and South Asian heartlands.",
    relations: [{ type: "founded_by", target: "al-maturidi" }],
    citations: [
      EI2("Māturīdiyya"),
      {
        source:
          "Ulrich Rudolph, Al-Māturīdī and the Development of Sunnī Theology in Samarqand (Brill, 2015)",
      },
    ],
  },
  {
    id: "twelver-shiism",
    kind: "movement",
    lane: "scholars",
    name: "Twelver Shīʿism",
    arabic: "الشيعة الإثنا عشرية",
    start: {
      year: 874,
      precision: "year",
      hijri: { year: 260, source: "attested" },
      note: "Dated here from the occultation of the twelfth Imam in Twelver belief; the community's roots are earlier.",
    },
    ongoing: true,
    importance: 3,
    region: "iraq-iran",
    location: { name: "Samarra", lat: 34.2, lng: 43.87 },
    summary:
      "The largest Shīʿī tradition, organized around the line of twelve Imams; its scholarly centers (Qom, Najaf, Ḥilla) matured under Buyid patronage, and Safavid adoption (1501) made it Iran's faith.",
    relations: [
      { type: "related", target: "buyids" },
      { type: "related", target: "safavid-empire" },
    ],
    citations: [
      EI2("Ithnā ʿAshariyya"),
      {
        source: "Moojan Momen, An Introduction to Shiʿi Islam (Yale UP, 1985)",
      },
    ],
  },
  {
    id: "sufi-orders",
    kind: "movement",
    lane: "scholars",
    name: "Sufi orders (ṭuruq) formalize",
    arabic: "الطرق الصوفية",
    start: {
      year: 1150,
      precision: "circa",
      note: "Orders crystallized gradually from the 12th century (Qādiriyya, Suhrawardiyya, later Naqshbandiyya, Shādhiliyya…).",
    },
    ongoing: true,
    importance: 3,
    region: "iraq-iran",
    location: { name: "Baghdad", lat: 33.34, lng: 44.4 },
    summary:
      "From the 12th century, Sufi teaching lineages organized into orders with lodges and chains of transmission, for centuries the main vehicle of Islam's spread in Africa, Central Asia, India, and Southeast Asia.",
    relations: [
      { type: "related", target: "abd-al-qadir-al-jilani" },
      { type: "related", target: "rumi" },
    ],
    citations: [
      {
        source:
          "J. Spencer Trimingham, The Sufi Orders in Islam (Oxford, 1971)",
      },
      {
        source: "Nile Green, Sufism: A Global History (Wiley-Blackwell, 2012)",
      },
    ],
  },
  {
    id: "translation-movement",
    kind: "movement",
    lane: "science",
    name: "Greco-Arabic translation movement",
    arabic: "حركة الترجمة",
    start: { year: 750, precision: "circa" },
    end: {
      year: 950,
      precision: "circa",
      note: "Core activity 8th–10th centuries; conventional bounds.",
    },
    importance: 4,
    region: "iraq-iran",
    location: { name: "Baghdad", lat: 33.34, lng: 44.4 },
    summary:
      "Two centuries of systematic translation, Greek, Syriac, Persian, Sanskrit into Arabic, funded by caliphs, courtiers, and merchants: nearly the whole scientific and philosophical heritage of antiquity, made Arabic.",
    relations: [
      { type: "related", target: "bayt-al-hikma" },
      { type: "occurred_under", target: "abbasid-caliphate" },
    ],
    citations: [
      {
        source:
          "Dimitri Gutas, Greek Thought, Arabic Culture (Routledge, 1998)",
      },
    ],
  },
  /* -------------------- remaining books & figures -------------------- */
  {
    id: "shahnameh",
    kind: "book",
    lane: "books",
    name: "Shāhnāma",
    arabic: "شاهنامه",
    start: {
      year: 1010,
      precision: "year",
      hijri: { year: 400, source: "attested" },
      note: "Completed 8 March 1010 per the poet's own dating.",
    },
    importance: 4,
    region: "iraq-iran",
    location: { name: "Tus", lat: 36.49, lng: 59.51 },
    summary:
      "Firdawsī's Book of Kings, the national epic of the Persian-speaking world, completed under Maḥmūd of Ghazna, and the anchor of Persian as Islam's second great literary language.",
    relations: [
      { type: "written_by", target: "ferdowsi" },
      { type: "related", target: "ghaznavids" },
    ],
    citations: [EI2("Firdawsī", "Cl. Huart & H. Massé")],
  },
  {
    id: "kutadgu-bilig",
    kind: "book",
    lane: "books",
    name: "Kutadgu Bilig",
    arabic: "كوتادغو بيليغ",
    start: {
      year: 1069,
      precision: "year",
      hijri: { year: 462, source: "attested" },
    },
    importance: 2,
    region: "central-asia",
    location: { name: "Kashgar", lat: 39.47, lng: 75.99 },
    summary:
      'Yūsuf Khāṣṣ Ḥājib\'s "Wisdom of Royal Glory", written at the Qarakhanid court, the first major Islamic work in a Turkic language, opening the third great literary tradition of the Muslim world.',
    relations: [{ type: "occurred_under", target: "qarakhanids" }],
    citations: [
      {
        source:
          "Robert Dankoff (tr.), Wisdom of Royal Glory (Chicago UP, 1983)",
      },
    ],
  },
  {
    id: "shajar-al-durr",
    kind: "person",
    lane: "states",
    name: "Shajar al-Durr",
    arabic: "شجر الدر",
    start: {
      year: 1220,
      precision: "circa",
      note: "Birth unrecorded; a Turkic slave who rose through the Ayyubid household.",
    },
    end: {
      year: 1257,
      precision: "year",
      hijri: { year: 655, source: "attested" },
    },
    importance: 3,
    region: "egypt-north-africa",
    location: { name: "Cairo", lat: 30.04, lng: 31.24 },
    summary:
      "Sultana of Egypt in 1250, she managed the defeat of Louis IX's crusade while concealing her husband's death, struck coins in her own name, and bridged the Ayyubid–Mamluk transition.",
    relations: [
      { type: "related", target: "ayyubids" },
      {
        type: "related",
        target: "mamluk-sultanate",
        note: "her reign begins the Mamluk era",
      },
    ],
    citations: [EI2("Shadjar al-Durr", "L. Ammann")],
  },
  {
    id: "mansa-musa-hajj",
    kind: "event",
    lane: "culture",
    name: "Mansa Mūsā's pilgrimage",
    arabic: "حج منسا موسى",
    start: {
      year: 1324,
      precision: "year",
      hijri: { year: 724, source: "attested" },
      note: "Outward journey 1324; return 1325–26.",
    },
    importance: 4,
    region: "west-africa",
    location: { name: "Cairo (famous stop)", lat: 30.04, lng: 31.24 },
    summary:
      "The Mali emperor crossed Africa with tons of gold, spending so lavishly in Cairo that chroniclers report the metal's value sagged for years, and returned with scholars and architects for Timbuktu.",
    relations: [
      { type: "part_of", target: "mali-empire" },
      { type: "related", target: "sankore-timbuktu" },
    ],
    citations: [
      {
        source: "al-ʿUmarī, Masālik al-abṣār",
        detail: "primary account of the Cairo visit",
      },
      { source: "Nehemia Levtzion, Ancient Ghana and Mali (Methuen, 1973)" },
    ],
  },
  /* ------------------------- modern movements ------------------------ */
  {
    id: "deoband",
    kind: "institution",
    lane: "scholars",
    name: "Dār al-ʿUlūm Deoband",
    arabic: "دار العلوم ديوبند",
    start: {
      year: 1866,
      precision: "year",
      hijri: { year: 1283, source: "attested" },
    },
    ongoing: true,
    importance: 2,
    region: "south-asia",
    location: { name: "Deoband", lat: 29.7, lng: 77.68 },
    summary:
      "The seminary founded after 1857 to preserve Islamic learning without state patronage, seed of the Deobandi movement and thousands of madrasas across South Asia and its diaspora.",
    relations: [
      {
        type: "related",
        target: "shah-waliullah",
        note: "claims his intellectual lineage",
      },
    ],
    citations: [
      {
        source:
          "Barbara D. Metcalf, Islamic Revival in British India: Deoband, 1860–1900 (Princeton, 1982)",
      },
    ],
  },
  {
    id: "aligarh",
    kind: "institution",
    lane: "scholars",
    name: "Aligarh movement (MAO College)",
    arabic: "حركة عليكرة",
    start: {
      year: 1875,
      precision: "year",
      hijri: { year: 1292, source: "attested" },
    },
    ongoing: true,
    importance: 2,
    region: "south-asia",
    location: { name: "Aligarh", lat: 27.9, lng: 78.08 },
    summary:
      "Sayyid Aḥmad Khān's college joining Islamic identity to modern science and English education, Deoband's great counterpoint, and the nursery of South Asian Muslim modernism.",
    citations: [
      {
        source: "David Lelyveld, Aligarh's First Generation (Princeton, 1978)",
      },
    ],
  },
  {
    id: "muhammadiyah",
    kind: "movement",
    lane: "scholars",
    name: "Muhammadiyah",
    arabic: "المحمدية",
    start: {
      year: 1912,
      precision: "year",
      hijri: { year: 1330, source: "attested" },
    },
    ongoing: true,
    importance: 2,
    region: "southeast-asia",
    location: { name: "Yogyakarta", lat: -7.8, lng: 110.36 },
    summary:
      "Indonesia's modernist mass organization, tens of millions of members, thousands of schools, universities, and hospitals: religious reform as social infrastructure.",
    citations: [
      {
        source:
          "M.C. Ricklefs, A History of Modern Indonesia since c. 1200 (Palgrave, 4th ed. 2008)",
      },
    ],
  },
  {
    id: "nahdlatul-ulama",
    kind: "movement",
    lane: "scholars",
    name: "Nahdlatul Ulama",
    arabic: "نهضة العلماء",
    start: {
      year: 1926,
      precision: "year",
      hijri: { year: 1344, source: "attested" },
    },
    ongoing: true,
    importance: 2,
    region: "southeast-asia",
    location: { name: "Surabaya", lat: -7.25, lng: 112.75 },
    summary:
      "Founded by traditionalist ulama in Java, now often described as the world's largest Islamic organization, guardian of the pesantren tradition of learning.",
    citations: [
      {
        source:
          "M.C. Ricklefs, A History of Modern Indonesia since c. 1200 (Palgrave, 4th ed. 2008)",
      },
    ],
  },
  {
    id: "muslim-brotherhood",
    kind: "movement",
    lane: "scholars",
    name: "Muslim Brotherhood founded",
    arabic: "جماعة الإخوان المسلمين",
    start: {
      year: 1928,
      precision: "year",
      hijri: { year: 1346, source: "attested" },
    },
    ongoing: true,
    importance: 2,
    region: "egypt-north-africa",
    location: { name: "Ismailia", lat: 30.6, lng: 32.27 },
    summary:
      "Ḥasan al-Bannā's society in Ismailia grew into the 20th century's most consequential Islamic political movement, its history and assessment remain sharply contested.",
    citations: [
      {
        source:
          "Richard P. Mitchell, The Society of the Muslim Brothers (Oxford, 1969)",
      },
    ],
  },
  /* --------------------------- modern events ------------------------- */
  {
    id: "saudi-arabia-founded",
    kind: "event",
    lane: "states",
    name: "Kingdom of Saudi Arabia proclaimed",
    arabic: "توحيد المملكة العربية السعودية",
    start: {
      year: 1932,
      precision: "year",
      hijri: { year: 1351, source: "attested" },
    },
    importance: 3,
    region: "arabia",
    location: { name: "Riyadh", lat: 24.71, lng: 46.68 },
    summary:
      "ʿAbd al-ʿAzīz Āl Saʿūd united Najd and Hijaz as a single kingdom, the third Saudi state, custodian of the two sanctuaries, transformed within decades by oil (discovered 1938).",
    relations: [
      {
        type: "related",
        target: "emirate-of-diriyah",
        note: "the first Saudi state, two centuries earlier",
      },
    ],
    citations: [
      {
        source:
          "Madawi Al-Rasheed, A History of Saudi Arabia (Cambridge, 2002)",
      },
    ],
  },
  {
    id: "indonesia-independence",
    kind: "event",
    lane: "states",
    name: "Indonesian independence",
    arabic: "استقلال إندونيسيا",
    start: {
      year: 1945,
      month: 8,
      day: 17,
      precision: "exact",
      hijri: { year: 1364, source: "attested" },
    },
    importance: 2,
    region: "southeast-asia",
    location: { name: "Jakarta", lat: -6.2, lng: 106.85 },
    summary:
      "The proclamation of the republic that is today the world's most populous Muslim-majority nation, the Southeast Asian lane's modern anchor.",
    citations: [
      {
        source:
          "M.C. Ricklefs, A History of Modern Indonesia since c. 1200 (Palgrave, 4th ed. 2008)",
      },
    ],
  },
  {
    id: "partition-pakistan",
    kind: "event",
    lane: "states",
    name: "Partition of India; creation of Pakistan",
    arabic: "التقسيم وقيام باكستان",
    start: {
      year: 1947,
      month: 8,
      day: 14,
      precision: "exact",
      hijri: { year: 1366, source: "attested" },
    },
    importance: 3,
    region: "south-asia",
    location: { name: "Karachi", lat: 24.86, lng: 67.01 },
    summary:
      "British India's partition created Pakistan amid vast displacement and violence, the largest political event in modern South Asian Muslim history, ninety years after the Mughals' end.",
    relations: [
      {
        type: "related",
        target: "muhammad-iqbal",
        note: "its intellectual forerunner",
      },
    ],
    citations: [
      { source: "Ayesha Jalal, The Sole Spokesman (Cambridge, 1985)" },
    ],
  },
  {
    id: "oic-founded",
    kind: "institution",
    lane: "states",
    name: "Organisation of Islamic Cooperation founded",
    arabic: "منظمة التعاون الإسلامي",
    start: {
      year: 1969,
      precision: "year",
      hijri: { year: 1389, source: "attested" },
      note: "Founded at the Rabat summit after the al-Aqṣā arson.",
    },
    ongoing: true,
    importance: 2,
    region: "arabia",
    location: { name: "Jeddah (HQ)", lat: 21.49, lng: 39.19 },
    summary:
      "Fifty-seven member states' standing body, the modern, diplomatic echo of an old idea of Muslim collective concern, founded in response to the burning of al-Aqṣā's pulpit.",
    citations: [
      {
        source:
          "Organisation of Islamic Cooperation, Charter (1972; rev. 2008)",
      },
    ],
  },
  {
    id: "iranian-revolution",
    kind: "event",
    lane: "states",
    name: "Iranian Revolution",
    arabic: "الثورة الإيرانية",
    start: {
      year: 1979,
      precision: "year",
      hijri: { year: 1399, source: "attested" },
    },
    importance: 3,
    region: "iraq-iran",
    location: { name: "Tehran", lat: 35.69, lng: 51.39 },
    summary:
      "The overthrow of the Pahlavi monarchy and creation of the Islamic Republic, the 20th century's most consequential merger of religious authority and state power, reshaping regional politics to this day.",
    citations: [
      {
        source: "Ervand Abrahamian, A History of Modern Iran (Cambridge, 2008)",
      },
    ],
  },
];

/**
 * Schools of law (madhāhib), schools of creed (ʿaqīda), the main branches of
 * Islam, and modern currents. Rendered as labelled soft threads in the far-right
 * "schools & movements" column. Long-lived currents use precision "circa" for
 * their formative moment and run to the present (ongoing) unless historically
 * ended.
 *
 * `tags[0]` classifies the record for colour and grouping:
 *   madhhab (Sunni law) · creed · branch (of Islam) · tariqa (Sufi order) · current (modern)
 *
 * Sectarian and theological differences are described in neutral terms; this is
 * a map of traditions, not a verdict on them.
 */
import type { TimelineRecord } from "@/lib/types";

const EI2 = (entry: string, author?: string) => ({
  source: "Encyclopaedia of Islam, 2nd ed. (Brill)",
  detail: `s.v. "${entry}"${author ? ` (${author})` : ""}`,
});

export const schoolRecords: TimelineRecord[] = [
  /* ---------------------- branches of Islam ---------------------- */
  {
    id: "sunni-islam",
    kind: "movement",
    lane: "scholars",
    name: "Sunni Islam (Ahl al-Sunna)",
    arabic: "أهل السنة والجماعة",
    start: {
      year: 632,
      precision: "circa",
      note: "The Sunni current took shape gradually over the first three centuries; dated here from the start of the community.",
    },
    ongoing: true,
    importance: 4,
    region: "arabia",
    tags: ["branch"],
    summary:
      "The largest branch of Islam, which recognizes the historical caliphate and the consensus of the community, and whose law is organized in the four surviving Sunni schools and whose creed runs mainly through the Atharī, Ashʿarī, and Māturīdī traditions.",
    relations: [
      { type: "related", target: "hanafi-school" },
      { type: "related", target: "ashari-school" },
    ],
    citations: [
      EI2("Sunna", "G.H.A. Juynboll"),
      { source: "Marshall Hodgson, The Venture of Islam (Chicago UP, 1974)" },
    ],
  },
  {
    id: "shia-islam",
    kind: "movement",
    lane: "scholars",
    name: "Shīʿī Islam (Shīʿat ʿAlī)",
    arabic: "شيعة علي",
    start: {
      year: 632,
      precision: "circa",
      note: "Rooted in the question of succession after the Prophet ﷺ; crystallized over the first two centuries.",
    },
    ongoing: true,
    importance: 4,
    region: "iraq-iran",
    tags: ["branch"],
    summary:
      "The second largest branch, which holds that leadership of the community belongs to the family of the Prophet ﷺ through ʿAlī and his descendants. Its main living traditions are the Twelvers, the Ismāʿīlīs, and the Zaydīs.",
    relations: [
      { type: "related", target: "twelver-shiism" },
      { type: "related", target: "ismaili-shiism" },
      { type: "related", target: "zaydi-shiism" },
      { type: "related", target: "ali-ibn-abi-talib" },
    ],
    citations: [
      EI2("Shīʿa", "W. Madelung"),
      {
        source: "Moojan Momen, An Introduction to Shiʿi Islam (Yale UP, 1985)",
      },
    ],
  },
  {
    id: "ibadi-islam",
    kind: "movement",
    lane: "scholars",
    name: "Ibāḍī Islam",
    arabic: "الإباضية",
    start: { year: 690, precision: "circa" },
    ongoing: true,
    importance: 3,
    region: "arabia",
    location: { name: "Oman", lat: 23.6, lng: 58.5, approximate: true },
    tags: ["branch"],
    summary:
      "The third distinct branch of Islam, the moderate current that outlived the early Khārijite movement. It is the majority tradition of Oman and is also present in East Africa and North Africa, with its own school of law.",
    citations: [
      EI2("Ibāḍiyya", "T. Lewicki"),
      {
        source:
          "Valerie Hoffman, The Essentials of Ibāḍī Islam (Syracuse UP, 2012)",
      },
    ],
  },
  {
    id: "kharijites",
    kind: "movement",
    lane: "scholars",
    name: "Khawārij",
    arabic: "الخوارج",
    start: {
      year: 657,
      precision: "year",
      note: "Emerged at the arbitration of Ṣiffīn.",
    },
    end: {
      year: 900,
      precision: "circa",
      note: "The militant movement faded; the moderate Ibāḍīs continue separately.",
    },
    importance: 2,
    region: "iraq-iran",
    tags: ["branch"],
    summary:
      "The earliest sectarian movement, which broke from ʿAlī over the arbitration at Ṣiffīn and held rigorist views on leadership and sin. Its militant wing died out; the moderate Ibāḍīs are its lasting heirs.",
    relations: [
      { type: "related", target: "battle-of-siffin" },
      { type: "related", target: "ibadi-islam" },
    ],
    citations: [EI2("Khāridjites", "G. Levi Della Vida")],
  },

  /* ---------------------- schools of law ---------------------- */
  {
    id: "jafari-school",
    kind: "movement",
    lane: "scholars",
    name: "Jaʿfarī school of law",
    arabic: "المذهب الجعفري",
    start: {
      year: 765,
      precision: "circa",
      note: "Named for Jaʿfar al-Ṣādiq; the Twelver legal tradition.",
    },
    ongoing: true,
    importance: 3,
    region: "iraq-iran",
    tags: ["madhhab-shia"],
    summary:
      "The main school of Twelver Shīʿī law, named for the Imam Jaʿfar al-Ṣādiq. It differs from the Sunni schools on sources and details and is the law of Iran, Iraq's shrine cities, and Shīʿī communities worldwide.",
    relations: [
      { type: "founded_by", target: "jafar-al-sadiq" },
      { type: "related", target: "twelver-shiism" },
    ],
    citations: [
      EI2("Djaʿfar al-Ṣādiḳ", "M.G.S. Hodgson"),
      {
        source: "Moojan Momen, An Introduction to Shiʿi Islam (Yale UP, 1985)",
      },
    ],
  },
  {
    id: "zahiri-school",
    kind: "movement",
    lane: "scholars",
    name: "Ẓāhirī school of law",
    arabic: "المذهب الظاهري",
    start: {
      year: 883,
      precision: "circa",
      note: "Founded by Dāwūd al-Ẓāhirī (d. 883); its great voice was Ibn Ḥazm.",
    },
    end: {
      year: 1400,
      precision: "circa",
      note: "Faded as a living school after the Middle Ages, though its texts are still read.",
    },
    importance: 2,
    region: "andalus-maghrib",
    tags: ["madhhab"],
    summary:
      "The literalist school that rejected analogy in favour of the plain sense of Qurʾan and Sunna. Never widely followed, it produced one towering figure in al-Andalus, Ibn Ḥazm, before dying out as a practised school.",
    relations: [{ type: "related", target: "ibn-hazm" }],
    citations: [EI2("Ẓāhiriyya", "R. Strothmann/[J. Schacht]")],
  },

  /* ---------------------- schools of creed ---------------------- */
  {
    id: "athari-creed",
    kind: "movement",
    lane: "scholars",
    name: "Atharī creed (ahl al-ḥadīth)",
    arabic: "مذهب الأثر (أهل الحديث)",
    start: {
      year: 855,
      precision: "circa",
      note: "The traditionist theology associated with Aḥmad ibn Ḥanbal and the ahl al-ḥadīth.",
    },
    ongoing: true,
    importance: 3,
    region: "iraq-iran",
    tags: ["creed"],
    summary:
      "The traditionist approach to creed, which affirms the texts of Qurʾan and hadith on God's attributes without speculative interpretation. Associated with Aḥmad ibn Ḥanbal and later Ibn Taymiyya, it is the third great Sunni creedal tradition beside the Ashʿarīs and Māturīdīs.",
    relations: [
      { type: "related", target: "ahmad-ibn-hanbal" },
      { type: "related", target: "ibn-taymiyya" },
    ],
    citations: [
      EI2("Ḥanābila", "H. Laoust"),
      {
        source:
          "Binyamin Abrahamov, Islamic Theology: Traditionalism and Rationalism (Edinburgh UP, 1998)",
      },
    ],
  },
  {
    id: "zaydi-shiism",
    kind: "movement",
    lane: "scholars",
    name: "Zaydī Shīʿism",
    arabic: "الزيدية",
    start: {
      year: 740,
      precision: "circa",
      note: "Named for Zayd ibn ʿAlī (d. 740).",
    },
    ongoing: true,
    importance: 2,
    region: "arabia",
    location: {
      name: "Yemen highlands",
      lat: 15.35,
      lng: 44.21,
      approximate: true,
    },
    tags: ["branch"],
    summary:
      "The Shīʿī tradition closest to Sunnism in law and theology, which founded a long-lived imamate in the highlands of Yemen. Named for Zayd ibn ʿAlī, grandson of al-Ḥusayn.",
    relations: [{ type: "related", target: "shia-islam" }],
    citations: [EI2("Zaydiyya", "W. Madelung")],
  },
  {
    id: "ismaili-shiism",
    kind: "movement",
    lane: "scholars",
    name: "Ismāʿīlī Shīʿism",
    arabic: "الإسماعيلية",
    start: { year: 765, precision: "circa" },
    ongoing: true,
    importance: 3,
    region: "egypt-north-africa",
    tags: ["branch"],
    summary:
      "The Shīʿī tradition of the sevener line, which built the Fatimid caliphate and al-Azhar and developed a rich esoteric philosophy. It continues today in several communities, including the Nizārīs led by the Aga Khan.",
    relations: [
      { type: "related", target: "fatimid-caliphate" },
      { type: "related", target: "shia-islam" },
    ],
    citations: [
      EI2("Ismāʿīliyya", "W. Madelung"),
      {
        source:
          "Farhad Daftary, The Ismāʿīlīs: Their History and Doctrines (Cambridge, 2nd ed. 2007)",
      },
    ],
  },

  /* ---------------------- modern currents ---------------------- */
  {
    id: "salafiyya",
    kind: "movement",
    lane: "scholars",
    name: "Salafī current",
    arabic: "السلفية",
    start: {
      year: 1900,
      precision: "circa",
      note: "A modern current claiming to follow the earliest generations (al-salaf); its usage and boundaries are debated.",
    },
    ongoing: true,
    importance: 2,
    region: "arabia",
    tags: ["current"],
    summary:
      "A modern reform current that calls for a return to the practice of the earliest generations and direct engagement with Qurʾan and hadith. A broad and internally varied label, discussed and disputed by scholars and observers alike.",
    relations: [
      { type: "related", target: "ibn-abd-al-wahhab" },
      { type: "related", target: "athari-creed" },
    ],
    citations: [
      {
        source:
          "Roel Meijer (ed.), Global Salafism: Islam's New Religious Movement (Hurst/OUP, 2009)",
      },
    ],
  },
  {
    id: "barelvi",
    kind: "movement",
    lane: "scholars",
    name: "Barelvī movement",
    arabic: "البريلوية",
    start: { year: 1880, precision: "circa" },
    ongoing: true,
    importance: 2,
    region: "south-asia",
    location: { name: "Bareilly", lat: 28.37, lng: 79.43 },
    tags: ["current"],
    summary:
      "A South Asian Sunni movement, founded around Aḥmad Riḍā Khān of Bareilly, that defends traditional devotional practice and love of the Prophet ﷺ. It stands as the counterpart to the Deobandi movement across the subcontinent.",
    relations: [{ type: "related", target: "deoband" }],
    citations: [
      {
        source:
          "Usha Sanyal, Devotional Islam and Politics in British India: Ahmad Riza Khan Barelwi (Oxford, 1996)",
      },
    ],
  },
];

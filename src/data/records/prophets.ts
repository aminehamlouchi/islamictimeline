/**
 * The prophets before Muḥammad ﷺ, عليهم السلام.
 *
 * DATING POLICY (see the Methodology page):
 * · Islamic tradition preserves the ORDER of the prophets, not their dates.
 * · precision "unknown": the record has NO dating at all. Its `year` is a
 * layout slot inside the ordinal band and the UI never shows a year.
 * · precision "disputed"/"circa" (BCE values): conventional traditional
 * associations only (e.g. Mūsā ~ 13th c. BCE Egypt), flagged as disputed, * not historically established.
 * · ʿĪsā عليه السلام and his contemporaries carry ordinary scholarly dating.
 *
 * Sources given per record; general references:
 * Qurʾan (cited by sūra:āya) · Ibn Kathīr, Qiṣaṣ al-anbiyāʾ ·
 * al-Ṭabarī, Tārīkh, vol. 1 · Brannon Wheeler, Prophets in the Quran (2002).
 */
import type { TimelineRecord } from "@/lib/types";

const QISAS = {
  source: "Ibn Kathīr, Qiṣaṣ al-anbiyāʾ",
  detail: "primary (traditional) source",
};
const TABARI1 = {
  source: "al-Ṭabarī, Tārīkh al-rusul wa-l-mulūk, vol. 1",
  detail: "primary (traditional) source",
};
const WHEELER = {
  source: "Brannon Wheeler, Prophets in the Quran (Continuum, 2002)",
};
const EI2 = (entry: string) => ({
  source: "Encyclopaedia of Islam, 2nd ed. (Brill)",
  detail: `s.v. "${entry}"`,
});
const Q = (ref: string) => ({ source: `Qurʾan ${ref}` });

export const prophetRecords: TimelineRecord[] = [
  /* ---------------- ordinal band: dating unknown, order only ---------------- */
  {
    id: "prophet-adam",
    kind: "person",
    lane: "sirah",
    name: "Ādam عليه السلام",
    arabic: "آدم عليه السلام",
    aliases: ["Adam"],
    start: {
      year: -4200,
      precision: "unknown",
      note: "No dating exists. Placed first by revelation and universal tradition; the position on this line is an ordering slot, not a date.",
    },
    importance: 5,
    region: "arabia",
    summary:
      "The first human being, created by God's own hand, and the first prophet, father of humankind, taught the names of all things (Q 2:31). Where this timeline's every other position is measured, his is simply first: the origin of the whole line.",
    relations: [
      {
        type: "related",
        target: "prophet-nuh",
        note: "tradition counts ten generations between them",
      },
    ],
    citations: [Q("2:30–37"), QISAS, TABARI1, EI2("Ādam")],
  },
  {
    id: "prophet-idris",
    kind: "person",
    lane: "sirah",
    name: "Idrīs عليه السلام",
    arabic: "إدريس عليه السلام",
    aliases: ["Idris", "Enoch"],
    start: {
      year: -4000,
      precision: "unknown",
      note: "No dating exists; placed between Ādam and Nūḥ per the common traditional order.",
    },
    importance: 3,
    region: "iraq-iran",
    summary:
      '"A man of truth, a prophet, whom We raised to a high station" (Q 19:56–57). Tradition often identifies him with Enoch and credits him with the first writing by pen.',
    citations: [Q("19:56–57"), QISAS, EI2("Idrīs")],
  },
  {
    id: "prophet-nuh",
    kind: "person",
    lane: "sirah",
    name: "Nūḥ عليه السلام",
    arabic: "نوح عليه السلام",
    aliases: ["Nuh", "Noah"],
    start: {
      year: -3800,
      precision: "unknown",
      note: "No dating exists. The Qurʾan gives his mission 950 years (Q 29:14); the Flood cannot be dated.",
    },
    importance: 5,
    region: "iraq-iran",
    summary:
      "The first messenger to a rebellious people: nine and a half centuries of preaching (Q 29:14), the Ark, and the Flood that carried faith through a drowning world. With Ibrāhīm, Mūsā, ʿĪsā, and Muḥammad ﷺ, one of the five resolute messengers (ūlū al-ʿazm).",
    relations: [
      {
        type: "related",
        target: "prophet-hud",
        note: "ʿĀd came after the people of Nūḥ (Q 7:69)",
      },
    ],
    citations: [Q("11:25–48"), Q("29:14"), QISAS, TABARI1, EI2("Nūḥ")],
    details: [
      {
        date: { year: -3800, precision: "unknown" },
        label: "Nine hundred and fifty years of calling (Q 29:14)",
      },
      {
        date: { year: -3790, precision: "unknown" },
        label: "The Ark and the Flood (Q 11:36–44), undatable",
      },
    ],
  },
  {
    id: "prophet-hud",
    kind: "person",
    lane: "sirah",
    name: "Hūd عليه السلام",
    arabic: "هود عليه السلام",
    aliases: ["Hud"],
    start: {
      year: -3600,
      precision: "unknown",
      note: "No dating exists; the Qurʾan places ʿĀd after the people of Nūḥ (Q 7:69).",
    },
    importance: 3,
    region: "arabia",
    location: {
      name: "al-Aḥqāf (Ḥaḍramawt region, traditional)",
      lat: 16.5,
      lng: 49.5,
      approximate: true,
    },
    summary:
      'Sent to ʿĀd of the wind-swept dunes of al-Aḥqāf, a people of towering strength who said "who is mightier than us?" and were swept away by a screaming wind (Q 41:15–16).',
    citations: [Q("7:65–72"), Q("46:21–26"), QISAS, EI2("Hūd")],
  },
  {
    id: "prophet-salih",
    kind: "person",
    lane: "sirah",
    name: "Ṣāliḥ عليه السلام",
    arabic: "صالح عليه السلام",
    aliases: ["Salih", "Saleh"],
    start: {
      year: -3400,
      precision: "unknown",
      note: "No dating exists; Thamūd follows ʿĀd in the Qurʾanic sequence (Q 7:74). The Nabataean rock-cut façades at al-Ḥijr are much later than the Thamūd of the Qurʾan.",
    },
    importance: 3,
    region: "arabia",
    location: {
      name: "al-Ḥijr (Madāʾin Ṣāliḥ, traditional association)",
      lat: 26.79,
      lng: 37.95,
      approximate: true,
    },
    summary:
      "Sent to Thamūd, the rock-carvers of al-Ḥijr, with the she-camel as a sign; they hamstrung her and the cry took them (Q 7:73–79).",
    citations: [Q("7:73–79"), Q("15:80–84"), QISAS, EI2("Ṣāliḥ")],
  },

  /* ------------- traditional dating band (disputed by nature) ------------- */
  {
    id: "prophet-ibrahim",
    kind: "person",
    lane: "sirah",
    name: "Ibrāhīm عليه السلام",
    arabic: "إبراهيم عليه السلام",
    aliases: ["Ibrahim", "Abraham", "Khalilullah"],
    start: {
      year: -1900,
      precision: "disputed",
      note: "Traditional association only (commonly placed early 2nd millennium BCE); no historical dating is established.",
    },
    importance: 5,
    region: "iraq-iran",
    location: {
      name: "Ur (traditional birthplace)",
      lat: 30.96,
      lng: 46.1,
      approximate: true,
    },
    places: [
      { name: "Ur (traditional)", lat: 30.96, lng: 46.1, approximate: true },
      { name: "Harran", lat: 36.87, lng: 39.03, approximate: true },
      {
        name: "Palestine (al-Khalīl/Hebron)",
        lat: 31.53,
        lng: 35.1,
        approximate: true,
      },
      { name: "Makkah, raising the Kaʿba", lat: 21.42, lng: 39.83 },
    ],
    summary:
      "The intimate friend of God (khalīl Allāh), smasher of idols, survivor of the fire, father of prophets. With Ismāʿīl he raised the foundations of the Kaʿba (Q 2:127), the axis this timeline's later centuries keep returning to. The ḥajj retraces his family's steps to this day.",
    relations: [
      {
        type: "related",
        target: "prophet-ismail",
        note: "father; together they raised the Kaʿba",
      },
      {
        type: "related",
        target: "prophet-lut",
        note: "his nephew, who believed in him (Q 29:26)",
      },
      {
        type: "related",
        target: "prophet-muhammad",
        note: "his descendant through Ismāʿīl; the millat Ibrāhīm restored",
      },
    ],
    citations: [
      Q("2:124–132"),
      Q("21:51–71"),
      QISAS,
      TABARI1,
      EI2("Ibrāhīm"),
      WHEELER,
    ],
    details: [
      {
        date: { year: -1900, precision: "disputed" },
        label:
          "Confronts his people's idols; delivered from the fire (Q 21:68–69)",
      },
      {
        date: { year: -1890, precision: "disputed" },
        label: "Migration toward al-Shām (Q 21:71)",
      },
      {
        date: { year: -1870, precision: "disputed" },
        label:
          "Settles Hājar and Ismāʿīl in the barren valley of Makkah (Q 14:37)",
      },
      {
        date: { year: -1860, precision: "disputed" },
        label: "The sacrifice ransomed (Q 37:102–107)",
      },
      {
        date: { year: -1850, precision: "disputed" },
        label: "Raises the foundations of the Kaʿba with Ismāʿīl (Q 2:127)",
      },
    ],
  },
  {
    id: "prophet-lut",
    kind: "person",
    lane: "sirah",
    name: "Lūṭ عليه السلام",
    arabic: "لوط عليه السلام",
    aliases: ["Lut", "Lot"],
    start: {
      year: -1880,
      precision: "disputed",
      note: "Placed with Ibrāhīm, whose contemporary and nephew he was; traditional association only.",
    },
    importance: 3,
    region: "levant",
    location: {
      name: "Cities of the plain (traditional: Dead Sea region)",
      lat: 31.2,
      lng: 35.4,
      approximate: true,
    },
    summary:
      "Nephew and companion of Ibrāhīm, sent to the cities of the plain; delivered at dawn as the punishment overturned them (Q 11:77–83).",
    relations: [{ type: "related", target: "prophet-ibrahim" }],
    citations: [Q("11:77–83"), QISAS, EI2("Lūṭ")],
  },
  {
    id: "prophet-ismail",
    kind: "person",
    lane: "sirah",
    name: "Ismāʿīl عليه السلام",
    arabic: "إسماعيل عليه السلام",
    aliases: ["Ismail", "Ishmael"],
    start: {
      year: -1860,
      precision: "disputed",
      note: "Placed with Ibrāhīm; traditional association only.",
    },
    importance: 4,
    region: "arabia",
    location: { name: "Makkah", lat: 21.42, lng: 39.83 },
    summary:
      '"Patient, true to his promise" (Q 19:54): the child of the barren valley, of Zamzam and the ransomed sacrifice, co-builder of the Kaʿba, and, by tradition, ancestor of the northern Arabs and of the Prophet Muḥammad ﷺ.',
    relations: [
      { type: "related", target: "prophet-ibrahim" },
      {
        type: "related",
        target: "prophet-muhammad",
        note: "his descendant, by tradition",
      },
    ],
    citations: [Q("19:54–55"), Q("2:127"), QISAS, EI2("Ismāʿīl")],
  },
  {
    id: "prophet-yusuf",
    kind: "person",
    lane: "sirah",
    name: "Yūsuf عليه السلام",
    arabic: "يوسف عليه السلام",
    aliases: ["Yusuf", "Joseph"],
    start: {
      year: -1750,
      precision: "disputed",
      note: "Traditional association with Middle-Kingdom/Hyksos-era Egypt; no historical dating is established.",
    },
    importance: 4,
    region: "egypt-north-africa",
    location: {
      name: "Egypt (traditional)",
      lat: 30.0,
      lng: 31.2,
      approximate: true,
    },
    summary:
      'Son of Yaʿqūb, whose story the Qurʾan calls "the most beautiful of narratives" (Q 12:3): the well, slavery, prison, and the treasury of Egypt, betrayal answered with "no blame upon you today" (Q 12:92).',
    citations: [Q("12"), QISAS, EI2("Yūsuf")],
  },
  {
    id: "prophet-shuayb",
    kind: "person",
    lane: "sirah",
    name: "Shuʿayb عليه السلام",
    arabic: "شعيب عليه السلام",
    aliases: ["Shuayb", "Jethro"],
    start: {
      year: -1350,
      precision: "disputed",
      note: "Often placed shortly before Mūsā, whose father-in-law some traditions make him; traditional association only.",
    },
    importance: 3,
    region: "arabia",
    location: {
      name: "Madyan (traditional: NW Arabia)",
      lat: 28.4,
      lng: 35.6,
      approximate: true,
    },
    summary:
      "The eloquent preacher of Madyan, sent against short measures and corrupt scales (Q 11:84–95), commerce itself made a matter of prophethood.",
    relations: [
      {
        type: "related",
        target: "prophet-musa",
        note: "sheltered Mūsā in Madyan per tradition (Q 28:22–28)",
      },
    ],
    citations: [Q("11:84–95"), Q("28:22–28"), QISAS, EI2("Shuʿayb")],
  },
  {
    id: "prophet-musa",
    kind: "person",
    lane: "sirah",
    name: "Mūsā عليه السلام",
    arabic: "موسى عليه السلام",
    aliases: ["Musa", "Moses", "Kalimullah"],
    start: {
      year: -1300,
      precision: "disputed",
      note: "Conventional association with 13th-century-BCE Egypt (often Ramesside); scholars dispute every element of the dating.",
    },
    importance: 5,
    region: "egypt-north-africa",
    location: {
      name: "Egypt (traditional)",
      lat: 30.0,
      lng: 31.2,
      approximate: true,
    },
    places: [
      { name: "Egypt", lat: 30.0, lng: 31.2, approximate: true },
      { name: "Madyan", lat: 28.4, lng: 35.6, approximate: true },
      { name: "Sinai (al-Ṭūr)", lat: 28.54, lng: 33.97, approximate: true },
    ],
    summary:
      "The prophet most often named in the Qurʾan: spoken to directly by God (kalīm Allāh), sent to Pharaoh with nine signs, leader of the Exodus and receiver of the Torah at Sinai. His story is the Qurʾan's great template of deliverance from tyranny.",
    relations: [
      {
        type: "related",
        target: "prophet-harun",
        note: "his brother and helper in the mission (Q 20:29–32)",
      },
      { type: "related", target: "prophet-shuayb" },
    ],
    citations: [
      Q("20:9–98"),
      Q("26:10–68"),
      QISAS,
      TABARI1,
      EI2("Mūsā"),
      WHEELER,
    ],
    details: [
      {
        date: { year: -1300, precision: "disputed" },
        label: "The burning bush at Sinai; the mission to Pharaoh (Q 20:9–24)",
      },
      {
        date: { year: -1290, precision: "disputed" },
        label: "The Exodus and the parting of the sea (Q 26:52–68)",
      },
      {
        date: { year: -1289, precision: "disputed" },
        label: "The Torah received at Sinai (Q 7:142–145)",
      },
    ],
  },
  {
    id: "prophet-harun",
    kind: "person",
    lane: "sirah",
    name: "Hārūn عليه السلام",
    arabic: "هارون عليه السلام",
    aliases: ["Harun", "Aaron"],
    start: {
      year: -1295,
      precision: "disputed",
      note: "Placed with Mūsā; traditional association only.",
    },
    importance: 3,
    region: "egypt-north-africa",
    summary:
      "Brother of Mūsā, granted to him as a prophet and spokesman (Q 19:53; 20:29–36).",
    relations: [{ type: "related", target: "prophet-musa" }],
    citations: [Q("20:29–36"), QISAS, EI2("Hārūn")],
  },
  {
    id: "prophet-dawud",
    kind: "person",
    lane: "sirah",
    name: "Dāwūd عليه السلام",
    arabic: "داود عليه السلام",
    aliases: ["Dawud", "David"],
    start: {
      year: -1000,
      precision: "disputed",
      note: "Conventional dating of his reign c. 1010–970 BCE rests on biblical chronology; archaeologically debated.",
    },
    importance: 4,
    region: "levant",
    location: { name: "Jerusalem (al-Quds)", lat: 31.78, lng: 35.23 },
    summary:
      "Prophet-king to whom the mountains and birds returned praise (Q 34:10), slayer of Jālūt, judge of Banī Isrāʾīl, and receiver of the Zabūr (Q 4:163).",
    relations: [
      {
        type: "related",
        target: "prophet-sulayman",
        note: "his son and heir (Q 27:16)",
      },
      {
        type: "related",
        target: "conquest-of-jerusalem-637",
        note: "the city of Dāwūd enters Muslim rule seventeen centuries later",
      },
    ],
    citations: [Q("2:251"), Q("34:10–11"), QISAS, EI2("Dāwūd")],
  },
  {
    id: "prophet-sulayman",
    kind: "person",
    lane: "sirah",
    name: "Sulaymān عليه السلام",
    arabic: "سليمان عليه السلام",
    aliases: ["Sulayman", "Solomon"],
    start: {
      year: -960,
      precision: "disputed",
      note: "Conventional dating of his reign c. 970–931 BCE rests on biblical chronology; archaeologically debated.",
    },
    importance: 4,
    region: "levant",
    location: { name: "Jerusalem (al-Quds)", lat: 31.78, lng: 35.23 },
    summary:
      "The prophet-king whose dominion ran over wind and jinn (Q 34:12), who understood the speech of birds and the ant of the valley (Q 27:16–19), builder of Bayt al-Maqdis in Islamic tradition, a kingdom the Qurʾan holds up as power held in gratitude.",
    relations: [{ type: "related", target: "prophet-dawud" }],
    citations: [Q("27:15–44"), Q("34:12–14"), QISAS, EI2("Sulaymān b. Dāwūd")],
  },
  {
    id: "prophet-ilyas",
    kind: "person",
    lane: "sirah",
    name: "Ilyās عليه السلام",
    arabic: "إلياس عليه السلام",
    aliases: ["Ilyas", "Elijah", "Elias"],
    start: {
      year: -850,
      precision: "disputed",
      note: "Traditional association with the 9th-century-BCE northern kingdom; al-Yasaʿ (Elisha) follows him in the sequence.",
    },
    importance: 3,
    region: "levant",
    summary:
      'Sent against the cult of Baʿl, "do you call upon Baʿl and abandon the best of creators?" (Q 37:125), with al-Yasaʿ عليه السلام his successor in the tradition.',
    citations: [Q("37:123–132"), QISAS, EI2("Ilyās")],
  },
  {
    id: "prophet-yunus",
    kind: "person",
    lane: "sirah",
    name: "Yūnus عليه السلام",
    arabic: "يونس عليه السلام",
    aliases: ["Yunus", "Jonah", "Dhul-Nun"],
    start: {
      year: -780,
      precision: "disputed",
      note: "Traditional association with 8th-century-BCE Nineveh; not historically established.",
    },
    importance: 3,
    region: "iraq-iran",
    location: {
      name: "Nineveh (traditional)",
      lat: 36.36,
      lng: 43.15,
      approximate: true,
    },
    summary:
      'The companion of the whale, whose cry from three darknesses, "there is no god but You; glory be to You; I was of the wrongdoers" (Q 21:87), became the distress-prayer of this whole timeline\'s people. His city, uniquely, believed and was spared (Q 10:98).',
    citations: [Q("21:87–88"), Q("37:139–148"), QISAS, EI2("Yūnus")],
  },
  {
    id: "prophet-ayyub",
    kind: "person",
    lane: "sirah",
    name: "Ayyūb عليه السلام",
    arabic: "أيوب عليه السلام",
    aliases: ["Ayyub", "Job"],
    start: {
      year: -1500,
      precision: "disputed",
      note: "Traditions place him variously (often in the era between Ibrāhīm and Mūsā); no dating is established.",
    },
    importance: 3,
    region: "levant",
    summary:
      'The emblem of patience: stripped of wealth, children, and health, he called "affliction has touched me, and You are the most merciful of the merciful" (Q 21:83), and everything was restored.',
    citations: [Q("21:83–84"), Q("38:41–44"), QISAS, EI2("Ayyūb")],
  },

  /* ----------------- era of ʿĪsā عليه السلام (scholarly dating) ----------------- */
  {
    id: "prophet-zakariyya",
    kind: "person",
    lane: "sirah",
    name: "Zakariyyā عليه السلام",
    arabic: "زكريا عليه السلام",
    aliases: ["Zakariyya", "Zechariah"],
    start: {
      year: -40,
      precision: "circa",
      note: "First century BCE; guardian of Maryam in the Temple precincts.",
    },
    end: { year: 30, precision: "circa" },
    importance: 3,
    region: "levant",
    location: { name: "Jerusalem", lat: 31.78, lng: 35.23 },
    summary:
      "Guardian of Maryam, who found provision beside her out of season and prayed in old age for an heir, answered with Yaḥyā (Q 3:37–41).",
    relations: [
      {
        type: "related",
        target: "prophet-yahya",
        note: "his son, granted in old age",
      },
      {
        type: "related",
        target: "prophet-isa",
        note: "guardian of Maryam, mother of ʿĪsā",
      },
    ],
    citations: [Q("3:37–41"), Q("19:2–15"), QISAS, EI2("Zakariyyāʾ")],
  },
  {
    id: "prophet-yahya",
    kind: "person",
    lane: "sirah",
    name: "Yaḥyā عليه السلام",
    arabic: "يحيى عليه السلام",
    aliases: ["Yahya", "John the Baptist"],
    start: { year: -5, precision: "circa" },
    end: {
      year: 30,
      precision: "circa",
      note: "Killed c. 28–36 CE per the historical sources on John the Baptist.",
    },
    importance: 4,
    region: "levant",
    location: {
      name: "Jordan valley",
      lat: 31.84,
      lng: 35.55,
      approximate: true,
    },
    summary:
      '"Peace upon him the day he was born, the day he dies, and the day he is raised alive" (Q 19:15): given wisdom as a boy, tender and dutiful, the herald of ʿĪsā, and a prophet martyred by a king.',
    relations: [
      { type: "related", target: "prophet-zakariyya" },
      {
        type: "related",
        target: "prophet-isa",
        note: "kinsman and confirmer (Q 3:39)",
      },
    ],
    citations: [Q("19:12–15"), Q("3:39"), QISAS, EI2("Yaḥyā b. Zakariyyāʾ")],
  },
  {
    id: "prophet-isa",
    kind: "person",
    lane: "sirah",
    name: "ʿĪsā ibn Maryam عليه السلام",
    arabic: "عيسى ابن مريم عليه السلام",
    aliases: ["Isa", "Jesus", "Messiah", "Masih"],
    start: {
      year: -4,
      precision: "circa",
      note: "Born c. 6–4 BCE by common scholarly reckoning; the calendar era named for him starts slightly late.",
    },
    end: {
      year: 30,
      precision: "circa",
      note: "End of the earthly mission c. 30–33 CE. In Islamic belief he was not killed or crucified but raised up by God (Q 4:157–158), this marks the rafʿ, not a death.",
    },
    importance: 5,
    region: "levant",
    location: { name: "Jerusalem", lat: 31.78, lng: 35.23 },
    places: [
      { name: "Bethlehem (Bayt Laḥm)", lat: 31.7, lng: 35.2 },
      { name: "Nazareth (al-Nāṣira)", lat: 32.7, lng: 35.3 },
      { name: "Jerusalem", lat: 31.78, lng: 35.23 },
    ],
    summary:
      "The Messiah, son of Maryam, a word from God and a spirit from Him (Q 4:171): born of a virgin, speaking in the cradle, healing the blind and the leper and raising the dead by God's leave, given the Injīl. In Islamic belief he was raised up alive, and his return is awaited. Between him and Muḥammad ﷺ stretches the fatra, the interval this line crosses next.",
    relations: [
      { type: "related", target: "prophet-yahya" },
      {
        type: "related",
        target: "prophet-muhammad",
        note: "gave tidings of a messenger to come, Aḥmad (Q 61:6)",
      },
    ],
    citations: [
      Q("3:45–55"),
      Q("4:157–158"),
      Q("5:110"),
      Q("19:16–36"),
      QISAS,
      EI2("ʿĪsā"),
      WHEELER,
    ],
    details: [
      {
        date: { year: -4, precision: "circa" },
        label: "The virgin birth (Q 19:16–34)",
      },
      {
        date: { year: 26, precision: "circa" },
        label: "Mission to Banī Isrāʾīl; the Injīl and the signs (Q 5:110)",
      },
      {
        date: { year: 30, precision: "circa" },
        label: "The rafʿ: raised up by God, not slain (Q 4:157–158)",
      },
    ],
  },
];

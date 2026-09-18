/**
 * The Prophet Muḥammad ﷺ and the earliest community.
 * These records are rendered on the central line itself.
 * Dating follows the mainstream sīra tradition; approximations are flagged.
 */
import type { TimelineRecord } from "@/lib/types";

const SIRA_SOURCES = [
  { source: "Ibn Hishām, al-Sīra al-Nabawiyya", detail: "primary source" },
  {
    source:
      "W. Montgomery Watt, Muhammad at Mecca / Muhammad at Medina (Oxford UP)",
  },
];

export const sirahRecords: TimelineRecord[] = [
  {
    id: "prophet-muhammad",
    kind: "person",
    lane: "sirah",
    name: "The Prophet Muḥammad ﷺ",
    arabic: "النبي محمد ﷺ",
    aliases: ["Muhammad", "Rasul Allah", "The Messenger of God"],
    start: {
      year: 570,
      precision: "circa",
      note: "Traditional dating: the Year of the Elephant (ʿām al-fīl).",
    },
    end: {
      year: 632,
      month: 6,
      day: 8,
      precision: "exact",
      hijri: { year: 11, source: "attested" },
      note: "Rabīʿ al-Awwal 11 AH, in Madinah.",
    },
    importance: 5,
    region: "arabia",
    location: { name: "Makkah", lat: 21.42, lng: 39.83 },
    places: [
      { name: "Makkah", lat: 21.42, lng: 39.83 },
      { name: "Madinah", lat: 24.47, lng: 39.61 },
    ],
    summary:
      "The final Prophet of Islam ﷺ, born in Makkah and buried in Madinah. His twenty-three years of prophethood (c. 610–632) transformed Arabia and set in motion everything that follows on this timeline.",
    relations: [
      {
        type: "related",
        target: "hijra",
        note: "the migration that begins the Hijri calendar",
      },
      { type: "related", target: "quranic-revelation" },
    ],
    citations: SIRA_SOURCES,
    details: [
      {
        date: { year: 570, precision: "circa" },
        label: "Birth in Makkah (traditional dating)",
      },
      {
        date: { year: 610, precision: "circa" },
        label: "First revelation in the cave of Ḥirāʾ",
      },
      {
        date: { year: 619, precision: "circa" },
        label: "Year of Sorrow: deaths of Khadīja and Abū Ṭālib",
      },
      {
        date: {
          year: 622,
          precision: "exact",
          month: 9,
          hijri: { year: 1, source: "attested" },
        },
        label: "Hijra to Madinah",
      },
      {
        date: {
          year: 624,
          precision: "exact",
          month: 3,
          hijri: { year: 2, source: "attested" },
        },
        label: "Battle of Badr",
      },
      {
        date: {
          year: 630,
          precision: "exact",
          month: 1,
          hijri: { year: 8, source: "attested" },
        },
        label: "Conquest of Makkah",
      },
      {
        date: {
          year: 632,
          precision: "exact",
          month: 3,
          hijri: { year: 10, source: "attested" },
        },
        label: "Farewell Pilgrimage",
      },
      {
        date: {
          year: 632,
          precision: "exact",
          month: 6,
          hijri: { year: 11, source: "attested" },
        },
        label: "Passing, in Madinah",
      },
    ],
  },
  {
    id: "quranic-revelation",
    kind: "event",
    lane: "sirah",
    name: "The Qurʾanic revelation",
    arabic: "نزول القرآن",
    start: {
      year: 610,
      precision: "circa",
      note: "Beginning in Ramadan, in the cave of Ḥirāʾ.",
    },
    end: {
      year: 632,
      precision: "year",
      hijri: { year: 11, source: "attested" },
    },
    importance: 5,
    region: "arabia",
    location: { name: "Makkah", lat: 21.42, lng: 39.83 },
    summary:
      "The revelation of the Qurʾan over roughly twenty-three years, first in Makkah and then in Madinah. Muslims memorized and recorded it during the Prophet's ﷺ lifetime; the written codex was standardized under ʿUthmān (see the Books lane).",
    relations: [{ type: "related", target: "uthmanic-codex" }],
    citations: [
      {
        source: "Encyclopaedia of Islam, 2nd ed. (Brill)",
        detail: 's.v. "al-Ḳurʾān"',
      },
      ...SIRA_SOURCES,
    ],
  },
  {
    id: "hijra",
    kind: "event",
    lane: "sirah",
    name: "The Hijra to Madinah",
    arabic: "الهجرة النبوية",
    start: {
      year: 622,
      month: 9,
      precision: "exact",
      hijri: { year: 1, source: "attested" },
      note: "Arrival at Qubāʾ in Rabīʿ al-Awwal; the Hijri calendar is later counted from this year.",
    },
    importance: 5,
    region: "arabia",
    location: { name: "Madinah", lat: 24.47, lng: 39.61 },
    summary:
      "The migration of the Prophet ﷺ and the Muslims from Makkah to Yathrib (Madinah), the founding moment of the Muslim polity and year one of the Islamic calendar.",
    relations: [{ type: "related", target: "constitution-of-madinah" }],
    citations: SIRA_SOURCES,
  },
  {
    id: "constitution-of-madinah",
    kind: "event",
    lane: "sirah",
    name: "The Charter of Madinah",
    arabic: "صحيفة المدينة",
    start: {
      year: 622,
      precision: "circa",
      hijri: { year: 1, source: "attested" },
      note: "Shortly after the Hijra; the document survives in early sīra sources.",
    },
    importance: 3,
    region: "arabia",
    location: { name: "Madinah", lat: 24.47, lng: 39.61 },
    summary:
      "An agreement organizing relations among the Muhājirūn, the Anṣār, and the Jewish tribes of Madinah, often cited as the founding document of the first Muslim polity.",
    citations: [
      { source: 'R. B. Serjeant, "The Sunnah Jāmiʿah", BSOAS 41 (1978)' },
      ...SIRA_SOURCES,
    ],
  },
  {
    id: "battle-of-badr",
    kind: "battle",
    lane: "sirah",
    name: "Battle of Badr",
    arabic: "غزوة بدر",
    start: {
      year: 624,
      month: 3,
      day: 13,
      precision: "exact",
      hijri: { year: 2, source: "attested" },
      note: "17 Ramadan 2 AH.",
    },
    importance: 5,
    region: "arabia",
    location: { name: "Badr", lat: 23.73, lng: 38.77 },
    summary:
      "The first major battle of the Muslim community: a heavily outnumbered force from Madinah defeated the Quraysh of Makkah at the wells of Badr. Named in the Qurʾan as a decisive divine aid (Q 3:123).",
    relations: [{ type: "participant", target: "prophet-muhammad" }],
    citations: SIRA_SOURCES,
  },
  {
    id: "battle-of-uhud",
    kind: "battle",
    lane: "sirah",
    name: "Battle of Uḥud",
    arabic: "غزوة أحد",
    start: {
      year: 625,
      month: 3,
      precision: "exact",
      hijri: { year: 3, source: "attested" },
      note: "Shawwāl 3 AH.",
    },
    importance: 4,
    region: "arabia",
    location: { name: "Mount Uḥud, Madinah", lat: 24.5, lng: 39.61 },
    summary:
      "Fought at the mountain of Uḥud north of Madinah. Early Muslim success turned to a costly reversal when archers left their posts; the Prophet's ﷺ uncle Ḥamza was among the martyrs.",
    relations: [{ type: "participant", target: "prophet-muhammad" }],
    citations: SIRA_SOURCES,
  },
  {
    id: "battle-of-khandaq",
    kind: "battle",
    lane: "sirah",
    name: "Battle of al-Khandaq (the Trench)",
    arabic: "غزوة الخندق",
    start: {
      year: 627,
      precision: "year",
      hijri: { year: 5, source: "attested" },
      note: "Dhū al-Qaʿda 5 AH; some chronologies place it in 626 CE.",
    },
    importance: 4,
    region: "arabia",
    location: { name: "Madinah", lat: 24.47, lng: 39.61 },
    summary:
      "A confederate army of Quraysh and allied tribes besieged Madinah; the Muslims held them off behind a defensive trench dug on the counsel of Salmān al-Fārisī, ending Makkan offensive power.",
    relations: [{ type: "participant", target: "prophet-muhammad" }],
    citations: SIRA_SOURCES,
  },
  {
    id: "treaty-of-hudaybiyya",
    kind: "event",
    lane: "sirah",
    name: "Treaty of al-Ḥudaybiyya",
    arabic: "صلح الحديبية",
    start: {
      year: 628,
      month: 3,
      precision: "exact",
      hijri: { year: 6, source: "attested" },
    },
    importance: 4,
    region: "arabia",
    location: {
      name: "al-Ḥudaybiyya, near Makkah",
      lat: 21.44,
      lng: 39.6,
      approximate: true,
    },
    summary:
      'A ten-year truce between Madinah and Quraysh. Though its terms looked unfavorable, the Qurʾan calls it "a clear victory" (Q 48:1): the peace let Islam spread rapidly across Arabia.',
    citations: SIRA_SOURCES,
  },
  {
    id: "conquest-of-makkah",
    kind: "battle",
    lane: "sirah",
    name: "Conquest of Makkah",
    arabic: "فتح مكة",
    start: {
      year: 630,
      month: 1,
      precision: "exact",
      hijri: { year: 8, source: "attested" },
      note: "Ramadan 8 AH.",
    },
    importance: 5,
    region: "arabia",
    location: { name: "Makkah", lat: 21.42, lng: 39.83 },
    summary:
      "After Quraysh violated the Ḥudaybiyya truce, the Prophet ﷺ entered Makkah almost without bloodshed, granted a general amnesty, and cleared the Kaʿba of its idols.",
    relations: [{ type: "participant", target: "prophet-muhammad" }],
    citations: SIRA_SOURCES,
  },
  {
    id: "farewell-pilgrimage",
    kind: "event",
    lane: "sirah",
    name: "The Farewell Pilgrimage",
    arabic: "حجة الوداع",
    start: {
      year: 632,
      month: 3,
      precision: "exact",
      hijri: { year: 10, source: "attested" },
      note: "Dhū al-Ḥijja 10 AH.",
    },
    importance: 4,
    region: "arabia",
    location: { name: "Makkah", lat: 21.42, lng: 39.83 },
    summary:
      "The Prophet's ﷺ only complete ḥajj, performed with tens of thousands of pilgrims. His sermon at ʿArafāt, on the sanctity of life, property, and human equality, is among the most quoted texts of Islam.",
    relations: [{ type: "participant", target: "prophet-muhammad" }],
    citations: SIRA_SOURCES,
  },
];

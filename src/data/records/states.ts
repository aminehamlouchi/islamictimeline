/**
 * Caliphates, dynasties, and states.
 * Start/end years follow standard reference dating (Bosworth, The New Islamic
 * Dynasties); founding dates that are conventional rather than documented
 * (e.g. the Ottoman "1299") are flagged as approximate.
 */
import type { TimelineRecord } from "@/lib/types";

const BOSWORTH = {
  source: "C.E. Bosworth, The New Islamic Dynasties (Edinburgh UP, 1996)",
};
const EI2 = (entry: string, author?: string) => ({
  source: "Encyclopaedia of Islam, 2nd ed. (Brill)",
  detail: `s.v. "${entry}"${author ? ` (${author})` : ""}`,
});

export const stateRecords: TimelineRecord[] = [
  {
    id: "rashidun-caliphate",
    kind: "empire",
    lane: "states",
    name: "Rashidun Caliphate",
    arabic: "الخلافة الراشدة",
    start: {
      year: 632,
      precision: "year",
      hijri: { year: 11, source: "attested" },
    },
    end: {
      year: 661,
      precision: "year",
      hijri: { year: 40, source: "attested" },
    },
    importance: 5,
    region: "arabia",
    location: { name: "Madinah", lat: 24.47, lng: 39.61 },
    summary:
      'The rule of the four "rightly-guided" caliphs, Abū Bakr, ʿUmar, ʿUthmān, and ʿAlī. In three decades the Muslim polity burst out of Arabia, taking Syria, Iraq, Egypt, and Iran from the two exhausted superpowers of late antiquity.',
    relations: [
      { type: "related", target: "battle-of-yarmuk" },
      { type: "related", target: "battle-of-qadisiyya" },
      { type: "related", target: "conquest-of-jerusalem-637" },
    ],
    citations: [
      {
        source:
          "Hugh Kennedy, The Prophet and the Age of the Caliphates (Longman, 2nd ed. 2004)",
      },
      BOSWORTH,
    ],
    details: [
      {
        date: {
          year: 632,
          precision: "year",
          hijri: { year: 11, source: "attested" },
        },
        label: "Abū Bakr elected caliph",
      },
      {
        date: {
          year: 634,
          precision: "year",
          hijri: { year: 13, source: "attested" },
        },
        label: "ʿUmar becomes caliph",
      },
      {
        date: {
          year: 644,
          precision: "year",
          hijri: { year: 23, source: "attested" },
        },
        label: "ʿUthmān becomes caliph",
      },
      {
        date: {
          year: 656,
          precision: "year",
          hijri: { year: 35, source: "attested" },
        },
        label: "ʿAlī becomes caliph; first fitna begins",
      },
      {
        date: {
          year: 661,
          precision: "year",
          hijri: { year: 40, source: "attested" },
        },
        label: "Assassination of ʿAlī ends the era",
      },
    ],
  },
  {
    id: "umayyad-caliphate",
    kind: "empire",
    lane: "states",
    name: "Umayyad Caliphate",
    arabic: "الخلافة الأموية",
    start: {
      year: 661,
      precision: "year",
      hijri: { year: 41, source: "attested" },
    },
    end: {
      year: 750,
      precision: "year",
      hijri: { year: 132, source: "attested" },
    },
    importance: 5,
    region: "levant",
    location: { name: "Damascus", lat: 33.51, lng: 36.29 },
    summary:
      "The first dynastic caliphate, ruling from Damascus over the largest empire the world had yet seen, from the Atlantic to the Indus. Arabic became the language of administration; the Dome of the Rock its architectural signature.",
    relations: [
      { type: "founded_by", target: "muawiya" },
      { type: "related", target: "dome-of-the-rock" },
      { type: "related", target: "crossing-to-andalus" },
    ],
    citations: [
      { source: "G.R. Hawting, The First Dynasty of Islam (Routledge, 2000)" },
      BOSWORTH,
    ],
    details: [
      {
        date: { year: 661, precision: "year" },
        label: "Muʿāwiya establishes rule from Damascus",
      },
      {
        date: { year: 685, precision: "year" },
        label: "ʿAbd al-Malik: coinage & Arabic administration",
      },
      {
        date: { year: 711, precision: "year" },
        label: "Crossings into Iberia and Sind",
      },
      {
        date: { year: 717, precision: "year" },
        label: "ʿUmar II; failed siege of Constantinople",
      },
      {
        date: { year: 750, precision: "year" },
        label: "Overthrown by the Abbasid revolution",
      },
    ],
  },
  {
    id: "abbasid-caliphate",
    kind: "empire",
    lane: "states",
    name: "Abbasid Caliphate",
    arabic: "الخلافة العباسية",
    start: {
      year: 750,
      precision: "year",
      hijri: { year: 132, source: "attested" },
    },
    end: {
      year: 1258,
      precision: "year",
      hijri: { year: 656, source: "attested" },
      note: "A shadow Abbasid caliphate continued under Mamluk protection in Cairo, 1261–1517.",
    },
    importance: 5,
    region: "iraq-iran",
    location: { name: "Baghdad", lat: 33.34, lng: 44.4 },
    summary:
      "Five centuries of caliphal rule from Iraq. Baghdad, founded 762, became the world's intellectual capital, the age of the great imams, the translation movement, and the flowering of every Islamic science, even as real political power fragmented among regional dynasties from the 9th century onward.",
    relations: [
      { type: "related", target: "founding-of-baghdad" },
      { type: "related", target: "bayt-al-hikma" },
      { type: "related", target: "mihna" },
      { type: "related", target: "sack-of-baghdad" },
    ],
    citations: [
      {
        source:
          "Hugh Kennedy, The Prophet and the Age of the Caliphates (Longman, 2nd ed. 2004)",
      },
      BOSWORTH,
    ],
    details: [
      {
        date: { year: 750, precision: "year" },
        label: "Abbasid revolution; al-Saffāḥ caliph",
      },
      {
        date: {
          year: 762,
          precision: "year",
          hijri: { year: 145, source: "attested" },
        },
        label: "al-Manṣūr founds Baghdad",
      },
      {
        date: { year: 786, precision: "year" },
        label: "Hārūn al-Rashīd: the storied apogee",
      },
      {
        date: { year: 813, precision: "year" },
        label: "al-Maʾmūn; translation movement peaks",
      },
      {
        date: { year: 836, precision: "year" },
        label: "Capital moves to Samarra (to 892)",
      },
      {
        date: { year: 945, precision: "year" },
        label: "Buyids take Baghdad; caliphs under tutelage",
      },
      {
        date: { year: 1055, precision: "year" },
        label: "Seljuks take Baghdad",
      },
      {
        date: {
          year: 1258,
          precision: "year",
          hijri: { year: 656, source: "attested" },
        },
        label: "Mongols sack Baghdad; al-Mustaʿṣim killed",
      },
    ],
  },
  {
    id: "cordoba-umayyads",
    kind: "empire",
    lane: "states",
    name: "Umayyads of al-Andalus",
    arabic: "الأمويون في الأندلس",
    start: {
      year: 756,
      precision: "year",
      hijri: { year: 138, source: "attested" },
    },
    end: {
      year: 1031,
      precision: "year",
      hijri: { year: 422, source: "attested" },
    },
    importance: 4,
    region: "andalus-maghrib",
    location: { name: "Córdoba", lat: 37.88, lng: -4.78 },
    summary:
      "Founded by ʿAbd al-Raḥmān I, sole Umayyad survivor of the Abbasid revolution. Córdoba grew into western Europe's greatest city; from 929 ʿAbd al-Raḥmān III claimed the caliphal title outright.",
    relations: [{ type: "related", target: "great-mosque-of-cordoba" }],
    citations: [
      { source: "Hugh Kennedy, Muslim Spain and Portugal (Longman, 1996)" },
      BOSWORTH,
    ],
    details: [
      {
        date: { year: 756, precision: "year" },
        label: "ʿAbd al-Raḥmān I takes Córdoba",
      },
      {
        date: { year: 785, precision: "year" },
        label: "Great Mosque of Córdoba begun",
      },
      {
        date: {
          year: 929,
          precision: "year",
          hijri: { year: 316, source: "attested" },
        },
        label: "ʿAbd al-Raḥmān III proclaims the caliphate",
      },
      {
        date: { year: 1031, precision: "year" },
        label: "Caliphate dissolves into ṭāʾifa kingdoms",
      },
    ],
  },
  {
    id: "taifa-kingdoms",
    kind: "empire",
    lane: "states",
    name: "Ṭāʾifa kingdoms of al-Andalus",
    arabic: "ملوك الطوائف",
    start: { year: 1031, precision: "year" },
    end: {
      year: 1091,
      precision: "year",
      note: "First ṭāʾifa period; later ṭāʾifa phases recurred after Almoravid and Almohad collapse.",
    },
    importance: 2,
    region: "andalus-maghrib",
    location: { name: "Seville", lat: 37.39, lng: -5.99 },
    summary:
      "The city-states that carved up al-Andalus after the caliphate fell, courts of dazzling poetry and science, but too divided to resist Christian advance without calling in the Almoravids.",
    citations: [
      { source: "Hugh Kennedy, Muslim Spain and Portugal (Longman, 1996)" },
      BOSWORTH,
    ],
  },
  {
    id: "idrisids",
    kind: "empire",
    lane: "states",
    name: "Idrisids",
    arabic: "الأدارسة",
    start: {
      year: 788,
      precision: "year",
      hijri: { year: 172, source: "attested" },
    },
    end: { year: 974, precision: "year" },
    importance: 2,
    region: "andalus-maghrib",
    location: { name: "Fez", lat: 34.06, lng: -4.98 },
    summary:
      "The first Islamic dynasty of Morocco, founded by a great-great-grandson of the Prophet ﷺ fleeing Abbasid persecution; builders of Fez.",
    citations: [BOSWORTH, EI2("Idrīsids")],
  },
  {
    id: "aghlabids",
    kind: "empire",
    lane: "states",
    name: "Aghlabids",
    arabic: "الأغالبة",
    start: {
      year: 800,
      precision: "year",
      hijri: { year: 184, source: "attested" },
    },
    end: { year: 909, precision: "year" },
    importance: 2,
    region: "egypt-north-africa",
    location: { name: "Kairouan", lat: 35.68, lng: 10.1 },
    summary:
      "Autonomous governors of Ifrīqiya under nominal Abbasid suzerainty; conquerors of Sicily (from 827) and patrons of Kairouan's great mosque and reservoirs.",
    citations: [BOSWORTH, EI2("Aghlabids")],
  },
  {
    id: "tulunids",
    kind: "empire",
    lane: "states",
    name: "Tulunids",
    arabic: "الطولونيون",
    start: {
      year: 868,
      precision: "year",
      hijri: { year: 254, source: "attested" },
    },
    end: { year: 905, precision: "year" },
    importance: 2,
    region: "egypt-north-africa",
    location: { name: "Fustat (Cairo)", lat: 30.0, lng: 31.23 },
    summary:
      "Egypt's first autonomous Islamic dynasty, founded by the Turkic soldier Aḥmad ibn Ṭūlūn, whose spiral-minaret mosque still stands in Cairo.",
    citations: [BOSWORTH, EI2("Ṭūlūnids")],
  },
  {
    id: "samanids",
    kind: "empire",
    lane: "states",
    name: "Samanids",
    arabic: "السامانيون",
    start: {
      year: 819,
      precision: "year",
      hijri: { year: 204, source: "attested" },
    },
    end: { year: 999, precision: "year" },
    importance: 3,
    region: "central-asia",
    location: { name: "Bukhara", lat: 39.77, lng: 64.42 },
    summary:
      "Persian dynasty of Bukhara and Samarkand under whom New Persian literature was born and Transoxiana became a powerhouse of Sunni learning, the world of al-Bukhārī's heirs and the young Ibn Sīnā.",
    relations: [
      {
        type: "related",
        target: "ibn-sina",
        note: "Ibn Sīnā began his career in Samanid Bukhara",
      },
    ],
    citations: [
      BOSWORTH,
      {
        source:
          "R.N. Frye, Bukhara: The Medieval Achievement (Oklahoma UP, 1965)",
      },
    ],
  },
  {
    id: "buyids",
    kind: "empire",
    lane: "states",
    name: "Buyids",
    arabic: "البويهيون",
    start: {
      year: 934,
      precision: "year",
      hijri: { year: 322, source: "attested" },
    },
    end: { year: 1062, precision: "year" },
    importance: 3,
    region: "iraq-iran",
    location: { name: "Baghdad", lat: 33.34, lng: 44.4 },
    summary:
      "Shīʿī soldier-dynasty from the Caspian highlands that took Baghdad in 945, ruling *through* the Abbasid caliphs for a century, the clearest case of the caliphate's political eclipse.",
    relations: [
      {
        type: "related",
        target: "abbasid-caliphate",
        note: "held the caliphs in tutelage, 945–1055",
      },
    ],
    citations: [BOSWORTH, EI2("Buwayhids")],
  },
  {
    id: "fatimid-caliphate",
    kind: "empire",
    lane: "states",
    name: "Fatimid Caliphate",
    arabic: "الخلافة الفاطمية",
    start: {
      year: 909,
      precision: "year",
      hijri: { year: 297, source: "attested" },
    },
    end: {
      year: 1171,
      precision: "year",
      hijri: { year: 567, source: "attested" },
    },
    importance: 4,
    region: "egypt-north-africa",
    location: { name: "Cairo", lat: 30.04, lng: 31.24 },
    summary:
      "Ismāʿīlī Shīʿī counter-caliphate that rose in North Africa, founded Cairo (969) and al-Azhar, and for a time out-shone Baghdad, meaning three rival caliphates (Baghdad, Cairo, Córdoba) coexisted in the 10th century.",
    relations: [
      { type: "related", target: "al-azhar" },
      {
        type: "related",
        target: "ibn-al-haytham",
        note: "patron of his Cairo years",
      },
    ],
    citations: [
      BOSWORTH,
      { source: "Michael Brett, The Fatimid Empire (Edinburgh UP, 2017)" },
    ],
    details: [
      {
        date: { year: 909, precision: "year" },
        label: "Proclaimed in Ifrīqiya",
      },
      {
        date: {
          year: 969,
          precision: "year",
          hijri: { year: 358, source: "attested" },
        },
        label: "Conquest of Egypt; Cairo founded",
      },
      {
        date: { year: 972, precision: "year" },
        label: "al-Azhar mosque completed",
      },
      {
        date: { year: 1171, precision: "year" },
        label: "Saladin ends the dynasty",
      },
    ],
  },
  {
    id: "ghaznavids",
    kind: "empire",
    lane: "states",
    name: "Ghaznavids",
    arabic: "الغزنويون",
    start: {
      year: 977,
      precision: "year",
      hijri: { year: 366, source: "attested" },
    },
    end: { year: 1186, precision: "year" },
    importance: 3,
    region: "central-asia",
    location: { name: "Ghazni", lat: 33.55, lng: 68.42 },
    summary:
      "Turkic slave-soldiers turned sultans of Ghazni. Maḥmūd's raids carried Muslim power deep into northern India, and his court hosted al-Bīrūnī and (briefly, unhappily) Firdawsī.",
    relations: [
      {
        type: "related",
        target: "al-biruni",
        note: "court scholar, taken to India",
      },
      {
        type: "related",
        target: "shahnameh",
        note: "Firdawsī presented the epic to Maḥmūd",
      },
    ],
    citations: [
      BOSWORTH,
      { source: "C.E. Bosworth, The Ghaznavids (Edinburgh UP, 1963)" },
    ],
  },
  {
    id: "qarakhanids",
    kind: "empire",
    lane: "states",
    name: "Qarakhanids",
    arabic: "القراخانيون",
    start: {
      year: 999,
      precision: "circa",
      note: "Dynasty Islamized in the mid-10th century; took Bukhara in 999.",
    },
    end: { year: 1211, precision: "year" },
    importance: 2,
    region: "central-asia",
    location: { name: "Kashgar", lat: 39.47, lng: 75.99 },
    summary:
      "The first major Turkic dynasty to embrace Islam en masse, under them Turkic Islamic literature begins, with the Kutadgu Bilig of Kashgar (1069).",
    relations: [{ type: "related", target: "kutadgu-bilig" }],
    citations: [BOSWORTH, EI2("Ilek-Khāns or Ḳarakhānids")],
  },
  {
    id: "great-seljuks",
    kind: "empire",
    lane: "states",
    name: "Great Seljuk Empire",
    arabic: "السلاجقة العظام",
    start: {
      year: 1037,
      precision: "year",
      hijri: { year: 429, source: "attested" },
    },
    end: { year: 1194, precision: "year" },
    importance: 4,
    region: "iraq-iran",
    location: { name: "Isfahan", lat: 32.65, lng: 51.67 },
    summary:
      'Oghuz Turkmen who swept from the steppe to "liberate" the caliph from the Buyids (1055), crush Byzantium at Manzikert (1071), and, through the vizier Niẓām al-Mulk, spread the madrasa across the East.',
    relations: [
      { type: "related", target: "battle-of-manzikert" },
      { type: "related", target: "nizamiyya-baghdad" },
      {
        type: "related",
        target: "al-ghazali",
        note: "taught at the Seljuk-founded Niẓāmiyya",
      },
    ],
    citations: [
      BOSWORTH,
      {
        source: "A.C.S. Peacock, The Great Seljuk Empire (Edinburgh UP, 2015)",
      },
    ],
    details: [
      {
        date: { year: 1040, precision: "year" },
        label: "Victory at Dandanqan over the Ghaznavids",
      },
      {
        date: { year: 1055, precision: "year" },
        label: "Tughril enters Baghdad",
      },
      {
        date: { year: 1071, precision: "year" },
        label: "Alp Arslan wins Manzikert",
      },
      {
        date: { year: 1092, precision: "year" },
        label: "Niẓām al-Mulk assassinated; fragmentation",
      },
    ],
  },
  {
    id: "seljuks-of-rum",
    kind: "empire",
    lane: "states",
    name: "Seljuks of Rūm",
    arabic: "سلاجقة الروم",
    start: { year: 1077, precision: "year" },
    end: { year: 1308, precision: "year" },
    importance: 3,
    region: "anatolia-balkans",
    location: { name: "Konya", lat: 37.87, lng: 32.49 },
    summary:
      "The Anatolian Seljuk sultanate that turned Asia Minor Turkish and Muslim; its capital Konya sheltered Rūmī's family fleeing the Mongols.",
    relations: [
      {
        type: "related",
        target: "rumi",
        note: "Konya was his refuge and home",
      },
    ],
    citations: [BOSWORTH, EI2("Saldjūḳids")],
  },
  {
    id: "almoravids",
    kind: "empire",
    lane: "states",
    name: "Almoravids",
    arabic: "المرابطون",
    start: {
      year: 1040,
      precision: "circa",
      note: "Movement coalesced c. 1040s; Marrakesh founded c. 1070.",
    },
    end: { year: 1147, precision: "year" },
    importance: 3,
    region: "andalus-maghrib",
    location: { name: "Marrakesh", lat: 31.63, lng: -8.0 },
    summary:
      "Sanhāja Berber movement from the Sahara that unified Morocco, founded Marrakesh, rescued al-Andalus at Zallāqa (1086), and linked West African gold to the Mediterranean.",
    relations: [{ type: "related", target: "battle-of-zallaqa" }],
    citations: [
      {
        source:
          "Amira K. Bennison, The Almoravid and Almohad Empires (Edinburgh UP, 2016)",
      },
      BOSWORTH,
    ],
  },
  {
    id: "almohads",
    kind: "empire",
    lane: "states",
    name: "Almohads",
    arabic: "الموحدون",
    start: {
      year: 1121,
      precision: "year",
      hijri: { year: 515, source: "attested" },
    },
    end: { year: 1269, precision: "year" },
    importance: 3,
    region: "andalus-maghrib",
    location: { name: "Marrakesh", lat: 31.63, lng: -8.0 },
    summary:
      "Reformist Berber empire spanning the Maghrib and al-Andalus; patrons of Ibn Rushd and Ibn Ṭufayl, and builders of the Kutubiyya and the Giralda, until the defeat at Las Navas de Tolosa (1212) broke their power in Iberia.",
    relations: [
      { type: "related", target: "ibn-rushd" },
      { type: "related", target: "battle-of-las-navas" },
    ],
    citations: [
      {
        source:
          "Amira K. Bennison, The Almoravid and Almohad Empires (Edinburgh UP, 2016)",
      },
      BOSWORTH,
    ],
  },
  {
    id: "ayyubids",
    kind: "empire",
    lane: "states",
    name: "Ayyubids",
    arabic: "الأيوبيون",
    start: {
      year: 1171,
      precision: "year",
      hijri: { year: 567, source: "attested" },
    },
    end: {
      year: 1250,
      precision: "year",
      note: "In Egypt; Syrian branches persisted to 1260.",
    },
    importance: 4,
    region: "egypt-north-africa",
    location: { name: "Cairo", lat: 30.04, lng: 31.24 },
    summary:
      "The house of Saladin (Ṣalāḥ al-Dīn), Kurdish soldiers who ended Fatimid rule, restored Sunnism in Egypt, retook Jerusalem after Ḥaṭṭīn (1187), and fought the Third Crusade to a stalemate.",
    relations: [
      { type: "related", target: "battle-of-hattin" },
      { type: "related", target: "recapture-of-jerusalem-1187" },
    ],
    citations: [
      { source: "Anne-Marie Eddé, Saladin (Harvard UP, 2011)" },
      BOSWORTH,
    ],
    details: [
      {
        date: { year: 1171, precision: "year" },
        label: "Saladin abolishes the Fatimid caliphate",
      },
      {
        date: {
          year: 1187,
          precision: "year",
          hijri: { year: 583, source: "attested" },
        },
        label: "Ḥaṭṭīn; Jerusalem restored",
      },
      {
        date: { year: 1193, precision: "year" },
        label: "Death of Saladin in Damascus",
      },
      {
        date: { year: 1229, precision: "year" },
        label: "al-Kāmil cedes Jerusalem by treaty (to 1244)",
      },
      {
        date: { year: 1250, precision: "year" },
        label: "Mamluks displace the dynasty in Egypt",
      },
    ],
  },
  {
    id: "delhi-sultanate",
    kind: "empire",
    lane: "states",
    name: "Delhi Sultanate",
    arabic: "سلطنة دلهي",
    start: {
      year: 1206,
      precision: "year",
      hijri: { year: 602, source: "attested" },
    },
    end: { year: 1526, precision: "year" },
    importance: 4,
    region: "south-asia",
    location: { name: "Delhi", lat: 28.61, lng: 77.21 },
    summary:
      "Five successive dynasties ruling northern India from Delhi, a refuge for scholars fleeing the Mongols, home of the Quṭb Mīnār, and the state that repelled repeated Mongol invasions before Timur's devastating raid (1398).",
    relations: [
      {
        type: "related",
        target: "timurids",
        note: "Timur sacked Delhi in 1398",
      },
    ],
    citations: [
      { source: "Peter Jackson, The Delhi Sultanate (Cambridge, 1999)" },
      BOSWORTH,
    ],
    details: [
      {
        date: { year: 1206, precision: "year" },
        label: "Quṭb al-Dīn Aybak founds the sultanate",
      },
      {
        date: { year: 1236, precision: "year" },
        label: "Raḍiyya Sulṭāna, a woman on Delhi's throne (to 1240)",
      },
      {
        date: { year: 1296, precision: "year" },
        label: "ʿAlāʾ al-Dīn Khaljī; Mongol invasions repelled",
      },
      { date: { year: 1398, precision: "year" }, label: "Timur sacks Delhi" },
      {
        date: { year: 1526, precision: "year" },
        label: "Bābur wins Panipat; Mughal era begins",
      },
    ],
  },
  {
    id: "mamluk-sultanate",
    kind: "empire",
    lane: "states",
    name: "Mamluk Sultanate",
    arabic: "سلطنة المماليك",
    start: {
      year: 1250,
      precision: "year",
      hijri: { year: 648, source: "attested" },
    },
    end: {
      year: 1517,
      precision: "year",
      hijri: { year: 923, source: "attested" },
    },
    importance: 4,
    region: "egypt-north-africa",
    location: { name: "Cairo", lat: 30.04, lng: 31.24 },
    summary:
      "The slave-soldier sultanate of Egypt and Syria that stopped the Mongols at ʿAyn Jālūt (1260), expelled the last Crusaders (1291), hosted the Abbasid shadow caliphs, and presided over the age of Ibn Taymiyya, al-Dhahabī, Ibn Khaldūn, and Ibn Ḥajar.",
    relations: [
      { type: "related", target: "battle-of-ayn-jalut" },
      {
        type: "related",
        target: "ibn-taymiyya",
        note: "his entire career unfolded under Mamluk rule",
      },
      { type: "related", target: "shajar-al-durr" },
    ],
    citations: [
      {
        source:
          "Robert Irwin, The Middle East in the Middle Ages: The Early Mamluk Sultanate (Southern Illinois UP, 1986)",
      },
      BOSWORTH,
    ],
    details: [
      {
        date: { year: 1250, precision: "year" },
        label: "Shajar al-Durr and the Baḥrī mamluks take power",
      },
      {
        date: {
          year: 1260,
          precision: "exact",
          month: 9,
          day: 3,
          hijri: { year: 658, source: "attested" },
        },
        label: "ʿAyn Jālūt: Mongol advance halted",
      },
      {
        date: { year: 1261, precision: "year" },
        label: "Abbasid caliphate re-installed in Cairo",
      },
      {
        date: { year: 1291, precision: "year" },
        label: "Fall of Acre; Crusader states ended",
      },
      {
        date: {
          year: 1517,
          precision: "year",
          hijri: { year: 923, source: "attested" },
        },
        label: "Ottoman conquest of Cairo",
      },
    ],
  },
  {
    id: "ilkhanate",
    kind: "empire",
    lane: "states",
    name: "Ilkhanate",
    arabic: "الدولة الإلخانية",
    start: {
      year: 1256,
      precision: "year",
      hijri: { year: 654, source: "attested" },
    },
    end: { year: 1335, precision: "year" },
    importance: 3,
    region: "iraq-iran",
    location: { name: "Tabriz", lat: 38.08, lng: 46.3 },
    summary:
      "The Mongol state in Iran and Iraq founded by Hülegü, destroyer of Baghdad (1258). Ghazan's conversion in 1295 made it a Muslim power, yet its wars with the Mamluks continued, framing Ibn Taymiyya's famous fatwas.",
    relations: [
      { type: "related", target: "sack-of-baghdad" },
      { type: "related", target: "battle-of-shaqhab" },
      {
        type: "related",
        target: "ibn-taymiyya",
        note: "object of his anti-Ilkhanid fatwas",
      },
    ],
    citations: [
      {
        source:
          "Peter Jackson, The Mongols and the Islamic World (Yale UP, 2017)",
      },
      BOSWORTH,
    ],
    details: [
      {
        date: {
          year: 1258,
          precision: "year",
          hijri: { year: 656, source: "attested" },
        },
        label: "Sack of Baghdad",
      },
      {
        date: {
          year: 1295,
          precision: "year",
          hijri: { year: 694, source: "attested" },
        },
        label: "Ghazan Khan embraces Islam",
      },
      {
        date: { year: 1304, precision: "year" },
        label: "Öljeitü; Rashīd al-Dīn's great history compiled",
      },
    ],
  },
  {
    id: "golden-horde",
    kind: "empire",
    lane: "states",
    name: "Golden Horde",
    arabic: "القبيلة الذهبية",
    start: { year: 1242, precision: "circa" },
    end: { year: 1502, precision: "year" },
    importance: 3,
    region: "central-asia",
    location: {
      name: "Sarai (Volga)",
      lat: 47.2,
      lng: 47.4,
      approximate: true,
    },
    summary:
      "The Mongol khanate of the western steppe. Berke was the first Mongol ruler to embrace Islam (1250s); under Öz Beg Khan (r. 1313–1341) Islam became the state religion, Ibn Baṭṭūṭa visited his camp.",
    relations: [
      {
        type: "related",
        target: "ibn-battuta",
        note: "visited Öz Beg Khan c. 1332–34",
      },
    ],
    citations: [
      {
        source:
          "Peter Jackson, The Mongols and the Islamic World (Yale UP, 2017)",
      },
      BOSWORTH,
    ],
  },
  {
    id: "nasrids",
    kind: "empire",
    lane: "states",
    name: "Nasrid Emirate of Granada",
    arabic: "بنو نصر في غرناطة",
    start: {
      year: 1232,
      precision: "year",
      hijri: { year: 629, source: "attested" },
    },
    end: {
      year: 1492,
      precision: "exact",
      month: 1,
      day: 2,
      hijri: { year: 897, source: "attested" },
    },
    importance: 3,
    region: "andalus-maghrib",
    location: { name: "Granada", lat: 37.18, lng: -3.6 },
    summary:
      "The last Muslim state of Iberia, perched in the Sierra Nevada for 260 years, long enough to build the Alhambra, until the surrender of 2 January 1492, months before Columbus sailed.",
    relations: [
      { type: "related", target: "alhambra" },
      { type: "related", target: "fall-of-granada" },
    ],
    citations: [
      { source: "L.P. Harvey, Islamic Spain, 1250 to 1500 (Chicago UP, 1990)" },
      BOSWORTH,
    ],
  },
  {
    id: "marinids",
    kind: "empire",
    lane: "states",
    name: "Marinids",
    arabic: "المرينيون",
    start: { year: 1244, precision: "year" },
    end: { year: 1465, precision: "year" },
    importance: 2,
    region: "andalus-maghrib",
    location: { name: "Fez", lat: 34.06, lng: -4.98 },
    summary:
      "Berber successors of the Almohads in Morocco, great builders of madrasas in Fez; Ibn Baṭṭūṭa dictated his Riḥla at their court.",
    relations: [{ type: "related", target: "rihla-ibn-battuta" }],
    citations: [BOSWORTH, EI2("Marīnids")],
  },
  {
    id: "hafsids",
    kind: "empire",
    lane: "states",
    name: "Hafsids",
    arabic: "الحفصيون",
    start: { year: 1229, precision: "year" },
    end: { year: 1574, precision: "year" },
    importance: 2,
    region: "egypt-north-africa",
    location: { name: "Tunis", lat: 36.8, lng: 10.18 },
    summary:
      "Rulers of Ifrīqiya from Tunis for three centuries; the dynasty of Ibn Khaldūn's birthplace and early career.",
    relations: [{ type: "related", target: "ibn-khaldun" }],
    citations: [BOSWORTH, EI2("Ḥafṣids")],
  },
  {
    id: "ottoman-empire",
    kind: "empire",
    lane: "states",
    name: "Ottoman Empire",
    arabic: "الدولة العثمانية",
    start: {
      year: 1299,
      precision: "circa",
      note: "Conventional founding date; Osman's beylik emerges in the 1290s–1300s.",
    },
    end: {
      year: 1922,
      precision: "year",
      hijri: { year: 1341, source: "attested" },
      note: "Sultanate abolished 1922; the Ottoman caliphate abolished 3 March 1924.",
    },
    importance: 5,
    region: "anatolia-balkans",
    location: { name: "Istanbul", lat: 41.01, lng: 28.98 },
    summary:
      "Six centuries from Anatolian frontier beylik to tri-continental empire and caliphate: conqueror of Constantinople (1453), custodian of the Ḥaramayn from 1517, ruler of the Balkans, Anatolia, the Arab lands, and North Africa, and the longest-lived Muslim great power.",
    relations: [
      { type: "related", target: "conquest-of-constantinople" },
      { type: "related", target: "ottoman-conquest-of-egypt" },
      { type: "related", target: "suleymaniye" },
      { type: "related", target: "abolition-of-caliphate" },
    ],
    citations: [
      { source: "Colin Imber, The Ottoman Empire, 1300–1650 (Palgrave, 2002)" },
      { source: "Caroline Finkel, Osman's Dream (John Murray, 2005)" },
      BOSWORTH,
    ],
    details: [
      {
        date: { year: 1299, precision: "circa" },
        label: "Osman's beylik in Bithynia (conventional date)",
      },
      {
        date: { year: 1326, precision: "year" },
        label: "Bursa taken; first capital",
      },
      {
        date: { year: 1389, precision: "year" },
        label: "Kosovo; Balkan dominance grows",
      },
      {
        date: { year: 1402, precision: "year" },
        label: "Defeat by Timur at Ankara; interregnum",
      },
      {
        date: {
          year: 1453,
          precision: "exact",
          month: 5,
          day: 29,
          hijri: { year: 857, source: "attested" },
        },
        label: "Mehmed II conquers Constantinople",
      },
      {
        date: {
          year: 1517,
          precision: "year",
          hijri: { year: 923, source: "attested" },
        },
        label: "Selim I takes Egypt; custodianship of the Ḥaramayn",
      },
      {
        date: { year: 1520, precision: "year" },
        label: "Süleymān the Magnificent (to 1566)",
      },
      {
        date: { year: 1683, precision: "year" },
        label: "Second siege of Vienna fails",
      },
      {
        date: { year: 1839, precision: "year" },
        label: "Tanzimat reforms begin",
      },
      { date: { year: 1922, precision: "year" }, label: "Sultanate abolished" },
    ],
  },
  {
    id: "timurids",
    kind: "empire",
    lane: "states",
    name: "Timurids",
    arabic: "التيموريون",
    start: {
      year: 1370,
      precision: "year",
      hijri: { year: 771, source: "attested" },
    },
    end: { year: 1507, precision: "year" },
    importance: 3,
    region: "central-asia",
    location: { name: "Samarkand", lat: 39.65, lng: 66.96 },
    summary:
      "Timur's conquests devastated a swath from Delhi to Damascus, where Ibn Khaldūn famously met him in 1401, yet his heirs presided over a dazzling renaissance in Samarkand and Herat, from Ulugh Beg's observatory to the miniature painting of Bihzād.",
    relations: [
      { type: "related", target: "ulugh-beg-observatory" },
      {
        type: "related",
        target: "ibn-khaldun",
        note: "the 1401 Damascus meeting",
      },
      {
        type: "related",
        target: "mughal-empire",
        note: "Bābur was a Timurid prince",
      },
    ],
    citations: [
      {
        source:
          "Beatrice Forbes Manz, The Rise and Rule of Tamerlane (Cambridge, 1989)",
      },
      BOSWORTH,
    ],
  },
  {
    id: "safavid-empire",
    kind: "empire",
    lane: "states",
    name: "Safavid Empire",
    arabic: "الدولة الصفوية",
    start: {
      year: 1501,
      precision: "year",
      hijri: { year: 907, source: "attested" },
    },
    end: { year: 1736, precision: "year" },
    importance: 4,
    region: "iraq-iran",
    location: { name: "Isfahan", lat: 32.65, lng: 51.67 },
    summary:
      'Shah Ismāʿīl\'s dynasty converted Iran to Twelver Shīʿism, redrawing the confessional map of the Middle East, and under Shah ʿAbbās made Isfahan "half the world". Perpetual rival of the Ottomans (from Chaldiran, 1514) and the Mughals.',
    relations: [
      { type: "related", target: "battle-of-chaldiran" },
      { type: "related", target: "naqsh-e-jahan" },
      { type: "related", target: "mulla-sadra" },
    ],
    citations: [
      { source: "Roger Savory, Iran under the Safavids (Cambridge, 1980)" },
      BOSWORTH,
    ],
    details: [
      {
        date: { year: 1501, precision: "year" },
        label: "Ismāʿīl I crowned in Tabriz",
      },
      {
        date: { year: 1514, precision: "year" },
        label: "Chaldiran: defeat by the Ottomans",
      },
      {
        date: { year: 1598, precision: "year" },
        label: "ʿAbbās I moves the capital to Isfahan",
      },
      {
        date: { year: 1736, precision: "year" },
        label: "Nādir Shāh ends Safavid rule",
      },
    ],
  },
  {
    id: "mughal-empire",
    kind: "empire",
    lane: "states",
    name: "Mughal Empire",
    arabic: "دولة المغول (الهند)",
    aliases: ["Mughals", "Timurids of India"],
    start: {
      year: 1526,
      precision: "year",
      hijri: { year: 932, source: "attested" },
    },
    end: {
      year: 1857,
      precision: "year",
      hijri: { year: 1274, source: "attested" },
      note: "Effective power collapsed after 1707; the dynasty was formally ended by the British in 1857.",
    },
    importance: 5,
    region: "south-asia",
    location: { name: "Delhi", lat: 28.61, lng: 77.21 },
    summary:
      "The Timurid dynasty of India, from Bābur's victory at Panipat to Bahādur Shāh II's exile, at its height under Akbar, Jahāngīr, Shāh Jahān, and Aurangzeb it governed well over a hundred million people and built the Taj Mahal.",
    relations: [
      { type: "related", target: "battle-of-panipat-1526" },
      { type: "related", target: "taj-mahal" },
      { type: "related", target: "fatawa-alamgiri" },
      { type: "related", target: "indian-rebellion-1857" },
    ],
    citations: [
      { source: "John F. Richards, The Mughal Empire (Cambridge, 1993)" },
      BOSWORTH,
    ],
    details: [
      {
        date: { year: 1526, precision: "year" },
        label: "Bābur wins the first battle of Panipat",
      },
      {
        date: { year: 1556, precision: "year" },
        label: "Akbar (to 1605): consolidation & pluralist experiments",
      },
      {
        date: { year: 1628, precision: "year" },
        label: "Shāh Jahān (to 1658): architectural zenith",
      },
      {
        date: { year: 1658, precision: "year" },
        label: "Aurangzeb (to 1707): greatest extent",
      },
      {
        date: { year: 1739, precision: "year" },
        label: "Nādir Shāh sacks Delhi",
      },
      {
        date: { year: 1857, precision: "year" },
        label: "Rebellion crushed; dynasty abolished",
      },
    ],
  },
  {
    id: "khanate-of-bukhara",
    kind: "empire",
    lane: "states",
    name: "Khanate of Bukhara",
    arabic: "خانية بخارى",
    start: { year: 1500, precision: "year" },
    end: { year: 1920, precision: "year" },
    importance: 2,
    region: "central-asia",
    location: { name: "Bukhara", lat: 39.77, lng: 64.42 },
    summary:
      "Uzbek successor state of the Timurids (Shaybanids, then Janids and Manghits), keeping Bukhara a center of madrasa learning until the Russian conquest and the Soviet end of the emirate in 1920.",
    citations: [BOSWORTH, EI2("Bukhārā")],
  },
  {
    id: "mali-empire",
    kind: "empire",
    lane: "states",
    name: "Mali Empire",
    arabic: "إمبراطورية مالي",
    start: {
      year: 1235,
      precision: "circa",
      note: "Conventional date of Sundiata's victory at Kirina.",
    },
    end: {
      year: 1600,
      precision: "circa",
      note: "Long decline; dating of the end is indistinct.",
    },
    importance: 4,
    region: "west-africa",
    location: { name: "Niani", lat: 11.38, lng: -8.65, approximate: true },
    summary:
      "The West African empire astride the gold routes. Mansa Mūsā's pilgrimage of 1324–25 scattered so much gold through Cairo that its price reportedly sagged for years, and put Mali on European maps, literally, in the Catalan Atlas of 1375.",
    relations: [
      { type: "related", target: "mansa-musa-hajj" },
      { type: "related", target: "sankore-timbuktu" },
      { type: "related", target: "ibn-battuta", note: "visited Mali, 1352–53" },
    ],
    citations: [
      { source: "Nehemia Levtzion, Ancient Ghana and Mali (Methuen, 1973)" },
      {
        source:
          "Levtzion & Pouwels (eds.), The History of Islam in Africa (Ohio UP, 2000)",
      },
    ],
  },
  {
    id: "songhai-empire",
    kind: "empire",
    lane: "states",
    name: "Songhai Empire",
    arabic: "إمبراطورية سنغاي",
    start: {
      year: 1464,
      precision: "circa",
      note: "Sunni ʿAlī's expansion begins c. 1464.",
    },
    end: {
      year: 1591,
      precision: "year",
      note: "Destroyed at Tondibi by a Moroccan expedition.",
    },
    importance: 3,
    region: "west-africa",
    location: { name: "Gao", lat: 16.27, lng: -0.04 },
    summary:
      "Successor to Mali on the Niger bend. Under Askia Muḥammad, pilgrim, patron of Timbuktu's scholars, correspondent of al-Suyūṭī, it became the largest state in African history to that point.",
    relations: [
      { type: "related", target: "battle-of-tondibi" },
      { type: "related", target: "sankore-timbuktu" },
      { type: "related", target: "ahmad-baba" },
    ],
    citations: [
      {
        source:
          "John O. Hunwick, Timbuktu and the Songhay Empire (Brill, 1999)",
      },
    ],
  },
  {
    id: "kanem-bornu",
    kind: "empire",
    lane: "states",
    name: "Kanem–Bornu",
    arabic: "كانم برنو",
    start: {
      year: 1075,
      precision: "circa",
      note: "Mai Ḥumai's adoption of Islam, late 11th century (traditional).",
    },
    end: { year: 1893, precision: "year" },
    importance: 2,
    region: "west-africa",
    location: { name: "Lake Chad", lat: 13.1, lng: 14.45, approximate: true },
    summary:
      "The Lake Chad empire whose rulers embraced Islam in the 11th century and kept up ties with Cairo and Istanbul for eight hundred years, one of the longest-lived Muslim dynasties anywhere.",
    citations: [
      {
        source:
          "Levtzion & Pouwels (eds.), The History of Islam in Africa (Ohio UP, 2000)",
      },
      BOSWORTH,
    ],
  },
  {
    id: "kilwa-sultanate",
    kind: "empire",
    lane: "states",
    name: "Kilwa Sultanate",
    arabic: "سلطنة كلوة",
    start: {
      year: 957,
      precision: "circa",
      note: "Traditional founding per the Kilwa Chronicle; archaeology suggests the 10th–11th centuries.",
    },
    end: {
      year: 1513,
      precision: "year",
      note: "Portuguese sack 1505; effective end of independent power.",
    },
    importance: 2,
    region: "east-africa",
    location: { name: "Kilwa Kisiwani", lat: -8.96, lng: 39.5 },
    summary:
      "The Swahili coast's leading city-state, rich on Sofala gold; Ibn Baṭṭūṭa, visiting in 1331, called it one of the most beautiful towns in the world.",
    relations: [
      { type: "related", target: "ibn-battuta", note: "visited 1331" },
    ],
    citations: [
      {
        source:
          "Levtzion & Pouwels (eds.), The History of Islam in Africa (Ohio UP, 2000)",
      },
      EI2("Kilwa"),
    ],
  },
  {
    id: "adal-sultanate",
    kind: "empire",
    lane: "states",
    name: "Adal Sultanate",
    arabic: "سلطنة عدال",
    start: { year: 1415, precision: "circa" },
    end: { year: 1577, precision: "year" },
    importance: 2,
    region: "east-africa",
    location: { name: "Harar", lat: 9.31, lng: 42.13 },
    summary:
      "Muslim sultanate of the Horn of Africa centered on Zeila and Harar, famous for the campaigns of Aḥmad Grāñ against Christian Ethiopia (1529–1543), an early theater of Ottoman–Portuguese rivalry.",
    citations: [
      {
        source:
          "Levtzion & Pouwels (eds.), The History of Islam in Africa (Ohio UP, 2000)",
      },
      EI2("ʿAdāl"),
    ],
  },
  {
    id: "samudera-pasai",
    kind: "empire",
    lane: "states",
    name: "Samudera Pasai",
    arabic: "سلطنة سمودرا باساي",
    start: {
      year: 1267,
      precision: "circa",
      note: "Traditional date for Sultan Malik al-Ṣāliḥ's conversion; gravestones corroborate a 13th-century Muslim dynasty.",
    },
    end: { year: 1521, precision: "year" },
    importance: 2,
    region: "southeast-asia",
    location: { name: "Pasai (Sumatra)", lat: 5.14, lng: 97.13 },
    summary:
      "The first significant Muslim sultanate of Southeast Asia, on Sumatra's pepper coast; Ibn Baṭṭūṭa found a functioning Islamic court here in 1345 on his way to China.",
    relations: [
      { type: "related", target: "ibn-battuta", note: "visited 1345–46" },
    ],
    citations: [
      {
        source:
          "M.C. Ricklefs, A History of Modern Indonesia since c. 1200 (Palgrave, 4th ed. 2008)",
      },
    ],
  },
  {
    id: "malacca-sultanate",
    kind: "empire",
    lane: "states",
    name: "Sultanate of Malacca",
    arabic: "سلطنة ملقا",
    start: { year: 1400, precision: "circa" },
    end: {
      year: 1511,
      precision: "year",
      note: "Captured by the Portuguese under Albuquerque.",
    },
    importance: 3,
    region: "southeast-asia",
    location: { name: "Malacca", lat: 2.2, lng: 102.25 },
    summary:
      "The emporium that made Islam the language of trade in maritime Southeast Asia: from Malacca the faith spread along the spice routes to Java, Borneo, and the Philippines, until the Portuguese seized the city in 1511.",
    relations: [
      {
        type: "related",
        target: "zheng-he-voyages",
        note: "regular port of the Ming treasure fleets",
      },
    ],
    citations: [
      {
        source:
          "M.C. Ricklefs, A History of Modern Indonesia since c. 1200 (Palgrave, 4th ed. 2008)",
      },
      EI2("Malacca"),
    ],
  },
  {
    id: "demak-sultanate",
    kind: "empire",
    lane: "states",
    name: "Demak Sultanate",
    arabic: "سلطنة ديماك",
    start: { year: 1475, precision: "circa" },
    end: { year: 1554, precision: "circa" },
    importance: 2,
    region: "southeast-asia",
    location: { name: "Demak (Java)", lat: -6.89, lng: 110.64 },
    summary:
      "Java's first major Islamic state, linked in tradition to the Wali Songo (nine saints) credited with the island's Islamization.",
    citations: [
      {
        source:
          "M.C. Ricklefs, A History of Modern Indonesia since c. 1200 (Palgrave, 4th ed. 2008)",
      },
    ],
  },
  {
    id: "aceh-sultanate",
    kind: "empire",
    lane: "states",
    name: "Aceh Sultanate",
    arabic: "سلطنة آتشيه",
    start: { year: 1496, precision: "circa" },
    end: {
      year: 1903,
      precision: "year",
      note: "Final Dutch annexation after the long Aceh War.",
    },
    importance: 3,
    region: "southeast-asia",
    location: { name: "Aceh", lat: 5.55, lng: 95.32 },
    summary:
      '"The veranda of Makkah": Sumatran sultanate that fought the Portuguese, corresponded with the Ottomans, and under Iskandar Muda (r. 1607–1636) and its scholar-queens hosted the golden age of Malay Islamic letters.',
    relations: [{ type: "related", target: "abd-al-rauf-al-sinkili" }],
    citations: [
      {
        source:
          "Peter Riddell, Islam and the Malay-Indonesian World (Hurst, 2001)",
      },
      {
        source:
          "M.C. Ricklefs, A History of Modern Indonesia since c. 1200 (Palgrave, 4th ed. 2008)",
      },
    ],
  },
  {
    id: "sokoto-caliphate",
    kind: "empire",
    lane: "states",
    name: "Sokoto Caliphate",
    arabic: "خلافة صكتو",
    start: {
      year: 1804,
      precision: "year",
      hijri: { year: 1218, source: "attested" },
    },
    end: { year: 1903, precision: "year" },
    importance: 3,
    region: "west-africa",
    location: { name: "Sokoto", lat: 13.06, lng: 5.24 },
    summary:
      "Born of ʿUthmān dan Fodio's jihad, the largest state in 19th-century West Africa, a federation of emirates with a remarkable written culture in Arabic, Hausa, and Fulfulde, ended by British conquest in 1903.",
    relations: [{ type: "founded_by", target: "usman-dan-fodio" }],
    citations: [
      { source: "Murray Last, The Sokoto Caliphate (Longman, 1967)" },
    ],
  },
  {
    id: "emirate-of-diriyah",
    kind: "empire",
    lane: "states",
    name: "Emirate of Diriyah (first Saudi state)",
    arabic: "إمارة الدرعية",
    start: {
      year: 1744,
      precision: "year",
      hijri: { year: 1157, source: "attested" },
      note: "The pact of Muḥammad ibn Saʿūd and Muḥammad ibn ʿAbd al-Wahhāb.",
    },
    end: {
      year: 1818,
      precision: "year",
      note: "Destroyed by the Ottoman-Egyptian campaign of Ibrāhīm Pasha.",
    },
    importance: 2,
    region: "arabia",
    location: { name: "Diriyah", lat: 24.73, lng: 46.57 },
    summary:
      "The Najdī emirate founded on the 1744 pact between the house of Saʿūd and Ibn ʿAbd al-Wahhāb; it briefly took the Hijaz before Ottoman forces razed Diriyah in 1818. Its two successors culminate in modern Saudi Arabia (1932).",
    relations: [{ type: "related", target: "ibn-abd-al-wahhab" }],
    citations: [
      {
        source:
          "Madawi Al-Rasheed, A History of Saudi Arabia (Cambridge, 2002)",
      },
      BOSWORTH,
    ],
  },
];

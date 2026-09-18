/**
 * Scholars of the classical and middle periods (5th–10th AH / 11th–16th CE).
 */
import type { TimelineRecord } from "@/lib/types";

const EI2 = (entry: string, author?: string) => ({
  source: "Encyclopaedia of Islam, 2nd ed. (Brill)",
  detail: `s.v. "${entry}"${author ? ` (${author})` : ""}`,
});
const SIYAR = {
  source: "al-Dhahabī, Siyar aʿlām al-nubalāʾ",
  detail: "primary biographical source",
};

export const classicalScholarRecords: TimelineRecord[] = [
  {
    id: "ibn-hazm",
    kind: "person",
    lane: "scholars",
    name: "Ibn Ḥazm",
    arabic: "ابن حزم",
    start: {
      year: 994,
      precision: "year",
      hijri: { year: 384, source: "attested" },
    },
    end: {
      year: 1064,
      precision: "year",
      hijri: { year: 456, source: "attested" },
    },
    importance: 4,
    region: "andalus-maghrib",
    location: { name: "Córdoba", lat: 37.88, lng: -4.78 },
    summary:
      "Andalusi polymath and champion of the Ẓāhirī (literalist) school; author on law, theology, comparative religion, and the celebrated treatise on love, Ṭawq al-Ḥamāma.",
    relations: [
      {
        type: "related",
        target: "cordoba-umayyads",
        note: "lived through the caliphate's collapse",
      },
    ],
    citations: [EI2("Ibn Ḥazm", "R. Arnaldez"), SIYAR],
  },
  {
    id: "al-mawardi",
    kind: "person",
    lane: "scholars",
    name: "al-Māwardī",
    arabic: "الماوردي",
    start: {
      year: 974,
      precision: "year",
      hijri: { year: 364, source: "attested" },
    },
    end: {
      year: 1058,
      precision: "year",
      hijri: { year: 450, source: "attested" },
    },
    importance: 3,
    region: "iraq-iran",
    location: { name: "Baghdad", lat: 33.34, lng: 44.4 },
    summary:
      "Shāfiʿī judge in Buyid-era Baghdad whose al-Aḥkām al-Sulṭāniyya became the classic statement of Islamic public and constitutional law.",
    citations: [EI2("al-Māwardī", "C. Brockelmann"), SIYAR],
  },
  {
    id: "karima-al-marwaziyya",
    kind: "person",
    lane: "scholars",
    name: "Karīma al-Marwaziyya",
    arabic: "كريمة المروزية",
    start: { year: 975, precision: "circa" },
    end: {
      year: 1070,
      precision: "year",
      hijri: { year: 463, source: "attested" },
    },
    importance: 2,
    region: "arabia",
    location: { name: "Makkah", lat: 21.42, lng: 39.83 },
    summary:
      "Scholar of Makkah regarded as one of the most authoritative transmitters of Ṣaḥīḥ al-Bukhārī; students traveled from across the Muslim world to read the text with her.",
    relations: [
      {
        type: "related",
        target: "sahih-al-bukhari",
        note: "authoritative transmitter of the text",
      },
    ],
    citations: [
      SIYAR,
      {
        source:
          "Mohammad Akram Nadwi, al-Muhaddithat: The Women Scholars in Islam (Interface, 2007)",
      },
    ],
  },
  {
    id: "al-juwayni",
    kind: "person",
    lane: "scholars",
    name: "al-Juwaynī (Imām al-Ḥaramayn)",
    arabic: "إمام الحرمين الجويني",
    start: {
      year: 1028,
      precision: "year",
      hijri: { year: 419, source: "attested" },
    },
    end: {
      year: 1085,
      precision: "year",
      hijri: { year: 478, source: "attested" },
    },
    importance: 3,
    region: "iraq-iran",
    location: { name: "Nishapur", lat: 36.21, lng: 58.8 },
    summary:
      "Leading Shāfiʿī-Ashʿarī theorist of his age, head of the Niẓāmiyya of Nishapur and teacher of al-Ghazālī.",
    relations: [
      { type: "teacher_of", target: "al-ghazali" },
      {
        type: "related",
        target: "nizamiyya-baghdad",
        note: "taught in the sister madrasa at Nishapur",
      },
    ],
    citations: [EI2("al-Djuwaynī", "C. Brockelmann/[L. Gardet]"), SIYAR],
  },
  {
    id: "al-ghazali",
    kind: "person",
    lane: "scholars",
    name: "Abū Ḥāmid al-Ghazālī",
    arabic: "أبو حامد الغزالي",
    aliases: ["Ghazali", "Algazel"],
    start: {
      year: 1058,
      precision: "year",
      hijri: { year: 450, source: "attested" },
    },
    end: {
      year: 1111,
      precision: "year",
      hijri: { year: 505, source: "attested" },
    },
    importance: 5,
    region: "iraq-iran",
    location: { name: "Tus", lat: 36.49, lng: 59.51 },
    places: [
      { name: "Tus (birth & death)", lat: 36.49, lng: 59.51 },
      { name: "Baghdad (Niẓāmiyya)", lat: 33.34, lng: 44.4 },
      { name: "Damascus (retreat)", lat: 33.51, lng: 36.29 },
    ],
    summary:
      '"The Proof of Islam": jurist, theologian, and mystic who left the most prestigious chair in Baghdad at the height of fame, and whose Iḥyāʾ ʿUlūm al-Dīn re-centered the religious sciences on the reform of the heart.',
    relations: [
      { type: "student_of", target: "al-juwayni" },
      { type: "wrote", target: "ihya-ulum-al-din" },
      {
        type: "related",
        target: "nizamiyya-baghdad",
        note: "head professor, 1091–1095",
      },
    ],
    citations: [EI2("al-Ghazālī", "W. Montgomery Watt"), SIYAR],
    details: [
      {
        date: {
          year: 1091,
          precision: "year",
          hijri: { year: 484, source: "attested" },
        },
        label: "Appointed to the Niẓāmiyya of Baghdad",
      },
      {
        date: {
          year: 1095,
          precision: "year",
          hijri: { year: 488, source: "attested" },
        },
        label: "Spiritual crisis; leaves Baghdad for Damascus and Jerusalem",
      },
      {
        date: { year: 1096, precision: "circa" },
        label: "Begins Iḥyāʾ ʿUlūm al-Dīn during his retreat",
      },
      {
        date: {
          year: 1106,
          precision: "year",
          hijri: { year: 499, source: "attested" },
        },
        label: "Returns to teach at Nishapur",
      },
    ],
  },
  {
    id: "abd-al-qadir-al-jilani",
    kind: "person",
    lane: "scholars",
    name: "ʿAbd al-Qādir al-Jīlānī",
    arabic: "عبد القادر الجيلاني",
    start: {
      year: 1077,
      precision: "circa",
      hijri: { year: 470, source: "attested" },
    },
    end: {
      year: 1166,
      precision: "year",
      hijri: { year: 561, source: "attested" },
    },
    importance: 4,
    region: "iraq-iran",
    location: { name: "Baghdad", lat: 33.34, lng: 44.4 },
    summary:
      "Ḥanbalī preacher of Baghdad whose school and memory crystallized after his death into the Qādiriyya, one of the most widespread Sufi orders from West Africa to Southeast Asia.",
    relations: [
      {
        type: "related",
        target: "sufi-orders",
        note: "the Qādiriyya traces itself to him",
      },
    ],
    citations: [EI2("ʿAbd al-Ḳādir al-Djīlānī", "W. Braune"), SIYAR],
  },
  {
    id: "ibn-rushd",
    kind: "person",
    lane: "scholars",
    name: "Ibn Rushd (Averroes)",
    arabic: "ابن رشد",
    aliases: ["Averroes"],
    start: {
      year: 1126,
      precision: "year",
      hijri: { year: 520, source: "attested" },
    },
    end: {
      year: 1198,
      precision: "year",
      hijri: { year: 595, source: "attested" },
      note: "Died in Marrakesh after a period of disgrace and rehabilitation.",
    },
    importance: 5,
    region: "andalus-maghrib",
    location: { name: "Córdoba", lat: 37.88, lng: -4.78 },
    places: [
      { name: "Córdoba (birth)", lat: 37.88, lng: -4.78 },
      { name: "Marrakesh (death)", lat: 31.63, lng: -8.0 },
    ],
    summary:
      'Chief judge of Córdoba, Mālikī jurist, physician, and the greatest medieval commentator on Aristotle: read in Latin as "the Commentator", he shaped European scholasticism while his Bidāyat al-Mujtahid modeled comparative Islamic law.',
    relations: [
      { type: "wrote", target: "bidayat-al-mujtahid" },
      {
        type: "related",
        target: "almohads",
        note: "court physician and judge under Almohad rule",
      },
    ],
    citations: [EI2("Ibn Rushd", "R. Arnaldez"), SIYAR],
  },
  {
    id: "fakhr-al-din-al-razi",
    kind: "person",
    lane: "scholars",
    name: "Fakhr al-Dīn al-Rāzī",
    arabic: "فخر الدين الرازي",
    start: {
      year: 1150,
      precision: "year",
      hijri: { year: 544, source: "attested" },
    },
    end: {
      year: 1210,
      precision: "year",
      hijri: { year: 606, source: "attested" },
    },
    importance: 4,
    region: "iraq-iran",
    location: { name: "Herat", lat: 34.35, lng: 62.2 },
    summary:
      "Ashʿarī theologian and exegete whose enormous Mafātīḥ al-Ghayb fused Qurʾan commentary with philosophy and the sciences of his day.",
    citations: [EI2("Fakhr al-Dīn al-Rāzī", "G.C. Anawati"), SIYAR],
  },
  {
    id: "ibn-qudama",
    kind: "person",
    lane: "scholars",
    name: "Ibn Qudāma al-Maqdisī",
    arabic: "ابن قدامة المقدسي",
    start: {
      year: 1147,
      precision: "year",
      hijri: { year: 541, source: "attested" },
    },
    end: {
      year: 1223,
      precision: "year",
      hijri: { year: 620, source: "attested" },
    },
    importance: 4,
    region: "levant",
    location: { name: "Damascus", lat: 33.51, lng: 36.29 },
    summary:
      "Ḥanbalī jurist of Damascus, veteran of Saladin's Jerusalem campaign, and author of al-Mughnī, the vast comparative compendium that remains the school's reference work.",
    relations: [
      {
        type: "related",
        target: "ayyubids",
        note: "served in Saladin's army as a scholar",
      },
    ],
    citations: [EI2("Ibn Ḳudāma al-Maḳdisī", "G. Makdisi"), SIYAR],
  },
  {
    id: "ibn-arabi",
    kind: "person",
    lane: "scholars",
    name: "Ibn ʿArabī",
    arabic: "ابن عربي",
    start: {
      year: 1165,
      precision: "year",
      hijri: { year: 560, source: "attested" },
    },
    end: {
      year: 1240,
      precision: "year",
      hijri: { year: 638, source: "attested" },
    },
    importance: 4,
    region: "andalus-maghrib",
    location: { name: "Murcia", lat: 37.98, lng: -1.13 },
    places: [
      { name: "Murcia (birth)", lat: 37.98, lng: -1.13 },
      { name: "Damascus (death)", lat: 33.51, lng: 36.29 },
    ],
    summary:
      'Andalusi mystic known to admirers as "the Greatest Master" (al-Shaykh al-Akbar). His metaphysics of the unity of being pervaded later Sufism from the Balkans to Java, while drawing sharp criticism from other scholars; his legacy remains debated.',
    citations: [
      EI2("Ibn al-ʿArabī", "A. Ateş"),
      { source: "W.C. Chittick, The Sufi Path of Knowledge (SUNY, 1989)" },
    ],
  },
  {
    id: "al-qurtubi",
    kind: "person",
    lane: "scholars",
    name: "al-Qurṭubī",
    arabic: "القرطبي",
    start: {
      year: 1214,
      precision: "circa",
      note: "Birth year uncertain; early 7th century AH.",
    },
    end: {
      year: 1273,
      precision: "year",
      hijri: { year: 671, source: "attested" },
    },
    importance: 3,
    region: "egypt-north-africa",
    location: {
      name: "Munya Abi al-Khusayb (Egypt)",
      lat: 28.08,
      lng: 30.75,
      approximate: true,
    },
    summary:
      "Andalusi exegete, exiled by the Reconquista to Egypt, whose al-Jāmiʿ li-Aḥkām al-Qurʾān remains the classic legal commentary on the Qurʾan.",
    citations: [EI2("al-Ḳurṭubī"), SIYAR],
  },
  {
    id: "al-nawawi",
    kind: "person",
    lane: "scholars",
    name: "Imam al-Nawawī",
    arabic: "الإمام النووي",
    aliases: ["Nawawi", "Yahya ibn Sharaf"],
    start: {
      year: 1233,
      precision: "year",
      hijri: { year: 631, source: "attested" },
    },
    end: {
      year: 1277,
      precision: "year",
      hijri: { year: 676, source: "attested" },
      note: "Died at 44 in his home village of Nawā.",
    },
    importance: 5,
    region: "levant",
    location: { name: "Nawā (Hauran)", lat: 32.89, lng: 36.04 },
    places: [
      { name: "Nawā (birth & death)", lat: 32.89, lng: 36.04 },
      { name: "Damascus (teaching)", lat: 33.51, lng: 36.29 },
    ],
    summary:
      "Ascetic Damascene scholar who, in a short life of 44 years, produced the books through which most Muslims still meet their tradition: Riyāḍ al-Ṣāliḥīn, the Forty Hadith, the commentary on Ṣaḥīḥ Muslim, and the Shāfiʿī handbook Minhāj al-Ṭālibīn.",
    relations: [
      { type: "wrote", target: "riyad-al-salihin" },
      {
        type: "related",
        target: "sahih-muslim",
        note: "author of its standard commentary",
      },
      {
        type: "related",
        target: "mamluk-sultanate",
        note: "famously admonished Sultan Baybars over taxes",
      },
    ],
    citations: [EI2("al-Nawawī", "W. Heffening"), SIYAR],
  },
  {
    id: "ibn-taymiyya",
    kind: "person",
    lane: "scholars",
    name: "Ibn Taymiyya",
    arabic: "ابن تيمية",
    aliases: ["Taqi al-Din Ibn Taymiyya", "Shaykh al-Islam Ibn Taymiyya"],
    start: {
      year: 1263,
      month: 1,
      day: 22,
      precision: "exact",
      hijri: { year: 661, source: "attested" },
      note: "10 Rabīʿ al-Awwal 661 AH, in Harran.",
    },
    end: {
      year: 1328,
      month: 9,
      day: 26,
      precision: "exact",
      hijri: { year: 728, source: "attested" },
      note: "20 Dhū al-Qaʿda 728 AH, in the citadel of Damascus.",
    },
    importance: 5,
    region: "levant",
    location: { name: "Damascus", lat: 33.51, lng: 36.29 },
    places: [
      { name: "Harran (birth)", lat: 36.87, lng: 39.03 },
      { name: "Damascus (career & death)", lat: 33.51, lng: 36.29 },
      { name: "Cairo (trials & prison)", lat: 30.04, lng: 31.24 },
    ],
    summary:
      "Ḥanbalī jurist-theologian of Mamluk Damascus: a refugee from the Mongol sack of Harran who became the most formidable, and most controversial, scholar of his era, debating theologians, rallying resistance to the Ilkhanid invasions, and writing from prison until his death there.",
    relations: [
      { type: "teacher_of", target: "ibn-al-qayyim" },
      {
        type: "teacher_of",
        target: "ibn-kathir",
        note: "influenced him; Ibn Kathīr studied with his circle",
      },
      { type: "wrote", target: "aqida-wasitiyya" },
      {
        type: "related",
        target: "al-dhahabi",
        note: "colleague and qualified admirer",
      },
      {
        type: "related",
        target: "mamluk-sultanate",
        note: "lived under, and clashed with, Mamluk authorities",
      },
      {
        type: "related",
        target: "battle-of-shaqhab",
        note: "present at the battle, urging the troops",
      },
      {
        type: "related",
        target: "ilkhanate",
        note: "issued the famous anti-Ilkhanid fatwas",
      },
    ],
    citations: [
      EI2("Ibn Taymiyya", "H. Laoust"),
      {
        source: "Ibn Kathīr, al-Bidāya wa-l-Nihāya",
        detail: "primary chronicle for his trials",
      },
      {
        source:
          'Caterina Bori, "Ibn Taymiyya wa-Jamāʿatu-hu", in Ibn Taymiyya and His Times (OUP, 2010)',
      },
    ],
    details: [
      {
        date: {
          year: 1269,
          precision: "circa",
          hijri: { year: 667, source: "attested" },
        },
        label: "Family flees Harran to Damascus before Mongol raids",
      },
      {
        date: {
          year: 1284,
          precision: "year",
          hijri: { year: 683, source: "attested" },
        },
        label: "Begins public teaching after his father's death",
      },
      {
        date: {
          year: 1298,
          precision: "year",
          hijri: { year: 698, source: "attested" },
        },
        label: "Writes al-ʿAqīda al-Wāsiṭiyya",
      },
      {
        date: {
          year: 1303,
          precision: "year",
          hijri: { year: 702, source: "attested" },
        },
        label: "Present at the battle of Shaqḥab against the Ilkhanids",
      },
      {
        date: {
          year: 1306,
          precision: "year",
          hijri: { year: 705, source: "attested" },
        },
        label:
          "Tried in Damascus over the Wāsiṭiyya; summoned to Cairo and imprisoned",
      },
      {
        date: {
          year: 1310,
          precision: "circa",
          hijri: { year: 709, source: "attested" },
        },
        label: "Detention in Alexandria; returns to favor in Cairo",
      },
      {
        date: {
          year: 1313,
          precision: "year",
          hijri: { year: 712, source: "attested" },
        },
        label: "Returns to Damascus; Ibn al-Qayyim joins his circle",
      },
      {
        date: {
          year: 1320,
          precision: "year",
          hijri: { year: 720, source: "attested" },
        },
        label: "Imprisoned over his divorce-oath fatwa",
      },
      {
        date: {
          year: 1326,
          precision: "year",
          hijri: { year: 726, source: "attested" },
        },
        label: "Final imprisonment in the Damascus citadel",
      },
      {
        date: {
          year: 1328,
          precision: "exact",
          month: 9,
          hijri: { year: 728, source: "attested" },
        },
        label: "Dies in the citadel; vast crowds at his funeral",
      },
    ],
  },
  {
    id: "al-dhahabi",
    kind: "person",
    lane: "scholars",
    name: "al-Dhahabī",
    arabic: "الذهبي",
    start: {
      year: 1274,
      precision: "year",
      hijri: { year: 673, source: "attested" },
    },
    end: {
      year: 1348,
      precision: "year",
      hijri: { year: 748, source: "attested" },
    },
    importance: 4,
    region: "levant",
    location: { name: "Damascus", lat: 33.51, lng: 36.29 },
    summary:
      "Historian and hadith critic of Damascus whose Siyar aʿlām al-nubalāʾ and Tārīkh al-Islām are the great biographical archives of Islamic civilization, a principal source for this timeline.",
    relations: [
      {
        type: "related",
        target: "ibn-taymiyya",
        note: "companion and critic-admirer",
      },
    ],
    citations: [EI2("al-Dhahabī", "M. Ben Cheneb/[J. de Somogyi]")],
  },
  {
    id: "ibn-al-qayyim",
    kind: "person",
    lane: "scholars",
    name: "Ibn Qayyim al-Jawziyya",
    arabic: "ابن قيم الجوزية",
    aliases: ["Ibn al-Qayyim"],
    start: {
      year: 1292,
      precision: "year",
      hijri: { year: 691, source: "attested" },
    },
    end: {
      year: 1350,
      precision: "year",
      hijri: { year: 751, source: "attested" },
    },
    importance: 4,
    region: "levant",
    location: { name: "Damascus", lat: 33.51, lng: 36.29 },
    summary:
      "Closest student and literary executor of Ibn Taymiyya, imprisoned beside him in the Damascus citadel, whose own works on law, spirituality, and the soul (Zād al-Maʿād, Madārij al-Sālikīn) carried the school to later centuries.",
    relations: [
      {
        type: "student_of",
        target: "ibn-taymiyya",
        note: "from 712 AH / 1313 until the master's death",
      },
      { type: "wrote", target: "zad-al-maad" },
      { type: "teacher_of", target: "ibn-kathir" },
    ],
    citations: [
      EI2("Ibn Ḳayyim al-Djawziyya", "H. Laoust"),
      {
        source: "Ibn Rajab, al-Dhayl ʿalā Ṭabaqāt al-Ḥanābila",
        detail: "primary source",
      },
    ],
    details: [
      {
        date: {
          year: 1313,
          precision: "year",
          hijri: { year: 712, source: "attested" },
        },
        label: "Joins Ibn Taymiyya's circle",
      },
      {
        date: {
          year: 1326,
          precision: "year",
          hijri: { year: 726, source: "attested" },
        },
        label: "Imprisoned in the citadel with his teacher",
      },
      {
        date: {
          year: 1328,
          precision: "year",
          hijri: { year: 728, source: "attested" },
        },
        label: "Released after Ibn Taymiyya's death",
      },
    ],
  },
  {
    id: "ibn-kathir",
    kind: "person",
    lane: "scholars",
    name: "Ibn Kathīr",
    arabic: "ابن كثير",
    start: {
      year: 1300,
      precision: "circa",
      hijri: { year: 700, source: "attested" },
      note: "Born c. 700 AH in Bosra district.",
    },
    end: {
      year: 1373,
      precision: "year",
      hijri: { year: 774, source: "attested" },
    },
    importance: 4,
    region: "levant",
    location: { name: "Damascus", lat: 33.51, lng: 36.29 },
    summary:
      "Damascene exegete and historian, student of al-Mizzī and of Ibn Taymiyya's circle; his Tafsīr remains among the most read in the world and his al-Bidāya wa-l-Nihāya chronicles Islamic history to his own day.",
    relations: [
      { type: "student_of", target: "ibn-taymiyya" },
      { type: "student_of", target: "al-dhahabi" },
    ],
    citations: [EI2("Ibn Kathīr", "H. Laoust")],
  },
  {
    id: "al-taftazani",
    kind: "person",
    lane: "scholars",
    name: "al-Taftāzānī",
    arabic: "التفتازاني",
    start: {
      year: 1322,
      precision: "year",
      hijri: { year: 722, source: "attested" },
    },
    end: {
      year: 1390,
      precision: "circa",
      hijri: { year: 793, source: "attested" },
      note: "Death reported 791–793 AH, in Samarkand under Timur.",
    },
    importance: 3,
    region: "central-asia",
    location: { name: "Samarkand", lat: 39.65, lng: 66.96 },
    summary:
      'Master of the "instrumental" sciences, rhetoric, logic, theology, whose textbooks anchored madrasa curricula from the Balkans to Bengal for five centuries.',
    relations: [
      { type: "related", target: "timurids", note: "served at Timur's court" },
    ],
    citations: [EI2("al-Taftāzānī", "W. Madelung")],
  },
  {
    id: "ibn-khaldun",
    kind: "person",
    lane: "scholars",
    name: "Ibn Khaldūn",
    arabic: "ابن خلدون",
    start: {
      year: 1332,
      precision: "year",
      hijri: { year: 732, source: "attested" },
    },
    end: {
      year: 1406,
      precision: "year",
      hijri: { year: 808, source: "attested" },
    },
    importance: 5,
    region: "egypt-north-africa",
    location: { name: "Tunis", lat: 36.8, lng: 10.18 },
    places: [
      { name: "Tunis (birth)", lat: 36.8, lng: 10.18 },
      {
        name: "Qalʿat Banī Salāma (writes the Muqaddima)",
        lat: 35.3,
        lng: 1.2,
        approximate: true,
      },
      { name: "Cairo (judge & death)", lat: 30.04, lng: 31.24 },
      { name: "Damascus (meets Timur, 1401)", lat: 33.51, lng: 36.29 },
    ],
    summary:
      "Statesman-scholar of the Maghrib, judge in Mamluk Cairo, and author of the Muqaddima, the pioneering analysis of civilization, group solidarity (ʿaṣabiyya), and the rise and fall of states. He famously parleyed with Timur outside besieged Damascus in 1401.",
    relations: [
      { type: "wrote", target: "al-muqaddima" },
      {
        type: "related",
        target: "hafsids",
        note: "served Hafsid and other Maghribi courts",
      },
      {
        type: "related",
        target: "mamluk-sultanate",
        note: "chief Mālikī judge in Cairo",
      },
      {
        type: "related",
        target: "timurids",
        note: "met Timur during the siege of Damascus, 1401",
      },
    ],
    citations: [
      EI2("Ibn Khaldūn", "M. Talbi"),
      {
        source: "Franz Rosenthal (tr.), The Muqaddimah (Princeton UP, 1958)",
        detail: "introduction",
      },
    ],
  },
  {
    id: "ibn-hajar",
    kind: "person",
    lane: "scholars",
    name: "Ibn Ḥajar al-ʿAsqalānī",
    arabic: "ابن حجر العسقلاني",
    start: {
      year: 1372,
      precision: "year",
      hijri: { year: 773, source: "attested" },
    },
    end: {
      year: 1449,
      precision: "year",
      hijri: { year: 852, source: "attested" },
    },
    importance: 4,
    region: "egypt-north-africa",
    location: { name: "Cairo", lat: 30.04, lng: 31.24 },
    summary:
      "Chief judge of Mamluk Egypt and the last universally acknowledged master of hadith criticism; his Fatḥ al-Bārī, the great commentary on Ṣaḥīḥ al-Bukhārī, took a quarter-century to write.",
    relations: [
      { type: "wrote", target: "fath-al-bari" },
      {
        type: "related",
        target: "sahih-al-bukhari",
        note: "author of its definitive commentary",
      },
    ],
    citations: [EI2("Ibn Ḥadjar al-ʿAsḳalānī", "F. Rosenthal")],
  },
  {
    id: "al-suyuti",
    kind: "person",
    lane: "scholars",
    name: "Jalāl al-Dīn al-Suyūṭī",
    arabic: "جلال الدين السيوطي",
    start: {
      year: 1445,
      precision: "year",
      hijri: { year: 849, source: "attested" },
    },
    end: {
      year: 1505,
      precision: "year",
      hijri: { year: 911, source: "attested" },
    },
    importance: 4,
    region: "egypt-north-africa",
    location: { name: "Cairo", lat: 30.04, lng: 31.24 },
    summary:
      "Astonishingly prolific Cairene polymath, perhaps a thousand works, including half of the ubiquitous Tafsīr al-Jalālayn and the Qurʾanic-sciences manual al-Itqān.",
    citations: [EI2("al-Suyūṭī", "E. Geoffroy")],
  },
];

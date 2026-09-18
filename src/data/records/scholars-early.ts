/**
 * Scholars of the formative centuries (2nd–4th AH / 8th–10th CE).
 * Death dates are attested in AH; several birth years are approximate.
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

export const earlyScholarRecords: TimelineRecord[] = [
  {
    id: "abu-hanifa",
    kind: "person",
    lane: "scholars",
    name: "Imam Abū Ḥanīfa",
    arabic: "الإمام أبو حنيفة",
    aliases: ["Nu'man ibn Thabit", "Abu Hanifa"],
    start: {
      year: 699,
      precision: "year",
      hijri: { year: 80, source: "attested" },
    },
    end: {
      year: 767,
      precision: "year",
      hijri: { year: 150, source: "attested" },
      note: "Died in prison in Baghdad after refusing a judgeship.",
    },
    importance: 5,
    region: "iraq-iran",
    location: { name: "Kufa", lat: 32.03, lng: 44.4 },
    places: [
      { name: "Kufa", lat: 32.03, lng: 44.4 },
      { name: "Baghdad", lat: 33.34, lng: 44.4 },
    ],
    summary:
      "Jurist of Kufa and eponym of the Ḥanafī school, historically the most widely followed school of Islamic law, from the Ottoman lands to Central and South Asia. A silk merchant famed for hypothetical legal reasoning (raʾy).",
    relations: [
      { type: "founded", target: "hanafi-school" },
      { type: "teacher_of", target: "abu-yusuf" },
      { type: "teacher_of", target: "al-shaybani" },
    ],
    citations: [EI2("Abū Ḥanīfa", "J. Schacht"), SIYAR],
  },
  {
    id: "malik-ibn-anas",
    kind: "person",
    lane: "scholars",
    name: "Imam Mālik ibn Anas",
    arabic: "الإمام مالك بن أنس",
    aliases: ["Malik", "Imam of Madinah"],
    start: {
      year: 711,
      precision: "circa",
      hijri: { year: 93, source: "attested" },
      note: "Birth reported 90–97 AH.",
    },
    end: {
      year: 795,
      precision: "year",
      hijri: { year: 179, source: "attested" },
    },
    importance: 5,
    region: "arabia",
    location: { name: "Madinah", lat: 24.47, lng: 39.61 },
    summary:
      "The Imam of Madinah and eponym of the Mālikī school, dominant in North and West Africa and al-Andalus. His al-Muwaṭṭaʾ wove the practice of Madinah into the earliest surviving law book of Islam.",
    relations: [
      { type: "wrote", target: "al-muwatta" },
      { type: "founded", target: "maliki-school" },
      { type: "teacher_of", target: "al-shafii" },
    ],
    citations: [EI2("Mālik b. Anas", "J. Schacht"), SIYAR],
  },
  {
    id: "jafar-al-sadiq",
    kind: "person",
    lane: "scholars",
    name: "Jaʿfar al-Ṣādiq",
    arabic: "جعفر الصادق",
    start: {
      year: 702,
      precision: "circa",
      hijri: { year: 83, source: "attested" },
      note: "Birth also reported 80 AH.",
    },
    end: {
      year: 765,
      precision: "year",
      hijri: { year: 148, source: "attested" },
    },
    importance: 4,
    region: "arabia",
    location: { name: "Madinah", lat: 24.47, lng: 39.61 },
    summary:
      "Descendant of the Prophet ﷺ and one of the most revered teachers of Madinah: the sixth Imam of the Shīʿa and, in Sunni memory, a master who taught (or exchanged with) figures like Abū Ḥanīfa and Mālik.",
    citations: [EI2("Djaʿfar al-Ṣādiḳ", "M.G.S. Hodgson"), SIYAR],
  },
  {
    id: "sufyan-al-thawri",
    kind: "person",
    lane: "scholars",
    name: "Sufyān al-Thawrī",
    arabic: "سفيان الثوري",
    start: {
      year: 716,
      precision: "year",
      hijri: { year: 97, source: "attested" },
    },
    end: {
      year: 778,
      precision: "year",
      hijri: { year: 161, source: "attested" },
    },
    importance: 3,
    region: "iraq-iran",
    location: { name: "Kufa", lat: 32.03, lng: 44.4 },
    summary:
      "Kufan hadith master and jurist whose own legal school flourished for centuries before fading; a byword for scrupulous piety and independence from rulers.",
    citations: [EI2("Sufyān al-Thawrī"), SIYAR],
  },
  {
    id: "al-awzai",
    kind: "person",
    lane: "scholars",
    name: "al-Awzāʿī",
    arabic: "الأوزاعي",
    start: {
      year: 707,
      precision: "year",
      hijri: { year: 88, source: "attested" },
    },
    end: {
      year: 774,
      precision: "year",
      hijri: { year: 157, source: "attested" },
    },
    importance: 3,
    region: "levant",
    location: { name: "Beirut", lat: 33.89, lng: 35.5 },
    summary:
      "The leading jurist of Syria, whose school governed the Levant and early al-Andalus before being displaced by the Mālikī and Shāfiʿī schools.",
    citations: [EI2("al-Awzāʿī", "J. Schacht"), SIYAR],
  },
  {
    id: "ibn-al-mubarak",
    kind: "person",
    lane: "scholars",
    name: "ʿAbdullāh ibn al-Mubārak",
    arabic: "عبد الله بن المبارك",
    start: {
      year: 736,
      precision: "year",
      hijri: { year: 118, source: "attested" },
    },
    end: {
      year: 797,
      precision: "year",
      hijri: { year: 181, source: "attested" },
    },
    importance: 3,
    region: "central-asia",
    location: { name: "Merv", lat: 37.66, lng: 62.16 },
    summary:
      "Scholar of Merv who combined hadith mastery, frontier jihad, trade, and asceticism; his Kitāb al-Zuhd is among the earliest books on renunciation.",
    citations: [EI2("Ibn al-Mubārak"), SIYAR],
  },
  {
    id: "abu-yusuf",
    kind: "person",
    lane: "scholars",
    name: "Abū Yūsuf",
    arabic: "أبو يوسف",
    start: {
      year: 731,
      precision: "circa",
      hijri: { year: 113, source: "attested" },
    },
    end: {
      year: 798,
      precision: "year",
      hijri: { year: 182, source: "attested" },
    },
    importance: 3,
    region: "iraq-iran",
    location: { name: "Baghdad", lat: 33.34, lng: 44.4 },
    summary:
      "Chief disciple of Abū Ḥanīfa and the first chief judge (qāḍī al-quḍāt) of the Abbasid empire under Hārūn al-Rashīd; his Kitāb al-Kharāj shaped Islamic fiscal law.",
    relations: [
      { type: "student_of", target: "abu-hanifa" },
      {
        type: "related",
        target: "abbasid-caliphate",
        note: "chief judge under Hārūn al-Rashīd",
      },
    ],
    citations: [EI2("Abū Yūsuf", "J. Schacht"), SIYAR],
  },
  {
    id: "al-shaybani",
    kind: "person",
    lane: "scholars",
    name: "Muḥammad al-Shaybānī",
    arabic: "محمد بن الحسن الشيباني",
    start: {
      year: 749,
      precision: "circa",
      hijri: { year: 132, source: "attested" },
    },
    end: {
      year: 805,
      precision: "year",
      hijri: { year: 189, source: "attested" },
    },
    importance: 3,
    region: "iraq-iran",
    location: { name: "Baghdad", lat: 33.34, lng: 44.4 },
    summary:
      "Systematizer of the Ḥanafī school in writing and pioneer of the law of nations (siyar); teacher of al-Shāfiʿī and transmitter of Mālik's Muwaṭṭaʾ.",
    relations: [
      { type: "student_of", target: "abu-hanifa" },
      { type: "teacher_of", target: "al-shafii" },
    ],
    citations: [EI2("al-Shaybānī", "E. Chaumont"), SIYAR],
  },
  {
    id: "rabia-al-adawiyya",
    kind: "person",
    lane: "scholars",
    name: "Rābiʿa al-ʿAdawiyya",
    arabic: "رابعة العدوية",
    start: {
      year: 717,
      precision: "circa",
      note: "Biographical details are late and partly legendary; dates approximate.",
    },
    end: {
      year: 801,
      precision: "circa",
      hijri: { year: 185, source: "attested" },
    },
    importance: 3,
    region: "iraq-iran",
    location: { name: "Basra", lat: 30.51, lng: 47.81 },
    summary:
      "Ascetic and mystic of Basra whose teaching of love of God for His own sake became foundational for the entire Sufi tradition.",
    citations: [EI2("Rābiʿa al-ʿAdawiyya al-Ḳaysiyya", "M. Smith"), SIYAR],
  },
  {
    id: "al-shafii",
    kind: "person",
    lane: "scholars",
    name: "Imam al-Shāfiʿī",
    arabic: "الإمام الشافعي",
    aliases: ["Shafi'i", "Muhammad ibn Idris"],
    start: {
      year: 767,
      precision: "year",
      hijri: { year: 150, source: "attested" },
      note: "Born in Gaza in the year of Abū Ḥanīfa's death.",
    },
    end: {
      year: 820,
      precision: "year",
      hijri: { year: 204, source: "attested" },
    },
    importance: 5,
    region: "egypt-north-africa",
    location: { name: "Fustat (Cairo)", lat: 30.0, lng: 31.23 },
    places: [
      { name: "Gaza (birth)", lat: 31.5, lng: 34.47 },
      { name: "Madinah (study with Mālik)", lat: 24.47, lng: 39.61 },
      { name: "Baghdad", lat: 33.34, lng: 44.4 },
      { name: "Fustat (death)", lat: 30.0, lng: 31.23 },
    ],
    summary:
      "Eponym of the Shāfiʿī school and pioneering theorist of legal method: his al-Risāla argued that law must rest on Qurʾan, Sunna, consensus, and analogy, a framework that reorganized Islamic jurisprudence.",
    relations: [
      { type: "student_of", target: "malik-ibn-anas" },
      { type: "student_of", target: "al-shaybani" },
      { type: "teacher_of", target: "ahmad-ibn-hanbal" },
      { type: "wrote", target: "kitab-al-umm" },
      { type: "founded", target: "shafii-school" },
    ],
    citations: [EI2("al-Shāfiʿī", "E. Chaumont"), SIYAR],
    details: [
      {
        date: {
          year: 767,
          precision: "year",
          hijri: { year: 150, source: "attested" },
        },
        label: "Born in Gaza",
      },
      {
        date: { year: 786, precision: "circa" },
        label: "Studies with Mālik in Madinah",
      },
      {
        date: { year: 810, precision: "circa" },
        label: 'Teaches in Baghdad; "old school" doctrine',
      },
      {
        date: {
          year: 814,
          precision: "circa",
          hijri: { year: 199, source: "attested" },
        },
        label: "Settles in Egypt; revises his school",
      },
      {
        date: {
          year: 820,
          precision: "year",
          hijri: { year: 204, source: "attested" },
        },
        label: "Dies in Fustat",
      },
    ],
  },
  {
    id: "ahmad-ibn-hanbal",
    kind: "person",
    lane: "scholars",
    name: "Imam Aḥmad ibn Ḥanbal",
    arabic: "الإمام أحمد بن حنبل",
    aliases: ["Ahmad", "Ibn Hanbal"],
    start: {
      year: 780,
      precision: "year",
      hijri: { year: 164, source: "attested" },
    },
    end: {
      year: 855,
      precision: "year",
      hijri: { year: 241, source: "attested" },
    },
    importance: 5,
    region: "iraq-iran",
    location: { name: "Baghdad", lat: 33.34, lng: 44.4 },
    summary:
      "Hadith master of Baghdad, eponym of the Ḥanbalī school, and hero of the miḥna: imprisoned and flogged for refusing the doctrine of the created Qurʾan, he emerged as the emblem of scholarly independence from state power.",
    relations: [
      { type: "student_of", target: "al-shafii" },
      { type: "wrote", target: "musnad-ahmad" },
      { type: "founded", target: "hanbali-school" },
      {
        type: "related",
        target: "mihna",
        note: "chief victim of the inquisition",
      },
    ],
    citations: [EI2("Aḥmad b. Ḥanbal", "H. Laoust"), SIYAR],
    details: [
      {
        date: {
          year: 833,
          precision: "year",
          hijri: { year: 218, source: "attested" },
        },
        label: "Miḥna begins under al-Maʾmūn; interrogated",
      },
      {
        date: { year: 834, precision: "circa" },
        label: "Imprisoned and flogged under al-Muʿtaṣim",
      },
      {
        date: { year: 848, precision: "circa" },
        label: "Rehabilitated as al-Mutawakkil ends the miḥna",
      },
    ],
  },
  {
    id: "al-bukhari",
    kind: "person",
    lane: "scholars",
    name: "Imam al-Bukhārī",
    arabic: "الإمام البخاري",
    aliases: ["Bukhari", "Muhammad ibn Ismail"],
    start: {
      year: 810,
      precision: "year",
      hijri: { year: 194, source: "attested" },
    },
    end: {
      year: 870,
      precision: "year",
      hijri: { year: 256, source: "attested" },
      note: "Died at Khartank near Samarkand on the eve of ʿĪd al-Fiṭr.",
    },
    importance: 5,
    region: "central-asia",
    location: { name: "Bukhara", lat: 39.77, lng: 64.42 },
    places: [
      { name: "Bukhara (birth)", lat: 39.77, lng: 64.42 },
      { name: "Samarkand (death)", lat: 39.65, lng: 66.96 },
    ],
    summary:
      "The most celebrated hadith critic in Islamic history. He traveled the whole Muslim world sifting hundreds of thousands of reports to compile al-Jāmiʿ al-Ṣaḥīḥ, which Sunnis came to regard as the most authentic book after the Qurʾan.",
    relations: [
      { type: "wrote", target: "sahih-al-bukhari" },
      {
        type: "student_of",
        target: "ahmad-ibn-hanbal",
        note: "heard hadith from him in Baghdad",
      },
      {
        type: "teacher_of",
        target: "imam-muslim",
        note: "Muslim attended his sessions in Nishapur",
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
    id: "imam-muslim",
    kind: "person",
    lane: "scholars",
    name: "Imam Muslim",
    arabic: "الإمام مسلم بن الحجاج",
    aliases: ["Muslim ibn al-Hajjaj"],
    start: {
      year: 821,
      precision: "circa",
      hijri: { year: 206, source: "attested" },
      note: "Birth reported 202–206 AH.",
    },
    end: {
      year: 875,
      precision: "year",
      hijri: { year: 261, source: "attested" },
    },
    importance: 5,
    region: "iraq-iran",
    location: { name: "Nishapur", lat: 36.21, lng: 58.8 },
    summary:
      "Hadith master of Nishapur whose Ṣaḥīḥ, prized for its meticulous arrangement, stands with al-Bukhārī's as one of the two most authoritative hadith collections in Sunni Islam.",
    relations: [
      { type: "wrote", target: "sahih-muslim" },
      { type: "student_of", target: "al-bukhari" },
    ],
    citations: [EI2("Muslim b. al-Ḥadjdjādj", "G.H.A. Juynboll"), SIYAR],
  },
  {
    id: "abu-dawud",
    kind: "person",
    lane: "scholars",
    name: "Abū Dāwūd al-Sijistānī",
    arabic: "أبو داود السجستاني",
    start: {
      year: 817,
      precision: "year",
      hijri: { year: 202, source: "attested" },
    },
    end: {
      year: 889,
      precision: "year",
      hijri: { year: 275, source: "attested" },
    },
    importance: 4,
    region: "iraq-iran",
    location: { name: "Basra", lat: 30.51, lng: 47.81 },
    summary:
      "Compiler of the Sunan, the hadith collection most focused on legal rulings, one of the six canonical books of Sunni hadith.",
    relations: [{ type: "student_of", target: "ahmad-ibn-hanbal" }],
    citations: [EI2("Abū Dāwūd al-Sidjistānī"), SIYAR],
  },
  {
    id: "al-tirmidhi",
    kind: "person",
    lane: "scholars",
    name: "al-Tirmidhī",
    arabic: "الترمذي",
    start: {
      year: 824,
      precision: "circa",
      hijri: { year: 209, source: "attested" },
    },
    end: {
      year: 892,
      precision: "year",
      hijri: { year: 279, source: "attested" },
    },
    importance: 4,
    region: "central-asia",
    location: { name: "Termez", lat: 37.22, lng: 67.28 },
    summary:
      "Student of al-Bukhārī and compiler of al-Jāmiʿ, distinguished by its systematic grading of hadith and record of jurists' opinions.",
    relations: [{ type: "student_of", target: "al-bukhari" }],
    citations: [EI2("al-Tirmidhī"), SIYAR],
  },
  {
    id: "al-nasai",
    kind: "person",
    lane: "scholars",
    name: "al-Nasāʾī",
    arabic: "النسائي",
    start: {
      year: 830,
      precision: "circa",
      hijri: { year: 215, source: "attested" },
    },
    end: {
      year: 915,
      precision: "year",
      hijri: { year: 303, source: "attested" },
    },
    importance: 3,
    region: "central-asia",
    location: {
      name: "Nasa (Khurasan)",
      lat: 38.06,
      lng: 58.19,
      approximate: true,
    },
    summary:
      "Compiler of the Sunan with the strictest narrator criteria among the six canonical collections.",
    citations: [EI2("al-Nasāʾī"), SIYAR],
  },
  {
    id: "ibn-majah",
    kind: "person",
    lane: "scholars",
    name: "Ibn Mājah",
    arabic: "ابن ماجه",
    start: {
      year: 824,
      precision: "year",
      hijri: { year: 209, source: "attested" },
    },
    end: {
      year: 887,
      precision: "year",
      hijri: { year: 273, source: "attested" },
    },
    importance: 3,
    region: "iraq-iran",
    location: { name: "Qazvin", lat: 36.27, lng: 50.0 },
    summary:
      "Compiler of the Sunan usually counted as the sixth canonical hadith collection.",
    citations: [EI2("Ibn Mādja"), SIYAR],
  },
  {
    id: "al-tabari",
    kind: "person",
    lane: "scholars",
    name: "al-Ṭabarī",
    arabic: "الطبري",
    aliases: ["Tabari", "Muhammad ibn Jarir"],
    start: {
      year: 839,
      precision: "year",
      hijri: { year: 224, source: "attested" },
      note: "Birth reported 224–225 AH.",
    },
    end: {
      year: 923,
      precision: "year",
      hijri: { year: 310, source: "attested" },
    },
    importance: 5,
    region: "iraq-iran",
    location: { name: "Baghdad", lat: 33.34, lng: 44.4 },
    summary:
      "Polymath of Baghdad whose massive Qurʾan commentary and universal history became the twin reservoirs from which later exegesis and historiography drew for a millennium.",
    relations: [
      { type: "wrote", target: "tafsir-al-tabari" },
      { type: "wrote", target: "tarikh-al-tabari" },
    ],
    citations: [EI2("al-Ṭabarī", "C.E. Bosworth"), SIYAR],
  },
  {
    id: "junayd",
    kind: "person",
    lane: "scholars",
    name: "al-Junayd al-Baghdādī",
    arabic: "الجنيد البغدادي",
    start: { year: 830, precision: "circa" },
    end: {
      year: 910,
      precision: "year",
      hijri: { year: 298, source: "attested" },
    },
    importance: 3,
    region: "iraq-iran",
    location: { name: "Baghdad", lat: 33.34, lng: 44.4 },
    summary:
      'The "master of the order" (sayyid al-ṭāʾifa) of early Sufism in Baghdad, whose sober, sharia-grounded mysticism became the reference point for most later orders.',
    citations: [EI2("al-Djunayd", "A.J. Arberry"), SIYAR],
  },
  {
    id: "al-ashari",
    kind: "person",
    lane: "scholars",
    name: "Abū al-Ḥasan al-Ashʿarī",
    arabic: "أبو الحسن الأشعري",
    start: {
      year: 874,
      precision: "circa",
      hijri: { year: 260, source: "attested" },
    },
    end: {
      year: 936,
      precision: "circa",
      hijri: { year: 324, source: "attested" },
    },
    importance: 4,
    region: "iraq-iran",
    location: { name: "Baghdad", lat: 33.34, lng: 44.4 },
    summary:
      "A Muʿtazilī prodigy who publicly renounced the school around 913 and founded the Ashʿarī method of theology, defending mainstream creed with rational argument.",
    relations: [
      { type: "founded", target: "ashari-school" },
      {
        type: "related",
        target: "mutazila",
        note: "trained in, then broke with, the school",
      },
    ],
    citations: [EI2("al-Ashʿarī, Abu 'l-Ḥasan", "W. Montgomery Watt"), SIYAR],
  },
  {
    id: "al-maturidi",
    kind: "person",
    lane: "scholars",
    name: "Abū Manṣūr al-Māturīdī",
    arabic: "أبو منصور الماتريدي",
    start: {
      year: 853,
      precision: "circa",
      note: "Birth date unknown; mid-3rd century AH.",
    },
    end: {
      year: 944,
      precision: "circa",
      hijri: { year: 333, source: "attested" },
    },
    importance: 4,
    region: "central-asia",
    location: { name: "Samarkand", lat: 39.65, lng: 66.96 },
    summary:
      "Theologian of Samarkand whose school, spread with Ḥanafī law among Turkic peoples, became, with the Ashʿarīs, one of the two great Sunni theological traditions.",
    relations: [{ type: "founded", target: "maturidi-school" }],
    citations: [
      EI2("al-Māturīdī"),
      {
        source:
          "Ulrich Rudolph, Al-Māturīdī and the Development of Sunnī Theology in Samarqand (Brill, 2015)",
      },
    ],
  },
  {
    id: "al-tahawi",
    kind: "person",
    lane: "scholars",
    name: "al-Ṭaḥāwī",
    arabic: "الطحاوي",
    start: {
      year: 853,
      precision: "year",
      hijri: { year: 239, source: "attested" },
    },
    end: {
      year: 933,
      precision: "year",
      hijri: { year: 321, source: "attested" },
    },
    importance: 3,
    region: "egypt-north-africa",
    location: { name: "Fustat (Cairo)", lat: 30.0, lng: 31.23 },
    summary:
      "Egyptian Ḥanafī jurist whose short creed (al-ʿAqīda al-Ṭaḥāwiyya) became one of the most widely accepted statements of Sunni belief.",
    citations: [EI2("al-Ṭaḥāwī"), SIYAR],
  },
];

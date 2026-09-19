/**
 * Battles, conquests, and political-military events (after the Prophetic era, * the sīra-period battles live in sirah.ts, on the central line).
 */
import type { TimelineRecord } from "@/lib/types";

const KENNEDY = {
  source:
    "Hugh Kennedy, The Great Arab Conquests (Weidenfeld & Nicolson, 2007)",
};
const EI2 = (entry: string, author?: string) => ({
  source: "Encyclopaedia of Islam, 2nd ed. (Brill)",
  detail: `s.v. "${entry}"${author ? ` (${author})` : ""}`,
});

export const battleRecords: TimelineRecord[] = [
  {
    id: "ridda-wars",
    kind: "event",
    lane: "battles",
    name: "Ridda wars",
    arabic: "حروب الردة",
    start: {
      year: 632,
      precision: "year",
      hijri: { year: 11, source: "attested" },
    },
    end: {
      year: 633,
      precision: "year",
      hijri: { year: 12, source: "attested" },
    },
    importance: 2,
    region: "arabia",
    location: { name: "Najd", lat: 26.0, lng: 44.0, approximate: true },
    summary:
      "Abū Bakr's campaigns against the tribes that renounced allegiance after the Prophet's ﷺ death, restoring the unity of Arabia within a year.",
    relations: [{ type: "occurred_under", target: "rashidun-caliphate" }],
    citations: [KENNEDY],
  },
  {
    id: "battle-of-yarmuk",
    kind: "battle",
    lane: "battles",
    name: "Battle of Yarmūk",
    arabic: "معركة اليرموك",
    start: {
      year: 636,
      month: 8,
      precision: "exact",
      hijri: { year: 15, source: "attested" },
      note: "August 636 / Rajab 15 AH.",
    },
    importance: 5,
    region: "levant",
    location: {
      name: "Yarmouk River",
      lat: 32.72,
      lng: 35.95,
      approximate: true,
    },
    summary:
      "Six days along the Yarmūk gorge ended a millennium of Roman rule in Syria: Khālid ibn al-Walīd's outnumbered army broke the great Byzantine host, and Heraclius withdrew beyond the Taurus for good.",
    relations: [
      { type: "occurred_under", target: "rashidun-caliphate" },
      { type: "related", target: "byzantine-empire" },
      { type: "participant", target: "khalid-ibn-al-walid" },
    ],
    citations: [
      KENNEDY,
      {
        source:
          "Walter E. Kaegi, Byzantium and the Early Islamic Conquests (Cambridge, 1992)",
      },
    ],
  },
  {
    id: "battle-of-qadisiyya",
    kind: "battle",
    lane: "battles",
    name: "Battle of al-Qādisiyya",
    arabic: "معركة القادسية",
    start: {
      year: 636,
      precision: "disputed",
      altYears: [637, 638],
      hijri: { year: 15, source: "attested" },
      note: "Sources place it variously 15–16 AH (636–638 CE); late 636 or early 637 is most cited.",
    },
    importance: 5,
    region: "iraq-iran",
    location: {
      name: "al-Qādisiyya (near Kufa)",
      lat: 31.59,
      lng: 44.51,
      approximate: true,
    },
    summary:
      "The decisive battle for Iraq: Saʿd ibn Abī Waqqāṣ's force defeated the Sasanian imperial army under Rustam, opening Ctesiphon and the Persian plateau to the Muslims.",
    relations: [
      { type: "occurred_under", target: "rashidun-caliphate" },
      { type: "related", target: "sasanian-empire" },
    ],
    citations: [KENNEDY, EI2("al-Ḳādisiyya")],
  },
  {
    id: "conquest-of-jerusalem-637",
    kind: "event",
    lane: "battles",
    name: "Surrender of Jerusalem (al-Quds)",
    arabic: "فتح بيت المقدس",
    start: {
      year: 637,
      precision: "disputed",
      altYears: [638],
      hijri: { year: 16, source: "attested" },
      note: "637 or 638 CE / 16–17 AH; the sources differ by months.",
    },
    importance: 5,
    region: "levant",
    location: { name: "Jerusalem", lat: 31.78, lng: 35.23 },
    summary:
      'After a bloodless siege, Patriarch Sophronius surrendered the holy city, by tradition, to Caliph ʿUmar in person, whose assurance of safety to its Christians (the "Pact of ʿUmar" tradition) became a touchstone of Islamic governance.',
    relations: [
      { type: "occurred_under", target: "rashidun-caliphate" },
      { type: "related", target: "umar-ibn-al-khattab" },
      {
        type: "related",
        target: "dome-of-the-rock",
        note: "built on the Temple Mount two generations later",
      },
    ],
    citations: [KENNEDY, EI2("al-Ḳuds")],
  },
  {
    id: "conquest-of-egypt",
    kind: "event",
    lane: "battles",
    name: "Conquest of Egypt",
    arabic: "فتح مصر",
    start: {
      year: 639,
      precision: "year",
      hijri: { year: 18, source: "attested" },
    },
    end: {
      year: 642,
      precision: "year",
      hijri: { year: 21, source: "attested" },
    },
    importance: 4,
    region: "egypt-north-africa",
    location: { name: "Fustat (Cairo)", lat: 30.0, lng: 31.23 },
    summary:
      "ʿAmr ibn al-ʿĀṣ took Byzantium's richest province in three years; the garrison city he founded, Fusṭāṭ, grew into Cairo.",
    relations: [{ type: "occurred_under", target: "rashidun-caliphate" }],
    citations: [KENNEDY],
  },
  {
    id: "battle-of-nihavand",
    kind: "battle",
    lane: "battles",
    name: "Battle of Nihāvand",
    arabic: "معركة نهاوند",
    start: {
      year: 642,
      precision: "year",
      hijri: { year: 21, source: "attested" },
    },
    importance: 3,
    region: "iraq-iran",
    location: { name: "Nihavand", lat: 34.19, lng: 48.38 },
    summary:
      'Called "the victory of victories" in the Arabic sources, the last great Sasanian field army was destroyed, and imperial Persia effectively ended (Yazdegerd III died a fugitive in 651).',
    relations: [{ type: "related", target: "sasanian-empire" }],
    citations: [KENNEDY, EI2("Nihāwand")],
  },
  {
    id: "battle-of-karbala",
    kind: "battle",
    lane: "battles",
    name: "Karbala",
    arabic: "واقعة كربلاء",
    start: {
      year: 680,
      month: 10,
      day: 10,
      precision: "exact",
      hijri: { year: 61, source: "attested" },
      note: "10 Muḥarram (ʿĀshūrāʾ) 61 AH.",
    },
    importance: 5,
    region: "iraq-iran",
    location: { name: "Karbala", lat: 32.62, lng: 44.03 },
    summary:
      "Umayyad forces killed al-Ḥusayn, grandson of the Prophet ﷺ, with most of his family and companions. Mourned across the Muslim world, Karbala became the moral epicenter of Shīʿī memory and a caution invoked by Sunnis and Shīʿa alike.",
    relations: [
      { type: "participant", target: "husayn-ibn-ali" },
      { type: "occurred_under", target: "umayyad-caliphate" },
    ],
    citations: [
      EI2("(al-)Ḥusayn b. ʿAlī"),
      {
        source: "al-Ṭabarī, Tārīkh al-rusul wa-l-mulūk",
        detail: "primary account",
      },
    ],
  },
  {
    id: "siege-of-constantinople-717",
    kind: "battle",
    lane: "battles",
    name: "Second Arab siege of Constantinople",
    arabic: "حصار القسطنطينية الثاني",
    start: {
      year: 717,
      precision: "year",
      hijri: { year: 98, source: "attested" },
    },
    end: {
      year: 718,
      precision: "year",
      hijri: { year: 99, source: "attested" },
    },
    importance: 3,
    region: "anatolia-balkans",
    location: { name: "Constantinople (Istanbul)", lat: 41.01, lng: 28.98 },
    summary:
      "The Umayyads' greatest amphibious effort failed against the Theodosian walls, Greek fire, and a brutal winter, Constantinople would remain beyond Muslim reach for another seven centuries.",
    relations: [
      { type: "occurred_under", target: "umayyad-caliphate" },
      { type: "related", target: "byzantine-empire" },
      {
        type: "related",
        target: "conquest-of-constantinople",
        note: "achieved 736 years later",
      },
    ],
    citations: [
      {
        source:
          'Marek Jankowiak, "The First Arab Siege of Constantinople", Travaux et Mémoires 17 (2013)',
        detail: "context of the sieges",
      },
      EI2("Ḳusṭanṭīniyya"),
    ],
  },
  {
    id: "crossing-to-andalus",
    kind: "event",
    lane: "battles",
    name: "Crossing to al-Andalus",
    arabic: "فتح الأندلس",
    start: {
      year: 711,
      precision: "year",
      hijri: { year: 92, source: "attested" },
    },
    importance: 4,
    region: "andalus-maghrib",
    location: { name: "Gibraltar (Jabal Ṭāriq)", lat: 36.14, lng: -5.35 },
    summary:
      "Ṭāriq ibn Ziyād crossed the strait that bears his name (Jabal Ṭāriq → Gibraltar) and broke the Visigothic kingdom at Guadalete; within five years most of Iberia was under Muslim rule, beginning eight centuries of al-Andalus.",
    relations: [{ type: "occurred_under", target: "umayyad-caliphate" }],
    citations: [
      { source: "Hugh Kennedy, Muslim Spain and Portugal (Longman, 1996)" },
      {
        source:
          "Roger Collins, The Arab Conquest of Spain, 710–797 (Blackwell, 1989)",
      },
    ],
  },
  {
    id: "battle-of-tours",
    kind: "battle",
    lane: "battles",
    name: "Battle of Tours / Poitiers",
    arabic: "معركة بلاط الشهداء",
    start: {
      year: 732,
      precision: "year",
      hijri: { year: 114, source: "attested" },
      note: "October 732; some scholarship argues for 733.",
    },
    importance: 3,
    region: "europe-world",
    location: {
      name: "between Tours and Poitiers",
      lat: 46.8,
      lng: 0.55,
      approximate: true,
    },
    summary:
      'Charles Martel\'s Franks defeated an Umayyad raiding army from al-Andalus, killing the governor ʿAbd al-Raḥmān al-Ghāfiqī, in Arabic memory "the pavement of the martyrs", in later European myth the turning of a tide that had, in reality, already reached its practical limits.',
    relations: [{ type: "occurred_under", target: "umayyad-caliphate" }],
    citations: [
      {
        source:
          "Roger Collins, The Arab Conquest of Spain, 710–797 (Blackwell, 1989)",
      },
    ],
  },
  {
    id: "abbasid-revolution",
    kind: "event",
    lane: "battles",
    name: "Abbasid revolution",
    arabic: "الثورة العباسية",
    start: {
      year: 747,
      precision: "year",
      hijri: { year: 129, source: "attested" },
    },
    end: {
      year: 750,
      precision: "year",
      hijri: { year: 132, source: "attested" },
    },
    importance: 4,
    region: "central-asia",
    location: { name: "Merv (movement's origin)", lat: 37.66, lng: 62.16 },
    summary:
      "The black banners rose in Khurasan in 747; by 750 the Umayyads had fallen at the battle of the Zāb and the ʿAbbāsid house ruled, shifting Islam's center of gravity from Syria toward Iraq and Iran.",
    relations: [
      { type: "related", target: "umayyad-caliphate" },
      { type: "related", target: "abbasid-caliphate" },
    ],
    citations: [
      {
        source:
          "Hugh Kennedy, The Prophet and the Age of the Caliphates (Longman, 2nd ed. 2004)",
      },
    ],
  },
  {
    id: "battle-of-talas",
    kind: "battle",
    lane: "battles",
    name: "Battle of Talas",
    arabic: "معركة نهر طلاس",
    start: {
      year: 751,
      precision: "year",
      hijri: { year: 133, source: "attested" },
    },
    importance: 3,
    region: "central-asia",
    location: {
      name: "Talas river (Kyrgyzstan/Kazakhstan)",
      lat: 42.52,
      lng: 72.23,
      approximate: true,
    },
    summary:
      "Abbasid and Qarluq forces defeated a Tang Chinese army, the only major clash of the two empires, fixing Transoxiana in the Islamic orbit. A famous (and debated) tradition credits captured artisans with bringing papermaking west.",
    relations: [
      { type: "related", target: "tang-dynasty" },
      { type: "related", target: "paper-in-islamic-world" },
    ],
    citations: [
      {
        source:
          "H.A.R. Gibb, The Arab Conquests in Central Asia (Royal Asiatic Society, 1923)",
      },
    ],
  },
  {
    id: "battle-of-manzikert",
    kind: "battle",
    lane: "battles",
    name: "Battle of Manzikert",
    arabic: "معركة ملاذكرد",
    start: {
      year: 1071,
      month: 8,
      precision: "exact",
      hijri: { year: 463, source: "attested" },
      note: "26 August 1071.",
    },
    importance: 4,
    region: "anatolia-balkans",
    location: { name: "Manzikert (Malazgirt)", lat: 39.15, lng: 42.54 },
    summary:
      "Alp Arslan's Seljuks captured the Byzantine emperor Romanos IV, an imperial catastrophe that opened Anatolia to Turkish settlement and, indirectly, provoked the appeals that led to the First Crusade.",
    relations: [
      { type: "part_of", target: "great-seljuks" },
      { type: "related", target: "byzantine-empire" },
      { type: "related", target: "first-crusade", note: "a distant trigger" },
    ],
    citations: [
      {
        source:
          "Carole Hillenbrand, Turkish Myth and Muslim Symbol: The Battle of Manzikert (Edinburgh UP, 2007)",
      },
    ],
  },
  {
    id: "battle-of-zallaqa",
    kind: "battle",
    lane: "battles",
    name: "Battle of Zallāqa (Sagrajas)",
    arabic: "معركة الزلاقة",
    start: {
      year: 1086,
      month: 10,
      precision: "exact",
      hijri: { year: 479, source: "attested" },
    },
    importance: 2,
    region: "andalus-maghrib",
    location: {
      name: "near Badajoz",
      lat: 38.88,
      lng: -6.97,
      approximate: true,
    },
    summary:
      "Yūsuf ibn Tāshfīn's Almoravids, summoned across the strait by the ṭāʾifa kings, crushed Alfonso VI and stalled the Christian advance for a generation.",
    relations: [{ type: "part_of", target: "almoravids" }],
    citations: [
      { source: "Hugh Kennedy, Muslim Spain and Portugal (Longman, 1996)" },
    ],
  },
  {
    id: "crusader-jerusalem-1099",
    kind: "battle",
    lane: "battles",
    name: "Crusader capture of Jerusalem",
    arabic: "سقوط بيت المقدس بيد الصليبيين",
    start: {
      year: 1099,
      month: 7,
      day: 15,
      precision: "exact",
      hijri: { year: 492, source: "attested" },
    },
    importance: 4,
    region: "levant",
    location: { name: "Jerusalem", lat: 31.78, lng: 35.23 },
    summary:
      "The First Crusade stormed Jerusalem and massacred much of its Muslim and Jewish population, a shock that echoed through Islamic literature and politics until Saladin's restoration 88 years later.",
    relations: [
      { type: "part_of", target: "first-crusade" },
      { type: "related", target: "recapture-of-jerusalem-1187" },
    ],
    citations: [
      {
        source:
          "Carole Hillenbrand, The Crusades: Islamic Perspectives (Edinburgh UP, 1999)",
      },
    ],
  },
  {
    id: "battle-of-hattin",
    kind: "battle",
    lane: "battles",
    name: "Battle of Ḥaṭṭīn",
    arabic: "معركة حطين",
    start: {
      year: 1187,
      month: 7,
      day: 4,
      precision: "exact",
      hijri: { year: 583, source: "attested" },
      note: "4 July 1187 / 25 Rabīʿ al-Thānī 583 AH.",
    },
    importance: 4,
    region: "levant",
    location: { name: "Horns of Ḥaṭṭīn (Galilee)", lat: 32.8, lng: 35.44 },
    summary:
      "On a waterless double hill above Tiberias, Saladin annihilated the field army of the Latin Kingdom, within months nearly every Crusader city, Jerusalem included, had fallen.",
    relations: [
      { type: "part_of", target: "ayyubids" },
      { type: "related", target: "recapture-of-jerusalem-1187" },
    ],
    citations: [
      {
        source:
          "Carole Hillenbrand, The Crusades: Islamic Perspectives (Edinburgh UP, 1999)",
      },
      { source: "Anne-Marie Eddé, Saladin (Harvard UP, 2011)" },
    ],
  },
  {
    id: "recapture-of-jerusalem-1187",
    kind: "event",
    lane: "battles",
    name: "Saladin restores Jerusalem",
    arabic: "استرداد بيت المقدس",
    start: {
      year: 1187,
      month: 10,
      day: 2,
      precision: "exact",
      hijri: { year: 583, source: "attested" },
      note: "27 Rajab 583 AH, by tradition the anniversary of the Miʿrāj.",
    },
    importance: 5,
    region: "levant",
    location: { name: "Jerusalem", lat: 31.78, lng: 35.23 },
    summary:
      "Eighty-eight years after the Crusader massacre, Saladin took the city by negotiated surrender, sparing its inhabitants, a contrast noted even by Latin chroniclers, and restored the Aqṣā mosque to worship.",
    relations: [
      { type: "part_of", target: "ayyubids" },
      { type: "related", target: "battle-of-hattin" },
    ],
    citations: [
      { source: "Anne-Marie Eddé, Saladin (Harvard UP, 2011)" },
      {
        source:
          "Carole Hillenbrand, The Crusades: Islamic Perspectives (Edinburgh UP, 1999)",
      },
    ],
  },
  {
    id: "battle-of-las-navas",
    kind: "battle",
    lane: "battles",
    name: "Las Navas de Tolosa (al-ʿUqāb)",
    arabic: "معركة العقاب",
    start: {
      year: 1212,
      month: 7,
      precision: "exact",
      hijri: { year: 609, source: "attested" },
    },
    importance: 3,
    region: "andalus-maghrib",
    location: { name: "Las Navas de Tolosa", lat: 38.28, lng: -3.58 },
    summary:
      "A united Christian coalition broke the Almohad army in the Sierra Morena, the strategic hinge after which Muslim Iberia contracted rapidly to Granada alone.",
    relations: [{ type: "part_of", target: "almohads" }],
    citations: [
      {
        source:
          "Amira K. Bennison, The Almoravid and Almohad Empires (Edinburgh UP, 2016)",
      },
    ],
  },
  {
    id: "sack-of-baghdad",
    kind: "battle",
    lane: "battles",
    name: "Mongol sack of Baghdad",
    arabic: "سقوط بغداد",
    start: {
      year: 1258,
      month: 2,
      precision: "exact",
      hijri: { year: 656, source: "attested" },
      note: "The city fell 10 February 1258; the caliph was killed days later.",
    },
    importance: 5,
    region: "iraq-iran",
    location: { name: "Baghdad", lat: 33.34, lng: 44.4 },
    summary:
      "Hülegü's army destroyed the city of al-Manṣūr: libraries wrecked, hundreds of thousands reported dead, and the last Baghdad caliph, al-Mustaʿṣim, executed, the traditional end-date of the classical Islamic age.",
    relations: [
      { type: "part_of", target: "ilkhanate" },
      { type: "related", target: "abbasid-caliphate" },
      { type: "related", target: "mongol-empire" },
    ],
    citations: [
      {
        source:
          "Peter Jackson, The Mongols and the Islamic World (Yale UP, 2017)",
      },
    ],
  },
  {
    id: "battle-of-ayn-jalut",
    kind: "battle",
    lane: "battles",
    name: "Battle of ʿAyn Jālūt",
    arabic: "معركة عين جالوت",
    start: {
      year: 1260,
      month: 9,
      day: 3,
      precision: "exact",
      hijri: { year: 658, source: "attested" },
      note: "25 Ramadan 658 AH.",
    },
    importance: 4,
    region: "levant",
    location: {
      name: "ʿAyn Jālūt (Jezreel valley)",
      lat: 32.55,
      lng: 35.36,
      approximate: true,
    },
    summary:
      "At \"Goliath's Spring\", the Mamluks under Quṭuz and Baybars inflicted the Mongols' first irreversible defeat, the high-water mark of the Mongol advance westward.",
    relations: [
      { type: "part_of", target: "mamluk-sultanate" },
      { type: "related", target: "mongol-empire" },
    ],
    citations: [
      {
        source:
          "Reuven Amitai, Mongols and Mamluks: The Mamluk–Īlkhānid War, 1260–1281 (Cambridge, 1995)",
      },
    ],
  },
  {
    id: "fall-of-acre-1291",
    kind: "battle",
    lane: "battles",
    name: "Fall of Acre",
    arabic: "فتح عكا",
    start: {
      year: 1291,
      month: 5,
      precision: "exact",
      hijri: { year: 690, source: "attested" },
    },
    importance: 3,
    region: "levant",
    location: { name: "Acre", lat: 32.92, lng: 35.07 },
    summary:
      "Sultan al-Ashraf Khalīl's capture of Acre ended two centuries of Crusader states on the mainland, closing the era Saladin had turned.",
    relations: [{ type: "part_of", target: "mamluk-sultanate" }],
    citations: [
      {
        source:
          "Carole Hillenbrand, The Crusades: Islamic Perspectives (Edinburgh UP, 1999)",
      },
    ],
  },
  {
    id: "battle-of-shaqhab",
    kind: "battle",
    lane: "battles",
    name: "Battle of Shaqḥab (Marj al-Ṣuffar)",
    arabic: "معركة شقحب",
    start: {
      year: 1303,
      month: 4,
      precision: "exact",
      hijri: { year: 702, source: "attested" },
      note: "2 Ramadan 702 AH.",
    },
    importance: 3,
    region: "levant",
    location: {
      name: "Shaqḥab, south of Damascus",
      lat: 33.13,
      lng: 36.19,
      approximate: true,
    },
    summary:
      "The Mamluks turned back the last major Ilkhanid invasion of Syria. Ibn Taymiyya was present, famously ruling that the Ramadan fast could be broken for battle and urging the Damascenes to stand.",
    relations: [
      { type: "part_of", target: "mamluk-sultanate" },
      { type: "related", target: "ilkhanate" },
      { type: "participant", target: "ibn-taymiyya" },
    ],
    citations: [
      {
        source:
          'Reuven Amitai, "The Mongol Occupation of Damascus in 1300", in The Mamluks in Egyptian and Syrian Politics and Society (Brill, 2004)',
      },
      {
        source: "Ibn Kathīr, al-Bidāya wa-l-Nihāya",
        detail: "primary account",
      },
    ],
  },
  {
    id: "battle-of-ankara",
    kind: "battle",
    lane: "battles",
    name: "Battle of Ankara",
    arabic: "معركة أنقرة",
    start: {
      year: 1402,
      month: 7,
      precision: "exact",
      hijri: { year: 804, source: "attested" },
    },
    importance: 3,
    region: "anatolia-balkans",
    location: { name: "Ankara", lat: 39.93, lng: 32.86 },
    summary:
      'Timur captured the Ottoman sultan Bayezid I "the Thunderbolt", nearly strangling the young empire, a decade of civil war followed before the Ottoman recovery.',
    relations: [
      { type: "part_of", target: "timurids" },
      { type: "related", target: "ottoman-empire" },
    ],
    citations: [
      {
        source:
          "Beatrice Forbes Manz, The Rise and Rule of Tamerlane (Cambridge, 1989)",
      },
    ],
  },
  {
    id: "conquest-of-constantinople",
    kind: "battle",
    lane: "battles",
    name: "Conquest of Constantinople",
    arabic: "فتح القسطنطينية",
    start: {
      year: 1453,
      month: 5,
      day: 29,
      precision: "exact",
      hijri: { year: 857, source: "attested" },
      note: "29 May 1453 / 20 Jumādā al-Ūlā 857 AH.",
    },
    importance: 5,
    region: "anatolia-balkans",
    location: { name: "Constantinople (Istanbul)", lat: 41.01, lng: 28.98 },
    summary:
      "Mehmed II, aged 21, breached the Theodosian walls with the greatest siege guns yet cast. The Roman empire's last remnant fell; Constantinople became Istanbul, the Ottoman capital, an epochal date for Islamic and European history alike.",
    relations: [
      { type: "part_of", target: "ottoman-empire" },
      { type: "related", target: "byzantine-empire", note: "its final end" },
      {
        type: "related",
        target: "siege-of-constantinople-717",
        note: "the goal first attempted 736 years earlier",
      },
    ],
    citations: [
      {
        source:
          "Steven Runciman, The Fall of Constantinople 1453 (Cambridge, 1965)",
      },
      { source: "Colin Imber, The Ottoman Empire, 1300–1650 (Palgrave, 2002)" },
    ],
  },
  {
    id: "fall-of-granada",
    kind: "event",
    lane: "battles",
    name: "Fall of Granada",
    arabic: "سقوط غرناطة",
    start: {
      year: 1492,
      month: 1,
      day: 2,
      precision: "exact",
      hijri: { year: 897, source: "attested" },
      note: "2 January 1492 / 2 Rabīʿ al-Awwal 897 AH.",
    },
    importance: 5,
    region: "andalus-maghrib",
    location: { name: "Granada", lat: 37.18, lng: -3.6 },
    summary:
      "Boabdil surrendered the Alhambra to Ferdinand and Isabella, ending 781 years of Muslim rule in Iberia. The same year, Granada's conquerors financed Columbus, two hinges of world history in one season.",
    relations: [
      { type: "part_of", target: "nasrids" },
      { type: "related", target: "columbus-1492" },
    ],
    citations: [
      { source: "L.P. Harvey, Islamic Spain, 1250 to 1500 (Chicago UP, 1990)" },
    ],
  },
  {
    id: "battle-of-chaldiran",
    kind: "battle",
    lane: "battles",
    name: "Battle of Chāldirān",
    arabic: "معركة جالديران",
    start: {
      year: 1514,
      month: 8,
      day: 23,
      precision: "exact",
      hijri: { year: 920, source: "attested" },
    },
    importance: 3,
    region: "anatolia-balkans",
    location: {
      name: "Chaldiran plain",
      lat: 39.09,
      lng: 44.33,
      approximate: true,
    },
    summary:
      "Ottoman cannon and janissary musketry shattered the Safavid cavalry, fixing the Ottoman–Iranian frontier roughly where it remains, and hardening the Sunni–Shīʿī imperial rivalry.",
    relations: [
      { type: "part_of", target: "ottoman-empire" },
      { type: "related", target: "safavid-empire" },
    ],
    citations: [
      { source: "Roger Savory, Iran under the Safavids (Cambridge, 1980)" },
    ],
  },
  {
    id: "ottoman-conquest-of-egypt",
    kind: "event",
    lane: "battles",
    name: "Ottoman conquest of the Mamluk Sultanate",
    arabic: "الفتح العثماني لمصر والشام",
    start: {
      year: 1516,
      precision: "year",
      hijri: { year: 922, source: "attested" },
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
      "Selim I destroyed Mamluk power at Marj Dābiq and Raydāniyya, taking Syria, Egypt, and the Hijaz. The Ottomans became custodians of Makkah and Madinah, and, by later claim, heirs of the caliphate. The same year Luther posted his theses.",
    relations: [
      { type: "part_of", target: "ottoman-empire" },
      { type: "related", target: "mamluk-sultanate" },
      { type: "related", target: "reformation", note: "the same year, 1517" },
    ],
    citations: [
      { source: "Colin Imber, The Ottoman Empire, 1300–1650 (Palgrave, 2002)" },
    ],
  },
  {
    id: "battle-of-panipat-1526",
    kind: "battle",
    lane: "battles",
    name: "First Battle of Panipat",
    arabic: "معركة بانيبات الأولى",
    start: {
      year: 1526,
      month: 4,
      day: 21,
      precision: "exact",
      hijri: { year: 932, source: "attested" },
    },
    importance: 4,
    region: "south-asia",
    location: { name: "Panipat", lat: 29.39, lng: 76.97 },
    summary:
      "Bābur's small army, using field artillery and matchlocks new to India, destroyed the Delhi Sultan Ibrāhīm Lodī, founding Mughal rule on the plains of Panipat.",
    relations: [
      { type: "part_of", target: "mughal-empire" },
      { type: "related", target: "delhi-sultanate" },
    ],
    citations: [
      { source: "John F. Richards, The Mughal Empire (Cambridge, 1993)" },
    ],
  },
  {
    id: "battle-of-mohacs",
    kind: "battle",
    lane: "battles",
    name: "Battle of Mohács",
    arabic: "معركة موهاج",
    start: {
      year: 1526,
      month: 8,
      day: 29,
      precision: "exact",
      hijri: { year: 932, source: "attested" },
    },
    importance: 3,
    region: "anatolia-balkans",
    location: { name: "Mohács (Hungary)", lat: 45.99, lng: 18.68 },
    summary:
      "Süleymān's army broke the Hungarian kingdom in an afternoon, four months after Panipat: two gunpowder empires winning decisive victories 5,000 km apart in the same year.",
    relations: [
      { type: "part_of", target: "ottoman-empire" },
      {
        type: "related",
        target: "battle-of-panipat-1526",
        note: "same year, other end of the Islamic world",
      },
    ],
    citations: [
      { source: "Caroline Finkel, Osman's Dream (John Murray, 2005)" },
    ],
  },
  {
    id: "siege-of-vienna-1529",
    kind: "battle",
    lane: "battles",
    name: "First siege of Vienna",
    arabic: "حصار فيينا الأول",
    start: {
      year: 1529,
      month: 10,
      precision: "exact",
      hijri: { year: 936, source: "attested" },
    },
    importance: 3,
    region: "anatolia-balkans",
    location: { name: "Vienna", lat: 48.21, lng: 16.37 },
    summary:
      "Süleymān's autumn assault on Vienna failed with the rains, marking the practical north-western limit of Ottoman expansion in Europe.",
    relations: [{ type: "part_of", target: "ottoman-empire" }],
    citations: [
      { source: "Caroline Finkel, Osman's Dream (John Murray, 2005)" },
    ],
  },
  {
    id: "battle-of-lepanto",
    kind: "battle",
    lane: "battles",
    name: "Battle of Lepanto",
    arabic: "معركة ليبانتو",
    start: {
      year: 1571,
      month: 10,
      day: 7,
      precision: "exact",
      hijri: { year: 979, source: "attested" },
    },
    importance: 3,
    region: "anatolia-balkans",
    location: {
      name: "Gulf of Patras",
      lat: 38.25,
      lng: 21.3,
      approximate: true,
    },
    summary:
      "The Holy League destroyed the Ottoman galley fleet, a celebrated but transient victory: the fleet was rebuilt within a year, and Cyprus stayed Ottoman.",
    relations: [{ type: "part_of", target: "ottoman-empire" }],
    citations: [
      { source: "Caroline Finkel, Osman's Dream (John Murray, 2005)" },
    ],
  },
  {
    id: "battle-of-tondibi",
    kind: "battle",
    lane: "battles",
    name: "Battle of Tondibi",
    arabic: "معركة تونديبي",
    start: {
      year: 1591,
      month: 3,
      precision: "exact",
      hijri: { year: 999, source: "attested" },
    },
    importance: 3,
    region: "west-africa",
    location: {
      name: "Tondibi, north of Gao",
      lat: 16.65,
      lng: -0.05,
      approximate: true,
    },
    summary:
      "A Moroccan expedition that had crossed the Sahara with firearms broke the Songhai army, collapsing the last great Sudanic empire and beginning Timbuktu's long decline (Aḥmad Bābā was deported in its aftermath).",
    relations: [
      { type: "related", target: "songhai-empire" },
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
    id: "battle-of-vienna-1683",
    kind: "battle",
    lane: "battles",
    name: "Battle of Vienna",
    arabic: "معركة فيينا",
    start: {
      year: 1683,
      month: 9,
      day: 12,
      precision: "exact",
      hijri: { year: 1094, source: "attested" },
    },
    importance: 4,
    region: "anatolia-balkans",
    location: { name: "Vienna (Kahlenberg)", lat: 48.28, lng: 16.34 },
    summary:
      "The failure of the second Ottoman siege, broken by the arrival of Jan Sobieski's winged hussars, began the long Ottoman retreat from Central Europe, sealed at Karlowitz in 1699.",
    relations: [{ type: "part_of", target: "ottoman-empire" }],
    citations: [
      { source: "Caroline Finkel, Osman's Dream (John Murray, 2005)" },
    ],
  },
  {
    id: "battle-of-plassey",
    kind: "battle",
    lane: "battles",
    name: "Battle of Plassey",
    arabic: "معركة بلاسي",
    start: {
      year: 1757,
      month: 6,
      day: 23,
      precision: "exact",
      hijri: { year: 1170, source: "attested" },
    },
    importance: 3,
    region: "south-asia",
    location: { name: "Plassey (Bengal)", lat: 23.8, lng: 88.25 },
    summary:
      "The East India Company's victory over the Nawab of Bengal, won as much by bribery as by arms, began British territorial empire in India, in the very decades Mughal authority dissolved.",
    relations: [
      { type: "related", target: "mughal-empire" },
      { type: "related", target: "east-india-company" },
    ],
    citations: [
      {
        source:
          "P.J. Marshall, Bengal: The British Bridgehead (Cambridge, 1987)",
      },
    ],
  },
  {
    id: "napoleon-in-egypt",
    kind: "event",
    lane: "battles",
    name: "Napoleon's expedition to Egypt",
    arabic: "الحملة الفرنسية على مصر",
    start: {
      year: 1798,
      precision: "year",
      hijri: { year: 1213, source: "attested" },
    },
    end: {
      year: 1801,
      precision: "year",
      hijri: { year: 1216, source: "attested" },
    },
    importance: 4,
    region: "egypt-north-africa",
    location: { name: "Cairo", lat: 30.04, lng: 31.24 },
    summary:
      "The French occupation of Egypt, printing press, savants, and all, is the conventional shock-date for the modern encounter between Europe and the Muslim world, opening the era of reform, colonization, and resistance.",
    relations: [{ type: "related", target: "ottoman-empire" }],
    citations: [
      {
        source:
          "Juan Cole, Napoleon's Egypt: Invading the Middle East (Palgrave, 2007)",
      },
    ],
  },
  {
    id: "indian-rebellion-1857",
    kind: "event",
    lane: "battles",
    name: "Indian Rebellion; end of the Mughals",
    arabic: "ثورة ١٨٥٧ ونهاية المغول",
    start: {
      year: 1857,
      precision: "year",
      hijri: { year: 1273, source: "attested" },
    },
    end: {
      year: 1858,
      precision: "year",
      hijri: { year: 1275, source: "attested" },
    },
    importance: 4,
    region: "south-asia",
    location: { name: "Delhi", lat: 28.61, lng: 77.21 },
    summary:
      "The great uprising against Company rule rallied around the aged Bahādur Shāh II; its suppression ended the Mughal line, exiled the last emperor to Rangoon, and placed India under the British Crown.",
    relations: [{ type: "related", target: "mughal-empire" }],
    citations: [
      { source: "William Dalrymple, The Last Mughal (Bloomsbury, 2006)" },
    ],
  },
  {
    id: "abolition-of-caliphate",
    kind: "event",
    lane: "battles",
    name: "Abolition of the Ottoman caliphate",
    arabic: "إلغاء الخلافة العثمانية",
    start: {
      year: 1924,
      month: 3,
      day: 3,
      precision: "exact",
      hijri: { year: 1342, source: "attested" },
    },
    importance: 5,
    region: "anatolia-balkans",
    location: { name: "Ankara", lat: 39.93, lng: 32.86 },
    summary:
      "The Turkish Grand National Assembly abolished the caliphate and exiled the Ottoman house, ending, after thirteen centuries, the institution that began with Abū Bakr at the other end of this timeline.",
    relations: [
      { type: "related", target: "ottoman-empire" },
      {
        type: "related",
        target: "rashidun-caliphate",
        note: "the institution's beginning, 1292 years earlier",
      },
    ],
    citations: [
      { source: "Caroline Finkel, Osman's Dream (John Murray, 2005)" },
      {
        source:
          "M. Şükrü Hanioğlu, A Brief History of the Late Ottoman Empire (Princeton, 2008)",
      },
    ],
  },
];

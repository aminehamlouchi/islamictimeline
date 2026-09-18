/**
 * Additional records, a broad second pass filling major gaps: rulers and
 * commanders, poets and men of letters, Sufi masters and orders, scientists,
 * more books, conquests, and modern reformers.
 *
 * Dates follow standard reference works; attested Hijri years are omitted here
 * (the UI computes and clearly labels an approximate AH) except where noted.
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
const KENNEDY = {
  source:
    "Hugh Kennedy, The Prophet and the Age of the Caliphates (Longman, 2nd ed. 2004)",
};

export const additionRecords: TimelineRecord[] = [
  /* ------------------------ rulers & commanders ------------------------ */
  {
    id: "harun-al-rashid",
    kind: "person",
    lane: "states",
    name: "Hārūn al-Rashīd",
    arabic: "هارون الرشيد",
    start: { year: 763, precision: "circa" },
    end: { year: 809, precision: "year" },
    importance: 4,
    region: "iraq-iran",
    location: { name: "Baghdad", lat: 33.34, lng: 44.4 },
    summary:
      "The fifth Abbasid caliph (r. 786–809), whose Baghdad became a byword for splendor in the Thousand and One Nights, correspondent of Charlemagne and patron of the age when the translation movement gathered force.",
    relations: [
      { type: "ruled_during", target: "abbasid-caliphate" },
      { type: "related", target: "bayt-al-hikma" },
      {
        type: "related",
        target: "charlemagne-coronation",
        note: "the two courts exchanged embassies",
      },
    ],
    citations: [EI2("Hārūn al-Rashīd", "F. Omar"), KENNEDY],
  },
  {
    id: "al-mamun",
    kind: "person",
    lane: "states",
    name: "al-Maʾmūn",
    arabic: "المأمون",
    start: { year: 786, precision: "year" },
    end: { year: 833, precision: "year" },
    importance: 4,
    region: "iraq-iran",
    location: { name: "Baghdad", lat: 33.34, lng: 44.4 },
    summary:
      "Abbasid caliph (r. 813–833), champion of the translation movement and rational theology, who founded observatories and imposed the miḥna, the great patron and the great inquisitor in one reign.",
    relations: [
      { type: "ruled_during", target: "abbasid-caliphate" },
      { type: "related", target: "translation-movement" },
      { type: "related", target: "mihna" },
    ],
    citations: [EI2("al-Maʾmūn", "M. Rekaya"), KENNEDY],
  },
  {
    id: "uqba-ibn-nafi",
    kind: "person",
    lane: "states",
    name: "ʿUqba ibn Nāfiʿ",
    arabic: "عقبة بن نافع",
    start: { year: 622, precision: "circa" },
    end: { year: 683, precision: "year" },
    importance: 3,
    region: "egypt-north-africa",
    location: { name: "Kairouan", lat: 35.68, lng: 10.1 },
    summary:
      "Umayyad commander who carried the conquest across North Africa and founded Kairouan (c. 670) with its great mosque, the base from which Islam and Arabic reached the Maghrib and, later, Iberia.",
    relations: [{ type: "occurred_under", target: "umayyad-caliphate" }],
    citations: [
      EI2("ʿUḳba b. Nāfiʿ", "M. Talbi"),
      {
        source:
          "Hugh Kennedy, The Great Arab Conquests (Weidenfeld & Nicolson, 2007)",
      },
    ],
  },
  {
    id: "tariq-ibn-ziyad",
    kind: "person",
    lane: "states",
    name: "Ṭāriq ibn Ziyād",
    arabic: "طارق بن زياد",
    start: { year: 670, precision: "circa" },
    end: { year: 720, precision: "circa", note: "Death date poorly recorded." },
    importance: 3,
    region: "andalus-maghrib",
    location: { name: "Gibraltar (Jabal Ṭāriq)", lat: 36.14, lng: -5.35 },
    summary:
      "The Berber commander who led the 711 crossing into Iberia and broke the Visigoths at Guadalete; the Rock of Gibraltar, Jabal Ṭāriq, still carries his name.",
    relations: [{ type: "related", target: "crossing-to-andalus" }],
    citations: [
      EI2("Ṭāriḳ b. Ziyād"),
      { source: "Roger Collins, The Arab Conquest of Spain (Blackwell, 1989)" },
    ],
  },
  {
    id: "muhammad-ibn-qasim",
    kind: "person",
    lane: "states",
    name: "Muḥammad ibn al-Qāsim",
    arabic: "محمد بن القاسم الثقفي",
    start: { year: 695, precision: "year" },
    end: { year: 715, precision: "year" },
    importance: 3,
    region: "south-asia",
    location: {
      name: "Sind (Multan/Debal)",
      lat: 24.9,
      lng: 67.6,
      approximate: true,
    },
    summary:
      "The teenage Umayyad general who conquered Sind and southern Punjab (711–713), opening the first sustained Muslim foothold in the Indian subcontinent.",
    relations: [
      { type: "occurred_under", target: "umayyad-caliphate" },
      { type: "related", target: "conquest-of-sindh" },
    ],
    citations: [
      EI2("Muḥammad b. al-Ḳāsim al-T̲h̲aḳafī"),
      {
        source:
          "Derryl N. MacLean, Religion and Society in Arab Sind (Brill, 1989)",
      },
    ],
  },
  {
    id: "abd-al-rahman-i",
    kind: "person",
    lane: "states",
    name: "ʿAbd al-Raḥmān I (al-Dākhil)",
    arabic: "عبد الرحمن الداخل",
    start: { year: 731, precision: "year" },
    end: { year: 788, precision: "year" },
    importance: 3,
    region: "andalus-maghrib",
    location: { name: "Córdoba", lat: 37.88, lng: -4.78 },
    summary:
      "The Umayyad prince who escaped the Abbasid massacre of his house, crossed to Iberia, and founded the emirate of Córdoba in 756, beginning the Umayyad state of al-Andalus and its Great Mosque.",
    relations: [
      { type: "founded", target: "cordoba-umayyads" },
      { type: "related", target: "great-mosque-of-cordoba" },
    ],
    citations: [
      EI2("ʿAbd al-Raḥmān I"),
      { source: "Hugh Kennedy, Muslim Spain and Portugal (Longman, 1996)" },
    ],
  },
  {
    id: "nizam-al-mulk",
    kind: "person",
    lane: "states",
    name: "Niẓām al-Mulk",
    arabic: "نظام الملك",
    start: { year: 1018, precision: "year" },
    end: {
      year: 1092,
      precision: "year",
      note: "Assassinated, traditionally by the Nizārī Ismāʿīlīs.",
    },
    importance: 4,
    region: "iraq-iran",
    location: { name: "Isfahan", lat: 32.65, lng: 51.67 },
    summary:
      "The Persian vizier who effectively ran the Great Seljuk empire for thirty years, founded the Niẓāmiyya madrasa network that standardized Sunni higher learning, and wrote the Siyāsatnāma on the art of government.",
    relations: [
      { type: "occurred_under", target: "great-seljuks" },
      { type: "founded", target: "nizamiyya-baghdad" },
      {
        type: "related",
        target: "al-ghazali",
        note: "appointed him to the Baghdad Niẓāmiyya",
      },
    ],
    citations: [
      EI2("Niẓām al-Mulk", "H. Bowen/[C.E. Bosworth]"),
      {
        source: "A.C.S. Peacock, The Great Seljuk Empire (Edinburgh UP, 2015)",
      },
    ],
  },
  {
    id: "nur-al-din",
    kind: "person",
    lane: "states",
    name: "Nūr al-Dīn Zangī",
    arabic: "نور الدين زنكي",
    start: { year: 1118, precision: "year" },
    end: { year: 1174, precision: "year" },
    importance: 3,
    region: "levant",
    location: { name: "Damascus", lat: 33.51, lng: 36.29 },
    summary:
      "The ruler of Syria who united Aleppo and Damascus, made counter-crusade (jihād) a disciplined state project, revived Sunni institutions, and prepared the ground his lieutenant Saladin would build on.",
    relations: [
      {
        type: "related",
        target: "saladin",
        note: "Saladin rose in his service",
      },
      { type: "related", target: "first-crusade" },
    ],
    citations: [
      EI2("Nūr al-Dīn Maḥmūd b. Zankī", "N. Elisséeff"),
      {
        source:
          "Carole Hillenbrand, The Crusades: Islamic Perspectives (Edinburgh UP, 1999)",
      },
    ],
  },
  {
    id: "saladin",
    kind: "person",
    lane: "states",
    name: "Ṣalāḥ al-Dīn (Saladin)",
    arabic: "صلاح الدين الأيوبي",
    aliases: ["Saladin", "Salah al-Din"],
    start: { year: 1137, precision: "year" },
    end: {
      year: 1193,
      precision: "year",
      note: "Died in Damascus, his treasury nearly empty from giving.",
    },
    importance: 5,
    region: "levant",
    location: { name: "Damascus", lat: 33.51, lng: 36.29 },
    places: [
      { name: "Tikrit (birth)", lat: 34.6, lng: 43.68 },
      { name: "Cairo", lat: 30.04, lng: 31.24 },
      { name: "Jerusalem", lat: 31.78, lng: 35.23 },
      { name: "Damascus (death)", lat: 33.51, lng: 36.29 },
    ],
    summary:
      "The Kurdish founder of the Ayyubid dynasty: he ended Fatimid rule in Egypt, united Egypt and Syria, shattered the Crusader army at Ḥaṭṭīn, and retook Jerusalem in 1187 with a clemency that impressed even his enemies, the enduring model of the chivalrous Muslim sovereign.",
    relations: [
      { type: "founded", target: "ayyubids" },
      { type: "related", target: "nur-al-din" },
      { type: "fought_in", target: "battle-of-hattin" },
      { type: "related", target: "recapture-of-jerusalem-1187" },
    ],
    citations: [
      EI2("Ṣalāḥ al-Dīn", "D.S. Richards"),
      { source: "Anne-Marie Eddé, Saladin (Harvard UP, 2011)" },
    ],
  },
  {
    id: "baybars",
    kind: "person",
    lane: "states",
    name: "al-Ẓāhir Baybars",
    arabic: "الظاهر بيبرس",
    start: { year: 1223, precision: "circa" },
    end: { year: 1277, precision: "year" },
    importance: 4,
    region: "egypt-north-africa",
    location: { name: "Cairo", lat: 30.04, lng: 31.24 },
    summary:
      "The Mamluk sultan (r. 1260–1277) who commanded at ʿAyn Jālūt, then consolidated the sultanate that had stopped the Mongols: he reinstalled the Abbasid caliphs in Cairo, drove back the Crusaders, and built an empire from the Nile to the Euphrates.",
    relations: [
      { type: "ruled_during", target: "mamluk-sultanate" },
      { type: "fought_in", target: "battle-of-ayn-jalut" },
    ],
    citations: [
      EI2("Baybars I", "P.M. Holt"),
      { source: "Reuven Amitai, Mongols and Mamluks (Cambridge, 1995)" },
    ],
  },
  {
    id: "mehmed-ii",
    kind: "person",
    lane: "states",
    name: "Mehmed II the Conqueror",
    arabic: "محمد الفاتح",
    aliases: ["Mehmed the Conqueror", "Fatih"],
    start: { year: 1432, precision: "year" },
    end: { year: 1481, precision: "year" },
    importance: 4,
    region: "anatolia-balkans",
    location: { name: "Istanbul", lat: 41.01, lng: 28.98 },
    summary:
      "The Ottoman sultan who took Constantinople in 1453 at the age of twenty-one, ending the Roman empire and refounding the city as an imperial Islamic capital of many faiths.",
    relations: [
      { type: "ruled_during", target: "ottoman-empire" },
      { type: "related", target: "conquest-of-constantinople" },
    ],
    citations: [
      EI2("Meḥemmed II", "H. İnalcık"),
      {
        source:
          "Franz Babinger, Mehmed the Conqueror and His Time (Princeton, 1978)",
      },
    ],
  },
  {
    id: "suleiman-the-magnificent",
    kind: "person",
    lane: "states",
    name: "Süleymān the Magnificent",
    arabic: "سليمان القانوني",
    aliases: ["Suleiman the Lawgiver", "Kanuni"],
    start: { year: 1494, precision: "year" },
    end: {
      year: 1566,
      precision: "year",
      note: "Died on campaign at Szigetvár.",
    },
    importance: 4,
    region: "anatolia-balkans",
    location: { name: "Istanbul", lat: 41.01, lng: 28.98 },
    summary:
      'Under his long reign (1520–1566) the Ottoman Empire reached its zenith, Belgrade, Rhodes, Hungary, and the gates of Vienna abroad; Sinan\'s architecture and a reform of the law codes (hence "the Lawgiver") at home.',
    relations: [
      { type: "ruled_during", target: "ottoman-empire" },
      { type: "related", target: "suleymaniye" },
      { type: "related", target: "sinan" },
    ],
    citations: [
      EI2("Süleymān", "G. Veinstein"),
      { source: "Caroline Finkel, Osman's Dream (John Murray, 2005)" },
    ],
  },
  {
    id: "mansa-musa",
    kind: "person",
    lane: "states",
    name: "Mansā Mūsā",
    arabic: "منسا موسى",
    start: { year: 1280, precision: "circa" },
    end: { year: 1337, precision: "circa" },
    importance: 4,
    region: "west-africa",
    location: {
      name: "Niani (Mali)",
      lat: 11.38,
      lng: -8.65,
      approximate: true,
    },
    summary:
      "Emperor of Mali whose 1324 pilgrimage, with a caravan of gold that shook Cairo's markets, put West African wealth on the map of the world, literally, and brought scholars and architects home to Timbuktu.",
    relations: [
      { type: "ruled_during", target: "mali-empire" },
      { type: "related", target: "mansa-musa-hajj" },
      { type: "related", target: "sankore-timbuktu" },
    ],
    citations: [
      { source: "Nehemia Levtzion, Ancient Ghana and Mali (Methuen, 1973)" },
      {
        source: "al-ʿUmarī, Masālik al-abṣār",
        detail: "primary account of the Cairo visit",
      },
    ],
  },
  {
    id: "akbar",
    kind: "person",
    lane: "states",
    name: "Akbar",
    arabic: "جلال الدين أكبر",
    start: { year: 1542, precision: "year" },
    end: { year: 1605, precision: "year" },
    importance: 4,
    region: "south-asia",
    location: { name: "Agra / Fatehpur Sikri", lat: 27.09, lng: 77.66 },
    summary:
      "The third Mughal emperor (r. 1556–1605), who consolidated the empire and pursued a famously pluralist policy, abolishing the poll tax, hosting inter-religious debate, and forging an administration that outlasted him by two centuries.",
    relations: [{ type: "ruled_during", target: "mughal-empire" }],
    citations: [
      EI2("Akbar", "P. Hardy"),
      { source: "John F. Richards, The Mughal Empire (Cambridge, 1993)" },
    ],
  },
  {
    id: "aurangzeb",
    kind: "person",
    lane: "states",
    name: "Aurangzeb ʿĀlamgīr",
    arabic: "أورنكزيب عالمكير",
    start: { year: 1618, precision: "year" },
    end: { year: 1707, precision: "year" },
    importance: 3,
    region: "south-asia",
    location: { name: "Delhi / Deccan", lat: 28.61, lng: 77.21 },
    summary:
      "The last of the great Mughals (r. 1658–1707), under whom the empire reached its widest extent and commissioned the Fatāwā al-ʿĀlamgīriyya, and after whom it entered a long decline. A ruler still debated sharply by historians.",
    relations: [
      { type: "ruled_during", target: "mughal-empire" },
      { type: "related", target: "fatawa-alamgiri" },
    ],
    citations: [
      EI2("Awrangzīb", "Sri Ram Sharma"),
      { source: "John F. Richards, The Mughal Empire (Cambridge, 1993)" },
    ],
  },
  {
    id: "shah-abbas",
    kind: "person",
    lane: "states",
    name: "Shah ʿAbbās I",
    arabic: "الشاه عباس الأول",
    start: { year: 1571, precision: "year" },
    end: { year: 1629, precision: "year" },
    importance: 3,
    region: "iraq-iran",
    location: { name: "Isfahan", lat: 32.65, lng: 51.67 },
    summary:
      'The Safavid shah (r. 1588–1629) who reorganized the army, expelled invaders, and rebuilt Isfahan into one of the world\'s most beautiful capitals, "Isfahan is half the world."',
    relations: [
      { type: "ruled_during", target: "safavid-empire" },
      { type: "related", target: "naqsh-e-jahan" },
    ],
    citations: [
      EI2("ʿAbbās I", "R.M. Savory"),
      { source: "Roger Savory, Iran under the Safavids (Cambridge, 1980)" },
    ],
  },

  /* --------------------------- scholars --------------------------- */
  {
    id: "ibn-ishaq",
    kind: "person",
    lane: "scholars",
    name: "Ibn Isḥāq",
    arabic: "ابن إسحاق",
    start: { year: 704, precision: "circa" },
    end: { year: 767, precision: "year" },
    importance: 4,
    region: "iraq-iran",
    location: { name: "Baghdad", lat: 33.34, lng: 44.4 },
    summary:
      "Author of the earliest full biography of the Prophet ﷺ, the Sīra, surviving through Ibn Hishām's recension, it is the backbone of everything later generations knew of the Prophetic life.",
    relations: [{ type: "related", target: "prophet-muhammad" }],
    citations: [EI2("Ibn Isḥāḳ", "J.M.B. Jones"), SIYAR],
  },
  {
    id: "al-zamakhshari",
    kind: "person",
    lane: "scholars",
    name: "al-Zamakhsharī",
    arabic: "الزمخشري",
    start: { year: 1075, precision: "year" },
    end: { year: 1144, precision: "year" },
    importance: 4,
    region: "central-asia",
    location: { name: "Khwārazm", lat: 41.4, lng: 60.3, approximate: true },
    summary:
      "The Muʿtazilī master of Arabic whose Qurʾan commentary al-Kashshāf, unrivalled on the language and rhetoric of the text, was studied (and pruned of its theology) by Sunnis for centuries.",
    relations: [{ type: "related", target: "mutazila" }],
    citations: [EI2("al-Zamakhsharī", "C.H.M. Versteegh")],
  },
  {
    id: "al-izz-ibn-abd-al-salam",
    kind: "person",
    lane: "scholars",
    name: "al-ʿIzz ibn ʿAbd al-Salām",
    arabic: "العز بن عبد السلام",
    start: { year: 1181, precision: "year" },
    end: { year: 1262, precision: "year" },
    importance: 3,
    region: "levant",
    location: { name: "Cairo", lat: 30.04, lng: 31.24 },
    summary:
      '"The Sultan of the Scholars": a Shāfiʿī jurist of Damascus and Cairo famous for confronting rulers, auctioning off Mamluk amirs to enforce the law, and pioneering the jurisprudence of benefit (maṣlaḥa).',
    relations: [{ type: "related", target: "mamluk-sultanate" }],
    citations: [EI2("al-ʿIzz b. ʿAbd al-Salām"), SIYAR],
  },
  {
    id: "al-shatibi",
    kind: "person",
    lane: "scholars",
    name: "Abū Isḥāq al-Shāṭibī",
    arabic: "أبو إسحاق الشاطبي",
    start: { year: 1320, precision: "circa" },
    end: { year: 1388, precision: "year" },
    importance: 3,
    region: "andalus-maghrib",
    location: { name: "Granada", lat: 37.18, lng: -3.6 },
    summary:
      "The Andalusi jurist whose al-Muwāfaqāt systematized the higher aims of the law (maqāṣid al-sharīʿa), a framework that became central to modern Islamic legal thought.",
    citations: [
      EI2("al-Shāṭibī, Abū Isḥāḳ"),
      {
        source:
          "Wael Hallaq, A History of Islamic Legal Theories (Cambridge, 1997)",
      },
    ],
  },
  {
    id: "al-tahir-ibn-ashur",
    kind: "person",
    lane: "scholars",
    name: "Muḥammad al-Ṭāhir ibn ʿĀshūr",
    arabic: "محمد الطاهر بن عاشور",
    start: { year: 1879, precision: "year" },
    end: { year: 1973, precision: "year" },
    importance: 3,
    region: "egypt-north-africa",
    location: { name: "Tunis", lat: 36.8, lng: 10.18 },
    summary:
      "The great Tunisian scholar of al-Zaytūna, whose Qurʾan commentary al-Taḥrīr wa-l-Tanwīr and his book on the aims of the sharīʿa renewed the maqāṣid tradition for the twentieth century.",
    relations: [
      {
        type: "related",
        target: "al-shatibi",
        note: "revived his maqāṣid approach",
      },
    ],
    citations: [
      {
        source:
          'Basheer Nafi, "Ṭāhir ibn ʿĀshūr: The Career of a Modernist Ālim", Islamic Law and Society 12 (2005)',
      },
    ],
  },
  {
    id: "rashid-rida",
    kind: "person",
    lane: "scholars",
    name: "Rashīd Riḍā",
    arabic: "رشيد رضا",
    start: { year: 1865, precision: "year" },
    end: { year: 1935, precision: "year" },
    importance: 3,
    region: "egypt-north-africa",
    location: { name: "Cairo", lat: 30.04, lng: 31.24 },
    summary:
      "Disciple of Muḥammad ʿAbduh and editor of the journal al-Manār, whose Qurʾan commentary and reformist writing carried the modernist–revivalist current across the Arab world.",
    relations: [{ type: "student_of", target: "muhammad-abduh" }],
    citations: [
      EI2("Rashīd Riḍā", "W. Ende"),
      {
        source:
          "Albert Hourani, Arabic Thought in the Liberal Age (Cambridge, 1983)",
      },
    ],
  },
  {
    id: "maududi",
    kind: "person",
    lane: "scholars",
    name: "Abū al-Aʿlā Mawdūdī",
    arabic: "أبو الأعلى المودودي",
    start: { year: 1903, precision: "year" },
    end: { year: 1979, precision: "year" },
    importance: 3,
    region: "south-asia",
    location: { name: "Lahore", lat: 31.55, lng: 74.34 },
    summary:
      "Journalist, exegete (Tafhīm al-Qurʾān), and founder of Jamāʿat-i Islāmī, among the most influential and most debated theorists of an Islamic state in the twentieth century.",
    citations: [
      {
        source:
          "Seyyed Vali Reza Nasr, Mawdudi and the Making of Islamic Revivalism (Oxford, 1996)",
      },
    ],
  },

  /* ------------------------- Sufis & orders ------------------------- */
  {
    id: "bayazid-al-bistami",
    kind: "person",
    lane: "scholars",
    name: "Bāyazīd al-Bisṭāmī",
    arabic: "بايزيد البسطامي",
    start: { year: 804, precision: "circa" },
    end: { year: 874, precision: "year" },
    importance: 3,
    region: "iraq-iran",
    location: { name: "Bisṭām", lat: 36.48, lng: 55.0 },
    summary:
      "One of the boldest voices of early Sufism, remembered for his ecstatic sayings (shaṭaḥāt) on annihilation in God, a founding presence in the mystical tradition.",
    relations: [{ type: "related", target: "sufi-orders" }],
    citations: [EI2("Abū Yazīd al-Bisṭāmī", "H. Ritter")],
  },
  {
    id: "al-hallaj",
    kind: "person",
    lane: "scholars",
    name: "al-Ḥallāj",
    arabic: "الحلاج",
    start: { year: 858, precision: "year" },
    end: {
      year: 922,
      precision: "year",
      note: "Executed in Baghdad after a long trial, an event debated ever since.",
    },
    importance: 3,
    region: "iraq-iran",
    location: { name: "Baghdad", lat: 33.34, lng: 44.4 },
    summary:
      'The mystic whose utterance "anā al-Ḥaqq" (I am the Truth) led to his execution in 922, a figure venerated by some as a martyr of divine love and censured by others, and endlessly reflected on in later literature.',
    relations: [{ type: "related", target: "sufi-orders" }],
    citations: [
      EI2("al-Ḥallādj", "L. Massignon/[L. Gardet]"),
      { source: "Louis Massignon, The Passion of al-Hallāj (Princeton, 1982)" },
    ],
  },
  {
    id: "al-qushayri",
    kind: "person",
    lane: "scholars",
    name: "al-Qushayrī",
    arabic: "القشيري",
    start: { year: 986, precision: "year" },
    end: { year: 1072, precision: "year" },
    importance: 3,
    region: "iraq-iran",
    location: { name: "Nishapur", lat: 36.21, lng: 58.8 },
    summary:
      "Author of al-Risāla al-Qushayriyya, the classic that reconciled Sufism with mainstream Sunni orthodoxy and became the standard handbook of the spiritual path.",
    relations: [{ type: "related", target: "sufi-orders" }],
    citations: [EI2("al-Ḳushayrī", "H. Halm")],
  },
  {
    id: "al-shadhili",
    kind: "person",
    lane: "scholars",
    name: "Abū al-Ḥasan al-Shādhilī",
    arabic: "أبو الحسن الشاذلي",
    start: { year: 1196, precision: "year" },
    end: { year: 1258, precision: "year" },
    importance: 3,
    region: "egypt-north-africa",
    location: { name: "Alexandria", lat: 31.2, lng: 29.92 },
    summary:
      "Founder of the Shādhiliyya, one of the most widespread Sufi orders, sober, urban, and tied to ordinary working life, from North Africa to the wider Muslim world.",
    relations: [
      { type: "founded", target: "sufi-orders", note: "the Shādhiliyya order" },
      { type: "teacher_of", target: "ibn-ata-allah" },
    ],
    citations: [EI2("al-S̲h̲ād̲h̲ilī", "P. Lory")],
  },
  {
    id: "ibn-ata-allah",
    kind: "person",
    lane: "scholars",
    name: "Ibn ʿAṭāʾ Allāh al-Iskandarī",
    arabic: "ابن عطاء الله السكندري",
    start: { year: 1259, precision: "circa" },
    end: { year: 1310, precision: "year" },
    importance: 3,
    region: "egypt-north-africa",
    location: { name: "Cairo", lat: 30.04, lng: 31.24 },
    summary:
      "The Shādhilī master whose Ḥikam, a book of spiritual aphorisms, is among the most read and commented works of Islamic spirituality.",
    relations: [{ type: "student_of", target: "al-shadhili" }],
    citations: [EI2("Ibn ʿAṭāʾ Allāh", "P. Nwyia")],
  },
  {
    id: "baha-al-din-naqshband",
    kind: "person",
    lane: "scholars",
    name: "Bahāʾ al-Dīn Naqshband",
    arabic: "بهاء الدين نقشبند",
    start: { year: 1318, precision: "year" },
    end: { year: 1389, precision: "year" },
    importance: 3,
    region: "central-asia",
    location: { name: "Bukhara", lat: 39.77, lng: 64.42 },
    summary:
      "Eponym of the Naqshbandiyya of Bukhara, the great Central and South Asian order of silent remembrance and sober sharia-mindedness, later a major force from Ottoman lands to India and China.",
    relations: [
      {
        type: "founded",
        target: "sufi-orders",
        note: "the Naqshbandiyya order",
      },
    ],
    citations: [EI2("Naḳshbandiyya", "H. Algar")],
  },
  {
    id: "ahmad-al-tijani",
    kind: "person",
    lane: "scholars",
    name: "Aḥmad al-Tijānī",
    arabic: "أحمد التجاني",
    start: { year: 1735, precision: "year" },
    end: { year: 1815, precision: "year" },
    importance: 3,
    region: "west-africa",
    location: { name: "Fez", lat: 34.06, lng: -4.98 },
    summary:
      "Founder of the Tijāniyya, which from Fez became the largest Sufi order in West Africa, a decisive current in the spread and shaping of Islam across the Sahel.",
    relations: [
      { type: "founded", target: "sufi-orders", note: "the Tijāniyya order" },
    ],
    citations: [
      EI2("al-Tid̲j̲ānī, Aḥmad"),
      {
        source:
          "J. Spencer Trimingham, The Sufi Orders in Islam (Oxford, 1971)",
      },
    ],
  },

  /* ------------------------ poets & letters ------------------------ */
  {
    id: "al-jahiz",
    kind: "person",
    lane: "culture",
    name: "al-Jāḥiẓ",
    arabic: "الجاحظ",
    start: { year: 776, precision: "circa" },
    end: {
      year: 868,
      precision: "year",
      note: "By tradition killed when his books toppled onto him.",
    },
    importance: 4,
    region: "iraq-iran",
    location: { name: "Basra", lat: 30.51, lng: 47.81 },
    summary:
      "The founder of Arabic literary prose (adab): a Muʿtazilī of Basra whose wit ranged over zoology, rhetoric, theology, and society in the Book of Animals and a thousand essays, the model of the Arabic man of letters.",
    relations: [{ type: "related", target: "mutazila" }],
    citations: [EI2("al-Djāḥiẓ", "Ch. Pellat")],
  },
  {
    id: "al-mutanabbi",
    kind: "person",
    lane: "culture",
    name: "al-Mutanabbī",
    arabic: "المتنبي",
    start: { year: 915, precision: "year" },
    end: {
      year: 965,
      precision: "year",
      note: "Killed by bandits on the road back to Baghdad.",
    },
    importance: 4,
    region: "iraq-iran",
    location: { name: "Kufa / Aleppo", lat: 36.2, lng: 37.16 },
    summary:
      'Widely held the greatest of all Arabic poets: his dīwān of praise, wisdom, and towering self-assertion has been memorized and quoted for a thousand years, "the filler of the world and the occupier of people."',
    citations: [EI2("al-Mutanabbī", "R. Blachère")],
  },
  {
    id: "abu-nuwas",
    kind: "person",
    lane: "culture",
    name: "Abū Nuwās",
    arabic: "أبو نواس",
    start: { year: 756, precision: "circa" },
    end: { year: 814, precision: "circa" },
    importance: 3,
    region: "iraq-iran",
    location: { name: "Baghdad", lat: 33.34, lng: 44.4 },
    summary:
      "The brilliant, irreverent poet of Abbasid Baghdad, master of wine verse and wit, and a recurring character in the Thousand and One Nights.",
    citations: [EI2("Abū Nuwās", "E. Wagner")],
  },
  {
    id: "al-maarri",
    kind: "person",
    lane: "culture",
    name: "Abū al-ʿAlāʾ al-Maʿarrī",
    arabic: "أبو العلاء المعري",
    start: { year: 973, precision: "year" },
    end: { year: 1057, precision: "year" },
    importance: 3,
    region: "levant",
    location: { name: "Maʿarrat al-Nuʿmān", lat: 35.65, lng: 36.68 },
    summary:
      "The blind poet-philosopher of Syria, whose skeptical, austere verse (the Luzūmiyyāt) and prose Epistle of Forgiveness make him one of the most original minds of classical Arabic literature.",
    citations: [EI2("al-Maʿarrī", "P. Smoor")],
  },
  {
    id: "ibn-manzur",
    kind: "person",
    lane: "culture",
    name: "Ibn Manẓūr",
    arabic: "ابن منظور",
    start: { year: 1233, precision: "year" },
    end: { year: 1312, precision: "year" },
    importance: 3,
    region: "egypt-north-africa",
    location: { name: "Cairo", lat: 30.04, lng: 31.24 },
    summary:
      "Compiler of Lisān al-ʿArab, the greatest dictionary of the Arabic language, a twenty-volume treasury that preserved the vocabulary of the classical tongue.",
    relations: [{ type: "wrote", target: "lisan-al-arab" }],
    citations: [EI2("Ibn Manẓūr", "J.W. Fück")],
  },
  {
    id: "al-busiri",
    kind: "person",
    lane: "culture",
    name: "al-Būṣīrī",
    arabic: "البوصيري",
    start: { year: 1211, precision: "year" },
    end: { year: 1294, precision: "circa" },
    importance: 3,
    region: "egypt-north-africa",
    location: { name: "Alexandria", lat: 31.2, lng: 29.92 },
    summary:
      "Author of the Qaṣīdat al-Burda, the poem in praise of the Prophet ﷺ recited across the Muslim world more than any other, from West Africa to Southeast Asia.",
    relations: [{ type: "wrote", target: "qasidat-al-burda" }],
    citations: [EI2("al-Būṣīrī", "R. Basset")],
  },

  /* ---------------------------- science ---------------------------- */
  {
    id: "jabir-ibn-hayyan",
    kind: "person",
    lane: "science",
    name: "Jābir ibn Ḥayyān",
    arabic: "جابر بن حيان",
    aliases: ["Geber"],
    start: { year: 721, precision: "circa" },
    end: { year: 815, precision: "circa" },
    importance: 3,
    region: "iraq-iran",
    location: { name: "Kufa", lat: 32.03, lng: 44.4 },
    summary:
      "The father of Arabic alchemy and a founder of experimental chemistry, the vast corpus under his name introduced laboratory procedures and substances that seeded the science for a millennium.",
    citations: [EI2("Djābir b. Ḥayyān", "P. Kraus/[M. Plessner]")],
  },
  {
    id: "hunayn-ibn-ishaq",
    kind: "person",
    lane: "science",
    name: "Ḥunayn ibn Isḥāq",
    arabic: "حنين بن إسحاق",
    aliases: ["Johannitius"],
    start: { year: 809, precision: "year" },
    end: { year: 873, precision: "year" },
    importance: 4,
    region: "iraq-iran",
    location: { name: "Baghdad", lat: 33.34, lng: 44.4 },
    summary:
      "The greatest translator of the age, a Christian physician who rendered Galen, Hippocrates, and much of Greek medicine and science into Arabic with a rigor that set the standard, and wrote on the eye and on method.",
    relations: [{ type: "related", target: "translation-movement" }],
    citations: [EI2("Ḥunayn b. Isḥāḳ", "G. Strohmaier")],
  },
  {
    id: "al-battani",
    kind: "person",
    lane: "science",
    name: "al-Battānī",
    arabic: "البتاني",
    aliases: ["Albategnius"],
    start: { year: 858, precision: "circa" },
    end: { year: 929, precision: "year" },
    importance: 3,
    region: "iraq-iran",
    location: { name: "Raqqa", lat: 35.95, lng: 39.0 },
    summary:
      'The astronomer whose refined measurements of the solar year and planetary motion, transmitted to Europe as "Albategnius", were used by Copernicus seven centuries later.',
    citations: [
      EI2("al-Battānī", "C.A. Nallino"),
      {
        source:
          "George Saliba, Islamic Science and the Making of the European Renaissance (MIT, 2007)",
      },
    ],
  },
  {
    id: "al-sufi",
    kind: "person",
    lane: "science",
    name: "ʿAbd al-Raḥmān al-Ṣūfī",
    arabic: "عبد الرحمن الصوفي",
    aliases: ["Azophi"],
    start: { year: 903, precision: "year" },
    end: { year: 986, precision: "year" },
    importance: 3,
    region: "iraq-iran",
    location: { name: "Isfahan", lat: 32.65, lng: 51.67 },
    summary:
      "Astronomer of the Book of Fixed Stars, whose beautifully illustrated star catalogue named constellations and recorded the Andromeda galaxy, its star names survive in every telescope today.",
    citations: [
      EI2("al-Ṣūfī, ʿAbd al-Raḥmān"),
      {
        source:
          "George Saliba, Islamic Science and the Making of the European Renaissance (MIT, 2007)",
      },
    ],
  },
  {
    id: "ibn-al-baytar",
    kind: "person",
    lane: "science",
    name: "Ibn al-Bayṭār",
    arabic: "ابن البيطار",
    start: { year: 1197, precision: "circa" },
    end: { year: 1248, precision: "year" },
    importance: 3,
    region: "andalus-maghrib",
    location: { name: "Málaga / Damascus", lat: 36.72, lng: -4.42 },
    summary:
      "The greatest botanist and pharmacologist of the medieval world: his compendium described some 1,400 plants and remedies, many new to science, gathered from Iberia to the Near East.",
    citations: [EI2("Ibn al-Bayṭār", "J. Vernet")],
  },
  {
    id: "al-kashi",
    kind: "person",
    lane: "science",
    name: "Jamshīd al-Kāshī",
    arabic: "غياث الدين الكاشي",
    start: { year: 1380, precision: "circa" },
    end: { year: 1429, precision: "year" },
    importance: 3,
    region: "central-asia",
    location: { name: "Samarkand", lat: 39.65, lng: 66.96 },
    summary:
      "Mathematician-astronomer at Ulugh Beg's Samarkand observatory who computed π to sixteen decimal places and mastered decimal fractions, a high-water mark of pre-modern computation.",
    relations: [{ type: "related", target: "ulugh-beg-observatory" }],
    citations: [
      EI2("al-Kāshī", "E.S. Kennedy"),
      {
        source:
          "George Saliba, Islamic Science and the Making of the European Renaissance (MIT, 2007)",
      },
    ],
  },

  /* ----------------------------- books ----------------------------- */
  {
    id: "lisan-al-arab",
    kind: "book",
    lane: "books",
    name: "Lisān al-ʿArab",
    arabic: "لسان العرب",
    start: {
      year: 1290,
      precision: "circa",
      note: "Completed near the end of the 13th century.",
    },
    importance: 3,
    region: "egypt-north-africa",
    location: { name: "Cairo", lat: 30.04, lng: 31.24 },
    summary:
      "Ibn Manẓūr's vast dictionary of Arabic, the reference that preserved the classical language's full vocabulary and remains indispensable to scholars.",
    relations: [{ type: "written_by", target: "ibn-manzur" }],
    citations: [EI2("Ibn Manẓūr", "J.W. Fück")],
  },
  {
    id: "qasidat-al-burda",
    kind: "book",
    lane: "books",
    name: "Qaṣīdat al-Burda",
    arabic: "قصيدة البردة",
    start: { year: 1260, precision: "circa" },
    importance: 3,
    region: "egypt-north-africa",
    location: { name: "Alexandria", lat: 31.2, lng: 29.92 },
    summary:
      'Al-Būṣīrī\'s "Poem of the Mantle" in praise of the Prophet ﷺ, perhaps the most widely recited poem in the Muslim world, translated and set to melody across every region.',
    relations: [{ type: "written_by", target: "al-busiri" }],
    citations: [EI2("al-Būṣīrī", "R. Basset")],
  },
  {
    id: "kitab-al-aghani",
    kind: "book",
    lane: "books",
    name: "Kitāb al-Aghānī",
    arabic: "كتاب الأغاني",
    start: {
      year: 950,
      precision: "circa",
      note: "Compiled by Abū al-Faraj al-Iṣfahānī over decades in the 10th century.",
    },
    importance: 3,
    region: "iraq-iran",
    location: { name: "Baghdad", lat: 33.34, lng: 44.4 },
    summary:
      'The "Book of Songs": a sprawling anthology of Arabic poetry, music, and anecdote that is our richest window onto the social and cultural life of the early Islamic centuries.',
    citations: [EI2("Abu 'l-Faradj al-Iṣbahānī", "M. Nallino")],
  },
  {
    id: "hayy-ibn-yaqzan",
    kind: "book",
    lane: "books",
    name: "Ḥayy ibn Yaqẓān",
    arabic: "حي بن يقظان",
    start: { year: 1160, precision: "circa" },
    importance: 3,
    region: "andalus-maghrib",
    location: { name: "Granada", lat: 37.18, lng: -3.6 },
    summary:
      "Ibn Ṭufayl's philosophical tale of a child raised alone on an island who reasons his way to truth, a landmark of Andalusi thought, later read across Europe and an ancestor of the philosophical novel.",
    citations: [
      EI2("Ibn Ṭufayl", "B. Carra de Vaux"),
      {
        source:
          "Lenn E. Goodman (tr.), Ibn Tufayl's Hayy ibn Yaqzan (Chicago UP, 2009)",
      },
    ],
  },

  /* -------------------------- conquests & events -------------------------- */
  {
    id: "battle-of-siffin",
    kind: "battle",
    lane: "battles",
    name: "Battle of Ṣiffīn",
    arabic: "معركة صفين",
    start: { year: 657, precision: "year", note: "During the first fitna." },
    importance: 3,
    region: "levant",
    location: {
      name: "Ṣiffīn (upper Euphrates)",
      lat: 35.95,
      lng: 39.0,
      approximate: true,
    },
    summary:
      "The great, indecisive battle of the first civil war between ʿAlī and Muʿāwiya, ended by the call to arbitration, the fracture from which the divisions of early Islam grew.",
    relations: [
      { type: "related", target: "ali-ibn-abi-talib" },
      { type: "related", target: "muawiya" },
    ],
    citations: [EI2("Ṣiffīn", "M. Lecker"), KENNEDY],
  },
  {
    id: "conquest-of-sindh",
    kind: "event",
    lane: "battles",
    name: "Conquest of Sind",
    arabic: "فتح السند",
    start: { year: 711, precision: "year" },
    end: { year: 713, precision: "year" },
    importance: 3,
    region: "south-asia",
    location: { name: "Sind", lat: 25.4, lng: 68.4, approximate: true },
    summary:
      "Muḥammad ibn al-Qāsim's campaign brought the lower Indus under Umayyad rule, the first lasting Muslim presence in the Indian subcontinent, seven centuries before the Delhi Sultanate.",
    relations: [
      { type: "related", target: "muhammad-ibn-qasim" },
      { type: "occurred_under", target: "umayyad-caliphate" },
    ],
    citations: [
      {
        source:
          "Derryl N. MacLean, Religion and Society in Arab Sind (Brill, 1989)",
      },
    ],
  },
  {
    id: "fall-of-toledo",
    kind: "event",
    lane: "battles",
    name: "Fall of Toledo",
    arabic: "سقوط طليطلة",
    start: { year: 1085, precision: "year" },
    importance: 3,
    region: "andalus-maghrib",
    location: { name: "Toledo", lat: 39.86, lng: -4.02 },
    summary:
      "The loss of the great city of Toledo to Castile, the first major Christian conquest of a Muslim capital in Iberia, which triggered the Almoravid intervention and opened Toledo's libraries to Latin translators.",
    relations: [{ type: "related", target: "almoravids" }],
    citations: [
      { source: "Hugh Kennedy, Muslim Spain and Portugal (Longman, 1996)" },
    ],
  },
  {
    id: "battle-of-nicopolis",
    kind: "battle",
    lane: "battles",
    name: "Battle of Nicopolis",
    arabic: "معركة نيقوبوليس",
    start: { year: 1396, precision: "year" },
    importance: 2,
    region: "anatolia-balkans",
    location: { name: "Nicopolis (Danube)", lat: 43.7, lng: 24.9 },
    summary:
      "Sultan Bāyezīd I destroyed the last great crusade launched against the Ottomans, confirming Ottoman dominance in the Balkans on the eve of Timur's disruption.",
    relations: [{ type: "part_of", target: "ottoman-empire" }],
    citations: [
      { source: "Caroline Finkel, Osman's Dream (John Murray, 2005)" },
    ],
  },
  {
    id: "vasco-da-gama",
    kind: "event",
    lane: "world",
    name: "Vasco da Gama reaches India",
    arabic: "وصول فاسكو دا غاما إلى الهند",
    start: { year: 1498, precision: "year" },
    importance: 3,
    region: "europe-world",
    location: { name: "Calicut", lat: 11.25, lng: 75.78 },
    summary:
      "The Portuguese sea route around Africa to India broke the Muslim monopoly on Indian Ocean trade, beginning centuries of European naval pressure on the ports of the Islamic world.",
    relations: [
      {
        type: "related",
        target: "malacca-sultanate",
        note: "Portuguese would take Malacca in 1511",
      },
    ],
    citations: [
      {
        source:
          "K.N. Chaudhuri, Trade and Civilisation in the Indian Ocean (Cambridge, 1985)",
      },
    ],
  },
  {
    id: "arab-israeli-1948",
    kind: "event",
    lane: "battles",
    name: "1948 war & the establishment of Israel",
    arabic: "حرب ١٩٤٨ والنكبة",
    start: { year: 1948, precision: "year" },
    importance: 3,
    region: "levant",
    location: { name: "Jerusalem", lat: 31.78, lng: 35.23 },
    summary:
      "The end of the British Mandate, the declaration of the State of Israel, the first Arab–Israeli war, and the displacement of much of Palestine's Arab population (the Nakba), events that have shaped the region's politics ever since. A subject of ongoing and contested historical debate.",
    relations: [{ type: "related", target: "post-ottoman-partition" }],
    citations: [
      {
        source:
          "Rashid Khalidi, The Iron Cage: The Story of the Palestinian Struggle for Statehood (Beacon, 2006)",
      },
      {
        source:
          "Benny Morris, 1948: A History of the First Arab-Israeli War (Yale UP, 2008)",
      },
    ],
  },

  /* -------------------------- institutions -------------------------- */
  {
    id: "mustansiriyya",
    kind: "institution",
    lane: "culture",
    name: "al-Mustanṣiriyya madrasa",
    arabic: "المدرسة المستنصرية",
    start: { year: 1234, precision: "year" },
    ongoing: true,
    importance: 2,
    region: "iraq-iran",
    location: { name: "Baghdad", lat: 33.34, lng: 44.4 },
    summary:
      "The Abbasid caliph al-Mustanṣir's Baghdad college, among the first to teach all four Sunni law schools under one roof, a landmark in the institutional history of learning, standing on the Tigris to this day.",
    relations: [{ type: "occurred_under", target: "abbasid-caliphate" }],
    citations: [
      { source: "George Makdisi, The Rise of Colleges (Edinburgh UP, 1981)" },
    ],
  },
  {
    id: "great-mosque-of-djenne",
    kind: "institution",
    lane: "culture",
    name: "Great Mosque of Djenné & Sahelian architecture",
    arabic: "الجامع الكبير في جينيه",
    start: {
      year: 1240,
      precision: "circa",
      note: "A mosque is attested at Djenné from the 13th century; the present mud-brick structure dates to 1907, rebuilt in the same tradition.",
    },
    ongoing: true,
    importance: 2,
    region: "west-africa",
    location: { name: "Djenné (Mali)", lat: 13.9, lng: -4.55 },
    summary:
      "The largest mud-brick building in the world and the emblem of Sudano-Sahelian architecture, a West African Islamic form in earth and timber, re-plastered each year by the whole community.",
    relations: [{ type: "related", target: "mali-empire" }],
    citations: [
      {
        source:
          "Labelle Prussin, Hatumere: Islamic Design in West Africa (California UP, 1986)",
      },
    ],
  },
  {
    id: "coffee-origins",
    kind: "event",
    lane: "culture",
    name: "Coffee spreads from Yemen",
    arabic: "انتشار القهوة من اليمن",
    start: {
      year: 1450,
      precision: "circa",
      note: "Attested among Sufis of Yemen in the mid-15th century; to Makkah, Cairo, and Istanbul over the following century.",
    },
    importance: 2,
    region: "arabia",
    location: { name: "Mocha (Yemen)", lat: 13.32, lng: 43.25 },
    summary:
      "Sufis of Yemen brewed coffee to stay awake for night devotions; from the port of Mocha it reached Makkah, Cairo, and Istanbul, and the coffeehouse, a new institution of public life, before ever reaching Europe.",
    citations: [
      {
        source:
          "Ralph S. Hattox, Coffee and Coffeehouses: The Origins of a Social Beverage in the Medieval Near East (Washington UP, 1985)",
      },
    ],
  },
];

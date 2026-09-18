/**
 * Wider-world and pre-Islamic history, placed on the honest scale so the
 * distance between, say, the pyramids and the Hijra, or Aristotle and Ibn
 * Rushd, is visible at true proportion. Ancient dates are approximate (circa)
 * by nature. These records are context, not claims of the Islamic tradition.
 */
import type { TimelineRecord } from "@/lib/types";

const CAH = { source: "The Cambridge Ancient History (Cambridge UP)" };

export const worldExtraRecords: TimelineRecord[] = [
  /* --------------------------- deep antiquity --------------------------- */
  {
    id: "sumer-writing",
    kind: "event",
    lane: "world",
    name: "Invention of writing (Sumer)",
    arabic: "اختراع الكتابة في سومر",
    start: {
      year: -3200,
      precision: "circa",
      note: "Cuneiform on clay in southern Mesopotamia; approximate.",
    },
    importance: 3,
    region: "iraq-iran",
    location: {
      name: "Uruk (Sumer)",
      lat: 31.32,
      lng: 45.64,
      approximate: true,
    },
    summary:
      "In the same land that would later hold Baghdad and Kufa, the Sumerians made the first writing, cuneiform pressed into clay. The beginning of recorded history, and of the long story this timeline tells.",
    citations: [
      {
        source:
          "Jean Bottéro, Mesopotamia: Writing, Reasoning, and the Gods (Chicago UP, 1992)",
      },
      CAH,
    ],
  },
  {
    id: "pyramids-giza",
    kind: "institution",
    lane: "world",
    name: "Great Pyramid of Giza",
    arabic: "الهرم الأكبر بالجيزة",
    start: { year: -2560, precision: "circa" },
    ongoing: true,
    importance: 4,
    region: "egypt-north-africa",
    location: { name: "Giza", lat: 29.98, lng: 31.13 },
    summary:
      "The tomb of Khufu, the oldest and only surviving wonder of the ancient world, already more than three thousand years old when ʿAmr ibn al-ʿĀṣ conquered Egypt. Still standing above the city that became Cairo.",
    citations: [{ source: "Miroslav Verner, The Pyramids (Grove, 2001)" }],
  },
  {
    id: "code-of-hammurabi",
    kind: "book",
    lane: "world",
    name: "Code of Hammurabi",
    arabic: "شريعة حمورابي",
    start: { year: -1754, precision: "circa" },
    importance: 3,
    region: "iraq-iran",
    location: { name: "Babylon", lat: 32.54, lng: 44.42 },
    summary:
      "One of the earliest written law codes, carved on a black stele in Babylon, three and a half millennia before the jurists of the same region wrote the Islamic schools of law.",
    citations: [
      {
        source:
          "Martha T. Roth, Law Collections from Mesopotamia and Asia Minor (Scholars Press, 1995)",
      },
    ],
  },
  {
    id: "cyrus-great",
    kind: "person",
    lane: "world",
    name: "Cyrus the Great",
    arabic: "كورش الكبير",
    start: { year: -600, precision: "circa" },
    end: { year: -530, precision: "circa" },
    importance: 3,
    region: "iraq-iran",
    location: { name: "Pasargadae", lat: 30.2, lng: 53.18 },
    summary:
      "Founder of the Achaemenid Persian empire, the first world empire, remembered for a famous edict of tolerance. The Persia he built is the one the Muslim armies would meet a thousand years later at Qādisiyya.",
    relations: [{ type: "founded", target: "achaemenid-empire" }],
    citations: [
      {
        source:
          "Pierre Briant, From Cyrus to Alexander: A History of the Persian Empire (Eisenbrauns, 2002)",
      },
    ],
  },
  {
    id: "achaemenid-empire",
    kind: "empire",
    lane: "world",
    name: "Achaemenid Persian Empire",
    arabic: "الإمبراطورية الأخمينية",
    start: { year: -550, precision: "circa" },
    end: { year: -330, precision: "year", note: "Ended by Alexander." },
    importance: 3,
    region: "iraq-iran",
    location: { name: "Persepolis", lat: 29.94, lng: 52.89 },
    summary:
      "The first Persian world empire, from the Indus to the Aegean, whose administrative genius set a template later inherited, through the Sasanians, by the Islamic caliphates.",
    citations: [
      { source: "Pierre Briant, From Cyrus to Alexander (Eisenbrauns, 2002)" },
      CAH,
    ],
  },
  {
    id: "buddha",
    kind: "person",
    lane: "world",
    name: "Gautama Buddha",
    arabic: "بوذا",
    start: {
      year: -563,
      precision: "disputed",
      note: "Birth commonly given c. 563 BCE; some scholarship favours c. 480 BCE.",
    },
    end: { year: -483, precision: "disputed" },
    importance: 3,
    region: "south-asia",
    location: { name: "Bodh Gaya", lat: 24.7, lng: 84.99 },
    summary:
      "Founder of Buddhism in the Ganges plain, a contemporary of Confucius half a world away. His tradition spread across the very lands of Central Asia that Islam would later reach.",
    citations: [
      {
        source:
          "Richard Gombrich, Theravāda Buddhism (Routledge, 2nd ed. 2006)",
      },
    ],
  },
  {
    id: "confucius",
    kind: "person",
    lane: "world",
    name: "Confucius",
    arabic: "كونفوشيوس",
    start: { year: -551, precision: "year" },
    end: { year: -479, precision: "year" },
    importance: 3,
    region: "europe-world",
    location: { name: "Qufu (China)", lat: 35.6, lng: 116.99 },
    summary:
      "The teacher whose ethics shaped Chinese civilization for two and a half millennia, living at the same moment as the Buddha and the Hebrew prophets, a hinge age of the human spirit.",
    citations: [
      { source: "Annping Chin, The Authentic Confucius (Scribner, 2007)" },
    ],
  },
  {
    id: "aristotle",
    kind: "person",
    lane: "world",
    name: "Aristotle",
    arabic: "أرسطو",
    aliases: ["al-Muallim al-Awwal"],
    start: { year: -384, precision: "year" },
    end: { year: -322, precision: "year" },
    importance: 4,
    region: "europe-world",
    location: { name: "Athens", lat: 37.98, lng: 23.73 },
    summary:
      "The Greek philosopher whose logic, physics, and metaphysics, translated into Arabic in Baghdad, became the foundation of Islamic philosophy. Muslim thinkers called him simply the First Teacher (al-Muʿallim al-Awwal).",
    relations: [
      { type: "influenced", target: "al-farabi" },
      { type: "influenced", target: "ibn-sina" },
      { type: "related", target: "translation-movement" },
      {
        type: "related",
        target: "ibn-rushd",
        note: "his greatest medieval commentator",
      },
    ],
    citations: [
      {
        source:
          "Jonathan Barnes, Aristotle: A Very Short Introduction (Oxford, 2000)",
      },
    ],
  },
  {
    id: "alexander-great",
    kind: "person",
    lane: "world",
    name: "Alexander the Great",
    arabic: "الإسكندر الأكبر",
    aliases: ["Iskandar"],
    start: { year: -356, precision: "year" },
    end: { year: -323, precision: "year", note: "Died at Babylon." },
    importance: 3,
    region: "europe-world",
    location: { name: "Babylon", lat: 32.54, lng: 44.42 },
    summary:
      "The Macedonian conqueror who spread Greek culture from Egypt to India, seeding the Hellenistic world whose science the Arabs later inherited. Some traditions have linked him to the Qurʾanic Dhū al-Qarnayn, a connection scholars debate.",
    citations: [
      { source: "Robin Lane Fox, Alexander the Great (Allen Lane, 1973)" },
    ],
  },
  {
    id: "ashoka",
    kind: "person",
    lane: "world",
    name: "Ashoka",
    arabic: "أشوكا",
    start: { year: -304, precision: "circa" },
    end: { year: -232, precision: "circa" },
    importance: 2,
    region: "south-asia",
    location: { name: "Pataliputra", lat: 25.61, lng: 85.14 },
    summary:
      "The Mauryan emperor who, after a bloody conquest, embraced Buddhist non-violence and inscribed edicts of tolerance across India, one of antiquity's rare philosopher-kings.",
    citations: [
      {
        source:
          "Romila Thapar, Aśoka and the Decline of the Mauryas (Oxford, 3rd ed. 2012)",
      },
    ],
  },
  {
    id: "roman-empire",
    kind: "empire",
    lane: "world",
    name: "Roman Empire",
    arabic: "الإمبراطورية الرومانية",
    start: {
      year: -27,
      precision: "year",
      note: "From Augustus; the Republic preceded it.",
    },
    end: {
      year: 476,
      precision: "year",
      note: "Fall of the Western empire; the Eastern (Byzantine) continued to 1453.",
    },
    importance: 4,
    region: "europe-world",
    location: { name: "Rome", lat: 41.9, lng: 12.5 },
    summary:
      "The empire that ruled the Mediterranean world into which Islam was born. Its eastern half, Byzantium, would be the Muslims' great neighbour and rival for eight centuries, until Constantinople fell in 1453.",
    relations: [
      {
        type: "related",
        target: "byzantine-empire",
        note: "its surviving eastern half",
      },
    ],
    citations: [
      { source: "Mary Beard, SPQR: A History of Ancient Rome (Profile, 2015)" },
    ],
  },
  {
    id: "han-dynasty",
    kind: "empire",
    lane: "world",
    name: "Han dynasty (China)",
    arabic: "أسرة هان",
    start: { year: -202, precision: "year" },
    end: { year: 220, precision: "year" },
    importance: 2,
    region: "europe-world",
    location: { name: "Chang'an", lat: 34.34, lng: 108.94 },
    summary:
      "China's classical empire, contemporary with Rome, whose opening of the Silk Road first linked East Asia to the Near East, the road that Muslim merchants would later travel to Canton.",
    citations: [
      {
        source:
          "Mark Edward Lewis, The Early Chinese Empires: Qin and Han (Harvard UP, 2007)",
      },
    ],
  },
  /* --------------------------- pre-Islamic Arabia & Near East --------------------------- */
  {
    id: "nabataeans-petra",
    kind: "empire",
    lane: "world",
    name: "Nabataean kingdom (Petra)",
    arabic: "مملكة الأنباط",
    start: { year: -168, precision: "circa" },
    end: { year: 106, precision: "year", note: "Annexed by Rome." },
    importance: 2,
    region: "arabia",
    location: { name: "Petra", lat: 30.33, lng: 35.44 },
    summary:
      "The Arab caravan kingdom that carved Petra and al-Ḥijr from rock and grew rich on the incense trade. Its script is an ancestor of the Arabic alphabet in which the Qurʾan would be written.",
    citations: [
      {
        source:
          "Jane Taylor, Petra and the Lost Kingdom of the Nabataeans (I.B. Tauris, 2001)",
      },
    ],
  },
  {
    id: "himyar",
    kind: "empire",
    lane: "world",
    name: "Ḥimyarite kingdom (Yemen)",
    arabic: "مملكة حمير",
    start: { year: -110, precision: "circa" },
    end: { year: 525, precision: "year", note: "Fell to Aksumite invasion." },
    importance: 2,
    region: "arabia",
    location: {
      name: "Ẓafār (Yemen)",
      lat: 14.22,
      lng: 44.4,
      approximate: true,
    },
    summary:
      "The last great kingdom of pre-Islamic South Arabia, which turned to monotheism in its final century. Its fall and the Aksumite occupation form the backdrop to the Year of the Elephant.",
    relations: [{ type: "related", target: "year-of-the-elephant" }],
    citations: [
      {
        source:
          'Christian Julien Robin, "Ḥimyar and Islam", in Arabs and Empires before Islam (Oxford, 2015)',
      },
    ],
  },
  {
    id: "aksum",
    kind: "empire",
    lane: "world",
    name: "Kingdom of Aksum",
    arabic: "مملكة أكسوم",
    start: { year: 100, precision: "circa" },
    end: { year: 940, precision: "circa" },
    importance: 2,
    region: "east-africa",
    location: { name: "Aksum", lat: 14.13, lng: 38.72 },
    summary:
      "The Christian trading empire of the Ethiopian highlands, which gave refuge to the first Muslim emigrants under the Negus, a kindness the Prophet ﷺ never forgot.",
    relations: [
      {
        type: "related",
        target: "prophet-muhammad",
        note: "sheltered the first hijra to Abyssinia",
      },
    ],
    citations: [
      {
        source:
          "Stuart Munro-Hay, Aksum: An African Civilisation of Late Antiquity (Edinburgh UP, 1991)",
      },
    ],
  },
  {
    id: "muallaqat",
    kind: "book",
    lane: "culture",
    name: "The Muʿallaqāt (hanging odes)",
    arabic: "المعلقات",
    start: {
      year: 550,
      precision: "circa",
      note: "The famous odes date to the century before Islam.",
    },
    importance: 3,
    region: "arabia",
    location: { name: "Arabia", lat: 25.0, lng: 45.0, approximate: true },
    summary:
      "The seven great odes of pre-Islamic Arabia, by Imruʾ al-Qays and his peers, the summit of the Arabic poetry that the Qurʾan would answer in a language its first hearers already prized above all things.",
    citations: [
      {
        source: "Encyclopaedia of Islam, 2nd ed. (Brill)",
        detail: 's.v. "al-Muʿallaḳāt"',
      },
    ],
  },
  {
    id: "year-of-the-elephant",
    kind: "event",
    lane: "world",
    name: "Year of the Elephant",
    arabic: "عام الفيل",
    start: {
      year: 570,
      precision: "circa",
      note: "Traditionally the year of the Prophet's ﷺ birth; Abraha's expedition against Makkah.",
    },
    importance: 3,
    region: "arabia",
    location: { name: "Makkah", lat: 21.42, lng: 39.83 },
    summary:
      "The failed march of Abraha's army, with its war elephant, against the Kaʿba, remembered in Surat al-Fīl and traditionally dated to the year the Prophet ﷺ was born.",
    relations: [
      { type: "related", target: "prophet-muhammad" },
      { type: "related", target: "himyar" },
    ],
    citations: [
      {
        source: "Encyclopaedia of Islam, 2nd ed. (Brill)",
        detail: 's.v. "al-Fīl"',
      },
    ],
  },
  /* --------------------------- world, parallel to the Islamic era --------------------------- */
  {
    id: "norman-conquest",
    kind: "event",
    lane: "world",
    name: "Norman conquest of England",
    arabic: "الفتح النورماندي لإنجلترا",
    start: { year: 1066, precision: "year" },
    importance: 2,
    region: "europe-world",
    location: { name: "Hastings", lat: 50.85, lng: 0.57 },
    summary:
      "The year that remade England, when the Seljuks held Baghdad and al-Andalus was fragmenting into ṭāʾifa kingdoms, a useful anchor for the European reader.",
    citations: [
      { source: "Marc Morris, The Norman Conquest (Hutchinson, 2012)" },
    ],
  },
  {
    id: "marco-polo",
    kind: "person",
    lane: "world",
    name: "Marco Polo",
    arabic: "ماركو بولو",
    start: { year: 1254, precision: "year" },
    end: { year: 1324, precision: "year" },
    importance: 2,
    region: "europe-world",
    location: { name: "Venice", lat: 45.44, lng: 12.32 },
    summary:
      "The Venetian traveller whose account of Asia, written a generation before Ibn Baṭṭūṭa set out, opened the East to European imagination along roads the Mongol peace had made passable.",
    relations: [
      {
        type: "related",
        target: "ibn-battuta",
        note: "the Muslim world's greater traveller, a generation later",
      },
    ],
    citations: [
      {
        source:
          "John Larner, Marco Polo and the Discovery of the World (Yale UP, 1999)",
      },
    ],
  },
  {
    id: "leonardo-da-vinci",
    kind: "person",
    lane: "world",
    name: "Leonardo da Vinci",
    arabic: "ليوناردو دا فينشي",
    start: { year: 1452, precision: "year" },
    end: { year: 1519, precision: "year" },
    importance: 3,
    region: "europe-world",
    location: { name: "Florence", lat: 43.77, lng: 11.26 },
    summary:
      "The emblem of the European Renaissance, at work in the very decades the Ottomans took Constantinople and Granada fell, when the balance of the world was tilting.",
    citations: [
      { source: "Walter Isaacson, Leonardo da Vinci (Simon & Schuster, 2017)" },
    ],
  },
  {
    id: "isaac-newton",
    kind: "person",
    lane: "science",
    name: "Isaac Newton",
    arabic: "إسحاق نيوتن",
    start: { year: 1643, precision: "year" },
    end: { year: 1727, precision: "year" },
    importance: 3,
    region: "europe-world",
    location: { name: "Cambridge", lat: 52.2, lng: 0.12 },
    summary:
      "Whose Principia (1687) crowned the Scientific Revolution that had built, in part, on centuries of translated Arabic science, as the Ottoman, Safavid, and Mughal empires reached their late peak.",
    relations: [{ type: "related", target: "scientific-revolution" }],
    citations: [
      {
        source:
          "Richard S. Westfall, Never at Rest: A Biography of Isaac Newton (Cambridge, 1980)",
      },
    ],
  },
  {
    id: "american-independence",
    kind: "event",
    lane: "world",
    name: "American independence",
    arabic: "استقلال الولايات المتحدة",
    start: { year: 1776, precision: "year" },
    importance: 2,
    region: "europe-world",
    location: { name: "Philadelphia", lat: 39.95, lng: -75.16 },
    summary:
      "The founding of the United States, contemporary with the first Saudi state in Najd and the late Mughal decline, the modern world taking shape on several continents at once.",
    citations: [
      {
        source:
          "Gordon S. Wood, The American Revolution: A History (Modern Library, 2002)",
      },
    ],
  },
  {
    id: "world-war-two",
    kind: "event",
    lane: "world",
    name: "Second World War",
    arabic: "الحرب العالمية الثانية",
    start: { year: 1939, precision: "year" },
    end: { year: 1945, precision: "year" },
    importance: 3,
    region: "europe-world",
    location: {
      name: "Europe & Asia",
      lat: 50.0,
      lng: 15.0,
      approximate: true,
    },
    summary:
      "The war whose aftermath dismantled the European empires and set in motion the independence of most of the Muslim world, from Indonesia and Pakistan to the Arab states.",
    relations: [{ type: "related", target: "partition-pakistan" }],
    citations: [
      {
        source:
          "Antony Beevor, The Second World War (Weidenfeld & Nicolson, 2012)",
      },
    ],
  },
  /* --------------------------- modern --------------------------- */
  {
    id: "oil-in-arabia",
    kind: "event",
    lane: "world",
    name: "Oil discovered in Arabia",
    arabic: "اكتشاف النفط في الجزيرة",
    start: { year: 1938, precision: "year" },
    importance: 3,
    region: "arabia",
    location: { name: "Dhahran", lat: 26.29, lng: 50.15 },
    summary:
      "The strike at Dammam that turned the new Saudi kingdom, and soon the whole Gulf, into the centre of world energy, remaking the economy and geopolitics of the Muslim world within a generation.",
    relations: [{ type: "related", target: "saudi-arabia-founded" }],
    citations: [
      {
        source:
          "Daniel Yergin, The Prize: The Epic Quest for Oil, Money, and Power (Simon & Schuster, 1991)",
      },
    ],
  },
  {
    id: "malcolm-x",
    kind: "person",
    lane: "culture",
    name: "Malcolm X (al-Ḥājj Mālik al-Shabāzz)",
    arabic: "الحاج مالك الشباز",
    start: { year: 1925, precision: "year" },
    end: { year: 1965, precision: "year", note: "Assassinated in New York." },
    importance: 2,
    region: "europe-world",
    location: { name: "New York", lat: 40.71, lng: -74.01 },
    summary:
      "The American human-rights leader whose 1964 pilgrimage to Makkah, where he saw Muslims of every colour worship as one, transformed his message and became a landmark of Islam in the modern West.",
    citations: [
      {
        source:
          "Manning Marable, Malcolm X: A Life of Reinvention (Viking, 2011)",
      },
    ],
  },
  {
    id: "suez-crisis",
    kind: "event",
    lane: "world",
    name: "Suez Crisis",
    arabic: "أزمة السويس",
    start: { year: 1956, precision: "year" },
    importance: 2,
    region: "egypt-north-africa",
    location: { name: "Suez", lat: 29.97, lng: 32.55 },
    summary:
      "Egypt's nationalization of the Suez Canal and the failed British, French, and Israeli intervention, the moment the old colonial powers' grip on the region was seen to break.",
    relations: [{ type: "related", target: "suez-canal" }],
    citations: [
      {
        source:
          "Keith Kyle, Suez: Britain's End of Empire in the Middle East (I.B. Tauris, 2003)",
      },
    ],
  },
  {
    id: "arab-spring",
    kind: "event",
    lane: "world",
    name: "The Arab uprisings of 2011",
    arabic: "ثورات الربيع العربي",
    start: { year: 2011, precision: "year" },
    importance: 2,
    region: "egypt-north-africa",
    location: { name: "Cairo (Tahrir Square)", lat: 30.04, lng: 31.24 },
    summary:
      "The wave of popular uprisings across the Arab world, whose hopes, upheavals, and long aftermath are still unfolding and are the subject of intense and contested debate.",
    citations: [
      { source: "Marc Lynch, The Arab Uprising (PublicAffairs, 2012)" },
    ],
  },
];

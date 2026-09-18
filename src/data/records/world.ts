/**
 * Wider world context, states and events that help users see global
 * simultaneity. Rendered in the muted outermost lane.
 */
import type { TimelineRecord } from "@/lib/types";

export const worldRecords: TimelineRecord[] = [
  {
    id: "sasanian-empire",
    kind: "empire",
    lane: "world",
    name: "Sasanian Empire",
    arabic: "الإمبراطورية الساسانية",
    start: { year: 224, precision: "year" },
    end: {
      year: 651,
      precision: "year",
      note: "Yazdegerd III killed near Merv, 651.",
    },
    importance: 4,
    region: "iraq-iran",
    location: { name: "Ctesiphon", lat: 33.09, lng: 44.58 },
    summary:
      "Persia's last pre-Islamic empire, Rome's great rival for four centuries, whose sudden collapse before the Muslim armies (Qādisiyya, Nihāvand) handed Islam the whole Iranian world.",
    relations: [
      { type: "related", target: "battle-of-qadisiyya" },
      { type: "related", target: "battle-of-nihavand" },
    ],
    citations: [
      { source: "Touraj Daryaee, Sasanian Persia (I.B. Tauris, 2009)" },
    ],
  },
  {
    id: "byzantine-empire",
    kind: "empire",
    lane: "world",
    name: "Byzantine Empire",
    arabic: "الإمبراطورية البيزنطية",
    start: {
      year: 330,
      precision: "year",
      note: "Dedication of Constantinople; the 'Byzantine' label is a modern convention for the East Roman state.",
    },
    end: { year: 1453, precision: "exact", month: 5, day: 29 },
    importance: 4,
    region: "anatolia-balkans",
    location: { name: "Constantinople (Istanbul)", lat: 41.01, lng: 28.98 },
    summary:
      "The East Roman Empire: the Muslim world's neighbor, rival, and trading partner for eight centuries, losing Syria and Egypt in the 630s, Anatolia after 1071, and its capital, at last, in 1453.",
    relations: [
      { type: "related", target: "battle-of-yarmuk" },
      { type: "related", target: "battle-of-manzikert" },
      { type: "related", target: "conquest-of-constantinople" },
    ],
    citations: [
      {
        source:
          "Judith Herrin, Byzantium: The Surprising Life of a Medieval Empire (Princeton, 2007)",
      },
    ],
  },
  {
    id: "tang-dynasty",
    kind: "empire",
    lane: "world",
    name: "Tang dynasty (China)",
    arabic: "أسرة تانغ",
    start: { year: 618, precision: "year" },
    end: { year: 907, precision: "year" },
    importance: 3,
    region: "europe-world",
    location: { name: "Chang'an (Xi'an)", lat: 34.34, lng: 108.94 },
    summary:
      "China's cosmopolitan golden age, exactly contemporary with the rise of Islam, connected to the caliphate by the Silk Road, one battle (Talas, 751), and resident Muslim merchant communities in Canton.",
    relations: [{ type: "related", target: "battle-of-talas" }],
    citations: [
      {
        source:
          "Mark Edward Lewis, China's Cosmopolitan Empire: The Tang Dynasty (Harvard UP, 2009)",
      },
    ],
  },
  {
    id: "charlemagne-coronation",
    kind: "event",
    lane: "world",
    name: "Coronation of Charlemagne",
    arabic: "تتويج شارلمان",
    start: { year: 800, month: 12, day: 25, precision: "exact" },
    importance: 3,
    region: "europe-world",
    location: { name: "Rome", lat: 41.9, lng: 12.5 },
    summary:
      'A "Roman emperor" crowned in the West while Hārūn al-Rashīd ruled in Baghdad, the two courts exchanged embassies and, famously, an elephant named Abū al-ʿAbbās.',
    relations: [
      {
        type: "related",
        target: "abbasid-caliphate",
        note: "embassies with Hārūn al-Rashīd",
      },
    ],
    citations: [
      {
        source:
          "Rosamond McKitterick, Charlemagne: The Formation of a European Identity (Cambridge, 2008)",
      },
    ],
  },
  {
    id: "volga-bulgars-islam",
    kind: "event",
    lane: "world",
    name: "Volga Bulgars adopt Islam; Ibn Faḍlān's embassy",
    arabic: "إسلام بلغار الفولغا وسفارة ابن فضلان",
    start: {
      year: 922,
      precision: "year",
      hijri: { year: 310, source: "attested" },
    },
    importance: 2,
    region: "europe-world",
    location: { name: "Bolghar (Volga)", lat: 54.98, lng: 49.03 },
    summary:
      "An Abbasid embassy reached the Volga king who had embraced Islam, Ibn Faḍlān's eyewitness account (including his famous description of the Rus) shows Islam's reach into the far north a millennium ago.",
    citations: [
      {
        source:
          "James E. Montgomery (tr.), Ibn Faḍlān, Mission to the Volga (NYU/LAL, 2017)",
      },
    ],
  },
  {
    id: "first-crusade",
    kind: "event",
    lane: "world",
    name: "First Crusade",
    arabic: "الحملة الصليبية الأولى",
    start: {
      year: 1095,
      precision: "year",
      hijri: { year: 488, source: "attested" },
    },
    end: {
      year: 1099,
      precision: "year",
      hijri: { year: 492, source: "attested" },
    },
    importance: 4,
    region: "europe-world",
    location: { name: "Antioch", lat: 36.2, lng: 36.16 },
    summary:
      "Launched at Clermont into a Seljuk world fractured by succession wars, it carved Latin states along the Levant coast, beginning two centuries of Crusader presence answered finally by Zangī, Nūr al-Dīn, Saladin, and the Mamluks.",
    relations: [
      { type: "related", target: "crusader-jerusalem-1099" },
      { type: "related", target: "great-seljuks" },
    ],
    citations: [
      {
        source:
          "Carole Hillenbrand, The Crusades: Islamic Perspectives (Edinburgh UP, 1999)",
      },
    ],
  },
  {
    id: "maimonides",
    kind: "person",
    lane: "world",
    name: "Maimonides (Mūsā ibn Maymūn)",
    arabic: "موسى بن ميمون",
    start: { year: 1138, precision: "year" },
    end: { year: 1204, precision: "year" },
    importance: 3,
    region: "egypt-north-africa",
    location: { name: "Cairo", lat: 30.04, lng: 31.24 },
    summary:
      "The greatest medieval Jewish philosopher and jurist, born in Almohad Córdoba, physician to Saladin's court in Cairo, writing his philosophy in Arabic: a reminder that the Islamicate world was intellectually plural.",
    relations: [
      { type: "related", target: "ayyubids", note: "court physician in Cairo" },
    ],
    citations: [
      {
        source:
          "Joel L. Kraemer, Maimonides: The Life and World of One of Civilization's Greatest Minds (Doubleday, 2008)",
      },
    ],
  },
  {
    id: "genghis-khan",
    kind: "person",
    lane: "world",
    name: "Genghis Khan",
    arabic: "جنكيز خان",
    start: {
      year: 1162,
      precision: "circa",
      note: "Birth year debated: 1155, 1162, or 1167.",
    },
    end: { year: 1227, precision: "year" },
    importance: 4,
    region: "europe-world",
    location: { name: "Karakorum", lat: 47.2, lng: 102.85 },
    summary:
      "Founder of the Mongol Empire, whose 1219–1224 campaign annihilated Khwārazm, Bukhara and Samarkand burned within a lifetime's memory of Ibn Taymiyya's birth; his heirs would take Baghdad itself.",
    relations: [{ type: "founded", target: "mongol-empire" }],
    citations: [
      {
        source:
          "Peter Jackson, The Mongols and the Islamic World (Yale UP, 2017)",
      },
    ],
  },
  {
    id: "mongol-empire",
    kind: "empire",
    lane: "world",
    name: "Mongol Empire",
    arabic: "إمبراطورية المغول",
    start: { year: 1206, precision: "year" },
    end: {
      year: 1368,
      precision: "year",
      note: "United rule effectively ended by the 1260s succession wars; 1368 marks the Yuan collapse.",
    },
    importance: 4,
    region: "europe-world",
    location: { name: "Karakorum", lat: 47.2, lng: 102.85 },
    summary:
      "The largest contiguous land empire in history. For Islam it brought catastrophe (Baghdad, 1258), then, within two generations, Muslim Mongol khanates from the Volga to Iran, and a road on which travelers like Ibn Baṭṭūṭa moved with unprecedented ease.",
    relations: [
      { type: "related", target: "sack-of-baghdad" },
      { type: "related", target: "ilkhanate" },
      { type: "related", target: "golden-horde" },
    ],
    citations: [
      {
        source:
          "Peter Jackson, The Mongols and the Islamic World (Yale UP, 2017)",
      },
    ],
  },
  {
    id: "black-death",
    kind: "event",
    lane: "world",
    name: "The Black Death",
    arabic: "الطاعون الأسود",
    start: {
      year: 1347,
      precision: "year",
      hijri: { year: 748, source: "attested" },
    },
    end: { year: 1351, precision: "year" },
    importance: 4,
    region: "europe-world",
    location: { name: "Damascus", lat: 33.51, lng: 36.29 },
    summary:
      'The plague killed perhaps a third of the population from China to Morocco, Cairo and Damascus suffered with Florence and Paris. Ibn Khaldūn, who lost both parents to it in Tunis, wrote that it "devastated nations and caused populations to vanish".',
    relations: [
      {
        type: "related",
        target: "ibn-khaldun",
        note: "orphaned by the plague; wrote about it",
      },
    ],
    citations: [
      {
        source:
          "Michael W. Dols, The Black Death in the Middle East (Princeton, 1977)",
      },
    ],
  },
  {
    id: "ming-dynasty",
    kind: "empire",
    lane: "world",
    name: "Ming dynasty (China)",
    arabic: "أسرة مينغ",
    start: { year: 1368, precision: "year" },
    end: { year: 1644, precision: "year" },
    importance: 2,
    region: "europe-world",
    location: { name: "Beijing", lat: 39.9, lng: 116.4 },
    summary:
      "China after the Mongols, sender of Zheng He's fleets into the Muslim Indian Ocean, and contemporary of the entire Timurid, early Ottoman, Safavid, and Mughal story.",
    relations: [{ type: "related", target: "zheng-he-voyages" }],
    citations: [
      {
        source:
          "Timothy Brook, The Troubled Empire: China in the Yuan and Ming Dynasties (Harvard UP, 2010)",
      },
    ],
  },
  {
    id: "gutenberg-press",
    kind: "event",
    lane: "world",
    name: "Gutenberg's printing press",
    arabic: "مطبعة غوتنبرغ",
    start: {
      year: 1450,
      precision: "circa",
      note: "The 42-line Bible printed c. 1455.",
    },
    importance: 4,
    region: "europe-world",
    location: { name: "Mainz", lat: 50.0, lng: 8.27 },
    summary:
      "Movable type in Mainz, three years before Constantinople fell, Europe's information revolution began just as Ottoman power peaked; Arabic-script Muslim printing waited until 1727 (Istanbul).",
    relations: [{ type: "related", target: "muteferrika-press" }],
    citations: [
      {
        source:
          "Elizabeth Eisenstein, The Printing Revolution in Early Modern Europe (Cambridge, 1983)",
      },
    ],
  },
  {
    id: "columbus-1492",
    kind: "event",
    lane: "world",
    name: "Columbus reaches the Americas",
    arabic: "وصول كولومبوس إلى الأمريكتين",
    start: { year: 1492, month: 10, day: 12, precision: "exact" },
    importance: 4,
    region: "europe-world",
    location: { name: "Palos de la Frontera", lat: 37.23, lng: -6.89 },
    summary:
      "Sailing months after Granada's fall, funded by its conquerors, Columbus opened the Atlantic world, beginning the shift of global trade away from the Muslim-held overland routes.",
    relations: [
      {
        type: "related",
        target: "fall-of-granada",
        note: "same year, same royal patrons",
      },
    ],
    citations: [
      { source: "Felipe Fernández-Armesto, Columbus (Oxford, 1991)" },
    ],
  },
  {
    id: "reformation",
    kind: "event",
    lane: "world",
    name: "Protestant Reformation begins",
    arabic: "بداية الإصلاح البروتستانتي",
    start: { year: 1517, precision: "year" },
    importance: 3,
    region: "europe-world",
    location: { name: "Wittenberg", lat: 51.87, lng: 12.65 },
    summary:
      "Luther's theses in the same year Selim I took Cairo: Christendom fractured just as the Ottomans united the central Islamic lands, the two events repeatedly intertwined in 16th-century politics.",
    relations: [
      {
        type: "related",
        target: "ottoman-conquest-of-egypt",
        note: "the same year, 1517",
      },
    ],
    citations: [
      {
        source:
          "Diarmaid MacCulloch, Reformation: Europe's House Divided (Allen Lane, 2003)",
      },
    ],
  },
  {
    id: "scientific-revolution",
    kind: "event",
    lane: "world",
    name: "Scientific Revolution",
    arabic: "الثورة العلمية",
    start: {
      year: 1543,
      precision: "year",
      note: "Conventional start: Copernicus's De revolutionibus.",
    },
    end: {
      year: 1687,
      precision: "year",
      note: "Conventional end: Newton's Principia.",
    },
    importance: 3,
    region: "europe-world",
    location: {
      name: "European universities",
      lat: 48.0,
      lng: 8.0,
      approximate: true,
    },
    summary:
      "Copernicus to Newton, built in part on translated Arabic science (Ibn al-Haytham's optics, Ṭūsī's and Ibn al-Shāṭir's astronomy), even as new instruments carried Europe past its teachers.",
    relations: [
      { type: "related", target: "ibn-al-haytham" },
      { type: "related", target: "ibn-al-shatir" },
    ],
    citations: [
      {
        source:
          "George Saliba, Islamic Science and the Making of the European Renaissance (MIT, 2007)",
      },
    ],
  },
  {
    id: "east-india-company",
    kind: "event",
    lane: "world",
    name: "English East India Company chartered",
    arabic: "تأسيس شركة الهند الشرقية",
    start: { year: 1600, month: 12, day: 31, precision: "exact" },
    importance: 3,
    region: "europe-world",
    location: { name: "London", lat: 51.51, lng: -0.13 },
    summary:
      "A merchants' charter that grew into the instrument of empire in Mughal India, trader, then tax-collector (1765), then ruler, until the Crown took over in 1858.",
    relations: [
      { type: "related", target: "battle-of-plassey" },
      { type: "related", target: "mughal-empire" },
    ],
    citations: [
      { source: "Philip J. Stern, The Company-State (Oxford, 2011)" },
    ],
  },
  {
    id: "french-revolution",
    kind: "event",
    lane: "world",
    name: "French Revolution",
    arabic: "الثورة الفرنسية",
    start: { year: 1789, precision: "year" },
    importance: 3,
    region: "europe-world",
    location: { name: "Paris", lat: 48.86, lng: 2.35 },
    summary:
      "The political earthquake whose armies reached Cairo within a decade (1798) and whose vocabulary, constitution, citizenship, nation, framed every later Ottoman and Arab reform debate.",
    relations: [{ type: "related", target: "napoleon-in-egypt" }],
    citations: [
      {
        source:
          "William Doyle, The Oxford History of the French Revolution (Oxford, 1989)",
      },
    ],
  },
  {
    id: "industrial-revolution",
    kind: "event",
    lane: "world",
    name: "Industrial Revolution",
    arabic: "الثورة الصناعية",
    start: { year: 1760, precision: "circa" },
    end: { year: 1840, precision: "circa" },
    importance: 3,
    region: "europe-world",
    location: { name: "Manchester", lat: 53.48, lng: -2.24 },
    summary:
      "Steam, factories, and railways gave Europe an unanswerable material edge in the very decades Ottoman, Qajar, and Mughal power waned, the backdrop to the entire colonial era on this timeline.",
    citations: [
      {
        source:
          "E.J. Hobsbawm, The Age of Revolution 1789–1848 (Weidenfeld & Nicolson, 1962)",
      },
    ],
  },
  {
    id: "berlin-conference",
    kind: "event",
    lane: "world",
    name: "Berlin Conference; the Scramble for Africa",
    arabic: "مؤتمر برلين وتقسيم أفريقيا",
    start: { year: 1884, precision: "year" },
    end: { year: 1885, precision: "year" },
    importance: 3,
    region: "europe-world",
    location: { name: "Berlin", lat: 52.52, lng: 13.4 },
    summary:
      "European powers set the rules for partitioning Africa, within two decades Sokoto, Bornu, and the Saharan and Swahili sultanates had all fallen to colonial conquest.",
    relations: [
      {
        type: "related",
        target: "sokoto-caliphate",
        note: "conquered by Britain, 1903",
      },
    ],
    citations: [
      {
        source:
          "Thomas Pakenham, The Scramble for Africa (Weidenfeld & Nicolson, 1991)",
      },
    ],
  },
  {
    id: "world-war-one",
    kind: "event",
    lane: "world",
    name: "First World War",
    arabic: "الحرب العالمية الأولى",
    start: {
      year: 1914,
      precision: "year",
      hijri: { year: 1332, source: "attested" },
    },
    end: {
      year: 1918,
      precision: "year",
      hijri: { year: 1337, source: "attested" },
    },
    importance: 4,
    region: "europe-world",
    location: { name: "Gallipoli", lat: 40.24, lng: 26.28 },
    summary:
      "The Ottoman Empire's final war: Gallipoli, the Arab Revolt, and defeat, followed by partition of its Arab provinces under British and French mandates and, in 1924, the end of the caliphate.",
    relations: [
      { type: "related", target: "ottoman-empire" },
      { type: "related", target: "post-ottoman-partition" },
    ],
    citations: [
      { source: "Eugene Rogan, The Fall of the Ottomans (Basic Books, 2015)" },
    ],
  },
  {
    id: "post-ottoman-partition",
    kind: "event",
    lane: "world",
    name: "Post-Ottoman partition & mandates",
    arabic: "تقسيم المشرق والانتدابات",
    start: {
      year: 1916,
      precision: "year",
      note: "Sykes–Picot agreement 1916; mandates formalized 1920–1923.",
    },
    end: { year: 1923, precision: "year" },
    importance: 3,
    region: "levant",
    location: { name: "Damascus", lat: 33.51, lng: 36.29 },
    summary:
      "Secret wartime agreements and postwar mandates drew the modern borders of the Levant and Iraq under British and French control, decisions whose consequences still structure the region's politics.",
    relations: [{ type: "related", target: "world-war-one" }],
    citations: [
      { source: "Eugene Rogan, The Fall of the Ottomans (Basic Books, 2015)" },
      { source: "David Fromkin, A Peace to End All Peace (Henry Holt, 1989)" },
    ],
  },
  {
    id: "moon-landing",
    kind: "event",
    lane: "world",
    name: "Apollo 11 Moon landing",
    arabic: "الهبوط على القمر",
    start: { year: 1969, month: 7, day: 20, precision: "exact" },
    importance: 2,
    region: "europe-world",
    location: { name: "Cape Canaveral", lat: 28.4, lng: -80.6 },
    summary:
      "A marker for orientation near the top of the timeline: the same year, Muslim states founded the Organisation of Islamic Cooperation after the al-Aqṣā arson.",
    relations: [
      { type: "related", target: "oic-founded", note: "the same year" },
    ],
    citations: [{ source: "NASA, Apollo 11 Mission Report (1969)" }],
  },
  {
    id: "world-wide-web",
    kind: "event",
    lane: "world",
    name: "The World Wide Web goes public",
    arabic: "الشبكة العنكبوتية العالمية",
    start: { year: 1991, precision: "year" },
    importance: 2,
    region: "europe-world",
    location: { name: "CERN, Geneva", lat: 46.23, lng: 6.05 },
    summary:
      "The medium you are using now, which has redistributed Islamic learning (manuscripts, fatwas, lectures) more radically than anything since paper reached Baghdad.",
    relations: [
      {
        type: "related",
        target: "paper-in-islamic-world",
        note: "this timeline's earlier information revolution",
      },
    ],
    citations: [{ source: "Tim Berners-Lee, Weaving the Web (Harper, 1999)" }],
  },
];

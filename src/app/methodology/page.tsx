import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

const DESCRIPTION =
  "Dating conventions, uncertainty handling, map policy, editorial principles, and bibliography.";

export const metadata: Metadata = {
  title: "Methodology & sources, The Islamic Timeline",
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/methodology/` },
  openGraph: {
    title: "Methodology & sources, The Islamic Timeline",
    description: DESCRIPTION,
    url: `${SITE_URL}/methodology/`,
    images: [`${SITE_URL}/og.png`],
    type: "article",
  },
};

const BIBLIOGRAPHY = [
  "Encyclopaedia of Islam, 2nd & 3rd editions (Brill), the default reference for biographical entries.",
  "al-Dhahabī, Siyar aʿlām al-nubalāʾ, primary biographical dates for scholars.",
  "Ibn Kathīr, al-Bidāya wa-l-Nihāya; Ibn Rajab, al-Dhayl ʿalā Ṭabaqāt al-Ḥanābila, Mamluk-era scholars.",
  "Ibn Hishām, al-Sīra al-Nabawiyya; al-Ṭabarī, Tārīkh al-rusul wa-l-mulūk, the Prophetic era and early caliphate.",
  "W. Montgomery Watt, Muhammad at Mecca / Muhammad at Medina (Oxford UP).",
  "C.E. Bosworth, The New Islamic Dynasties (Edinburgh UP, 1996), dynastic dates.",
  "Hugh Kennedy, The Prophet and the Age of the Caliphates; The Great Arab Conquests; Muslim Spain and Portugal; An Historical Atlas of Islam, 2nd ed. (Brill, 2002).",
  "Marshall Hodgson, The Venture of Islam (Chicago UP, 1974).",
  "Jonathan Brown, The Canonization of al-Bukhārī and Muslim (Brill, 2007).",
  "Dimitri Gutas, Greek Thought, Arabic Culture (Routledge, 1998).",
  "George Makdisi, The Rise of Colleges (Edinburgh UP, 1981).",
  "George Saliba, Islamic Science and the Making of the European Renaissance (MIT, 2007).",
  "Carole Hillenbrand, The Crusades: Islamic Perspectives (Edinburgh UP, 1999).",
  "Peter Jackson, The Mongols and the Islamic World (Yale UP, 2017); The Delhi Sultanate (Cambridge, 1999).",
  "Amira K. Bennison, The Almoravid and Almohad Empires (Edinburgh UP, 2016).",
  "Steven Runciman, The Fall of Constantinople 1453 (Cambridge, 1965).",
  "Colin Imber, The Ottoman Empire, 1300–1650 (Palgrave, 2002); Caroline Finkel, Osman's Dream (2005).",
  "Roger Savory, Iran under the Safavids (Cambridge, 1980).",
  "John F. Richards, The Mughal Empire (Cambridge, 1993).",
  "Nehemia Levtzion, Ancient Ghana and Mali (1973); Levtzion & Pouwels (eds.), The History of Islam in Africa (Ohio UP, 2000).",
  "John O. Hunwick, Timbuktu and the Songhay Empire (Brill, 1999).",
  "M.C. Ricklefs, A History of Modern Indonesia since c. 1200 (Palgrave, 4th ed. 2008); Peter Riddell, Islam and the Malay-Indonesian World (Hurst, 2001).",
  "Ross E. Dunn, The Adventures of Ibn Battuta (California UP, 1986).",
  "Natural Earth (public domain) via the world-atlas package, coastline data for the atlas.",
  "A. Ourednik et al., Historical Basemaps (github.com/aourednik/historical-basemaps, GPL-3.0), political border keyframes used in the atlas, simplified for display.",
  "Ibn Kathīr, Qiṣaṣ al-anbiyāʾ, traditional narratives of the prophets عليهم السلام.",
  "Brannon Wheeler, Prophets in the Quran: An Introduction to the Quran and Muslim Exegesis (Continuum, 2002).",
];

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-8">
      <h2
        className="font-display mb-2 text-[20px] font-semibold"
        style={{ color: "var(--ink)" }}
      >
        {title}
      </h2>
      <div
        className="space-y-3 text-[14px] leading-relaxed"
        style={{ color: "var(--ink-soft)" }}
      >
        {children}
      </div>
    </section>
  );
}

export default function Methodology() {
  return (
    <main className="mx-auto max-w-[760px] px-5 py-10">
      <a href="../" className="btn mb-6 inline-flex">
        ← Back to the timeline
      </a>
      <h1
        className="font-display text-[30px] font-semibold leading-tight"
        style={{ color: "var(--ink)" }}
      >
        Methodology &amp; sources
      </h1>
      <p
        className="font-arabic mt-1 text-[18px]"
        dir="rtl"
        lang="ar"
        style={{ color: "var(--ink-soft)" }}
      >
        المنهجية والمصادر
      </p>
      <p
        className="mb-8 mt-3 text-[14px] leading-relaxed"
        style={{ color: "var(--ink-soft)" }}
      >
        This site is a visual instrument for understanding chronology, distance,
        overlap, and simultaneity, across Islamic history. It is a demonstration
        dataset built for that purpose, not an encyclopedia. Its guiding rule is
        transparency: every record carries its sources, and nothing uncertain is
        displayed as if it were exact.
      </p>

      <Section title="Dates and calendars">
        <p>
          Each record stores a Common Era (Gregorian/Julian-proleptic by
          convention of the cited references) year and, where the sources record
          one, an <em>attested</em> Hijri year, typical for scholars&apos; death
          dates, which the biographical tradition preserved in AH. Attested
          pairs are shown plainly: <em>1258 CE · 656 AH</em>.
        </p>
        <p>
          When no attested Hijri date exists, the site computes one from the{" "}
          <em>tabular (civil) Islamic calendar</em> and always labels it:{" "}
          <em>≈ 641 AH (calc.)</em>. Tabular conversion can differ from
          historically observed months by a day or two, and by ±1 year at year
          boundaries; it is an orientation aid, not a claim. Events before the
          Hijra (622 CE) receive no calculated AH value at all. The conversion
          code is unit-tested against attested pairs (Badr 2 AH/624,
          Baghdad&apos;s founding 145 AH/762, Constantinople 857 AH/1453, and
          others).
        </p>
        <p>
          Precision is explicit in the data model: <em>exact</em> (attested to
          the day or month), <em>year</em>, <em>circa</em>, <em>range</em>, and{" "}
          <em>disputed</em> (with the alternative years listed). The interface
          renders these differently, “c.”, dashed outlines, hollow end-caps, ≈
          marks, and notes in the detail panel, so approximation is always
          visible.
        </p>
      </Section>

      <Section title="The prophets عليهم السلام and deep time">
        <p>
          The line now reaches back past 570 CE to Ādam عليه السلام. This
          demanded a special honesty device, because Islamic tradition preserves
          the <em>order</em> of the prophets, not their dates. Below the Islamic
          era the line therefore passes through three clearly-marked bands.
          First, late antiquity and the era of ʿĪsā عليه السلام, where ordinary
          scholarly dating exists (ʿĪsā c. 4 BCE – c. 30 CE; the end marks the{" "}
          <em>rafʿ</em>, in Islamic belief he was not killed but raised up, Q
          4:157–158). Second, a band of <em>traditional dating</em>:
          conventional associations only (Mūsā with 13th-century-BCE Egypt,
          Dāwūd and Sulaymān with the 10th century BCE, Ibrāhīm with the early
          second millennium), every one flagged &quot;disputed,&quot; because
          none is historically established. Third, an <em>ordinal band</em> for
          Ādam, Idrīs, Nūḥ, Hūd, and Ṣāliḥ عليهم السلام: here the spacing is
          explicitly not to scale, no year is ever displayed, computed
          comparisons are disabled, and the interface says only what tradition
          says, who came before whom. Their positions in the data are layout
          slots, never dates.
        </p>
        <p>
          Sources for this section are the Qurʾan (cited by sūra and āya on each
          record), Ibn Kathīr&apos;s Qiṣaṣ al-anbiyāʾ, the first volume of
          al-Ṭabarī&apos;s Tārīkh, and modern reference works. All prophets are
          treated with reverence, no depictions are used, and nothing about them
          is invented, including chronology.
        </p>
      </Section>

      <Section title="The vertical scale">
        <p>
          Today sits at the top; scrolling down travels into the past. Across
          the whole Islamic era the scale is spatially honest, a century
          occupies the same height wherever it falls at a given zoom level. One
          clearly hatched band at the bottom compresses late antiquity (200–500
          CE) so pre-Islamic context stays reachable without pretending to share
          the scale; it is labeled as compressed wherever it appears.
        </p>
      </Section>

      <Section title="Prominence (importance) scaling">
        <p>
          Markers are sized by an editorial 1–5 estimate of historical
          influence, how widely a person, book, state, or event is referenced
          and how much it shaped what followed. It controls{" "}
          <em>display prominence only</em>: which markers appear first while
          zooming out and how large they draw. It is not a theological ranking,
          an endorsement, or a verdict; al-Nawawī renders larger than a
          contemporary scholar because of eight centuries of citation, not as a
          judgment between them.
        </p>
      </Section>

      <Section title="The atlas: sourced borders, honestly labeled">
        <p>
          Political borders are drawn from <em>Historical Basemaps</em> (A.
          Ourednik and contributors, GPL-3.0), an openly licensed scholarly
          compilation of world political geometry at year keyframes. The atlas
          loads the keyframe nearest the year you are viewing and says so on its
          face (&quot;borders c. 1200&quot;). Muslim-ruled states are colored
          (and, where they match a timeline record, clickable); other powers
          render in quiet grey. Cities, battle sites (flagged when the location
          is uncertain), trade routes, and figures&apos; journeys are plotted
          from this site&apos;s own dataset. The land outline is Natural Earth
          (public domain).
        </p>
        <p>
          Two honesty notes. First, pre-modern frontiers were zones, not lines:
          the source project itself describes its geometry as world-scale
          approximation, and we simplify it further for the inset scale, treat
          every line as &quot;roughly here,&quot; never as a survey. Second,
          entity names and extents are the dataset&apos;s editorial choices at
          each snapshot; between keyframes (they run roughly a century apart
          before 1800) the map does not interpolate. The timeline records, not
          the map, carry this site&apos;s dated claims.
        </p>
      </Section>

      <Section title="Editorial principles">
        <p>
          The Prophet Muḥammad ﷺ, the prophets, the Companions, and sacred
          matters are treated with respect; the site contains no depictions of
          prophets and uses abstract markers for all persons. Disputed
          political, theological, and sectarian topics are described in neutral,
          factual language, and controversy is noted rather than adjudicated
          (e.g., Karbala, Ibn ʿArabī&apos;s reception, modern movements). No
          historical state is presented as representing all Muslims. Arabic
          names are given in scholarly-lite transliteration with the Arabic
          script alongside; the search accepts plain spellings.
        </p>
        <p>
          Modern coverage (20th–21st centuries) is intentionally sparse: the
          instrument&apos;s purpose is deep time, and recent history is better
          served elsewhere. The dataset aims for breadth across regions, West
          Africa, the Swahili coast, Central and Southeast Asia stand beside the
          central lands, while remaining a curated demonstration rather than a
          census.
        </p>
      </Section>

      <Section title="How comparisons are generated">
        <p>
          Every sentence like “Imam al-Bukhārī died roughly 393 years before Ibn
          Taymiyya was born” is computed at runtime from the structured dates,
          never hand-written, so it stays consistent with the data and inherits
          its uncertainty (the word <em>roughly</em> appears whenever an
          approximate date is involved).
        </p>
      </Section>

      <Section title="Bibliography">
        <ul className="list-disc space-y-1.5 pl-5">
          {BIBLIOGRAPHY.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
        <p>
          Per-record citations appear in each detail panel. Corrections are
          welcome, see the README for how records are structured and how to
          amend them.
        </p>
      </Section>

      <Section title="Supporting this project">
        <p>
          The Islamic Timeline is free, open, and ad-free. If it benefits you,
          you can support Amine Hamlouchi&apos;s work via{" "}
          <a
            className="underline decoration-dotted"
            href="https://cash.app/$IbnHamlouchi"
            target="_blank"
            rel="noreferrer"
          >
            Cash App ($IbnHamlouchi)
          </a>{" "}
          or through{" "}
          <a
            className="underline decoration-dotted"
            href="https://aminehamlouchi.com/links/"
            target="_blank"
            rel="noreferrer"
          >
            his link hub
          </a>{" "}
          (Patreon, PayPal, and more). Support keeps the site ad-free.
        </p>
      </Section>

      <footer
        className="mt-10 border-t pt-4 text-[12px]"
        style={{ borderColor: "var(--rule)", color: "var(--ink-faint)" }}
      >
        The Islamic Timeline, a demonstration of chronological visualization
        with historical integrity. Code MIT; coastline data public domain
        (Natural Earth).
      </footer>
    </main>
  );
}

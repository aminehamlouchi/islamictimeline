# Changelog

Data changes are logged here so any claim on the site can be audited against
the commit that introduced it. Code changes are summarized; the git history is
the full record.

## 2026-09-19, council session

Eight changes chosen by a review council of six seats (a student of knowledge, a teacher, a senior engineer, an accessibility advocate, a product strategist and a skeptic), peer-ranked anonymously, synthesized by a chairman and checked by a fresh-eyes validator. The full verdict, dissent and open questions are kept with the project notes.

### Data

- `conquest-of-jerusalem-637` (Surrender of Jerusalem): `start.precision`
  changed from `circa` to `disputed`. The record already listed 638 as an
  alternative year and its note reads "637 or 638 CE", which is the definition
  of `disputed` in `src/lib/types.ts`. The years, the Hijri year and both
  citations (Kennedy, The Great Arab Conquests; EI2 s.v. al-Ḳuds) are
  unchanged. A new case in `data-integrity.test.ts` requires `disputed` on any
  date that carries `altYears`.
- The 392 records the site launched with are frozen as ids in
  `src/data/baseline-ids.json`. `data-health.test.ts` fails if one of them
  stops resolving, and holds any record outside the list to two distinct
  citations and a line in this file.

### Site

- Two new buttons under a record's sources: **Copy citation** puts one line on
  the clipboard
  (name, dual dates with their precision, the site, the record's own page under
  `/r/<id>/`, the date of access) followed by the record's sources, and **Copy
  as text** copies the whole record: dates with alternatives, summary,
  connections, sources and both addresses. The formatters live in
  `src/lib/citation.ts` and are checked over every record by
  `src/lib/__tests__/citation.test.ts`; `e2e/cite.spec.ts` reads the clipboard
  back in Chromium.
- A **Report a problem** link under a record's sources opens a structured
  correction form with the record's id, name, displayed dates and address
  filled in, with an email fallback that carries the id in the subject.
- Suggestions and corrections now arrive as GitHub issue forms
  (`.github/ISSUE_TEMPLATE/suggest-record.yml` and `correct-record.yml`, every
  field required, each asking for sources). The in-app Suggest form
  pre-fills the suggestion form field by field; the email fallback to
  `aminehamlouchibusiness@gmail.com` is unchanged. Blank issues are off.
- Created the `suggestion` and `correction` labels on the repository; the old
  `labels=suggestion` parameter had been dropped by GitHub because no such
  label existed.
- Added `CONTRIBUTING.md`: which record file for which lane, the field
  checklist, the two-citation rule, the CHANGELOG line and the checks to run.
- The unit suite scans `src`, `e2e`, `scripts`, `.github`, `changelog.d` and
  the prose files at the root for the em dash (U+2014) and fails on a hit.
- CI fails the build if the instrument's page chunk passes 130 kB gzipped
  (`scripts/size-budget.mjs`; 110 kB when the budget was set), keeps the
  Playwright traces and screenshots of a failed run as a workflow artifact,
  prints Lighthouse mobile scores for `/` without gating on them, and runs a
  pull request in its own concurrency group instead of the deployment queue.
- Corrected public statements that no longer held. The methodology footer
  claimed an MIT license for the code; no license has been chosen, so the
  footer now says that and points to `NOTICE`. The vertical-scale section
  described a hatched band compressing 200 to 500 CE; the scale is one uniform
  ruler back to 3300 BCE with a single undated cap for the earliest prophets,
  and the section and the README now say so. The README no longer hard-codes a
  test or record count and lists `e2e/` outside `src/`. The Lighthouse line for
  2026-09-18 names the run and address behind its 92.
- Added `src/lib/__tests__/public-copy.test.ts`, which fails if any public
  file claims a code license while no `LICENSE` file exists at the root.
- **A keyboard path through the instrument.** Two skip links open the Tab
  order, one to the controls and one to the record index, and the header now
  precedes the canvas in the document so the controls come before several
  hundred markers. A hidden `Eras` landmark in the header carries one button
  per era that flies the view to its middle; it sits outside the instrument's
  `role="application"` so a screen reader in browse mode can reach it. The
  era rail answers to the keys its slider role promises (arrows, Page Up and
  Down, Home, End), one move per press, and reports its position as a year and
  era, for example `1257 CE, Abbasid era`. The canvas root takes focus and
  carries its instructions as a description. Space opens a cluster as Enter
  does. The `?` help button is on the phone bar, where the icon-only buttons
  now sit tighter so the bar's second row clears the year pill, and an `Index`
  link sits beside Methodology. Covered by `e2e/keyboard.spec.ts`.
- Search results are a real combobox: the input names the highlighted option
  through `aria-activedescendant`, each option is the clickable element itself
  (no button nested inside it), and a status line reports the number of
  results.
- Marker names read out the record's kind and, where the sources disagree on a
  date, the word "disputed": "Battle of al-Qādisiyya, 636 CE · 15 AH, Battle,
  disputed". The lens readout says the same while the pointer is over such a
  marker.
- On phones the first-visit introduction sits above the zoom control instead of
  over it (step four points at those presets). A tap or a click on the canvas
  dismisses it as Skip does; a drag or a pinch does not. The support card's
  75 s timer starts when the introduction closes, so it now starts at that tap
  as well; the interval is unchanged.
- The help sheet links to the Methodology page and the record index and opens
  the legend, so a phone has a route to all three.
- Every record has a static page at `/r/<id>/`: name, Arabic, dates in both
  calendars with their precision badges and alternatives, summary, location,
  nested events, connections linked to their own pages, sources, and one link
  that opens the instrument at that record. The text block lives in
  `src/components/RecordText.tsx` so the detail panel can adopt it later.
- Each record page carries schema.org JSON-LD (`Person`, `Book`, `Event`,
  `Organization`, or `Thing` for a movement) under one rule: a machine date is
  emitted only when the sources give it to the year or better and it falls
  from 1 CE on; circa, range, disputed, undated and BCE dates are written out in
  words in the description instead. Years below 1000 are zero-padded to ISO
  8601. No `sameAs` is emitted, since no citation carries a URL. Checked over all
  392 records by `src/lib/__tests__/jsonld.test.ts` and in both engines by
  `e2e/records.spec.ts`.
- A sitemap at `/sitemap.xml` lists every page. Crawlers read `robots.txt` only
  at the origin root, which this repository does not own, so the sitemap must be
  referenced from there or submitted by hand.
- The 404 page is the site's own, with a link home.
- CI prints the size of the export and the record page count after the build.
- Added `/records/`, a static index of all 392 records by era and lane, the
  text alternative to the canvas. It is plain HTML with no script of its own:
  every name links into the instrument at that record (`/?sel=<id>`), every era
  section is a permalink such as `/records/#abbasid`, and a print stylesheet
  sets it in black ink without underlines. A row carries the name, the Arabic
  name, the kind, and the dual-calendar dates with their precision and any
  alternative years; importance, summaries and citations stay in the record
  view. The five undated earliest prophets are listed in traditional order with
  no year. Lane labels moved into `src/lib/labels.ts` beside the kind labels.
  Covered by `e2e/index.spec.ts`.
- **Small text clears 4.5:1 in both themes.** `--ink-faint`, the token under
  captions, tick labels, era names and the "(calc.)" marks, moves from
  `#99907f` to `#68604f` on parchment and from `#7a7160` to `#948a77` in the
  dark, measured on every surface it is painted on: the page, the raised
  buttons, the sunken atlas ground and the translucent panels (4.79:1 at the
  tightest pair in the light, 4.93:1 in the dark; 2.43:1 and 3.49:1 before).
  On parchment the faint tier now sits a shade darker than `--ink-soft`; the
  floor on the sunken ground leaves no room between them, so the two tiers are
  told apart by size, as the record pages already do. The lines that shared
  the token keep their old value under a new name, `--rule-faint`: the hatch
  patterns, the band boundary, the cluster ring, the coastline and the button
  and chip hover borders look as they did. Text set in brand gold (the
  support, compare and suggest buttons, the year pill and readout, a record's
  dates, the introduction's step counter, the help sheet's keys, the origin
  cap, the AH marks and the lens readout) now uses `--gold-ink`, the same gold
  darkened for text (5.99:1 on parchment where `--gold` measured 3.28:1); gold
  still fills markers, borders, the atlas and the two legend glyphs that
  explain the sirah line and the books lane. `--slate` (4.12:1 in the light)
  is left for a separate decision. `src/lib/__tests__/tokens-contrast.test.ts`
  parses `globals.css`, prints each text token against each surface it sits
  on in both themes and fails under 4.5:1; it also fails if the three dark
  blocks disagree, if a hairline borrows the text token, or if a text color in
  `src/components` is set to `var(--gold)`.

## 2026-09-19

### Site

- Moved to `https://aminehamlouchi.com/islamictimeline/` and renamed the
  repository to `islamictimeline` to match. The old `/timeline/` address forwards
  every path and query string to the new one, so shared views still open.
- No data changes.

## 2026-09-18

### Data

No records were added, removed, or edited. The dataset is unchanged at **392
records, all 392 carrying at least one citation** (verified by
`src/lib/__tests__/data-health.test.ts`, which prints the counts in CI).

### Site

- Moved the canonical home to `https://aminehamlouchi.com/islamictimeline/`. Canonical,
  `og:url`, `og:image`, and favicon URLs are now absolute on that host, built
  from `NEXT_PUBLIC_SITE_URL`. The previous default pointed at a preview host.
- Published from source by GitHub Actions on every push to `main`, replacing a
  hand-committed build.
- Moved the Support panel's link hub to its canonical URL
  `https://aminehamlouchi.com/links/`.
- Added a `NOTICE` file for third-party map data and font licenses.

### Fixed

- **Positional drift on scroll and zoom.** Markers slid off their dates while
  zooming and snapped back at intervals. Column packing is memoized across a
  band of zoom and was handing back absolute pixels computed at whichever zoom
  filled the memo, while the viewport offset used the current zoom. The layout
  now stores years and the renderer converts them with the scale of the frame it
  is painting; the packing itself runs at the band's own scale, so it cannot
  depend on where inside the band the zoom happened to be. Covered by
  `src/lib/__tests__/layout-drift.test.ts` and `e2e/drift.spec.ts`.
- **Shared links did not reproduce their view.** The URL carried the centre year
  to a tenth of a year, which at the closest zoom is about 19 px of error. Links
  now carry enough precision to reopen pixel-identical; older, coarser links
  still parse (`src/lib/__tests__/url-compat.test.ts`).
- **Escape did not close a dialog while a field had focus**, so the suggest form
  and the search palette trapped the key.
- **A synthetic or already-released pointer could abort a gesture** through an
  unguarded `setPointerCapture`.
- **Every visit after the day of the build logged a console error.** Today's
  date was rendered into the static HTML at build time, so a visitor on any
  later calendar day saw a date the document did not claim, which React reports
  as a hydration mismatch. The date is now read from the visitor's clock.

### Performance and accessibility

- Gold that carries text is darkened to clear 4.5:1 in both themes; the brand
  gold is unchanged where it fills a marker. Zoom presets meet the 24 px target
  size. The page is pinch-zoomable again, since the canvas already claims pinch
  through `touch-action`.
- Fonts moved off the critical path, the stylesheet travels inside the document,
  the atlas loads on demand, and the markers mount in stages.
- Lighthouse mobile on the live site went from Performance 74 and Accessibility
  84 to a median of 92 and a steady 100, with Best Practices and SEO at 100.
  The 92 is the median measured on 2026-09-18 against
  `https://aminehamlouchi.com/timeline/`, the live address that day; a later
  median of seven runs at `https://aminehamlouchi.com/islamictimeline/` scored
  96.

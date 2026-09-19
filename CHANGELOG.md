# Changelog

Data changes are logged here so any claim on the site can be audited against
the commit that introduced it. Code changes are summarized; the git history is
the full record.

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

# The Islamic Timeline · الخطّ الزمني للتاريخ الإسلامي

An interactive **historical instrument**: a vertical, zoomable timeline of Islamic history where **today sits at the top** and scrolling down travels back through fourteen centuries of scholars, books, empires, battles, sciences, and the wider world, on one spatially honest scale, with dual Hijri/Gregorian dating, a synchronized schematic atlas, comparison tools, and per-record citations.

## Run it

Requires Node.js 18.18+ (20+ recommended).

```bash
npm install
npm run dev        # → http://localhost:3000
```

Production build (fully static, hostable on any static server or CDN):

```bash
npm run build      # outputs ./out
npx serve out      # or upload ./out anywhere
```

Quality gates:

```bash
npm test           # vitest: calendar math, scale, overlaps, URL state, data integrity
npm run typecheck  # tsc --noEmit
npm run lint       # eslint
```

## Using the instrument

| Interaction | Effect |
| --- | --- |
| scroll / drag / ↓↑ | travel through time (Shift = faster) |
| ⌘-scroll / pinch / `+` `−` / double-click | zoom around the cursor (Millennium → Century → Decade → Year → Detail) |
| hover near the line | the lens: nearby decades magnify, quieter records reveal |
| click any marker | focused view: nested timeline, teachers/students/works, computed contemporaries, sources |
| `⌘K` or `/` | search (names, aliases, Arabic, `1258`, `656 AH`, `13th century`) |
| `m` `c` `l` `f` `?` | atlas · compare · legend · filters · help |
| `Home` / `0` | return to today |

Every view is a **shareable URL** (date, zoom, selection, comparison tray, filters, atlas state). Bookmarks (★) persist locally.

## Project shape

```
src/
  lib/            types, calendar math (tabular Hijri, labeled), time scale,
                  overlap/gap engine, layout packing, search, URL state, store
  lib/__tests__/  unit tests: calendar math, scale, overlaps, URL state,
                  dataset integrity, and layout drift
  data/records/   the historical dataset (see below)
  data/geo/       cities, schematic extents, trade routes, generated coastline
  components/     TimelineCanvas (the instrument), DetailPanel, Compare,
                  MapPanel, Chrome, Overlays
  app/            Next.js App Router pages (/, /methodology, /records,
                  /r/<id> for every record, sitemap)
e2e/              Playwright: path independence and interaction smoke
scripts/          generate-land.mjs (Natural Earth to SVG), screenshots.mjs, serve-out.mjs
```

Stack: **Next.js 15 · TypeScript · Tailwind 4 · zustand**. No runtime services: the dataset is typed TS modules behind a small repository layer (`src/lib/data.ts`), so swapping in a database/CMS later means changing one file.

## Adding historical records

Records live in `src/data/records/*.ts` and conform to `TimelineRecord` (`src/lib/types.ts`). A minimal person:

```ts
{
  id: "al-bukhari",                 // kebab-case, unique
  kind: "person",                   // person|book|empire|battle|event|institution|movement|place
  lane: "scholars",                 // which parallel lane renders it
  name: "Imam al-Bukhārī",
  arabic: "الإمام البخاري",
  aliases: ["Bukhari"],             // plain spellings for search
  start: { year: 810, precision: "year", hijri: { year: 194, source: "attested" } },
  end:   { year: 870, precision: "year", hijri: { year: 256, source: "attested" } },
  importance: 5,                    // 1–5 display prominence (editorial, not endorsement)
  region: "central-asia",
  location: { name: "Bukhara", lat: 39.77, lng: 64.42 },
  summary: "One or three sentences, neutral in tone.",
  relations: [{ type: "wrote", target: "sahih-al-bukhari" }],
  citations: [{ source: "Encyclopaedia of Islam, 2nd ed. (Brill)", detail: 's.v. "al-Bukhārī"' }],
  details: [ /* optional nested-timeline events */ ],
}
```

House rules (enforced by `data-integrity.test.ts` where possible):

- **Never present an approximate date as exact.** Use `precision: "circa" | "range" | "disputed"` (+ `altYears`, `note`).
- **Hijri years**: include `hijri: { year, source: "attested" }` only when the sources record it; otherwise omit it and the UI computes a *labeled* tabular approximation. No AH before 622 CE.
- **Every record needs ≥1 real citation.** Prefer standard academic references; never invent sources or URLs.
- Living people / continuing institutions: `ongoing: true` instead of `end`.
- Relations are one-directional in data; inverses (teacher↔student, wrote↔written-by) resolve automatically.
- Register new ids in `src/data/records/index.ts` if you add a file. Run `npm test`.

Map data: add cities in `data/geo/cities.ts`; approximate state extents (schematic ellipses per period window) in `data/geo/extents.ts`. These are deliberately *not* borders (see `/methodology`). Regenerate the coastline with `npm run generate:land` (output committed).

## What's demonstrated vs. future extensions

**Working end-to-end:** the zoomable instrument with lens; importance scaling; nested timelines; relations; comparison tray/view with computed overlap-gap sentences; generated contextual observations; synchronized schematic atlas with playback slider, routes, and figure journeys; search incl. Hijri years; lane/region/prominence filters; legend; onboarding; light/dark/auto themes; shareable URLs; bookmarks; keyboard + reduced-motion + screen-reader labels; a unit suite whose data-health test prints the current record and citation counts on every run; sourced records across all major regions and periods.

**Deliberate foundations for later:** sourced boundary polygons can replace the schematic extents through the same `StateExtent` interface; the dataset is a curated demonstration (deep coverage invites a CMS); nested timelines currently plot each record's `details` list (richer per-empire ruler chains welcome); below 3300 BCE the earliest prophets occupy one fixed-height undated cap, labeled not to scale, because tradition preserves their order and not their dates.

## Integrity, in one line

Uncertainty is displayed, sources are cited, comparisons are computed from structured dates. See **/methodology** in the app for the full policy and bibliography.

Code license: see `LICENSE` if present; not yet chosen. Coastline: Natural Earth (public domain) via `world-atlas`. Third-party notices: see `NOTICE`.

## Deployment

The site is built and published by GitHub Actions on every push to `main`
(`.github/workflows/deploy.yml`) and served at
<https://aminehamlouchi.com/islamictimeline/>.

```bash
NEXT_PUBLIC_BASE_PATH=/islamictimeline \
NEXT_PUBLIC_SITE_URL=https://aminehamlouchi.com/islamictimeline \
npm run build
node scripts/serve-out.mjs   # http://127.0.0.1:4321/islamictimeline/
npx playwright test          # path independence + interaction smoke
```

## Why positions never drift

Column packing is expensive, so it is memoized across a band of zoom. Anything
it returned in pixels would be stale the moment the zoom moved inside that
band, which is what made markers slide off their dates. So the layout stores
*years* and the renderer converts them with the scale of the frame it is
painting (`resolveLayout` in `src/lib/layout.ts`), and the packing itself runs
at the band's own scale (`packingPpy`) so it cannot depend on where inside the
band you happened to be. `e2e/drift.spec.ts` drives random gesture sequences and
demands that every marker land where a cold load of the same URL puts it.

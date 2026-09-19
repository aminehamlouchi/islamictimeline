# Contributing

The Islamic Timeline is a dataset first and an instrument second. The most
useful contribution is a record with dates and sources a reader can check. This
page says where a record goes, what it must carry, and which checks it has to
pass before it is merged.

## Where a record goes

Records live in `src/data/records/`. Pick the file by lane.

| Lane | File |
| --- | --- |
| `sirah` | `prophets.ts` for the prophets before Muhammad ﷺ; `sirah.ts` for the Prophet and the first community |
| `companions` | `companions.ts` |
| `scholars` | `scholars-early.ts` to the 4th century AH; `scholars-classical.ts` for the 5th to the 10th; `scholars-later.ts` from the 10th on; `schools.ts` for schools of law, creeds, branches and orders |
| `books` | `books.ts` |
| `states` | `states.ts` |
| `battles` | `battles.ts` |
| `science`, `culture` | `science-culture.ts` |
| `world` | `world.ts` for states and events since late antiquity; `world-extra.ts` for the ancient world |

`additions.ts` and `movements-regional.ts` hold earlier gap-filling passes
across several lanes. New records go in the lane's own file. A new file must be
registered in `src/data/records/index.ts`.

## What a record carries

The shape is `TimelineRecord` in `src/lib/types.ts`, and the README shows a
minimal person. Check each field before opening a pull request.

- `id`: kebab-case, unique, and permanent once published, because it is the URL.
- `kind`, `lane`, `region`: from the lists in `src/lib/types.ts`.
- `name` and `arabic`: the transliterated name and the Arabic. `aliases` holds plain spellings a search might use.
- `start` and `end`: with a `precision` that matches the evidence. `year` when the year is solid; `circa` for an approximation; `range` with `endYear`; `disputed` with `altYears` and a `note` when the sources disagree. Never present an approximate date as exact.
- `hijri`: only when the sources record the AH year, as `{ year, source: "attested" }`. Otherwise omit it and the site computes a labelled approximation. No AH year before 622 CE.
- People and continuing institutions: an `end`, or `ongoing: true`.
- `importance`: 1 to 5, display prominence on the instrument. It is an editorial weight, not a ranking of merit.
- `summary`: one to three sentences, neutral in tone, with no theological or fiqh judgment and no sectarian framing.
- `citations`: see the next section.
- `relations`: one direction only. The site resolves the inverse (teacher and student, book and author).

## Two citations

Every record that is added or changed needs at least two citations, and they
must be distinct references: two works, or two entries in one work. Prefer
standard references (the Encyclopaedia of Islam, Britannica, a monograph from a
university press) or a primary source with an exact reference (a biographical
dictionary with its entry, the Qur'an by sura and verse). Never invent a source
or a URL. Cross-check the dates against those references before they go in.

The 392 records the site launched with are listed in
`src/data/baseline-ids.json`. Each carries at least one citation and may be
edited. None may be removed. Any id outside that list is held to the
two-citation rule by `src/lib/__tests__/data-health.test.ts`.

## The CHANGELOG line

Every data change is logged in `CHANGELOG.md` under the day's `Data` heading,
with the record id and what changed, so a reader can audit any claim against
the commit that introduced it. A record added without a CHANGELOG line fails
the tests.

## Before opening a pull request

```bash
npm test
npm run typecheck
npm run lint
```

`npm test` prints the record and citation counts. It fails on a missing
citation, an impossible span, a Hijri year that disagrees with its Gregorian
pair beyond tolerance, a duplicate id, an AH date before the hijra, an
alternative year on a date not marked `disputed`, or an em dash anywhere in the
repository. Fix what it names rather than loosening the test.

The full pipeline, with the production build, the size budget and the
Playwright suites, runs in `.github/workflows/deploy.yml` on every pull
request.

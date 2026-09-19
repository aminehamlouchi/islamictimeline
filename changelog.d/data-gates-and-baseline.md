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

- Added `CONTRIBUTING.md`: which record file for which lane, the field
  checklist, the two-citation rule, the CHANGELOG line and the checks to run.
- The unit suite scans `src`, `e2e`, `scripts`, `.github`, `changelog.d` and
  the prose files at the root for the em dash (U+2014) and fails on a hit.
- CI fails the build if the instrument's page chunk passes 130 kB gzipped
  (`scripts/size-budget.mjs`; 110 kB when the budget was set), keeps the
  Playwright traces and screenshots of a failed run as a workflow artifact,
  prints Lighthouse mobile scores for `/` without gating on them, and runs a
  pull request in its own concurrency group instead of the deployment queue.

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

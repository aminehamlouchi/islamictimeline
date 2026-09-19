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

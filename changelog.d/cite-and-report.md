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

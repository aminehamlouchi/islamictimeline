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

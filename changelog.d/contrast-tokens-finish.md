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

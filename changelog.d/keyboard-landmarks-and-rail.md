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

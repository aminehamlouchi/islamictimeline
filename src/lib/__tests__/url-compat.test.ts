/**
 * Backward compatibility for shared links.
 *
 * Every query string below was produced by the version of the site that shipped
 * on 2026-07-06 and may be sitting in someone's bookmarks or a group chat. They
 * must keep resolving to the same view.
 */

import { describe, expect, it } from "vitest";
import { parseState, serializeState } from "../urlState";

const LEGACY: [string, Record<string, unknown>][] = [
  ["y=1258.0&z=2.60", { centerYear: 1258, ppy: 2.6 }],
  ["y=656.0&z=11.0&sel=al-bukhari", { centerYear: 656, ppy: 11, selectedId: "al-bukhari" }],
  [
    "y=1258.0&z=46.0&sel=ibn-taymiyya&cmp=al-ghazali,ibn-rushd&cv=1",
    {
      centerYear: 1258,
      ppy: 46,
      selectedId: "ibn-taymiyya",
      compareIds: ["al-ghazali", "ibn-rushd"],
      compareOpen: true,
    },
  ],
  ["y=1400.0&z=0.620&map=1&mf=0&my=1258", { centerYear: 1400, ppy: 0.62, mapOpen: true, mapFollow: false, mapYear: 1258 }],
  ["y=900.0&z=2.60&xl=world,battles&imp=3", { centerYear: 900, ppy: 2.6, lanesOff: ["world", "battles"], minImportance: 3 }],
  ["y=-1000.0&z=0.340&rg=maghrib,andalus&th=dark", { centerYear: -1000, ppy: 0.34, regionsOn: ["maghrib", "andalus"], theme: "dark" }],
  ["y=2026.0&z=190", { centerYear: 2026, ppy: 190 }],
];

describe("old shared URLs still parse", () => {
  for (const [query, expected] of LEGACY) {
    it(`parses ?${query}`, () => {
      expect(parseState(query)).toMatchObject(expected);
    });
  }

  it("round-trips a parsed legacy URL without losing state", () => {
    for (const [query] of LEGACY) {
      const once = parseState(query);
      expect(parseState(serializeState(once))).toEqual(once);
    }
  });

  it("ignores unknown and malformed parameters instead of throwing", () => {
    const junk = parseState("y=abc&z=-4&xl=not-a-lane&imp=99&future=1");
    expect(junk.centerYear).toBeUndefined();
    expect(junk.ppy).toBeUndefined();
    expect(junk.minImportance).toBeUndefined();
    expect(junk.lanesOff).toEqual([]);
    expect(parseState("")).toEqual({});
  });
});

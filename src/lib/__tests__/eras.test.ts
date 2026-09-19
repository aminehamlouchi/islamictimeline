import { describe, expect, it } from "vitest";
import { ERAS, eraForYear } from "../eras";
import { allRecords } from "@/data/records";

describe("eraForYear", () => {
  it("keeps the undated earliest prophets with the first era, not the last", () => {
    expect(eraForYear(-4200).id).toBe(ERAS[0].id);
    expect(eraForYear(ERAS[0].startYear - 1).id).toBe(ERAS[0].id);
  });
  it("puts years past today in the last era", () => {
    expect(eraForYear(9999).id).toBe(ERAS[ERAS.length - 1].id);
  });
  it("never files a pre-Islamic record under the contemporary era", () => {
    const last = ERAS[ERAS.length - 1];
    for (const r of allRecords)
      if (r.start.year < 0) expect(eraForYear(r.start.year).id).not.toBe(last.id);
  });
});

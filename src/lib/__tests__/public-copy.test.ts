/**
 * Guards the public copy against a license claim the repository does not make.
 * NOTICE says no license has been chosen for the original code and dataset,
 * and the methodology footer once said "Code MIT" regardless. Until a LICENSE
 * file exists at the repository root, no public file may claim one. The match
 * is "Code <license>", never the bare license name, because the bibliography
 * cites MIT Press.
 */

import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../..",
);

const PUBLIC_FILES = [
  "src/app/methodology/page.tsx",
  "README.md",
  "NOTICE",
  "CHANGELOG.md",
];

const LICENSE_CLAIM = /Code (MIT|Apache|GPL|BSD|ISC|MPL|CC)/;

const hasLicenseFile = ["LICENSE", "LICENSE.md", "LICENSE.txt"].some((f) =>
  existsSync(path.join(ROOT, f)),
);

describe("public copy", () => {
  it.skipIf(hasLicenseFile)(
    "claims no code license while no LICENSE file exists",
    () => {
      const claims: string[] = [];
      for (const rel of PUBLIC_FILES) {
        const lines = readFileSync(path.join(ROOT, rel), "utf8").split("\n");
        lines.forEach((line, i) => {
          if (line.includes("Code MIT") || LICENSE_CLAIM.test(line)) {
            claims.push(`${rel}:${i + 1}: ${line.trim()}`);
          }
        });
      }
      expect(claims, "license claims with no LICENSE file at the root").toEqual(
        [],
      );
    },
  );
});

/**
 * House style: no em dash (U+2014) anywhere a reader or a contributor will see
 * one. Commas, colons and full stops do that work. The scan walks the source,
 * the suites, the scripts, the workflows and issue forms, the pending changelog
 * entries and the prose files at the root, and names the file and line of every
 * hit. The character is built from its code point below so this file passes
 * its own scan.
 */

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { basename, extname, join, relative, resolve } from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = resolve(__dirname, "../../..");
const SCANNED = [
  "src",
  "e2e",
  "scripts",
  ".github",
  "changelog.d",
  "README.md",
  "CHANGELOG.md",
  "NOTICE",
  "CONTRIBUTING.md",
];
const TEXT = new Set([
  "",
  ".cjs",
  ".css",
  ".html",
  ".js",
  ".json",
  ".md",
  ".mjs",
  ".svg",
  ".ts",
  ".tsx",
  ".txt",
  ".yaml",
  ".yml",
]);
const EM_DASH = String.fromCharCode(0x2014);

function walk(path: string): string[] {
  if (statSync(path).isDirectory())
    return readdirSync(path).flatMap((name) => walk(join(path, name)));
  if (basename(path).startsWith(".")) return [];
  return TEXT.has(extname(path)) ? [path] : [];
}

describe("house style", () => {
  it("has no em dash in any scanned file", () => {
    const files = SCANNED.filter((p) => existsSync(join(ROOT, p))).flatMap((p) =>
      walk(join(ROOT, p)),
    );
    expect(files.length).toBeGreaterThan(50);

    const hits: string[] = [];
    for (const file of files) {
      const lines = readFileSync(file, "utf8").split("\n");
      lines.forEach((line, i) => {
        if (line.includes(EM_DASH)) hits.push(`${relative(ROOT, file)}:${i + 1}`);
      });
    }

    console.log(`em dash scan: ${files.length} files, ${hits.length} hits`);
    if (hits.length)
      console.error(hits.map((h) => `  em dash (U+2014) at ${h}`).join("\n"));
    expect(hits).toEqual([]);
  });
});

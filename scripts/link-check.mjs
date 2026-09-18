/**
 * Every internal href in the export must resolve to something the server can
 * actually return. Fails the build on the first broken one.
 */
import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join, resolve } from "node:path";

const OUT = resolve("out");
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)],
  );
}

const pages = walk(OUT).filter((f) => f.endsWith(".html"));
const broken = [];
let checked = 0;

for (const page of pages) {
  const html = readFileSync(page, "utf8");
  for (const m of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const raw = m[1];
    if (!raw.startsWith("/")) continue; // external or in-page
    if (BASE && !raw.startsWith(`${BASE}/`)) {
      broken.push(`${page}: ${raw} (outside basePath ${BASE})`);
      continue;
    }
    const rel = raw.slice(BASE.length).split(/[?#]/)[0];
    const target = join(OUT, rel);
    checked++;
    const ok =
      existsSync(target) &&
      (statSync(target).isFile() || existsSync(join(target, "index.html")));
    if (!ok) broken.push(`${page}: ${raw}`);
  }
}

console.log(`link check: ${checked} internal links across ${pages.length} pages`);
if (broken.length) {
  console.error(`broken internal links (${broken.length}):`);
  for (const b of broken) console.error(`  ${b}`);
  process.exit(1);
}
console.log("0 broken internal links");

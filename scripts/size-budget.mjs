/**
 * The instrument's own bundle must stay under budget. Reads the root page chunk
 * of the static export, out/_next/static/chunks/app/page-*.js, gzips it the
 * way GitHub Pages serves it, and fails when the total passes 130 kB. It was
 * 110 kB (110295 bytes) on the day the budget was set.
 *
 * The glob is deliberately narrow. The record pages under /r/<id>/ and the
 * index under /records/ emit their own chunks under app/r/[id]/ and
 * app/records/, and those are not the instrument. Widening the glob would
 * measure a different thing, and the number here would stop meaning anything.
 */
import { readdirSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { gzipSync } from "node:zlib";

const BUDGET_BYTES = 130_000;
const DIR = resolve("out/_next/static/chunks/app");
const kb = (n) => `${(n / 1000).toFixed(1)} kB`;

let files;
try {
  files = readdirSync(DIR).filter((f) => /^page-[^/]+\.js$/.test(f));
} catch {
  console.error(`size budget: ${DIR} is missing; run the production build first`);
  process.exit(1);
}
if (files.length === 0) {
  console.error(`size budget: no page-*.js chunk in ${DIR}`);
  process.exit(1);
}

let total = 0;
for (const f of files) {
  const raw = readFileSync(join(DIR, f));
  const gz = gzipSync(raw).length;
  total += gz;
  console.log(`  ${f}: ${kb(raw.length)} raw, ${kb(gz)} gzip (${gz} bytes)`);
}
console.log(
  `size budget: ${kb(total)} gzip of ${kb(BUDGET_BYTES)} for the instrument's page chunk`,
);
if (total > BUDGET_BYTES) {
  console.error(`size budget: over by ${kb(total - BUDGET_BYTES)}`);
  process.exit(1);
}

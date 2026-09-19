/**
 * Text tokens against the surfaces they are painted on, at 4.5:1 (WCAG 1.4.3).
 *
 * The values are read from src/app/globals.css, not copied here, so what the
 * test measures is what ships. The map below is explicit and small: a token is
 * checked only on the surfaces it actually sits on, and each entry says where.
 * The table is printed the way data-health.test.ts prints its counts, so the
 * numbers are visible in CI.
 *
 * Two decisions from the 2026-09-19 council session are encoded here. --slate
 * (4.12:1 on the light page) is printed but not gated; darkening it is a
 * separate visual decision. The legend glyphs that explain the sirah line and
 * the books lane stay in --gold because they must match the marker paint, so
 * they are held to the 3:1 of a graphic (WCAG 1.4.11), not the 4.5:1 of text.
 */

import { readFileSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = resolve(__dirname, "../../..");
const CSS = readFileSync(join(ROOT, "src/app/globals.css"), "utf8");

type Rgb = [number, number, number];
type Tokens = Record<string, string>;

/* ------------------------------ parsing ------------------------------- */

/** The declarations of the first block whose selector line is exactly `sel`. */
function block(sel: string): Tokens {
  const start = CSS.indexOf(`\n${sel} {`);
  if (start < 0) throw new Error(`no block for ${sel} in globals.css`);
  let i = CSS.indexOf("{", start) + 1;
  let depth = 1;
  const from = i;
  for (; i < CSS.length && depth > 0; i++) {
    if (CSS[i] === "{") depth++;
    else if (CSS[i] === "}") depth--;
  }
  const body = CSS.slice(from, i - 1).replace(/\/\*[\s\S]*?\*\//g, "");
  const out: Tokens = {};
  for (const m of body.matchAll(/--([\w-]+):\s*([^;]+);/g)) out[m[1]] = m[2].trim();
  return out;
}

/** Inside `@media (prefers-color-scheme: dark)`, the auto-dark block. */
function mediaDarkBlock(): Tokens {
  const at = CSS.indexOf("@media (prefers-color-scheme: dark)");
  if (at < 0) throw new Error("no dark media query in globals.css");
  const sel = ':root:not([data-theme="light"])';
  const start = CSS.indexOf(`${sel} {`, at);
  const from = CSS.indexOf("{", start) + 1;
  const to = CSS.indexOf("}", from);
  const out: Tokens = {};
  for (const m of CSS.slice(from, to).matchAll(/--([\w-]+):\s*([^;]+);/g))
    out[m[1]] = m[2].trim();
  return out;
}

function hex(v: string): Rgb {
  const m = /^#([0-9a-f]{6})$/i.exec(v);
  if (!m) throw new Error(`not a six-digit hex color: ${v}`);
  const n = parseInt(m[1], 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/** rgba(r, g, b, a) composited over an opaque surface. */
function rgbaOver(v: string, under: Rgb): Rgb {
  const m = /^rgba?\(\s*(\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\s*\)$/.exec(v);
  if (!m) throw new Error(`not an rgb(a) color: ${v}`);
  const a = m[4] === undefined ? 1 : Number(m[4]);
  const top: Rgb = [Number(m[1]), Number(m[2]), Number(m[3])];
  return top.map((c, i) => Math.round(c * a + under[i] * (1 - a))) as Rgb;
}

/* ------------------------------ contrast ------------------------------ */

function luminance([r, g, b]: Rgb): number {
  const lin = (c: number) => {
    const s = c / 255;
    return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

function contrast(a: Rgb, b: Rgb): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

const toHex = (c: Rgb) =>
  "#" + c.map((v) => v.toString(16).padStart(2, "0")).join("");

/* ------------------------------ the map ------------------------------- */

type SurfaceId = "bg" | "bg-raised" | "bg-sunken" | "panel";

/** Every opaque ground that text is painted on, and how it is derived. */
function surfaces(t: Tokens): Record<SurfaceId, Rgb> {
  const bg = hex(t.bg);
  return {
    // the page and the canvas; era bands over it are tinted at 10% and 2.5%
    bg,
    // .btn, .chip, the lens readout box, the cluster ring, the coastline fill
    "bg-raised": hex(t["bg-raised"]),
    // .badge, a record's date note, the atlas ground, a quoted block
    "bg-sunken": hex(t["bg-sunken"]),
    // .panel is translucent; what the eye sees is --panel over --bg
    panel: rgbaOver(t.panel, bg),
  };
}

const ALL: SurfaceId[] = ["bg", "bg-raised", "bg-sunken", "panel"];

/** Text tokens, the surfaces they sit on, and the floor each must clear. */
const TEXT: { token: string; on: SurfaceId[]; floor: number; where: string }[] = [
  {
    token: "ink",
    on: ALL,
    floor: 4.5,
    where: "body text, headings, marker names, the index",
  },
  {
    token: "ink-soft",
    on: ALL,
    floor: 4.5,
    where: ".chip and .badge, panel prose, the date note box, the record pages",
  },
  {
    token: "ink-faint",
    on: ALL,
    floor: 4.5,
    where:
      "era names and tick labels on the canvas, captions in every panel, the " +
      "atlas notes over the sunken map ground, the (calc.) marks",
  },
  {
    token: "gold-ink",
    on: ALL,
    floor: 4.5,
    where:
      "the support, compare, suggest and return buttons, the year pill and " +
      "readout, a record's dates, the origin cap, AH marks, the lens readout",
  },
];

/** Printed for the record, not gated; see the header comment. */
const INFORMATIONAL: { token: string; on: SurfaceId[]; where: string }[] = [
  { token: "slate", on: ["bg", "panel"], where: "the Wider world lane" },
];

/** Graphics that carry meaning: held to 3:1, the non-text floor. */
const SWATCHES: { token: string; on: SurfaceId[]; floor: number; where: string }[] = [
  {
    token: "gold",
    on: ["bg", "panel"],
    floor: 3,
    where: "the sirah and books markers on the canvas, the legend glyphs that explain them",
  },
];

/* ------------------------------- tests -------------------------------- */

const light = block(":root");
const dark = block(".dark-tokens");

describe("tokens contrast", () => {
  it("defines the same dark values in all three dark blocks", () => {
    const forced = block(':root[data-theme="dark"]');
    const auto = mediaDarkBlock();
    const problems: string[] = [];
    for (const name of Object.keys(dark)) {
      if (forced[name] !== dark[name])
        problems.push(`--${name}: .dark-tokens ${dark[name]} vs [data-theme=dark] ${forced[name]}`);
      if (auto[name] !== dark[name])
        problems.push(`--${name}: .dark-tokens ${dark[name]} vs auto dark ${auto[name]}`);
    }
    console.log(
      `dark blocks: ${Object.keys(dark).length} tokens, ${problems.length} disagreements`,
    );
    if (problems.length) console.error(problems.map((p) => `  ${p}`).join("\n"));
    expect(problems).toEqual([]);
  });

  it("clears the floor for every text token on every surface it sits on, in both themes", () => {
    const rows: string[] = [];
    const failures: string[] = [];
    let pairs = 0;

    for (const [theme, t] of [
      ["light", light],
      ["dark", dark],
    ] as const) {
      const s = surfaces(t);
      const check = (
        kind: string,
        token: string,
        on: SurfaceId[],
        floor: number | null,
      ) => {
        const fg = hex(t[token]);
        for (const id of on) {
          const ratio = contrast(fg, s[id]);
          const ok = floor === null ? "info" : ratio >= floor ? "ok" : "LOW";
          rows.push(
            `  ${theme.padEnd(5)} ${kind.padEnd(6)} --${token.padEnd(9)} ${toHex(fg)} ` +
              `on ${id.padEnd(9)} ${toHex(s[id])}  ${ratio.toFixed(2).padStart(5)}:1` +
              (floor === null ? "" : `  (floor ${floor.toFixed(1)})`) +
              `  ${ok}`,
          );
          if (floor !== null) {
            pairs++;
            if (ratio < floor)
              failures.push(
                `${theme} --${token} ${toHex(fg)} on ${id} ${toHex(s[id])}: ${ratio.toFixed(2)}:1 < ${floor}:1`,
              );
          }
        }
      };
      for (const e of TEXT) check("text", e.token, e.on, e.floor);
      for (const e of SWATCHES) check("swatch", e.token, e.on, e.floor);
      for (const e of INFORMATIONAL) check("info", e.token, e.on, null);
    }

    console.log(
      `tokens contrast: ${TEXT.length} text tokens and ${SWATCHES.length} swatch ` +
        `on ${ALL.length} surfaces, 2 themes, ${pairs} gated pairs, ${failures.length} below the floor`,
    );
    console.log(rows.join("\n"));
    if (failures.length) console.error(failures.map((p) => `  ${p}`).join("\n"));
    expect(failures).toEqual([]);
  });

  it("keeps the hairlines on --rule-faint at the value --ink-faint had before", () => {
    // The identity's lines: hatch patterns, the band boundary, the cluster
    // ring, the coastline, and the button and chip hover borders. They were
    // painted with --ink-faint when it was this light; the text token moved
    // and the lines did not.
    expect(light["rule-faint"]).toBe("#99907f");
    expect(dark["rule-faint"]).toBe("#7a7160");
    expect(CSS).toMatch(/\.btn:hover \{\s*border-color: var\(--rule-faint\);/);
    expect(CSS).toMatch(/\.chip:hover \{\s*border-color: var\(--rule-faint\);/);

    const dir = join(ROOT, "src/components");
    const strokes: string[] = [];
    for (const name of readdirSync(dir)) {
      if (!name.endsWith(".tsx")) continue;
      const src = readFileSync(join(dir, name), "utf8");
      for (const m of src.matchAll(/stroke=["{]\s*"?var\(--ink-faint\)/g))
        strokes.push(`${name}: ${m[0]}`);
    }
    if (strokes.length) console.error(strokes.map((p) => `  ${p}`).join("\n"));
    expect(strokes).toEqual([]);
  });

  it("sets no text in src/components to var(--gold); the legend glyphs are the swatches", () => {
    // A text use is a `color:` in a style object, or a `fill:` in a style
    // object that also carries a fontSize (an SVG <text>). Marker paint uses
    // fill and stroke attributes, LANE_INFO feeds a background, and the two
    // legend glyphs (● and ❧) are swatches: the character after the style is
    // the glyph itself, and they are allowed and counted.
    const dir = join(ROOT, "src/components");
    const textUses: string[] = [];
    let swatches = 0;
    for (const name of readdirSync(dir)) {
      if (!name.endsWith(".tsx")) continue;
      const src = readFileSync(join(dir, name), "utf8");
      let at = -1;
      while ((at = src.indexOf('"var(--gold)"', at + 1)) >= 0) {
        const before = src.slice(0, at);
        const elementStart = before.lastIndexOf("<");
        const styleStart = before.lastIndexOf("style={{");
        if (styleStart < 0 || styleStart < elementStart) continue;
        const style = before.slice(styleStart);
        const isColor = /(^|[^A-Za-z])color:\s*(?:[^"{}]*\?\s*)?$/.test(style);
        const isTextFill = /fontSize/.test(style) && /(^|[^A-Za-z])fill:\s*$/.test(style);
        if (!isColor && !isTextFill) continue;
        const after = src.slice(at + '"var(--gold)"'.length, at + 40);
        if (/^\s*\}\}>\s*[●❧]/u.test(after)) {
          swatches++;
          continue;
        }
        const line = before.split("\n").length;
        textUses.push(`${name}:${line}: ${src.slice(styleStart, at + 13).replace(/\s+/g, " ")}`);
      }
    }
    console.log(
      `gold as text in src/components: ${textUses.length} uses, ${swatches} legend swatches`,
    );
    if (textUses.length) console.error(textUses.map((p) => `  ${p}`).join("\n"));
    expect(textUses).toEqual([]);
    expect(swatches).toBe(2);
  });

  it("never paints text with --today, which is the brand gold under another name", () => {
    const dir = resolve("src/components");
    const hits: string[] = [];
    for (const f of readdirSync(dir)) {
      if (!f.endsWith(".tsx")) continue;
      const src = readFileSync(join(dir, f), "utf8");
      for (const m of src.matchAll(/<text[^>]*?fill:\s*"var\(--today\)"/gs))
        hits.push(`${f}: ${m[0].slice(0, 60).replace(/\s+/g, " ")}`);
    }
    expect(hits).toEqual([]);
  });
});

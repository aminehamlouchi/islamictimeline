/**
 * Builds the atlas border layers from aourednik/historical-basemaps
 * (https://github.com/aourednik/historical-basemaps, GPL-3.0), year-keyframe
 * world political borders, clipped to this site's region, simplified, projected
 * to the map viewBox, and classified (Muslim-ruled vs other powers, plus links
 * to this site's records where the entity matches).
 *
 * Run: node scripts/generate-borders.mjs (output committed to src/data/geo/borders)
 * NOTE: these are world-scale approximations by that project's own description, * the site labels every layer as an approximate snapshot.
 */
import { mkdirSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

// Negative years use the dataset's world_bc{N} files (−1 = 1 BCE).
const YEARS = [
  -3000, -2000, -1500, -1000, -500, -200, -1, 100, 200, 300, 400, 500, 600, 700,
  800, 900, 1000, 1100, 1200, 1300, 1400, 1492, 1500, 1600, 1650, 1700, 1800,
  1880, 1900, 1914, 1920, 1938, 1945, 1960, 2010,
];

const LON_MIN = -20,
  LON_MAX = 115,
  LAT_MIN = -12,
  LAT_MAX = 62,
  W = 1000,
  H = 548;
const px = (lon) => +(((lon - LON_MIN) / (LON_MAX - LON_MIN)) * W).toFixed(1);
const py = (lat) => +(((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * H).toFixed(1);

/* ---------- classification: display flag + optional record link ---------- */
// Order matters: earlier rules win. m: 1 = Muslim-ruled (colored), 0 = other.
const RULES = [
  {
    re: /cuman|khazar|avar|gokturk|göktürk|uyghur khaganate|kara-khitai|qara khitai/i,
    m: 0,
  },
  { re: /mongol empire/i, m: 0, r: "mongol-empire" },
  { re: /byzantine/i, m: 0, r: "byzantine-empire" },
  { re: /sassanid|sasanian/i, m: 0, r: "sasanian-empire" },
  { re: /tang empire|tang china/i, m: 0, r: "tang-dynasty" },
  { re: /ming/i, m: 0, r: "ming-dynasty" },
  { re: /umayyad/i, m: 1, r: "umayyad-caliphate" },
  { re: /abbasid/i, m: 1, r: "abbasid-caliphate" },
  { re: /fatimid/i, m: 1, r: "fatimid-caliphate" },
  { re: /c[oó]rdoba|cordova|al-andalus/i, m: 1, r: "cordoba-umayyads" },
  { re: /ottoman/i, m: 1, r: "ottoman-empire" },
  { re: /safavid/i, m: 1, r: "safavid-empire" },
  { re: /mughal|moghul/i, m: 1, r: "mughal-empire" },
  { re: /mamluk|mameluk/i, m: 1, r: "mamluk-sultanate" },
  { re: /seljuk|seldjuk|saljuq/i, m: 1, r: "great-seljuks" },
  { re: /ayyubid/i, m: 1, r: "ayyubids" },
  { re: /almohad/i, m: 1, r: "almohads" },
  { re: /almoravid/i, m: 1, r: "almoravids" },
  { re: /idrisid/i, m: 1, r: "idrisids" },
  { re: /aghlabid/i, m: 1, r: "aghlabids" },
  { re: /tulunid/i, m: 1, r: "tulunids" },
  { re: /samanid/i, m: 1, r: "samanids" },
  { re: /buyid|buwayhid/i, m: 1, r: "buyids" },
  { re: /ghaznavid/i, m: 1, r: "ghaznavids" },
  { re: /qarakhanid|karakhanid/i, m: 1, r: "qarakhanids" },
  { re: /sultanate of delhi|delhi sultanate/i, m: 1, r: "delhi-sultanate" },
  { re: /ilkhan/i, m: 1, r: "ilkhanate" },
  { re: /golden horde/i, m: 1, r: "golden-horde" },
  { re: /timur/i, m: 1, r: "timurids" },
  { re: /granada|nasrid/i, m: 1, r: "nasrids" },
  { re: /marinid|merinid/i, m: 1, r: "marinids" },
  { re: /hafsid/i, m: 1, r: "hafsids" },
  { re: /\bmali\b/i, m: 1, r: "mali-empire" },
  { re: /songhai|songhay/i, m: 1, r: "songhai-empire" },
  { re: /sokoto/i, m: 1, r: "sokoto-caliphate" },
  { re: /kanem|bornu/i, m: 1, r: "kanem-bornu" },
  { re: /kilwa/i, m: 1, r: "kilwa-sultanate" },
  { re: /\badal\b/i, m: 1, r: "adal-sultanate" },
  { re: /aceh|atjeh/i, m: 1, r: "aceh-sultanate" },
  { re: /malacca|melaka/i, m: 1, r: "malacca-sultanate" },
  { re: /demak/i, m: 1, r: "demak-sultanate" },
  { re: /pasai/i, m: 1, r: "samudera-pasai" },
  { re: /bukhara|bokhara/i, m: 1, r: "khanate-of-bukhara" },
  // generic Muslim-polity vocabulary (display flag only, no record link)
  {
    re: /caliphate|sultanate|emirate|imamate|sharif|beylik|khedivate|khanate/i,
    m: 1,
  },
  {
    re: /khwarezm|khwarazm|ghurid|ghorid|rustamid|zirid|hammadid|zayyanid|wattasid|saadi|alaouite|hotak|durrani|afsharid|zand|qajar/i,
    m: 1,
  },
  {
    re: /morocco|tunisia|algiers|tripolitania|oman|yemen|hejaz|hedjaz|nejd|najd|saudi|funj|darfur|wadai|massina|toucouleur|futa|kazan|crimea|khiva|kokand|brunei|johor|mataram|banten|bantam|sulu|zanzibar|maldives|comoros/i,
    m: 1,
  },
];
const persiaRule = (name, year) =>
  /persia|iran/i.test(name) && year >= 700 ? { m: 1 } : null;
const arabiaRule = (name, year) =>
  /arabia|bedouin/i.test(name) && year >= 632 ? { m: 1 } : null;

function classify(name, year) {
  for (const rule of RULES)
    if (rule.re.test(name)) return { m: rule.m, r: rule.r ?? null };
  return persiaRule(name, year) ?? arabiaRule(name, year) ?? { m: 0, r: null };
}

/* --------------------- geometry: clip + simplify --------------------- */
function ringBox(ring) {
  let x0 = Infinity,
    y0 = Infinity,
    x1 = -Infinity,
    y1 = -Infinity;
  for (const [x, y] of ring) {
    if (x < x0) x0 = x;
    if (x > x1) x1 = x;
    if (y < y0) y0 = y;
    if (y > y1) y1 = y;
  }
  return [x0, y0, x1, y1];
}
const intersects = ([x0, y0, x1, y1]) =>
  x1 >= LON_MIN - 2 &&
  x0 <= LON_MAX + 2 &&
  y1 >= LAT_MIN - 2 &&
  y0 <= LAT_MAX + 2;

/** Douglas-Peucker in degrees. */
function simplify(ring, eps) {
  if (ring.length < 5) return ring;
  const keep = new Uint8Array(ring.length);
  keep[0] = keep[ring.length - 1] = 1;
  const stack = [[0, ring.length - 1]];
  while (stack.length) {
    const [a, b] = stack.pop();
    let maxD = 0,
      idx = -1;
    const [ax, ay] = ring[a],
      [bx, by] = ring[b];
    const dx = bx - ax,
      dy = by - ay;
    const len2 = dx * dx + dy * dy || 1e-12;
    for (let i = a + 1; i < b; i++) {
      const [x, y] = ring[i];
      const t = Math.max(
        0,
        Math.min(1, ((x - ax) * dx + (y - ay) * dy) / len2),
      );
      const ex = x - (ax + t * dx),
        ey = y - (ay + t * dy);
      const d = ex * ex + ey * ey;
      if (d > maxD) {
        maxD = d;
        idx = i;
      }
    }
    if (Math.sqrt(maxD) > eps && idx > 0) {
      keep[idx] = 1;
      stack.push([a, idx], [idx, b]);
    }
  }
  const out = [];
  for (let i = 0; i < ring.length; i++) if (keep[i]) out.push(ring[i]);
  return out;
}

function processFeature(f, year) {
  const name = f.properties?.NAME ?? f.properties?.name ?? "";
  if (!name) return null;
  const geom = f.geometry;
  if (!geom) return null;
  const polys =
    geom.type === "Polygon"
      ? [geom.coordinates]
      : geom.type === "MultiPolygon"
        ? geom.coordinates
        : [];
  const rings = [];
  for (const poly of polys) {
    const outer = poly[0];
    if (!outer || !intersects(ringBox(outer))) continue;
    for (const [k, ring] of poly.entries()) {
      const box = ringBox(ring);
      if ((box[2] - box[0]) * (box[3] - box[1]) < (k === 0 ? 0.25 : 1.5))
        continue; // drop specks & small holes
      const simp = simplify(ring, 0.12);
      if (simp.length < 4) continue;
      const pts = [];
      let last = null;
      for (const [lon, lat] of simp) {
        const p = [px(lon), py(lat)];
        if (
          !last ||
          Math.abs(p[0] - last[0]) > 0.7 ||
          Math.abs(p[1] - last[1]) > 0.7
        ) {
          pts.push(p);
          last = p;
        }
      }
      if (pts.length >= 4) rings.push(pts);
    }
  }
  if (rings.length === 0) return null;
  const cls = classify(name, year);
  return { n: name, m: cls.m, ...(cls.r ? { r: cls.r } : {}), p: rings };
}

/* ------------------------------- main ------------------------------- */
const __dirname = dirname(fileURLToPath(import.meta.url));
// JSON goes to public/ (lazy-fetched per keyframe at runtime, never bundled)
const outDir = join(__dirname, "../public/borders");
mkdirSync(outDir, { recursive: true });

let manifest = [];
for (const year of YEARS) {
  const fileName = year < 0 ? `world_bc${-year}` : `world_${year}`;
  const url = `https://raw.githubusercontent.com/aourednik/historical-basemaps/master/geojson/${fileName}.geojson`;
  const res = await fetch(url);
  if (!res.ok) {
    console.error(`FAILED ${year}: HTTP ${res.status}`);
    continue;
  }
  const gj = await res.json();
  const feats = [];
  for (const f of gj.features) {
    const out = processFeature(f, year);
    if (out) feats.push(out);
  }
  const payload = { y: year, s: feats };
  const file = `y${year}.json`;
  writeFileSync(join(outDir, file), JSON.stringify(payload));
  const kb = (JSON.stringify(payload).length / 1024).toFixed(0);
  manifest.push({ year, file, feats: feats.length, kb });
  console.log(`${fileName}: ${feats.length} entities, ${kb} KB`);
}

writeFileSync(
  join(__dirname, "../src/data/geo/borders-meta.ts"),
  `/**
 * GENERATED by scripts/generate-borders.mjs, do not edit by hand.
 * Political border keyframes derived from aourednik/historical-basemaps
 * (GPL-3.0), world-scale approximations, simplified and clipped; see the
 * Methodology page. Per-year JSON lives in public/borders/ and is lazy-loaded.
 */

export interface BorderEntity {
 /** entity name as given by the source dataset */
 n: string;
 /** 1 = Muslim-ruled (display flag, curated), 0 = other power */
 m: 0 | 1;
 /** optional link to a timeline record id */
 r?: string;
 /** polygon rings, pre-projected [x, y][] */
 p: [number, number][][];
}
export interface BorderYear {
 y: number;
 s: BorderEntity[];
}

export const BORDER_KEYFRAMES: number[] = [${manifest.map((m) => m.year).join(", ")}];

export function nearestBorderKeyframe(year: number): number {
 let best = BORDER_KEYFRAMES[0];
 for (const y of BORDER_KEYFRAMES) if (Math.abs(y - year) < Math.abs(best - year)) best = y;
 return best;
}

const cache = new Map<number, Promise<BorderYear>>();

/** Lazy-load a border keyframe from public/borders (cached). */
export function loadBorderYear(kf: number): Promise<BorderYear> {
 if (!cache.has(kf)) {
 const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
 cache.set(
 kf,
 fetch(\`\${base}/borders/y\${kf}.json\`).then((r) => {
 if (!r.ok) throw new Error(\`borders y\${kf}: HTTP \${r.status}\`);
 return r.json() as Promise<BorderYear>;
 }));
 }
 return cache.get(kf)!;
}
`,
);
console.log(
  `\nTotal: ${manifest.reduce((s, m) => s + +m.kb, 0)} KB across ${manifest.length} keyframes`,
);

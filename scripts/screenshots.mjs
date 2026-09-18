/**
 * Visual inspection harness: serves ./out and captures screenshots of the
 * major flows, printing any console/page errors.
 *
 * Usage: node scripts/screenshots.mjs [outDir] [chromiumPath]
 */
import { createServer } from "http";
import { readFile, stat } from "fs/promises";
import { existsSync, mkdirSync } from "fs";
import { extname, join } from "path";
import { chromium } from "playwright";

const OUT = process.argv[2] ?? ".shots";
const EXEC = process.argv[3] || process.env.CHROMIUM_PATH || undefined;
const PORT = 4173;
const MIME = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".png": "image/png",
  ".txt": "text/plain",
};

const server = createServer(async (req, res) => {
  try {
    let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
    let f = join("out", p);
    if (existsSync(f) && (await stat(f)).isDirectory())
      f = join(f, "index.html");
    if (!existsSync(f)) f = join("out", p.replace(/\/$/, "") + ".html");
    if (!existsSync(f)) f = "out/404.html";
    if (!existsSync(f)) {
      res.writeHead(404);
      res.end("nf");
      return;
    }
    res.writeHead(200, {
      "content-type": MIME[extname(f)] ?? "application/octet-stream",
    });
    res.end(await readFile(f));
  } catch (e) {
    res.writeHead(500);
    res.end(String(e));
  }
});

await new Promise((r) => server.listen(PORT, r));
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({
  headless: true,
  executablePath: EXEC,
  args: ["--no-sandbox"],
});
const errors = [];

async function shot(
  name,
  {
    url = "/",
    w = 1440,
    h = 900,
    dark = false,
    onboard = false,
    hover = null,
    click = null,
    waitMs = 700,
  },
) {
  const ctx = await browser.newContext({
    viewport: { width: w, height: h },
    colorScheme: dark ? "dark" : "light",
    reducedMotion: "reduce",
  });
  const page = await ctx.newPage();
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(`[${name}] console: ${m.text()}`);
  });
  page.on("pageerror", (e) => errors.push(`[${name}] pageerror: ${e.message}`));
  if (!onboard)
    await ctx.addInitScript(() => localStorage.setItem("itl-onboarded", "1"));
  await page.goto(`http://localhost:${PORT}${url}`, {
    waitUntil: "networkidle",
  });
  if (hover) await page.mouse.move(hover[0], hover[1], { steps: 4 });
  if (click) await page.click(click);
  await page.waitForTimeout(waitMs);
  await page.screenshot({ path: join(OUT, `${name}.png`) });
  // quick sanity data
  const counts = await page.evaluate(() => ({
    markers: document.querySelectorAll(".tl-item").length,
    line: !!document.querySelector('[data-testid="central-line"]'),
    title: document.title.slice(0, 40),
  }));
  console.log(
    `${name}: markers=${counts.markers} line=${counts.line} :: ${counts.title}`,
  );
  await ctx.close();
}

await shot("01-home-onboarding", { onboard: true });
await shot("02-home", {});
await shot("03-hover-lens", { url: "/?y=1250&z=2.6", hover: [660, 450] });
await shot("04-decade-1300", { url: "/?y=1300&z=11" });
await shot("05-ibn-taymiyya", { url: "/?sel=ibn-taymiyya", waitMs: 1100 });
await shot("06-compare", {
  url: "/?cmp=al-bukhari,ibn-taymiyya,al-nawawi&cv=1&y=1100&z=0.8",
});
await shot("07-atlas-1550", { url: "/?map=1&y=1550&z=2.6" });
await shot("08-dark-1258", { url: "/?y=1258&z=2.6&th=dark", dark: true });
await shot("09-sirah-detail", { url: "/?y=627&z=46" });
await shot("10-mobile-home", { w: 390, h: 844 });
await shot("11-mobile-selected", {
  url: "/?sel=al-nawawi",
  w: 390,
  h: 844,
  waitMs: 1100,
});
await shot("12-millennium", { url: "/?y=1300&z=0.62" });
await shot("13-support-card", { click: '[data-testid="support-button"]' });
await shot("14-prophets-traditional", { url: "/?y=-1200&z=2.6" });
await shot("15-adam-origin", { url: "/?y=-3400&z=2.6" });
await shot("16-isa-era", { url: "/?sel=prophet-isa", waitMs: 1100 });

await browser.close();
server.close();

if (errors.length) {
  console.log("\n--- ERRORS ---");
  for (const e of errors) console.log(e);
  process.exitCode = 1;
} else {
  console.log("\nNo console or page errors.");
}

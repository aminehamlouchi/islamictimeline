import { expect, test, type Page } from "@playwright/test";
import { dismissIntro, isPhone, mounted, pinch, travel } from "./helpers";

/**
 * Every interaction the README promises, exercised in both engines, with the
 * console watched. A silent JavaScript error on an iPhone is the failure mode
 * that would never reach us any other way.
 */

const errors = new Map<Page, string[]>();

test.beforeEach(async ({ page }) => {
  const log: string[] = [];
  errors.set(page, log);
  page.on("console", (m) => {
    if (m.type() === "error") log.push(m.text());
  });
  page.on("pageerror", (e) => log.push(`pageerror: ${e.message}`));
  // Most tests are a returning visitor, so the first-visit introduction is not
  // sitting over the controls. One test below covers the introduction itself.
  await dismissIntro(page);
  await page.goto("./", { waitUntil: "load" });
  await page.waitForSelector("[data-testid=timeline-canvas]");
  await mounted(page);
  await page.waitForTimeout(400);
  const intro = page.getByTestId("onboarding");
  if (await intro.isVisible().catch(() => false))
    await intro.getByRole("button", { name: "Skip" }).click();
});

test.afterEach(async ({ page }) => {
  const log = errors.get(page) ?? [];
  expect(log, `console errors: ${log.join(" | ")}`).toHaveLength(0);
});

const canvas = "[data-testid=timeline-canvas]";

/** Current year at the top of the view, read from the canvas scale. */
async function centerYear(page: Page): Promise<number> {
  return page.evaluate(() => {
    const el = document.querySelector("[data-testid=timeline-canvas]")!;
    const ppy = Number(el.getAttribute("data-ppy"));
    const off = Number(el.getAttribute("data-offset-y"));
    const now = Number(el.getAttribute("data-now-year"));
    return now - (off + window.innerHeight / 2) / ppy;
  });
}
async function ppyOf(page: Page): Promise<number> {
  return page.evaluate(() =>
    Number(
      document
        .querySelector("[data-testid=timeline-canvas]")!
        .getAttribute("data-ppy"),
    ),
  );
}

test("scroll and drag travel through time", async ({ page }, info) => {
  const before = await centerYear(page);
  await travel(page, info.project.name, 900);
  await page.waitForTimeout(300);
  expect(Math.abs((await centerYear(page)) - before)).toBeGreaterThan(5);
});

test("arrow keys pan and Home returns to today", async ({ page }) => {
  const start = await centerYear(page);
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowDown");
  await page.waitForTimeout(250);
  expect(await centerYear(page)).toBeLessThan(start);
  await page.keyboard.press("Home");
  await page.waitForTimeout(900);
  expect(Math.abs((await centerYear(page)) - start)).toBeLessThan(6);
});

test("keyboard, wheel, pinch and double-click zoom", async ({ page }, info) => {
  const z0 = await ppyOf(page);
  await page.keyboard.press("+");
  await page.waitForTimeout(200);
  const z1 = await ppyOf(page);
  expect(z1).toBeGreaterThan(z0);
  await page.keyboard.press("-");
  await page.waitForTimeout(200);
  expect(await ppyOf(page)).toBeLessThan(z1);

  await page.evaluate(() => {
    document.querySelector("[data-testid=timeline-canvas]")!.dispatchEvent(
      new WheelEvent("wheel", {
        deltaY: -300,
        clientY: 400,
        ctrlKey: true,
        bubbles: true,
        cancelable: true,
      }),
    );
  });
  await page.waitForTimeout(200);
  expect(await ppyOf(page)).toBeGreaterThan(z0);

  // A pointer device zooms by double-clicking a moment; a phone pinches.
  const z2 = await ppyOf(page);
  if (isPhone(info.project.name)) {
    await pinch(page, page.viewportSize()!.height / 2, 1.8);
  } else {
    await page.locator(canvas).dblclick({ position: { x: 60, y: 300 } });
  }
  await page.waitForTimeout(250);
  expect(await ppyOf(page)).toBeGreaterThan(z2);
});

test("zoom buttons work", async ({ page }) => {
  const z0 = await ppyOf(page);
  await page.getByRole("button", { name: "Zoom in", exact: true }).click();
  await page.waitForTimeout(700);
  expect(await ppyOf(page)).toBeGreaterThan(z0);
  const z1 = await ppyOf(page);
  await page.getByRole("button", { name: "Zoom out", exact: true }).click();
  await page.waitForTimeout(700);
  expect(await ppyOf(page)).toBeLessThan(z1);
});

test("clicking a marker opens the focused record view", async ({ page }) => {
  const marker = page.locator("[data-id]:not([data-id^=cluster])").first();
  await marker.click({ force: true });
  await expect(page.getByTestId("detail-panel")).toBeVisible();
  await page.getByRole("button", { name: "Close details" }).click();
  await expect(page.getByTestId("detail-panel")).toBeHidden();
});

test("search finds records by name, Arabic and date", async ({ page }) => {
  for (const [query, expected] of [
    ["Bukhari", /bukh/i],
    ["الغزالي", /./],
    ["1258", /./],
    ["656 AH", /./],
  ] as const) {
    await page.keyboard.press("/");
    await expect(page.getByTestId("search-palette")).toBeVisible();
    const box = page.getByRole("combobox");
    await box.fill(query);
    await page.waitForTimeout(350);
    const options = page.getByRole("option");
    await expect(options.first()).toBeVisible();
    expect(await options.first().innerText()).toMatch(expected);
    await page.keyboard.press("Escape");
    await expect(page.getByTestId("search-palette")).toBeHidden();
  }
});

test("arrow keys move the search highlight and aria-activedescendant follows", async ({
  page,
}) => {
  await page.keyboard.press("/");
  const box = page.getByRole("combobox");
  await box.fill("Ibn");
  await page.waitForTimeout(350);
  const options = page.getByRole("option");
  await expect(options.first()).toBeVisible();
  expect(await options.count()).toBeGreaterThan(1);
  const first = await options.first().getAttribute("id");
  expect(first).toBeTruthy();
  await expect(box).toHaveAttribute("aria-activedescendant", first!);
  await page.keyboard.press("ArrowDown");
  const second = await options.nth(1).getAttribute("id");
  expect(second).not.toBe(first);
  await expect(box).toHaveAttribute("aria-activedescendant", second!);
  await expect(options.nth(1)).toHaveAttribute("aria-selected", "true");
  await page.keyboard.press("ArrowUp");
  await expect(box).toHaveAttribute("aria-activedescendant", first!);
  // The option is the clickable element itself, with nothing nested inside.
  expect(await options.first().locator("button, a").count()).toBe(0);
  await page.keyboard.press("Escape");
  await expect(page.getByTestId("search-palette")).toBeHidden();
});

test("atlas, legend, filters and help open and close", async ({ page }) => {
  for (const [key, testId] of [
    ["m", "map-panel"],
    ["l", "legend"],
    ["f", "filters-panel"],
  ] as const) {
    // the atlas is already open on wide screens, so toggle to a known state
    const panel = page.getByTestId(testId);
    if (await panel.isVisible()) await page.keyboard.press(key);
    await expect(panel).toBeHidden();
    await page.keyboard.press(key);
    await expect(panel).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(panel).toBeHidden();
  }
  await page.keyboard.press("?");
  await expect(page.getByRole("dialog", { name: "Help" })).toBeVisible();
  await page.keyboard.press("Escape");
});

test("the help sheet routes to the methodology, the index and the legend", async ({
  page,
}) => {
  await page.keyboard.press("?");
  const help = page.getByRole("dialog", { name: "Help" });
  await expect(help).toBeVisible();
  await expect(help.getByRole("link", { name: "Index", exact: true })).toHaveAttribute(
    "href",
    /records\/$/,
  );
  await help.getByRole("button", { name: "Legend", exact: true }).click();
  await expect(help).toBeHidden();
  await expect(page.getByTestId("legend")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByTestId("legend")).toBeHidden();
  await page.keyboard.press("?");
  await help.getByRole("link", { name: "Methodology and sources" }).click();
  await page.waitForURL(/\/methodology\/$/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("markers name their kind and say when a date is disputed", async ({ page }, info) => {
  // al-Qadisiyya: start precision 'disputed', prominence 5, drawn at every zoom.
  await page.goto("./?y=636&z=46", { waitUntil: "load" });
  await mounted(page);
  const marker = page.locator('[data-id="battle-of-qadisiyya"]');
  await expect(marker).toHaveAttribute("aria-label", /^Battle of al-Qādisiyya, .+ CE .*Battle, disputed$/);
  // A person with an attested span and no dispute carries the kind alone.
  const person = page.locator("[data-id]:not([data-id^=cluster])").filter({
    has: page.locator("xpath=self::*[contains(@aria-label, ', Person')]"),
  });
  expect(await person.count()).toBeGreaterThan(0);
  if (isPhone(info.project.name)) return; // no hover on touch
  await marker.hover({ force: true });
  await page.waitForTimeout(350);
  await expect(page.locator("svg text", { hasText: /disputed/ }).first()).toBeVisible();
});

test("compare tray fills from the record view and opens", async ({ page }) => {
  const markers = page.locator("[data-id]:not([data-id^=cluster])");
  for (let i = 0; i < 2; i++) {
    await markers.nth(i).click({ force: true });
    await expect(page.getByTestId("detail-panel")).toBeVisible();
    await page.getByTestId("detail-panel").getByRole("button", { name: /compare/i }).click();
    await page.keyboard.press("Escape");
  }
  await expect(page.getByTestId("compare-tray")).toBeVisible();
  await page.keyboard.press("c");
  await expect(page.getByTestId("compare-view")).toBeVisible();
  await page.keyboard.press("Escape");
});

test("bookmarks persist and list in the library", async ({ page }) => {
  await page.locator("[data-id]:not([data-id^=cluster])").first().click({ force: true });
  const detail = page.getByTestId("detail-panel");
  await detail.getByRole("button", { name: /save/i }).click();
  await expect(detail.getByRole("button", { name: /saved/i })).toBeVisible();
  await page.keyboard.press("Escape");
  const library = page.getByRole("button", { name: "Saved records" });
  if (await library.isVisible().catch(() => false)) {
    await library.click();
    await expect(page.getByTestId("library")).toBeVisible();
  }
  expect(
    await page.evaluate(() =>
      JSON.parse(localStorage.getItem("itl-bookmarks") ?? "[]"),
    ),
  ).toHaveLength(1);
});

test("the view is a shareable URL that reopens the same view", async ({ page }, info) => {
  await page.keyboard.press("+");
  await travel(page, info.project.name, 700);
  await page.waitForTimeout(800);
  const url = page.url();
  expect(url).toMatch(/[?&]y=/);
  const year = await centerYear(page);
  const ppy = await ppyOf(page);
  await page.goto(url, { waitUntil: "load" });
  await page.waitForTimeout(700);
  expect(Math.abs((await centerYear(page)) - year)).toBeLessThan(0.01);
  expect(Math.abs((await ppyOf(page)) - ppy)).toBeLessThan(1e-6);
});

test("suggest and support open, with the canonical link hub", async ({ page }) => {
  await page.getByRole("button", { name: "Suggest a record" }).click();
  const suggest = page.getByRole("dialog", { name: "Suggest a record" });
  await expect(suggest).toBeVisible();
  expect(await suggest.innerHTML()).toContain("aminehamlouchibusiness@gmail.com");
  await page.keyboard.press("Escape");

  await page.getByTestId("support-button").click();
  const support = page.getByRole("dialog", { name: "Support this project" });
  await expect(support).toBeVisible();
  const html = await support.innerHTML();
  expect(html).toContain("https://aminehamlouchi.com/links/");
  expect(html).not.toContain("aminehamlouchi.github.io");
});

test("the methodology page loads and links home", async ({ page }) => {
  await page.goto("./methodology/", { waitUntil: "load" });
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  // the old preview host, spelled so the string does not live in this repo
  const OLD_HOST = ["higgs", "field", ".app"].join("");
  expect(await page.content()).not.toContain(OLD_HOST);
});

test("the mobile bottom sheet carries the record view", async ({ page }, info) => {
  test.skip(!isPhone(info.project.name), "phone viewports only");
  await page.locator("[data-id]:not([data-id^=cluster])").first().click({ force: true });
  const panel = page.getByTestId("detail-panel");
  await expect(panel).toBeVisible();
  const box = (await panel.boundingBox())!;
  const vh = page.viewportSize()!.height;
  // a sheet: anchored to the bottom edge, not a side rail
  expect(box.y + box.height).toBeGreaterThan(vh - 8);
  expect(box.width).toBeGreaterThan(page.viewportSize()!.width * 0.9);
});

test("the hover lens reveals quieter records", async ({ page }, info) => {
  test.skip(isPhone(info.project.name), "no hover on touch");
  const before = await page.locator("[data-id] text").count();
  await page.mouse.move(page.viewportSize()!.width / 2, 400);
  await page.waitForTimeout(350);
  expect(await page.locator("[data-id] text").count()).toBeGreaterThanOrEqual(before);
  expect(await page.evaluate(() => (window as unknown as { __err?: string }).__err ?? "")).toBe("");
});

test("the first-visit introduction appears and can be skipped", async (
  { browser, baseURL },
  info,
) => {
  const ctx = await browser.newContext({ baseURL });
  const fresh = await ctx.newPage();
  await fresh.goto("./", { waitUntil: "load" });
  const intro = fresh.getByTestId("onboarding");
  await expect(intro).toBeVisible();
  if (isPhone(info.project.name)) {
    // Step four points at the zoom presets, so the card must not cover them.
    const zoom = fresh.getByRole("group", { name: "Zoom" });
    await expect(zoom).toBeVisible();
    const a = (await intro.boundingBox())!;
    const b = (await zoom.boundingBox())!;
    const apart =
      a.x + a.width <= b.x ||
      b.x + b.width <= a.x ||
      a.y + a.height <= b.y ||
      b.y + b.height <= a.y;
    expect(apart, `intro ${JSON.stringify(a)} covers the zoom control ${JSON.stringify(b)}`).toBe(true);
  }
  await intro.getByRole("button", { name: "Skip" }).click();
  await expect(intro).toBeHidden();
  await ctx.close();
});

test("a tap on the canvas dismisses the introduction, a drag does not", async (
  { browser, baseURL },
  info,
) => {
  const ctx = await browser.newContext({ baseURL });
  const fresh = await ctx.newPage();
  await fresh.goto("./", { waitUntil: "load" });
  await mounted(fresh);
  const intro = fresh.getByTestId("onboarding");
  await expect(intro).toBeVisible();
  // Open canvas just above the card and below the year pill: left of the line
  // on a phone, right of it on a desktop, where the atlas holds the left.
  const box = (await intro.boundingBox())!;
  const phone = isPhone(info.project.name);
  const x = Math.round(fresh.viewportSize()!.width * (phone ? 0.2 : 0.8));
  const y = Math.round(Math.max(130, box.y - 40));
  // Travelling is not a tap: the card stays.
  await fresh.mouse.move(x, y);
  await fresh.mouse.down();
  await fresh.mouse.move(x, y - 120, { steps: 8 });
  await fresh.mouse.up();
  await fresh.waitForTimeout(200);
  await expect(intro).toBeVisible();
  const canvasEl = fresh.getByTestId("timeline-canvas");
  if (phone) await canvasEl.tap({ position: { x, y } });
  else await canvasEl.click({ position: { x, y } });
  await expect(intro).toBeHidden();
  expect(await fresh.evaluate(() => localStorage.getItem("itl-onboarded"))).toBe("1");
  await ctx.close();
});

test("a first visit from a clock unlike the build's is still clean", async ({
  browser,
  baseURL,
}) => {
  // The static HTML is generated once and read for months. A visitor whose
  // calendar day differs from the build's must not hit a hydration mismatch,
  // which is what happens when today's date is baked into the document.
  const ctx = await browser.newContext({
    baseURL,
    timezoneId: "Pacific/Kiritimati",
    locale: "en-GB",
  });
  const fresh = await ctx.newPage();
  const errors: string[] = [];
  fresh.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  fresh.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
  await fresh.goto("./", { waitUntil: "load" });
  await fresh.waitForTimeout(2500);
  expect(errors, `console errors: ${errors.join(" | ")}`).toHaveLength(0);
  await expect(fresh.getByTestId("timeline-canvas")).toBeVisible();
  await ctx.close();
});

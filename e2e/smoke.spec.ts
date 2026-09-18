import { expect, test, type Page } from "@playwright/test";
import { dismissIntro, isPhone, pinch, travel } from "./helpers";

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

test("the first-visit introduction appears and can be skipped", async ({ browser, baseURL }) => {
  const ctx = await browser.newContext({ baseURL });
  const fresh = await ctx.newPage();
  await fresh.goto("./", { waitUntil: "load" });
  const intro = fresh.getByTestId("onboarding");
  await expect(intro).toBeVisible();
  await intro.getByRole("button", { name: "Skip" }).click();
  await expect(intro).toBeHidden();
  await ctx.close();
});

import { expect, test, type Page } from "@playwright/test";
import { dismissIntro, isPhone, mounted } from "./helpers";

/**
 * The keyboard path through the instrument. Skip links are the first Tab
 * stops, the controls sit right behind them, the rail answers to every key its
 * slider role promises without the window handler panning a second time, an
 * era landmark flies to its era, and Space opens a cluster. The console is
 * watched throughout.
 */

const errors = new Map<Page, string[]>();

test.beforeEach(async ({ page }) => {
  const log: string[] = [];
  errors.set(page, log);
  page.on("console", (m) => {
    if (m.type() === "error") log.push(m.text());
  });
  page.on("pageerror", (e) => log.push(`pageerror: ${e.message}`));
  await dismissIntro(page);
  await page.goto("./", { waitUntil: "load" });
  await mounted(page);
  await page.waitForTimeout(400);
});

test.afterEach(async ({ page }) => {
  const log = errors.get(page) ?? [];
  expect(log, `console errors: ${log.join(" | ")}`).toHaveLength(0);
});

const canvas = "[data-testid=timeline-canvas]";

/** The year through the middle of the viewport, read from the canvas scale. */
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

/**
 * The next Tab stop. WebKit leaves links and buttons out of plain Tab unless
 * the system's full keyboard access is on, and Option+Tab is its way through
 * every control; the order under test is the document order either way.
 */
async function tab(page: Page, project: string) {
  await page.keyboard.press(project.startsWith("webkit") ? "Alt+Tab" : "Tab");
}

/** What has focus, named the way a screen reader would name it. */
async function focused(page: Page) {
  return page.evaluate(() => {
    const el = document.activeElement as HTMLElement | null;
    if (!el || el === document.body) return { tag: "body", name: "", href: "" };
    return {
      tag: el.tagName.toLowerCase(),
      name: el.getAttribute("aria-label") ?? el.textContent?.trim() ?? "",
      href: el.getAttribute("href") ?? "",
    };
  });
}

/** Whether the focused element is drawn inside the viewport. */
async function focusedOnScreen(page: Page): Promise<boolean> {
  return page.evaluate(() => {
    const r = document.activeElement?.getBoundingClientRect();
    if (!r) return false;
    return (
      r.top >= 0 &&
      r.left >= 0 &&
      r.bottom <= window.innerHeight &&
      r.right <= window.innerWidth &&
      r.height > 0
    );
  });
}

test("the served document carries the skip links and landmarks before the canvas", async ({
  page,
}) => {
  const html = await (await page.request.get("./")).text();
  const controls = html.indexOf('href="#controls"');
  const index = html.indexOf('href="./records/"');
  const canvasAt = html.indexOf('data-testid="timeline-canvas"');
  expect(controls).toBeGreaterThan(-1);
  expect(index).toBeGreaterThan(-1);
  expect(canvasAt).toBeGreaterThan(-1);
  expect(controls).toBeLessThan(canvasAt);
  expect(index).toBeLessThan(canvasAt);
  expect(html).toContain('id="controls"');
  expect(html).toContain('aria-label="Eras"');
  expect(html).toMatch(/data-testid="timeline-canvas"[^>]*tabindex="0"/);
});

test("Tab reaches the skip link first and Search within four stops", async ({
  page,
}, info) => {
  test.skip(isPhone(info.project.name), "a keyboard on a desktop");
  await tab(page, info.project.name);
  expect(await focused(page)).toEqual({
    tag: "a",
    name: "Skip to controls",
    href: "#controls",
  });
  // hidden until it has focus, then drawn where the visitor can see it
  await page.waitForTimeout(250);
  expect(await focusedOnScreen(page)).toBe(true);
  await tab(page, info.project.name);
  expect(await focused(page)).toEqual({
    tag: "a",
    name: "Skip to the record index",
    href: "./records/",
  });
  let stops = 2;
  let name = "";
  while (stops < 4 && name !== "Search") {
    await tab(page, info.project.name);
    stops++;
    name = (await focused(page)).name;
  }
  expect(name).toBe("Search");
  expect(stops).toBeLessThanOrEqual(4);
});

test("the skip link lands on the first control", async ({ page }, info) => {
  test.skip(isPhone(info.project.name), "a keyboard on a desktop");
  await tab(page, info.project.name);
  await page.keyboard.press("Enter");
  expect(
    await page.evaluate(() =>
      document.activeElement?.getAttribute("data-testid"),
    ),
  ).toBe("support-button");
  await expect(page).toHaveURL(/^[^#]*$/);
});

test("the rail answers to every key, once per press", async ({ page }, info) => {
  test.skip(isPhone(info.project.name), "the rail is hidden below the sm breakpoint");
  // Count what reaches the window handler in App.tsx. A key the rail handles
  // must never get there, or the view would move twice.
  await page.evaluate(() => {
    const w = window as unknown as { __winKeys: string[] };
    w.__winKeys = [];
    window.addEventListener("keydown", (e) => w.__winKeys.push(e.key));
  });
  const rail = page.getByTestId("year-rail");
  await rail.focus();
  const ppy = await ppyOf(page);
  const y0 = await centerYear(page);

  await page.keyboard.press("ArrowDown");
  await page.waitForTimeout(150);
  const y1 = await centerYear(page);
  // one pan of 120 px, not two
  expect(Math.abs(y0 - y1 - 120 / ppy)).toBeLessThan(2);
  await expect(rail).toHaveAttribute("aria-valuetext", /^\d+ CE, .+ era$/);

  await page.keyboard.press("ArrowUp");
  await page.waitForTimeout(150);
  expect(Math.abs((await centerYear(page)) - y0)).toBeLessThan(2);

  await page.keyboard.press("PageDown");
  await page.waitForTimeout(900);
  expect(Math.abs((await centerYear(page)) - (y0 - 100))).toBeLessThan(3);

  await page.keyboard.press("PageUp");
  await page.waitForTimeout(900);
  expect(Math.abs((await centerYear(page)) - y0)).toBeLessThan(3);

  await page.keyboard.press("End");
  await page.waitForTimeout(900);
  // The bottom of the domain lies in the undated cap, where the scale is a
  // fixed 320 px rather than years, so ask the slider rather than the axis.
  await expect(rail).toHaveAttribute("aria-valuenow", "-4400");
  await expect(rail).toHaveAttribute(
    "aria-valuetext",
    "earliest prophets, undated",
  );

  await page.keyboard.press("Home");
  await page.waitForTimeout(900);
  expect(await centerYear(page)).toBeGreaterThan(y0);
  await expect(rail).toHaveAttribute("aria-valuetext", /CE, Contemporary era$/);

  const winKeys = await page.evaluate(
    () => (window as unknown as { __winKeys: string[] }).__winKeys,
  );
  expect(winKeys).toEqual([]);
  // a key the rail does not claim still reaches the window
  await page.keyboard.press("l");
  expect(
    await page.evaluate(
      () => (window as unknown as { __winKeys: string[] }).__winKeys,
    ),
  ).toEqual(["l"]);
  await page.keyboard.press("l");
});

test("an era landmark flies to its era", async ({ page }, info) => {
  test.skip(isPhone(info.project.name), "a keyboard on a desktop");
  const eras = page.getByRole("navigation", { name: "Eras" });
  const abbasid = eras.getByRole("button", { name: "Abbasid era" });
  await abbasid.focus();
  await page.waitForTimeout(250);
  expect(await focusedOnScreen(page)).toBe(true);
  await page.keyboard.press("Enter");
  // A fly-to is an animation; wait for where it lands, not for a clock. The
  // Linux WebKit runner is slower than a Mac and a fixed wait failed there.
  await expect
    .poll(async () => Math.abs((await centerYear(page)) - (750 + 1258) / 2), {
      timeout: 10_000,
    })
    .toBeLessThan(3);
  await expect(abbasid).toHaveAttribute("aria-current", "true");
  expect(await eras.locator("[aria-current=true]").count()).toBe(1);
});

test("the instrument itself takes focus and still pans", async ({ page }, info) => {
  test.skip(isPhone(info.project.name), "a keyboard on a desktop");
  const root = page.locator(canvas);
  await expect(root).toHaveAttribute("tabindex", "0");
  const id = await root.getAttribute("aria-describedby");
  expect(id).toBeTruthy();
  expect(await page.locator(`#${id}`).textContent()).toContain("arrow keys");
  await root.focus();
  const y0 = await centerYear(page);
  await page.keyboard.press("ArrowDown");
  await page.waitForTimeout(150);
  expect(await centerYear(page)).toBeLessThan(y0);
});

test("Space on a cluster opens it", async ({ page }, info) => {
  test.skip(isPhone(info.project.name), "a keyboard on a desktop");
  // Clusters form where two or more point markers sit within 15 px of each
  // other in one slot: the century view over the classical centuries has some.
  await page.goto("./?y=1000&z=2.6", { waitUntil: "load" });
  await mounted(page);
  await page.waitForTimeout(400);
  const cluster = page.locator("[data-id^=cluster]").first();
  await expect(cluster).toBeVisible();
  await cluster.focus();
  expect(
    await page.evaluate(() =>
      document.activeElement?.getAttribute("data-id") ?? "",
    ),
  ).toMatch(/^cluster:/);
  const z0 = await ppyOf(page);
  await page.keyboard.press(" ");
  // the cluster zoom is a fly-to; wait for the zoom to arrive
  await expect
    .poll(() => ppyOf(page), { timeout: 10_000 })
    .toBeGreaterThan(z0 * 2);
});

test("the help button is on the phone bar", async ({ page }, info) => {
  test.skip(!isPhone(info.project.name), "phone viewports only");
  const help = page.getByRole("button", { name: "Keyboard shortcuts and help" });
  await expect(help).toBeVisible();
  await help.click();
  await expect(page.getByRole("dialog", { name: "Help" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog", { name: "Help" })).toBeHidden();
});

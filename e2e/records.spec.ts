import { expect, test, type Page } from "@playwright/test";
import { dismissIntro, mounted } from "./helpers";

/**
 * The static record pages, in both engines with the console watched: the page
 * loads clean, its JSON-LD parses and keeps to the date rule, and the one link
 * into the instrument lands with the record selected.
 */

function watch(page: Page): string[] {
  const log: string[] = [];
  page.on("console", (m) => {
    if (m.type() === "error") log.push(m.text());
  });
  page.on("pageerror", (e) => log.push(`pageerror: ${e.message}`));
  return log;
}

async function jsonLd(page: Page): Promise<Record<string, unknown>> {
  const raw = await page
    .locator('script[type="application/ld+json"]')
    .textContent();
  return JSON.parse(raw ?? "");
}

test("a record page loads clean and its JSON-LD parses", async ({ page }) => {
  const errors = watch(page);
  await page.goto("./r/al-bukhari/", { waitUntil: "load" });
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Imam al-Bukhārī",
  );
  await expect(page.locator("main [lang=ar][dir=rtl]").first()).toBeVisible();
  const ld = await jsonLd(page);
  expect(ld["@type"]).toBe("Person");
  expect(ld.name).toBe("Imam al-Bukhārī");
  expect(ld.birthDate).toBe("0810");
  expect(ld.deathDate).toBe("0870");
  expect(ld).not.toHaveProperty("sameAs");
  expect(ld.citation).toHaveLength(2);
  await expect(page.getByRole("link", { name: "Imam Muslim" })).toBeVisible();
  await page.waitForTimeout(500);
  expect(errors, `console errors: ${errors.join(" | ")}`).toHaveLength(0);
});

test("a circa record keeps its date in words, with no machine date", async ({
  page,
}) => {
  const errors = watch(page);
  await page.goto("./r/al-khwarizmi/", { waitUntil: "load" });
  const ld = await jsonLd(page);
  expect(ld).not.toHaveProperty("birthDate");
  expect(String(ld.description)).toContain("c. 780");
  expect(await page.locator("main").innerText()).toContain("c. 780");
  await expect(page.getByText("approximate", { exact: true })).toBeVisible();
  await page.waitForTimeout(300);
  expect(errors, `console errors: ${errors.join(" | ")}`).toHaveLength(0);
});

test("the Open link lands in the instrument with the record selected", async ({
  page,
}) => {
  const errors = watch(page);
  await dismissIntro(page);
  await page.goto("./r/al-bukhari/", { waitUntil: "load" });
  await page.getByRole("link", { name: "Open in the instrument" }).click();
  await page.waitForURL(/[?&]sel=al-bukhari/);
  await mounted(page);
  await expect(
    page.getByRole("dialog", { name: "Details: Imam al-Bukhārī" }),
  ).toBeVisible();
  expect(errors, `console errors: ${errors.join(" | ")}`).toHaveLength(0);
});

test("the sitemap lists the record pages", async ({ request }) => {
  const res = await request.get("./sitemap.xml");
  expect(res.status()).toBe(200);
  const xml = await res.text();
  expect(xml).toContain("/r/al-bukhari/");
  expect(xml).toContain("/methodology/");
});

test("an address with no page gets the site's own 404", async ({ page }) => {
  const res = await page.goto("./r/no-such-record/", { waitUntil: "load" });
  expect(res?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Page not found",
  );
  await expect(
    page.getByRole("link", { name: /back to the timeline/i }),
  ).toBeVisible();
});

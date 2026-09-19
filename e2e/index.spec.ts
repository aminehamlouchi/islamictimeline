import { expect, test, type Page } from "@playwright/test";
import { dismissIntro } from "./helpers";
import { ERAS } from "../src/lib/eras";

/**
 * The record index is the text alternative to the canvas, so it is held to
 * the same standard in both engines: it loads clean, every era is a heading,
 * every record is a link, and a link really does open the instrument at that
 * record.
 */

/** The dataset size the changelog attests to; a change here is a data change. */
const RECORD_COUNT = 392;

/** The five undated prophets whose `year` is a layout slot, never a date. */
const UNDATED = [
  "prophet-adam",
  "prophet-idris",
  "prophet-nuh",
  "prophet-hud",
  "prophet-salih",
];

const errors = new Map<Page, string[]>();

test.beforeEach(async ({ page }) => {
  const log: string[] = [];
  errors.set(page, log);
  page.on("console", (m) => {
    if (m.type() === "error") log.push(m.text());
  });
  page.on("pageerror", (e) => log.push(`pageerror: ${e.message}`));
  await dismissIntro(page);
  await page.goto("./records/", { waitUntil: "load" });
});

test.afterEach(async ({ page }) => {
  const log = errors.get(page) ?? [];
  expect(log, `console errors: ${log.join(" | ")}`).toHaveLength(0);
});

test("one heading per era, each a permalink, and one link per record", async ({ page }) => {
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2 })).toHaveCount(ERAS.length);
  for (const era of ERAS) {
    const section = page.locator(`section#${era.id}`);
    await expect(section).toHaveCount(1);
    await expect(section.getByRole("heading", { level: 2 })).toContainText(era.label);
  }
  const links = page.locator("a[href*='?sel=']");
  await expect(links).toHaveCount(RECORD_COUNT);
  const ids = await links.evaluateAll((els) =>
    els.map((a) => new URL((a as HTMLAnchorElement).href).searchParams.get("sel")),
  );
  expect(new Set(ids).size).toBe(RECORD_COUNT);
  // the jump list reaches every section
  const nav = page.getByRole("navigation", { name: "Records by era" });
  for (const era of ERAS)
    await expect(nav.locator(`a[href="#${era.id}"]`)).toHaveCount(1);
});

test("the undated prophets sit in the first era with no year, never in the last", async ({ page }) => {
  const first = page.locator(`section#${ERAS[0].id}`);
  const last = page.locator(`section#${ERAS[ERAS.length - 1].id}`);
  for (const id of UNDATED) {
    const row = first.locator(`[data-record="${id}"]`);
    await expect(row).toHaveCount(1);
    expect(await row.innerText()).not.toMatch(/\d/);
    await expect(last.locator(`[data-record="${id}"]`)).toHaveCount(0);
  }
  // a dated record in the same band keeps its date
  await expect(first.locator('[data-record="sumer-writing"]')).toContainText("BCE");
});

test("rows carry no importance, summary or citation", async ({ page }) => {
  const html = await page.content();
  expect(html).not.toContain("●");
  expect(html).not.toContain("○");
  // a phrase from a summary, and one from a citation
  expect(html).not.toContain("cuneiform pressed into clay");
  expect(html).not.toContain("Encyclopaedia of Islam, 2nd ed.");
  // dates keep their honesty markers
  const row = page.locator('[data-record="battle-of-qadisiyya"]');
  await expect(row).toContainText("disputed");
  await expect(row).toContainText("also reported 637, 638");
  await expect(page.locator('[data-record="al-qarawiyyin"]')).toContainText("present");
});

test("a row opens the instrument at that record", async ({ page }) => {
  const row = page.locator('[data-record="al-bukhari"]');
  await expect(row.locator("a")).toHaveAttribute("href", /\/\?sel=al-bukhari$/);
  await row.locator("a").click();
  await expect(page).toHaveURL(/[?&]sel=al-bukhari/);
  const panel = page.getByTestId("detail-panel");
  await expect(panel).toBeVisible();
  await expect(panel).toHaveAttribute("aria-label", /Bukh/);
});

import { expect, test, type Page } from "@playwright/test";
import { dismissIntro, mounted } from "./helpers";

/**
 * A student citing a record and a reader reporting a mistake. Chromium lets a
 * test read the clipboard back, so there the copied text is checked against
 * what the panel shows; WebKit does not, so there the confirmation on the
 * button is the evidence. The report and suggest links are checked by their
 * address, since following them would leave for GitHub.
 */

const ID = "ibn-taymiyya";
const NAME = "Ibn Taymiyya";
const ISSUES = "https://github.com/aminehamlouchi/islamictimeline/issues/new";
const EMAIL = "aminehamlouchibusiness@gmail.com";
const EM_DASH = String.fromCodePoint(0x2014);

const errors = new Map<Page, string[]>();

test.beforeEach(async ({ page }) => {
  const log: string[] = [];
  errors.set(page, log);
  page.on("console", (m) => {
    if (m.type() === "error") log.push(m.text());
  });
  page.on("pageerror", (e) => log.push(`pageerror: ${e.message}`));
  await dismissIntro(page);
  await page.goto(`./?sel=${ID}`, { waitUntil: "load" });
  await mounted(page);
  await expect(page.getByTestId("detail-panel")).toBeVisible();
});

test.afterEach(async ({ page }) => {
  const log = errors.get(page) ?? [];
  expect(log, `console errors: ${log.join(" | ")}`).toHaveLength(0);
});

/** Press a copy button, wait for its confirmation, read the clipboard where the engine allows. */
async function copyFromPanel(
  page: Page,
  browserName: string,
  button: RegExp,
  done: RegExp,
): Promise<string | null> {
  const panel = page.getByTestId("detail-panel");
  const canRead = browserName === "chromium";
  if (canRead)
    await page.context().grantPermissions(["clipboard-read", "clipboard-write"]);
  await panel.getByRole("button", { name: button }).click();
  await expect(panel.getByRole("button", { name: done })).toBeVisible();
  return canRead ? page.evaluate(() => navigator.clipboard.readText()) : null;
}

test("copy citation puts one line and the sources on the clipboard", async ({
  page,
  browserName,
}) => {
  const shown = await page.getByTestId("record-dates").innerText();
  const text = await copyFromPanel(page, browserName, /copy citation/i, /citation copied/i);
  if (text === null) return; // WebKit: the confirmation above is the evidence
  const [line, heading, first] = text.split("\n");
  expect(line).toContain(NAME);
  expect(line).toContain(shown);
  expect(line).toContain("The Islamic Timeline");
  expect(line).toContain(`/r/${ID}/`);
  expect(line).toMatch(/Accessed \d{1,2} [A-Z][a-z]+ \d{4}\.$/);
  expect(heading).toBe("Sources cited by this record:");
  expect(first).toMatch(/^1\. /);
  expect(text).not.toContain(EM_DASH);
});

test("copy as text carries the summary, connections, sources and both addresses", async ({
  page,
  browserName,
}) => {
  const summary = await page.getByTestId("record-summary").innerText();
  const text = await copyFromPanel(page, browserName, /copy as text/i, /text copied/i);
  if (text === null) return;
  expect(text.startsWith(`${NAME}\n`)).toBe(true);
  expect(text).toContain(summary);
  expect(text).toMatch(/^Students: /m);
  expect(text).toContain("\nSources:\n1. ");
  expect(text).toContain(`Permalink: `);
  expect(text).toContain(`/r/${ID}/`);
  expect(text).toContain(`?sel=${ID}`);
  expect(text).not.toContain(EM_DASH);
});

test("report a problem opens the correction form with this record filled in", async ({
  page,
}) => {
  const panel = page.getByTestId("detail-panel");
  const link = panel.getByRole("link", { name: "Report a problem" });
  await link.scrollIntoViewIfNeeded();
  const href = (await link.getAttribute("href"))!;
  expect(href.startsWith(ISSUES)).toBe(true);
  expect(href).toContain("template=correct-record.yml");
  expect(href).toContain(`record=${ID}`);
  expect(href).toContain(`name=${encodeURIComponent(NAME)}`);
  expect(href).toContain("dates=");
  // the address field carries the selection, so the maintainer lands on it
  expect(decodeURIComponent(href)).toContain(`sel=${ID}`);
  const mail = (await panel
    .getByRole("link", { name: "email a correction" })
    .getAttribute("href"))!;
  expect(mail.startsWith(`mailto:${EMAIL}`)).toBe(true);
  expect(decodeURIComponent(mail)).toContain(`correction for ${ID}`);
});

test("suggest opens the structured form and keeps the email fallback", async ({ page }) => {
  await page.keyboard.press("Escape");
  await expect(page.getByTestId("detail-panel")).toBeHidden();
  await page.getByRole("button", { name: "Suggest a record" }).click();
  const dialog = page.getByRole("dialog", { name: "Suggest a record" });
  await expect(dialog).toBeVisible();
  const proposed = "Fāṭima al-Fihrī";
  await dialog.getByLabel("Name", { exact: true }).fill(proposed);
  const open = dialog.getByRole("link", { name: /open a suggestion/i });
  const href = (await open.getAttribute("href"))!;
  expect(href.startsWith(ISSUES)).toBe(true);
  expect(href).toContain("template=suggest-record.yml");
  expect(href).toContain(`name=${encodeURIComponent(proposed)}`);
  expect(href).toContain("kind=person");
  expect(href).not.toContain("labels=");
  const mail = (await dialog
    .getByRole("link", { name: /email instead/i })
    .getAttribute("href"))!;
  expect(mail.startsWith(`mailto:${EMAIL}`)).toBe(true);
  expect(await dialog.innerHTML()).toContain(EMAIL);
});

import { defineConfig, devices } from "@playwright/test";

/**
 * Two suites run against either a locally served production build or the live
 * site (set E2E_BASE_URL). Chromium and WebKit both matter: a large share of
 * visitors arrive on iPhones.
 *
 * A failed test keeps its trace and a screenshot under test-results/, and on CI
 * an HTML report is written to playwright-report/; the workflow uploads both
 * when the suite fails, so a red run can be read without reproducing it.
 */
const baseURL = process.env.E2E_BASE_URL ?? "http://127.0.0.1:4321/islamictimeline/";

export default defineConfig({
  testDir: "e2e",
  timeout: 120_000,
  expect: { timeout: 15_000 },
  fullyParallel: false,
  workers: process.env.CI ? 2 : 3,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : [["list"]],
  use: {
    baseURL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "off",
  },
  projects: [
    {
      name: "chromium-desktop",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } },
    },
    {
      name: "webkit-desktop",
      use: { ...devices["Desktop Safari"], viewport: { width: 1440, height: 900 } },
    },
    {
      name: "chromium-phone",
      use: { ...devices["Pixel 7"], browserName: "chromium" },
    },
    { name: "webkit-phone", use: { ...devices["iPhone 13"] } },
  ],
  webServer: process.env.E2E_BASE_URL
    ? undefined
    : {
        command: "node scripts/serve-out.mjs",
        url: "http://127.0.0.1:4321/islamictimeline/",
        reuseExistingServer: !process.env.CI,
        timeout: 60_000,
      },
});

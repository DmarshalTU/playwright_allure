import "dotenv/config";
import { defineConfig, devices } from "@playwright/test";
import * as os from "node:os";

/**
 * Friendly defaults for local + CI.
 * Override with env: BASE_URL, BROWSERS, WORKERS, RETRIES
 */
const isCI = !!process.env.CI;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 1 : 0,
  workers: process.env.WORKERS
    ? Number(process.env.WORKERS)
    : isCI
      ? 2
      : undefined,
  timeout: 60_000,
  expect: { timeout: 10_000 },

  reporter: [
    ["list"],
    ["html", { open: "never", outputFolder: "playwright-report" }],
    [
      "allure-playwright",
      {
        resultsDir: "allure-results",
        detail: true,
        suiteTitle: true,
        environmentInfo: {
          os_platform: os.platform(),
          os_release: os.release(),
          node_version: process.version,
          base_url: process.env.BASE_URL ?? "https://demo.playwright.dev",
          ci: isCI ? "true" : "false",
        },
      },
    ],
  ],

  use: {
    baseURL: process.env.BASE_URL ?? "https://demo.playwright.dev",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    actionTimeout: 15_000,
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    // Opt-in browsers: npm run test:firefox / test:webkit
    // Or CI with project=all / project=firefox
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
});

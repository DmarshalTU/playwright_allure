import { test, expect } from "@playwright/test";
import * as allure from "allure-js-commons";

test.describe("Playwright docs @docs @smoke", () => {
  test.use({ baseURL: "https://playwright.dev" });

  test("docs home is reachable @smoke @docs", async ({ page }) => {
    await allure.epic("External sites");
    await allure.feature("playwright.dev");
    await allure.severity("normal");
    await allure.tags("smoke", "docs");

    await page.goto("/");
    await expect(page).toHaveTitle(/Playwright/);
    await expect(page.getByRole("link", { name: "Get started" })).toBeVisible();
  });
});

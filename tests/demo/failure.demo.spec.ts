import { test, expect } from "@playwright/test";
import * as allure from "allure-js-commons";
import { ContentType } from "allure-js-commons";

/**
 * Intentionally fails so you can see failure attachments
 * (screenshot / video / trace) inside Allure.
 * Skip in bulk green runs with: npm run test:smoke
 * Or exclude with: npx playwright test --grep-invert @demo-fail
 */
test.describe("Demo failure (for report showcase) @demo-fail", () => {
  test("shows rich failure details in Allure @demo-fail", async ({ page }) => {
    await allure.epic("Reporting");
    await allure.feature("Allure attachments");
    await allure.story("Failure showcase");
    await allure.severity("trivial");
    await allure.tags("demo-fail", "attachments");
    await allure.description(
      "This test is meant to fail. Use it to verify screenshots, video, and traces appear in Allure.",
    );

    await page.goto("/todomvc/");

    await allure.attachment(
      "run-notes",
      "Expected failure for report demo. Exclude with --grep-invert @demo-fail",
      ContentType.TEXT,
    );

    await allure.step("Assert something that will fail", async () => {
      await expect(
        page.getByRole("heading", { name: "this heading does not exist" }),
      ).toBeVisible({ timeout: 3_000 });
    });
  });
});

import { test, expect } from "@playwright/test";
import * as allure from "allure-js-commons";

test.describe("TodoMVC — smoke @smoke", () => {
  test.beforeEach(async ({ page }) => {
    await allure.epic("Demo app");
    await allure.feature("TodoMVC");
    await allure.story("Smoke checks");
    await page.goto("/todomvc/");
  });

  test("loads the app shell @smoke", async ({ page }) => {
    await allure.severity("critical");
    await allure.owner("qa-team");
    await allure.tags("smoke", "todomvc");

    await allure.step("Check heading and input are visible", async () => {
      await expect(page.getByRole("heading", { name: "todos" })).toBeVisible();
      await expect(page.getByPlaceholder("What needs to be done?")).toBeVisible();
    });
  });

  test("can add a single todo @smoke", async ({ page }) => {
    await allure.severity("critical");
    await allure.tags("smoke", "create");

    const title = "Buy milk";

    await allure.step(`Create todo: ${title}`, async () => {
      await page.getByPlaceholder("What needs to be done?").fill(title);
      await page.getByPlaceholder("What needs to be done?").press("Enter");
    });

    await allure.step("Verify todo appears in the list", async () => {
      await expect(page.getByTestId("todo-title")).toHaveText([title]);
      await expect(page.getByTestId("todo-count")).toContainText("1");
    });
  });
});

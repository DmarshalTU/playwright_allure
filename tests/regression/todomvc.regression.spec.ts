import { test, expect } from "@playwright/test";
import * as allure from "allure-js-commons";

const todos = ["Write tests", "Review Allure report", "Ship CI"];

test.describe("TodoMVC — regression @regression", () => {
  test.beforeEach(async ({ page }) => {
    await allure.epic("Demo app");
    await allure.feature("TodoMVC");
    await allure.story("Full user flows");
    await page.goto("/todomvc/");
  });

  test("add, complete, and clear multiple todos @regression", async ({ page }) => {
    await allure.severity("normal");
    await allure.tags("regression", "crud");
    await allure.description(
      "Creates several todos, completes one, then clears completed items.",
    );

    await allure.step("Create several todos", async () => {
      for (const title of todos) {
        await allure.parameter("todo", title);
        await page.getByPlaceholder("What needs to be done?").fill(title);
        await page.getByPlaceholder("What needs to be done?").press("Enter");
      }
      await expect(page.getByTestId("todo-title")).toHaveCount(todos.length);
    });

    await allure.step("Complete the first todo", async () => {
      await page.getByTestId("todo-item").first().getByRole("checkbox").check();
      await expect(page.getByTestId("todo-item").first()).toHaveClass(/completed/);
    });

    await allure.step("Filter to Active", async () => {
      await page.getByRole("link", { name: "Active" }).click();
      await expect(page.getByTestId("todo-title")).toHaveCount(todos.length - 1);
    });

    await allure.step("Clear completed", async () => {
      await page.getByRole("link", { name: "All" }).click();
      await page.getByRole("button", { name: "Clear completed" }).click();
      await expect(page.getByTestId("todo-title")).toHaveCount(todos.length - 1);
    });
  });

  for (const title of ["alpha", "beta", "gamma"]) {
    test(`parametrized create: ${title} @regression`, async ({ page }) => {
      await allure.severity("minor");
      await allure.parameter("title", title);
      await allure.tags("regression", "parametrized");

      await page.getByPlaceholder("What needs to be done?").fill(title);
      await page.getByPlaceholder("What needs to be done?").press("Enter");
      await expect(page.getByTestId("todo-title")).toHaveText([title]);
    });
  }

  test("editing a todo updates the list @regression", async ({ page }) => {
    await allure.severity("normal");
    await allure.tags("regression", "edit");

    await page.getByPlaceholder("What needs to be done?").fill("old name");
    await page.getByPlaceholder("What needs to be done?").press("Enter");

    await allure.step("Double-click and rename", async () => {
      const item = page.getByTestId("todo-item").first();
      await item.dblclick();
      const edit = item.getByRole("textbox");
      await edit.fill("new name");
      await edit.press("Enter");
    });

    await expect(page.getByTestId("todo-title")).toHaveText(["new name"]);
  });
});

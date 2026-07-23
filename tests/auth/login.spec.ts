import { test, expect } from "@playwright/test";
import * as allure from "allure-js-commons";
import {
  getLoginSecrets,
  hasLoginSecrets,
  maskSecret,
} from "../helpers/secrets";

test.describe("Login flow @auth @login @smoke", () => {
  test.beforeEach(async () => {
    test.skip(
      !hasLoginSecrets(),
      "Set TEST_USERNAME and TEST_PASSWORD (see .env.example / GitHub Secrets)",
    );

    await allure.epic("Authentication");
    await allure.feature("Login");
    await allure.tags("auth", "login", "secrets");
  });

  test("logs in with credentials from secrets @auth @login @smoke", async ({
    page,
  }) => {
    const secrets = getLoginSecrets();

    await allure.severity("critical");
    await allure.owner("qa-team");
    await allure.description(
      "Uses TEST_USERNAME / TEST_PASSWORD from env or GitHub Actions secrets. " +
        "Password is never written to the report in clear text.",
    );
    await allure.parameter("username", secrets.username);
    await allure.parameter("password", maskSecret(secrets.password), {
      excluded: true,
    });
    await allure.parameter("loginUrl", secrets.loginUrl);

    await allure.step("Open login page", async () => {
      await page.goto(secrets.loginUrl);
      await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
    });

    await allure.step("Submit credentials", async () => {
      await page.locator("#username").fill(secrets.username);
      await page.locator("#password").fill(secrets.password);
      await page.getByRole("button", { name: "Login" }).click();
    });

    await allure.step("Verify authenticated landing page", async () => {
      await expect(page).toHaveURL(/\/secure/);
      await expect(page.getByText("You logged into a secure area!")).toBeVisible();
      await expect(page.getByRole("link", { name: "Logout" })).toBeVisible();
    });
  });

  test("rejects wrong password without leaking secrets @auth @login", async ({
    page,
  }) => {
    const secrets = getLoginSecrets();

    await allure.severity("normal");
    await allure.story("Negative login");

    await page.goto(secrets.loginUrl);
    await page.locator("#username").fill(secrets.username);
    await page.locator("#password").fill("definitely-wrong-password");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.locator("#flash")).toContainText(
      "Your password is invalid!",
    );
    await expect(page).not.toHaveURL(/\/secure/);
  });
});

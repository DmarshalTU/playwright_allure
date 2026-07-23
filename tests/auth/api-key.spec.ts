import { test, expect } from "@playwright/test";
import * as allure from "allure-js-commons";
import { getApiKey, hasApiKey, maskSecret } from "../helpers/secrets";

/**
 * Shows how to pass API keys / tokens from secrets into HTTP calls
 * without printing the raw value into Allure.
 */
test.describe("API key auth @auth @api", () => {
  test("authorized request uses API_KEY secret @auth @api @smoke", async ({
    request,
  }) => {
    test.skip(!hasApiKey(), "Set API_KEY (see .env.example / GitHub Secrets)");

    const apiKey = getApiKey();

    await allure.epic("Authentication");
    await allure.feature("API");
    await allure.severity("critical");
    await allure.tags("auth", "api", "secrets");
    await allure.parameter("apiKey", maskSecret(apiKey), { excluded: true });

    const response = await allure.step(
      "Call bearer endpoint with API key",
      async () => {
        return request.get("https://httpbin.org/bearer", {
          headers: { Authorization: `Bearer ${apiKey}` },
        });
      },
    );

    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body.authenticated).toBe(true);
    expect(body.token).toBe(apiKey);
  });
});

import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

test("home page has expected h1", async ({ page }) => {
  await page.goto("/");
  await waitForHydration(page);
  await expect(page.locator("h1")).toBeVisible();
});

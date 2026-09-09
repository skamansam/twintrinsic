import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site tests for the LTR/RTL text-direction toggle. The toggle sets
 * `document.documentElement.dir` (driving the logical `text-start`/`text-end`
 * utilities) and persists the choice to localStorage.
 */
test.describe("Docs direction toggle", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs");
    await waitForHydration(page);
  });

  test("starts in LTR mode", async ({ page }) => {
    await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
    const toggle = page.getByTestId("dir-toggle");
    await expect(toggle).toBeVisible();
    await expect(toggle).toHaveText("LTR");
  });

  test("flips the document direction to RTL and back", async ({ page }) => {
    const toggle = page.getByTestId("dir-toggle");
    await toggle.click();
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    await expect(toggle).toHaveText("RTL");

    await toggle.click();
    await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
    await expect(toggle).toHaveText("LTR");
  });

  test("persists the direction across reloads", async ({ page }) => {
    await page.getByTestId("dir-toggle").click();
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");

    await page.reload();
    await waitForHydration(page);
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    await expect(page.getByTestId("dir-toggle")).toHaveText("RTL");
  });
});

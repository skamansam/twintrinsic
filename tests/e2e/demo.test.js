import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site e2e tests for the Paraglide i18n demo pages.
 *
 * Targets `/demo` (translated landing) and `/demo/paraglide` (i18n
 * showcase). Locale switches reload the page via the cookie strategy, so
 * each switch re-waits for hydration and asserts on the fresh render.
 */
test.describe("i18n demo pages", () => {
  test("landing page renders English by default and translates to Persian with RTL", async ({
    page,
  }) => {
    await page.goto("/demo");
    await waitForHydration(page);

    await expect(page.locator("h1")).toHaveText("Component Demos");
    await expect(page.locator("html")).toHaveAttribute("dir", "ltr");

    // Switch to Persian — the page reloads and flips to RTL
    await page.getByRole("button", { name: "فارسی" }).click();
    await waitForHydration(page);

    await expect(page.locator("h1")).toHaveText("دموی کامپوننت‌ها");
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  });

  test("paraglide demo shows pluralization and a component-level message", async ({ page }) => {
    await page.goto("/demo/paraglide");
    await waitForHydration(page);

    await expect(page.locator("h1")).toHaveText("Paraglide i18n Demo");
    await expect(page.getByTestId("pg-plural")).toHaveText("1 item selected");
    await expect(page.getByTestId("pg-badge")).toHaveText("Demo badge");

    // Increment the count — the plural form switches
    await page.getByTestId("pg-increase").click();
    await expect(page.getByTestId("pg-count")).toHaveText("2");
    await expect(page.getByTestId("pg-plural")).toHaveText("2 items selected");

    // Decrement back to one
    await page.getByTestId("pg-decrease").click();
    await expect(page.getByTestId("pg-plural")).toHaveText("1 item selected");
  });

  test("paraglide demo translates fully to Persian and flips the badge", async ({ page }) => {
    await page.goto("/demo/paraglide");
    await waitForHydration(page);

    await page.getByRole("button", { name: "فارسی" }).click();
    await waitForHydration(page);

    await expect(page.locator("h1")).toHaveText("دموی i18n با پاراگلاید");
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    await expect(page.getByTestId("pg-badge")).toHaveText("نشان دمو");
    await expect(page.getByTestId("pg-plural")).toContainText("مورد انتخاب شده");
  });
});

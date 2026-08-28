import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site smoke tests for the Calendar component.
 *
 * The Calendar now wraps a native `<input type="date">` — the browser's
 * built-in date picker handles the calendar UI, so we verify the input
 * renders correctly and responds to user interaction.
 */
test.describe("Calendar docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Form/Calendar");
    await waitForHydration(page);
  });

  test("renders the docs page with all live examples", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Calendar", level: 1 })).toBeVisible();
    await expect(page.getByTestId("calendar-basic")).toBeVisible();
    await expect(page.getByTestId("calendar-with-value")).toBeVisible();
    await expect(page.getByTestId("calendar-min-max")).toBeVisible();
    await expect(page.getByTestId("calendar-disabled")).toBeVisible();
    await expect(page.getByTestId("calendar-range")).toBeVisible();
  });

  test("renders native date inputs", async ({ page }) => {
    const basicExample = page.getByTestId("calendar-basic");
    const input = basicExample.locator("input");
    await expect(input).toHaveAttribute("type", "date");
  });

  test("pre-filled example shows the correct value", async ({ page }) => {
    const example = page.getByTestId("calendar-with-value");
    const input = example.locator("input");
    await expect(input).toHaveValue("2026-04-07");
  });

  test("min/max example has correct attributes", async ({ page }) => {
    const example = page.getByTestId("calendar-min-max");
    const input = example.locator("input");
    await expect(input).toHaveAttribute("min", "2026-04-01");
    await expect(input).toHaveAttribute("max", "2026-04-30");
  });

  test("disabled example is disabled", async ({ page }) => {
    const example = page.getByTestId("calendar-disabled");
    const input = example.locator("input");
    await expect(input).toBeDisabled();
  });

  test("range example shows two date inputs", async ({ page }) => {
    const example = page.getByTestId("calendar-range");
    const inputs = example.locator("input[type='date']");
    await expect(inputs).toHaveCount(2);
  });
});

import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site smoke tests for the Calendar component.
 *
 * Component-level behavior (date selection, range picking, min/max
 * enforcement, keyboard navigation, custom formats) is covered by the
 * Storybook vitest suite (`pnpm test:storybook`).
 *
 * These tests verify the docs landing page renders the live examples
 * (`data-testid="calendar-*"` hooks) and that opening/closing the
 * calendar popover works. No hard-coded dates are asserted — the docs
 * examples open on the current month.
 */
test.describe("Calendar docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Form/Calendar");
    await waitForHydration(page);
  });

  test("renders the docs page with all live examples", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Calendar", level: 1 })).toBeVisible();
    await expect(page.getByTestId("calendar-basic")).toBeVisible();
    await expect(page.getByTestId("calendar-range")).toBeVisible();
    await expect(page.getByTestId("calendar-min-max")).toBeVisible();
    await expect(page.getByTestId("calendar-week-numbers")).toBeVisible();
  });

  test("opens the calendar popover when the input is clicked", async ({ page }) => {
    const example = page.getByTestId("calendar-basic");
    const input = example.locator("input");

    await input.click();
    const calendar = example.locator(".calendar");
    await expect(calendar).toBeVisible();

    // Day-name header row (7 columns)
    await expect(calendar.locator(".calendar-day").first()).toBeVisible();
    await expect(calendar.locator(".calendar-title")).toBeVisible();
  });

  test("closes the calendar with Escape", async ({ page }) => {
    const example = page.getByTestId("calendar-basic");
    const input = example.locator("input");

    await input.click();
    await expect(example.locator(".calendar")).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(example.locator(".calendar")).not.toBeVisible();
  });

  test("range example renders its inputs", async ({ page }) => {
    const example = page.getByTestId("calendar-range");
    await expect(example.locator(".calendar-container").first()).toBeVisible();
  });

  test("week-numbers example shows the week column when open", async ({ page }) => {
    const example = page.getByTestId("calendar-week-numbers");
    await example.locator("input").click();
    const weekNumbers = example.locator(".calendar-week");
    await expect(weekNumbers.first()).toBeVisible();
  });
});

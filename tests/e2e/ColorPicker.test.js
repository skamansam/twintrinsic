import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site smoke tests for the ColorPicker component.
 *
 * Component-level behavior (color-wheel interaction, sliders, direct
 * input, keyboard support) is covered by the Storybook vitest suite
 * (`pnpm test:storybook`).
 *
 * These tests verify the docs landing page renders the live examples
 * (`data-testid="colorpicker-*"` hooks), that each format example
 * pre-fills its input value, and that the popover opens/closes.
 */
test.describe("ColorPicker docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Form/ColorPicker");
    await waitForHydration(page);
  });

  test("renders the docs page with all live examples", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "ColorPicker", level: 1 })).toBeVisible();
    for (const id of [
      "colorpicker-basic",
      "colorpicker-value",
      "colorpicker-rgb",
      "colorpicker-rgba",
      "colorpicker-hsl",
      "colorpicker-error",
      "colorpicker-theme",
    ]) {
      // The theme example renders two pickers (primary + secondary)
      await expect(page.getByTestId(id).locator(".color-picker").first()).toBeVisible();
    }
  });

  test("basic example renders a labeled color input", async ({ page }) => {
    const example = page.getByTestId("colorpicker-basic");
    const input = example.locator(".color-picker input").first();
    await expect(input).toHaveValue("#000000");
    await expect(example.locator(".color-picker label").first()).toHaveText("Color");
  });

  test("opens the popover with the color wheel on click", async ({ page }) => {
    const example = page.getByTestId("colorpicker-basic");
    const input = example.locator(".color-picker input").first();

    await input.click();
    const popup = example.locator(".color-picker-popup");
    await expect(popup).toBeVisible();
    await expect(popup.locator(".color-wheel")).toBeVisible();
  });

  test("closes the popover with Escape", async ({ page }) => {
    const example = page.getByTestId("colorpicker-basic");
    const input = example.locator(".color-picker input").first();

    await input.click();
    await expect(example.locator(".color-picker-popup")).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(example.locator(".color-picker-popup")).not.toBeVisible();
  });

  test("format examples pre-fill values in their formats", async ({ page }) => {
    const rgb = page.getByTestId("colorpicker-rgb").locator(".color-picker input").first();
    await expect(rgb).toHaveValue(/rgb\(\d+,\s*\d+,\s*\d+\)/);

    const rgba = page.getByTestId("colorpicker-rgba").locator(".color-picker input").first();
    await expect(rgba).toHaveValue(/rgba\(\d+,\s*\d+,\s*\d+,\s*0\.5\)/);

    const hsl = page.getByTestId("colorpicker-hsl").locator(".color-picker input").first();
    await expect(hsl).toHaveValue(/hsl\(\d+,\s*\d+%,\s*\d+%\)/);
  });

  test("error example shows the error message", async ({ page }) => {
    const example = page.getByTestId("colorpicker-error");
    const input = example.locator(".color-picker input").first();
    await expect(input).toHaveAttribute("aria-invalid", "true");

    // The error text renders once the field is touched (blurred).
    // Focus the input then Tab away to trigger the blur handler.
    await input.focus();
    await page.keyboard.press("Tab");
    await expect(example.getByText("Please select a valid color")).toBeVisible();
  });
});

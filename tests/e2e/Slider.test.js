import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site interaction + accessibility tests for the Slider component.
 *
 * Targets `/docs/components/Form/Slider`. The docs examples lack `data-testid`,
 * so selectors use the native `input[type="range"]` (`role="slider"`). Verifies
 * the range value, keyboard adjustment, and the disabled state.
 */
test.describe("Slider docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Form/Slider");
    await waitForHydration(page);
  });

  test("renders the docs page with sliders", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Slider", level: 1 })).toBeVisible();
    await expect(page.getByRole("slider").first()).toBeVisible();
  });

  test("basic slider exposes the initial value", async ({ page }) => {
    await expect(page.getByRole("slider").first()).toHaveValue("50");
  });

  test("keyboard arrow increases the slider value", async ({ page }) => {
    const slider = page.getByRole("slider").first();
    await slider.focus();
    await page.keyboard.press("ArrowRight");
    await expect(slider).toHaveValue("51");
  });

  test("keyboard arrow decreases the slider value", async ({ page }) => {
    const slider = page.getByRole("slider").first();
    await slider.focus();
    await page.keyboard.press("ArrowLeft");
    await expect(slider).toHaveValue("49");
  });

  test("disabled slider is not interactive", async ({ page }) => {
    await expect(page.locator('input[type="range"]:disabled').first()).toBeDisabled();
  });
});

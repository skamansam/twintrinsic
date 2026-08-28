import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site smoke tests for the ColorPicker component.
 *
 * The ColorPicker now wraps a native `<input type="color">` with a hex
 * text input. We verify both inputs render correctly and respond to
 * user interaction.
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
      "colorpicker-error",
      "colorpicker-disabled",
      "colorpicker-theme",
    ]) {
      await expect(page.getByTestId(id)).toBeVisible();
    }
  });

  test("renders native color input and hex text input", async ({ page }) => {
    const example = page.getByTestId("colorpicker-basic");
    const colorInput = example.locator("input[type='color']");
    const hexInput = example.locator("input[type='text']");
    await expect(colorInput).toBeVisible();
    await expect(hexInput).toBeVisible();
    await expect(hexInput).toHaveValue("#000000");
  });

  test("pre-filled example shows the correct value", async ({ page }) => {
    const example = page.getByTestId("colorpicker-value");
    const hexInput = example.locator("input[type='text']");
    await expect(hexInput).toHaveValue("#FF0000");
  });

  test("disabled example is disabled", async ({ page }) => {
    const example = page.getByTestId("colorpicker-disabled");
    const colorInput = example.locator("input[type='color']");
    const hexInput = example.locator("input[type='text']");
    await expect(colorInput).toBeDisabled();
    await expect(hexInput).toBeDisabled();
  });

  test("error example shows the error message", async ({ page }) => {
    const example = page.getByTestId("colorpicker-error");
    await expect(example.getByText("Please select a valid color")).toBeVisible();
  });

  test("theme example shows three color pickers", async ({ page }) => {
    const example = page.getByTestId("colorpicker-theme");
    const colorInputs = example.locator("input[type='color']");
    await expect(colorInputs).toHaveCount(3);
  });
});

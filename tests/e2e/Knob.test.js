import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site interaction + accessibility tests for the Knob component.
 *
 * Targets `/docs/components/Form/Knob`. Each demo exposes a `data-testid`
 * wrapper (`knob-basic-usage`, ...). Knobs render with `role="slider"` and
 * expose aria-valuemin/max/now.
 */
test.describe("Knob docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Form/Knob");
    await waitForHydration(page);
  });

  test("renders the docs page heading", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Knob", level: 1 })).toBeVisible();
  });

  test("basic knob exposes slider semantics", async ({ page }) => {
    const demo = page.getByTestId("knob-basic-usage");
    const slider = demo.getByRole("slider");
    await expect(slider).toHaveAttribute("aria-valuemin", "0");
    await expect(slider).toHaveAttribute("aria-valuemax", "100");
    await expect(slider).toHaveAttribute("aria-valuenow", "50");
  });

  test("keyboard interaction changes the value", async ({ page }) => {
    const demo = page.getByTestId("knob-basic-usage");
    const slider = demo.getByRole("slider");
    await slider.focus();
    await slider.press("ArrowRight");
    await expect(slider).toHaveAttribute("aria-valuenow", "51");
    await slider.press("Home");
    await expect(slider).toHaveAttribute("aria-valuenow", "0");
    await slider.press("End");
    await expect(slider).toHaveAttribute("aria-valuenow", "100");
  });

  test("value display shows the templated value", async ({ page }) => {
    const demo = page.getByTestId("knob-value-display");
    await expect(demo).toContainText("75%");
  });

  test("disabled knob is not interactive", async ({ page }) => {
    const demo = page.getByTestId("knob-disabled-state");
    const slider = demo.getByRole("slider");
    await expect(slider).toHaveAttribute("aria-disabled", "true");
    await slider.press("ArrowRight");
    await expect(slider).toHaveAttribute("aria-valuenow", "65");
  });

  test("form-field knob respects step and template", async ({ page }) => {
    const demo = page.getByTestId("knob-formfield");
    await expect(demo).toContainText("22°C");
    const slider = demo.getByRole("slider");
    await expect(slider).toHaveAttribute("aria-valuenow", "22");
  });
});

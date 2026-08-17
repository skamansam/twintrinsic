import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site interaction + accessibility tests for the InputSwitch component.
 *
 * Targets `/docs/components/Form/InputSwitch`. The switch is a native
 * `<input type="checkbox">` (sr-only) wrapped in a label, so interactions
 * click the visible label text and state is asserted on the input. Examples
 * are scoped via data-testid (input-switch-basic, input-switch-initial,
 * input-switch-sizes, input-switch-disabled, input-switch-required,
 * input-switch-nolabel, input-switch-formfield).
 */
test.describe("InputSwitch docs page", () => {
  test("basic switch toggles on click", async ({ page }) => {
    await page.goto("/docs/components/Form/InputSwitch");
    await waitForHydration(page);

    const example = page.getByTestId("input-switch-basic");
    const switchInput = example.getByRole("checkbox", { name: "Enable notifications" });
    await expect(switchInput).not.toBeChecked();

    await example.getByText("Enable notifications").click();
    await expect(switchInput).toBeChecked();

    await example.getByText("Enable notifications").click();
    await expect(switchInput).not.toBeChecked();
  });

  test("switch with initial value renders checked", async ({ page }) => {
    await page.goto("/docs/components/Form/InputSwitch");
    await waitForHydration(page);

    const example = page.getByTestId("input-switch-initial");
    await expect(example.getByRole("checkbox", { name: "Dark mode" })).toBeChecked();
  });

  test("sizes render three labeled switches", async ({ page }) => {
    await page.goto("/docs/components/Form/InputSwitch");
    await waitForHydration(page);

    const example = page.getByTestId("input-switch-sizes");
    await expect(example.getByRole("checkbox", { name: "Small" })).toBeVisible();
    await expect(example.getByRole("checkbox", { name: "Medium (default)" })).toBeVisible();
    await expect(example.getByRole("checkbox", { name: "Large" })).toBeVisible();
  });

  test("disabled switches are disabled and reflect their checked state", async ({ page }) => {
    await page.goto("/docs/components/Form/InputSwitch");
    await waitForHydration(page);

    const example = page.getByTestId("input-switch-disabled");
    const off = example.getByRole("checkbox", { name: "Disabled (off)" });
    const on = example.getByRole("checkbox", { name: "Disabled (on)" });
    await expect(off).toBeDisabled();
    await expect(on).toBeDisabled();
    await expect(off).not.toBeChecked();
    await expect(on).toBeChecked();
  });

  test("required switch carries the required attribute", async ({ page }) => {
    await page.goto("/docs/components/Form/InputSwitch");
    await waitForHydration(page);

    const example = page.getByTestId("input-switch-required");
    await expect(example.getByRole("checkbox", { name: "I agree to the terms" })).toHaveAttribute(
      "required",
      "",
    );
  });

  test("switch without a visible label uses its aria-label", async ({ page }) => {
    await page.goto("/docs/components/Form/InputSwitch");
    await waitForHydration(page);

    const example = page.getByTestId("input-switch-nolabel");
    const switchInput = example.getByRole("checkbox", { name: "Toggle airplane mode" });
    await expect(switchInput).not.toBeChecked();
    await switchInput.check({ force: true });
    await expect(switchInput).toBeChecked();
  });

  test("switches inside a form field render with their labels", async ({ page }) => {
    await page.goto("/docs/components/Form/InputSwitch");
    await waitForHydration(page);

    const example = page.getByTestId("input-switch-formfield");
    for (const label of ["Email notifications", "SMS notifications", "Push notifications"]) {
      await expect(example.getByRole("checkbox", { name: label })).toBeVisible();
    }
  });
});

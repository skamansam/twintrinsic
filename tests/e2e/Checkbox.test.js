import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site smoke tests for the Checkbox component.
 *
 * Component-level behavior (indeterminate toggle, disabled states,
 * keyboard Space toggling, group semantics) is covered by the
 * Storybook vitest suite (`pnpm test:storybook`).
 *
 * These tests verify the docs landing page renders the live examples
 * (`data-testid="checkbox-*"` hooks) and that basic check/uncheck,
 * description, required, error, disabled, and group examples behave on
 * the page.
 */
test.describe("Checkbox docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Form/Checkbox");
    await waitForHydration(page);
  });

  test("renders the docs page with all live examples", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Checkbox", level: 1 })).toBeVisible();
    for (const id of [
      "checkbox-basic",
      "checkbox-description",
      "checkbox-indeterminate",
      "checkbox-required",
      "checkbox-error",
      "checkbox-disabled",
      "checkbox-group",
    ]) {
      await expect(page.getByTestId(id)).toBeVisible();
    }
  });

  test("basic checkbox toggles check state", async ({ page }) => {
    const checkbox = page.getByTestId("checkbox-basic").locator("input[type='checkbox']");
    await expect(checkbox).not.toBeChecked();

    await checkbox.check();
    await expect(checkbox).toBeChecked();

    await checkbox.uncheck();
    await expect(checkbox).not.toBeChecked();
  });

  test("description example shows the description text", async ({ page }) => {
    const example = page.getByTestId("checkbox-description");
    await expect(example.locator(".checkbox-description")).toHaveText(
      "Receive updates about new features and announcements",
    );
  });

  test("indeterminate example sets the indeterminate property", async ({ page }) => {
    const input = page.getByTestId("checkbox-indeterminate").locator("input[type='checkbox']");
    await expect(input).toHaveJSProperty("indeterminate", true);
  });

  test("required example marks the input required", async ({ page }) => {
    const input = page.getByTestId("checkbox-required").locator("input[type='checkbox']");
    await expect(input).toHaveAttribute("required", "");
    await expect(page.getByTestId("checkbox-required").locator(".checkbox-required")).toBeVisible();
  });

  test("error example links the error message to the input", async ({ page }) => {
    const example = page.getByTestId("checkbox-error");
    const input = example.locator("input[type='checkbox']");
    await expect(input).toHaveAttribute("aria-invalid", "true");

    const error = example.locator(".checkbox-error-text");
    await expect(error).toBeVisible();
    await expect(error).toHaveText("You must accept the privacy policy");
  });

  test("disabled example renders disabled checkboxes", async ({ page }) => {
    const example = page.getByTestId("checkbox-disabled");
    const inputs = example.locator("input[type='checkbox']");
    await expect(inputs).toHaveCount(2);
    for (const input of await inputs.all()) {
      await expect(input).toBeDisabled();
    }
  });

  test("group example exposes three independent checkboxes", async ({ page }) => {
    const example = page.getByTestId("checkbox-group");
    const inputs = example.locator("input[type='checkbox']");
    await expect(inputs).toHaveCount(3);

    await inputs.nth(0).check();
    await inputs.nth(2).check();
    await expect(inputs.nth(0)).toBeChecked();
    await expect(inputs.nth(1)).not.toBeChecked();
    await expect(inputs.nth(2)).toBeChecked();
  });
});

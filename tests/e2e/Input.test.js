import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site smoke tests for the Input component.
 *
 * Component-level behavior (floating-label animation, masking,
 * readonly/disabled/required states, icon click handlers) is covered
 * by the Storybook vitest suite (`pnpm test:storybook`).
 *
 * These tests verify the docs landing page renders the live examples
 * (`data-testid="input-*"` hooks) and that typing, error state, and
 * icon rendering behave on the page.
 */
test.describe("Input docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Form/Input");
    await waitForHydration(page);
  });

  test("renders the docs page with all live examples", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Input", level: 1 })).toBeVisible();
    for (const id of [
      "input-basic",
      "input-icons",
      "input-floating",
      "input-error",
      "input-mask",
    ]) {
      await expect(page.getByTestId(id)).toBeVisible();
    }
  });

  test("basic input accepts typed values", async ({ page }) => {
    const example = page.getByTestId("input-basic");
    const input = example.getByLabel("Username");
    await expect(input).toHaveAttribute("type", "text");

    await input.fill("test user");
    await expect(input).toHaveValue("test user");
  });

  test("icons example renders left and right icons", async ({ page }) => {
    const example = page.getByTestId("input-icons");
    await expect(example.locator(".form-input-icon-left")).toBeVisible();
    await expect(example.locator(".form-input-icon-right")).toBeVisible();
  });

  test("floating label example floats the label on focus", async ({ page }) => {
    const example = page.getByTestId("input-floating");
    const input = example.getByLabel("Email");

    await expect(example.locator(".form-input-container")).toHaveClass(/form-input-floating/);
    await expect(example.locator("label")).not.toHaveClass(/form-input-label-float/);

    await input.focus();
    await expect(example.locator("label")).toHaveClass(/form-input-label-float/);
  });

  test("error example surfaces the error after interaction", async ({ page }) => {
    const example = page.getByTestId("input-error");
    const input = example.getByLabel("Email");
    await expect(input).toHaveAttribute("aria-invalid", "true");

    await input.click();
    await input.blur();
    await expect(example.locator(".form-input-error-text")).toBeVisible();
    await expect(example.locator(".form-input-error-text")).toHaveText(
      "Please enter a valid email address",
    );
  });

  test("mask example formats input as a phone number", async ({ page }) => {
    const example = page.getByTestId("input-mask");
    const input = example.getByLabel("Phone");

    await input.pressSequentially("5555555555");
    await expect(input).toHaveValue("(555) 555-5555");
  });
});

import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site smoke tests for the Separator component.
 *
 * Component-level behavior (ARIA attributes, color variants) is
 * covered by the Storybook vitest suite (`pnpm test:storybook`).
 *
 * These tests verify the docs landing page renders the live examples
 * (`data-testid="separator-*"` hooks) and that the semantic
 * hr-vs-div rendering still holds on the page.
 */
test.describe("Separator docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Separator/Separator");
    await waitForHydration(page);
  });

  test("renders the docs page with all live examples", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Separator", level: 1 })).toBeVisible();
    for (const id of [
      "separator-basic",
      "separator-with-text",
      "separator-with-icon",
      "separator-vertical",
      "separator-color-variants",
    ]) {
      await expect(page.getByTestId(id)).toBeVisible();
    }
  });

  test("basic separator renders as a horizontal hr", async ({ page }) => {
    const separator = page.getByTestId("separator-basic").locator("hr.separator");
    await expect(separator).toBeVisible();
    await expect(separator).toHaveClass(/separator-horizontal/);
    await expect(separator).not.toHaveClass(/separator-with-content/);
  });

  test("separator with text renders as a div with centered content", async ({ page }) => {
    const separator = page.getByTestId("separator-with-text").locator("div.separator");
    await expect(separator).toBeVisible();
    await expect(separator).toHaveClass(/separator-with-content/);
    await expect(separator).toHaveAttribute("role", "separator");
    await expect(separator.locator(".separator-content")).toHaveText("or");
  });

  test("separator with icon renders an svg in the content", async ({ page }) => {
    const separator = page.getByTestId("separator-with-icon").locator("div.separator");
    await expect(separator).toHaveClass(/separator-with-content/);
    await expect(separator.locator(".separator-content svg")).toBeVisible();
  });

  test("vertical separator exposes vertical orientation", async ({ page }) => {
    const separator = page.getByTestId("separator-vertical").locator(".separator");
    await expect(separator).toBeVisible();
    await expect(separator).toHaveClass(/separator-vertical/);
    await expect(separator).toHaveAttribute("aria-orientation", "vertical");
  });

  test("color variants example renders all five separators", async ({ page }) => {
    const separators = page.getByTestId("separator-color-variants").locator(".separator");
    await expect(separators).toHaveCount(5);
    await expect(separators.nth(0)).toContainText("Default");
    await expect(separators.nth(1)).toContainText("Primary");
    await expect(separators.nth(4)).toContainText("Error");
  });
});

import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site smoke tests for the Panel component.
 *
 * Component-level behavior (keyboard toggle, borderless rendering) is
 * covered by the Storybook vitest suite (`pnpm test:storybook`).
 *
 * These tests verify the docs landing page renders the live examples
 * (`data-testid="panel-*"` hooks) and that the header button toggles
 * the content region, including the disabled variant.
 */
test.describe("Panel docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Panel/Panel");
    await waitForHydration(page);
  });

  test("renders the docs page with all live examples", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Panel", level: 1 })).toBeVisible();
    await expect(page.getByTestId("panel-basic")).toBeVisible();
    await expect(page.getByTestId("panel-custom-header")).toBeVisible();
    await expect(page.getByTestId("panel-disabled")).toBeVisible();
    await expect(page.getByTestId("panel-borderless")).toBeVisible();
  });

  test("basic panel renders expanded with a bordered container", async ({ page }) => {
    const panel = page.getByTestId("panel-basic").locator(".panel");
    await expect(panel).toBeVisible();
    await expect(panel).toHaveClass(/border/);

    const header = panel.locator("button").first();
    await expect(header).toHaveAttribute("aria-expanded", "true");
    await expect(panel.locator('[role="region"]')).toBeVisible();
  });

  test("header button toggles the content region", async ({ page }) => {
    const panel = page.getByTestId("panel-basic").locator(".panel");
    const header = panel.locator("button").first();

    await header.click();
    await expect(header).toHaveAttribute("aria-expanded", "false");
    await expect(panel.locator('[role="region"]')).not.toBeVisible();

    await header.click();
    await expect(header).toHaveAttribute("aria-expanded", "true");
    await expect(panel.locator('[role="region"]')).toBeVisible();
  });

  test("disabled panel cannot be toggled", async ({ page }) => {
    const panel = page.getByTestId("panel-disabled").locator(".panel");
    await expect(panel).toHaveClass(/disabled/);

    const header = panel.locator("button").first();
    await expect(header).toBeDisabled();

    await header.click({ force: true });
    await expect(header).toHaveAttribute("aria-expanded", "true");
    await expect(panel.locator('[role="region"]')).toBeVisible();
  });

  test("borderless panel omits border classes", async ({ page }) => {
    const panel = page.getByTestId("panel-borderless").locator(".panel");
    await expect(panel).not.toHaveClass(/border/);
  });
});

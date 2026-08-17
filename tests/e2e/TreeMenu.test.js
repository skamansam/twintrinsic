import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site smoke tests for the TreeMenu component.
 *
 * Component-level behavior (deep hierarchies, keyboard nav, expanded
 * state persistence) is covered by the Storybook vitest suite
 * (`pnpm test:storybook`).
 *
 * These tests verify the docs landing page renders the live examples
 * (`data-testid="treemenu-*"` hooks) and that links, separators,
 * nested expansion, and action buttons work on the page.
 */
test.describe("TreeMenu docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/TreeMenu/TreeMenu");
    await waitForHydration(page);
  });

  test("renders the docs page with all live examples", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "TreeMenu", level: 1 })).toBeVisible();
    await expect(page.getByTestId("treemenu-basic")).toBeVisible();
    await expect(page.getByTestId("treemenu-nested")).toBeVisible();
    await expect(page.getByTestId("treemenu-actions")).toBeVisible();
  });

  test("basic example renders menu items as links", async ({ page }) => {
    const menu = page.getByTestId("treemenu-basic").locator(".tree-menu");
    await expect(menu).toBeVisible();

    await expect(menu.locator('a[href="/"]')).toContainText("Home");
    await expect(menu.locator('a[href="/about"]')).toContainText("About");
    await expect(menu.locator('a[href="/settings"]')).toContainText("Settings");
  });

  test("basic example renders separators", async ({ page }) => {
    const separators = page.getByTestId("treemenu-basic").locator(".tree-menu-separator");
    expect(await separators.count()).toBeGreaterThan(0);
  });

  test("nested example expands and collapses children", async ({ page }) => {
    const example = page.getByTestId("treemenu-nested");

    const fileSummary = example.locator(".tree-menu-summary", { hasText: "File" });
    const newItem = example.getByText("New");

    // Children are collapsed initially
    await expect(newItem).not.toBeVisible();

    // Expand
    await fileSummary.click();
    await expect(newItem).toBeVisible();
    await expect(example.getByText("Open")).toBeVisible();
    await expect(example.getByText("Save")).toBeVisible();

    // Collapse again
    await fileSummary.click();
    await expect(newItem).not.toBeVisible();
  });

  test("actions example triggers the item's onClick handler", async ({ page }) => {
    const example = page.getByTestId("treemenu-actions");

    // The action items live under a collapsed "Actions" group, so
    // expand it before interacting with them
    const actionsSummary = example.locator(".tree-menu-summary", { hasText: "Actions" });
    await actionsSummary.click();

    const createButton = example.locator(".tree-menu-item", { hasText: "Create" });
    await expect(createButton).toBeVisible();

    // Register the dialog handler BEFORE the click: a native `alert()`
    // blocks the renderer, so `locator.click()` only completes once the
    // dialog is dismissed. `waitForEvent` after the click hangs.
    let dialogMessage = "";
    page.once("dialog", async (dialog) => {
      dialogMessage = dialog.message();
      await dialog.accept();
    });
    await createButton.click();
    expect(dialogMessage).toContain("Create clicked");
  });
});

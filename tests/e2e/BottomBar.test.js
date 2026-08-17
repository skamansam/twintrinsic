import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site smoke tests for the BottomBar component.
 *
 * Component-level behavior (keyboard toggle, disabled state, docked /
 * backdrop handling) is covered by the Storybook vitest suite
 * (`pnpm test:storybook`).
 *
 * These tests verify the docs landing page renders the live examples
 * (`data-testid="bottombar-*"` hooks; the docs page mounts them after
 * a 100ms delay to avoid a transition glitch, so Playwright waits for
 * the container to appear) and that the expand/collapse toggle works.
 */
test.describe("BottomBar docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/BottomBar/BottomBar");
    await waitForHydration(page);
  });

  test("renders the docs page with all live examples", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "BottomBar", level: 1 })).toBeVisible();
    await expect(page.getByTestId("bottombar-basic")).toBeVisible();
    await expect(page.getByTestId("bottombar-console")).toBeVisible();
  });

  test("renders the bottom bar expanded with content", async ({ page }) => {
    const example = page.getByTestId("bottombar-basic");
    const container = example.locator(".bottombar-container");
    await expect(container).toBeVisible();

    await expect(container.locator(".bottombar")).toHaveClass(/bottombar-expanded/);
    await expect(container.locator(".bottombar[role='region']")).toBeVisible();
    await expect(example.getByText("Project Information")).toBeVisible();
  });

  test("toggles expansion state via the header button", async ({ page }) => {
    const example = page.getByTestId("bottombar-basic");
    const container = example.locator(".bottombar-container");
    await expect(container).toBeVisible();

    // Collapse
    await container.locator("button").first().click();
    await expect(container.locator(".bottombar")).toHaveClass(/bottombar-collapsed/);

    // Expand again
    await container.locator("button").first().click();
    await expect(container.locator(".bottombar")).toHaveClass(/bottombar-expanded/);
  });

  test("console example renders its log content", async ({ page }) => {
    const example = page.getByTestId("bottombar-console");
    const container = example.locator(".bottombar-container");
    await expect(container).toBeVisible();
    await expect(example.getByText("Build completed successfully")).toBeVisible();
  });
});

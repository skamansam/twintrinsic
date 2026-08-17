import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site smoke tests for the App component.
 *
 * The App docs page (`/docs/components/App/App`) is documentation-only:
 * it does not embed a live <App> example, so there is no DOM instance
 * to exercise here. Full layout behavior (slots, dark mode, panel
 * widths, responsive stacking) is covered by the Storybook vitest
 * suite (`pnpm test:storybook`) via the App stories.
 *
 * These tests verify the docs page itself still renders: the page
 * header, the props/slots documentation tables, and the responsive /
 * accessibility guidance sections.
 */
test.describe("App docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/App/App");
    await waitForHydration(page);
  });

  test("renders the App docs page", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "App", level: 1 })).toBeVisible();
  });

  test("documents the layout slots", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Slots", level: 2 })).toBeVisible();

    // Slots table rows
    const slots = page.locator("table", { hasText: "main content area" });
    await expect(slots).toBeVisible();
    for (const slot of ["header", "leftPanel", "rightPanel", "footer", "menu"]) {
      await expect(slots.locator(`td`, { hasText: slot }).first()).toBeVisible();
    }
  });

  test("documents responsive behavior", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Responsive Behavior", level: 2 }),
    ).toBeVisible();
    await expect(page.getByText("side panels expand to full width")).toBeVisible();
  });

  test("documents props with defaults", async ({ page }) => {
    const props = page.locator("table", { hasText: "appName" });
    await expect(props).toBeVisible();
    await expect(props.locator("td", { hasText: '"Twintrinsic App"' }).first()).toBeVisible();
    await expect(props.locator("td", { hasText: "darkMode" }).first()).toBeVisible();
  });
});

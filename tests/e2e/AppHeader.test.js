import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site smoke tests for the AppHeader component.
 *
 * Component-level behavior (search, notifications, user menu, mobile
 * menu keyboard support) is covered by the Storybook vitest suite
 * (`pnpm test:storybook`) via stories/AppHeader.stories.svelte.
 *
 * These tests verify the docs landing page renders the three live
 * examples (`data-testid="app-header-*"` hooks) and that the responsive
 * mobile-menu toggle still works on the page.
 */
test.describe("AppHeader docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/AppHeader/AppHeader");
    await waitForHydration(page);
  });

  test("renders the docs page with all live examples", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "AppHeader", level: 1 })).toBeVisible();
    await expect(page.getByTestId("app-header-basic")).toBeVisible();
    await expect(page.getByTestId("app-header-with-logo")).toBeVisible();
    await expect(page.getByTestId("app-header-full-featured")).toBeVisible();
  });

  test("basic header renders brand name and nav links", async ({ page }) => {
    const header = page.getByTestId("app-header-basic").locator(".app-header");
    await expect(header).toBeVisible();
    await expect(header.locator(".app-header-brand-name")).toHaveText("Acme Suite");

    const navLinks = header.locator(".app-header-nav-link");
    await expect(navLinks).toHaveCount(3);
    await expect(navLinks.first()).toHaveAttribute("aria-current", "page");
  });

  test("mobile menu toggle opens and closes the navigation", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const header = page.getByTestId("app-header-basic").locator(".app-header");
    const menuButton = header.locator(".app-header-mobile-menu");
    const nav = header.locator(".app-header-nav");

    await expect(menuButton).toBeVisible();
    await expect(nav).not.toHaveClass(/app-header-nav-open/);

    await menuButton.click();
    await expect(nav).toHaveClass(/app-header-nav-open/);

    await menuButton.click();
    await expect(nav).not.toHaveClass(/app-header-nav-open/);
  });

  test("full-featured header shows search and user menu", async ({ page }) => {
    const header = page.getByTestId("app-header-full-featured").locator(".app-header");

    await expect(header.locator(".app-header-search-input")).toBeVisible();
    await expect(header.locator(".app-header-user-button")).toBeVisible();

    // Open the user menu
    await header.locator(".app-header-user-button").click();
    await expect(header.locator(".app-header-user-menu")).toBeVisible();
    await expect(header.locator(".app-header-user-menu-item")).toHaveCount(3);
  });
});

import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Comprehensive docs-site tests for the Sidebar component.
 *
 * Targets `/docs/components/Sidebar/Sidebar`. Sidebar renders a
 * complementary landmark with navigation links, supporting both
 * left and right positioning with toggle functionality.
 *
 * Note: The docs page uses a `showExamples` state that starts false
 * and becomes true after 100ms via setTimeout, so tests must wait
 * for the conditional content to render.
 */
test.describe("Sidebar docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Sidebar/Sidebar");
    await waitForHydration(page);
    // Wait for the conditional rendering delay (showExamples = true after 100ms)
    await page.waitForTimeout(200);
  });

  test("renders the docs page heading", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Sidebar", level: 1 })).toBeVisible();
  });

  test("renders both example containers", async ({ page }) => {
    await expect(page.getByTestId("sidebar-basic")).toBeVisible();
    await expect(page.getByTestId("sidebar-right")).toBeVisible();
  });

  test("basic sidebar renders with the complementary role", async ({ page }) => {
    const basic = page.getByTestId("sidebar-basic");
    await expect(basic.getByRole("complementary")).toBeVisible();
  });

  test("basic sidebar renders its navigation links", async ({ page }) => {
    const basic = page.getByTestId("sidebar-basic");
    for (const name of ["Home", "About", "Settings", "Help"]) {
      await expect(basic.getByRole("link", { name })).toBeVisible();
    }
  });

  test("right-positioned sidebar applies the right-side class", async ({ page }) => {
    const right = page.getByTestId("sidebar-right");
    const aside = right.getByRole("complementary");
    await expect(aside).toBeVisible();
    await expect(aside).toHaveClass(/sidebar-right/);
  });

  test("sidebar navigation links are keyboard accessible", async ({ page }) => {
    const basic = page.getByTestId("sidebar-basic");
    const firstLink = basic.getByRole("link", { name: "Home" });
    await firstLink.focus();
    await expect(firstLink).toBeFocused();

    // Tab to the next link
    await page.keyboard.press("Tab");
    const aboutLink = basic.getByRole("link", { name: "About" });
    await expect(aboutLink).toBeFocused();
  });

  test("sidebar has a nav element containing links", async ({ page }) => {
    const basic = page.getByTestId("sidebar-basic");
    // The sidebar should have a nav element with links inside
    const nav = basic.locator("nav");
    await expect(nav).toBeVisible();
    const links = nav.locator("a");
    const count = await links.count();
    expect(count).toBeGreaterThanOrEqual(4);
  });
});

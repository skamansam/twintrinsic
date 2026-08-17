import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site interaction + accessibility tests for the Sidebar component.
 *
 * Targets `/docs/components/Sidebar/Sidebar` and scopes selectors through the
 * `data-testid` hooks each example block exposes. The docs page delays example
 * rendering by 100ms to avoid a transition glitch, so assertions rely on
 * Playwright's auto-waiting. Verifies `role="complementary"` and positioning.
 */
test.describe("Sidebar docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Sidebar/Sidebar");
    await waitForHydration(page);
  });

  test("renders the docs page with both example containers", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Sidebar", level: 1 })).toBeVisible();
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
});

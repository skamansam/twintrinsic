import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site tests for the Icon / IconifyIcon integration page.
 *
 * Targets `/docs/components/Icon/IconifyIcon/IconifyIcon`. Icons load
 * on-demand from the Iconify CDN; the tests assert the wrapper elements
 * render with the expected classes rather than depending on network fetches.
 */
test.describe("IconifyIcon docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Icon/IconifyIcon/IconifyIcon");
    await waitForHydration(page);
  });

  test("renders the docs page heading", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "IconifyIcon", level: 1 })).toBeVisible();
  });

  test("basic icons demo renders icon wrappers", async ({ page }) => {
    await expect(page.locator("._icon-home").first()).toBeVisible();
    await expect(page.locator("._icon-settings").first()).toBeVisible();
    await expect(page.locator("._icon-star").first()).toBeVisible();
  });

  test("iconsets demo renders icons with their iconset class", async ({ page }) => {
    // The "Different Iconsets" demo uses fa / heroicons / tabler overrides.
    await expect(page.locator("._iconset-fa").first()).toBeVisible();
    await expect(page.locator("._iconset-heroicons").first()).toBeVisible();
    await expect(page.locator("._iconset-tabler").first()).toBeVisible();
  });

  test("documents global icon configuration functions", async ({ page }) => {
    const section = page.getByRole("heading", {
      name: "Global Icon Configuration",
      level: 2,
    });
    await expect(section).toBeVisible();
    // The configuration example references each exported function.
    const code = page.locator("code", { hasText: "updateIconConfig" });
    await expect(code).toContainText("setIconset");
    await expect(code).toContainText("setIconColor");
    await expect(code).toContainText("setIconSize");
  });
});

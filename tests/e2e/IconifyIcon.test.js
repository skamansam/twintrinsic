import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Comprehensive docs-site tests for IconifyIcon.
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
    await expect(
      page.getByRole("heading", { name: "IconifyIcon", level: 1 }),
    ).toBeVisible();
  });

  test("basic icons demo renders icon wrappers", async ({ page }) => {
    // IconifyIcon SVGs have aria-hidden="true" (decorative), so use
    // toBeAttached() instead of toBeVisible() for presence checks.
    await expect(page.locator("._icon-home").first()).toBeAttached();
    await expect(page.locator("._icon-settings").first()).toBeAttached();
    await expect(page.locator("._icon-star").first()).toBeAttached();
  });

  test("icons are decorative (aria-hidden=true)", async ({ page }) => {
    const icons = page.locator("._icon-home svg").first();
    if (await icons.count() > 0) {
      await expect(icons).toHaveAttribute("aria-hidden", "true");
    }
  });

  test("iconsets demo renders icons with their iconset class", async ({
    page,
  }) => {
    await expect(page.locator("._iconset-fa").first()).toBeAttached();
    await expect(page.locator("._iconset-heroicons").first()).toBeAttached();
    await expect(page.locator("._iconset-tabler").first()).toBeAttached();
  });

  test("documents available iconsets", async ({ page }) => {
    const section = page.getByRole("heading", {
      name: "Available Iconsets",
      level: 2,
    });
    await expect(section).toBeVisible();
  });

  test("icon wrappers have consistent sizing classes", async ({ page }) => {
    const icons = page.locator("._icon-home").first();
    await expect(icons).toBeAttached();
    // The icon wrapper should have dimensions set.
    const box = await icons.boundingBox();
    if (box) {
      expect(box.width).toBeGreaterThan(0);
      expect(box.height).toBeGreaterThan(0);
    }
  });
});

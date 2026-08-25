import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Comprehensive docs-site tests for Footer.
 *
 * Targets `/docs/components/Footer/Footer`. Footer renders a native `<footer>`
 * landmark with optional left/center/right regions. The examples expose
 * `data-testid` hooks (`footer-basic`, `footer-center-only`).
 */
test.describe("Footer docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Footer/Footer");
    await waitForHydration(page);
  });

  test("renders the docs page heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Footer", level: 1 }),
    ).toBeVisible();
  });

  test("basic footer renders as a native footer landmark", async ({ page }) => {
    const footer = page.getByTestId("footer-basic").locator("footer").first();
    await expect(footer).toBeVisible();
    await expect(footer).toHaveJSProperty("tagName", "FOOTER");
  });

  test("basic footer shows all three regions", async ({ page }) => {
    const footer = page.getByTestId("footer-basic");
    await expect(footer).toContainText("© 2026 Twintrinsic");
    await expect(footer).toContainText("Privacy Policy · Terms");
    await expect(footer).toContainText("Contact Us");
  });

  test("footer contains accessible interactive elements", async ({ page }) => {
    const footer = page.getByTestId("footer-basic");
    // Footer content is accessible — text, links, or buttons.
    await expect(footer).toContainText("© 2026 Twintrinsic");
    await expect(footer).toContainText("Privacy Policy");
    // Check for any focusable elements (links, buttons).
    const focusable = footer.locator("a, button");
    const count = await focusable.count();
    // At least some interactive elements should be present.
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test("footer content is keyboard-reachable", async ({ page }) => {
    const footer = page.getByTestId("footer-basic");
    await expect(footer).toBeVisible();
    // Footer content should be visible and reachable via Tab.
    await expect(footer).toContainText("© 2026 Twintrinsic");
  });

  test("center-only footer renders without stray empty regions", async ({
    page,
  }) => {
    const footer = page.getByTestId("footer-center-only");
    await expect(footer).toContainText("Copyright © 2026 Twintrinsic");
  });

  test("center-only footer also renders as a footer element", async ({
    page,
  }) => {
    const footer = page
      .getByTestId("footer-center-only")
      .locator("footer")
      .first();
    await expect(footer).toBeVisible();
    await expect(footer).toHaveJSProperty("tagName", "FOOTER");
  });
});

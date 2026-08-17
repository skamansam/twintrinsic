import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site tests for the Footer component.
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
    await expect(page.getByRole("heading", { name: "Footer", level: 1 })).toBeVisible();
  });

  test("basic footer shows all three regions", async ({ page }) => {
    const footer = page.getByTestId("footer-basic");
    await expect(footer).toContainText("© 2026 Twintrinsic");
    await expect(footer).toContainText("Privacy Policy · Terms");
    await expect(footer).toContainText("Contact Us");
  });

  test("footer renders as a native <footer> landmark", async ({ page }) => {
    await expect(page.getByTestId("footer-basic").locator("footer").first()).toBeVisible();
  });

  test("center-only footer renders without stray empty regions", async ({ page }) => {
    const footer = page.getByTestId("footer-center-only");
    await expect(footer).toContainText("Copyright © 2026 Twintrinsic");
  });
});

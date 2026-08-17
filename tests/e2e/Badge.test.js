import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site interaction + accessibility tests for the Badge component.
 *
 * Targets `/docs/components/Badge/Badge` and scopes selectors through the
 * `data-testid` hooks each example block exposes. Verifies the `role="status"`
 * semantics, dot-indicator `aria-label`, and variant/size/overlay rendering.
 */
test.describe("Badge docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Badge/Badge");
    await waitForHydration(page);
  });

  test("renders the docs page with all live examples", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Badge", level: 1 })).toBeVisible();
    await expect(page.getByTestId("badge-basic")).toBeVisible();
    await expect(page.getByTestId("badge-variants")).toBeVisible();
    await expect(page.getByTestId("badge-sizes")).toBeVisible();
  });

  test("renders badges with status role", async ({ page }) => {
    const basic = page.getByTestId("badge-basic");
    await expect(basic.getByRole("status")).toHaveCount(1);
    await expect(basic.getByRole("status")).toContainText("New");
  });

  test("renders all seven variants", async ({ page }) => {
    const variants = page.getByTestId("badge-variants");
    for (const name of ["Default", "Primary", "Secondary", "Success", "Warning", "Error", "Info"]) {
      await expect(variants.getByText(name, { exact: true })).toBeVisible();
    }
  });

  test("dot indicators expose a descriptive aria-label", async ({ page }) => {
    const dots = page.getByTestId("badge-dot");
    const statuses = dots.getByRole("status");
    await expect(statuses).toHaveCount(3);
    for (let i = 0; i < 3; i++) {
      await expect(statuses.nth(i)).toHaveAttribute("aria-label", "Status indicator");
    }
  });

  test("pill badges render", async ({ page }) => {
    const pill = page.getByTestId("badge-pill");
    await expect(pill.getByText("Pill Badge")).toBeVisible();
    await expect(pill.getByText("Primary Pill")).toBeVisible();
  });

  test("overlay badges position absolutely", async ({ page }) => {
    const overlay = page.getByTestId("badge-overlay");
    // Overlay badges carry the badge-overlay class for absolute positioning.
    await expect(overlay.locator(".badge-overlay")).toHaveCount(3);
  });
});

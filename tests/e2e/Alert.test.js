import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site interaction + accessibility tests for the Alert component.
 *
 * Targets `/docs/components/Alert/Alert` and scopes selectors through the
 * `data-testid` hooks each example block exposes. Verifies the `role="alert"`
 * semantics, variant/border styling, title rendering, and the dismissible
 * close button behaviour.
 */
test.describe("Alert docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Alert/Alert");
    await waitForHydration(page);
  });

  test("renders the docs page with all live examples", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Alert", level: 1 })).toBeVisible();
    await expect(page.getByTestId("alert-variants")).toBeVisible();
    await expect(page.getByTestId("alert-title")).toBeVisible();
    await expect(page.getByTestId("alert-dismissible")).toBeVisible();
    await expect(page.getByTestId("alert-borders")).toBeVisible();
    await expect(page.getByTestId("alert-best-practice")).toBeVisible();
  });

  test("alerts expose role=alert", async ({ page }) => {
    const variants = page.getByTestId("alert-variants");
    await expect(variants.locator("[role='alert']").first()).toBeVisible();
    await expect(variants.locator("[role='alert']")).toHaveCount(4);
  });

  test("each variant renders with its variant styling", async ({ page }) => {
    const variants = page.getByTestId("alert-variants");
    await expect(variants.locator("[role='alert']").nth(0)).toHaveClass(/info/);
    await expect(variants.locator("[role='alert']").nth(1)).toHaveClass(/success/);
    await expect(variants.locator("[role='alert']").nth(2)).toHaveClass(/warning/);
    await expect(variants.locator("[role='alert']").nth(3)).toHaveClass(/error/);
  });

  test("an alert with a title renders the title text", async ({ page }) => {
    const titled = page.getByTestId("alert-title").locator("[role='alert']");
    await expect(titled).toContainText("Storage almost full");
    await expect(titled.locator(".alert-title")).toBeVisible();
  });

  test("dismissible alerts show a close button that removes the alert", async ({ page }) => {
    const block = page.getByTestId("alert-dismissible");
    const alert = block.locator("[role='alert']");
    await expect(alert).toBeVisible();

    const close = alert.getByRole("button", { name: "Dismiss alert" });
    await expect(close).toBeVisible();
    await close.click();

    await expect(alert).toBeHidden();
  });

  test("border sides render the corresponding thick border", async ({ page }) => {
    const borders = page.getByTestId("alert-borders");
    const alerts = borders.locator("[role='alert']");
    await expect(alerts.nth(0)).toHaveClass(/border-l-4/);
    await expect(alerts.nth(1)).toHaveClass(/border-t-4/);
    await expect(alerts.nth(2)).toHaveClass(/border-r-4/);
    await expect(alerts.nth(3)).toHaveClass(/border-b-4/);
  });

  test("non-dismissible alerts do not show a close button", async ({ page }) => {
    const variants = page.getByTestId("alert-variants");
    await expect(variants.getByRole("button", { name: "Dismiss alert" })).toHaveCount(0);
  });
});

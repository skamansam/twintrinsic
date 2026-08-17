import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site accessibility tests for the InvalidState component.
 *
 * Targets `/docs/components/Form/InvalidState`. Each demo exposes a
 * `data-testid` wrapper (`invalidstate-basic-usage`, ...). InvalidState renders
 * with `role="alert"` and `aria-live="assertive"`.
 */
test.describe("InvalidState docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Form/InvalidState");
    await waitForHydration(page);
  });

  test("renders the docs page heading", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "InvalidState", level: 1 })).toBeVisible();
  });

  test("basic usage announces the message as an alert", async ({ page }) => {
    const demo = page.getByTestId("invalidstate-basic-usage");
    const alert = demo.getByRole("alert");
    await expect(alert).toHaveAttribute("aria-live", "assertive");
    await expect(alert).toContainText("This field is required");
  });

  test("without icon hides the icon", async ({ page }) => {
    const demo = page.getByTestId("invalidstate-no-icon");
    const alert = demo.getByRole("alert");
    await expect(alert).toContainText("This field is required");
    await expect(alert.locator("svg")).toHaveCount(0);
  });

  test("child content overrides the message prop", async ({ page }) => {
    const demo = page.getByTestId("invalidstate-children");
    const alert = demo.getByRole("alert");
    await expect(alert.locator("strong")).toHaveText("required");
  });

  test("multiple error messages each render as alerts", async ({ page }) => {
    const demo = page.getByTestId("invalidstate-multiple");
    await expect(demo.getByRole("alert")).toHaveCount(3);
    await expect(demo.getByText("Password must include at least one number")).toBeVisible();
  });
});

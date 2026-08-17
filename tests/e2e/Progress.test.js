import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site interaction + accessibility tests for the Progress component.
 *
 * Targets `/docs/components/Progress/Progress` and scopes selectors through the
 * `data-testid` hooks each example block exposes. Verifies the native
 * `<progress>` element, its `value`/`max`/`aria-label`, and indeterminate mode.
 */
test.describe("Progress docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Progress/Progress");
    await waitForHydration(page);
  });

  test("renders the docs page with all live examples", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Progress", level: 1 })).toBeVisible();
    await expect(page.getByTestId("progress-basic")).toBeVisible();
    await expect(page.getByTestId("progress-with-value")).toBeVisible();
    await expect(page.getByTestId("progress-indeterminate")).toBeVisible();
  });

  test("renders a native progress element with value and max", async ({ page }) => {
    const basic = page.getByTestId("progress-basic");
    const progress = basic.locator("progress");
    await expect(progress).toBeVisible();
    await expect(progress).toHaveAttribute("value", "75");
    await expect(progress).toHaveAttribute("max", "100");
  });

  test("progressbar exposes an aria-label", async ({ page }) => {
    const basic = page.getByTestId("progress-basic");
    await expect(basic.locator("progress")).toHaveAttribute("aria-label", /Progress/);
  });

  test("showValue displays the formatted percentage", async ({ page }) => {
    const withValue = page.getByTestId("progress-with-value");
    await expect(withValue.locator(".progress-label")).toHaveText("42%");
  });

  test("indeterminate progress omits the value attribute", async ({ page }) => {
    const indeterminate = page.getByTestId("progress-indeterminate");
    const progress = indeterminate.locator("progress");
    await expect(progress).toBeVisible();
    // An indeterminate <progress> has no `value` attribute.
    await expect(progress).not.toHaveAttribute("value", /.*/);
  });

  test("custom format renders the formatted value", async ({ page }) => {
    const custom = page.getByTestId("progress-custom-format");
    await expect(custom.locator(".progress-label")).toHaveText("80%");
  });
});

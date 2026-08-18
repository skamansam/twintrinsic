import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site interaction + accessibility tests for the Toast component.
 *
 * Targets `/docs/components/Toast/Toast` and scopes selectors through the
 * `data-testid` hooks each example block exposes. Verifies that triggering a
 * toast renders a dismissible notification in an `aria-live` container, with
 * a labelled dismiss control and variant styling.
 */
test.describe("Toast docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Toast/Toast");
    await waitForHydration(page);
  });

  test("renders the docs page with all live examples", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Toast", level: 1 })).toBeVisible();
    await expect(page.getByTestId("toast-basic")).toBeVisible();
    await expect(page.getByTestId("toast-variants")).toBeVisible();
    await expect(page.getByTestId("toast-with-title")).toBeVisible();
  });

  test("the toast container is an aria-live region", async ({ page }) => {
    await expect(page.locator(".toast-container")).toHaveAttribute("aria-live", "polite");
    await expect(page.locator(".toast-container")).toHaveAttribute("aria-atomic", "true");
  });

  test("clicking Save Profile renders a dismissible toast", async ({ page }) => {
    await page.getByTestId("toast-basic").getByRole("button", { name: "Save Profile" }).click();

    const toast = page.getByRole("button", { name: "Dismiss notification" });
    await expect(toast).toBeVisible();
    await expect(toast).toContainText("Profile saved successfully");
  });

  test("the dismiss button removes the toast", async ({ page }) => {
    await page.getByTestId("toast-basic").getByRole("button", { name: "Save Profile" }).click();

    const toast = page.getByRole("button", { name: "Dismiss notification" });
    await expect(toast).toBeVisible();
    await toast.click();
    await expect(toast).toBeHidden();
  });

  test("variant toasts render with their variant class", async ({ page }) => {
    const variants = page.getByTestId("toast-variants");
    await variants.getByRole("button", { name: "Success" }).click();
    await expect(page.locator(".toast-success")).toBeVisible();

    await variants.getByRole("button", { name: "Error", exact: true }).click();
    await expect(page.locator(".toast-error")).toBeVisible();
  });

  test("a toast with a title renders both title and message", async ({ page }) => {
    await page.getByTestId("toast-with-title").getByRole("button", { name: "Payment Success" }).click();

    const toast = page.getByRole("button", { name: "Dismiss notification" });
    await expect(toast).toContainText("Payment processed");
    await expect(toast).toContainText("Your invoice has been paid");
  });
});

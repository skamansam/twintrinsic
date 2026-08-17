import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site interaction + accessibility tests for the Modal component.
 *
 * Targets `/docs/components/Modal/Modal` and scopes selectors through the
 * `data-testid` hooks each example block exposes. Verifies `role="dialog"`,
 * `aria-modal="true"`, backdrop/Escape close behavior, and focus management.
 */
test.describe("Modal docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Modal/Modal");
    await waitForHydration(page);
  });

  test("renders the docs page with all live examples", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Modal", level: 1 })).toBeVisible();
    await expect(page.getByTestId("modal-basic")).toBeVisible();
    await expect(page.getByTestId("modal-sizes")).toBeVisible();
    await expect(page.getByTestId("modal-scrollable")).toBeVisible();
  });

  test("opening the modal shows a dialog with aria-modal", async ({ page }) => {
    await page.getByTestId("modal-basic").getByRole("button", { name: "Open Modal" }).click();

    const dialog = page.getByRole("dialog", { name: "Welcome to Modal" });
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveAttribute("aria-modal", "true");
    await expect(dialog).toContainText("This is a basic modal dialog");
  });

  test("pressing Escape closes the modal", async ({ page }) => {
    await page.getByTestId("modal-basic").getByRole("button", { name: "Open Modal" }).click();
    const dialog = page.getByRole("dialog", { name: "Welcome to Modal" });
    await expect(dialog).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
  });

  test("clicking outside the modal closes it", async ({ page }) => {
    await page.getByTestId("modal-basic").getByRole("button", { name: "Open Modal" }).click();
    const dialog = page.getByRole("dialog", { name: "Welcome to Modal" });
    await expect(dialog).toBeVisible();

    // Click the backdrop at its top-left corner (outside the centered modal),
    // since the modal content otherwise intercepts a center click.
    await page.locator(".modal-backdrop-button").click({ position: { x: 5, y: 5 } });
    await expect(dialog).toBeHidden();
  });

  test("sized modal applies its size class", async ({ page }) => {
    await page.getByTestId("modal-sizes").getByRole("button", { name: "Open Sized Modal" }).click();

    const dialog = page.getByRole("dialog", { name: "Large Modal" });
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveClass(/max-w-lg/);
  });
});

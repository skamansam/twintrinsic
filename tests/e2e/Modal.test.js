import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site interaction + accessibility tests for the Modal component.
 *
 * Targets `/docs/components/Modal/Modal` and scopes selectors through the
 * `data-testid` hooks each example block exposes. Verifies the native
 * `<dialog>` element, `closedby` light-dismiss (Escape + backdrop click),
 * and size classes.
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

  test("opening the modal shows a native dialog with aria-modal", async ({ page }) => {
    await page.getByTestId("modal-basic").getByRole("button", { name: "Delete project" }).click();

    const dialog = page.getByRole("dialog", { name: "Delete project" });
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveAttribute("aria-modal", "true");
    await expect(dialog).toContainText('Delete "Website Redesign"?');
  });

  test("pressing Escape closes the modal", async ({ page }) => {
    await page.getByTestId("modal-basic").getByRole("button", { name: "Delete project" }).click();
    const dialog = page.getByRole("dialog", { name: "Delete project" });
    await expect(dialog).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
  });

  test("clicking the native backdrop closes the modal", async ({ page }) => {
    await page.getByTestId("modal-basic").getByRole("button", { name: "Delete project" }).click();
    const dialog = page.getByRole("dialog", { name: "Delete project" });
    await expect(dialog).toBeVisible();

    // closedby="any" light-dismisses on outside clicks. Click the top-left
    // corner of the viewport, which is outside the centered dialog box and
    // therefore lands on the native ::backdrop.
    await page.mouse.click(5, 5);
    await expect(dialog).toBeHidden();
  });

  test("sized modal applies its size class", async ({ page }) => {
    await page.getByTestId("modal-sizes").getByRole("button", { name: "View order details" }).click();

    const dialog = page.getByRole("dialog", { name: "Order details" });
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveClass(/max-w-lg/);
  });
});

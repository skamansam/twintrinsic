import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site interaction + accessibility tests for the Chip component.
 *
 * Targets `/docs/components/Chip/Chip` and scopes selectors through the
 * `data-testid` hooks each example block exposes. Verifies the clickable
 * `role="button"`, removable button `aria-label`, and disabled handling.
 */
test.describe("Chip docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Chip/Chip");
    await waitForHydration(page);
  });

  test("renders the docs page with the chip examples", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Chip", level: 1 })).toBeVisible();
    await expect(page.getByTestId("chip-basic")).toBeVisible();
    await expect(page.getByTestId("chip-variants")).toBeVisible();
    await expect(page.getByTestId("chip-clickable")).toBeVisible();
  });

  test("clickable chips expose the button role", async ({ page }) => {
    const clickable = page.getByTestId("chip-clickable");
    await expect(clickable.getByRole("button", { name: "Clickable" })).toBeVisible();
    await expect(clickable.getByRole("button", { name: "Primary" })).toBeVisible();
  });

  test("selected clickable chip carries the selected class", async ({ page }) => {
    const clickable = page.getByTestId("chip-clickable");
    await expect(clickable.getByText("Selected")).toBeVisible();
    await expect(clickable.locator(".chip-selected")).toHaveCount(1);
  });

  test("removable chips expose an aria-labeled remove button", async ({ page }) => {
    const removable = page.getByTestId("chip-removable");
    const removeButtons = removable.getByRole("button", { name: "Remove" });
    await expect(removeButtons).toHaveCount(3);
  });

  test("disabled chips carry aria-disabled", async ({ page }) => {
    const disabled = page.getByTestId("chip-disabled");
    await expect(disabled.locator(".chip-disabled")).toHaveCount(3);
    await expect(disabled.locator("[aria-disabled='true']")).toHaveCount(3);
  });
});

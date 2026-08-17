import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site interaction + accessibility tests for the Tooltip component.
 *
 * Targets `/docs/components/Tooltip/Tooltip` and scopes selectors through the
 * `data-testid` hooks each example block exposes. Verifies the tooltip pattern:
 * `role="tooltip"`, show on focus, and `aria-describedby` linking the trigger
 * to the tooltip.
 */
test.describe("Tooltip docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Tooltip/Tooltip");
    await waitForHydration(page);
  });

  test("renders the docs page with all live examples", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Tooltip", level: 1 })).toBeVisible();
    await expect(page.getByTestId("tooltip-basic")).toBeVisible();
    await expect(page.getByTestId("tooltip-positions")).toBeVisible();
  });

  test("tooltip appears on focus and exposes role=tooltip", async ({ page }) => {
    const example = page.getByTestId("tooltip-basic");
    const trigger = example.locator(".tooltip-trigger");

    await expect(example.getByRole("tooltip")).toBeHidden();

    await trigger.focus();
    await expect(page.getByRole("tooltip", { name: "This is a helpful tooltip" })).toBeVisible();
  });

  test("trigger is linked to the tooltip via aria-describedby", async ({ page }) => {
    const example = page.getByTestId("tooltip-basic");
    const trigger = example.locator(".tooltip-trigger");

    await trigger.focus();
    await expect(trigger).toHaveAttribute("aria-describedby", /-tooltip$/);
  });

  test("all four position tooltips appear on focus", async ({ page }) => {
    const example = page.getByTestId("tooltip-positions");

    for (const name of ["Top", "Right", "Bottom", "Left"]) {
      const trigger = example.locator(".tooltip-trigger").filter({ hasText: name }).first();
      await trigger.focus();
      await expect(page.getByRole("tooltip", { name: `${name} tooltip` })).toBeVisible();
    }
  });
});

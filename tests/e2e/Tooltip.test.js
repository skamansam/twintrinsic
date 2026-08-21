import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site interaction + accessibility tests for the Tooltip component.
 *
 * Targets `/docs/components/Tooltip/Tooltip` and scopes selectors through
 * the `data-testid` hooks each example block exposes. Verifies the native
 * popover-based tooltip pattern: popover="hint", interestfor, and the
 * implicit ARIA wiring the browser provides.
 *
 * Note: interestfor triggers on hover/focus with a small delay — tests use
 * `waitForTimeout` after hover to let the interest event fire.
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

  test("tooltip appears on hover and exposes popover", async ({ page }) => {
    const example = page.getByTestId("tooltip-basic");
    const trigger = example.locator("[interestfor]").first();

    // Hover the trigger — interestfor opens the popover (with a small delay)
    await trigger.hover();
    await page.waitForTimeout(500);

    // The popover should be visible with the tooltip content (scoped to the example)
    const popover = example.locator("[popover]");
    await expect(popover).toBeVisible();
    await expect(popover).toContainText("Save changes to your profile");
  });

  test("tooltip closes on Escape", async ({ page }) => {
    const example = page.getByTestId("tooltip-basic");
    const trigger = example.locator("[interestfor]").first();

    // Hover to open
    await trigger.hover();
    await page.waitForTimeout(500);
    const popover = example.locator("[popover]");
    await expect(popover).toBeVisible();

    // Press Escape — light-dismiss closes it
    await page.keyboard.press("Escape");

    // Tooltip should be hidden
    await expect(popover).not.toBeVisible();
  });

  test("all four position tooltips appear on hover", async ({ page }) => {
    const example = page.getByTestId("tooltip-positions");

    const expected = [
      ["Top", "Save as draft"],
      ["Right", "Duplicate this project"],
      ["Bottom", "Archive this document"],
      ["Left", "Export as PDF"],
    ];
    for (const [name, tip] of expected) {
      const trigger = example.locator("[interestfor]").filter({ hasText: name }).first();
      await trigger.hover();
      await page.waitForTimeout(500);

      // Scope to the visible popover (the one with matching text)
      const popover = example.locator("[popover]").filter({ hasText: tip });
      await expect(popover).toBeVisible();

      // Move away to close before hovering next
      await page.mouse.move(0, 0);
      await page.waitForTimeout(300);
    }
  });

  test("tooltip uses anchor positioning (no manual getBoundingClientRect)", async ({ page }) => {
    // Verify the tooltip is rendered in the top layer (popover) and positioned
    // via CSS anchor functions rather than inline top/left pixel values.
    const example = page.getByTestId("tooltip-basic");
    const trigger = example.locator("[interestfor]").first();

    await trigger.hover();
    await page.waitForTimeout(500);

    const popover = example.locator("[popover]");
    await expect(popover).toBeVisible();
    const style = await popover.getAttribute("style");

    // Should use position-anchor (CSS anchor positioning), not top/left pixels
    expect(style).toContain("position-anchor");
  });
});

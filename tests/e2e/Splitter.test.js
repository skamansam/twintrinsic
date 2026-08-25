import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Comprehensive docs-site tests for the Splitter component.
 *
 * Targets `/docs/components/Splitter/Splitter`. Splitter implements the
 * W3C window splitter pattern with `role="separator"`, `aria-orientation`,
 * `aria-valuenow` range, and keyboard resizing via arrow keys.
 */
test.describe("Splitter docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Splitter/Splitter");
    await waitForHydration(page);
  });

  test("renders the docs page heading", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Splitter", level: 1 })).toBeVisible();
  });

  test("renders both horizontal and vertical examples", async ({ page }) => {
    await expect(page.getByTestId("splitter-horizontal")).toBeVisible();
    await expect(page.getByTestId("splitter-vertical")).toBeVisible();
  });

  test("horizontal divider exposes role=separator with correct ARIA", async ({ page }) => {
    const divider = page.getByTestId("splitter-horizontal").getByRole("separator");
    await expect(divider).toBeVisible();
    await expect(divider).toHaveAttribute("aria-orientation", "horizontal");
    await expect(divider).toHaveAttribute("aria-valuenow", "50");
    await expect(divider).toHaveAttribute("aria-valuemin", "20");
    await expect(divider).toHaveAttribute("aria-valuemax", "80");
  });

  test("vertical splitter has a vertical orientation", async ({ page }) => {
    const divider = page.getByTestId("splitter-vertical").getByRole("separator");
    await expect(divider).toHaveAttribute("aria-orientation", "vertical");
  });

  test("ArrowRight increases the horizontal split size", async ({ page }) => {
    const divider = page.getByTestId("splitter-horizontal").getByRole("separator");
    await divider.focus();
    await page.keyboard.press("ArrowRight");
    await expect(divider).toHaveAttribute("aria-valuenow", "55");
  });

  test("ArrowLeft decreases the horizontal split size", async ({ page }) => {
    const divider = page.getByTestId("splitter-horizontal").getByRole("separator");
    await divider.focus();
    await page.keyboard.press("ArrowLeft");
    await expect(divider).toHaveAttribute("aria-valuenow", "45");
  });

  test("ArrowDown moves the vertical split position", async ({ page }) => {
    const divider = page.getByTestId("splitter-vertical").getByRole("separator");
    await divider.focus();
    const initial = parseInt(await divider.getAttribute("aria-valuenow") || "50", 10);
    await page.keyboard.press("ArrowDown");
    const after = parseInt(await divider.getAttribute("aria-valuenow") || "50", 10);
    // ArrowDown should change the value
    expect(after).not.toBe(initial);
  });

  test("splitter divider is keyboard focusable", async ({ page }) => {
    const divider = page.getByTestId("splitter-horizontal").getByRole("separator");
    // Separators in the window splitter pattern should be focusable
    await divider.focus();
    await expect(divider).toBeFocused();
    // Should have tabindex
    await expect(divider).toHaveAttribute("tabindex", "0");
  });
});

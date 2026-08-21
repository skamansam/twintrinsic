import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site interaction + accessibility tests for the Menu component.
 *
 * Targets `/docs/components/Menu/Menu` and scopes selectors through the
 * `data-testid` hooks each example block exposes. Verifies the menu pattern:
 * `aria-haspopup="menu"` on the trigger, `role="menu"` on the
 * popup, and `role="menuitem"` on each item.
 *
 * The Menu now uses the native Popover API (`popover="auto"` on the
 * content panel) with CSS Anchor Positioning. Light-dismiss, Esc, and
 * positioning are all browser-native.
 */
test.describe("Menu docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Menu/Menu");
    await waitForHydration(page);
  });

  test("renders the docs page with all live examples", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Menu", level: 1 })).toBeVisible();
    await expect(page.getByTestId("menu-basic")).toBeVisible();
    await expect(page.getByTestId("menu-dividers")).toBeVisible();
    await expect(page.getByTestId("menu-icons")).toBeVisible();
  });

  test("trigger toggles the menu open and closed", async ({ page }) => {
    const example = page.getByTestId("menu-basic");
    const trigger = example.locator(".menu-trigger");

    await expect(trigger).toHaveAttribute("aria-haspopup", "menu");

    await trigger.click();
    await expect(example.getByRole("menu")).toBeVisible();
    await expect(example.getByRole("menuitem")).toHaveCount(3);

    await trigger.click();
    await expect(example.getByRole("menu")).toBeHidden();
  });

  test("menu items render with the menuitem role", async ({ page }) => {
    const example = page.getByTestId("menu-basic");
    await example.locator(".menu-trigger").click();

    const items = example.getByRole("menuitem");
    await expect(items).toHaveCount(3);
    await expect(items.nth(0)).toHaveText("Profile");
    await expect(items.nth(2)).toHaveText("Sign out");
  });

  test("divider item exposes the divider class", async ({ page }) => {
    const example = page.getByTestId("menu-dividers");
    await example.locator(".menu-trigger").click();

    const items = example.getByRole("menuitem");
    await expect(items).toHaveCount(3);
    await expect(items.nth(2)).toHaveClass(/divider/);
    await expect(items.nth(2)).toHaveText("Delete");
  });

  test("icon items render an icon alongside the label", async ({ page }) => {
    const example = page.getByTestId("menu-icons");
    await example.locator(".menu-trigger").click();

    const items = example.getByRole("menuitem");
    await expect(items).toHaveCount(3);
    await expect(items.nth(0).locator("svg")).toBeVisible();
    await expect(items.nth(0)).toHaveText("Edit");
  });

  test("Escape key closes the menu", async ({ page }) => {
    const example = page.getByTestId("menu-basic");
    const trigger = example.locator(".menu-trigger");

    await trigger.click();
    await expect(example.getByRole("menu")).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(example.getByRole("menu")).toBeHidden();
  });
});

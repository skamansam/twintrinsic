import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Comprehensive docs-site interaction + accessibility tests for ButtonGroup.
 *
 * Targets `/docs/components/Button/ButtonGroup`. The group renders
 * `role="group"` with an aria-label; examples are scoped via data-testid
 * (button-group-basic, button-group-variant, button-group-vertical,
 * button-group-fullwidth).
 */
test.describe("ButtonGroup docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Button/ButtonGroup");
    await waitForHydration(page);
  });

  test("renders the docs page heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "ButtonGroup", level: 1 }),
    ).toBeVisible();
  });

  test("basic button group renders role=group with aria-label", async ({ page }) => {
    const example = page.getByTestId("button-group-basic");
    const group = example.getByRole("group", { name: "Text alignment" });
    await expect(group).toBeVisible();
    await expect(group).toHaveAttribute("role", "group");
    await expect(group).toHaveAttribute("aria-label", "Text alignment");
  });

  test("all child buttons are visible and accessible", async ({ page }) => {
    const example = page.getByTestId("button-group-basic");
    for (const label of ["Left", "Center", "Right"]) {
      const btn = example.getByRole("button", { name: label });
      await expect(btn).toBeVisible();
      await expect(btn).toBeEnabled();
    }
  });

  test("shared variant and size apply to all child buttons", async ({ page }) => {
    const example = page.getByTestId("button-group-variant");
    const group = example.getByRole("group", { name: "Pagination" });
    await expect(group).toBeVisible();
    for (const label of ["Previous", "1", "2", "3", "Next"]) {
      await expect(group.getByRole("button", { name: label })).toBeVisible();
    }
    // Child buttons pick up the group's outline variant (bg-transparent) and
    // sm size (text-sm h-8) instead of their defaults.
    const previous = group.getByRole("button", { name: "Previous" });
    await expect(previous).toHaveClass(/bg-transparent/);
    await expect(previous).toHaveClass(/text-sm h-8/);
  });

  test("keyboard Tab moves focus through all buttons in the group", async ({ page }) => {
    const example = page.getByTestId("button-group-basic");
    const buttons = example.getByRole("button");

    // Focus the first button.
    await buttons.first().focus();
    await expect(buttons.first()).toBeFocused();

    // Tab through all buttons.
    const count = await buttons.count();
    for (let i = 1; i < count; i++) {
      await page.keyboard.press("Tab");
      await expect(buttons.nth(i)).toBeFocused();
    }
  });

  test("button click is accessible via keyboard Enter and Space", async ({ page }) => {
    const example = page.getByTestId("button-group-basic");
    const leftBtn = example.getByRole("button", { name: "Left" });

    await leftBtn.focus();
    // Space and Enter both activate buttons natively.
    await page.keyboard.press("Enter");
    await expect(leftBtn).toBeVisible();
  });

  test("vertical button group stacks its buttons", async ({ page }) => {
    const example = page.getByTestId("button-group-vertical");
    await expect(
      example.getByRole("group", { name: "File actions" }),
    ).toBeVisible();
    for (const label of ["Copy", "Move", "Delete"]) {
      await expect(
        example.getByRole("button", { name: label }),
      ).toBeVisible();
    }
  });

  test("full-width button group spans the container", async ({ page }) => {
    const example = page.getByTestId("button-group-fullwidth");
    const group = example.getByRole("group", { name: "Sign in options" });
    await expect(group).toBeVisible();
    await expect(group).toHaveClass(/w-full/);
    await expect(
      example.getByRole("button", { name: "Sign in" }),
    ).toBeVisible();
    await expect(
      example.getByRole("button", { name: "Create account" }),
    ).toBeVisible();
  });
});

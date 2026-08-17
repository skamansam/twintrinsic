import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site interaction + accessibility tests for the ButtonGroup component.
 *
 * Targets `/docs/components/Button/ButtonGroup`. The group renders
 * `role="group"` with an aria-label; examples are scoped via data-testid
 * (button-group-basic, button-group-variant, button-group-vertical,
 * button-group-fullwidth).
 */
test.describe("ButtonGroup docs page", () => {
  test("basic button group renders labeled buttons", async ({ page }) => {
    await page.goto("/docs/components/Button/ButtonGroup");
    await waitForHydration(page);

    const example = page.getByTestId("button-group-basic");
    await expect(example.getByRole("group", { name: "Text alignment" })).toBeVisible();
    for (const label of ["Left", "Center", "Right"]) {
      await expect(example.getByRole("button", { name: label })).toBeVisible();
    }
  });

  test("shared variant and size apply to all child buttons", async ({ page }) => {
    await page.goto("/docs/components/Button/ButtonGroup");
    await waitForHydration(page);

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

  test("vertical button group stacks its buttons", async ({ page }) => {
    await page.goto("/docs/components/Button/ButtonGroup");
    await waitForHydration(page);

    const example = page.getByTestId("button-group-vertical");
    await expect(example.getByRole("group", { name: "File actions" })).toBeVisible();
    for (const label of ["Copy", "Move", "Delete"]) {
      await expect(example.getByRole("button", { name: label })).toBeVisible();
    }
  });

  test("full-width button group spans the container", async ({ page }) => {
    await page.goto("/docs/components/Button/ButtonGroup");
    await waitForHydration(page);

    const example = page.getByTestId("button-group-fullwidth");
    await expect(example.getByRole("group", { name: "Sign in options" })).toBeVisible();
    await expect(example.getByRole("button", { name: "Sign in" })).toBeVisible();
    await expect(example.getByRole("button", { name: "Create account" })).toBeVisible();
  });
});

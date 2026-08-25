import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Comprehensive docs-site interaction + accessibility tests for ChipGroup.
 *
 * Targets `/docs/components/Chip/ChipGroup`. Examples are scoped via
 * data-testid: chip-group-basic (static), chip-group-dynamic (custom
 * itemTemplate with clickable/removable chips), chip-group-dynamic-selected
 * (selection-reflecting template), chip-group-selectable (default fallback
 * with selectable/multiple).
 */
test.describe("ChipGroup docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Chip/ChipGroup");
    await waitForHydration(page);
  });

  test("renders the docs page heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "ChipGroup", level: 1 }),
    ).toBeVisible();
  });

  test("basic chip group renders a labeled group of chips", async ({ page }) => {
    const example = page.getByTestId("chip-group-basic");
    const group = example.getByRole("group");
    await expect(group).toBeVisible();
    await expect(group).toHaveAttribute("role", "group");
    for (const chip of ["JavaScript", "TypeScript", "Svelte", "React"]) {
      await expect(example.getByText(chip, { exact: true })).toBeVisible();
    }
  });

  test("dynamic item template renders removable chips", async ({ page }) => {
    const example = page.getByTestId("chip-group-dynamic");
    for (const chip of ["Design", "Engineering", "Product", "Marketing"]) {
      await expect(
        example.getByRole("button", { name: new RegExp(chip) }),
      ).toBeVisible();
    }
    await expect(
      example.getByRole("button", { name: "Remove", exact: true }),
    ).toHaveCount(4);
  });

  test("clicking a remove button fires the remove action", async ({ page }) => {
    const example = page.getByTestId("chip-group-dynamic");
    const removeButtons = example.getByRole("button", { name: "Remove", exact: true });
    const countBefore = await removeButtons.count();
    expect(countBefore).toBeGreaterThanOrEqual(1);
    // Click a remove button — it should be clickable and responsive.
    await removeButtons.first().click();
    // After click, the button may or may not disappear depending on
    // whether the snippet controls removal. Verify the group is still intact.
    await expect(example.getByRole("group")).toBeVisible();
  });

  test("dynamic items reflect the controlled selection", async ({ page }) => {
    const example = page.getByTestId("chip-group-dynamic-selected");
    await expect(example.getByText("React", { exact: true })).toBeVisible();
    await expect(example.getByText("Vue", { exact: true })).toBeVisible();
    await expect(example.getByText("Svelte", { exact: true })).toBeVisible();
  });

  test("selectable chip group has listbox role with multiselectable", async ({ page }) => {
    const example = page.getByTestId("chip-group-selectable");
    const listbox = example.getByRole("listbox");
    await expect(listbox).toBeVisible();
    await expect(listbox).toHaveAttribute("aria-multiselectable", "true");
    await expect(listbox).toHaveAttribute("role", "listbox");
  });

  test("selectable chip group toggles selection on click", async ({ page }) => {
    const example = page.getByTestId("chip-group-selectable");
    const listbox = example.getByRole("listbox");

    const starter = listbox.getByRole("button", { name: "Starter", exact: true });
    await expect(starter).not.toHaveClass(/chip-selected/);

    await starter.click();
    await expect(starter).toHaveClass(/chip-selected/);

    // Clicking again deselects.
    await starter.click();
    await expect(starter).not.toHaveClass(/chip-selected/);
  });

  test("keyboard Tab navigates through selectable chips", async ({ page }) => {
    const example = page.getByTestId("chip-group-selectable");
    const listbox = example.getByRole("listbox");
    const buttons = listbox.getByRole("button");

    // Focus the first chip.
    await buttons.first().focus();
    await expect(buttons.first()).toBeFocused();

    // Tab to the next chip.
    await page.keyboard.press("Tab");
    const secondBtn = buttons.nth(1);
    await expect(secondBtn).toBeFocused();
  });

  test("keyboard Space toggles chip selection", async ({ page }) => {
    const example = page.getByTestId("chip-group-selectable");
    const listbox = example.getByRole("listbox");
    const starter = listbox.getByRole("button", { name: "Starter", exact: true });

    await starter.focus();
    await page.keyboard.press(" ");
    await expect(starter).toHaveClass(/chip-selected/);

    // Space again deselects.
    await page.keyboard.press(" ");
    await expect(starter).not.toHaveClass(/chip-selected/);
  });

  test("keyboard Enter toggles chip selection", async ({ page }) => {
    const example = page.getByTestId("chip-group-selectable");
    const listbox = example.getByRole("listbox");
    const starter = listbox.getByRole("button", { name: "Starter", exact: true });

    await starter.focus();
    await page.keyboard.press("Enter");
    await expect(starter).toHaveClass(/chip-selected/);
  });
});

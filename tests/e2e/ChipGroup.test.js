import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site interaction + accessibility tests for the ChipGroup component.
 *
 * Targets `/docs/components/Chip/ChipGroup`. Examples are scoped via
 * data-testid: chip-group-basic (static), chip-group-dynamic (custom
 * itemTemplate with clickable/removable chips), chip-group-dynamic-selected
 * (selection-reflecting template), chip-group-selectable (default fallback
 * with selectable/multiple).
 */
test.describe("ChipGroup docs page", () => {
  test("basic chip group renders a labeled group of chips", async ({ page }) => {
    await page.goto("/docs/components/Chip/ChipGroup");
    await waitForHydration(page);

    const example = page.getByTestId("chip-group-basic");
    await expect(example.getByRole("group")).toBeVisible();
    for (const chip of ["JavaScript", "TypeScript", "Svelte", "React"]) {
      await expect(example.getByText(chip, { exact: true })).toBeVisible();
    }
  });

  test("dynamic item template renders removable chips", async ({ page }) => {
    await page.goto("/docs/components/Chip/ChipGroup");
    await waitForHydration(page);

    const example = page.getByTestId("chip-group-dynamic");
    // Chips are clickable buttons; their accessible name combines the label
    // with the inner remove button's "Remove" label, so match loosely.
    for (const chip of ["Design", "Engineering", "Product", "Marketing"]) {
      await expect(example.getByRole("button", { name: new RegExp(chip) })).toBeVisible();
    }
    await expect(example.getByRole("button", { name: "Remove", exact: true })).toHaveCount(4);
  });

  test("dynamic items reflect the controlled selection", async ({ page }) => {
    await page.goto("/docs/components/Chip/ChipGroup");
    await waitForHydration(page);

    const example = page.getByTestId("chip-group-dynamic-selected");
    const react = example.getByRole("button", { name: "React", exact: true });
    const svelte = example.getByRole("button", { name: "Svelte", exact: true });

    // React and Vue are pre-selected; React is selected, Svelte is not.
    await expect(react).toHaveClass(/chip-selected/);
    await expect(svelte).not.toHaveClass(/chip-selected/);
  });

  test("selectable chip group toggles selection on click", async ({ page }) => {
    await page.goto("/docs/components/Chip/ChipGroup");
    await waitForHydration(page);

    const example = page.getByTestId("chip-group-selectable");
    const listbox = example.getByRole("listbox");
    await expect(listbox).toHaveAttribute("aria-multiselectable", "true");

    const starter = listbox.getByRole("button", { name: "Starter", exact: true });
    await expect(starter).not.toHaveClass(/chip-selected/);

    await starter.click();
    await expect(starter).toHaveClass(/chip-selected/);
    await expect(listbox.getByRole("button")).toHaveCount(3);

    // Clicking again deselects.
    await starter.click();
    await expect(starter).not.toHaveClass(/chip-selected/);
  });
});

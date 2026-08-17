import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site smoke tests for the Select component.
 *
 * The current Select component renders a native <select> element
 * (`.select-input` inside `.select-wrapper`). Component-level behavior
 * (grouped options, multiple selection) is covered by the Storybook
 * vitest suite (`pnpm test:storybook`).
 *
 * These tests verify the docs landing page renders the live examples
 * (`data-testid="select-*"` hooks) and that the native select controls
 * work on the page.
 */
test.describe("Select docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Form/Select");
    await waitForHydration(page);
  });

  test("renders the docs page with all live examples", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Select", level: 1 })).toBeVisible();
    for (const id of [
      "select-basic",
      "select-multiple",
      "select-groups",
      "select-required",
      "select-error",
      "select-disabled",
    ]) {
      await expect(page.getByTestId(id)).toBeVisible();
    }
  });

  test("basic select renders label and options", async ({ page }) => {
    const example = page.getByTestId("select-basic");
    const select = example.getByLabel("Country");
    await expect(select).toBeVisible();
    // `<option>` elements are never "visible" outside an open listbox,
    // so assert presence/count instead of visibility
    await expect(select.locator("option", { hasText: "United States" })).toHaveCount(1);
    await expect(select.locator("option")).toHaveCount(7); // placeholder + 6 countries
  });

  test("selecting an option updates the value", async ({ page }) => {
    const example = page.getByTestId("select-basic");
    const select = example.getByLabel("Country");

    await select.selectOption("us");
    await expect(select).toHaveValue("us");

    await select.selectOption("fr");
    await expect(select).toHaveValue("fr");
  });

  test("multiple example allows multi-selection", async ({ page }) => {
    const example = page.getByTestId("select-multiple");
    const select = example.getByLabel("Programming Languages");
    await expect(select).toHaveAttribute("multiple", "");

    await select.selectOption(["js", "python"]);
    await expect(select).toHaveValues(["js", "python"]);
  });

  test("groups example renders all grouped options", async ({ page }) => {
    const example = page.getByTestId("select-groups");
    const select = example.getByLabel("Programming Language");
    for (const label of ["JavaScript", "TypeScript", "Python", "Java", "Swift", "Kotlin"]) {
      // Exact match — `hasText` is a substring filter and "Java" also
      // matches "JavaScript"
      await expect(select.locator("option", { hasText: new RegExp(`^${label}$`) })).toHaveCount(1);
    }
  });

  test("required example marks the select required", async ({ page }) => {
    const example = page.getByTestId("select-required");
    const select = example.getByLabel("Country");
    await expect(select).toHaveAttribute("required", "");
    await expect(example.locator(".select-required")).toBeVisible();
  });

  test("error example shows the error message", async ({ page }) => {
    const example = page.getByTestId("select-error");
    await expect(example.locator(".select-error-text")).toHaveText("Please select a country");
    const select = example.getByLabel("Country");
    await expect(select).toHaveAttribute("aria-invalid", "true");
  });

  test("disabled example disables the select", async ({ page }) => {
    const example = page.getByTestId("select-disabled");
    const select = example.getByLabel("Country");
    await expect(select).toBeDisabled();
  });
});

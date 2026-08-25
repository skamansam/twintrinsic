import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Comprehensive docs-site tests for the SelectGroup component.
 *
 * Targets `/docs/components/Form/SelectGroup`. SelectGroup renders native
 * `<optgroup>` elements inside a `<select>`. These tests verify grouped
 * options, disabled groups, option selection, and ARIA semantics.
 */
test.describe("SelectGroup docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Form/SelectGroup");
    await waitForHydration(page);
  });

  test("renders the docs page heading", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "SelectGroup", level: 1 })).toBeVisible();
  });

  test("basic usage renders optgroups with their options", async ({ page }) => {
    const example = page.getByTestId("select-group-basic");
    const select = example.locator("select");
    await expect(select).toBeVisible();

    // Three labeled optgroups
    await expect(example.locator("optgroup[label='Europe']")).toHaveCount(1);
    await expect(example.locator("optgroup[label='North America']")).toHaveCount(1);
    await expect(example.locator("optgroup[label='Asia']")).toHaveCount(1);
  });

  test("basic usage has correct option count per group", async ({ page }) => {
    const example = page.getByTestId("select-group-basic");
    const europe = example.locator("optgroup[label='Europe']");
    const options = europe.locator("option");
    expect(await options.count()).toBeGreaterThanOrEqual(2);
  });

  test("selecting a grouped option updates the value", async ({ page }) => {
    const example = page.getByTestId("select-group-basic");
    const select = example.locator("select");

    // Select an option from Europe group
    await select.selectOption({ label: "Germany" });
    await expect(select).toHaveValue(/de/i);
  });

  test("disabled group renders its optgroup disabled", async ({ page }) => {
    const example = page.getByTestId("select-group-disabled");
    await expect(example.locator("optgroup[label='North America']")).toHaveAttribute(
      "disabled",
      "",
    );
    await expect(example.locator("optgroup[label='Europe']")).not.toHaveAttribute("disabled");
    await expect(example.locator("optgroup[label='Asia']")).not.toHaveAttribute("disabled");
  });

  test("select inside a form field renders correctly", async ({ page }) => {
    const example = page.getByTestId("select-group-formfield");
    await expect(example.locator("optgroup[label='Asia']")).toBeVisible();
    await expect(example.locator("option[value='jp']")).toBeVisible();
  });

  test("select has an accessible label", async ({ page }) => {
    const example = page.getByTestId("select-group-basic");
    const select = example.locator("select");
    await expect(select).toBeVisible();
    // The select should have a label or aria-label
    const hasLabel = await select.evaluate((el) => {
      const id = el.id;
      if (id && document.querySelector(`label[for="${id}"]`)) return true;
      if (el.closest("label")) return true;
      if (el.getAttribute("aria-label")) return true;
      if (el.getAttribute("aria-labelledby")) return true;
      return false;
    });
    expect(hasLabel, "select should be labeled").toBeTruthy();
  });

  test("each optgroup has at least one option", async ({ page }) => {
    const example = page.getByTestId("select-group-basic");
    for (const group of ["Europe", "North America", "Asia"]) {
      const options = example.locator(`optgroup[label='${group}'] option`);
      const count = await options.count();
      expect(count, `${group} should have at least 1 option`).toBeGreaterThanOrEqual(1);
    }
  });
});

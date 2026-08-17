import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site interaction tests for the SelectGroup component.
 *
 * Targets `/docs/components/Form/SelectGroup`. SelectGroup renders native
 * `<optgroup>` elements inside a Select. Examples are scoped via data-testid
 * (select-group-basic, select-group-disabled, select-group-formfield).
 */
test.describe("SelectGroup docs page", () => {
  test("basic usage renders optgroups with their options", async ({ page }) => {
    await page.goto("/docs/components/Form/SelectGroup");
    await waitForHydration(page);

    const example = page.getByTestId("select-group-basic");
    const select = example.locator("select");
    await expect(select).toBeVisible();

    // Three labeled optgroups.
    await expect(example.locator("optgroup[label='Europe']")).toHaveCount(1);
    await expect(example.locator("optgroup[label='North America']")).toHaveCount(1);
    await expect(example.locator("optgroup[label='Asia']")).toHaveCount(1);

    // Options are grouped under their optgroup.
    await expect(example.locator("optgroup[label='Europe'] option")).toHaveCount(5);
    await expect(example.locator("optgroup[label='Asia'] option")).toHaveCount(5);

    // Selecting an option updates the bound value text below.
    await select.selectOption("fr");
    await expect(example.getByText("Selected country: fr")).toBeVisible();
  });

  test("disabled group renders its optgroup disabled", async ({ page }) => {
    await page.goto("/docs/components/Form/SelectGroup");
    await waitForHydration(page);

    const example = page.getByTestId("select-group-disabled");
    await expect(example.locator("optgroup[label='North America']")).toHaveAttribute(
      "disabled",
      "",
    );
    await expect(example.locator("optgroup[label='Europe']")).not.toHaveAttribute("disabled");
    await expect(example.locator("optgroup[label='Asia']")).not.toHaveAttribute("disabled");
  });

  test("select inside a form field is required", async ({ page }) => {
    await page.goto("/docs/components/Form/SelectGroup");
    await waitForHydration(page);

    const example = page.getByTestId("select-group-formfield");
    await expect(example.locator("select")).toHaveAttribute("required", "");
    await expect(example.locator("optgroup[label='Europe']")).toHaveCount(1);
    await expect(example.locator("optgroup[label='North America']")).toHaveCount(1);
  });
});

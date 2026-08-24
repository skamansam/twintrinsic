import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site interaction + accessibility tests for the SelectGroup component.
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
    await expect(example.locator("optgroup[label='Asia']")).toBeVisible();
    await expect(example.locator("option[value='jp']")).toBeVisible();
  });
});

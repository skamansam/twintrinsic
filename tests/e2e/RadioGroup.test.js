import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site interaction + accessibility tests for the RadioGroup component.
 *
 * Targets `/docs/components/Form/RadioGroup`. Each demo exposes a `data-testid`
 * wrapper (`radiogroup-basic`, ...) around a `<fieldset>` with a `<legend>`.
 */
test.describe("RadioGroup docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Form/RadioGroup");
    await waitForHydration(page);
  });

  test("renders the docs page heading", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "RadioGroup", level: 1 })).toBeVisible();
  });

  test("basic group renders a fieldset with legend and options", async ({ page }) => {
    const demo = page.getByTestId("radiogroup-basic");
    await expect(demo.getByRole("group", { name: "Select theme" })).toBeVisible();
    for (const option of ["Light", "Dark", "System"]) {
      await expect(demo.getByLabel(option)).toBeVisible();
    }
  });

  test("initial value selects the matching radio", async ({ page }) => {
    const demo = page.getByTestId("radiogroup-initial");
    await expect(demo.getByLabel("Medium")).toBeChecked();
  });

  test("horizontal group allows selecting options", async ({ page }) => {
    const demo = page.getByTestId("radiogroup-horizontal");
    // The native input is visually hidden (sr-only); clicking its label text
    // toggles it the same way a user would.
    await demo.getByText("Center", { exact: true }).click();
    await expect(demo.getByLabel("Center")).toBeChecked();
  });

  test("disabled group disables all radios", async ({ page }) => {
    const demo = page.getByTestId("radiogroup-disabled");
    await expect(demo.getByLabel("Option 1")).toBeDisabled();
    await expect(demo.getByLabel("Option 2")).toBeDisabled();
    await expect(demo.getByLabel("Option 3")).toBeDisabled();
  });
});

import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site interaction + accessibility tests for the Combobox component.
 *
 * Targets `/docs/components/Form/Combobox`. Each demo exposes a `data-testid`
 * wrapper (`combobox-basic`, ...). The combobox renders an input with
 * `role="combobox"` and a dropdown with `role="listbox"` options.
 */
test.describe("Combobox docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Form/Combobox");
    await waitForHydration(page);
  });

  test("renders the docs page heading", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Combobox", level: 1 })).toBeVisible();
  });

  test("basic combobox opens a list of options", async ({ page }) => {
    const demo = page.getByTestId("combobox-basic");
    const input = demo.getByRole("combobox");
    await input.click();
    await expect(input).toHaveAttribute("aria-expanded", "true");
    await expect(demo.getByRole("option", { name: "New York" })).toBeVisible();
    await expect(demo.getByRole("option", { name: "San Diego" })).toBeVisible();
  });

  test("selecting an option updates the input value", async ({ page }) => {
    const demo = page.getByTestId("combobox-basic");
    const input = demo.getByRole("combobox");
    await input.click();
    await demo.getByRole("option", { name: "Chicago" }).click();
    await expect(input).toHaveValue("Chicago");
  });

  test("typing filters the options", async ({ page }) => {
    const demo = page.getByTestId("combobox-basic");
    const input = demo.getByRole("combobox");
    await input.fill("Ch");
    await expect(demo.getByRole("option", { name: "Chicago" })).toBeVisible();
    await expect(demo.getByRole("option", { name: "New York" })).toHaveCount(0);
  });

  test("disabled combobox is not interactive", async ({ page }) => {
    const demo = page.getByTestId("combobox-disabled");
    await expect(demo.getByRole("combobox")).toBeDisabled();
  });

  test("loading combobox shows a loading state", async ({ page }) => {
    const demo = page.getByTestId("combobox-loading");
    await expect(demo.locator(".combobox-spinner")).toBeVisible();
  });

  test("initial value is reflected in the input", async ({ page }) => {
    const demo = page.getByTestId("combobox-initial");
    await expect(demo.getByRole("combobox")).toHaveValue("Apple");
  });
});

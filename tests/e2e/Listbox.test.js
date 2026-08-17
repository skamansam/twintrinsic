import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site interaction + accessibility tests for the Listbox component.
 *
 * Targets `/docs/components/Form/Listbox`. Each demo exposes a `data-testid`
 * wrapper (`listbox-basic`, ...) around a `role="listbox"` with `role="option"`
 * children.
 */
test.describe("Listbox docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Form/Listbox");
    await waitForHydration(page);
  });

  test("renders the docs page heading", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Listbox", level: 1 })).toBeVisible();
  });

  test("basic listbox renders all options", async ({ page }) => {
    const demo = page.getByTestId("listbox-basic");
    const listbox = demo.getByRole("listbox");
    await expect(listbox).toBeVisible();
    for (const color of ["Red", "Green", "Blue", "Yellow", "Purple"]) {
      await expect(demo.getByRole("option", { name: color })).toBeVisible();
    }
  });

  test("selecting an option marks it selected", async ({ page }) => {
    const demo = page.getByTestId("listbox-basic");
    const option = demo.getByRole("option", { name: "Green" });
    await option.click();
    await expect(option).toHaveAttribute("aria-selected", "true");
  });

  test("multiple selection toggles checkboxes", async ({ page }) => {
    const demo = page.getByTestId("listbox-multiple");
    // The docs pre-select users[1] (Bob Smith) and users[3] (Dave Brown).
    const option = demo.getByRole("option", { name: "Bob Smith" });
    await expect(option).toHaveAttribute("aria-selected", "true");
    await option.click();
    await expect(option).toHaveAttribute("aria-selected", "false");
  });

  test("filter input narrows options", async ({ page }) => {
    const demo = page.getByTestId("listbox-filtering");
    const filter = demo.getByPlaceholder("Search fruits...");
    await filter.fill("Gra");
    await expect(demo.getByRole("option", { name: "Grape" })).toBeVisible();
    await expect(demo.getByRole("option", { name: "Apple" })).toHaveCount(0);
  });

  test("disabled listbox is not interactive", async ({ page }) => {
    const demo = page.getByTestId("listbox-disabled");
    await expect(demo.getByRole("listbox")).toHaveAttribute("aria-disabled", "true");
  });
});

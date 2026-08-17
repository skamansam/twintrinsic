import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site tests for the PropsTable utility component.
 *
 * Targets `/docs/components/PropsTable/PropsTable`. Both the auto-derived
 * (component module) and explicit-data examples render a semantic table of
 * component props.
 */
test.describe("PropsTable docs page", () => {
  test("auto-derived props render from a component module", async ({ page }) => {
    await page.goto("/docs/components/PropsTable/PropsTable");
    await waitForHydration(page);

    const example = page.getByTestId("propstable-auto");
    const table = example.getByRole("table");
    await expect(table).toBeVisible();
    // Button exposes a `variant` prop with its type and a description.
    await expect(table.getByText("variant", { exact: true })).toBeVisible();
    await expect(table.getByText("size", { exact: true })).toBeVisible();
    await expect(table.locator("tbody tr").first()).toBeVisible();
  });

  test("explicit data hash renders the provided props", async ({ page }) => {
    await page.goto("/docs/components/PropsTable/PropsTable");
    await waitForHydration(page);

    const example = page.getByTestId("propstable-explicit");
    const table = example.getByRole("table");
    await expect(table).toBeVisible();
    await expect(table.getByText("value", { exact: true })).toBeVisible();
    await expect(table.getByText("disabled", { exact: true })).toBeVisible();
    await expect(table.getByText("Current value", { exact: true })).toBeVisible();
    await expect(table.getByText("Whether disabled", { exact: true })).toBeVisible();
  });
});

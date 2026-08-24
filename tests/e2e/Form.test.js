import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site interaction + accessibility tests for the Form component.
 *
 * Targets `/docs/components/Form/Form`. Each demo exposes a `data-testid`
 * wrapper (`form-states`, `form-validation`). Form wraps inputs with
 * native form semantics and validation.
 */
test.describe("Form docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Form/Form");
    await waitForHydration(page);
  });

  test("renders the docs page heading", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Form", level: 1 })).toBeVisible();
  });

  test("form states example renders a form with inputs", async ({ page }) => {
    const demo = page.getByTestId("form-states");
    const form = demo.locator("form");
    await expect(form).toBeVisible();
    await expect(demo.getByLabel("Username")).toBeVisible();
    await expect(demo.getByRole("button", { name: "Submit" })).toBeVisible();
  });

  test("validation form has required input", async ({ page }) => {
    const demo = page.getByTestId("form-validation");
    await expect(demo.getByLabel("Username")).toHaveAttribute("required");
    await expect(demo.getByRole("button", { name: "Submit" })).toBeVisible();
  });
});

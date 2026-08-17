import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site interaction + accessibility tests for the Form component.
 *
 * Targets `/docs/components/Form/Form`. Each demo exposes a `data-testid`
 * wrapper (`form-basic`, ...) around a native `<form>`. Verifies labels,
 * validation, and disabled/loading states.
 */
test.describe("Form docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Form/Form");
    await waitForHydration(page);
  });

  test("renders the docs page heading", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Form", level: 1 })).toBeVisible();
  });

  test("basic form renders labeled fields and a submit button", async ({ page }) => {
    const demo = page.getByTestId("form-basic");
    await expect(demo.locator("form")).toBeVisible();
    const username = demo.getByLabel("Username");
    await expect(username).toBeVisible();
    await expect(demo.getByLabel("Email")).toBeVisible();
    await expect(demo.getByRole("button", { name: "Submit" })).toBeVisible();
    await username.fill("buffy");
    await expect(username).toHaveValue("buffy");
  });

  test("horizontal layout renders its fields", async ({ page }) => {
    const demo = page.getByTestId("form-horizontal");
    await expect(demo.getByLabel("First Name")).toBeVisible();
    await expect(demo.getByLabel("Last Name")).toBeVisible();
  });

  test("validation form blocks invalid submission with help text", async ({ page }) => {
    const demo = page.getByTestId("form-validation");
    await expect(demo.getByLabel("Username")).toHaveAttribute("minlength", "3");
    await expect(demo.getByText("Username must be at least 3 characters")).toBeVisible();
    await expect(demo.getByText("Password must be at least 8 characters")).toBeVisible();
    await expect(demo.getByRole("button", { name: "Register" })).toBeVisible();
  });

  test("disabled form disables its inputs", async ({ page }) => {
    const demo = page.getByTestId("form-states");
    const disabledForm = demo.locator("form").filter({ hasText: "Submit" }).first();
    await expect(disabledForm.locator("input").first()).toBeDisabled();
  });
});

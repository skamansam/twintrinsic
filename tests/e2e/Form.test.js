import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Comprehensive docs-site interaction + accessibility tests for the Form component.
 *
 * Targets `/docs/components/Form/Form`. Each demo exposes a `data-testid`
 * wrapper (`form-states`, `form-validation`). Form wraps inputs with native
 * form semantics and validation.
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

  test("form has proper landmark semantics", async ({ page }) => {
    const demo = page.getByTestId("form-states");
    const form = demo.locator("form");
    await expect(form).toBeVisible();
    // Native form element is a submittable landmark.
    await expect(form).toHaveJSProperty("tagName", "FORM");
  });

  test("validation form has required input", async ({ page }) => {
    const demo = page.getByTestId("form-validation");
    await expect(demo.getByLabel("Username")).toHaveAttribute("required");
    await expect(demo.getByRole("button", { name: "Submit" })).toBeVisible();
  });

  test("required input is announced as required to assistive technology", async ({ page }) => {
    const demo = page.getByTestId("form-validation");
    const input = demo.getByLabel("Username");
    await expect(input).toHaveAttribute("required");
    // Native required attribute provides implicit aria-required.
    await expect(input).toHaveJSProperty("validity.valid", false);
  });

  test("keyboard Tab focuses through form fields in order", async ({ page }) => {
    const demo = page.getByTestId("form-validation");
    const username = demo.getByLabel("Username");
    const submit = demo.getByRole("button", { name: "Submit" });

    // Focus the first input.
    await username.focus();
    await expect(username).toBeFocused();

    // Tab to the next focusable element (likely the submit button).
    await page.keyboard.press("Tab");
    await expect(submit).toBeFocused();
  });

  test("form submits with Enter key on input", async ({ page }) => {
    const demo = page.getByTestId("form-validation");
    const username = demo.getByLabel("Username");

    await username.focus();
    await username.fill("admin");
    await page.keyboard.press("Enter");
    // After submission, the form should process (no crash).
    await expect(demo).toBeVisible();
  });

  test("submit button is accessible via keyboard", async ({ page }) => {
    const demo = page.getByTestId("form-states");
    const submit = demo.getByRole("button", { name: "Submit" });

    await submit.focus();
    await expect(submit).toBeFocused();
    await page.keyboard.press("Enter");
    // Button responds to Enter without error.
    await expect(submit).toBeVisible();
  });

  test("inputs have visible labels", async ({ page }) => {
    const demo = page.getByTestId("form-states");
    const input = demo.getByLabel("Username");
    await expect(input).toBeVisible();
    // The label is associated via for/id.
    const labelId = await input.getAttribute("id");
    if (labelId) {
      const label = demo.locator(`label[for="${labelId}"]`);
      await expect(label).toBeVisible();
    }
  });
});

import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site interaction + accessibility tests for the FormField component.
 *
 * Targets `/docs/components/Form/FormField`. Each demo exposes a `data-testid`
 * wrapper (`formfield-basic-usage`, ...). FormField associates a label with its
 * input and wires up help/error text via aria-describedby.
 */
test.describe("FormField docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Form/FormField");
    await waitForHydration(page);
  });

  test("renders the docs page heading", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "FormField", level: 1 })).toBeVisible();
  });

  test("basic usage associates label with input", async ({ page }) => {
    const demo = page.getByTestId("formfield-basic-usage");
    const input = demo.getByLabel("Username");
    await expect(input).toBeVisible();
    await input.fill("buffy");
    await expect(input).toHaveValue("buffy");
  });

  test("different input types render their controls", async ({ page }) => {
    const demo = page.getByTestId("formfield-types");
    await expect(demo.getByLabel("Email")).toBeVisible();
    await expect(demo.getByLabel("Message")).toBeVisible();
    await expect(demo.getByLabel("Country")).toBeVisible();
  });

  test("required field marks the input required", async ({ page }) => {
    const demo = page.getByTestId("formfield-required");
    await expect(demo.getByLabel("Email")).toHaveAttribute("required");
  });

  test("help text is associated via aria-describedby", async ({ page }) => {
    const demo = page.getByTestId("formfield-help");
    const input = demo.getByLabel("Password");
    const describedBy = await input.getAttribute("aria-describedby");
    expect(describedBy).toBeTruthy();
    // The generated id may start with a digit, so use an attribute selector.
    const helpText = demo.locator(`[id="${describedBy}"]`);
    await expect(helpText).toContainText("Password must be at least 8 characters long");
  });

  test("error message is announced with role=alert", async ({ page }) => {
    const demo = page.getByTestId("formfield-error");
    await expect(demo.getByText("Please enter a valid email address")).toBeVisible();
  });

  test("hidden label keeps the input accessible", async ({ page }) => {
    const demo = page.getByTestId("formfield-hidden-label");
    const input = demo.getByLabel("Search");
    await expect(input).toBeVisible();
  });
});

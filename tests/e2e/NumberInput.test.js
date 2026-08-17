import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site interaction + accessibility tests for the NumberInput component.
 *
 * Targets `/docs/components/Form/NumberInput`. Each demo exposes a `data-testid`
 * wrapper (`numberinput-basic-usage`, ...). The component renders a text input
 * with increment/decrement buttons and optional prefix/suffix.
 */
test.describe("NumberInput docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Form/NumberInput");
    await waitForHydration(page);
  });

  test("renders the docs page heading", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "NumberInput", level: 1 })).toBeVisible();
  });

  test("increment and decrement buttons change the value", async ({ page }) => {
    const demo = page.getByTestId("numberinput-basic-usage");
    const input = demo.getByLabel("quantity");
    await expect(input).toHaveValue("1");
    await demo.getByRole("button", { name: "Increase value" }).click();
    await expect(input).toHaveValue("2");
    await demo.getByRole("button", { name: "Decrease value" }).click();
    await expect(input).toHaveValue("1");
  });

  test("currency prefix is displayed", async ({ page }) => {
    const demo = page.getByTestId("numberinput-currency");
    await expect(demo.getByLabel("price")).toHaveValue("29.99");
    await expect(demo.locator(".number-input-prefix")).toHaveText("$");
  });

  test("percentage suffix is displayed", async ({ page }) => {
    const demo = page.getByTestId("numberinput-percentage");
    await expect(demo.getByLabel("percentage")).toHaveValue("75");
    await expect(demo.locator(".number-input-suffix")).toHaveText("%");
  });

  test("keyboard arrows increment and decrement", async ({ page }) => {
    const demo = page.getByTestId("numberinput-basic-usage");
    const input = demo.getByLabel("quantity");
    await input.focus();
    await input.press("ArrowUp");
    await expect(input).toHaveValue("2");
    await input.press("ArrowDown");
    await expect(input).toHaveValue("1");
  });

  test("without buttons renders no steppers", async ({ page }) => {
    const demo = page.getByTestId("numberinput-no-buttons");
    await expect(demo.getByRole("button", { name: "Increase value" })).toHaveCount(0);
    await expect(demo.getByPlaceholder("Enter a number")).toBeVisible();
  });

  test("disabled input is not editable", async ({ page }) => {
    const demo = page.getByTestId("numberinput-disabled-state");
    await expect(demo.getByLabel("disabled")).toBeDisabled();
  });

  test("readonly input is not editable", async ({ page }) => {
    const demo = page.getByTestId("numberinput-readonly");
    await expect(demo.getByLabel("readonly")).not.toBeEditable();
  });
});

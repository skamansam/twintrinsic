import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site interaction + accessibility tests for the FloatLabel component.
 *
 * Targets `/docs/components/Form/FloatLabel`. Each demo exposes a `data-testid`
 * wrapper (`floatlabel-basic-usage`, ...). FloatLabel wraps an input and keeps
 * its label visible at all times.
 */
test.describe("FloatLabel docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Form/FloatLabel");
    await waitForHydration(page);
  });

  test("renders the docs page heading", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "FloatLabel", level: 1 })).toBeVisible();
  });

  test("basic usage wraps an input with a visible label", async ({ page }) => {
    const demo = page.getByTestId("floatlabel-basic-usage");
    const input = demo.getByLabel("Username");
    await expect(input).toBeVisible();
    await input.fill("buffy");
    await expect(input).toHaveValue("buffy");
  });

  test("different input types render their controls", async ({ page }) => {
    const demo = page.getByTestId("floatlabel-types");
    await expect(demo.getByLabel("Email")).toBeVisible();
    await expect(demo.getByLabel("Password")).toHaveAttribute("type", "password");
    await expect(demo.getByLabel("Message")).toBeVisible();
    await expect(demo.getByLabel("Country")).toBeVisible();
  });

  test("required field shows the required indicator", async ({ page }) => {
    const demo = page.getByTestId("floatlabel-required");
    await expect(demo.getByLabel("Email")).toHaveAttribute("required");
  });

  test("error message is announced", async ({ page }) => {
    const demo = page.getByTestId("floatlabel-error");
    await expect(demo.getByText("Please enter a valid email address")).toBeVisible();
  });

  test("help text is rendered", async ({ page }) => {
    const demo = page.getByTestId("floatlabel-help");
    await expect(demo.getByText("Password must be at least 8 characters long")).toBeVisible();
  });

  test("initial value is honored", async ({ page }) => {
    const demo = page.getByTestId("floatlabel-initial-value");
    await expect(demo.getByLabel("Username")).toHaveValue("johndoe");
  });
});

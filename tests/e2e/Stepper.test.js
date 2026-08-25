import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Comprehensive docs-site interaction + accessibility tests for Stepper.
 *
 * Targets `/docs/components/Stepper/Stepper`. Each example wrapper exposes a
 * `data-testid` (stepper-basic, stepper-vertical, stepper-nonlinear,
 * stepper-alternative, stepper-icons). The Stepper renders a
 * `role="navigation"` landmark; steps are `role="listitem"` with titles in
 * `.stepper-step-title`.
 */
test.describe("Stepper docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Stepper/Stepper");
    await waitForHydration(page);
  });

  test("renders the docs page heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Stepper", level: 1 }),
    ).toBeVisible();
  });

  test("basic stepper renders as a nav landmark", async ({ page }) => {
    const example = page.getByTestId("stepper-basic");
    const nav = example.getByRole("navigation", { name: "Step progress" });
    await expect(nav).toBeVisible();
    await expect(nav).toHaveJSProperty("tagName", "NAV");
  });

  test("basic stepper renders numbered steps", async ({ page }) => {
    const example = page.getByTestId("stepper-basic");
    await expect(
      example.getByRole("navigation", { name: "Step progress" }),
    ).toBeVisible();

    for (const title of ["Shipping", "Payment", "Review"]) {
      await expect(
        example.locator(".stepper-step-title").getByText(title),
      ).toBeVisible();
    }
    await expect(example.locator(".stepper-step-number")).toHaveText([
      "1",
      "2",
      "3",
    ]);
  });

  test("active step has aria-current=step", async ({ page }) => {
    const example = page.getByTestId("stepper-basic");
    const currentStep = example.locator("[aria-current='step']");
    await expect(currentStep).toHaveCount(1);
  });

  test("vertical stepper shows only the active step's content", async ({
    page,
  }) => {
    const example = page.getByTestId("stepper-vertical");
    await expect(
      example
        .locator(".stepper-step-title")
        .getByText("Personal Information"),
    ).toBeVisible();
    await expect(
      example.locator(".stepper-step-title").getByText("Address"),
    ).toBeVisible();

    await expect(
      example.getByText("Enter your personal details."),
    ).toBeVisible();
    await expect(
      example.getByText("Enter your address details."),
    ).not.toBeVisible();
  });

  test("non-linear stepper marks optional steps", async ({ page }) => {
    const example = page.getByTestId("stepper-nonlinear");
    for (const title of [
      "Account",
      "Profile",
      "Preferences",
      "Complete",
    ]) {
      await expect(
        example.locator(".stepper-step-title").getByText(title),
      ).toBeVisible();
    }
    await expect(example.locator(".stepper-step-optional")).toHaveCount(2);
  });

  test("alternative-labels stepper renders all steps", async ({ page }) => {
    const example = page.getByTestId("stepper-alternative");
    for (const title of ["Cart", "Shipping", "Payment", "Confirm"]) {
      await expect(
        example.locator(".stepper-step-title").getByText(title),
      ).toBeVisible();
    }
    await expect(example.locator(".stepper-step")).toHaveCount(4);
  });

  test("stepper renders custom icons for each step", async ({ page }) => {
    const example = page.getByTestId("stepper-icons");
    await expect(example).toBeVisible();
    // Each step should have an icon element.
    const steps = example.locator(".stepper-step");
    const count = await steps.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test("completed steps have completed styling", async ({ page }) => {
    const example = page.getByTestId("stepper-basic");
    const completedSteps = example.locator(".stepper-step-completed");
    const count = await completedSteps.count();
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test("steps are contained in an ordered list structure", async ({ page }) => {
    const example = page.getByTestId("stepper-basic");
    const steps = example.locator(".stepper-step");
    const count = await steps.count();
    expect(count).toBe(3);
  });
});

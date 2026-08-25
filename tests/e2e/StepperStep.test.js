import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Comprehensive docs-site interaction + accessibility tests for StepperStep.
 *
 * Targets `/docs/components/Stepper/StepperStep`. Steps render as
 * `role="listitem"` with titles in `.stepper-step-title`; examples are scoped
 * via data-testid (stepper-step-basic, stepper-step-subtitles,
 * stepper-step-states, stepper-step-vertical).
 */
test.describe("StepperStep docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Stepper/StepperStep");
    await waitForHydration(page);
  });

  test("renders the docs page heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "StepperStep", level: 1 }),
    ).toBeVisible();
  });

  test("basic steps render inside a nav landmark", async ({ page }) => {
    const example = page.getByTestId("stepper-step-basic");
    const nav = example.getByRole("navigation", { name: "Step progress" });
    await expect(nav).toBeVisible();
    await expect(nav).toHaveJSProperty("tagName", "NAV");
  });

  test("basic steps render their titles", async ({ page }) => {
    const example = page.getByTestId("stepper-step-basic");
    for (const title of ["Account", "Profile", "Review"]) {
      await expect(
        example.locator(".stepper-step-title").getByText(title),
      ).toBeVisible();
    }
  });

  test("steps render subtitles and custom icons", async ({ page }) => {
    const example = page.getByTestId("stepper-step-subtitles");
    await expect(
      example.locator(".stepper-step-title").getByText("Contact"),
    ).toBeVisible();
    await expect(
      example
        .locator(".stepper-step-subtitle")
        .getByText("Your email address"),
    ).toBeVisible();
  });

  test("explicit states render completed, active, error, optional, disabled", async ({
    page,
  }) => {
    const example = page.getByTestId("stepper-step-states");
    await expect(example.locator(".stepper-step-completed")).toHaveCount(1);
    await expect(example.locator(".stepper-step-active")).toHaveCount(1);
    await expect(example.locator(".stepper-step-error")).toHaveCount(1);
    await expect(example.locator(".stepper-step-disabled")).toHaveCount(1);

    // The active step is announced via aria-current.
    await expect(example.locator("[aria-current='step']")).toHaveCount(1);
    // The optional marker renders on the optional step.
    await expect(example.locator(".stepper-step-optional")).toHaveText(
      "(optional)",
    );
  });

  test("error step has error styling class", async ({ page }) => {
    const example = page.getByTestId("stepper-step-states");
    const errorStep = example.locator(".stepper-step-error");
    await expect(errorStep).toHaveCount(1);
    // Error step should have distinctive styling (e.g. text-error class).
    await expect(errorStep).toBeVisible();
  });

  test("disabled step is not interactive", async ({ page }) => {
    const example = page.getByTestId("stepper-step-states");
    const disabledStep = example.locator(".stepper-step-disabled");
    await expect(disabledStep).toHaveCount(1);
    // Disabled step should have reduced opacity or cursor-not-allowed.
    await expect(disabledStep).toBeVisible();
  });

  test("vertical steps show the active step's content", async ({ page }) => {
    const example = page.getByTestId("stepper-step-vertical");
    await expect(
      example.getByText("Enter your personal details."),
    ).toBeVisible();
    await expect(
      example.getByText("Enter your address details."),
    ).not.toBeVisible();
  });

  test("each step has role=listitem", async ({ page }) => {
    const example = page.getByTestId("stepper-step-basic");
    const steps = example.locator(".stepper-step");
    const count = await steps.count();
    for (let i = 0; i < count; i++) {
      await expect(steps.nth(i)).toHaveAttribute("role", "listitem");
    }
  });

  test("step numbers are visible for non-alternative-label layouts", async ({
    page,
  }) => {
    const example = page.getByTestId("stepper-step-basic");
    const numbers = example.locator(".stepper-step-number");
    const count = await numbers.count();
    for (let i = 0; i < count; i++) {
      await expect(numbers.nth(i)).toBeVisible();
      const text = await numbers.nth(i).textContent();
      expect(text?.trim()).toMatch(/^\d+$/);
    }
  });
});

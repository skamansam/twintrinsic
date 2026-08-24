import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site interaction + accessibility tests for the StepperStep component.
 *
 * Targets `/docs/components/Stepper/StepperStep`. Steps render as
 * `role="listitem"` with titles in `.stepper-step-title`; examples are scoped
 * via data-testid (stepper-step-basic, stepper-step-subtitles,
 * stepper-step-states, stepper-step-vertical).
 */
test.describe("StepperStep docs page", () => {
  test("basic steps render their titles", async ({ page }) => {
    await page.goto("/docs/components/Stepper/StepperStep");
    await waitForHydration(page);

    const example = page.getByTestId("stepper-step-basic");
    await expect(example.getByRole("navigation", { name: "Step progress" })).toBeVisible();
    for (const title of ["Account", "Profile", "Review"]) {
      await expect(example.locator(".stepper-step-title").getByText(title)).toBeVisible();
    }
  });

  test("steps render subtitles and custom icons", async ({ page }) => {
    await page.goto("/docs/components/Stepper/StepperStep");
    await waitForHydration(page);

    const example = page.getByTestId("stepper-step-subtitles");
    await expect(example.locator(".stepper-step-title").getByText("Contact")).toBeVisible();
    await expect(
      example.locator(".stepper-step-subtitle").getByText("Your email address"),
    ).toBeVisible();
    await expect(page.getByTestId("stepper-step-subtitles")).toBeVisible();
  });

  test("explicit states render completed, active, error, optional, disabled", async ({ page }) => {
    await page.goto("/docs/components/Stepper/StepperStep");
    await waitForHydration(page);

    const example = page.getByTestId("stepper-step-states");
    // Step classes reflect each state.
    await expect(example.locator(".stepper-step-completed")).toHaveCount(1);
    await expect(example.locator(".stepper-step-active")).toHaveCount(1);
    await expect(example.locator(".stepper-step-error")).toHaveCount(1);
    await expect(example.locator(".stepper-step-disabled")).toHaveCount(1);

    // The active step is announced via aria-current.
    await expect(example.locator("[aria-current='step']")).toHaveCount(1);
    // The optional marker renders on the optional step.
    await expect(example.locator(".stepper-step-optional")).toHaveText("(optional)");
  });

  test("vertical steps show the active step's content", async ({ page }) => {
    await page.goto("/docs/components/Stepper/StepperStep");
    await waitForHydration(page);

    const example = page.getByTestId("stepper-step-vertical");
    await expect(example.getByText("Enter your personal details.")).toBeVisible();
    await expect(example.getByText("Enter your address details.")).not.toBeVisible();
  });
});

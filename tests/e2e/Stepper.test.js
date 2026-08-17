import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site interaction + accessibility tests for the Stepper component.
 *
 * Targets `/docs/components/Stepper/Stepper`. Each example wrapper exposes a
 * `data-testid` (stepper-basic, stepper-vertical, stepper-nonlinear,
 * stepper-alternative, stepper-icons). The Stepper renders a
 * `role="navigation"` landmark; steps are `role="listitem"` with titles in
 * `.stepper-step-title`. Vertical steppers reveal the active step's content.
 */
test.describe("Stepper docs page", () => {
  test("basic stepper renders numbered steps", async ({ page }) => {
    await page.goto("/docs/components/Stepper/Stepper");
    await waitForHydration(page);

    const example = page.getByTestId("stepper-basic");
    await expect(example.getByRole("navigation", { name: "Step progress" })).toBeVisible();

    for (const title of ["Step 1", "Step 2", "Step 3"]) {
      await expect(example.locator(".stepper-step-title").getByText(title)).toBeVisible();
    }
    // Steps show their 1-based index numbers.
    await expect(example.locator(".stepper-step-number")).toHaveText(["1", "2", "3"]);
  });

  test("vertical stepper shows only the active step's content", async ({ page }) => {
    await page.goto("/docs/components/Stepper/Stepper");
    await waitForHydration(page);

    const example = page.getByTestId("stepper-vertical");
    await expect(
      example.locator(".stepper-step-title").getByText("Personal Information"),
    ).toBeVisible();
    await expect(example.locator(".stepper-step-title").getByText("Address")).toBeVisible();
    await expect(example.locator(".stepper-step-title").getByText("Review")).toBeVisible();

    // Active step (index 0) content is expanded; later steps are hidden.
    await expect(example.getByText("Enter your personal details.")).toBeVisible();
    await expect(example.getByText("Enter your address details.")).not.toBeVisible();

    // The step content includes real form controls.
    await expect(example.locator("#full-name")).toBeVisible();
    await expect(example.locator("#email")).toBeVisible();
  });

  test("non-linear stepper marks optional steps", async ({ page }) => {
    await page.goto("/docs/components/Stepper/Stepper");
    await waitForHydration(page);

    const example = page.getByTestId("stepper-nonlinear");
    for (const title of ["Account", "Profile", "Preferences", "Complete"]) {
      await expect(example.locator(".stepper-step-title").getByText(title)).toBeVisible();
    }
    // Only the first two steps are optional.
    await expect(example.locator(".stepper-step-optional")).toHaveCount(2);
  });

  test("alternative-labels stepper renders all steps", async ({ page }) => {
    await page.goto("/docs/components/Stepper/Stepper");
    await waitForHydration(page);

    const example = page.getByTestId("stepper-alternative");
    for (const title of ["Cart", "Shipping", "Payment", "Confirm"]) {
      await expect(example.locator(".stepper-step-title").getByText(title)).toBeVisible();
    }
    await expect(example.locator(".stepper-step")).toHaveCount(4);
  });

  test("stepper renders custom icons for each step", async ({ page }) => {
    await page.goto("/docs/components/Stepper/Stepper");
    await waitForHydration(page);

    const example = page.getByTestId("stepper-icons");
    await expect(example.locator(".stepper-step-custom-icon")).toHaveCount(3);
    await expect(example.locator(".stepper-step-custom-icon svg")).toHaveCount(3);
  });
});

import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site interaction + accessibility tests for the Switch component.
 *
 * Targets `/docs/components/Form/Switch`. The docs examples lack `data-testid`
 * hooks, so selectors use the accessible name (the input carries
 * `aria-label={label}`). Verifies checkbox semantics, toggling, and disabled.
 */
test.describe("Switch docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Form/Switch");
    await waitForHydration(page);
  });

  test("renders the docs page", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Switch", level: 1 })).toBeVisible();
    await expect(page.getByRole("checkbox", { name: "Enable notifications" })).toBeAttached();
  });

  test("switch exposes a checkbox with an accessible name", async ({ page }) => {
    const sw = page.getByRole("checkbox", { name: "Enable notifications" });
    await expect(sw).toBeAttached();
    await expect(sw).not.toBeChecked();
  });

  test("clicking the label toggles the switch", async ({ page }) => {
    const sw = page.getByRole("checkbox", { name: "Enable notifications" });
    await page.getByText("Enable notifications", { exact: true }).click();
    await expect(sw).toBeChecked();
  });

  test("initial checked value is honored", async ({ page }) => {
    await expect(page.getByRole("checkbox", { name: "Dark mode" })).toBeChecked();
  });

  test("disabled switches are not interactive", async ({ page }) => {
    await expect(page.getByRole("checkbox", { name: "Disabled (off)" })).toBeDisabled();
    await expect(page.getByRole("checkbox", { name: "Disabled (on)" })).toBeDisabled();
  });

  test("required switch is marked required", async ({ page }) => {
    await expect(page.getByRole("checkbox", { name: "I agree to the terms" })).toHaveAttribute(
      "required",
      "",
    );
  });
});

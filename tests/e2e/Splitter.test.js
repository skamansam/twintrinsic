import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site interaction + accessibility tests for the Splitter component.
 *
 * Targets `/docs/components/Splitter/Splitter` and scopes selectors through the
 * `data-testid` hooks each example block exposes. Verifies the W3C window
 * splitter pattern: `role="separator"`, `aria-orientation`, `aria-valuenow`
 * range, and keyboard resizing.
 */
test.describe("Splitter docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Splitter/Splitter");
    await waitForHydration(page);
  });

  test("renders the docs page with all live examples", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Splitter", level: 1 })).toBeVisible();
    await expect(page.getByTestId("splitter-horizontal")).toBeVisible();
    await expect(page.getByTestId("splitter-vertical")).toBeVisible();
  });

  test("divider exposes role=separator with an orientation", async ({ page }) => {
    const divider = page.getByTestId("splitter-horizontal").getByRole("separator");
    await expect(divider).toBeVisible();
    await expect(divider).toHaveAttribute("aria-orientation", "horizontal");
    await expect(divider).toHaveAttribute("aria-valuenow", "50");
    await expect(divider).toHaveAttribute("aria-valuemin", "20");
    await expect(divider).toHaveAttribute("aria-valuemax", "80");
  });

  test("vertical splitter has a vertical orientation", async ({ page }) => {
    const divider = page.getByTestId("splitter-vertical").getByRole("separator");
    await expect(divider).toHaveAttribute("aria-orientation", "vertical");
  });

  test("ArrowRight increases the horizontal split size", async ({ page }) => {
    const divider = page.getByTestId("splitter-horizontal").getByRole("separator");

    await divider.focus();
    await page.keyboard.press("ArrowRight");

    await expect(divider).toHaveAttribute("aria-valuenow", "55");
  });
});

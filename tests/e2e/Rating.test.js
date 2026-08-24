import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site interaction + accessibility tests for the Rating component.
 *
 * Targets `/docs/components/Form/Rating`. Each demo exposes a `data-testid`
 * wrapper (`rating-basic-usage`, ...). Interactive ratings render with
 * `role="slider"` and expose aria-valuemin/max/now.
 */
test.describe("Rating docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Form/Rating");
    await waitForHydration(page);
  });

  test("renders the docs page heading", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Rating", level: 1 })).toBeVisible();
  });

  test("basic rating exposes slider semantics", async ({ page }) => {
    const demo = page.getByTestId("rating-basic-usage");
    const slider = demo.getByRole("slider");
    await expect(slider).toHaveAttribute("aria-valuemin", "0");
    await expect(slider).toHaveAttribute("aria-valuemax", "5");
    await expect(slider).toHaveAttribute("aria-valuenow", "3");
  });

  test("keyboard interaction changes the rating", async ({ page }) => {
    const demo = page.getByTestId("rating-basic-usage");
    const slider = demo.getByRole("slider");
    await slider.focus();
    await slider.press("ArrowRight");
    await expect(slider).toHaveAttribute("aria-valuenow", "4");
    await slider.press("ArrowLeft");
    await expect(slider).toHaveAttribute("aria-valuenow", "3");
  });

  test("half-star rating allows 0.5 steps", async ({ page }) => {
    const demo = page.getByTestId("rating-half-star");
    const slider = demo.getByRole("slider").first();
    await expect(slider).toHaveAttribute("aria-valuenow", "3.5");
  });

  test("read-only rating is not interactive", async ({ page }) => {
    const demo = page.getByTestId("rating-states");
    const readOnly = demo.getByRole("img").first();
    await expect(readOnly).toHaveAttribute("aria-readonly", "true");
  });

  test("value display shows the numeric rating", async ({ page }) => {
    const demo = page.getByTestId("rating-value-display");
    await expect(demo.locator(".rating-value").first()).toHaveText("4");
  });

  test("custom max renders more items", async ({ page }) => {
    const demo = page.getByTestId("rating-custom-max");
    const slider = demo.getByRole("slider").first();
    await expect(slider).toHaveAttribute("aria-valuemax", "10");
    await expect(slider).toHaveAttribute("aria-valuenow", "3");
  });
});

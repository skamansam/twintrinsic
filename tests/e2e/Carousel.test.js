import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site interaction + accessibility tests for the Carousel component.
 *
 * Targets `/docs/components/Carousel/Carousel` and scopes selectors through the
 * `data-testid` hooks each example block exposes. Verifies the carousel
 * `role="region"`/`aria-roledescription`, slide `role="tabpanel"` visibility,
 * and arrow/indicator navigation.
 */
test.describe("Carousel docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Carousel/Carousel");
    await waitForHydration(page);
  });

  test("renders the docs page with all live examples", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Carousel", level: 1 })).toBeVisible();
    await expect(page.getByTestId("carousel-basic")).toBeVisible();
    await expect(page.getByTestId("carousel-fade")).toBeVisible();
    await expect(page.getByTestId("carousel-no-indicators")).toBeVisible();
  });

  test("basic carousel exposes the region role and slide panels", async ({ page }) => {
    const example = page.getByTestId("carousel-basic");
    const region = example.getByRole("region", { name: "Carousel" });

    await expect(region).toBeVisible();
    await expect(region).toHaveAttribute("aria-roledescription", "carousel");
    await expect(region.locator('[role="tabpanel"]')).toHaveCount(3);
  });

  test("first slide is active and later slides are hidden", async ({ page }) => {
    const example = page.getByTestId("carousel-basic");
    const slides = example.locator('[role="tabpanel"]');

    await expect(slides.nth(0)).toHaveAttribute("aria-hidden", "false");
    await expect(slides.nth(1)).toHaveAttribute("aria-hidden", "true");
    await expect(slides.nth(2)).toHaveAttribute("aria-hidden", "true");
  });

  test("next arrow advances to the second slide", async ({ page }) => {
    const example = page.getByTestId("carousel-basic");
    const slides = example.locator('[role="tabpanel"]');

    await example.getByRole("button", { name: "Next slide" }).click();
    await expect(slides.nth(1)).toHaveAttribute("aria-hidden", "false");
    await expect(slides.nth(0)).toHaveAttribute("aria-hidden", "true");
  });

  test("indicators are tabs that switch slides", async ({ page }) => {
    const example = page.getByTestId("carousel-basic");
    const slides = example.locator('[role="tabpanel"]');
    const indicators = example.getByRole("tab");

    await expect(indicators).toHaveCount(3);
    await indicators.nth(2).click();
    await expect(slides.nth(2)).toHaveAttribute("aria-hidden", "false");
  });

  test("no-indicators carousel hides the tablist", async ({ page }) => {
    const example = page.getByTestId("carousel-no-indicators");
    await expect(example.locator('[role="tablist"]')).toBeHidden();
    await expect(example.locator('[role="tabpanel"]')).toHaveCount(3);
  });
});

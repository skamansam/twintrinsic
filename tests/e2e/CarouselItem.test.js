import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site interaction + accessibility tests for the CarouselItem component.
 *
 * Targets `/docs/components/Carousel/CarouselItem`. Slides render as
 * `role="tabpanel"` inside a carousel region; indicators are tabs. Examples
 * are scoped via data-testid (carousel-item-basic, carousel-item-fade,
 * carousel-item-no-controls).
 */
test.describe("CarouselItem docs page", () => {
  test("basic carousel renders slides and switches on indicator click", async ({ page }) => {
    await page.goto("/docs/components/Carousel/CarouselItem");
    await waitForHydration(page);

    const example = page.getByTestId("carousel-item-basic");
    await expect(example.getByRole("region", { name: "Carousel" })).toBeVisible();
    // Slides render; only the active one is exposed to AT (role tabpanel
    // excludes aria-hidden slides, so count the elements directly).
    await expect(example.locator(".carousel-item")).toHaveCount(3);
    await expect(example.getByRole("tabpanel")).toHaveCount(1);

    // The first slide is active; the others are aria-hidden.
    await expect(example.locator(".carousel-item-active")).toHaveText(/Slide 1/);
    await expect(example.locator(".carousel-item[aria-hidden='true']")).toHaveCount(2);

    // Clicking the second indicator activates slide 2.
    await example.getByRole("tab", { name: "Slide 2" }).click();
    await expect(example.locator(".carousel-item-active")).toHaveText(/Slide 2/);
  });

  test("fade-transition carousel renders its slides", async ({ page }) => {
    await page.goto("/docs/components/Carousel/CarouselItem");
    await waitForHydration(page);

    const example = page.getByTestId("carousel-item-fade");
    await expect(example.locator(".carousel-transition-fade")).toBeVisible();
    await expect(example.locator(".carousel-item")).toHaveCount(3);
    await expect(example.locator(".carousel-item-active")).toHaveText(/First/);
  });

  test("carousel without controls hides arrows and indicators", async ({ page }) => {
    await page.goto("/docs/components/Carousel/CarouselItem");
    await waitForHydration(page);

    const example = page.getByTestId("carousel-item-no-controls");
    await expect(example.locator(".carousel-item")).toHaveCount(2);
    await expect(example.locator(".carousel-arrow")).toHaveCount(0);
    await expect(example.getByRole("tablist")).toHaveCount(0);
  });
});

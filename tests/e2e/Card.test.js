import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site smoke tests for the Card component.
 *
 * The live examples live on `/docs/components/Card/Card` (the
 * `Panel/Card` docs page is documentation-only). Component-level
 * behavior (clickable-card keyboard support, media aspect ratio) is
 * covered by the Storybook vitest suite (`pnpm test:storybook`).
 *
 * These tests verify the docs landing page renders the live examples
 * (`data-testid="card-*"` hooks) with header, media, and footer
 * content.
 */
test.describe("Card docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Card/Card");
    await waitForHydration(page);
  });

  test("renders the docs page with all live examples", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Card", level: 1 })).toBeVisible();
    await expect(page.getByTestId("card-basic")).toBeVisible();
    await expect(page.getByTestId("card-with-media")).toBeVisible();
    await expect(page.getByTestId("card-with-footer")).toBeVisible();
  });

  test("basic card renders with header and content", async ({ page }) => {
    const card = page.getByTestId("card-basic").locator(".card");
    await expect(card).toBeVisible();
    await expect(card).toHaveClass(/border/);
    await expect(card.getByText("Product Details")).toBeVisible();
  });

  test("card with media renders an image with alt text", async ({ page }) => {
    const card = page.getByTestId("card-with-media").locator(".card");
    const media = card.locator(".card-media img");
    await expect(media).toBeVisible();
    await expect(media).toHaveAttribute("alt", "Featured blog post cover");
  });

  test("card with footer renders an action button", async ({ page }) => {
    const card = page.getByTestId("card-with-footer").locator(".card");
    const button = card.locator(".card-footer button").first();
    await expect(button).toBeVisible();
    await expect(button).toHaveText("View report");
  });
});

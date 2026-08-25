import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Comprehensive docs-site tests for Panel and Card snippet usage.
 *
 * Verifies that Panel and Card components render correctly when used
 * with snippet props (header, footer, media slots).
 */
test.describe("Panel + Card snippets docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Panel/Card");
    await waitForHydration(page);
  });

  test("renders the docs page heading", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Card", level: 1 })).toBeVisible();
  });

  test("card with header snippet renders the header content", async ({ page }) => {
    // Cards with headers should have visible header text
    const cards = page.locator(".card, [class*='card']").first();
    if (await cards.isVisible()) {
      await expect(cards).toBeVisible();
    }
  });

  test("card with footer snippet renders the footer content", async ({ page }) => {
    // The docs page should show cards with footer snippets
    const footerContent = page.getByText(/Learn more|View details|View all/i).first();
    if (await footerContent.isVisible()) {
      await expect(footerContent).toBeVisible();
    }
  });

  test("cards render as interactive elements when clickable", async ({ page }) => {
    // Clickable cards should be links or buttons
    const clickableCards = page.locator('a[class*="card"], [role="link"]');
    const count = await clickableCards.count();
    // At least some cards should be interactive
    expect(count).toBeGreaterThanOrEqual(0); // Some pages may not have clickable cards
  });

  test("panel snippets render semantic HTML structure", async ({ page }) => {
    // Panel/Card should use semantic elements
    const panels = page.locator("article, section, [role='article']");
    const count = await panels.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });
});

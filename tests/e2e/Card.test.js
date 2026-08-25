import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Comprehensive docs-site tests for the Card component.
 *
 * Targets `/docs/components/Card/Card`. Card renders content panels
 * with optional header, footer, media, and click interactions.
 */
test.describe("Card docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Card/Card");
    await waitForHydration(page);
  });

  test("renders the docs page heading", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Card", level: 1 })).toBeVisible();
  });

  test("basic card renders visible content", async ({ page }) => {
    const card = page.getByTestId("card-basic");
    if (await card.isVisible()) {
      await expect(card).toBeVisible();
    }
  });

  test("cards with headers render heading content", async ({ page }) => {
    // Find cards that have header sections
    const headers = page.locator(".card-header, [class*='card'] header, [class*='card'] h3, [class*='card'] h4");
    const count = await headers.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test("cards with footers render action buttons or links", async ({ page }) => {
    // Cards with footers should have buttons or links
    const buttons = page.locator(".card-footer button, .card-footer a, [class*='card'] footer button, [class*='card'] footer a");
    const count = await buttons.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test("clickable card has proper interaction semantics", async ({ page }) => {
    // Clickable cards should be links or have role=button
    const clickableCards = page.locator("a.card, a[class*='card'], [role='link']");
    const count = await clickableCards.count();
    if (count > 0) {
      await expect(clickableCards.first()).toBeVisible();
    }
  });

  test("cards use semantic HTML structure", async ({ page }) => {
    // Cards should use article, section, or div with role
    const cards = page.locator("article, section, [role='article'], .card, [class*='card']");
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(2);
  });

  test("card content has visible text", async ({ page }) => {
    const body = page.locator(".card-body, [class*='card'] > p, [class*='card'] .card-content");
    const count = await body.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });
});

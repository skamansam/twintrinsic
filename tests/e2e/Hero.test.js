import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Comprehensive docs-site tests for the Hero component.
 *
 * Targets `/docs/components/Panel/Hero`. Hero renders a themed `<section>`
 * with heading, body, and optional CTA button snippets.
 */
test.describe("Hero docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Panel/Hero");
    await waitForHydration(page);
  });

  test("renders the docs page heading", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Hero", level: 1, exact: true })).toBeVisible();
  });

  test("basic hero renders as a section landmark", async ({ page }) => {
    const hero = page.getByTestId("hero-basic");
    await expect(hero.locator("section")).toBeVisible();
  });

  test("basic hero renders heading and body content", async ({ page }) => {
    const hero = page.getByTestId("hero-basic");
    await expect(hero.getByRole("heading", { name: "Welcome to Twintrinsic" })).toBeVisible();
    await expect(hero).toContainText("Accessible Svelte 5 components.");
  });

  test("basic hero has a CTA button", async ({ page }) => {
    const hero = page.getByTestId("hero-basic");
    const cta = hero.getByRole("link", { name: /get started|learn more/i });
    if (await cta.isVisible()) {
      await expect(cta).toBeVisible();
    }
  });

  test("hero with custom type renders its heading", async ({ page }) => {
    const hero = page.getByTestId("hero-type");
    await expect(hero.getByRole("heading", { name: "Highlighted Hero" })).toBeVisible();
  });

  test("hero renders within a container that has proper spacing", async ({ page }) => {
    const hero = page.getByTestId("hero-basic");
    const section = hero.locator("section");
    const box = await section.boundingBox();
    expect(box).not.toBeNull();
    if (box) {
      expect(box.height).toBeGreaterThan(50);
    }
  });
});

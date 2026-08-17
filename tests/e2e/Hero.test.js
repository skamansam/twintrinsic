import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site tests for the Hero component.
 *
 * Targets `/docs/components/Panel/Hero`. Hero renders a themed `<section>`
 * with a heading snippet. The examples expose `data-testid` hooks
 * (`hero-basic`, `hero-type`).
 */
test.describe("Hero docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Panel/Hero");
    await waitForHydration(page);
  });

  test("renders the docs page heading", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Hero", level: 1, exact: true })).toBeVisible();
  });

  test("basic hero renders heading and body content", async ({ page }) => {
    const hero = page.getByTestId("hero-basic");
    await expect(hero.locator("section")).toBeVisible();
    await expect(hero.getByRole("heading", { name: "Welcome to Twintrinsic" })).toBeVisible();
    await expect(hero).toContainText("Accessible Svelte 5 components.");
  });

  test("hero with custom type renders its heading", async ({ page }) => {
    const hero = page.getByTestId("hero-type");
    await expect(hero.getByRole("heading", { name: "Highlighted Hero" })).toBeVisible();
  });
});

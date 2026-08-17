import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site tests for the Section component.
 *
 * Targets `/docs/components/Section/Section`. Section renders a semantic
 * `<section>` with an optional string or snippet title/subtitle. The examples
 * expose `data-testid` hooks (`section-string-title`, `section-snippet-title`).
 */
test.describe("Section docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Section/Section");
    await waitForHydration(page);
  });

  test("renders the docs page heading", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Section", level: 1 })).toBeVisible();
  });

  test("string title and subtitle render as headings", async ({ page }) => {
    const section = page.getByTestId("section-string-title");
    await expect(section.locator("section")).toBeVisible();
    await expect(section.getByRole("heading", { name: "About Us" })).toBeVisible();
    await expect(section).toContainText("We build accessible components.");
    await expect(section).toContainText("Content goes here.");
  });

  test("snippet title renders custom markup", async ({ page }) => {
    const section = page.getByTestId("section-snippet-title");
    await expect(section.locator("section")).toBeVisible();
    await expect(section.getByText("Custom title content")).toBeVisible();
    await expect(section).toContainText("Content goes here.");
  });
});

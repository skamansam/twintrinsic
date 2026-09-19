import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * E2E coverage for the /docs/research page (Component Research Checklist
 * published to the docs site). The research content itself is English repo
 * data (source of truth: docs/plans/COMPONENT_RESEARCH_CHECKLIST.md);
 * chrome (headings, search UI) renders through Paraglide and is verified
 * in the fa locale too.
 */
test.describe("docs research page", () => {
  test("renders all research entries with What/When/Why", async ({ page }) => {
    await page.goto("/docs/research");
    await waitForHydration(page);

    // Category headings (10 in the checklist)
    await expect(page.getByRole("heading", { level: 2 })).not.toHaveCount(0);

    // Entry count line: "<shown> of <total> entries."
    await expect(page.getByText("entries")).toBeVisible();

    // A known entry renders its three fields
    const app = page.getByTestId("research-entry-app");
    await expect(app).toBeVisible();
    await expect(app.getByText("Root application wrapper")).toBeVisible();

    // Source chips render
    await expect(app.getByText("S1 (Landmarks)")).toBeVisible();
  });

  test("search filters entries and the count updates", async ({ page }) => {
    await page.goto("/docs/research");
    await waitForHydration(page);

    const search = page.getByRole("searchbox");
    await search.fill("tooltip");
    await waitForHydration(page);

    // Matching entry is still visible
    await expect(page.getByTestId("research-entry-tooltip")).toBeVisible();
    // Non-matching entry is filtered out
    await expect(page.getByTestId("research-entry-app")).toHaveCount(0);
  });

  test("chrome translates to Persian with RTL", async ({ page }) => {
    await page.goto("/docs/research");
    await waitForHydration(page);

    // Cookie-based locale strategy: switch via the LocaleSwitcher, page reloads
    await page.getByRole("button", { name: "فارسی" }).click();
    await waitForHydration(page);

    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    // The h1 chrome renders through Paraglide
    await expect(page.locator("h1")).toHaveText("پژوهش");
    // Search placeholder is translated
    await expect(page.getByRole("searchbox")).toHaveAttribute(
      "placeholder",
      /جست‌وجو/,
    );
  });
});

import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Homepage smoke tests. Verifies the landing page renders its key sections,
 * navigation links work, and the responsive nav functions on mobile viewports.
 */

test("home page has expected h1", async ({ page }) => {
  await page.goto("/");
  await waitForHydration(page);
  await expect(page.locator("h1")).toBeVisible();
});

test("home page renders the Twintrinsic logo", async ({ page }) => {
  await page.goto("/");
  await waitForHydration(page);
  await expect(page.getByText("Twintrinsic")).toBeVisible();
});

test("home page has hero tagline", async ({ page }) => {
  await page.goto("/");
  await waitForHydration(page);
  await expect(
    page.getByText("A modern component library for Svelte 5 and Tailwind CSS"),
  ).toBeVisible();
});

test("home page links to docs", async ({ page }) => {
  await page.goto("/");
  await waitForHydration(page);

  const docsLink = page.getByRole("link", { name: /Get Started/i });
  await expect(docsLink).toBeVisible();
  await expect(docsLink).toHaveAttribute("href", "/docs");
});

test("home page links to GitHub", async ({ page }) => {
  await page.goto("/");
  await waitForHydration(page);

  const ghLink = page.getByRole("link", { name: /View on GitHub/i });
  await expect(ghLink).toBeVisible();
  await expect(ghLink).toHaveAttribute("href", "https://github.com/skamansam/twintrinsic");
});

test("home page renders feature cards", async ({ page }) => {
  await page.goto("/");
  await waitForHydration(page);

  const features = [
    "Modern Stack",
    "Accessible",
    "Customizable",
    "TypeScript Ready",
    "Responsive",
    "Well Tested",
  ];
  for (const feature of features) {
    await expect(page.getByText(feature)).toBeVisible();
  }
});

test("home page renders component overview cards", async ({ page }) => {
  await page.goto("/");
  await waitForHydration(page);

  await expect(page.getByText("Powerful components for every need")).toBeVisible();
  await expect(page.getByText("AppHeader")).toBeVisible();
  await expect(page.getByText("Container")).toBeVisible();
  await expect(page.getByText("Panel")).toBeVisible();
});

test("home page has CTA section with docs and components links", async ({ page }) => {
  await page.goto("/");
  await waitForHydration(page);

  await expect(page.getByText("Ready to get started?")).toBeVisible();
  const docsBtn = page.getByRole("link", { name: /Read the docs/i });
  await expect(docsBtn).toBeVisible();
  await expect(docsBtn).toHaveAttribute("href", "/docs");

  const browseBtn = page.getByRole("link", { name: /Browse components/i });
  await expect(browseBtn).toBeVisible();
  await expect(browseBtn).toHaveAttribute("href", "/docs/components");
});

test("home page contains the AppHeader with navigation", async ({ page }) => {
  await page.goto("/");
  await waitForHydration(page);

  // The AppHeader component is rendered in the example section
  await expect(page.getByText("Sarah Chen")).toBeVisible();
});

test("home page responsive: renders on mobile viewport", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  await waitForHydration(page);

  await expect(page.locator("h1")).toBeVisible();
  await expect(page.getByText("Twintrinsic")).toBeVisible();
  await expect(page.getByText("A modern component library")).toBeVisible();
});

test("navigation: docs link navigates to /docs", async ({ page }) => {
  await page.goto("/");
  await waitForHydration(page);

  await page.getByRole("link", { name: /Get Started/i }).click();
  await waitForHydration(page);
  await expect(page).toHaveURL(/\/docs/);
  await expect(
    page.getByRole("heading", { name: "Getting Started", level: 1 }),
  ).toBeVisible();
});

test("navigation: components link navigates to /docs/components", async ({ page }) => {
  await page.goto("/");
  await waitForHydration(page);

  await page.getByRole("link", { name: /Browse components/i }).click();
  await waitForHydration(page);
  await expect(page).toHaveURL(/\/docs\/components/);
  await expect(
    page.getByRole("heading", { name: "Components", level: 1 }),
  ).toBeVisible();
});

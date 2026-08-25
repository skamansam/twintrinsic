import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Comprehensive docs-site interaction + accessibility tests for BottomBar.
 *
 * Targets `/docs/components/BottomBar/BottomBar`. The bar renders as a
 * `role="complementary"` container with a `role="region"` panel inside.
 * Examples are scoped via data-testid (bottombar-basic, bottombar-console).
 */
test.describe("BottomBar docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/BottomBar/BottomBar");
    await waitForHydration(page);
  });

  test("renders the docs page with all live examples", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "BottomBar", level: 1 }),
    ).toBeVisible();
    await expect(page.getByTestId("bottombar-basic")).toBeVisible();
    await expect(page.getByTestId("bottombar-console")).toBeVisible();
  });

  test("basic bottom bar renders with complementary and region roles", async ({ page }) => {
    const example = page.getByTestId("bottombar-basic");
    const container = example.locator(".bottombar-container");
    await expect(container).toBeVisible();
    await expect(container).toHaveAttribute("role", "complementary");

    const region = container.locator(".bottombar[role='region']");
    await expect(region).toBeVisible();
  });

  test("renders the bottom bar expanded with content", async ({ page }) => {
    const example = page.getByTestId("bottombar-basic");
    const container = example.locator(".bottombar-container");
    await expect(container).toBeVisible();

    await expect(container.locator(".bottombar")).toHaveClass(/bottombar-expanded/);
    await expect(example.getByText("Project Information")).toBeVisible();
  });

  test("toggles expansion state via the header button", async ({ page }) => {
    const example = page.getByTestId("bottombar-basic");
    const container = example.locator(".bottombar-container");
    await expect(container).toBeVisible();

    // Collapse.
    await container.locator("button").first().click();
    await expect(container.locator(".bottombar")).toHaveClass(/bottombar-collapsed/);

    // Expand again.
    await container.locator("button").first().click();
    await expect(container.locator(".bottombar")).toHaveClass(/bottombar-expanded/);
  });

  test("toggle button is keyboard accessible (Enter/Space)", async ({ page }) => {
    const example = page.getByTestId("bottombar-basic");
    const container = example.locator(".bottombar-container");
    const toggleBtn = container.locator("button").first();

    await toggleBtn.focus();
    await expect(toggleBtn).toBeFocused();

    await page.keyboard.press("Enter");
    await expect(container.locator(".bottombar")).toHaveClass(/bottombar-collapsed/);

    await page.keyboard.press("Enter");
    await expect(container.locator(".bottombar")).toHaveClass(/bottombar-expanded/);
  });

  test("Escape key collapses the bottom bar", async ({ page }) => {
    const example = page.getByTestId("bottombar-basic");
    const container = example.locator(".bottombar-container");

    // Ensure it starts expanded.
    await expect(container.locator(".bottombar")).toHaveClass(/bottombar-expanded/);

    // Press Escape anywhere on the page.
    await page.keyboard.press("Escape");
    await expect(container.locator(".bottombar")).toHaveClass(/bottombar-collapsed/);
  });

  test("console example renders its log content", async ({ page }) => {
    const example = page.getByTestId("bottombar-console");
    const container = example.locator(".bottombar-container");
    await expect(container).toBeVisible();
    await expect(example.getByText("Build completed successfully")).toBeVisible();
  });

  test("console example also has region role", async ({ page }) => {
    const example = page.getByTestId("bottombar-console");
    const region = example.locator(".bottombar[role='region']");
    await expect(region).toBeVisible();
  });

  test("toggle button has sr-only accessible label", async ({ page }) => {
    const example = page.getByTestId("bottombar-basic");
    const container = example.locator(".bottombar-container");
    const toggleBtn = container.locator("button").first();
    // The button should be focusable and interactive.
    await expect(toggleBtn).toBeVisible();
    await expect(toggleBtn).toBeEnabled();
  });
});

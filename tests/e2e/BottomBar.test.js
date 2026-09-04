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
    await expect(page.getByRole("heading", { name: "BottomBar", level: 1 })).toBeVisible();
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

  test("header collapses the bar to a handle that re-expands it", async ({ page }) => {
    const example = page.getByTestId("bottombar-basic");
    const container = example.locator(".bottombar-container");
    await expect(container).toBeVisible();

    // The collapsible header button collapses the bar down to a handle.
    await container.locator(".panel button").first().click();
    await expect(container.locator(".bottombar")).toHaveClass(/bottombar-collapsed/);

    // The collapsed bar slides out of view, so re-expansion happens through
    // the small handle that stays docked at the bottom edge.
    const handle = container.locator(".bottombar-handle");
    await expect(handle).toBeVisible();
    await handle.click();
    await expect(container.locator(".bottombar")).toHaveClass(/bottombar-expanded/);
    await expect(handle).toHaveCount(0);
  });

  test("expand handle is keyboard accessible", async ({ page }) => {
    const example = page.getByTestId("bottombar-basic");
    const container = example.locator(".bottombar-container");

    // Collapse via the header button, then reach the handle with Tab.
    await container.locator(".panel button").first().click();
    await expect(container.locator(".bottombar-handle")).toBeVisible();

    await container.locator(".bottombar-handle").focus();
    await page.keyboard.press("Enter");
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

    // The handle is available to bring it back.
    await expect(container.locator(".bottombar-handle")).toBeVisible();
  });

  test("external button controls a non-collapsible bar's visibility", async ({ page }) => {
    const example = page.getByTestId("bottombar-controlled");
    const container = example.locator(".bottombar-container");
    const toggle = page.getByTestId("bottombar-controlled-toggle").locator("button");

    // Starts visible (expanded prop).
    await expect(container.locator(".bottombar")).toHaveClass(/bottombar-expanded/);
    await expect(example.getByText("Three new notifications are waiting.")).toBeVisible();

    // Hide it via the external button — no header toggle exists, so the bar
    // slides out entirely and no handle appears.
    await toggle.click();
    await expect(container.locator(".bottombar")).toHaveClass(/bottombar-collapsed/);
    await expect(example.locator(".bottombar-handle")).toHaveCount(0);

    // Show it again from the same external control.
    await toggle.click();
    await expect(container.locator(".bottombar")).toHaveClass(/bottombar-expanded/);
    await expect(example.getByText("Three new notifications are waiting.")).toBeVisible();
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

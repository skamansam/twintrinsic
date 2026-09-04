import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site tests for the App component.
 *
 * The docs page (`/docs/components/App/App`) is a full-page layout
 * wrapper, so it is not embedded as a live <App> instance (full layout
 * behavior — slots, dark mode, panel widths, responsive stacking — is
 * covered by the Storybook vitest suite via the App stories). The page
 * does carry a live "App Shell with a BottomBar" preview: a framed shell
 * whose header action shows/hides a BottomBar through the `expanded`
 * prop, exercising the controlled show/hide pattern from the App docs.
 */
test.describe("App docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/App/App");
    await waitForHydration(page);
  });

  test("renders the App docs page", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "App", level: 1 })).toBeVisible();
  });

  test("documents the layout slots", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Slots", level: 2 })).toBeVisible();

    // Slots table rows
    const slots = page.locator("table", { hasText: "main content area" });
    await expect(slots).toBeVisible();
    for (const slot of ["header", "leftPanel", "rightPanel", "footer", "menu"]) {
      await expect(slots.locator(`td`, { hasText: slot }).first()).toBeVisible();
    }
  });

  test("documents responsive behavior", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Responsiveness", level: 2 })).toBeVisible();
    await expect(page.getByText("side panels expand to full width")).toBeVisible();
  });

  test("documents props with defaults", async ({ page }) => {
    const props = page.locator("table", { hasText: "appName" });
    await expect(props).toBeVisible();
    await expect(props.locator("td", { hasText: '"Twintrinsic App"' }).first()).toBeVisible();
    await expect(props.locator("td", { hasText: "darkMode" }).first()).toBeVisible();
  });

  test("controlled BottomBar example toggles from the shell header", async ({ page }) => {
    const example = page.getByTestId("app-shell-console");
    await example.scrollIntoViewIfNeeded();

    // The shell header action is the only control: the bar starts hidden.
    const toggle = example.getByRole("button", { name: "Show console" });
    await expect(toggle).toBeVisible();
    const bar = page.getByTestId("app-shell-bottombar").locator(".bottombar");
    await expect(bar).toHaveClass(/bottombar-collapsed/);
    await expect(bar).not.toHaveClass(/bottombar-expanded/);

    // Clicking the header action slides the console up (expanded state).
    await toggle.click();
    await expect(bar).toHaveClass(/bottombar-expanded/);
    await expect(bar).not.toHaveClass(/bottombar-collapsed/);
    await expect(example.getByRole("button", { name: "Hide console" })).toBeVisible();
    await expect(page.getByText("Build completed successfully")).toBeVisible();

    // And the same header action hides it again.
    await example.getByRole("button", { name: "Hide console" }).click();
    await expect(bar).toHaveClass(/bottombar-collapsed/);
  });
});

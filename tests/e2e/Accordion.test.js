import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site smoke tests for the Accordion component.
 *
 * Component-level behavior (single-vs-multiple expansion, keyboard
 * toggle, disabled items) is covered by the Storybook vitest suite
 * (`pnpm test:storybook`, every story is a render test plus the
 * `play`-function interaction tests in stories/Accordion.stories.svelte).
 *
 * These tests only verify the docs landing page renders every live
 * example and that the native disclosure semantics still hold on the
 * page. They target `/docs/components/Accordion/Accordion` and scope
 * selectors through the `data-testid` hooks each example block exposes.
 */
test.describe("Accordion docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Accordion/Accordion");
    await waitForHydration(page);
  });

  test("renders the docs page with all live examples", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Accordion", level: 1 })).toBeVisible();
    await expect(page.getByTestId("accordion-basic")).toBeVisible();
    await expect(page.getByTestId("accordion-multiple")).toBeVisible();
    await expect(page.getByTestId("accordion-no-border")).toBeVisible();
    await expect(page.getByTestId("accordion-all-collapsed")).toBeVisible();
  });

  test("basic accordion is bordered and opens the first item by default", async ({ page }) => {
    const accordion = page.getByTestId("accordion-basic").locator(".accordion");
    await expect(accordion).toHaveClass(/border/);

    const details = accordion.locator("details.accordion-item");
    await expect(details.nth(0)).toHaveAttribute("open", "");
    await expect(details.nth(1)).not.toHaveAttribute("open", "");
  });

  test("only one item can be expanded at a time by default", async ({ page }) => {
    const accordion = page.getByTestId("accordion-basic").locator(".accordion");
    const details = accordion.locator("details.accordion-item");

    // Second item was not open initially
    await expect(details.nth(1)).not.toHaveAttribute("open", "");

    // Clicking the second item closes the first
    await details.nth(1).locator("summary").click();
    await expect(details.nth(1)).toHaveAttribute("open", "");
    await expect(details.nth(0)).not.toHaveAttribute("open", "");
  });

  test("allowMultiple keeps several items expanded", async ({ page }) => {
    const accordion = page.getByTestId("accordion-multiple").locator(".accordion");
    const details = accordion.locator("details.accordion-item");

    // First item is expanded by default
    await expect(details.nth(0)).toHaveAttribute("open", "");

    // Opening the second item keeps the first open
    await details.nth(1).locator("summary").click();
    await expect(details.nth(0)).toHaveAttribute("open", "");
    await expect(details.nth(1)).toHaveAttribute("open", "");
  });

  test("accordion without border omits the border classes", async ({ page }) => {
    const accordion = page.getByTestId("accordion-no-border").locator(".accordion");
    await expect(accordion).not.toHaveClass(/border/);
  });

  test("toggles an item with the Enter key", async ({ page }) => {
    const accordion = page.getByTestId("accordion-basic").locator(".accordion");
    const summary = accordion.locator("details.accordion-item > summary").nth(1);

    await summary.focus();
    await page.keyboard.press("Enter");

    await expect(accordion.locator("details.accordion-item").nth(1)).toHaveAttribute("open", "");
  });
});

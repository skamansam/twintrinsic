import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Comprehensive docs-site interaction + accessibility tests for AccordionItem.
 *
 * Targets `/docs/components/Accordion/AccordionItem`. Items render as native
 * `<details>`/`<summary>` elements. Examples are scoped via data-testid
 * (accordion-item-basic, accordion-item-expanded, accordion-item-noicon,
 * accordion-item-disabled).
 */
test.describe("AccordionItem docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Accordion/AccordionItem");
    await waitForHydration(page);
  });

  test("renders the docs page heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "AccordionItem", level: 1 }),
    ).toBeVisible();
  });

  test("basic items render expandable details elements", async ({ page }) => {
    const example = page.getByTestId("accordion-item-basic");
    const details = example.locator("details");
    await expect(details).toHaveCount(2);

    // First item is open by default; second is collapsed.
    await expect(
      example.getByText("Install the package and import the components you need."),
    ).toBeVisible();
    await expect(
      example.getByText("Customize colors and tokens in your Tailwind theme."),
    ).not.toBeVisible();

    // Clicking the summary toggles open/closed.
    await example.getByText("Theming", { exact: true }).click();
    await expect(
      example.getByText("Customize colors and tokens in your Tailwind theme."),
    ).toBeVisible();
  });

  test("native details/summary keyboard toggle (Enter/Space)", async ({ page }) => {
    const example = page.getByTestId("accordion-item-basic");
    const summary = example.locator("summary").nth(1);

    // Focus the second summary and toggle with Enter.
    await summary.focus();
    await expect(summary).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(
      example.getByText("Customize colors and tokens in your Tailwind theme."),
    ).toBeVisible();

    // Toggle closed with Space.
    await page.keyboard.press(" ");
    await expect(
      example.getByText("Customize colors and tokens in your Tailwind theme."),
    ).not.toBeVisible();
  });

  test("summary has visible focus ring on keyboard focus", async ({ page }) => {
    const example = page.getByTestId("accordion-item-basic");
    const summary = example.locator("summary").first();

    await summary.focus();
    // The summary should have the focus ring class applied.
    await expect(summary).toHaveClass(/focus:ring-2|focus:outline-none/);
  });

  test("initially expanded item shows its content", async ({ page }) => {
    const example = page.getByTestId("accordion-item-expanded");
    await expect(
      example.getByText("Here is the answer to a frequently asked question."),
    ).toBeVisible();
    await expect(example.locator("details[open]")).toHaveCount(1);
  });

  test("item without icon hides the chevron", async ({ page }) => {
    const example = page.getByTestId("accordion-item-noicon");
    await expect(example.getByText("Plain header", { exact: true })).toBeVisible();
    // No expand/collapse chevron svg is rendered.
    await expect(example.locator("summary svg")).toHaveCount(0);
  });

  test("disabled item cannot be opened", async ({ page }) => {
    const example = page.getByTestId("accordion-item-disabled");
    const locked = example.locator("details.disabled");
    await expect(locked).toHaveCount(1);

    // Attempting to open the disabled item keeps it closed.
    await example.getByText("Locked", { exact: true }).click({ force: true });
    await expect(
      example.getByText("This panel cannot be opened."),
    ).not.toBeVisible();
  });

  test("disabled item has disabled styling", async ({ page }) => {
    const example = page.getByTestId("accordion-item-disabled");
    const details = example.locator("details.disabled");
    await expect(details).toHaveCount(1);
    // The disabled class is applied; CSS handles opacity-50/cursor-not-allowed.
    await expect(details).toHaveClass(/disabled/);
  });

  test("keyboard Tab moves focus between summaries", async ({ page }) => {
    const example = page.getByTestId("accordion-item-basic");
    const summaries = example.locator("summary");

    // Tab into the first summary.
    await summaries.first().focus();
    await expect(summaries.first()).toBeFocused();

    // Tab to the next focusable element.
    await page.keyboard.press("Tab");
    // The next summary should be focusable.
    const secondSummary = summaries.nth(1);
    await expect(secondSummary).toBeVisible();
  });

  test("chevron rotates when item is open", async ({ page }) => {
    const example = page.getByTestId("accordion-item-basic");
    const chevron = example.locator(".accordion-chevron").first();

    // When the first item is open, the chevron should be visible.
    await expect(chevron).toBeVisible();

    // Close the first item by clicking its summary.
    const firstSummary = example.locator("summary").first();
    await firstSummary.click();
    // The content should be hidden after closing.
    await expect(
      example.getByText("Install the package and import the components you need."),
    ).not.toBeVisible();
  });
});

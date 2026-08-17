import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site interaction + accessibility tests for the AccordionItem component.
 *
 * Targets `/docs/components/Accordion/AccordionItem`. Items render as native
 * `<details>`/`<summary>`; the first item is expanded by default (Accordion's
 * `defaultExpanded` defaults to 0). Examples are scoped via data-testid
 * (accordion-item-basic, accordion-item-expanded, accordion-item-noicon,
 * accordion-item-disabled).
 */
test.describe("AccordionItem docs page", () => {
  test("basic items render expandable details elements", async ({ page }) => {
    await page.goto("/docs/components/Accordion/AccordionItem");
    await waitForHydration(page);

    const example = page.getByTestId("accordion-item-basic");
    const details = example.locator("details");
    await expect(details).toHaveCount(2);

    // The first item is open by default; the second is collapsed.
    await expect(
      example.getByText("Install the package and import the components you need."),
    ).toBeVisible();
    await expect(
      example.getByText("Customize colors and tokens in your Tailwind theme."),
    ).not.toBeVisible();

    // Toggling the summary opens/closes the item.
    await example.getByText("Theming", { exact: true }).click();
    await expect(
      example.getByText("Customize colors and tokens in your Tailwind theme."),
    ).toBeVisible();
  });

  test("initially expanded item shows its content", async ({ page }) => {
    await page.goto("/docs/components/Accordion/AccordionItem");
    await waitForHydration(page);

    const example = page.getByTestId("accordion-item-expanded");
    await expect(
      example.getByText("Here is the answer to a frequently asked question."),
    ).toBeVisible();
    await expect(example.locator("details[open]")).toHaveCount(1);
  });

  test("item without icon hides the chevron", async ({ page }) => {
    await page.goto("/docs/components/Accordion/AccordionItem");
    await waitForHydration(page);

    const example = page.getByTestId("accordion-item-noicon");
    await expect(example.getByText("Plain header", { exact: true })).toBeVisible();
    // No expand/collapse chevron svg is rendered.
    await expect(example.locator("summary svg")).toHaveCount(0);
  });

  test("disabled item cannot be opened", async ({ page }) => {
    await page.goto("/docs/components/Accordion/AccordionItem");
    await waitForHydration(page);

    const example = page.getByTestId("accordion-item-disabled");
    const locked = example.locator("details.disabled");
    await expect(locked).toHaveCount(1);

    // Attempting to open the disabled item keeps it closed.
    await example.getByText("Locked", { exact: true }).click({ force: true });
    await expect(example.getByText("This panel cannot be opened.")).not.toBeVisible();
  });
});

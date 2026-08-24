import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site interaction + accessibility tests for the BreadcrumbItem
 * component.
 *
 * Targets `/docs/components/Breadcrumb/BreadcrumbItem`. Items render inside a
 * `nav` > `ol` list; the current item exposes `aria-current="page"` and
 * renders as text. Examples are scoped via data-testid (breadcrumb-item-basic,
 * breadcrumb-item-links, breadcrumb-item-icons, breadcrumb-item-collapsed).
 */
test.describe("BreadcrumbItem docs page", () => {
  test("basic items render links, current item, and separators", async ({ page }) => {
    await page.goto("/docs/components/Breadcrumb/BreadcrumbItem");
    await waitForHydration(page);

    const example = page.getByTestId("breadcrumb-item-basic");
    await expect(example.getByRole("navigation", { name: "Breadcrumb" })).toBeVisible();
    await expect(example.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    await expect(example.getByRole("link", { name: "Documentation" })).toHaveAttribute(
      "href",
      "/docs",
    );

    // The last item is the current page.
    const current = example.locator(".breadcrumb-item-current");
    await expect(current).toHaveAttribute("aria-current", "page");
    await expect(current).toHaveText("Components");
    // Separators render between items.
    await expect(example.locator(".breadcrumb-separator")).toHaveCount(2);
  });

  test("custom separator and explicit current item", async ({ page }) => {
    await page.goto("/docs/components/Breadcrumb/BreadcrumbItem");
    await waitForHydration(page);

    const example = page.getByTestId("breadcrumb-item-links");
    // All four items, with the last one explicitly current.
    await expect(example.locator(".breadcrumb-item")).toHaveCount(4);
    await expect(example.locator(".breadcrumb-separator")).toHaveText(["›", "›", "›"]);
    await expect(example.locator(".breadcrumb-item-current")).toHaveText("Standing Desk");
    // Links keep their hrefs.
    await expect(example.getByRole("link", { name: "Desks" })).toHaveAttribute(
      "href",
      "/products/desk",
    );
  });

  test("items with icons render the icon", async ({ page }) => {
    await page.goto("/docs/components/Breadcrumb/BreadcrumbItem");
    await waitForHydration(page);

    const example = page.getByTestId("breadcrumb-item-icons");
    await expect(example.locator(".breadcrumb-icon")).toHaveCount(3);
  });

  test("collapsed breadcrumb hides middle items", async ({ page }) => {
    await page.goto("/docs/components/Breadcrumb/BreadcrumbItem");
    await waitForHydration(page);

    const example = page.getByTestId("breadcrumb-item-collapsed");
    // First and last stay visible, and the first middle item (Section A)
    // is kept because maxVisibleItems={1} — the rest are hidden.
    await expect(example.getByText("Home", { exact: true })).toBeVisible();
    await expect(example.getByText("Section A", { exact: true })).toBeVisible();
    await expect(example.getByText("Current Page", { exact: true })).toBeVisible();
    // Section B and C are collapsed into hidden list items.
    await expect(example.locator(".breadcrumb-item-hidden")).toHaveCount(2);
    for (const hidden of ["Section B", "Section C"]) {
      await expect(example.locator(".breadcrumb-item-hidden").getByText(hidden)).toBeAttached();
      await expect(example.getByText(hidden, { exact: true })).not.toBeVisible();
    }
  });
});

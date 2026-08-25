import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Comprehensive docs-site interaction + accessibility tests for BreadcrumbItem.
 *
 * Targets `/docs/components/Breadcrumb/BreadcrumbItem`. Items render inside a
 * `nav` > `ol` list; the current item exposes `aria-current="page"` and renders
 * as text. Examples are scoped via data-testid (breadcrumb-item-basic,
 * breadcrumb-item-links, breadcrumb-item-icons, breadcrumb-item-collapsed).
 */
test.describe("BreadcrumbItem docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Breadcrumb/BreadcrumbItem");
    await waitForHydration(page);
  });

  test("renders the docs page heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "BreadcrumbItem", level: 1 }),
    ).toBeVisible();
  });

  test("basic items render as a nav landmark with ordered list", async ({ page }) => {
    const example = page.getByTestId("breadcrumb-item-basic");
    const nav = example.getByRole("navigation", { name: "Breadcrumb" });
    await expect(nav).toBeVisible();
    await expect(nav).toHaveJSProperty("tagName", "NAV");

    // Inside the nav, there should be an ordered list.
    const list = nav.locator("ol");
    await expect(list).toBeVisible();
  });

  test("basic items render links, current item, and separators", async ({ page }) => {
    const example = page.getByTestId("breadcrumb-item-basic");
    await expect(
      example.getByRole("navigation", { name: "Breadcrumb" }),
    ).toBeVisible();
    await expect(example.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/",
    );
    await expect(
      example.getByRole("link", { name: "Documentation" }),
    ).toHaveAttribute("href", "/docs");

    const current = example.locator(".breadcrumb-item-current");
    await expect(current).toHaveAttribute("aria-current", "page");
    await expect(current).toHaveText("Components");
    await expect(example.locator(".breadcrumb-separator")).toHaveCount(2);
  });

  test("links are keyboard navigable with Tab", async ({ page }) => {
    const example = page.getByTestId("breadcrumb-item-basic");
    const homeLink = example.getByRole("link", { name: "Home" });

    await homeLink.focus();
    await expect(homeLink).toBeFocused();

    await page.keyboard.press("Tab");
    const docLink = example.getByRole("link", { name: "Documentation" });
    await expect(docLink).toBeFocused();
  });

  test("custom separator and explicit current item", async ({ page }) => {
    const example = page.getByTestId("breadcrumb-item-links");
    await expect(example.locator(".breadcrumb-item")).toHaveCount(4);
    await expect(example.locator(".breadcrumb-separator")).toHaveText([
      "›",
      "›",
      "›",
    ]);
    await expect(example.locator(".breadcrumb-item-current")).toHaveText(
      "Standing Desk",
    );
    await expect(
      example.getByRole("link", { name: "Desks" }),
    ).toHaveAttribute("href", "/products/desk");
  });

  test("items with icons render the icon", async ({ page }) => {
    const example = page.getByTestId("breadcrumb-item-icons");
    await expect(example.locator(".breadcrumb-icon")).toHaveCount(3);
  });

  test("collapsed breadcrumb hides middle items", async ({ page }) => {
    const example = page.getByTestId("breadcrumb-item-collapsed");
    await expect(
      example.getByText("Home", { exact: true }),
    ).toBeVisible();
    await expect(
      example.getByText("Section A", { exact: true }),
    ).toBeVisible();
    await expect(
      example.getByText("Current Page", { exact: true }),
    ).toBeVisible();

    await expect(example.locator(".breadcrumb-item-hidden")).toHaveCount(2);
    for (const hidden of ["Section B", "Section C"]) {
      await expect(
        example.locator(".breadcrumb-item-hidden").getByText(hidden),
      ).toBeAttached();
      await expect(
        example.getByText(hidden, { exact: true }),
      ).not.toBeVisible();
    }
  });

  test("separator elements are decorative (not interactive)", async ({ page }) => {
    const example = page.getByTestId("breadcrumb-item-basic");
    const separators = example.locator(".breadcrumb-separator");
    const count = await separators.count();
    for (let i = 0; i < count; i++) {
      // Separators should not be links or buttons.
      const tag = await separators.nth(i).evaluate((el) => el.tagName);
      expect(["A", "BUTTON"]).not.toContain(tag);
    }
  });
});

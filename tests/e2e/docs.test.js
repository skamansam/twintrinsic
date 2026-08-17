import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-structure smoke tests: the components index renders a complete,
 * correctly-linked catalog, and each newly added docs page (Footer, Section,
 * Lazy, Hero) renders its heading and an auto-derived props table.
 */
test.describe("docs structure", () => {
  test("components index renders a complete catalog", async ({ page }) => {
    await page.goto("/docs/components");
    await waitForHydration(page);

    await expect(page.getByRole("heading", { name: "Components", level: 1 })).toBeVisible();

    // The index links to every documented component (much more than the old
    // handful) and links are well-formed.
    const links = page.locator('a[href^="/docs/components/"]');
    expect(await links.count()).toBeGreaterThan(60);
  });

  for (const route of [
    { path: "Footer/Footer", heading: "Footer", prop: "center" },
    { path: "Section/Section", heading: "Section", prop: "title" },
    { path: "Lazy/Lazy", heading: "Lazy", prop: "threshold" },
    { path: "Panel/Hero", heading: "Hero", prop: "type" },
  ]) {
    test(`${route.heading} docs page renders with a props table`, async ({ page }) => {
      await page.goto(`/docs/components/${route.path}`);
      await waitForHydration(page);

      await expect(
        page.getByRole("heading", { name: route.heading, level: 1, exact: true }),
      ).toBeVisible();
      // The auto-derived props table is present and includes a known prop.
      const table = page.locator(".props-table");
      await expect(table).toBeVisible();
      await expect(table.locator("code", { hasText: route.prop }).first()).toBeVisible();
    });
  }

  test("PropsTable utility page renders its auto-derived and explicit tables", async ({ page }) => {
    await page.goto("/docs/components/PropsTable/PropsTable");
    await waitForHydration(page);

    await expect(page.getByRole("heading", { name: "PropsTable", level: 1 })).toBeVisible();
    // The auto-derived demo renders Button's props.
    const auto = page.getByTestId("propstable-auto");
    await expect(auto).toBeVisible();
    await expect(auto.locator("code", { hasText: "variant" })).toBeVisible();
  });

  test("EventsTable utility page renders its auto-derived events table", async ({ page }) => {
    await page.goto("/docs/components/EventsTable/EventsTable");
    await waitForHydration(page);

    await expect(page.getByRole("heading", { name: "EventsTable", level: 1 })).toBeVisible();
    // The auto-derived demo lists Input's `on*` callback events.
    const auto = page.getByTestId("eventstable-auto");
    await expect(auto).toBeVisible();
    await expect(auto.locator("code", { hasText: "oninput" })).toBeVisible();
  });
});

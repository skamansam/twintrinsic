import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-structure smoke tests: the components index renders a complete,
 * correctly-linked catalog, and each newly added docs page renders its
 * heading and an auto-derived props table.
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

  test("components index renders all category sections", async ({ page }) => {
    await page.goto("/docs/components");
    await waitForHydration(page);

    const categories = [
      "App",
      "Basic",
      "Navigation",
      "Data Display",
      "Metrics",
      "Form",
      "Feedback",
      "Utility",
    ];
    for (const cat of categories) {
      await expect(
        page.getByRole("heading", { name: cat, level: 3 }).or(page.getByText(cat, { exact: true })).first(),
      ).toBeVisible();
    }
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

test.describe("docs navigation", () => {
  test("docs page has sidebar navigation", async ({ page }) => {
    await page.goto("/docs");
    await waitForHydration(page);

    // The sidebar should contain at least the top-level nav links
    const sidebarLinks = page.locator('a[href^="/docs/"]');
    expect(await sidebarLinks.count()).toBeGreaterThan(5);
  });

  test("docs sidebar contains Getting Started link", async ({ page }) => {
    await page.goto("/docs/components");
    await waitForHydration(page);

    await expect(
      page.getByRole("link", { name: "Getting Started" }),
    ).toBeVisible();
  });

  test("docs sidebar contains Components link", async ({ page }) => {
    await page.goto("/docs");
    await waitForHydration(page);

    await expect(
      page.getByRole("link", { name: "Components" }),
    ).toBeVisible();
  });

  test("docs sidebar contains Theming link", async ({ page }) => {
    await page.goto("/docs");
    await waitForHydration(page);

    // Theming appears in both the top nav and sidebar
    const themingLinks = page.getByRole("link", { name: "Theming" });
    expect(await themingLinks.count()).toBeGreaterThanOrEqual(1);
  });

  test("docs sidebar contains Utilities link", async ({ page }) => {
    await page.goto("/docs");
    await waitForHydration(page);

    await expect(
      page.getByRole("link", { name: "Utilities" }),
    ).toBeVisible();
  });

  test("docs sidebar contains Completion link", async ({ page }) => {
    await page.goto("/docs");
    await waitForHydration(page);

    await expect(
      page.getByRole("link", { name: "Completion" }),
    ).toBeVisible();
  });

  test("navigation: components index → individual component page", async ({ page }) => {
    await page.goto("/docs/components");
    await waitForHydration(page);

    // Click a component link
    await page.getByRole("link", { name: "Avatar", exact: true }).first().click();
    await waitForHydration(page);
    await expect(page).toHaveURL(/\/docs\/components\/Avatar/);
  });

  test("navigation: component page → back to index via sidebar", async ({ page }) => {
    await page.goto("/docs/components/Avatar/Avatar");
    await waitForHydration(page);

    // Navigate back to components index
    await page.getByRole("link", { name: "Components" }).first().click();
    await waitForHydration(page);
    await expect(page).toHaveURL(/\/docs\/components$/);
  });
});

test.describe("docs pages render correctly", () => {
  test("Getting Started page renders", async ({ page }) => {
    await page.goto("/docs");
    await waitForHydration(page);
    // The /docs page h1 is "Twintrinsic Documentation"
    await expect(page.getByRole("heading", { name: "Twintrinsic Documentation", level: 1 })).toBeVisible();
  });

  test("Theming page renders", async ({ page }) => {
    await page.goto("/docs/theming");
    await waitForHydration(page);
    await expect(page.getByRole("heading", { name: "Theming", level: 1 })).toBeVisible();
  });

  test("Utilities page renders", async ({ page }) => {
    await page.goto("/docs/utilities");
    await waitForHydration(page);
    await expect(page.getByRole("heading", { name: "Utilities", level: 1 })).toBeVisible();
  });

  test("Completion page renders", async ({ page }) => {
    await page.goto("/docs/completion");
    await waitForHydration(page);
    await expect(page.getByRole("heading", { name: "Development Completion", level: 1 })).toBeVisible();
  });

  test("Theme Preview page renders", async ({ page }) => {
    await page.goto("/docs/theming/preview");
    await waitForHydration(page);
    await expect(page.getByRole("heading", { name: "Theme Preview", level: 1 })).toBeVisible();
  });

  test("Dashboard example page renders", async ({ page }) => {
    await page.goto("/docs/examples/dashboard");
    await waitForHydration(page);
    // Dashboard example has h2s but no h1; check for a visible heading
    await expect(page.getByRole("heading", { name: "Key Metrics Overview", level: 2 })).toBeVisible();
  });

  test("Game Map example page renders", async ({ page }) => {
    await page.goto("/docs/examples/game-map");
    await waitForHydration(page);
    await expect(page.getByRole("heading", { name: "Game Map", level: 1 })).toBeVisible();
  });

  test("Shopping example page renders", async ({ page }) => {
    await page.goto("/docs/examples/shopping");
    await waitForHydration(page);
    await expect(page.getByText("Big Deals on Everything You Need")).toBeVisible();
  });
});

test.describe("docs data-testid hooks", () => {
  test("Avatar docs page exposes data-testid hooks", async ({ page }) => {
    await page.goto("/docs/components/Avatar/Avatar");
    await waitForHydration(page);

    const hooks = [
      "avatar-basic",
      "avatar-initials",
      "avatar-fallback",
      "avatar-sizes",
      "avatar-status-online",
    ];
    for (const id of hooks) {
      await expect(page.getByTestId(id)).toBeVisible();
    }
  });

  test("Container docs page exposes data-testid hooks", async ({ page }) => {
    await page.goto("/docs/components/Container/Container");
    await waitForHydration(page);

    await expect(page.getByTestId("container-basic")).toBeVisible();
    await expect(page.getByTestId("container-fluid")).toBeVisible();
  });
});

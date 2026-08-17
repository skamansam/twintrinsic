import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site smoke tests for the Panel/Card snippet prop API.
 *
 * Both components use Svelte 5 snippet props (`{#snippet header()}`
 * etc.) instead of the legacy `<svelte:fragment slot="...">` syntax.
 * Compile-time enforcement of the snippet API is handled by
 * `pnpm check:lib`; these tests verify the runtime rendering on the
 * docs pages:
 *
 *   1. The Panel header button renders via the snippet prop API.
 *   2. The Card passes its header through to the Panel correctly.
 *
 * The live examples live on `/docs/components/Panel/Panel` and
 * `/docs/components/Card/Card` (the `Panel/Card` docs page is
 * documentation-only).
 */
test.describe("Panel/Card snippet prop rendering", () => {
  test("Panel renders the header button via the snippet prop", async ({ page }) => {
    await page.goto("/docs/components/Panel/Panel");
    await waitForHydration(page);

    const panel = page.getByTestId("panel-basic").locator(".panel");
    await expect(panel).toBeVisible();

    const headerButton = panel.locator("button").first();
    await expect(headerButton).toBeVisible();
    await expect(headerButton).toHaveAttribute("aria-expanded", "true");
    await expect(headerButton).toContainText("Basic Panel");
  });

  test("Card passes the header snippet through to the Panel", async ({ page }) => {
    await page.goto("/docs/components/Card/Card");
    await waitForHydration(page);

    const card = page.getByTestId("card-basic").locator(".card");
    await expect(card).toBeVisible();
    await expect(card.getByText("Basic Example")).toBeVisible();
  });
});

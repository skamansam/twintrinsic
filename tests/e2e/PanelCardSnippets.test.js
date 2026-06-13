import { test, expect } from "@playwright/test"

/**
 * E2E tests for the Panel/Card snippet prop refactor.
 *
 * The Panel component now accepts `header` as a Svelte 5 snippet prop
 * (`{#snippet header()}...{/snippet}`) instead of the legacy Svelte 4
 * `<svelte:fragment slot="header">` syntax. The Card sub-component
 * passes its own `header` snippet through to Panel.
 *
 * These tests verify:
 *   1. The Panel header button renders via the snippet prop API.
 *   2. The Card passes its header through to Panel correctly.
 *
 * Note: `$$slot_def` is a compile-time svelte-check type error, not a
 * runtime browser console error — it's caught at build time, so we
 * don't (and can't) verify it via Playwright. Build-time correctness
 * is enforced by `pnpm check:lib` in CI.
 *
 * Note: Behavior tests for media/footer/clickable variants live in
 * tests/e2e/Card.test.js — we don't duplicate that coverage here.
 */
test.describe("Panel/Card snippet prop refactor", () => {
  test("Panel renders header button via snippet prop (not legacy slot)", async ({
    page,
  }) => {
    await page.goto(
      "http://localhost:6006/?path=/story/components-panel--default"
    )

    const panel = page.locator(".panel")
    await expect(panel).toBeVisible()

    // The header button should be present and expanded
    const headerButton = panel.locator("button").first()
    await expect(headerButton).toBeVisible()
    await expect(headerButton).toHaveAttribute("aria-expanded", "true")

    // The header content area should be rendered
    const headerContent = headerButton.locator("div").first()
    await expect(headerContent).toBeVisible()
  })

  test("Card passes header snippet through to Panel", async ({ page }) => {
    await page.goto(
      "http://localhost:6006/?path=/story/components-panel-card--default"
    )

    const card = page.locator(".card")
    await expect(card).toBeVisible()

    // The card should render the header from the snippet prop (not the legacy slot)
    const header = card.locator("text=Card Title")
    await expect(header).toBeVisible()

    // The card should render the body content
    const body = card.locator("text=This is a basic card")
    await expect(body).toBeVisible()
  })
})

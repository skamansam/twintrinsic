import { expect, test } from "@playwright/test"

/**
 * Docs-site smoke for the ThemeToggle component.
 *
 * Component-level behavior (click toggle, Space-from-focus toggle,
 * ARIA label updates after click, moon ↔ sun icon swap, theme
 * persistence) is verified in stories/ThemeToggle.stories.js via
 * Storybook `play` functions run under `pnpm test:storybook`. The
 * @storybook/addon-a11y pytest add-on covers accessibility per story.
 *
 * This file only guarantees that the docs site still renders the
 * ThemeToggle landing page at the canonical route and exposes the
 * structural hooks the wider Playwright smoke relies on.
 *
 * Selectors use the data-attribute / class hooks emitted by the
 * component itself (`[data-twintrinsic-theme-toggle]`,
 * `.tw-theme-toggle-button`, `.tw-theme-toggle-icon-{moon,sun}`,
 * `[data-theme]`) — no extra testids are required on the docs page.
 *
 * Migration reference: docs/plans/E2E_TO_STORYBOOK_MIGRATION_PLAN.md § 9.2.
 */
test.describe("ThemeToggle docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/ThemeToggle/ThemeToggle")
  })

  test("renders the ThemeToggle docs page", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "ThemeToggle", level: 1 }),
    ).toBeVisible()
  })

  test("renders multiple [data-twintrinsic-theme-toggle] rows", async ({ page }) => {
    // The docs page demonstrates ThemeToggle in several sections
    // (basic usage, in-header, nested theming examples).
    const toggles = page.locator("[data-twintrinsic-theme-toggle]")
    await expect(toggles.first()).toBeVisible()
    expect(await toggles.count()).toBeGreaterThanOrEqual(2)
  })

  test("a single toggle has proper ARIA label + hidden checkbox", async ({ page }) => {
    const toggle = page.locator("[data-twintrinsic-theme-toggle]").first()
    await expect(toggle).toHaveAttribute("aria-label", "Toggle theme")
    const checkbox = toggle.locator("input[type='checkbox']")
    await expect(checkbox).toHaveAttribute("type", "checkbox")
  })

  test("moon / sun icons swap when the toggle is clicked", async ({ page }) => {
    // Scope to a single toggle inside one demo [data-theme] section so
    // other sections' toggles don't cross-contaminate the assertion.
    const scope = page.locator("[data-theme]").first()
    const checkbox = scope
      .locator("[data-twintrinsic-theme-toggle] input[type='checkbox']")
      .first()
    const button = scope
      .locator("[data-twintrinsic-theme-toggle] .tw-theme-toggle-button")
      .first()
    const moonIcon = scope
      .locator("[data-twintrinsic-theme-toggle] .tw-theme-toggle-icon-moon")
      .first()
    const sunIcon = scope
      .locator("[data-twintrinsic-theme-toggle] .tw-theme-toggle-icon-sun")
      .first()

    // Normalize initial state so the rest of the assertions are order-independent.
    if (await checkbox.isChecked()) {
      await button.click()
    }
    await expect(moonIcon).toBeVisible()
    await expect(sunIcon).not.toBeVisible()

    await button.click()
    await expect(moonIcon).not.toBeVisible()
    await expect(sunIcon).toBeVisible()
  })

  test("nested-theming demo renders ≥3 [data-theme] sections", async ({ page }) => {
    // The docs page demonstrates independent per-section theming;
    // verify the structural scaffold still ships.
    const sections = page.locator("[data-theme]")
    expect(await sections.count()).toBeGreaterThanOrEqual(3)
  })

  test("nested theming: a level-2 toggle does not affect a sibling section", async ({
    page,
  }) => {
    const sections = page.locator("[data-theme]")
    expect(await sections.count()).toBeGreaterThanOrEqual(3)
    const level1 = sections.nth(0)
    const level2a = sections.nth(1)
    const level2aButton = level2a
      .locator("[data-twintrinsic-theme-toggle] .tw-theme-toggle-button")
      .first()

    const level1BgBefore = await level1.evaluate(
      (el) => window.getComputedStyle(el).backgroundColor,
    )

    await level2aButton.click()

    const level1BgAfter = await level1.evaluate(
      (el) => window.getComputedStyle(el).backgroundColor,
    )

    expect(level1BgAfter).toBe(level1BgBefore)
  })
})

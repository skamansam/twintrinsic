import { expect, test } from "@playwright/test"

/**
 * Smoke tests for the Avatar docs page. Component-level behavior
 * (size/shape/status classes, gravatar URL format, fallback initials,
 * aria-labels, etc.) is verified in stories/Avatar.stories.ts via
 * Storybook play functions under `pnpm test:storybook`. This file
 * only guarantees that the docs site still renders the Avatar
 * landing page and exposes the `data-testid` hooks the wider Playwright
 * smoke suite relies on.
 */
test.describe("Avatar docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Avatar/Avatar")
  })

  test("renders the avatar docs page", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Avatar", level: 1 }),
    ).toBeVisible()
  })

  test("exposes the canonical data-testid hooks", async ({ page }) => {
    const hooks = [
      "avatar-basic",
      "avatar-initials",
      "avatar-fallback",
      "avatar-gravatar",
      "avatar-sizes",
      "avatar-size-xs",
      "avatar-size-sm",
      "avatar-size-md",
      "avatar-size-lg",
      "avatar-size-xl",
      "avatar-shapes",
      "avatar-shape-circle",
      "avatar-shape-square",
      "avatar-shape-rounded",
      "avatar-status-indicators",
      "avatar-status-online",
      "avatar-status-offline",
      "avatar-status-away",
      "avatar-status-busy",
      "avatar-styled",
      "avatar-bordered",
      "avatar-shadowed",
    ]
    for (const id of hooks) {
      await expect(
        page.getByTestId(id),
        `docs page should expose data-testid="${id}"`,
      ).toBeVisible()
    }
  })

  test("basic avatar example shows an image", async ({ page }) => {
    const basic = page.getByTestId("avatar-basic")
    await expect(basic.locator("img")).toBeVisible()
  })

  test("initials example shows the JD initials", async ({ page }) => {
    // The docs page example passes name="John Doe"; the default
    // initialsGenerator produces "JD". Tightening this assertion so a
    // regression in the generator actually fails the smoke (instead of
    // a permissive /^[A-Z]{1,2}$/ that would mask the bug).
    const initials = page.getByTestId("avatar-initials")
    await expect(initials.locator(".avatar-fallback")).toHaveText("JD")
  })

  test("status indicator carries aria-label", async ({ page }) => {
    const status = page.getByTestId("avatar-status-online").locator(".avatar-status")
    await expect(status).toHaveAttribute("aria-label", /Status:/)
  })
})

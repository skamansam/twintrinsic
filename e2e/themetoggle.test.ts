import { expect, test } from "@playwright/test"

test.describe("ThemeToggle Component", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/themetoggle")
  })

  test.describe("Basic Rendering", () => {
    test("should render theme toggle button", async ({ page }) => {
      const toggles = page.locator("[data-twintrinsic-theme-toggle]")
      await expect(toggles.first()).toBeVisible()
    })

    test("should have proper ARIA label", async ({ page }) => {
      const toggle = page.locator("[data-twintrinsic-theme-toggle]").first()
      await expect(toggle).toHaveAttribute("aria-label", "Toggle theme")
    })

    test("should contain hidden checkbox input", async ({ page }) => {
      const toggle = page.locator("[data-twintrinsic-theme-toggle]").first()
      const checkbox = toggle.locator("input[type='checkbox']")
      await expect(checkbox).toHaveAttribute("type", "checkbox")
    })

    test("should display moon icon by default", async ({ page }) => {
      const toggle = page.locator("[data-twintrinsic-theme-toggle]").first()
      const moonIcon = toggle.locator(".tw-theme-toggle-icon-moon")

      await expect(moonIcon).toBeVisible()
    })
  })

  test.describe("Toggle Interaction", () => {
    test("should toggle with click", async ({ page }) => {
      const toggle = page.locator("[data-twintrinsic-theme-toggle]").first()
      const checkbox = toggle.locator("input[type='checkbox']")
      const button = toggle.locator(".tw-theme-toggle-button")

      await expect(checkbox).not.toBeChecked()
      await button.click()
      await expect(checkbox).toBeChecked()
      await button.click()
      await expect(checkbox).not.toBeChecked()
    })

    test("should toggle with keyboard (Space)", async ({ page }) => {
      const toggle = page.locator("[data-twintrinsic-theme-toggle]").first()
      const checkbox = toggle.locator("input[type='checkbox']")

      await checkbox.focus()
      await expect(checkbox).not.toBeChecked()

      await page.keyboard.press("Space")
      await expect(checkbox).toBeChecked()

      await page.keyboard.press("Space")
      await expect(checkbox).not.toBeChecked()
    })
  })

  test.describe("Icon Display", () => {
    test("should show moon icon when unchecked", async ({ page }) => {
      const toggle = page.locator("[data-twintrinsic-theme-toggle]").first()
      const checkbox = toggle.locator("input[type='checkbox']")
      const button = toggle.locator(".tw-theme-toggle-button")
      const moonIcon = toggle.locator(".tw-theme-toggle-icon-moon")

      if (await checkbox.isChecked()) {
        await button.click()
      }
      await expect(moonIcon).toBeVisible()
    })

    test("should show sun icon when checked", async ({ page }) => {
      const toggle = page.locator("[data-twintrinsic-theme-toggle]").first()
      const checkbox = toggle.locator("input[type='checkbox']")
      const button = toggle.locator(".tw-theme-toggle-button")
      const sunIcon = toggle.locator(".tw-theme-toggle-icon-sun")

      if (!(await checkbox.isChecked())) {
        await button.click()
      }
      await expect(sunIcon).toBeVisible()
    })

    test("should toggle icons on click", async ({ page }) => {
      const toggle = page.locator("[data-twintrinsic-theme-toggle]").first()
      const button = toggle.locator(".tw-theme-toggle-button")
      const moonIcon = toggle.locator(".tw-theme-toggle-icon-moon")
      const sunIcon = toggle.locator(".tw-theme-toggle-icon-sun")

      await expect(moonIcon).toBeVisible()
      await expect(sunIcon).not.toBeVisible()

      await button.click()
      await expect(moonIcon).not.toBeVisible()
      await expect(sunIcon).toBeVisible()

      await button.click()
      await expect(moonIcon).toBeVisible()
      await expect(sunIcon).not.toBeVisible()
    })
  })

  test.describe("Nested Theming - Independent Control", () => {
    test("should apply dark mode only to toggled section", async ({ page }) => {
      const sections = page.locator("[data-themed]")
      const level1 = sections.nth(0)

      const level1Button = level1
        .locator("[data-twintrinsic-theme-toggle] .tw-theme-toggle-button")
        .first()

      const initialVars = await level1.evaluate((el) => {
        const style = window.getComputedStyle(el)
        return {
          bg: style.getPropertyValue("--color-background"),
          text: style.getPropertyValue("--color-text"),
        }
      })

      await level1Button.click()

      const newVars = await level1.evaluate((el) => {
        const style = window.getComputedStyle(el)
        return {
          bg: style.getPropertyValue("--color-background"),
          text: style.getPropertyValue("--color-text"),
        }
      })

      expect(newVars.bg).not.toBe(initialVars.bg)
      expect(newVars.text).not.toBe(initialVars.text)
    })

    test("should not apply dark mode to children when parent is toggled", async ({ page }) => {
      const sections = page.locator("[data-themed]")
      const level1 = sections.nth(0)
      const level2a = sections.nth(1)

      const level1Button = level1
        .locator("[data-twintrinsic-theme-toggle] .tw-theme-toggle-button")
        .first()

      const level2aInitialBg = await level2a.evaluate(
        (el) => window.getComputedStyle(el).backgroundColor
      )

      await level1Button.click()

      const level2aNewBg = await level2a.evaluate(
        (el) => window.getComputedStyle(el).backgroundColor
      )

      expect(level2aNewBg).toBe(level2aInitialBg)
    })
  })
})

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

    test("should toggle only immediate parent data-themed element", async ({ page }) => {
      const sections = page.locator("[data-themed]")
      const level1 = sections.nth(0)
      const level2a = sections.nth(1)
      const level2b = sections.nth(3)

      const level2aToggle = level2a.locator("[data-twintrinsic-theme-toggle]").first()
      const level2aButton = level2aToggle.locator(".tw-theme-toggle-button")

      const level1InitialVars = await level1.evaluate((el) => {
        const style = window.getComputedStyle(el)
        return style.getPropertyValue("--color-background")
      })
      const level2aInitialVars = await level2a.evaluate((el) => {
        const style = window.getComputedStyle(el)
        return style.getPropertyValue("--color-background")
      })
      const level2bInitialVars = await level2b.evaluate((el) => {
        const style = window.getComputedStyle(el)
        return style.getPropertyValue("--color-background")
      })

      // Toggle Level 2a
      await level2aButton.click()

      const level1NewVars = await level1.evaluate((el) => {
        const style = window.getComputedStyle(el)
        return style.getPropertyValue("--color-background")
      })
      const level2aNewVars = await level2a.evaluate((el) => {
        const style = window.getComputedStyle(el)
        return style.getPropertyValue("--color-background")
      })
      const level2bNewVars = await level2b.evaluate((el) => {
        const style = window.getComputedStyle(el)
        return style.getPropertyValue("--color-background")
      })

      // Level 2a should change (toggled)
      expect(level2aNewVars.trim()).not.toBe(level2aInitialVars.trim())

      // Level 1 should NOT change (parent not toggled)
      expect(level1NewVars.trim()).toBe(level1InitialVars.trim())

      // Level 2b should NOT change (sibling not toggled)
      expect(level2bNewVars.trim()).toBe(level2bInitialVars.trim())
    })
  })

  test.describe("Page Header Toggle", () => {
    test("should toggle page theme from header", async ({ page }) => {
      // Find the first toggle (in the basic usage example)
      const firstToggle = page.locator("[data-twintrinsic-theme-toggle]").first()
      const firstCheckbox = firstToggle.locator("input[type='checkbox']")
      const firstButton = firstToggle.locator(".tw-theme-toggle-button")

      // Verify initial state
      await expect(firstCheckbox).not.toBeChecked()

      // Toggle the theme
      await firstButton.click()

      // Verify the checkbox is now checked
      await expect(firstCheckbox).toBeChecked()
    })

    test("should maintain theme toggle state across page sections", async ({ page }) => {
      const firstToggle = page.locator("[data-twintrinsic-theme-toggle]").first()
      const firstCheckbox = firstToggle.locator("input[type='checkbox']")
      const firstButton = firstToggle.locator(".tw-theme-toggle-button")

      // Toggle the first toggle
      await firstButton.click()
      await expect(firstCheckbox).toBeChecked()

      // Verify the toggle remains checked
      await page.waitForTimeout(100)
      await expect(firstCheckbox).toBeChecked()
    })
  })
})

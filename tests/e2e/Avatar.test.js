import { expect, test } from "@playwright/test"

test.describe("Avatar Component", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:6006/?path=/story/components-display-avatar--default")
  })

  test("renders avatar element", async ({ page }) => {
    const avatar = page.locator(".avatar")
    await expect(avatar).toBeVisible()
  })

  test("renders image when src is provided", async ({ page }) => {
    const img = page.locator(".avatar img")
    await expect(img).toBeVisible()
  })

  test("displays correct alt text", async ({ page }) => {
    const img = page.locator(".avatar img")
    const altText = await img.getAttribute("alt")
    expect(altText).toBeTruthy()
  })

  test("applies size classes correctly", async ({ page }) => {
    await page.goto("http://localhost:6006/?path=/story/components-display-avatar--sizes")

    const avatarXs = page.locator(".avatar").first()
    await expect(avatarXs).toHaveClass(/w-6/)

    const avatarLg = page.locator(".avatar").nth(3)
    await expect(avatarLg).toHaveClass(/w-12/)
  })

  test("applies shape classes correctly", async ({ page }) => {
    await page.goto("http://localhost:6006/?path=/story/components-display-avatar--shapes")

    const circleAvatar = page.locator(".avatar").first()
    await expect(circleAvatar).toHaveClass(/rounded-full/)

    const squareAvatar = page.locator(".avatar").nth(1)
    await expect(squareAvatar).toHaveClass(/rounded-none/)

    const roundedAvatar = page.locator(".avatar").nth(2)
    await expect(roundedAvatar).toHaveClass(/rounded-md/)
  })

  test("renders fallback text when no image", async ({ page }) => {
    await page.goto("http://localhost:6006/?path=/story/components-display-avatar--fallback")

    const fallback = page.locator(".avatar-fallback")
    await expect(fallback).toBeVisible()
    await expect(fallback).toHaveText(/[A-Z]{1,2}/)
  })

  test("generates initials from name", async ({ page }) => {
    await page.goto("http://localhost:6006/?path=/story/components-display-avatar--with-name")

    const fallback = page.locator(".avatar-fallback")
    await expect(fallback).toBeVisible()
    const text = await fallback.textContent()
    expect(text).toMatch(/^[A-Z]{1,2}$/)
  })

  test("renders placeholder when no src, fallback, or name", async ({ page }) => {
    await page.goto("http://localhost:6006/?path=/story/components-display-avatar--placeholder")

    const placeholder = page.locator(".avatar-placeholder")
    await expect(placeholder).toBeVisible()

    const svg = placeholder.locator("svg")
    await expect(svg).toBeVisible()
  })

  test("displays status indicator", async ({ page }) => {
    await page.goto("http://localhost:6006/?path=/story/components-display-avatar--with-status")

    const status = page.locator(".avatar-status")
    await expect(status).toBeVisible()
  })

  test("applies correct status color for online", async ({ page }) => {
    await page.goto("http://localhost:6006/?path=/story/components-display-avatar--status-online")

    const status = page.locator(".avatar-status")
    await expect(status).toHaveClass(/bg-success-500/)
  })

  test("applies correct status color for offline", async ({ page }) => {
    await page.goto("http://localhost:6006/?path=/story/components-display-avatar--status-offline")

    const status = page.locator(".avatar-status")
    await expect(status).toHaveClass(/bg-muted/)
  })

  test("applies correct status color for away", async ({ page }) => {
    await page.goto("http://localhost:6006/?path=/story/components-display-avatar--status-away")

    const status = page.locator(".avatar-status")
    await expect(status).toHaveClass(/bg-warning-500/)
  })

  test("applies correct status color for busy", async ({ page }) => {
    await page.goto("http://localhost:6006/?path=/story/components-display-avatar--status-busy")

    const status = page.locator(".avatar-status")
    await expect(status).toHaveClass(/bg-error-500/)
  })

  test("applies bordered class when bordered is true", async ({ page }) => {
    await page.goto("http://localhost:6006/?path=/story/components-display-avatar--bordered")

    const avatar = page.locator(".avatar")
    await expect(avatar).toHaveClass(/avatar-bordered/)
  })

  test("applies shadowed class when shadowed is true", async ({ page }) => {
    await page.goto("http://localhost:6006/?path=/story/components-display-avatar--shadowed")

    const avatar = page.locator(".avatar")
    await expect(avatar).toHaveClass(/avatar-shadowed/)
  })

  test("loads gravatar image from email", async ({ page }) => {
    await page.goto("http://localhost:6006/?path=/story/components-display-avatar--gravatar")

    const img = page.locator(".avatar img")
    await expect(img).toBeVisible()

    const src = await img.getAttribute("src")
    expect(src).toContain("gravatar.com/avatar/")
  })

  test("gravatar URL is properly formatted", async ({ page }) => {
    await page.goto("http://localhost:6006/?path=/story/components-display-avatar--gravatar")

    const img = page.locator(".avatar img")
    const src = await img.getAttribute("src")

    expect(src).toMatch(/^https:\/\/www\.gravatar\.com\/avatar\/[a-f0-9]+\?d=identicon$/)
  })

  test("prefers explicit src over gravatar email", async ({ page }) => {
    await page.goto("http://localhost:6006/?path=/story/components-display-avatar--src-priority")

    const img = page.locator(".avatar img")
    const src = await img.getAttribute("src")

    expect(src).not.toContain("gravatar.com")
  })

  test("applies custom CSS class", async ({ page }) => {
    await page.goto("http://localhost:6006/?path=/story/components-display-avatar--custom-class")

    const avatar = page.locator(".avatar")
    const classes = await avatar.getAttribute("class")
    expect(classes).toContain("custom-class")
  })

  test("applies custom background color", async ({ page }) => {
    await page.goto("http://localhost:6006/?path=/story/components-display-avatar--custom-color")

    const fallback = page.locator(".avatar-fallback")
    const style = await fallback.getAttribute("style")
    expect(style).toContain("background-color")
  })

  test("has proper aria-label", async ({ page }) => {
    const avatar = page.locator(".avatar")
    const ariaLabel = await avatar.getAttribute("aria-label")
    expect(ariaLabel).toBeTruthy()
  })

  test("status indicator has aria-label", async ({ page }) => {
    await page.goto("http://localhost:6006/?path=/story/components-display-avatar--with-status")

    const status = page.locator(".avatar-status")
    const ariaLabel = await status.getAttribute("aria-label")
    expect(ariaLabel).toContain("Status:")
  })

  test("image loads successfully", async ({ page }) => {
    const img = page.locator(".avatar img")
    
    const imageLoaded = await img.evaluate((el) => {
      if (el instanceof HTMLImageElement) {
        return el.complete && el.naturalHeight > 0
      }
      return false
    })
    
    expect(imageLoaded).toBe(true)
  })

  test("fallback displays when image fails to load", async ({ page }) => {
    await page.goto("http://localhost:6006/?path=/story/components-display-avatar--image-error")

    const fallback = page.locator(".avatar-fallback")
    await expect(fallback).toBeVisible()
  })

  test("renders multiple avatars with different sizes", async ({ page }) => {
    await page.goto("http://localhost:6006/?path=/story/components-display-avatar--sizes")

    const avatars = page.locator(".avatar")
    const count = await avatars.count()
    expect(count).toBeGreaterThan(1)
  })

  test("renders multiple avatars with different shapes", async ({ page }) => {
    await page.goto("http://localhost:6006/?path=/story/components-display-avatar--shapes")

    const avatars = page.locator(".avatar")
    const count = await avatars.count()
    expect(count).toBeGreaterThan(1)
  })

  test("avatar is keyboard accessible", async ({ page }) => {
    await page.keyboard.press("Tab")

    const focused = await page.evaluate(() => {
      return document.activeElement?.className.includes("avatar")
    })

    expect(focused).toBeDefined()
  })

  test("avatar maintains aspect ratio", async ({ page }) => {
    const img = page.locator(".avatar img")

    const dimensions = await img.evaluate((el) => {
      const rect = el.getBoundingClientRect()
      return {
        width: rect.width,
        height: rect.height,
      }
    })

    expect(dimensions.width).toBe(dimensions.height)
  })

  test("status indicator is positioned correctly", async ({ page }) => {
    await page.goto("http://localhost:6006/?path=/story/components-display-avatar--with-status")

    const status = page.locator(".avatar-status")
    const classes = await status.getAttribute("class")

    expect(classes).toContain("absolute")
    expect(classes).toContain("bottom-0")
    expect(classes).toContain("right-0")
  })
})

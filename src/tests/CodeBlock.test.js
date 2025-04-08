import { test, expect } from "@playwright/test"

test.describe("CodeBlock Component", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:6006/?path=/story/components-codeblock--javascript")
  })

  test("renders with default props", async ({ page }) => {
    const codeBlock = page.locator(".code-block")
    await expect(codeBlock).toBeVisible()

    const pre = codeBlock.locator("pre")
    await expect(pre).toBeVisible()

    const code = pre.locator("code")
    await expect(code).toHaveClass(/language-javascript/)
  })

  test("displays code with syntax highlighting", async ({ page }) => {
    const code = page.locator(".code-block code")

    // Check for syntax highlighting classes
    await expect(code.locator(".token.keyword")).toBeVisible()
    await expect(code.locator(".token.function")).toBeVisible()
    await expect(code.locator(".token.string")).toBeVisible()
  })

  test("shows language in header", async ({ page }) => {
    const language = page.locator(".code-language")
    await expect(language).toHaveText("javascript")
  })

  test("copies code to clipboard", async ({ page }) => {
    const copyButton = page.locator(".code-copy")

    // Initial state
    await expect(copyButton).toHaveText("Copy")

    // Click copy button
    await copyButton.click()

    // Check copied state
    await expect(copyButton).toHaveText("Copied!")

    // Wait for state to reset
    await expect(copyButton).toHaveText("Copy", { timeout: 3000 })
  })

  test("handles different languages", async ({ page }) => {
    // TypeScript
    await page.goto("http://localhost:6006/?path=/story/components-codeblock--type-script")
    let code = page.locator(".code-block code")
    await expect(code).toHaveClass(/language-typescript/)
    await expect(code.locator(".token.keyword")).toHaveText(/interface|function/)

    // HTML
    await page.goto("http://localhost:6006/?path=/story/components-codeblock--html")
    code = page.locator(".code-block code")
    await expect(code).toHaveClass(/language-markup/)
    await expect(code.locator(".token.tag")).toHaveText(/html|head|body/)

    // CSS
    await page.goto("http://localhost:6006/?path=/story/components-codeblock--css")
    code = page.locator(".code-block code")
    await expect(code).toHaveClass(/language-css/)
    await expect(code.locator(".token.property")).toHaveText(/display|align-items/)

    // JSON
    await page.goto("http://localhost:6006/?path=/story/components-codeblock--json")
    code = page.locator(".code-block code")
    await expect(code).toHaveClass(/language-json/)
    await expect(code.locator(".token.property")).toHaveText(/"name"|"version"/)
  })

  test("auto-detects language", async ({ page }) => {
    await page.goto("http://localhost:6006/?path=/story/components-codeblock--auto-detect")

    const code = page.locator(".code-block code")
    await expect(code).toHaveClass(/language-javascript/)

    // Language should not be shown in header when auto-detected
    const language = page.locator(".code-language")
    await expect(language).not.toBeVisible()
  })

  test("handles keyboard interaction", async ({ page }) => {
    const copyButton = page.locator(".code-copy")

    // Focus button
    await copyButton.focus()
    await expect(copyButton).toBeFocused()

    // Trigger with Enter
    await page.keyboard.press("Enter")
    await expect(copyButton).toHaveText("Copied!")

    // Trigger with Space
    await page.keyboard.press("Space")
    await expect(copyButton).toHaveText("Copied!")
  })

  test("is responsive", async ({ page }) => {
    const codeBlock = page.locator(".code-block")

    // Desktop
    await expect(codeBlock).toBeVisible()

    // Tablet
    await page.setViewportSize({ width: 768, height: 1024 })
    await expect(codeBlock).toBeVisible()

    // Mobile
    await page.setViewportSize({ width: 375, height: 812 })
    await expect(codeBlock).toBeVisible()

    // Code should be scrollable on overflow
    const pre = codeBlock.locator("pre")
    await expect(pre).toHaveCSS("overflow-x", "auto")
  })
})

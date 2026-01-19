import { expect, test } from "@playwright/test"

test.describe("CodeEditor", () => {
  test("should render the editor", async ({ page }) => {
    await page.goto("http://localhost:6006/iframe.html?id=components-codeeditor--default")
    const editor = page.locator(".code-editor-wrapper")
    await expect(editor).toBeVisible()
  })

  test("should display code content", async ({ page }) => {
    await page.goto("http://localhost:6006/iframe.html?id=components-codeeditor--default")
    const editor = page.locator(".code-editor-wrapper")
    await expect(editor).toBeVisible()
    const content = await editor.textContent()
    expect(content).toContain("Hello, CodeMirror")
  })

  test("should support different languages", async ({ page }) => {
    const languages = ["default", "python", "html", "json"]
    for (const lang of languages) {
      await page.goto(`http://localhost:6006/iframe.html?id=components-codeeditor--${lang}`)
      const editor = page.locator(".code-editor-wrapper")
      await expect(editor).toBeVisible()
    }
  })

  test("should support dark themes", async ({ page }) => {
    await page.goto("http://localhost:6006/iframe.html?id=components-codeeditor--dark-theme")
    const editor = page.locator(".code-editor-wrapper")
    await expect(editor).toBeVisible()
  })

  test("should support custom height", async ({ page }) => {
    await page.goto("http://localhost:6006/iframe.html?id=components-codeeditor--custom-height")
    const editor = page.locator(".code-editor-wrapper")
    const boundingBox = await editor.boundingBox()
    expect(boundingBox?.height).toBeGreaterThan(500)
  })

  test("should render with Dracula theme", async ({ page }) => {
    await page.goto("http://localhost:6006/iframe.html?id=components-codeeditor--dracula")
    const editor = page.locator(".code-editor-wrapper")
    await expect(editor).toBeVisible()
  })

  test("should render JSON code", async ({ page }) => {
    await page.goto("http://localhost:6006/iframe.html?id=components-codeeditor--json")
    const editor = page.locator(".code-editor-wrapper")
    await expect(editor).toBeVisible()
    const content = await editor.textContent()
    expect(content).toContain("CodeEditor")
  })

  test("should render JSX code", async ({ page }) => {
    await page.goto("http://localhost:6006/iframe.html?id=components-codeeditor--jsx-code")
    const editor = page.locator(".code-editor-wrapper")
    await expect(editor).toBeVisible()
  })

  test("should render Svelte code", async ({ page }) => {
    await page.goto("http://localhost:6006/iframe.html?id=components-codeeditor--svelte-code")
    const editor = page.locator(".code-editor-wrapper")
    await expect(editor).toBeVisible()
  })

  test("should have proper styling", async ({ page }) => {
    await page.goto("http://localhost:6006/iframe.html?id=components-codeeditor--default")
    const editor = page.locator(".code-editor-wrapper")
    const styles = await editor.evaluate((el) => {
      const computed = window.getComputedStyle(el)
      return {
        overflow: computed.overflow,
        border: computed.border,
      }
    })
    expect(styles.overflow).toBe("hidden")
    expect(styles.border).toBeTruthy()
  })
})

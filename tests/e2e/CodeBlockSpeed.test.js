import { expect, test } from "@playwright/test"

test.describe("CodeBlockSpeed", () => {
  test("should render the code block", async ({ page }) => {
    await page.goto("http://localhost:6006/iframe.html?id=components-codeblockspeeed--default")
    const codeBlock = page.locator(".code-block-speed")
    await expect(codeBlock).toBeVisible()
  })

  test("should display language label", async ({ page }) => {
    await page.goto("http://localhost:6006/iframe.html?id=components-codeblockspeeed--javascript")
    const langLabel = page.locator(".code-language")
    await expect(langLabel).toContainText("js")
  })

  test("should have copy button", async ({ page }) => {
    await page.goto("http://localhost:6006/iframe.html?id=components-codeblockspeeed--default")
    const copyButton = page.locator(".code-copy")
    await expect(copyButton).toBeVisible()
  })

  test("should display code content", async ({ page }) => {
    await page.goto("http://localhost:6006/iframe.html?id=components-codeblockspeeed--javascript")
    const codeBlock = page.locator(".code-block-speed")
    const content = await codeBlock.textContent()
    expect(content).toContain("fibonacci")
  })

  test("should support TypeScript", async ({ page }) => {
    await page.goto("http://localhost:6006/iframe.html?id=components-codeblockspeeed--type-script")
    const codeBlock = page.locator(".code-block-speed")
    await expect(codeBlock).toBeVisible()
  })

  test("should support Python", async ({ page }) => {
    await page.goto("http://localhost:6006/iframe.html?id=components-codeblockspeeed--python")
    const codeBlock = page.locator(".code-block-speed")
    await expect(codeBlock).toBeVisible()
  })

  test("should support HTML", async ({ page }) => {
    await page.goto("http://localhost:6006/iframe.html?id=components-codeblockspeeed--html")
    const codeBlock = page.locator(".code-block-speed")
    await expect(codeBlock).toBeVisible()
  })

  test("should support CSS", async ({ page }) => {
    await page.goto("http://localhost:6006/iframe.html?id=components-codeblockspeeed--css")
    const codeBlock = page.locator(".code-block-speed")
    await expect(codeBlock).toBeVisible()
  })

  test("should support JSON", async ({ page }) => {
    await page.goto("http://localhost:6006/iframe.html?id=components-codeblockspeeed--json")
    const codeBlock = page.locator(".code-block-speed")
    const content = await codeBlock.textContent()
    expect(content).toContain("CodeBlockSpeed")
  })

  test("should support Bash", async ({ page }) => {
    await page.goto("http://localhost:6006/iframe.html?id=components-codeblockspeeed--bash")
    const codeBlock = page.locator(".code-block-speed")
    await expect(codeBlock).toBeVisible()
  })

  test("should support Markdown", async ({ page }) => {
    await page.goto("http://localhost:6006/iframe.html?id=components-codeblockspeeed--markdown")
    const codeBlock = page.locator(".code-block-speed")
    await expect(codeBlock).toBeVisible()
  })

  test("should auto-detect language", async ({ page }) => {
    await page.goto("http://localhost:6006/iframe.html?id=components-codeblockspeeed--auto-detect")
    const codeBlock = page.locator(".code-block-speed")
    await expect(codeBlock).toBeVisible()
  })

  test("should have proper styling", async ({ page }) => {
    await page.goto("http://localhost:6006/iframe.html?id=components-codeblockspeeed--default")
    const codeBlock = page.locator(".code-block-speed")
    const styles = await codeBlock.evaluate((el) => {
      const computed = window.getComputedStyle(el)
      return {
        position: computed.position,
        borderRadius: computed.borderRadius,
      }
    })
    expect(styles.position).toBe("relative")
  })

  test("should apply custom CSS classes", async ({ page }) => {
    await page.goto(
      "http://localhost:6006/iframe.html?id=components-codeblockspeeed--with-custom-class"
    )
    const codeBlock = page.locator(".code-block-speed")
    const hasCustomClass = await codeBlock.evaluate((el) => {
      return el.classList.contains("custom-code-block")
    })
    expect(hasCustomClass).toBe(true)
  })
})

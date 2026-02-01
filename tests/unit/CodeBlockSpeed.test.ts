import { render, waitFor } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import CodeBlockSpeed from "../../src/lib/components/CodeBlockSpeed/CodeBlockSpeed.svelte"

function renderCodeBlock(code: string, props: Record<string, unknown> = {}) {
  return render(CodeBlockSpeed, {
    props: {
      ...props,
      code,
    },
  })
}

describe("CodeBlockSpeed", () => {
  it("should render the code block container", () => {
    const { container } = renderCodeBlock("const x = 1;")
    const wrapper = container.querySelector(".code-block-speed")
    expect(wrapper).toBeTruthy()
  })

  it("should display language label when provided", () => {
    const { container } = renderCodeBlock("const x = 1;", {
      language: "javascript",
    })
    const langLabel = container.querySelector(".code-language")
    expect(langLabel?.textContent).toBe("javascript")
  })

  it("should have copy button", () => {
    const { container } = renderCodeBlock("const x = 1;")
    const copyButton = container.querySelector(".code-copy")
    expect(copyButton).toBeTruthy()
  })

  it("should apply custom CSS classes", () => {
    const { container } = renderCodeBlock("const x = 1;", {
      class: "custom-class",
    })
    const wrapper = container.querySelector(".code-block-speed")
    expect(wrapper?.classList.contains("custom-class")).toBe(true)
  })

  it("should render code content", () => {
    const testCode = 'function hello() { return "world"; }'
    const { container } = renderCodeBlock(testCode)
    const codeElement = container.querySelector("code")
    expect(codeElement?.textContent).toContain("hello")
  })

  it("should support different languages", () => {
    const languages = ["javascript", "python", "html", "css", "json"]
    languages.forEach((lang) => {
      const { container } = renderCodeBlock("const x = 1;", {
        language: lang,
      })
      expect(container.querySelector(".code-block-speed")).toBeTruthy()
    })
  })

  it("should have proper structure with header and code", () => {
    const { container } = renderCodeBlock("const x = 1;", {
      language: "javascript",
    })
    const header = container.querySelector(".code-header")
    const pre = container.querySelector(".code-pre")
    expect(header).toBeTruthy()
    expect(pre).toBeTruthy()
  })

  it("should render with Speed Highlight classes", async () => {
    const { container } = renderCodeBlock("const x = 1;", {
      language: "javascript",
    })
    const codeElement = container.querySelector("code")

    await waitFor(() => {
      expect(codeElement?.className).toContain("shj-lang-")
    })
  })

  it("should handle empty code gracefully", () => {
    const { container } = renderCodeBlock("")
    expect(container.querySelector(".code-block-speed")).toBeTruthy()
  })

  it("should have accessible copy button", () => {
    const { container } = renderCodeBlock("const x = 1;")
    const copyButton = container.querySelector(".code-copy")
    expect(copyButton?.getAttribute("aria-label")).toBeTruthy()
  })
})

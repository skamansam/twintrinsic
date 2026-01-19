import { render } from "@testing-library/svelte"
import { describe, expect, it, vi } from "vitest"
import CodeBlockSpeed from "../../src/lib/components/CodeBlockSpeed/CodeBlockSpeed.svelte"

describe("CodeBlockSpeed", () => {
  it("should render the code block container", () => {
    const { container } = render(CodeBlockSpeed, {
      slots: {
        default: "const x = 1;",
      },
    })
    const wrapper = container.querySelector(".code-block-speed")
    expect(wrapper).toBeTruthy()
  })

  it("should display language label when provided", () => {
    const { container } = render(CodeBlockSpeed, {
      props: {
        language: "javascript",
      },
      slots: {
        default: "const x = 1;",
      },
    })
    const langLabel = container.querySelector(".code-language")
    expect(langLabel?.textContent).toBe("javascript")
  })

  it("should have copy button", () => {
    const { container } = render(CodeBlockSpeed, {
      slots: {
        default: "const x = 1;",
      },
    })
    const copyButton = container.querySelector(".code-copy")
    expect(copyButton).toBeTruthy()
  })

  it("should apply custom CSS classes", () => {
    const { container } = render(CodeBlockSpeed, {
      props: {
        class: "custom-class",
      },
      slots: {
        default: "const x = 1;",
      },
    })
    const wrapper = container.querySelector(".code-block-speed")
    expect(wrapper?.classList.contains("custom-class")).toBe(true)
  })

  it("should render code content", () => {
    const testCode = 'function hello() { return "world"; }'
    const { container } = render(CodeBlockSpeed, {
      slots: {
        default: testCode,
      },
    })
    const codeElement = container.querySelector("code")
    expect(codeElement?.textContent).toContain("hello")
  })

  it("should support different languages", () => {
    const languages = ["javascript", "python", "html", "css", "json"]
    languages.forEach((lang) => {
      const { container } = render(CodeBlockSpeed, {
        props: {
          language: lang,
        },
        slots: {
          default: "const x = 1;",
        },
      })
      expect(container.querySelector(".code-block-speed")).toBeTruthy()
    })
  })

  it("should have proper structure with header and code", () => {
    const { container } = render(CodeBlockSpeed, {
      props: {
        language: "javascript",
      },
      slots: {
        default: "const x = 1;",
      },
    })
    const header = container.querySelector(".code-header")
    const pre = container.querySelector(".code-pre")
    expect(header).toBeTruthy()
    expect(pre).toBeTruthy()
  })

  it("should render with Speed Highlight classes", () => {
    const { container } = render(CodeBlockSpeed, {
      props: {
        language: "javascript",
      },
      slots: {
        default: "const x = 1;",
      },
    })
    const codeElement = container.querySelector("code")
    expect(codeElement?.className).toContain("shj-lang-")
  })

  it("should handle empty code gracefully", () => {
    const { container } = render(CodeBlockSpeed, {
      slots: {
        default: "",
      },
    })
    expect(container.querySelector(".code-block-speed")).toBeTruthy()
  })

  it("should have accessible copy button", () => {
    const { container } = render(CodeBlockSpeed, {
      slots: {
        default: "const x = 1;",
      },
    })
    const copyButton = container.querySelector(".code-copy")
    expect(copyButton?.getAttribute("aria-label")).toBeTruthy()
  })
})

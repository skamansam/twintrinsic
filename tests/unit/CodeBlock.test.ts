import { render } from "@testing-library/svelte"
import { describe, expect, it, vi } from "vitest"
import CodeBlock from "../../src/lib/components/CodeBlock/CodeBlock.svelte"

describe("CodeBlock", () => {
  it("renders code block container", () => {
    const { container } = render(CodeBlock, {
      props: {
        code: "console.log('hello')",
      },
    })
    expect(container.querySelector(".code-block")).toBeTruthy()
  })

  it("renders element", () => {
    const { container } = render(CodeBlock, {
      props: {
        code: "const x = 1;",
      },
    })
    expect(container.firstChild).toBeTruthy()
  })

  it("accepts language prop", () => {
    const { container } = render(CodeBlock, {
      props: {
        language: "javascript",
      },
    })
    const codeElement = container.querySelector("code")
    expect(codeElement?.className).toContain("language-javascript")
  })

  it("accepts pluginSource prop", () => {
    const { component } = render(CodeBlock, {
      props: {
        pluginSource: "esm.sh",
      },
    })
    expect(component).toBeTruthy()
  })

  it("accepts plugins prop as array", () => {
    const { component } = render(CodeBlock, {
      props: {
        plugins: ["autoloader", "line-numbers"],
      },
    })
    expect(component).toBeTruthy()
  })

  it("accepts custom pluginSource path", () => {
    const { component } = render(CodeBlock, {
      props: {
        pluginSource: "https://custom.cdn/prismjs/components/",
      },
    })
    expect(component).toBeTruthy()
  })

  it("accepts full plugin URLs", () => {
    const { component } = render(CodeBlock, {
      props: {
        plugins: ["https://example.com/custom-plugin.js"],
      },
    })
    expect(component).toBeTruthy()
  })

  it("renders copy button", () => {
    const { container } = render(CodeBlock, {
      props: {
        code: "const x = 1;",
      },
    })
    const copyButton = container.querySelector(".code-copy")
    expect(copyButton).toBeTruthy()
  })

  it("renders language label when language prop is provided", () => {
    const { container } = render(CodeBlock, {
      props: {
        language: "python",
      },
    })
    const languageLabel = container.querySelector(".code-language")
    expect(languageLabel?.textContent).toBe("python")
  })

  it("does not render language label when language prop is not provided", () => {
    const { container } = render(CodeBlock, {
      props: {
        code: "const x = 1;",
      },
    })
    const languageLabel = container.querySelector(".code-language")
    expect(languageLabel).toBeFalsy()
  })

  it("applies custom CSS classes", () => {
    const { container } = render(CodeBlock, {
      props: {
        class: "custom-class",
      },
    })
    const codeBlock = container.querySelector(".code-block")
    expect(codeBlock?.className).toContain("custom-class")
  })
})

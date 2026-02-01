import { render, waitFor } from "@testing-library/svelte"
import { describe, expect, it, vi } from "vitest"
import CodeEditor from "../../src/lib/components/CodeEditor/CodeEditor.svelte"

describe("CodeEditor", () => {
  it("should render the editor container", () => {
    const { container } = render(CodeEditor)
    const wrapper = container.querySelector(".code-editor-wrapper")
    expect(wrapper).toBeTruthy()
  })

  it("should apply custom height", async () => {
    const { container } = render(CodeEditor, {
      props: {
        height: "500px",
      },
    })
    const wrapper = container.querySelector(".code-editor-wrapper")

    await waitFor(() => {
      expect((wrapper as HTMLElement | null)?.style.height).toBe("500px")
    })
  })

  it("should initialize with default language", () => {
    const { container } = render(CodeEditor, {
      props: {
        code: "const x = 1;",
        language: "javascript",
      },
    })
    expect(container.querySelector(".code-editor-wrapper")).toBeTruthy()
  })

  it("should initialize with custom code", () => {
    const testCode = 'function hello() { return "world"; }'
    const { container } = render(CodeEditor, {
      props: {
        code: testCode,
      },
    })
    expect(container.querySelector(".code-editor-wrapper")).toBeTruthy()
  })

  it("should accept different CDN sources", () => {
    const cdnSources = ["jsdelivr", "esm.sh", "unpkg"]
    cdnSources.forEach((source) => {
      const { container } = render(CodeEditor, {
        props: {
          cdnSource: source,
        },
      })
      expect(container.querySelector(".code-editor-wrapper")).toBeTruthy()
    })
  })

  it("should support multiple languages", () => {
    const languages = ["javascript", "typescript", "python", "html", "css", "json"]
    languages.forEach((lang) => {
      const { container } = render(CodeEditor, {
        props: {
          language: lang,
        },
      })
      expect(container.querySelector(".code-editor-wrapper")).toBeTruthy()
    })
  })

  it("should apply custom theme", () => {
    const { container } = render(CodeEditor, {
      props: {
        theme: "one-dark",
      },
    })
    expect(container.querySelector(".code-editor-wrapper")).toBeTruthy()
  })

  it("should have proper CSS classes", () => {
    const { container } = render(CodeEditor)
    const wrapper = container.querySelector(".code-editor-wrapper")
    expect(wrapper?.classList.contains("code-editor-wrapper")).toBe(true)
  })

  it("should accept onchange callback", () => {
    const onchange = vi.fn()
    const { container } = render(CodeEditor, {
      props: {
        onchange,
      },
    })
    expect(container.querySelector(".code-editor-wrapper")).toBeTruthy()
  })

  it("should accept custom extensions array", () => {
    const { container } = render(CodeEditor, {
      props: {
        extensions: ["https://esm.sh/@codemirror/lang-javascript"],
      },
    })
    expect(container.querySelector(".code-editor-wrapper")).toBeTruthy()
  })
})

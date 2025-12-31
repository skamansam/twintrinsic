import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
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
})

import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import Tree from "../../src/lib/components/Tree/Tree.svelte"

describe("Tree", () => {
  it("renders tree container", () => {
    const { container } = render(Tree, {
      props: {
        children: () => "Tree",
      },
    })
    expect(container.querySelector(".tree")).toBeTruthy()
  })

  it("renders children content", () => {
    const { container } = render(Tree, {
      props: {
        children: () => "Tree content",
      },
    })
    expect(container.textContent).toContain("Tree content")
  })
})

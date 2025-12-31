import { render } from "@testing-library/svelte"
import { describe, expect, it, vi } from "vitest"
import Tree from "../../src/lib/components/Tree/Tree.svelte"

describe("Tree", () => {
  it("renders tree container", () => {
    const { container } = render(Tree, {
      props: {
        onselect: vi.fn(),
        children: () => "Tree",
      },
    })
    expect(container.querySelector(".tree")).toBeTruthy()
  })

  it("renders element", () => {
    const { container } = render(Tree, {
      props: {
        onselect: vi.fn(),
        children: () => "Tree content",
      },
    })
    expect(container.firstChild).toBeTruthy()
  })
})

import { render } from "@testing-library/svelte"
import { describe, expect, it, vi } from "vitest"
import Chip from "../../src/lib/components/Chip/Chip.svelte"

describe("Chip", () => {
  it("renders chip element", () => {
    const { container } = render(Chip, {
      props: {
        children: () => "Chip",
      },
    })
    expect(container.querySelector(".chip")).toBeTruthy()
  })

  it("renders element", () => {
    const onclick = vi.fn()
    const { container } = render(Chip, {
      props: {
        onclick,
        children: () => "Test chip",
      },
    })
    expect(container.firstChild).toBeTruthy()
  })

  it("renders chip with deletable", () => {
    const { container } = render(Chip, {
      props: {
        onclick: () => {},
        onremove: () => {},
        children: () => "Deletable",
      },
    })
    expect(container.firstChild).toBeTruthy()
  })
})

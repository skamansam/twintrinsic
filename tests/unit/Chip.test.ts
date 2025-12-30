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

  it("renders children content", () => {
    const { container } = render(Chip, {
      props: {
        children: () => "Test chip",
      },
    })
    expect(container.textContent).toContain("Test chip")
  })

  it("handles click events", () => {
    const onclick = vi.fn()
    const { container } = render(Chip, {
      props: {
        onclick,
        children: () => "Click",
      },
    })
    const chip = container.querySelector(".chip") as HTMLElement
    chip?.click()
    expect(onclick).toHaveBeenCalled()
  })

  it("shows delete button when deletable is true", () => {
    const { container } = render(Chip, {
      props: {
        deletable: true,
        children: () => "Deletable",
      },
    })
    expect(container.querySelector(".chip-delete")).toBeTruthy()
  })
})

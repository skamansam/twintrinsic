import { fireEvent, render } from "@testing-library/svelte"
import { describe, expect, it, vi } from "vitest"
import ListInput from "../../src/lib/components/Form/ListInput.svelte"

describe("ListInput", () => {
  const defaultProps = {
    name: "tags",
    values: ["react", "svelte"],
  }

  it("renders with default props", () => {
    const { container } = render(ListInput, { props: defaultProps })
    expect(container.querySelector("input")).toBeTruthy()
  })

  it("renders chips with role=button for a11y", () => {
    const { container } = render(ListInput, { props: defaultProps })
    const chips = container.querySelectorAll(".list-input-chip")
    expect(chips.length).toBe(2)
    for (const chip of chips) {
      expect(chip.getAttribute("role")).toBe("button")
      expect(chip.getAttribute("tabindex")).toBe("0")
      expect(chip.getAttribute("aria-label")).toBeTruthy()
    }
  })

  it("removes chip on Backspace key (a11y keyboard handler)", async () => {
    const onchange = vi.fn()
    const { container } = render(ListInput, {
      props: { ...defaultProps, onchange },
    })
    const firstChip = container.querySelector(".list-input-chip") as HTMLElement
    await fireEvent.keyDown(firstChip, { key: "Backspace" })
    expect(onchange).toHaveBeenCalled()
  })
})

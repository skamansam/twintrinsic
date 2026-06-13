import { fireEvent, render, screen } from "@testing-library/svelte"
import { describe, expect, it, vi } from "vitest"
import Listbox from "../../src/lib/components/Form/Listbox.svelte"

describe("Listbox", () => {
  const defaultProps = {
    name: "colors",
    options: [
      { label: "Red", value: "red" },
      { label: "Blue", value: "blue" },
    ],
  }

  it("renders with default props", () => {
    const { container } = render(Listbox, { props: defaultProps })
    expect(container.querySelector('[role="listbox"]')).toBeTruthy()
  })

  it("renders options with role=option and tabindex=0 for a11y", () => {
    render(Listbox, { props: defaultProps })
    const options = screen.getAllByRole("option")
    expect(options.length).toBe(2)
    for (const opt of options) {
      expect(opt.getAttribute("tabindex")).toBe("0")
    }
  })

  it("selects option on Enter key press (a11y keyboard handler)", async () => {
    const onchange = vi.fn()
    render(Listbox, { props: { ...defaultProps, onchange } })
    const options = screen.getAllByRole("option")
    await fireEvent.keyDown(options[1], { key: "Enter" })
    expect(onchange).toHaveBeenCalled()
  })
})

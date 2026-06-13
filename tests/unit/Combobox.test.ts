import { fireEvent, render, screen } from "@testing-library/svelte"
import { describe, expect, it, vi } from "vitest"
import Combobox from "../../src/lib/components/Form/Combobox.svelte"

describe("Combobox", () => {
  const defaultProps = {
    options: ["Apple", "Banana", "Cherry"],
    openOnFocus: true,
  }

  it("renders with default props", () => {
    const { container } = render(Combobox, { props: defaultProps })
    expect(container.querySelector("input")).toBeTruthy()
  })

  it("renders options with role=option and tabindex=-1 for a11y", async () => {
    const { container } = render(Combobox, { props: defaultProps })
    const input = container.querySelector("input") as HTMLInputElement
    await fireEvent.focus(input)
    const options = await screen.findAllByRole("option")
    expect(options.length).toBeGreaterThan(0)
    for (const opt of options) {
      expect(opt.getAttribute("tabindex")).toBe("-1")
    }
  })

  it("activates option on Enter key press (a11y keyboard handler)", async () => {
    const onchange = vi.fn()
    const { container } = render(Combobox, { props: { ...defaultProps, onchange } })
    const input = container.querySelector("input") as HTMLInputElement
    await fireEvent.focus(input)
    const options = await screen.findAllByRole("option")
    await fireEvent.keyDown(options[1], { key: "Enter" })
    expect(onchange).toHaveBeenCalled()
  })

  it("activates option on Space key press (a11y keyboard handler)", async () => {
    const onchange = vi.fn()
    const { container } = render(Combobox, { props: { ...defaultProps, onchange } })
    const input = container.querySelector("input") as HTMLInputElement
    await fireEvent.focus(input)
    const options = await screen.findAllByRole("option")
    await fireEvent.keyDown(options[0], { key: " " })
    expect(onchange).toHaveBeenCalled()
  })
})

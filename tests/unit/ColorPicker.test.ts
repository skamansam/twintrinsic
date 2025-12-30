import { render } from "@testing-library/svelte"
import { describe, expect, it, vi } from "vitest"
import ColorPicker from "../../src/lib/components/Form/ColorPicker.svelte"

describe("ColorPicker", () => {
  it("renders color picker input", () => {
    const { container } = render(ColorPicker, {
      props: {
        label: "Color",
      },
    })
    expect(container.querySelector("input[type='color']")).toBeTruthy()
  })

  it("renders label when provided", () => {
    const { container } = render(ColorPicker, {
      props: {
        label: "Color",
      },
    })
    expect(container.querySelector("label")).toBeTruthy()
  })

  it("sets color value", () => {
    const { container } = render(ColorPicker, {
      props: {
        value: "#ff0000",
        label: "Color",
      },
    })
    const input = container.querySelector("input[type='color']") as HTMLInputElement
    expect(input?.value).toBe("#ff0000")
  })

  it("disables color picker when disabled prop is true", () => {
    const { container } = render(ColorPicker, {
      props: {
        disabled: true,
        label: "Disabled",
      },
    })
    const input = container.querySelector("input[type='color']") as HTMLInputElement
    expect(input?.disabled).toBe(true)
  })

  it("handles input events", () => {
    const oninput = vi.fn()
    const { container } = render(ColorPicker, {
      props: {
        oninput,
        label: "Input",
      },
    })
    const input = container.querySelector("input[type='color']") as HTMLInputElement
    input?.dispatchEvent(new Event("input", { bubbles: true }))
    expect(oninput).toHaveBeenCalled()
  })
})

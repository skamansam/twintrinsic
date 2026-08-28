import { render, screen } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import ColorPicker from "../../src/lib/components/Form/ColorPicker.svelte"

describe("ColorPicker", () => {
  it("renders a color input and hex text input", () => {
    render(ColorPicker, {
      props: {
        label: "Pick color",
      },
    })
    const colorInput = screen.getByLabelText("Pick color color swatch")
    const hexInput = screen.getByLabelText("Pick color hex value")
    expect(colorInput).toBeInTheDocument()
    expect(colorInput).toHaveAttribute("type", "color")
    expect(hexInput).toBeInTheDocument()
    expect(hexInput).toHaveAttribute("type", "text")
  })

  it("renders with a hex value", () => {
    render(ColorPicker, {
      props: {
        label: "Color",
        value: "#FF0000",
      },
    })
    const hexInput = screen.getByLabelText("Color hex value")
    expect(hexInput).toHaveValue("#FF0000")
  })

  it("renders disabled state", () => {
    render(ColorPicker, {
      props: {
        label: "Color",
        disabled: true,
      },
    })
    const colorInput = screen.getByLabelText("Color color swatch")
    const hexInput = screen.getByLabelText("Color hex value")
    expect(colorInput).toBeDisabled()
    expect(hexInput).toBeDisabled()
  })

  it("renders error state", () => {
    render(ColorPicker, {
      props: {
        label: "Color",
        error: "Invalid color",
      },
    })
    const hexInput = screen.getByLabelText("Color hex value")
    expect(hexInput).toHaveAttribute("aria-invalid", "true")
  })

  it("renders without label", () => {
    const { container } = render(ColorPicker, {})
    expect(container.firstChild).toBeTruthy()
    const colorInput = container.querySelector("input[type='color']")
    expect(colorInput).toBeTruthy()
  })
})

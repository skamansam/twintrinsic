import { render } from "@testing-library/svelte"
import { describe, expect, it, vi } from "vitest"
import Slider from "../../src/lib/components/Form/Slider.svelte"

describe("Slider", () => {
  it("renders slider input", () => {
    const { container } = render(Slider, {
      props: {
        label: "Volume",
      },
    })
    expect(container.querySelector("input[type='range']")).toBeTruthy()
  })

  it("renders label when provided", () => {
    const { container } = render(Slider, {
      props: {
        label: "Volume",
      },
    })
    expect(container.querySelector("label")).toBeTruthy()
  })

  it("sets slider value", () => {
    const { container } = render(Slider, {
      props: {
        value: 50,
        label: "Volume",
      },
    })
    const slider = container.querySelector("input[type='range']") as HTMLInputElement
    expect(slider?.value).toBe("50")
  })

  it("disables slider when disabled prop is true", () => {
    const { container } = render(Slider, {
      props: {
        disabled: true,
        label: "Disabled",
      },
    })
    const slider = container.querySelector("input[type='range']") as HTMLInputElement
    expect(slider?.disabled).toBe(true)
  })

  it("handles input events", () => {
    const oninput = vi.fn()
    const { container } = render(Slider, {
      props: {
        oninput,
        label: "Input",
      },
    })
    const slider = container.querySelector("input[type='range']") as HTMLInputElement
    slider?.dispatchEvent(new Event("input", { bubbles: true }))
    expect(oninput).toHaveBeenCalled()
  })

  it("sets min and max values", () => {
    const { container } = render(Slider, {
      props: {
        min: 0,
        max: 100,
        label: "Range",
      },
    })
    const slider = container.querySelector("input[type='range']") as HTMLInputElement
    expect(slider?.min).toBe("0")
    expect(slider?.max).toBe("100")
  })
})

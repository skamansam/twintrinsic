import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import Slider from "../../src/lib/components/Form/Slider.svelte"

describe("Slider", () => {
  it("renders native range input", () => {
    const { container } = render(Slider, {
      props: {
        value: 50,
        min: 0,
        max: 100,
      },
    })
    const input = container.querySelector('input[type="range"]')
    expect(input).toBeTruthy()
  })

  it("sets correct input attributes", () => {
    const { container } = render(Slider, {
      props: {
        value: 50,
        min: 0,
        max: 100,
        step: 5,
      },
    })
    const input = container.querySelector('input[type="range"]') as HTMLInputElement
    expect(input.value).toBe("50")
    expect(input.min).toBe("0")
    expect(input.max).toBe("100")
    expect(input.step).toBe("5")
  })

  it("displays value when showValue is true", () => {
    const { container } = render(Slider, {
      props: {
        value: 75,
        min: 0,
        max: 100,
        showValue: true,
      },
    })
    const valueDisplay = container.querySelector(".slider-value-display")
    expect(valueDisplay?.textContent).toBe("75")
  })

  it("applies variant classes", () => {
    const { container } = render(Slider, {
      props: {
        value: 50,
        variant: "success",
      },
    })
    const input = container.querySelector('input[type="range"]')
    expect(input?.classList.contains("slider-success")).toBe(true)
  })

  it("disables input when disabled prop is true", () => {
    const { container } = render(Slider, {
      props: {
        value: 50,
        disabled: true,
      },
    })
    const input = container.querySelector('input[type="range"]') as HTMLInputElement
    expect(input.disabled).toBe(true)
  })
})

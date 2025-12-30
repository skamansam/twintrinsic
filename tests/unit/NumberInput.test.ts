import { render } from "@testing-library/svelte"
import { describe, expect, it, vi } from "vitest"
import NumberInput from "../../src/lib/components/Form/NumberInput.svelte"

describe("NumberInput", () => {
  it("renders number input field", () => {
    const { container } = render(NumberInput, {
      props: {
        label: "Quantity",
      },
    })
    expect(container.querySelector("input[type='number']")).toBeTruthy()
  })

  it("renders label when provided", () => {
    const { container } = render(NumberInput, {
      props: {
        label: "Quantity",
      },
    })
    expect(container.querySelector("label")).toBeTruthy()
  })

  it("sets input value", () => {
    const { container } = render(NumberInput, {
      props: {
        value: 42,
        label: "Quantity",
      },
    })
    const input = container.querySelector("input[type='number']") as HTMLInputElement
    expect(input?.value).toBe("42")
  })

  it("disables input when disabled prop is true", () => {
    const { container } = render(NumberInput, {
      props: {
        disabled: true,
        label: "Disabled",
      },
    })
    const input = container.querySelector("input[type='number']") as HTMLInputElement
    expect(input?.disabled).toBe(true)
  })

  it("handles input events", () => {
    const oninput = vi.fn()
    const { container } = render(NumberInput, {
      props: {
        oninput,
        label: "Input",
      },
    })
    const input = container.querySelector("input[type='number']") as HTMLInputElement
    input?.dispatchEvent(new Event("input", { bubbles: true }))
    expect(oninput).toHaveBeenCalled()
  })
})

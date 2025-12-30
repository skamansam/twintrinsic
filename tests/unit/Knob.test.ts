import { render } from "@testing-library/svelte"
import { describe, expect, it, vi } from "vitest"
import Knob from "../../src/lib/components/Form/Knob.svelte"

describe("Knob", () => {
  it("renders knob element", () => {
    const { container } = render(Knob, {
      props: {
        label: "Volume",
      },
    })
    expect(container.querySelector(".knob")).toBeTruthy()
  })

  it("renders label when provided", () => {
    const { container } = render(Knob, {
      props: {
        label: "Volume",
      },
    })
    expect(container.querySelector("label")).toBeTruthy()
  })

  it("sets knob value", () => {
    const { container } = render(Knob, {
      props: {
        value: 50,
        label: "Volume",
      },
    })
    const knob = container.querySelector(".knob")
    expect(knob).toBeTruthy()
  })

  it("handles change events", () => {
    const onchange = vi.fn()
    const { container } = render(Knob, {
      props: {
        onchange,
        label: "Change",
      },
    })
    const knob = container.querySelector(".knob") as HTMLElement
    knob?.dispatchEvent(new Event("change", { bubbles: true }))
    expect(onchange).toHaveBeenCalled()
  })
})

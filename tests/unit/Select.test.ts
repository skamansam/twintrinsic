import { render } from "@testing-library/svelte"
import { describe, expect, it, vi } from "vitest"
import Select from "../../src/lib/components/Form/Select.svelte"

describe("Select", () => {
  it("renders select element", () => {
    const { container } = render(Select, {
      props: {
        label: "Choose option",
      },
    })
    expect(container.querySelector("select")).toBeTruthy()
  })

  it("renders label when provided", () => {
    const { container } = render(Select, {
      props: {
        label: "Choose option",
      },
    })
    expect(container.querySelector("label")).toBeTruthy()
  })

  it("disables select when disabled prop is true", () => {
    const { container } = render(Select, {
      props: {
        disabled: true,
        label: "Disabled",
      },
    })
    const select = container.querySelector("select") as HTMLSelectElement
    expect(select?.disabled).toBe(true)
  })

  it("handles change events", () => {
    const onchange = vi.fn()
    const { container } = render(Select, {
      props: {
        onchange,
        label: "Change",
      },
    })
    const select = container.querySelector("select") as HTMLSelectElement
    select?.dispatchEvent(new Event("change", { bubbles: true }))
    expect(onchange).toHaveBeenCalled()
  })

  it("marks select as required", () => {
    const { container } = render(Select, {
      props: {
        required: true,
        label: "Required",
      },
    })
    const select = container.querySelector("select") as HTMLSelectElement
    expect(select?.required).toBe(true)
  })
})

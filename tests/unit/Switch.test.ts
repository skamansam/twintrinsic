import { render } from "@testing-library/svelte"
import { describe, expect, it, vi } from "vitest"
import Switch from "../../src/lib/components/Form/Switch.svelte"

describe("Switch", () => {
  it("renders switch input", () => {
    const { container } = render(Switch, {
      props: {
        label: "Toggle",
      },
    })
    expect(container.querySelector("input[type='checkbox']")).toBeTruthy()
  })

  it("renders label when provided", () => {
    const { container } = render(Switch, {
      props: {
        label: "Enable feature",
      },
    })
    expect(container.querySelector("label")).toBeTruthy()
  })

  it("sets checked state", () => {
    const { container } = render(Switch, {
      props: {
        checked: true,
        label: "Enabled",
      },
    })
    const switchInput = container.querySelector("input[type='checkbox']") as HTMLInputElement
    expect(switchInput?.checked).toBe(true)
  })

  it("disables switch when disabled prop is true", () => {
    const { container } = render(Switch, {
      props: {
        disabled: true,
        label: "Disabled",
      },
    })
    const switchInput = container.querySelector("input[type='checkbox']") as HTMLInputElement
    expect(switchInput?.disabled).toBe(true)
  })

  it("handles change events", () => {
    const onchange = vi.fn()
    const { container } = render(Switch, {
      props: {
        onchange,
        label: "Change",
      },
    })
    const switchInput = container.querySelector("input[type='checkbox']") as HTMLInputElement
    switchInput?.dispatchEvent(new Event("change", { bubbles: true }))
    expect(onchange).toHaveBeenCalled()
  })
})

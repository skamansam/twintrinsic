import { render } from "@testing-library/svelte"
import { describe, expect, it, vi } from "vitest"
import Checkbox from "../../src/lib/components/Form/Checkbox.svelte"

describe("Checkbox", () => {
  it("renders checkbox input", () => {
    const { container } = render(Checkbox, {
      props: {
        label: "Accept terms",
      },
    })
    expect(container.querySelector("input[type='checkbox']")).toBeTruthy()
  })

  it("renders label when provided", () => {
    const { container } = render(Checkbox, {
      props: {
        label: "Accept terms",
      },
    })
    expect(container.querySelector("label")).toBeTruthy()
  })

  it("sets checked state", () => {
    const { container } = render(Checkbox, {
      props: {
        checked: true,
        label: "Checked",
      },
    })
    const checkbox = container.querySelector("input[type='checkbox']") as HTMLInputElement
    expect(checkbox?.checked).toBe(true)
  })

  it("disables checkbox when disabled prop is true", () => {
    const { container } = render(Checkbox, {
      props: {
        disabled: true,
        label: "Disabled",
      },
    })
    const checkbox = container.querySelector("input[type='checkbox']") as HTMLInputElement
    expect(checkbox?.disabled).toBe(true)
  })

  it("handles change events", () => {
    const onchange = vi.fn()
    const { container } = render(Checkbox, {
      props: {
        onchange,
        label: "Change",
      },
    })
    const checkbox = container.querySelector("input[type='checkbox']") as HTMLInputElement
    checkbox?.dispatchEvent(new Event("change", { bubbles: true }))
    expect(onchange).toHaveBeenCalled()
  })

  it("applies indeterminate state", () => {
    const { container } = render(Checkbox, {
      props: {
        indeterminate: true,
        label: "Indeterminate",
      },
    })
    const checkbox = container.querySelector("input[type='checkbox']") as HTMLInputElement
    expect(checkbox?.indeterminate).toBe(true)
  })
})

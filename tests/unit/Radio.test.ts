import { render } from "@testing-library/svelte"
import { describe, expect, it, vi } from "vitest"
import Radio from "../../src/lib/components/Form/Radio.svelte"

describe("Radio", () => {
  it("renders radio input", () => {
    const { container } = render(Radio, {
      props: {
        label: "Option 1",
        value: "option1",
      },
    })
    expect(container.querySelector("input[type='radio']")).toBeTruthy()
  })

  it("renders label when provided", () => {
    const { container } = render(Radio, {
      props: {
        label: "Option 1",
        value: "option1",
      },
    })
    expect(container.querySelector("label")).toBeTruthy()
  })

  it("sets checked state", () => {
    const { container } = render(Radio, {
      props: {
        checked: true,
        label: "Option 1",
        value: "option1",
      },
    })
    const radio = container.querySelector("input[type='radio']") as HTMLInputElement
    expect(radio?.checked).toBe(true)
  })

  it("disables radio when disabled prop is true", () => {
    const { container } = render(Radio, {
      props: {
        disabled: true,
        label: "Disabled",
        value: "disabled",
      },
    })
    const radio = container.querySelector("input[type='radio']") as HTMLInputElement
    expect(radio?.disabled).toBe(true)
  })

  it("handles change events", () => {
    const onchange = vi.fn()
    const { container } = render(Radio, {
      props: {
        onchange,
        label: "Change",
        value: "change",
      },
    })
    const radio = container.querySelector("input[type='radio']") as HTMLInputElement
    radio?.dispatchEvent(new Event("change", { bubbles: true }))
    expect(onchange).toHaveBeenCalled()
  })

  it("sets radio value", () => {
    const { container } = render(Radio, {
      props: {
        value: "test-value",
        label: "Test",
      },
    })
    const radio = container.querySelector("input[type='radio']") as HTMLInputElement
    expect(radio?.value).toBe("test-value")
  })
})

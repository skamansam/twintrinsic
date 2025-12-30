import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import ListInput from "../../src/lib/components/Form/ListInput.svelte"

describe("ListInput", () => {
  it("renders list input container", () => {
    const { container } = render(ListInput, {
      props: {
        label: "Items",
      },
    })
    expect(container.querySelector(".list-input")).toBeTruthy()
  })

  it("renders label when provided", () => {
    const { container } = render(ListInput, {
      props: {
        label: "Items",
      },
    })
    expect(container.querySelector("label")).toBeTruthy()
  })

  it("disables list input when disabled prop is true", () => {
    const { container } = render(ListInput, {
      props: {
        disabled: true,
        label: "Disabled",
      },
    })
    const listInput = container.querySelector(".list-input")
    expect(listInput?.className).toContain("disabled")
  })
})

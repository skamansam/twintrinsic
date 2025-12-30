import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import Dropdown from "../../src/lib/components/Form/Dropdown.svelte"

describe("Dropdown", () => {
  it("renders dropdown container", () => {
    const { container } = render(Dropdown, {
      props: {
        label: "Menu",
      },
    })
    expect(container.querySelector(".dropdown")).toBeTruthy()
  })

  it("renders label when provided", () => {
    const { container } = render(Dropdown, {
      props: {
        label: "Menu",
      },
    })
    expect(container.querySelector("label")).toBeTruthy()
  })

  it("disables dropdown when disabled prop is true", () => {
    const { container } = render(Dropdown, {
      props: {
        disabled: true,
        label: "Disabled",
      },
    })
    const dropdown = container.querySelector(".dropdown")
    expect(dropdown?.className).toContain("disabled")
  })
})

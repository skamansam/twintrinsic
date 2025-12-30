import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import Combobox from "../../src/lib/components/Form/Combobox.svelte"

describe("Combobox", () => {
  it("renders combobox container", () => {
    const { container } = render(Combobox, {
      props: {
        label: "Select",
      },
    })
    expect(container.querySelector(".combobox")).toBeTruthy()
  })

  it("renders label when provided", () => {
    const { container } = render(Combobox, {
      props: {
        label: "Select",
      },
    })
    expect(container.querySelector("label")).toBeTruthy()
  })

  it("disables combobox when disabled prop is true", () => {
    const { container } = render(Combobox, {
      props: {
        disabled: true,
        label: "Disabled",
      },
    })
    const combobox = container.querySelector(".combobox")
    expect(combobox?.className).toContain("disabled")
  })
})

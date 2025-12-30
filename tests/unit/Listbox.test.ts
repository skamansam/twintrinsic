import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import Listbox from "../../src/lib/components/Form/Listbox.svelte"

describe("Listbox", () => {
  it("renders listbox container", () => {
    const { container } = render(Listbox, {
      props: {
        label: "Options",
      },
    })
    expect(container.querySelector(".listbox")).toBeTruthy()
  })

  it("renders label when provided", () => {
    const { container } = render(Listbox, {
      props: {
        label: "Options",
      },
    })
    expect(container.querySelector("label")).toBeTruthy()
  })

  it("disables listbox when disabled prop is true", () => {
    const { container } = render(Listbox, {
      props: {
        disabled: true,
        label: "Disabled",
      },
    })
    const listbox = container.querySelector(".listbox")
    expect(listbox?.className).toContain("disabled")
  })
})

import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import AutoComplete from "../../src/lib/components/Form/AutoComplete.svelte"

describe("AutoComplete", () => {
  it("renders autocomplete container", () => {
    const { container } = render(AutoComplete, {
      props: {
        label: "Search",
      },
    })
    expect(container.querySelector(".autocomplete")).toBeTruthy()
  })

  it("renders label when provided", () => {
    const { container } = render(AutoComplete, {
      props: {
        label: "Search",
      },
    })
    expect(container.querySelector("label")).toBeTruthy()
  })

  it("disables autocomplete when disabled prop is true", () => {
    const { container } = render(AutoComplete, {
      props: {
        disabled: true,
        label: "Disabled",
      },
    })
    const autocomplete = container.querySelector(".autocomplete")
    expect(autocomplete?.className).toContain("disabled")
  })
})

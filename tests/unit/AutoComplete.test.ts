import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import AutoComplete from "../../src/lib/components/Form/AutoComplete.svelte"

describe("AutoComplete", () => {
  it("renders element", () => {
    const { container } = render(AutoComplete, {
      props: {
        label: "Search",
        disabled: true,
      },
    })
    expect(container.firstChild).toBeTruthy()
  })

  it("renders label when provided", () => {
    const { container } = render(AutoComplete, {
      props: {
        label: "Search",
      },
    })
    expect(container.querySelector("label")).toBeTruthy()
  })

  it("renders element when disabled prop is true", () => {
    const { container } = render(AutoComplete, {
      props: {
        disabled: true,
        label: "Disabled",
      },
    })
    expect(container.firstChild).toBeTruthy()
    const autocomplete = container.querySelector(".autocomplete")
    expect(autocomplete?.className).toContain("disabled")
  })
})

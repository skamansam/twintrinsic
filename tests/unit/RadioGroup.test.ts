import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import RadioGroup from "../../src/lib/components/Form/RadioGroup.svelte"

describe("RadioGroup", () => {
  it("renders radio group container", () => {
    const { container } = render(RadioGroup, {
      props: {
        label: "Options",
      },
    })
    expect(container.querySelector(".radio-group")).toBeTruthy()
  })

  it("renders label when provided", () => {
    const { container } = render(RadioGroup, {
      props: {
        label: "Options",
      },
    })
    expect(container.querySelector("label")).toBeTruthy()
  })
})

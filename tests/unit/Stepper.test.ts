import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import Stepper from "../../src/lib/components/Stepper/Stepper.svelte"

describe("Stepper", () => {
  it("renders stepper container", () => {
    const { container } = render(Stepper, {
      props: {
        children: () => "Steps",
      },
    })
    expect(container.querySelector(".stepper")).toBeTruthy()
  })

  it("renders element", () => {
    const { container } = render(Stepper, {
      props: {
        children: () => "Stepper content",
      },
    })
    expect(container.firstChild).toBeTruthy()
  })
})

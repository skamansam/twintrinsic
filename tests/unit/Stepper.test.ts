import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import Stepper from "../../src/lib/components/Stepper/Stepper.svelte"

describe("Stepper", () => {
  it("renders stepper container", () => {
    const { container } = render(Stepper, {
      props: {
        children: () => "Step",
      },
    })
    expect(container.querySelector(".stepper")).toBeTruthy()
  })

  it("renders children content", () => {
    const { container } = render(Stepper, {
      props: {
        children: () => "Step content",
      },
    })
    expect(container.textContent).toContain("Step content")
  })
})

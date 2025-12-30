import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import StepperStep from "../../src/lib/components/Stepper/StepperStep.svelte"

describe("StepperStep", () => {
  it("renders stepper step", () => {
    const { container } = render(StepperStep, {
      props: {
        children: () => "Step",
      },
    })
    expect(container.querySelector(".stepper-step")).toBeTruthy()
  })

  it("renders children content", () => {
    const { container } = render(StepperStep, {
      props: {
        children: () => "Step content",
      },
    })
    expect(container.textContent).toContain("Step content")
  })
})

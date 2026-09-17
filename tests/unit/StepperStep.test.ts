import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import StepperStep from "../../src/lib/components/Stepper/StepperStep.svelte"

describe("StepperStep", () => {
  it("renders stepper step", () => {
    const { container } = render(StepperStep, {
      props: {
        title: "Step 1",
        subtitle: "Subtitle",
        icon: undefined,
        onClick: () => { /* stub */ },
        children: () => "Step",
      },
    })
    expect(container.querySelector(".stepper-step")).toBeTruthy()
  })

  it("renders element", () => {
    const { container } = render(StepperStep, {
      props: {
        title: "Step 1",
        subtitle: "Subtitle",
        icon: undefined,
        onClick: () => { /* stub */ },
        children: () => "StepperStep content",
      },
    })
    expect(container.firstChild).toBeTruthy()
  })
})

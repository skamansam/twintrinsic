import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import FloatLabel from "../../src/lib/components/Form/FloatLabel.svelte"

describe("FloatLabel", () => {
  it("renders element", () => {
    const { container } = render(FloatLabel, {
      props: {
        label: "Label",
        error: undefined,
        helpText: undefined,
        children: () => "Input",
      },
    })
    expect(container.firstChild).toBeTruthy()
  })
})

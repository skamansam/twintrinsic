import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import Knob from "../../src/lib/components/Form/Knob.svelte"

describe("Knob", () => {
  it("renders element", () => {
    const { container } = render(Knob, {
      props: {
        value: 50,
        min: 0,
        max: 100,
      },
    })
    expect(container.firstChild).toBeTruthy()
  })
})

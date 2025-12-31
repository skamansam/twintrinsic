import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import Slider from "../../src/lib/components/Form/Slider.svelte"

describe("Slider", () => {
  it("renders element", () => {
    const { container } = render(Slider, {
      props: {
        value: 50,
        min: 0,
        max: 100,
      },
    })
    expect(container.firstChild).toBeTruthy()
  })
})

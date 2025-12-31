import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import ColorPicker from "../../src/lib/components/Form/ColorPicker.svelte"

describe("ColorPicker", () => {
  it("renders element", () => {
    const { container } = render(ColorPicker, {
      props: {
        label: "Pick color",
      },
    })
    expect(container.firstChild).toBeTruthy()
  })
})

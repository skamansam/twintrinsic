import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import InputSwitch from "../../src/lib/components/Form/InputSwitch.svelte"

describe("InputSwitch", () => {
  it("renders input switch element", () => {
    const { container } = render(InputSwitch, {
      props: {
        label: "Toggle",
      },
    })
    expect(container.querySelector(".input-switch")).toBeTruthy()
  })

  it("renders element", () => {
    const { container } = render(InputSwitch, {
      props: {
        label: "InputSwitch label",
      },
    })
    expect(container.firstChild).toBeTruthy()
  })
})

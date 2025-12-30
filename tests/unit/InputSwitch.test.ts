import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import InputSwitch from "../../src/lib/components/Form/InputSwitch.svelte"

describe("InputSwitch", () => {
  it("renders input switch", () => {
    const { container } = render(InputSwitch, {
      props: {
        label: "Toggle",
      },
    })
    expect(container.querySelector(".input-switch")).toBeTruthy()
  })

  it("renders label when provided", () => {
    const { container } = render(InputSwitch, {
      props: {
        label: "Toggle",
      },
    })
    expect(container.querySelector("label")).toBeTruthy()
  })
})

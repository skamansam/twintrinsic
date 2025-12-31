import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import ButtonGroup from "../../src/lib/components/Button/ButtonGroup.svelte"

describe("ButtonGroup", () => {
  it("renders button group container", () => {
    const { container } = render(ButtonGroup, {
      props: {
        children: () => "Buttons",
      },
    })
    expect(container.querySelector(".button-group")).toBeTruthy()
  })

  it("renders element", () => {
    const { container } = render(ButtonGroup, {
      props: {
        children: () => "ButtonGroup content",
      },
    })
    expect(container.firstChild).toBeTruthy()
  })
})

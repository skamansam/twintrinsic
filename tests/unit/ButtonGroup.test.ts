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

  it("renders children content", () => {
    const { container } = render(ButtonGroup, {
      props: {
        children: () => "Button group content",
      },
    })
    expect(container.textContent).toContain("Button group content")
  })
})

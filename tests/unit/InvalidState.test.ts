import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import InvalidState from "../../src/lib/components/Form/InvalidState.svelte"

describe("InvalidState", () => {
  it("renders invalid state container", () => {
    const { container } = render(InvalidState, {
      props: {
        children: () => "Error",
      },
    })
    expect(container.querySelector(".invalid-state")).toBeTruthy()
  })

  it("renders children content", () => {
    const { container } = render(InvalidState, {
      props: {
        children: () => "Error message",
      },
    })
    expect(container.textContent).toContain("Error message")
  })
})

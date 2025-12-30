import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import Tooltip from "../../src/lib/components/Tooltip/Tooltip.svelte"

describe("Tooltip", () => {
  it("renders tooltip container", () => {
    const { container } = render(Tooltip, {
      props: {
        content: "Tooltip content",
        children: () => "Hover me",
      },
    })
    expect(container.querySelector(".tooltip")).toBeTruthy()
  })

  it("renders children content", () => {
    const { container } = render(Tooltip, {
      props: {
        content: "Tooltip content",
        children: () => "Hover me",
      },
    })
    expect(container.textContent).toContain("Hover me")
  })
})

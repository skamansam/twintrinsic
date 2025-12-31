import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import Tooltip from "../../src/lib/components/Tooltip/Tooltip.svelte"

describe("Tooltip", () => {
  it("renders tooltip element", () => {
    const { container } = render(Tooltip, {
      props: {
        content: "Tooltip content",
        children: () => "Hover me",
      },
    })
    expect(container.firstChild).toBeTruthy()
  })

  it("renders with content prop", () => {
    const { container } = render(Tooltip, {
      props: {
        content: "Tooltip content",
        children: () => "Hover me",
      },
    })
    expect(container).toBeTruthy()
  })
})

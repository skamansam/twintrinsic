import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import Separator from "../../src/lib/components/Separator/Separator.svelte"

describe("Separator", () => {
  it("renders separator element", () => {
    const { container } = render(Separator, {
      props: {},
    })
    expect(container.querySelector(".separator")).toBeTruthy()
  })

  it("applies orientation class", () => {
    const { container } = render(Separator, {
      props: {
        orientation: "vertical",
      },
    })
    const separator = container.querySelector(".separator")
    expect(separator?.className).toContain("vertical")
  })
})

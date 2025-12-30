import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import BottomBar from "../../src/lib/components/BottomBar/BottomBar.svelte"

describe("BottomBar", () => {
  it("renders bottom bar container", () => {
    const { container } = render(BottomBar, {
      props: {
        children: () => "Bottom bar",
      },
    })
    expect(container.querySelector(".bottom-bar")).toBeTruthy()
  })

  it("renders children content", () => {
    const { container } = render(BottomBar, {
      props: {
        children: () => "Bottom bar content",
      },
    })
    expect(container.textContent).toContain("Bottom bar content")
  })
})

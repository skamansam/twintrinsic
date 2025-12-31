import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import BottomBar from "../../src/lib/components/BottomBar/BottomBar.svelte"

describe("BottomBar", () => {
  it("renders bottom bar container", () => {
    const { container } = render(BottomBar, {
      props: {
        children: () => "Content",
      },
    })
    expect(container.firstChild).toBeTruthy()
  })

  it("renders element", () => {
    const { container } = render(BottomBar, {
      props: {
        children: () => "BottomBar content",
      },
    })
    expect(container.firstChild).toBeTruthy()
  })
})

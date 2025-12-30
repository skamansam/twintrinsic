import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import Tabs from "../../src/lib/components/Tabs/Tabs.svelte"

describe("Tabs", () => {
  it("renders tabs container", () => {
    const { container } = render(Tabs, {
      props: {
        children: () => "Tab content",
      },
    })
    expect(container.querySelector(".tabs")).toBeTruthy()
  })

  it("renders children content", () => {
    const { container } = render(Tabs, {
      props: {
        children: () => "Tab content",
      },
    })
    expect(container.textContent).toContain("Tab content")
  })
})

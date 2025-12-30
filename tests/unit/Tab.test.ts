import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import Tab from "../../src/lib/components/Tabs/Tab.svelte"

describe("Tab", () => {
  it("renders tab element", () => {
    const { container } = render(Tab, {
      props: {
        children: () => "Tab",
      },
    })
    expect(container.querySelector(".tab")).toBeTruthy()
  })

  it("renders children content", () => {
    const { container } = render(Tab, {
      props: {
        children: () => "Tab content",
      },
    })
    expect(container.textContent).toContain("Tab content")
  })
})

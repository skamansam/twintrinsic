import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import TabList from "../../src/lib/components/Tabs/TabList.svelte"

describe("TabList", () => {
  it("renders tab list container", () => {
    const { container } = render(TabList, {
      props: {
        children: () => "Tabs",
      },
    })
    expect(container.querySelector(".tab-list")).toBeTruthy()
  })

  it("renders children content", () => {
    const { container } = render(TabList, {
      props: {
        children: () => "Tab list",
      },
    })
    expect(container.textContent).toContain("Tab list")
  })
})

import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import TabList from "../../src/lib/components/Tabs/TabList.svelte"

describe("TabList", () => {
  it("renders tab list container", () => {
    const { container } = render(TabList, {
      props: {
        ariaLabel: "Tabs",
        children: () => "Tabs",
      },
    })
    expect(container.querySelector(".tab-list")).toBeTruthy()
  })

  it("renders element", () => {
    const { container } = render(TabList, {
      props: {
        ariaLabel: "Tabs",
        children: () => "Tab list",
      },
    })
    expect(container.firstChild).toBeTruthy()
  })
})

import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import TabPanel from "../../src/lib/components/Tabs/TabPanel.svelte"

describe("TabPanel", () => {
  it("renders tab panel container", () => {
    const { container } = render(TabPanel, {
      props: {
        id: "panel-1",
        children: () => "Panel",
      },
    })
    expect(container.querySelector(".tab-panel")).toBeTruthy()
  })

  it("renders element", () => {
    const { container } = render(TabPanel, {
      props: {
        id: "panel-1",
        children: () => "Panel content",
      },
    })
    expect(container.firstChild).toBeTruthy()
  })
})

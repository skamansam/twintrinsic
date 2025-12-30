import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import TabPanel from "../../src/lib/components/Tabs/TabPanel.svelte"

describe("TabPanel", () => {
  it("renders tab panel container", () => {
    const { container } = render(TabPanel, {
      props: {
        children: () => "Panel",
      },
    })
    expect(container.querySelector(".tab-panel")).toBeTruthy()
  })

  it("renders children content", () => {
    const { container } = render(TabPanel, {
      props: {
        children: () => "Panel content",
      },
    })
    expect(container.textContent).toContain("Panel content")
  })
})

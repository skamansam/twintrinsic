import { fireEvent, render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import TabPanel from "../../src/lib/components/Tabs/TabPanel.svelte"
import TabsHarness from "./helpers/TabsHarness.svelte"

/**
 * TabPanel is tested through the TabsHarness (TabPanel needs the tabs
 * context to register itself). Covers the outside-context throw
 * contract, the hidden attribute, keepAlive rendering, lazy mounting,
 * and ARIA wiring back to the tab.
 */
describe("TabPanel", () => {
  it("throws when rendered outside a Tabs component", () => {
    expect(() => render(TabPanel)).toThrow(/TabPanel must be used within a Tabs component/)
  })

  it("hides inactive panels with the hidden attribute and wires aria-labelledby", () => {
    const { getAllByRole } = render(TabsHarness)

    // Hidden panels are display:none, so their accessible name can't be
    // computed — query all panels (in DOM order) and assert per index.
    const panels = getAllByRole("tabpanel", { hidden: true })
    expect(panels).toHaveLength(3)

    expect(panels[0]).toBeVisible()
    expect(panels[1]).toHaveAttribute("hidden")
    expect(panels[2]).toHaveAttribute("hidden")

    const labelledBy = panels[1].getAttribute("aria-labelledby")
    expect(labelledBy).toBeTruthy()
    expect(document.getElementById(labelledBy!)).toHaveTextContent("Second")
  })

  it("shows the selected panel's content after switching tabs", async () => {
    const { getByRole, getAllByRole, getByText } = render(TabsHarness)

    await fireEvent.click(getByRole("tab", { name: "Second" }))

    expect(getByRole("tabpanel", { name: "Second" })).toBeVisible()
    expect(getByText("Second panel content")).toBeVisible()

    // The previously selected panel is now hidden
    const panels = getAllByRole("tabpanel", { hidden: true })
    expect(panels[0]).toHaveAttribute("hidden")
  })

  it("keeps visited panels in the DOM (keepAlive default)", async () => {
    const { getByRole, getByText } = render(TabsHarness)

    await fireEvent.click(getByRole("tab", { name: "Second" }))

    expect(getByText("First panel content")).toBeInTheDocument()
  })

  it("lazy panels only mount their content once selected", async () => {
    const { getByRole, getByText, queryByText } = render(TabsHarness, { props: { lazyPanels: true } })

    // Nothing but the first panel's content is mounted initially
    expect(getByText("First panel content")).toBeInTheDocument()
    expect(queryByText("Second panel content")).not.toBeInTheDocument()

    await fireEvent.click(getByRole("tab", { name: "Second" }))

    expect(queryByText("Second panel content")).toBeInTheDocument()
    expect(queryByText("Third panel content")).not.toBeInTheDocument()
  })

  it("starts on the tab chosen by defaultIndex", () => {
    const { getByRole } = render(TabsHarness, { props: { defaultIndex: 1 } })

    expect(getByRole("tab", { name: "Second" })).toHaveAttribute("aria-selected", "true")
    expect(getByRole("tabpanel", { name: "Second" })).toBeVisible()
  })
})

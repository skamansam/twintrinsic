import { render, screen } from "@testing-library/svelte"
import { createRawSnippet } from "svelte"
import { describe, expect, it } from "vitest"
import Tooltip from "../../src/lib/components/Tooltip/Tooltip.svelte"

describe("Tooltip", () => {
  it("renders children as the trigger", () => {
    const childSnippet = createRawSnippet(() => ({
      render: () => "<span>Hover me</span>",
    }))
    render(Tooltip, {
      props: { content: "Tip text", children: childSnippet },
    })
    expect(screen.getByText("Hover me")).toBeTruthy()
  })

  it("renders a button trigger with interestfor attribute", () => {
    render(Tooltip, { props: { content: "Tip" } })
    const trigger = document.querySelector("button.tooltip-trigger")
    expect(trigger).toBeTruthy()
    expect(trigger?.getAttribute("interestfor")).toBeTruthy()
  })

  it("renders a tooltip element with popover='hint' attribute", () => {
    render(Tooltip, { props: { content: "Tip text" } })
    const tooltip = document.querySelector("[popover]")
    expect(tooltip).toBeTruthy()
    expect(tooltip?.getAttribute("popover")).toBe("hint")
  })

  it("renders tooltip text content", () => {
    render(Tooltip, { props: { content: "Save your work" } })
    const tooltip = document.querySelector("[popover]")
    expect(tooltip?.textContent?.trim()).toBe("Save your work")
  })

  it("links trigger interestfor to tooltip ID", () => {
    render(Tooltip, { props: { content: "Tip" } })
    const tooltip = document.querySelector("[popover]")
    const id = tooltip?.id
    expect(id).toBeTruthy()

    const trigger = document.querySelector(`button[interestfor="${id}"]`)
    expect(trigger).toBeTruthy()
  })

  it("sets position-anchor on the tooltip matching the trigger's anchor-name", () => {
    render(Tooltip, { props: { content: "Tip" } })
    const tooltip = document.querySelector("[popover]")
    const trigger = document.querySelector("button.tooltip-trigger")

    const anchorName = tooltip?.getAttribute("style")?.match(/position-anchor:\s*(--tooltip-[a-f0-9-]+)/)?.[1]
    expect(anchorName).toBeTruthy()

    const triggerStyle = trigger?.getAttribute("style") ?? ""
    expect(triggerStyle).toContain(`anchor-name: ${anchorName}`)
  })

  it("applies position class based on position prop", () => {
    const { unmount } = render(Tooltip, {
      props: { content: "Tip", position: "bottom" },
    })
    const tooltip = document.querySelector("[popover]")
    expect(tooltip?.classList.contains("tooltip-bottom")).toBe(true)

    unmount()

    render(Tooltip, {
      props: { content: "Tip", position: "left" },
    })
    const tooltip2 = document.querySelector("[popover]")
    expect(tooltip2?.classList.contains("tooltip-left")).toBe(true)
  })

  it("applies arrow class when arrow is true", () => {
    render(Tooltip, { props: { content: "Tip", arrow: true } })
    const tooltip = document.querySelector("[popover]")
    expect(tooltip?.classList.contains("tooltip-arrow")).toBe(true)
  })

  it("does not apply arrow class when arrow is false", () => {
    render(Tooltip, { props: { content: "Tip", arrow: false } })
    const tooltip = document.querySelector("[popover]")
    expect(tooltip?.classList.contains("tooltip-arrow")).toBe(false)
  })

  it("applies custom class to wrapper", () => {
    const { container } = render(Tooltip, {
      props: { content: "Tip", class: "my-custom-class" },
    })
    const wrapper = container.querySelector(".tooltip-wrapper")
    expect(wrapper?.classList.contains("my-custom-class")).toBe(true)
  })

  it("sets offset as margin on the tooltip", () => {
    render(Tooltip, { props: { content: "Tip", offset: 16 } })
    const tooltip = document.querySelector("[popover]")
    const style = tooltip?.getAttribute("style") ?? ""
    expect(style).toContain("margin: 16px")
  })

  it("renders snippet content when tooltipContent is provided", () => {
    const tipSnippet = createRawSnippet(() => ({
      render: () => "<strong>Bold tip</strong>",
    }))
    render(Tooltip, {
      props: { content: "Plain", tooltipContent: tipSnippet },
    })
    const tooltip = document.querySelector("[popover]")
    expect(tooltip?.querySelector("strong")).toBeTruthy()
    expect(tooltip?.textContent?.trim()).toBe("Bold tip")
  })

  it("button trigger has type=button to avoid form submission", () => {
    render(Tooltip, { props: { content: "Tip" } })
    const trigger = document.querySelector("button.tooltip-trigger")
    expect(trigger?.getAttribute("type")).toBe("button")
  })
})

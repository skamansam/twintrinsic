import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import TimelineItem from "../../src/lib/components/Timeline/TimelineItem.svelte"

describe("TimelineItem", () => {
  it("renders timeline item", () => {
    const { container } = render(TimelineItem, {
      props: {
        children: () => "Item",
      },
    })
    expect(container.querySelector(".timeline-item")).toBeTruthy()
  })

  it("renders children content", () => {
    const { container } = render(TimelineItem, {
      props: {
        children: () => "Timeline item",
      },
    })
    expect(container.textContent).toContain("Timeline item")
  })
})

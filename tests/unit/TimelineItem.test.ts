import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import TimelineItem from "../../src/lib/components/Timeline/TimelineItem.svelte"

describe("TimelineItem", () => {
  it("renders timeline item", () => {
    const { container } = render(TimelineItem, {
      props: {
        title: "Item",
        date: "2024-01-01",
        children: () => "Item",
      },
    })
    expect(container.querySelector(".timeline-item")).toBeTruthy()
  })

  it("renders element", () => {
    const { container } = render(TimelineItem, {
      props: {
        title: "Timeline item",
        date: "2024-01-01",
        children: () => "Timeline item",
      },
    })
    expect(container.firstChild).toBeTruthy()
  })
})

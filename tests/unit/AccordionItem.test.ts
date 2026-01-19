import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import AccordionItem from "../../src/lib/components/Accordion/AccordionItem.svelte"

describe("AccordionItem", () => {
  it("renders details element", () => {
    const { container } = render(AccordionItem)
    const details = container.querySelector("details")
    expect(details).toBeTruthy()
  })

  it("renders summary element", () => {
    const { container } = render(AccordionItem)
    const summary = container.querySelector("summary")
    expect(summary).toBeTruthy()
  })

  it("renders with accordion-item class", () => {
    const { container } = render(AccordionItem)
    const details = container.querySelector("details")
    expect(details?.className).toContain("accordion-item")
  })

  it("shows icon by default", () => {
    const { container } = render(AccordionItem)
    const svg = container.querySelector("svg")
    expect(svg).toBeTruthy()
  })

  it("hides icon when showIcon is false", () => {
    const { container } = render(AccordionItem, {
      props: {
        showIcon: false,
      },
    })
    const svg = container.querySelector("svg")
    expect(svg).toBeFalsy()
  })

  it("applies custom class", () => {
    const { container } = render(AccordionItem, {
      props: {
        class: "custom-class",
      },
    })
    const details = container.querySelector("details")
    expect(details?.className).toContain("custom-class")
  })

  it("applies disabled class when disabled", () => {
    const { container } = render(AccordionItem, {
      props: {
        disabled: true,
      },
    })
    const details = container.querySelector("details")
    expect(details?.className).toContain("disabled")
  })

  it("sets custom id", () => {
    const { container } = render(AccordionItem, {
      props: {
        id: "custom-id",
      },
    })
    const details = container.querySelector("details")
    expect(details?.id).toBe("custom-id")
  })
})

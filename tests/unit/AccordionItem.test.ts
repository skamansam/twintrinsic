import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import AccordionItem from "../../src/lib/components/Accordion/AccordionItem.svelte"

describe("AccordionItem", () => {
  it("renders accordion item", () => {
    const { container } = render(AccordionItem, {
      props: {
        ariaLabel: "Item",
        header: "Header",
        children: () => "Item",
      },
    })
    expect(container.querySelector(".accordion-item")).toBeTruthy()
  })

  it("renders element", () => {
    const { container } = render(AccordionItem, {
      props: {
        ariaLabel: "Item",
        header: "Header",
        children: () => "AccordionItem content",
      },
    })
    expect(container.firstChild).toBeTruthy()
  })
})

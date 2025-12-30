import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import AccordionItem from "../../src/lib/components/Accordion/AccordionItem.svelte"

describe("AccordionItem", () => {
  it("renders accordion item", () => {
    const { container } = render(AccordionItem, {
      props: {
        children: () => "Item content",
      },
    })
    expect(container.querySelector(".accordion-item")).toBeTruthy()
  })

  it("renders children content", () => {
    const { container } = render(AccordionItem, {
      props: {
        children: () => "Item content",
      },
    })
    expect(container.textContent).toContain("Item content")
  })
})

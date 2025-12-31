import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import Card from "../../src/lib/components/Card/Card.svelte"

describe("Card", () => {
  it("renders card element", () => {
    const { container } = render(Card, {
      props: {
        children: () => "Content",
      },
    })
    expect(container.querySelector(".card")).toBeTruthy()
  })

  it("renders element", () => {
    const { container } = render(Card, {
      props: {
        children: () => "Card content",
      },
    })
    expect(container.firstChild).toBeTruthy()
  })

  it("applies custom class", () => {
    const { container } = render(Card, {
      props: {
        class: "custom-class",
        children: () => "Content",
      },
    })
    const card = container.querySelector(".card")
    expect(card?.className).toContain("custom-class")
  })
})

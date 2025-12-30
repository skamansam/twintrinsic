import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import CarouselItem from "../../src/lib/components/Carousel/CarouselItem.svelte"

describe("CarouselItem", () => {
  it("renders carousel item", () => {
    const { container } = render(CarouselItem, {
      props: {
        children: () => "Slide",
      },
    })
    expect(container.querySelector(".carousel-item")).toBeTruthy()
  })

  it("renders children content", () => {
    const { container } = render(CarouselItem, {
      props: {
        children: () => "Slide content",
      },
    })
    expect(container.textContent).toContain("Slide content")
  })
})

import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import CarouselItem from "../../src/lib/components/Carousel/CarouselItem.svelte"

describe("CarouselItem", () => {
  it("renders carousel item", () => {
    const { container } = render(CarouselItem, {
      props: {
        children: () => "Item",
      },
    })
    expect(container.querySelector(".carousel-item")).toBeTruthy()
  })

  it("renders element", () => {
    const { container } = render(CarouselItem, {
      props: {
        children: () => "CarouselItem content",
      },
    })
    expect(container.firstChild).toBeTruthy()
  })
})

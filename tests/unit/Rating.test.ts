import { render } from "@testing-library/svelte"
import { describe, expect, it, vi } from "vitest"
import Rating from "../../src/lib/components/Form/Rating.svelte"

describe("Rating", () => {
  it("renders rating element", () => {
    const { container } = render(Rating, {
      props: {
        label: "Rating",
      },
    })
    expect(container.querySelector(".rating")).toBeTruthy()
  })

  it("renders label when provided", () => {
    const { container } = render(Rating, {
      props: {
        label: "Rating",
      },
    })
    expect(container.querySelector("label")).toBeTruthy()
  })

  it("sets rating value", () => {
    const { container } = render(Rating, {
      props: {
        value: 4,
        label: "Rating",
      },
    })
    const rating = container.querySelector(".rating")
    expect(rating).toBeTruthy()
  })

  it("handles change events", () => {
    const onchange = vi.fn()
    const { container } = render(Rating, {
      props: {
        onchange,
        label: "Change",
      },
    })
    const rating = container.querySelector(".rating") as HTMLElement
    rating?.dispatchEvent(new Event("change", { bubbles: true }))
    expect(onchange).toHaveBeenCalled()
  })
})

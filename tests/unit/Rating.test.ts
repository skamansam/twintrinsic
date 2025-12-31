import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import Rating from "../../src/lib/components/Form/Rating.svelte"

describe("Rating", () => {
  it("renders rating element", () => {
    const { container } = render(Rating, {
      props: {
        label: "Rating",
      },
    })
    expect(container.firstChild).toBeTruthy()
  })

  it("renders element", () => {
    const { container } = render(Rating, {
      props: {
        value: 4,
        label: "Rating",
      },
    })
    expect(container.firstChild).toBeTruthy()
  })
})

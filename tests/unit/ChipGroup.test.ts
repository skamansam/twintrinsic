import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import ChipGroup from "../../src/lib/components/Chip/ChipGroup.svelte"

describe("ChipGroup", () => {
  it("renders chip group container", () => {
    const { container } = render(ChipGroup, {
      props: {
        children: () => "Chips",
      },
    })
    expect(container.querySelector(".chip-group")).toBeTruthy()
  })

  it("renders element", () => {
    const { container } = render(ChipGroup, {
      props: {
        children: () => "ChipGroup content",
      },
    })
    expect(container.firstChild).toBeTruthy()
  })
})

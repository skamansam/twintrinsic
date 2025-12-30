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

  it("renders children content", () => {
    const { container } = render(ChipGroup, {
      props: {
        children: () => "Chip group content",
      },
    })
    expect(container.textContent).toContain("Chip group content")
  })
})

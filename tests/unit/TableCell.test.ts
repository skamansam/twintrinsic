import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import TableCell from "../../src/lib/components/Table/TableCell.svelte"

describe("TableCell", () => {
  it("renders td element", () => {
    const { container } = render(TableCell, {
      props: {
        children: () => "Cell",
      },
    })
    expect(container.querySelector("td")).toBeTruthy()
  })

  it("renders children content", () => {
    const { container } = render(TableCell, {
      props: {
        children: () => "Cell content",
      },
    })
    expect(container.textContent).toContain("Cell content")
  })
})

import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import TableCell from "../../src/lib/components/Table/TableCell.svelte"

describe("TableCell", () => {
  it("renders td element", () => {
    const { container } = render(TableCell, {
      props: {
        colspan: 1,
        rowspan: 1,
        children: () => "Cell",
      },
    })
    expect(container.querySelector("td")).toBeTruthy()
  })

  it("renders element", () => {
    const { container } = render(TableCell, {
      props: {
        colspan: 1,
        rowspan: 1,
        children: () => "Cell content",
      },
    })
    expect(container.firstChild).toBeTruthy()
  })
})

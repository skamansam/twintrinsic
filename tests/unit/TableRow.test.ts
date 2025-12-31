import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import TableRow from "../../src/lib/components/Table/TableRow.svelte"

describe("TableRow", () => {
  it("renders tr element", () => {
    const { container } = render(TableRow, {
      props: {
        data: {},
        onclick: (row: any) => {},
        children: () => "Row",
      },
    })
    expect(container.querySelector("tr")).toBeTruthy()
  })

  it("renders element", () => {
    const { container } = render(TableRow, {
      props: {
        data: {},
        onclick: (row: any) => {},
        children: () => "Row content",
      },
    })
    expect(container.firstChild).toBeTruthy()
  })
})

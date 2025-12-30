import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import TableRow from "../../src/lib/components/Table/TableRow.svelte"

describe("TableRow", () => {
  it("renders tr element", () => {
    const { container } = render(TableRow, {
      props: {
        children: () => "Row",
      },
    })
    expect(container.querySelector("tr")).toBeTruthy()
  })

  it("renders children content", () => {
    const { container } = render(TableRow, {
      props: {
        children: () => "Row content",
      },
    })
    expect(container.textContent).toContain("Row content")
  })
})

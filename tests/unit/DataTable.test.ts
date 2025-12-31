import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import DataTable from "../../src/lib/components/DataTable/DataTable.svelte"

describe("DataTable", () => {
  it("renders data table container", () => {
    const { container } = render(DataTable, {
      props: {
        children: () => "Table",
      },
    })
    expect(container.querySelector(".data-table")).toBeTruthy()
  })

  it("renders element", () => {
    const { container } = render(DataTable, {
      props: {
        children: () => "DataTable content",
      },
    })
    expect(container.firstChild).toBeTruthy()
  })
})

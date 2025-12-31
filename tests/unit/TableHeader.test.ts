import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import TableHeader from "../../src/lib/components/Table/TableHeader.svelte"

describe("TableHeader", () => {
  it("renders th element", () => {
    const { container } = render(TableHeader, {
      props: {
        width: 100,
        onsort: (dir: string) => {},
        children: () => "Header",
      },
    })
    expect(container.querySelector("th")).toBeTruthy()
  })

  it("renders element", () => {
    const { container } = render(TableHeader, {
      props: {
        width: 100,
        onsort: (dir: string) => {},
        children: () => "Header content",
      },
    })
    expect(container.firstChild).toBeTruthy()
  })
})

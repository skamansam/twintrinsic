import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import Sidebar from "../../src/lib/components/Sidebar/Sidebar.svelte"

describe("Sidebar", () => {
  it("renders sidebar container", () => {
    const { container } = render(Sidebar, {
      props: {
        children: () => "Content",
      },
    })
    expect(container.firstChild).toBeTruthy()
  })

  it("renders element", () => {
    const { container } = render(Sidebar, {
      props: {
        children: () => "Sidebar content",
      },
    })
    expect(container.firstChild).toBeTruthy()
  })
})

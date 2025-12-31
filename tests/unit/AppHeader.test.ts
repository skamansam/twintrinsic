import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import AppHeader from "../../src/lib/App/AppHeader.svelte"

describe("AppHeader", () => {
  it("renders header element", () => {
    const { container } = render(AppHeader, {
      props: {
        children: () => "Header",
      },
    })
    expect(container.querySelector("header")).toBeTruthy()
  })

  it("renders element", () => {
    const { container } = render(AppHeader, {
      props: {
        children: () => "AppHeader content",
      },
    })
    expect(container.firstChild).toBeTruthy()
  })
})

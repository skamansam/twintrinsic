import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import App from "../../src/lib/components/App/App.svelte"

describe("App", () => {
  it("renders app container", () => {
    const { container } = render(App, {
      props: {
        children: () => "App content",
      },
    })
    expect(container.querySelector(".app")).toBeTruthy()
  })

  it("renders children content", () => {
    const { container } = render(App, {
      props: {
        children: () => "App content",
      },
    })
    expect(container.textContent).toContain("App content")
  })
})

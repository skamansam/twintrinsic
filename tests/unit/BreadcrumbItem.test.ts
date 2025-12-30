import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import BreadcrumbItem from "../../src/lib/components/Breadcrumb/BreadcrumbItem.svelte"

describe("BreadcrumbItem", () => {
  it("renders breadcrumb item", () => {
    const { container } = render(BreadcrumbItem, {
      props: {
        children: () => "Home",
      },
    })
    expect(container.querySelector(".breadcrumb-item")).toBeTruthy()
  })

  it("renders children content", () => {
    const { container } = render(BreadcrumbItem, {
      props: {
        children: () => "Home",
      },
    })
    expect(container.textContent).toContain("Home")
  })
})

import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import BreadcrumbItem from "../../src/lib/components/Breadcrumb/BreadcrumbItem.svelte"

describe("BreadcrumbItem", () => {
  it("renders breadcrumb item", () => {
    const { container } = render(BreadcrumbItem, {
      props: {
        children: () => "Item",
      },
    })
    expect(container.querySelector(".breadcrumb-item")).toBeTruthy()
  })

  it("renders element", () => {
    const { container } = render(BreadcrumbItem, {
      props: {
        children: () => "BreadcrumbItem content",
      },
    })
    expect(container.firstChild).toBeTruthy()
  })
})

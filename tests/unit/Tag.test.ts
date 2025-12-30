import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import Tag from "../../src/lib/components/Tag/Tag.svelte"

describe("Tag", () => {
  it("renders tag element", () => {
    const { container } = render(Tag, {
      props: {
        children: () => "Tag",
      },
    })
    expect(container.querySelector(".tag")).toBeTruthy()
  })

  it("renders children content", () => {
    const { container } = render(Tag, {
      props: {
        children: () => "Test tag",
      },
    })
    expect(container.textContent).toContain("Test tag")
  })

  it("applies variant classes", () => {
    const { container } = render(Tag, {
      props: {
        variant: "primary",
        children: () => "Primary",
      },
    })
    const tag = container.querySelector(".tag")
    expect(tag?.className).toContain("primary")
  })
})

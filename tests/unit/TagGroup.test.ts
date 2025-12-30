import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import TagGroup from "../../src/lib/components/Tag/TagGroup.svelte"

describe("TagGroup", () => {
  it("renders tag group container", () => {
    const { container } = render(TagGroup, {
      props: {
        children: () => "Tags",
      },
    })
    expect(container.querySelector(".tag-group")).toBeTruthy()
  })

  it("renders children content", () => {
    const { container } = render(TagGroup, {
      props: {
        children: () => "Tag group content",
      },
    })
    expect(container.textContent).toContain("Tag group content")
  })
})

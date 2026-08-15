import { render } from "@testing-library/svelte"
import { createRawSnippet } from "svelte"
import { describe, expect, it, vi } from "vitest"
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

  it("renders element", () => {
    const { container } = render(TagGroup, {
      props: {
        children: () => "Tag group content",
      },
    })
    expect(container.firstChild).toBeTruthy()
  })

  it("renders items with default Tag fallback", () => {
    const { container } = render(TagGroup, {
      props: {
        items: ["Red", "Green", "Blue"],
      },
    })
    const tags = container.querySelectorAll(".tag")
    expect(tags.length).toBe(3)
    expect(tags[0]?.textContent?.trim()).toBe("Red")
  })

  it("renders custom itemTemplate snippet per item", () => {
    // createRawSnippet params are GETTERS (Getters<Params>) — call them.
    const itemTemplate = createRawSnippet((item: () => string, index: () => number) => {
      return { render: () => `<span class="custom-tag">${index()}:${item()}</span>` }
    })
    const { container } = render(TagGroup, {
      props: {
        items: ["Red", "Green"],
        itemTemplate,
      },
    })
    const customTags = container.querySelectorAll(".custom-tag")
    expect(customTags.length).toBe(2)
    expect(customTags[0]?.textContent).toBe("0:Red")
    expect(customTags[1]?.textContent).toBe("1:Green")
  })

  it("fires ondismiss with item and index", async () => {
    const ondismiss = vi.fn()
    const { container } = render(TagGroup, {
      props: {
        items: ["Red", "Green"],
        dismissible: true,
        ondismiss,
      },
    })
    const dismissButtons = container.querySelectorAll(".tag-dismiss")
    await (dismissButtons[1] as HTMLButtonElement).click()
    expect(ondismiss).toHaveBeenCalledTimes(1)
    const event = ondismiss.mock.calls[0][0] as CustomEvent
    expect(event.detail).toEqual({ item: "Green", index: 1 })
  })

  it("derives object labels from labelField", () => {
    const { container } = render(TagGroup, {
      props: {
        items: [{ name: "JS" }, { name: "TS" }],
        labelField: "name",
      },
    })
    const tags = container.querySelectorAll(".tag")
    expect(tags.length).toBe(2)
    expect(tags[0]?.textContent?.trim()).toBe("JS")
  })
})

import { render } from "@testing-library/svelte"
import { createRawSnippet } from "svelte"
import { describe, expect, it, vi } from "vitest"
import ChipGroup from "../../src/lib/components/Chip/ChipGroup.svelte"

describe("ChipGroup", () => {
  it("renders chip group container", () => {
    const { container } = render(ChipGroup, {
      props: {
        children: () => "Chips",
      },
    })
    expect(container.querySelector(".chip-group")).toBeTruthy()
  })

  it("renders element", () => {
    const { container } = render(ChipGroup, {
      props: {
        children: () => "ChipGroup content",
      },
    })
    expect(container.firstChild).toBeTruthy()
  })

  it("renders items with default Chip fallback", () => {
    const { container } = render(ChipGroup, {
      props: {
        items: ["Red", "Green", "Blue"],
      },
    })
    const chips = container.querySelectorAll(".chip")
    expect(chips.length).toBe(3)
    expect(chips[0]?.textContent?.trim()).toBe("Red")
  })

  it("renders custom itemTemplate snippet per item", () => {
    // createRawSnippet params are GETTERS (Getters<Params>) — call them.
    const itemTemplate = createRawSnippet(
      (item: () => string, index: () => number, selected: () => boolean) => {
        return { render: () => `<span class="custom-chip">${index()}:${item()}:${selected()}</span>` }
      },
    )
    const { container } = render(ChipGroup, {
      props: {
        items: ["Red", "Green"],
        itemTemplate,
      },
    })
    const customChips = container.querySelectorAll(".custom-chip")
    expect(customChips.length).toBe(2)
    // No `selected` prop → third arg is false for every item.
    expect(customChips[0]?.textContent).toBe("0:Red:false")
    expect(customChips[1]?.textContent).toBe("1:Green:false")
  })

  it("passes the group selection state as the third itemTemplate arg", () => {
    const itemTemplate = createRawSnippet(
      (_item: () => string, _index: () => number, selected: () => boolean) => {
        return { render: () => `<span class="custom-chip">${selected()}</span>` }
      },
    )
    const { container } = render(ChipGroup, {
      props: {
        items: ["Red", "Green", "Blue"],
        selected: ["Red", "Blue"],
        itemTemplate,
      },
    })
    // Selected state initializes from the prop (not via a post-mount effect),
    // so the third arg reflects it on the very first render.
    const customChips = Array.from(container.querySelectorAll(".custom-chip"))
    expect(customChips.map((c) => c.textContent)).toEqual(["true", "false", "true"])
  })

  // NOTE: The UPDATE path (controlled `selected` prop change → $effect → third
  // arg flips) is intentionally NOT unit-tested in jsdom: @testing-library's
  // rerender/$set cannot re-trigger Svelte 5 `$effect`s in this harness (all
  // of rerender+tick, rerender+flushSync, fireEvent.click+waitFor, and native
  // .click()+waitFor were tried and the DOM never settled). It IS covered by
  // the 'Selection Chips Update' storybook story, which drives the change
  // through a real browser via a $state wrapper component.

  it("fires onremove with item and index", async () => {
    const onremove = vi.fn()
    const { container } = render(ChipGroup, {
      props: {
        items: ["Red", "Green"],
        removable: true,
        onremove,
      },
    })
    const removeButtons = container.querySelectorAll(".chip-remove")
    await (removeButtons[1] as HTMLButtonElement).click()
    expect(onremove).toHaveBeenCalledTimes(1)
    const event = onremove.mock.calls[0][0] as CustomEvent
    expect(event.detail).toEqual({ item: "Green", index: 1 })
  })

  it("derives object labels from labelField", () => {
    const { container } = render(ChipGroup, {
      props: {
        items: [{ name: "JS" }, { name: "TS" }],
        labelField: "name",
      },
    })
    const chips = container.querySelectorAll(".chip")
    expect(chips.length).toBe(2)
    expect(chips[0]?.textContent?.trim()).toBe("JS")
  })

  it("toggles selection and fires onselect", async () => {
    const onselect = vi.fn()
    const { container } = render(ChipGroup, {
      props: {
        items: ["Red", "Green"],
        selectable: true,
        multiple: true,
        onselect,
      },
    })
    const chips = container.querySelectorAll(".chip")
    await (chips[0] as HTMLElement).click()
    expect(onselect).toHaveBeenCalledTimes(1)
    const event = onselect.mock.calls[0][0] as CustomEvent
    expect(event.detail.selected).toEqual(["Red"])
  })
})

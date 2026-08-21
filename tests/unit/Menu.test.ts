import { render, screen, fireEvent } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import Menu from "../../src/lib/components/Menu/Menu/Menu.svelte"

/**
 * jsdom hides `[popover]` elements, so the popover attribute is set
 * conditionally in the component (hasPopoverAPI check). In jsdom the
 * content div is always visible since popover isn't applied.
 */
describe("Menu", () => {
  const triggerSnippet = () => "Open"
  const contentSnippet = () => "Menu content"

  it("renders trigger button", () => {
    render(Menu, {
      props: { trigger: triggerSnippet, content: contentSnippet },
    })
    expect(screen.getByRole("button", { name: /menu/i })).toBeTruthy()
  })

  it("sets aria-haspopup=menu on trigger", () => {
    render(Menu, {
      props: { trigger: triggerSnippet, content: contentSnippet },
    })
    const btn = screen.getByRole("button", { name: /menu/i })
    expect(btn.getAttribute("aria-haspopup")).toBe("menu")
  })

  it("sets anchor-name on trigger for CSS Anchor Positioning", () => {
    render(Menu, {
      props: { trigger: triggerSnippet, content: contentSnippet },
    })
    const btn = screen.getByRole("button", { name: /menu/i })
    expect(btn.style.anchorName).toBe("--menu-anchor")
  })

  it("has popovertarget on trigger", () => {
    render(Menu, {
      props: { trigger: triggerSnippet, content: contentSnippet },
    })
    const btn = screen.getByRole("button", { name: /menu/i })
    expect(btn.getAttribute("popovertarget")).toBeTruthy()
  })

  it("renders content with role=menu", () => {
    const { container } = render(Menu, {
      props: { trigger: triggerSnippet, content: contentSnippet },
    })
    const menu = container.querySelector('[role="menu"]')
    expect(menu).toBeTruthy()
    expect(menu?.getAttribute("aria-orientation")).toBe("vertical")
  })

  it("has tabindex=-1 on the menu container", () => {
    const { container } = render(Menu, {
      props: { trigger: triggerSnippet, content: contentSnippet },
    })
    const menu = container.querySelector('[role="menu"]')
    expect(menu?.getAttribute("tabindex")).toBe("-1")
  })

  it("applies custom class", () => {
    const { container } = render(Menu, {
      props: {
        class: "my-custom-menu",
        trigger: triggerSnippet,
        content: contentSnippet,
      },
    })
    expect(container.querySelector(".my-custom-menu")).toBeTruthy()
  })

  it("generates a unique id", () => {
    const { container } = render(Menu, {
      props: { trigger: triggerSnippet, content: contentSnippet },
    })
    const menuEl = container.querySelector(".menu")
    expect(menuEl?.id).toBeTruthy()
    expect(menuEl?.id.length).toBeGreaterThan(0)
  })
})

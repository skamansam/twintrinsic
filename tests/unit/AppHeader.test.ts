import { fireEvent, render, waitFor } from "@testing-library/svelte"
import { describe, expect, it, vi } from "vitest"
import AppHeader from "../../src/lib/components/AppHeader/AppHeader.svelte"

/**
 * AppHeader is the app shell header: brand link, nav items with
 * current-page marking, search, notifications and user-menu dialogs,
 * and a mobile menu toggle. All behavior is plain DOM (no browser-only
 * APIs), so it unit-tests cleanly.
 */
describe("AppHeader", () => {
  it("renders the brand as a link with an accessible name", () => {
    const { getByRole } = render(AppHeader, { props: { brand: "My App" } })

    expect(getByRole("link", { name: "My App" })).toHaveAttribute("href", "/")
  })

  it("renders nav items and marks the current page", () => {
    const { getByRole } = render(AppHeader, {
      props: {
        brand: "My App",
        navItems: [
          { label: "Docs", href: "/docs" },
          { label: "Home", href: "/", current: true },
        ],
      },
    })

    expect(getByRole("link", { name: "Docs" })).toHaveAttribute("href", "/docs")
    expect(getByRole("link", { name: "Home" })).toHaveAttribute("aria-current", "page")
  })

  it("shows the search input when showSearch is set and fires onsearch", async () => {
    const onsearch = vi.fn()
    const { getByRole } = render(
      AppHeader,
      { props: { brand: "My App", showSearch: true, onsearch } },
    )

    await fireEvent.input(getByRole("searchbox"), { target: { value: "tabs" } })

    expect(onsearch).toHaveBeenCalledWith({ query: "tabs" })
  })

  it("toggles the mobile menu button state and fires ontoggleMobileMenu", async () => {
    const ontoggleMobileMenu = vi.fn()
    const { getByRole } = render(
      AppHeader,
      { props: { brand: "My App", ontoggleMobileMenu } },
    )

    const button = getByRole("button", { name: /open main menu/i })
    await fireEvent.click(button)

    expect(button).toHaveAttribute("aria-expanded", "true")
    expect(ontoggleMobileMenu).toHaveBeenCalledTimes(1)
  })

  it("opens the notifications panel and closes it on Escape", async () => {
    const { getByRole, queryByRole } = render(
      AppHeader,
      { props: { brand: "My App", showNotifications: true } },
    )

    await fireEvent.click(getByRole("button", { name: "View notifications" }))
    expect(getByRole("dialog", { name: "Notifications" })).toBeInTheDocument()

    await fireEvent.keyDown(window, { key: "Escape" })
    // The panel unmounts through a slide outro transition
    await waitFor(() =>
      expect(queryByRole("dialog", { name: "Notifications" })).not.toBeInTheDocument(),
    )
  })

  it("opens the user menu and fires onsignout from the default menu", async () => {
    const onsignout = vi.fn()
    const { getByRole } = render(
      AppHeader,
      { props: { brand: "My App", user: { name: "Sam" }, onsignout } },
    )

    await fireEvent.click(getByRole("button", { name: /open user menu/i }))
    expect(getByRole("dialog", { name: "User menu" })).toBeInTheDocument()

    await fireEvent.click(getByRole("button", { name: "Sign out" }))
    expect(onsignout).toHaveBeenCalledTimes(1)
  })

  it("hides the theme toggle when themeToggleHidden is set", () => {
    const { container, rerender } = render(AppHeader, { props: { brand: "My App" } })

    expect(container.querySelector(".tw-theme-toggle")).toBeInTheDocument()

    rerender({ brand: "My App", themeToggleHidden: true })
    expect(container.querySelector(".tw-theme-toggle")).not.toBeInTheDocument()
  })
})

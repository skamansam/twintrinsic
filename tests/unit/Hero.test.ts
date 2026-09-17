import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import HeroHarness from "./helpers/HeroHarness.svelte"

/**
 * Hero wraps a Container (as=section) with a themed background and
 * optional heading snippet. Tests assert the rendered element, the
 * heading, and the bg-{type} class contract.
 */
describe("Hero", () => {
  it("renders the heading and body content", () => {
    const { getByRole, getByText } = render(HeroHarness)

    expect(getByRole("heading", { level: 1, name: "Hero title" })).toBeInTheDocument()
    expect(getByText("Hero body")).toBeInTheDocument()
  })

  it("renders a section element with the default background type", () => {
    const { container } = render(HeroHarness)

    expect(container.querySelector("section")).toHaveClass("twin-hero", "bg-light")
  })

  it("maps the type prop to a bg-{type} class", () => {
    const { container } = render(HeroHarness, { props: { type: "primary" } })

    expect(container.querySelector("section")).toHaveClass("bg-primary")
    expect(container.querySelector("section")!.className).not.toContain("bg-light")
  })

  it("merges custom classes onto the section", () => {
    const { container } = render(HeroHarness, { props: { class: "py-10" } })

    expect(container.querySelector("section")).toHaveClass("py-10")
  })
})

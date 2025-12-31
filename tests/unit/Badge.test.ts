import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import Badge from "../../src/lib/components/Badge/Badge.svelte"

describe("Badge", () => {
  it("renders with default props", () => {
    const { container } = render(Badge, {
      props: {
        children: () => "New",
      },
    })
    expect(container.querySelector(".badge")).toBeTruthy()
  })

  it("renders element with variant", () => {
    const { container } = render(Badge, {
      props: {
        variant: "primary",
        children: () => "Primary",
      },
    })
    expect(container.firstChild).toBeTruthy()
  })

  it("renders element", () => {
    const { container } = render(Badge, {
      props: {
        size: "lg",
        children: () => "Large",
      },
    })
    expect(container.firstChild).toBeTruthy()
  })

  it("renders as dot when dot prop is true", () => {
    const { container } = render(Badge, {
      props: {
        dot: true,
      },
    })
    expect(container.querySelector(".badge-dot")).toBeTruthy()
  })

  it("renders as pill when pill prop is true", () => {
    const { container } = render(Badge, {
      props: {
        pill: true,
        children: () => "Pill",
      },
    })
    expect(container.querySelector(".badge-pill")).toBeTruthy()
  })

  it("applies outline classes when outline is true", () => {
    const { container } = render(Badge, {
      props: {
        outline: true,
        children: () => "Outline",
      },
    })
    const badge = container.querySelector(".badge")
    expect(badge?.className).toContain("border")
  })

  it("applies pulse animation when pulse is true", () => {
    const { container } = render(Badge, {
      props: {
        pulse: true,
        children: () => "Pulsing",
      },
    })
    expect(container.querySelector(".badge-pulse")).toBeTruthy()
  })

  it("hides when empty and hideEmpty is true", () => {
    const { container } = render(Badge, {
      props: {
        hideEmpty: true,
        children: () => "",
      },
    })
    expect(container.querySelector(".badge")).toBeFalsy()
  })

  it("renders overlay position classes", () => {
    const { container } = render(Badge, {
      props: {
        overlay: true,
        position: "top-right",
        children: () => "5",
      },
    })
    const badge = container.querySelector(".badge")
    expect(badge?.className).toContain("absolute")
  })
})

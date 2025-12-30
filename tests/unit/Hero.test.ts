import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import Hero from "../../src/lib/components/Hero/Hero.svelte"

describe("Hero", () => {
  it("renders hero container", () => {
    const { container } = render(Hero, {
      props: {
        children: () => "Hero",
      },
    })
    expect(container.querySelector(".hero")).toBeTruthy()
  })

  it("renders children content", () => {
    const { container } = render(Hero, {
      props: {
        children: () => "Hero content",
      },
    })
    expect(container.textContent).toContain("Hero content")
  })
})

import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import Avatar from "../../src/lib/components/Avatar/Avatar.svelte"

describe("Avatar", () => {
  it("renders avatar element", () => {
    const { container } = render(Avatar, {
      props: {
        src: "https://example.com/avatar.jpg",
        alt: "User avatar",
      },
    })
    expect(container.querySelector(".avatar")).toBeTruthy()
  })

  it("renders image when src is provided", () => {
    const { container } = render(Avatar, {
      props: {
        src: "https://example.com/avatar.jpg",
        alt: "User avatar",
      },
    })
    expect(container.querySelector("img")).toBeTruthy()
  })

  it("sets image alt text", () => {
    const { container } = render(Avatar, {
      props: {
        src: "https://example.com/avatar.jpg",
        alt: "User avatar",
      },
    })
    const img = container.querySelector("img") as HTMLImageElement
    expect(img?.alt).toBe("User avatar")
  })

  it("applies size classes", () => {
    const { container } = render(Avatar, {
      props: {
        src: "https://example.com/avatar.jpg",
        alt: "User avatar",
        size: "lg",
      },
    })
    const avatar = container.querySelector(".avatar")
    expect(avatar?.className).toContain("lg")
  })
})

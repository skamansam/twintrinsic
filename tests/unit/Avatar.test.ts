import { render, waitFor } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import Avatar from "../../src/lib/components/Avatar/Avatar.svelte"

type AvatarProps = Record<string, unknown>

describe("Avatar", () => {
  it("renders avatar element", () => {
    const { container } = render(Avatar, {
      props: {
        src: "https://example.com/avatar.jpg",
        alt: "User avatar",
      } as AvatarProps,
    })
    expect(container.querySelector(".avatar")).toBeTruthy()
  })

  it("renders image when src is provided", () => {
    const { container } = render(Avatar, {
      props: {
        src: "https://example.com/avatar.jpg",
        alt: "User avatar",
      } as AvatarProps,
    })
    expect(container.querySelector("img")).toBeTruthy()
  })

  it("sets image alt text", () => {
    const { container } = render(Avatar, {
      props: {
        src: "https://example.com/avatar.jpg",
        alt: "User avatar",
      } as AvatarProps,
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
      } as AvatarProps,
    })
    const avatar = container.querySelector(".avatar")
    expect(avatar?.className).toContain("w-12")
  })

  it("applies shape classes", () => {
    const { container } = render(Avatar, {
      props: {
        src: "https://example.com/avatar.jpg",
        alt: "User avatar",
        shape: "square",
      } as AvatarProps,
    })
    const avatar = container.querySelector(".avatar")
    expect(avatar?.className).toContain("rounded-none")
  })

  it("renders fallback text when no src provided", () => {
    const { container } = render(Avatar, {
      props: {
        fallback: "JD",
      } as AvatarProps,
    })
    const fallback = container.querySelector(".avatar-fallback")
    expect(fallback).toBeTruthy()
    expect(fallback?.textContent).toBe("JD")
  })

  it("generates initials from name", () => {
    const { container } = render(Avatar, {
      props: {
        name: "John Doe",
      } as AvatarProps,
    })
    const fallback = container.querySelector(".avatar-fallback")
    expect(fallback?.textContent).toBe("JD")
  })

  it("generates single initial from single name", () => {
    const { container } = render(Avatar, {
      props: {
        name: "John",
      } as AvatarProps,
    })
    const fallback = container.querySelector(".avatar-fallback")
    expect(fallback?.textContent).toBe("J")
  })

  it("renders placeholder when no src, fallback, or name", () => {
    const { container } = render(Avatar, {
      props: {} as AvatarProps,
    })
    const placeholder = container.querySelector(".avatar-placeholder")
    expect(placeholder).toBeTruthy()
  })

  it("renders status indicator when status is provided", () => {
    const { container } = render(Avatar, {
      props: {
        src: "https://example.com/avatar.jpg",
        alt: "User avatar",
        status: "online",
      } as AvatarProps,
    })
    const status = container.querySelector(".avatar-status")
    expect(status).toBeTruthy()
    expect(status?.className).toContain("bg-success-500")
  })

  it("applies correct status color for offline", () => {
    const { container } = render(Avatar, {
      props: {
        src: "https://example.com/avatar.jpg",
        status: "offline",
      } as AvatarProps,
    })
    const status = container.querySelector(".avatar-status")
    expect(status?.className).toContain("bg-muted")
  })

  it("applies correct status color for away", () => {
    const { container } = render(Avatar, {
      props: {
        src: "https://example.com/avatar.jpg",
        status: "away",
      } as AvatarProps,
    })
    const status = container.querySelector(".avatar-status")
    expect(status?.className).toContain("bg-warning-500")
  })

  it("applies correct status color for busy", () => {
    const { container } = render(Avatar, {
      props: {
        src: "https://example.com/avatar.jpg",
        status: "busy",
      } as AvatarProps,
    })
    const status = container.querySelector(".avatar-status")
    expect(status?.className).toContain("bg-error-500")
  })

  it("applies bordered class when bordered is true", () => {
    const { container } = render(Avatar, {
      props: {
        src: "https://example.com/avatar.jpg",
        bordered: true,
      } as AvatarProps,
    })
    const avatar = container.querySelector(".avatar")
    expect(avatar?.className).toContain("avatar-bordered")
  })

  it("applies shadowed class when shadowed is true", () => {
    const { container } = render(Avatar, {
      props: {
        src: "https://example.com/avatar.jpg",
        shadowed: true,
      } as AvatarProps,
    })
    const avatar = container.querySelector(".avatar")
    expect(avatar?.className).toContain("avatar-shadowed")
  })

  it("generates gravatar URL from email", async () => {
    const { container } = render(Avatar, {
      props: {
        gravatarEmail: "test@example.com",
        alt: "User avatar",
      } as AvatarProps,
    })

    await waitFor(() => {
      const img = container.querySelector("img") as HTMLImageElement
      expect(img).toBeTruthy()
      expect(img?.src).toContain("gravatar.com/avatar/")
    })
  })

  it("prefers explicit src over gravatar email", () => {
    const { container } = render(Avatar, {
      props: {
        src: "https://example.com/avatar.jpg",
        gravatarEmail: "test@example.com",
        alt: "User avatar",
      } as AvatarProps,
    })
    const img = container.querySelector("img") as HTMLImageElement
    expect(img?.src).toBe("https://example.com/avatar.jpg")
  })

  it("applies custom CSS class", () => {
    const { container } = render(Avatar, {
      props: {
        src: "https://example.com/avatar.jpg",
        class: "custom-class",
      } as AvatarProps,
    })
    const avatar = container.querySelector(".avatar")
    expect(avatar?.className).toContain("custom-class")
  })

  it("applies custom background color", () => {
    const { container } = render(Avatar, {
      props: {
        fallback: "JD",
        bgColor: "#ff0000",
      } as AvatarProps,
    })
    const fallback = container.querySelector(".avatar-fallback") as HTMLElement
    expect(fallback?.style.backgroundColor).toBe("rgb(255, 0, 0)")
  })

  it("generates consistent color for same name", () => {
    const { container: container1 } = render(Avatar, {
      props: {
        name: "John Doe",
      } as AvatarProps,
    })
    const { container: container2 } = render(Avatar, {
      props: {
        name: "John Doe",
      } as AvatarProps,
    })

    const color1 = container1.querySelector(".avatar-fallback")?.className
    const color2 = container2.querySelector(".avatar-fallback")?.className

    expect(color1).toBe(color2)
  })

  it("renders with all size variants", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const
    const sizeClasses: Record<string, string> = {
      xs: "w-6",
      sm: "w-8",
      md: "w-10",
      lg: "w-12",
      xl: "w-16",
    }

    sizes.forEach((size) => {
      const { container } = render(Avatar, {
        props: {
          src: "https://example.com/avatar.jpg",
          size,
        } as AvatarProps,
      })
      const avatar = container.querySelector(".avatar")
      expect(avatar?.className).toContain(sizeClasses[size])
    })
  })

  it("renders with all shape variants", () => {
    const shapes = ["circle", "square", "rounded"] as const
    const shapeClasses: Record<string, string> = {
      circle: "rounded-full",
      square: "rounded-none",
      rounded: "rounded-md",
    }

    shapes.forEach((shape) => {
      const { container } = render(Avatar, {
        props: {
          src: "https://example.com/avatar.jpg",
          shape,
        } as AvatarProps,
      })
      const avatar = container.querySelector(".avatar")
      expect(avatar?.className).toContain(shapeClasses[shape])
    })
  })

  it("sets aria-label from alt prop", () => {
    const { container } = render(Avatar, {
      props: {
        src: "https://example.com/avatar.jpg",
        alt: "John Doe avatar",
      } as AvatarProps,
    })
    const avatar = container.querySelector(".avatar")
    expect(avatar?.getAttribute("aria-label")).toBe("John Doe avatar")
  })

  it("sets aria-label from name when alt not provided", () => {
    const { container } = render(Avatar, {
      props: {
        src: "https://example.com/avatar.jpg",
        name: "John Doe",
      } as AvatarProps,
    })
    const avatar = container.querySelector(".avatar")
    expect(avatar?.getAttribute("aria-label")).toBe("John Doe")
  })

  it("sets default aria-label when neither alt nor name provided", () => {
    const { container } = render(Avatar, {
      props: {
        src: "https://example.com/avatar.jpg",
      } as AvatarProps,
    })
    const avatar = container.querySelector(".avatar")
    expect(avatar?.getAttribute("aria-label")).toBe("Avatar")
  })

  it("status indicator has aria-label", () => {
    const { container } = render(Avatar, {
      props: {
        src: "https://example.com/avatar.jpg",
        status: "online",
      } as AvatarProps,
    })
    const status = container.querySelector(".avatar-status")
    expect(status?.getAttribute("aria-label")).toBe("Status: online")
  })
})

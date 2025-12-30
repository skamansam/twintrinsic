import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import AvatarGroup from "../../src/lib/components/Avatar/AvatarGroup.svelte"

describe("AvatarGroup", () => {
  it("renders avatar group container", () => {
    const { container } = render(AvatarGroup, {
      props: {
        children: () => "Avatars",
      },
    })
    expect(container.querySelector(".avatar-group")).toBeTruthy()
  })

  it("renders children content", () => {
    const { container } = render(AvatarGroup, {
      props: {
        children: () => "Avatar group",
      },
    })
    expect(container.textContent).toContain("Avatar group")
  })
})

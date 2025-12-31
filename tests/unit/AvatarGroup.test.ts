import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import AvatarGroup from "../../src/lib/components/Avatar/AvatarGroup.svelte"

describe("AvatarGroup", () => {
  it("renders avatar group container", () => {
    const { container } = render(AvatarGroup, {
      props: {
        max: 3,
        total: 5,
        children: () => "Avatars",
      },
    })
    expect(container.querySelector(".avatar-group")).toBeTruthy()
  })

  it("renders element", () => {
    const { container } = render(AvatarGroup, {
      props: {
        max: 3,
        total: 5,
        children: () => "AvatarGroup content",
      },
    })
    expect(container.firstChild).toBeTruthy()
  })
})

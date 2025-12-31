import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import Icon from "../../src/lib/components/Icon/Icon.svelte"

describe("Icon", () => {
  it("renders element", () => {
    const { container } = render(Icon, {
      props: {
        name: "heart",
      },
    })
    expect(container.firstChild).toBeTruthy()
  })
})

import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import Progress from "../../src/lib/components/Progress/Progress.svelte"

describe("Progress", () => {
  it("renders progress element", () => {
    const { container } = render(Progress, {
      props: {
        value: 50,
        max: 100,
      },
    })
    expect(container.querySelector(".progress")).toBeTruthy()
  })

  it("sets progress value", () => {
    const { container } = render(Progress, {
      props: {
        value: 75,
        max: 100,
      },
    })
    const progress = container.querySelector("progress") as HTMLProgressElement
    expect(progress?.value).toBe(75)
  })

  it("sets progress max", () => {
    const { container } = render(Progress, {
      props: {
        value: 50,
        max: 100,
      },
    })
    const progress = container.querySelector("progress") as HTMLProgressElement
    expect(progress?.max).toBe(100)
  })
})

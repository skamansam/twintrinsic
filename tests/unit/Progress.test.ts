import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import Progress from "../../src/lib/components/Progress/Progress.svelte"

describe("Progress", () => {
  it("renders native progress element", () => {
    const { container } = render(Progress, {
      props: {
        value: 50,
        max: 100,
      },
    })
    const progress = container.querySelector("progress")
    expect(progress).toBeTruthy()
  })

  it("sets correct progress attributes", () => {
    const { container } = render(Progress, {
      props: {
        value: 75,
        max: 100,
      },
    })
    const progress = container.querySelector("progress") as HTMLProgressElement
    expect(progress.value).toBe(75)
    expect(progress.max).toBe(100)
  })

  it("renders indeterminate progress when indeterminate prop is true", () => {
    const { container } = render(Progress, {
      props: {
        indeterminate: true,
        max: 100,
      },
    })
    const progress = container.querySelector("progress") as HTMLProgressElement
    expect(progress.hasAttribute("value")).toBe(false)
  })

  it("displays value when showValue is true", () => {
    const { container } = render(Progress, {
      props: {
        value: 42,
        max: 100,
        showValue: true,
      },
    })
    const valueDisplay = container.querySelector(".progress-label")
    expect(valueDisplay?.textContent).toContain("42")
  })

  it("displays loading text for indeterminate progress", () => {
    const { container } = render(Progress, {
      props: {
        indeterminate: true,
        max: 100,
        showValue: true,
      },
    })
    const valueDisplay = container.querySelector(".progress-label")
    expect(valueDisplay?.textContent).toContain("Loading...")
  })

  it("applies variant classes", () => {
    const { container } = render(Progress, {
      props: {
        value: 50,
        variant: "success",
      },
    })
    const progress = container.querySelector("progress")
    expect(progress?.classList.contains("progress-success")).toBe(true)
  })

  it("applies size classes", () => {
    const { container } = render(Progress, {
      props: {
        value: 50,
        size: "lg",
      },
    })
    const progress = container.querySelector("progress")
    expect(progress?.classList.contains("progress-lg")).toBe(true)
  })

  it("applies striped class when striped is true", () => {
    const { container } = render(Progress, {
      props: {
        value: 50,
        striped: true,
      },
    })
    const progress = container.querySelector("progress")
    expect(progress?.classList.contains("progress-striped")).toBe(true)
  })

  it("applies animated class when both striped and animated are true", () => {
    const { container } = render(Progress, {
      props: {
        value: 50,
        striped: true,
        animated: true,
      },
    })
    const progress = container.querySelector("progress")
    expect(progress?.classList.contains("progress-animated")).toBe(true)
  })

  it("formats value with custom format function", () => {
    const { container } = render(Progress, {
      props: {
        value: 0.8,
        max: 1,
        showValue: true,
        format: (v: number) => `${Math.round(v * 100)}%`,
      },
    })
    const valueDisplay = container.querySelector(".progress-label")
    expect(valueDisplay?.textContent).toContain("80%")
  })
})

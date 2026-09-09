import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { render, screen, fireEvent } from "@testing-library/svelte"
import Timer from "$lib/components/Timer/Timer.svelte"

/**
 * Timer unit tests. The interval that drives the timer is created inside a
 * `$effect`, which `@testing-library/svelte` flushes synchronously on render.
 * Ticks are advanced with `advanceTimersByTimeAsync` so Svelte's microtask
 * scheduler (DOM updates + effect cleanups) interleaves with the timers.
 */
describe("Timer", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("renders the initial remaining time for a countdown", () => {
    render(Timer, { props: { duration: 90 } })
    expect(screen.getByRole("timer")).toHaveTextContent("01:30")
  })

  it("counts down over time", async () => {
    render(Timer, { props: { duration: 60 } })
    await vi.advanceTimersByTimeAsync(10_000)
    expect(screen.getByRole("timer")).toHaveTextContent("00:50")
  })

  it("counts up in countup mode", async () => {
    render(Timer, { props: { mode: "countup", duration: 30 } })
    expect(screen.getByRole("timer")).toHaveTextContent("00:00")
    await vi.advanceTimersByTimeAsync(12_500)
    expect(screen.getByRole("timer")).toHaveTextContent("00:12")
  })

  it("pauses and resumes without resetting the elapsed time", async () => {
    render(Timer, { props: { duration: 60 } })
    await vi.advanceTimersByTimeAsync(5_000)
    expect(screen.getByRole("timer")).toHaveTextContent("00:55")

    fireEvent.click(screen.getByRole("button", { name: "Pause timer" }))
    await vi.advanceTimersByTimeAsync(0)
    const paused = screen.getByRole("timer").textContent
    await vi.advanceTimersByTimeAsync(10_000)
    expect(screen.getByRole("timer")).toHaveTextContent(paused ?? "")

    fireEvent.click(screen.getByRole("button", { name: "Resume timer" }))
    await vi.advanceTimersByTimeAsync(3_000)
    expect(screen.getByRole("timer")).toHaveTextContent("00:52")
  })

  it("resets the elapsed time back to the start", async () => {
    render(Timer, { props: { duration: 90 } })
    await vi.advanceTimersByTimeAsync(15_000)
    expect(screen.getByRole("timer")).toHaveTextContent("01:15")

    fireEvent.click(screen.getByRole("button", { name: "Reset timer" }))
    await vi.advanceTimersByTimeAsync(0)
    expect(screen.getByRole("timer")).toHaveTextContent("01:30")
  })

  it("fires oncomplete with the elapsed detail and stops", async () => {
    const oncomplete = vi.fn()
    render(Timer, { props: { duration: 10, oncomplete } })
    await vi.advanceTimersByTimeAsync(11_000)

    expect(oncomplete).toHaveBeenCalledTimes(1)
    const [event] = oncomplete.mock.calls[0] as [CustomEvent]
    expect(event.detail).toEqual({ elapsed: 10_000, duration: 10 })
    // Timer stays at zero after completion (no loop)
    expect(screen.getByRole("timer")).toHaveTextContent("00:00")
  })

  it("restarts automatically when loop is enabled", async () => {
    const oncomplete = vi.fn()
    render(Timer, { props: { duration: 5, loop: true, oncomplete } })
    await vi.advanceTimersByTimeAsync(11_000)

    expect(oncomplete).toHaveBeenCalledTimes(2)
    // Into the second lap: 11s elapsed, 5s per lap -> 1s into lap two
    expect(screen.getByRole("timer")).toHaveTextContent("00:04")
  })

  it("fires onupdate on each tick with elapsed, remaining, and percent", async () => {
    const onupdate = vi.fn()
    render(Timer, { props: { duration: 100, onupdate } })
    await vi.advanceTimersByTimeAsync(1_000)

    expect(onupdate).toHaveBeenCalledTimes(10)
    const last = onupdate.mock.calls.at(-1)?.[0] as CustomEvent
    expect(last.detail).toEqual({ elapsed: 1_000, remaining: 99_000, percent: 1 })
  })

  it("applies a custom format function", () => {
    render(Timer, {
      props: {
        duration: 30,
        format: (milliseconds) => `${(milliseconds / 1000).toFixed(1)}s`,
      },
    })
    expect(screen.getByRole("timer")).toHaveTextContent("30.0s")
  })

  it("does not auto-start when autoStart is false", async () => {
    render(Timer, { props: { duration: 60, autoStart: false } })
    expect(screen.getByRole("timer")).toHaveTextContent("01:00")
    await vi.advanceTimersByTimeAsync(5_000)
    expect(screen.getByRole("timer")).toHaveTextContent("01:00")
  })

  it("renders the gauge variant as an svg", () => {
    const { container } = render(Timer, { props: { variant: "gauge", duration: 300 } })
    expect(container.querySelector("svg")).not.toBeNull()
    expect(screen.getByRole("img")).toBeInTheDocument()
  })

  it("renders the kpi variant as a card and toggles on click", () => {
    render(Timer, { props: { variant: "kpi", duration: 120 } })
    expect(screen.getByText("Time left")).toBeInTheDocument()

    fireEvent.click(screen.getByRole("button", { name: /120 of 120/i }))
    expect(screen.getByRole("button", { name: "Resume timer" })).toBeInTheDocument()
  })

  it("hides the built-in controls when showControls is false", () => {
    render(Timer, { props: { showControls: false } })
    expect(screen.queryByRole("button", { name: "Pause timer" })).not.toBeInTheDocument()
    expect(screen.queryByRole("button", { name: "Reset timer" })).not.toBeInTheDocument()
  })

  it("passes rest props to the root element", () => {
    render(Timer, { props: { "data-testid": "custom-timer" } })
    expect(screen.getByTestId("custom-timer")).toBeInTheDocument()
  })
})
import { render, screen } from "@testing-library/svelte";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Toast from "$lib/components/Toast/Toast.svelte";
import { toastStore } from "$lib/components/Toast/toastStore.js";

/**
 * Toast unit tests. The store is a module singleton, so each test clears it
 * after running. The auto-dismiss countdown is driven by the Timer component,
 * so ticks are advanced with `advanceTimersByTimeAsync` to let Svelte's
 * microtask scheduler interleave with the timer callbacks.
 */
describe("Toast", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    toastStore.clear();
    vi.useRealTimers();
  });

  it("renders an empty container by default", () => {
    const { container } = render(Toast);
    expect(container.querySelector(".toast-container")).toBeTruthy();
  });

  it("renders a countdown bar (Timer) for a toast with a duration", async () => {
    render(Toast);
    toastStore.add({ message: "Hello", duration: 2000 });
    await vi.advanceTimersByTimeAsync(0);

    expect(screen.getByRole("button", { name: "Dismiss notification" })).toHaveTextContent("Hello");
    expect(screen.getByText("Hello")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Dismiss notification" }).querySelector("progress"),
    ).not.toBeNull();
  });

  it("auto-dismisses when the Timer countdown completes", async () => {
    render(Toast);
    toastStore.add({ message: "Bye", duration: 2000 });
    await vi.advanceTimersByTimeAsync(0);
    expect(screen.getByRole("button", { name: "Dismiss notification" })).toBeInTheDocument();

    // 2000ms countdown + 200ms exit animation
    await vi.advanceTimersByTimeAsync(2_500);
    expect(screen.queryByRole("button", { name: "Dismiss notification" })).not.toBeInTheDocument();
  });

  it("pauses and resumes the countdown without resetting it", async () => {
    render(Toast);
    const id = toastStore.add({ message: "Paused", duration: 5000 });
    await vi.advanceTimersByTimeAsync(1_000);
    const toast = screen.getByRole("button", { name: "Dismiss notification" });
    expect(toast.querySelector("progress")?.getAttribute("value")).toBe("4");

    toastStore.pause(id);
    await vi.advanceTimersByTimeAsync(0);
    const pausedValue = toast.querySelector("progress")?.getAttribute("value");
    await vi.advanceTimersByTimeAsync(3_000);
    expect(toast.querySelector("progress")?.getAttribute("value")).toBe(pausedValue);

    toastStore.resume(id);
    await vi.advanceTimersByTimeAsync(2_000);
    expect(toast.querySelector("progress")?.getAttribute("value")).toBe("2");
  });

  it("hides the countdown bar when progress is false but still auto-dismisses", async () => {
    render(Toast);
    toastStore.add({ message: "No bar", duration: 2000, progress: false });
    await vi.advanceTimersByTimeAsync(0);
    const toast = screen.getByRole("button", { name: "Dismiss notification" });
    // The countdown engine stays mounted (hidden) so auto-dismiss still works
    expect(toast.querySelector(".toast-timer")?.className).toContain("hidden");
    expect(toast.querySelector("progress")).not.toBeNull();

    await vi.advanceTimersByTimeAsync(2_500);
    expect(screen.queryByRole("button", { name: "Dismiss notification" })).not.toBeInTheDocument();
  });

  it("keeps a duration-0 toast persistent with no countdown", async () => {
    render(Toast);
    toastStore.add({ message: "Persistent", duration: 0 });
    await vi.advanceTimersByTimeAsync(0);
    const toast = screen.getByRole("button", { name: "Dismiss notification" });
    expect(toast.querySelector("progress")).toBeNull();

    await vi.advanceTimersByTimeAsync(10_000);
    expect(screen.getByRole("button", { name: "Dismiss notification" })).toBeInTheDocument();
  });

  it("renders with children", () => {
    const { container } = render(Toast, {
      props: {
        children: () => "Toast content",
      },
    });
    expect(container).toBeTruthy();
  });
});

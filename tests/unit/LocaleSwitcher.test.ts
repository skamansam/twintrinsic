import { fireEvent, render, screen } from "@testing-library/svelte";
import { beforeEach, describe, expect, it, vi } from "vitest";
import LocaleSwitcher from "$lib/components/LocaleSwitcher/LocaleSwitcher.svelte";

/** Shared mock state so the hoisted runtime mock can be reset per test */
const runtimeState = vi.hoisted(() => ({ current: "en" }));

vi.mock("$lib/paraglide/runtime.js", () => ({
  getLocale: () => runtimeState.current,
  setLocale: (next: string) => {
    runtimeState.current = next;
  },
}));

describe("LocaleSwitcher", () => {
  beforeEach(() => {
    runtimeState.current = "en";
  });

  it("renders a toggle button per locale with native names", () => {
    render(LocaleSwitcher);
    expect(screen.getByRole("button", { name: "English" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Español" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "فارسی" })).toBeInTheDocument();
  });

  it("marks the active locale as pressed", () => {
    render(LocaleSwitcher);
    expect(screen.getByRole("button", { name: "English" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "فارسی" })).toHaveAttribute("aria-pressed", "false");
  });

  it("switches locale on click and fires the change event", async () => {
    const onChange = vi.fn();
    render(LocaleSwitcher, { props: { onchange: onChange } });

    await fireEvent.click(screen.getByRole("button", { name: "فارسی" }));
    expect(runtimeState.current).toBe("fa");
    expect(onChange).toHaveBeenCalledTimes(1);
    const event = onChange.mock.calls[0][0] as CustomEvent<{ locale: string }>;
    expect(event.detail.locale).toBe("fa");
  });

  it("skips the switch when clicking the already-active locale", async () => {
    const onChange = vi.fn();
    render(LocaleSwitcher, { props: { onchange: onChange } });

    await fireEvent.click(screen.getByRole("button", { name: "English" }));
    expect(runtimeState.current).toBe("en");
    expect(onChange).not.toHaveBeenCalled();
  });

  it("renders a native select in select variant", () => {
    render(LocaleSwitcher, { props: { variant: "select" } });
    const select = screen.getByRole("combobox") as HTMLSelectElement;
    expect(select).toBeInTheDocument();
    expect(select.value).toBe("en");
    const labels = Array.from(select.options).map((option) => option.textContent);
    expect(labels).toEqual(["English", "Español", "فارسی"]);
  });

  it("respects a custom locales list", () => {
    render(LocaleSwitcher, { props: { locales: ["en", "fa"] } });
    expect(screen.getByRole("button", { name: "English" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "فارسی" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Español" })).not.toBeInTheDocument();
  });

  it("applies a custom accessible label", () => {
    render(LocaleSwitcher, { props: { ariaLabel: "Pick a language" } });
    expect(screen.getByRole("group", { name: "Pick a language" })).toBeInTheDocument();
  });

  it("passes rest props through to the root element", () => {
    const { container } = render(LocaleSwitcher, { props: { "data-testid": "locale-switcher" } });
    expect(container.querySelector("[data-testid='locale-switcher']")).toBeInTheDocument();
  });
});

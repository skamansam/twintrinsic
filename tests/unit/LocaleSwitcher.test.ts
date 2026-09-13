import { fireEvent, render, screen } from "@testing-library/svelte";
import { beforeEach, describe, expect, it, vi } from "vitest";
import LocaleSwitcher from "$lib/components/LocaleSwitcher/LocaleSwitcher.svelte";

/**
 * Shared mock state so the hoisted runtime mock can be reset per test.
 *
 * The switcher resolves the Paraglide runtime asynchronously (through
 * `import.meta.glob` + a dynamic import), so every render is async and
 * queries must use the `findBy*` variants. `hasLocales` simulates a host
 * app compiled without Paraglide data: the module resolves but exposes
 * no locale list, and the switcher renders nothing.
 */
const runtimeState = vi.hoisted(() => ({ current: "en", hasLocales: true }));

vi.mock("$lib/paraglide/runtime.js", () => ({
  get locales() {
    return runtimeState.hasLocales ? ["en", "es", "fa"] : undefined;
  },
  getLocale: () => runtimeState.current,
  setLocale: (next: string) => {
    runtimeState.current = next;
  },
}));

describe("LocaleSwitcher", () => {
  beforeEach(() => {
    runtimeState.current = "en";
    runtimeState.hasLocales = true;
  });

  it("renders a toggle button per locale with native names", async () => {
    render(LocaleSwitcher);
    expect(await screen.findByRole("button", { name: "English" })).toBeInTheDocument();
    expect(await screen.findByRole("button", { name: "Español" })).toBeInTheDocument();
    expect(await screen.findByRole("button", { name: "فارسی" })).toBeInTheDocument();
  });

  it("marks the active locale as pressed", async () => {
    render(LocaleSwitcher);
    const active = await screen.findByRole("button", { name: "English" });
    expect(active).toHaveAttribute("aria-pressed", "true");
    expect(await screen.findByRole("button", { name: "فارسی" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });

  it("switches locale on click and fires the change event", async () => {
    const onChange = vi.fn();
    render(LocaleSwitcher, { props: { onchange: onChange } });

    await fireEvent.click(await screen.findByRole("button", { name: "فارسی" }));
    expect(runtimeState.current).toBe("fa");
    expect(onChange).toHaveBeenCalledTimes(1);
    const event = onChange.mock.calls[0][0] as CustomEvent<{ locale: string }>;
    expect(event.detail.locale).toBe("fa");
  });

  it("skips the switch when clicking the already-active locale", async () => {
    const onChange = vi.fn();
    render(LocaleSwitcher, { props: { onchange: onChange } });

    await fireEvent.click(await screen.findByRole("button", { name: "English" }));
    expect(runtimeState.current).toBe("en");
    expect(onChange).not.toHaveBeenCalled();
  });

  it("renders a native select in select variant", async () => {
    render(LocaleSwitcher, { props: { variant: "select" } });
    const select = (await screen.findByRole("combobox")) as HTMLSelectElement;
    expect(select).toBeInTheDocument();
    expect(select.value).toBe("en");
    const labels = Array.from(select.options).map((option) => option.textContent);
    expect(labels).toEqual(["English", "Español", "فارسی"]);
  });

  it("respects a custom locales list without waiting on the runtime", async () => {
    runtimeState.hasLocales = false;
    render(LocaleSwitcher, { props: { locales: ["en", "fa"] } });
    expect(await screen.findByRole("button", { name: "English" })).toBeInTheDocument();
    expect(await screen.findByRole("button", { name: "فارسی" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Español" })).not.toBeInTheDocument();
  });

  it("applies a custom accessible label", async () => {
    render(LocaleSwitcher, { props: { ariaLabel: "Pick a language" } });
    expect(await screen.findByRole("group", { name: "Pick a language" })).toBeInTheDocument();
  });

  it("passes rest props through to the root element", async () => {
    render(LocaleSwitcher, { props: { "data-testid": "locale-switcher" } });
    expect(await screen.findByTestId("locale-switcher")).toBeInTheDocument();
  });

  it("renders nothing when the runtime resolves without a locale list", async () => {
    runtimeState.hasLocales = false;
    const { container } = render(LocaleSwitcher);

    // Give the (mocked) async runtime resolution a chance to land. Only
    // Svelte's {#if} anchor comment may remain — no element nodes.
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(container.children).toHaveLength(0);
  });
});

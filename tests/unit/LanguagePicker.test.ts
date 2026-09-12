import { fireEvent, render, screen, waitFor } from "@testing-library/svelte";
import { beforeEach, describe, expect, it, vi } from "vitest";
import LanguagePicker from "$lib/components/LanguagePicker/LanguagePicker.svelte";

/**
 * Shared mock state so the hoisted runtime mock can be reset per test.
 * The dynamic `import("$lib/paraglide/runtime.js")` inside the component
 * resolves against Vitest's module registry, so vi.mock intercepts it.
 */
const runtimeState = vi.hoisted(() => ({ current: "en" }));

vi.mock("$lib/paraglide/runtime.js", () => ({
  locales: ["en", "es", "fa"],
  getLocale: () => runtimeState.current,
  setLocale: (next: string) => {
    runtimeState.current = next;
  },
}));

describe("LanguagePicker", () => {
  beforeEach(() => {
    runtimeState.current = "en";
  });

  it("renders a trigger button labelled with the active locale", async () => {
    render(LanguagePicker);
    // The runtime resolves via a dynamic import → wait for the ready state
    await waitFor(() =>
      expect(screen.getByRole("button", { name: /change language \(en\)/i })).toBeInTheDocument(),
    );
  });

  it("opens a menu listing every locale in its own language", async () => {
    render(LanguagePicker);
    const trigger = await waitFor(() => screen.getByRole("button", { name: /change language/i }));
    await fireEvent.click(trigger);

    const menu = screen.getByRole("menu");
    expect(menu).toBeInTheDocument();
    expect(screen.getByRole("menuitemradio", { name: "English" })).toBeInTheDocument();
    expect(screen.getByRole("menuitemradio", { name: "Español" })).toBeInTheDocument();
    expect(screen.getByRole("menuitemradio", { name: "فارسی" })).toBeInTheDocument();
  });

  it("marks the active locale with aria-checked", async () => {
    render(LanguagePicker);
    const trigger = await waitFor(() => screen.getByRole("button", { name: /change language/i }));
    await fireEvent.click(trigger);

    expect(screen.getByRole("menuitemradio", { name: "English" })).toHaveAttribute(
      "aria-checked",
      "true",
    );
    expect(screen.getByRole("menuitemradio", { name: "فارسی" })).toHaveAttribute(
      "aria-checked",
      "false",
    );
  });

  it("renders a flag icon per locale from the circle-flags iconset", async () => {
    render(LanguagePicker);
    const trigger = await waitFor(() => screen.getByRole("button", { name: /change language/i }));
    await fireEvent.click(trigger);

    // Icon renders an SVG asynchronously (Iconify loads icon data on demand)
    // with class `_icon-{name} _iconset-{iconset}`.
    const menu = screen.getByRole("menu");
    await waitFor(() => {
      const flag = menu.querySelector("svg[class*='_iconset-circle-flags']");
      expect(flag).not.toBeNull();
      expect(flag?.getAttribute("class")).toMatch(/_icon-lang-/);
    });
  });

  it("switches the locale on click and fires onchange", async () => {
    const onchange = vi.fn();
    render(LanguagePicker, { props: { onchange } });

    const trigger = await waitFor(() => screen.getByRole("button", { name: /change language/i }));
    await fireEvent.click(trigger);
    await fireEvent.click(screen.getByRole("menuitemradio", { name: "فارسی" }));

    expect(runtimeState.current).toBe("fa");
    expect(onchange).toHaveBeenCalledTimes(1);
    const event = onchange.mock.calls[0][0] as CustomEvent<{ locale: string }>;
    expect(event.detail.locale).toBe("fa");
  });

  it("respects an explicit locales prop", async () => {
    render(LanguagePicker, { props: { locales: ["en", "fa"] } });

    const trigger = await waitFor(() => screen.getByRole("button", { name: /change language/i }));
    await fireEvent.click(trigger);

    expect(screen.getByRole("menuitemradio", { name: "English" })).toBeInTheDocument();
    expect(screen.getByRole("menuitemradio", { name: "فارسی" })).toBeInTheDocument();
    expect(screen.queryByRole("menuitemradio", { name: "Español" })).not.toBeInTheDocument();
  });

  it("passes rest props through to the root element", async () => {
    const { container } = render(LanguagePicker, {
      props: { "data-testid": "lang-picker" },
    });
    await waitFor(() =>
      expect(container.querySelector("[data-testid='lang-picker']")).toBeInTheDocument(),
    );
  });

  it("renders nothing when the Paraglide runtime is unavailable", async () => {
    vi.doMock("$lib/paraglide/runtime.js", () => {
      throw new Error("not compiled");
    });
    const { container } = render(LanguagePicker);
    // Give the rejected dynamic import a tick to settle
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(container.querySelector(".language-picker")).toBeNull();
    vi.doUnmock("$lib/paraglide/runtime.js");
  });
});

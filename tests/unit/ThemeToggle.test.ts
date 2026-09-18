import { fireEvent, render } from "@testing-library/svelte";
import { beforeEach, describe, expect, it } from "vitest";
import ThemeToggle from "../../src/lib/components/ThemeToggle/ThemeToggle.svelte";

/**
 * ThemeToggle is a checkbox that applies the chosen theme to <html>
 * (data-theme attribute + `dark` class) and persists it in localStorage.
 * Its accessible name is state-dependent by design: in light mode the
 * action offered is "Switch to dark theme", and vice versa.
 */
describe("ThemeToggle", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
    document.documentElement.classList.remove("dark");
  });

  it("starts unchecked in light mode and offers the switch-to-dark action", () => {
    const { getByRole } = render(ThemeToggle);

    const toggle = getByRole("checkbox", { name: "Switch to dark theme" });
    expect(toggle).not.toBeChecked();
    expect(document.documentElement).not.toHaveAttribute("data-theme", "dark");
  });

  it("initializes from localStorage when a theme was saved", () => {
    localStorage.setItem("theme", "dark");
    const { getByRole } = render(ThemeToggle);

    expect(getByRole("checkbox", { name: "Switch to light theme" })).toBeChecked();
    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("applies and persists the theme when toggled", async () => {
    const { getByRole } = render(ThemeToggle);
    const toggle = getByRole("checkbox", { name: "Switch to dark theme" });

    await fireEvent.click(toggle);

    expect(getByRole("checkbox", { name: "Switch to light theme" })).toBeChecked();
    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
    expect(localStorage.getItem("theme")).toBe("dark");

    await fireEvent.click(getByRole("checkbox", { name: "Switch to light theme" }));

    expect(document.documentElement).not.toHaveAttribute("data-theme", "dark");
    expect(localStorage.getItem("theme")).toBe("light");
  });
});

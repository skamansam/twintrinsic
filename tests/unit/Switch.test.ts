import { fireEvent, render, waitFor } from "@testing-library/svelte";
import { describe, expect, it, vi } from "vitest";
import FormHarness from "./helpers/FormHarness.svelte";
import Switch from "../../src/lib/components/Form/Switch.svelte";

/**
 * Switch is a styled checkbox (sr-only input + CSS-animated thumb).
 * Tests cover the accessible contract, the callback-props contract,
 * disabled behavior, and Form-context registration.
 */
describe("Switch", () => {
  it("renders a checkbox with the label as accessible name", () => {
    const { getByRole, getByText } = render(Switch, {
      props: { label: "Enable dark mode", checked: true },
    });

    expect(getByRole("checkbox", { name: "Enable dark mode" })).toBeChecked();
    expect(getByText("Enable dark mode")).toBeInTheDocument();
  });

  it("renders the accessible name from ariaLabel without visible text", () => {
    const { getByRole, queryByText } = render(Switch, { props: { ariaLabel: "Silent toggle" } });

    expect(getByRole("checkbox", { name: "Silent toggle" })).toBeInTheDocument();
    expect(queryByText("Silent toggle")).not.toBeInTheDocument();
  });

  it("toggles on click and emits onchange with the new checked state", async () => {
    const onchange = vi.fn();
    const { getByRole } = render(Switch, { props: { label: "Toggle me", onchange } });
    const toggle = getByRole("checkbox", { name: "Toggle me" });

    await fireEvent.click(toggle);

    expect(toggle).toBeChecked();
    expect(onchange).toHaveBeenCalledTimes(1);
    expect(onchange.mock.calls[0][0].detail).toEqual({ checked: true });

    await fireEvent.click(toggle);

    expect(toggle).not.toBeChecked();
    expect(onchange.mock.calls[1][0].detail).toEqual({ checked: false });
  });

  it("renders its control disabled when the disabled prop is set", () => {
    const { getByRole } = render(Switch, { props: { label: "Locked", disabled: true } });

    expect(getByRole("checkbox", { name: "Locked" })).toBeDisabled();
  });

  it("registers with a Form context and reports its value on submit", async () => {
    const onsubmit = vi.fn();
    const { getByRole } = render(FormHarness, {
      props: {
        field: Switch,
        fieldProps: { name: "darkMode", label: "Dark mode" },
        formProps: { validate: false },
        onsubmit,
      },
    });

    await fireEvent.click(getByRole("checkbox", { name: "Dark mode" }));
    await fireEvent.click(getByRole("button", { name: "Submit" }));

    await waitFor(() => expect(onsubmit).toHaveBeenCalled());
    // FormData serializes checkboxes via their value attribute ("on" by
    // default). The Form's detail mirrors FormData semantics; the boolean
    // lives in the component's context value, not the submitted payload.
    expect(onsubmit.mock.calls[0][0].detail.data).toMatchObject({ darkMode: "on" });
  });
});

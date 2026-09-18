import { fireEvent, render, waitFor } from "@testing-library/svelte";
import { describe, expect, it, vi } from "vitest";
import Switch from "../../src/lib/components/Form/Switch.svelte";
import TextInput from "../../src/lib/components/Form/TextInput.svelte";
import FormHarness from "./helpers/FormHarness.svelte";

/**
 * Form renders a <form> that provides context to field components,
 * collects values into the submit detail, and runs HTML5 constraint
 * validation before firing onsubmit (onerror on failure).
 */
describe("Form", () => {
  it("renders a form element with the layout class", () => {
    const { container } = render(FormHarness, {
      props: {
        field: TextInput,
        fieldProps: { name: "username", ariaLabel: "Username" },
      },
    });

    const form = container.querySelector("form");
    expect(form).toBeInTheDocument();
    expect(form).toHaveClass("vertical");
  });

  it("collects field values into the submit detail", async () => {
    const onsubmit = vi.fn();
    const { getByRole } = render(FormHarness, {
      props: {
        field: TextInput,
        fieldProps: { name: "username", ariaLabel: "Username" },
        formProps: { validate: false },
        onsubmit,
      },
    });

    await fireEvent.input(getByRole("textbox", { name: "Username" }), {
      target: { value: "sam" },
    });
    await fireEvent.click(getByRole("button", { name: "Submit" }));

    await waitFor(() => expect(onsubmit).toHaveBeenCalled());
    expect(onsubmit.mock.calls[0][0].detail.data).toMatchObject({ username: "sam" });
  });

  it("blocks submit and fires onerror when a required field is empty", async () => {
    const onsubmit = vi.fn();
    const onerror = vi.fn();
    const { getByRole } = render(FormHarness, {
      props: {
        field: TextInput,
        fieldProps: { name: "username", ariaLabel: "Username", required: true },
        // jsdom's native constraint validation would swallow the submit
        // event entirely; novalidate (via rest props) lets the component's
        // own validateForm run, which is what we're testing.
        formProps: { novalidate: true },
        onsubmit,
        onerror,
      },
    });

    await fireEvent.click(getByRole("button", { name: "Submit" }));

    await waitFor(() => expect(onerror).toHaveBeenCalled());
    expect(onsubmit).not.toHaveBeenCalled();
    expect(onerror.mock.calls[0][0].detail.errors.username).toBeTruthy();
  });

  it("disables fields through the form context when the form is disabled", () => {
    const { getByRole } = render(FormHarness, {
      props: {
        field: Switch,
        fieldProps: { name: "darkMode", label: "Dark mode" },
        formProps: { disabled: true },
      },
    });

    expect(getByRole("checkbox", { name: "Dark mode" })).toBeDisabled();
  });
});

import { render, waitFor } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import TextInput from "../../src/lib/components/Form/TextInput.svelte"
import FormField from "../../src/lib/components/Form/FormField.svelte"

/**
 * FormField wires labels, help text, and ARIA state onto its child
 * control. The label targets the *real* child input id (corrected on
 * mount), help text is linked via aria-describedby, and a standalone
 * `error` prop shows immediately with role=alert and aria-invalid.
 */
function renderField(props: Record<string, unknown> = {}) {
  return render(FormField, {
    props: {
      label: "Username",
      name: "username",
      children: TextInput,
      childProps: { id: "user-input", ariaLabel: "Username" },
      ...props,
    },
  })
}

// Small local harness: renders the given child component inside the field.
// (FormField's children snippet receives ChildProps; passing a component
// keeps the tests focused on the wiring FormField applies itself.)
import FormFieldHarness from "./helpers/FormFieldHarness.svelte"

describe("FormField", () => {
  it("renders the label, required indicator, and help text linked to the control", async () => {
    const { getByText, getByRole } = render(FormFieldHarness, {
      props: {
        field: TextInput,
        fieldProps: { id: "user-input", ariaLabel: "Username" },
        fieldFormProps: { label: "Username", name: "username", required: true, helpText: "Enter your username" },
      },
    })

    const input = getByRole("textbox", { name: "Username" })
    expect(getByText("Username")).toBeInTheDocument()
    expect(getByText("Enter your username")).toBeInTheDocument()
    expect(getByText("Enter your username")).toHaveAttribute("id", expect.stringContaining("-help"))

    await waitFor(() => {
      expect(input).toHaveAttribute("aria-describedby", expect.stringContaining("-help"))
      expect(input).toHaveAttribute("aria-required", "true")
    })
  })

  it("points the label at the real child input id", () => {
    const { getByText, getByRole } = render(FormFieldHarness, {
      props: {
        field: TextInput,
        fieldProps: { id: "user-input", ariaLabel: "Username" },
        fieldFormProps: { label: "Username", name: "username" },
      },
    })

    const label = getByText("Username")
    expect(label).toHaveAttribute("for", "user-input")
    expect(getByRole("textbox", { name: "Username" })).toHaveAttribute("id", "user-input")
  })

  it("shows a standalone error immediately with role=alert and aria-invalid", () => {
    const { getByRole, getByText } = render(FormFieldHarness, {
      props: {
        field: TextInput,
        fieldProps: { id: "user-input", ariaLabel: "Username" },
        fieldFormProps: { label: "Username", name: "username", error: "This field is required" },
      },
    })

    const alert = getByRole("alert")
    expect(alert).toHaveTextContent("This field is required")
    expect(getByRole("textbox", { name: "Username" })).toHaveAttribute("aria-invalid", "true")
  })

  it("keeps the label accessible when hideLabel is set", () => {
    const { getByText } = render(FormFieldHarness, {
      props: {
        field: TextInput,
        fieldProps: { id: "user-input", ariaLabel: "Username" },
        fieldFormProps: { label: "Username", name: "username", hideLabel: true },
      },
    })

    expect(getByText("Username")).toHaveClass("sr-only")
  })
})

// Keep the unused helper import referenced for future snippet-style tests
void renderField

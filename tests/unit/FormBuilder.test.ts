import { fireEvent, render, screen } from "@testing-library/svelte";
import { describe, expect, it, vi } from "vitest";
import FormBuilder, {
  type FormFieldDescriptor,
  type OpenApiSchema,
} from "$lib/components/Form/FormBuilder.svelte";

/** A small OpenAPI-style schema covering every generated control type */
const petSchema: OpenApiSchema = {
  type: "object",
  required: ["name"],
  properties: {
    name: { type: "string", title: "Pet name", description: "The pet's name", default: "Rex" },
    email: { type: "string", format: "email" },
    kind: { type: "string", enum: ["dog", "cat", "bird"], title: "Kind of pet" },
    age: { type: "integer", minimum: 0, maximum: 30 },
    adopted: { type: "boolean", title: "Already adopted" },
    tags: { type: "array", items: { type: "string" } },
    address: {
      type: "object",
      title: "Address",
      properties: {
        street: { type: "string", title: "Street" },
        zip: { type: "string", title: "ZIP" },
      },
    },
  },
};

describe("FormBuilder", () => {
  it("renders a text input from a string property with its label", () => {
    render(FormBuilder, { props: { schema: petSchema } });
    expect(screen.getByLabelText(/Pet name/)).toBeInTheDocument();
  });

  it("maps format email to an email input and enum to a select", () => {
    render(FormBuilder, { props: { schema: petSchema } });
    expect(screen.getByLabelText("Email")).toHaveAttribute("type", "email");
    const select = screen.getByLabelText("Kind of pet");
    expect(select.tagName).toBe("SELECT");
    expect(screen.getByRole("option", { name: "dog" })).toBeInTheDocument();
  });

  it("maps integer to a decimal input with bounds", () => {
    render(FormBuilder, { props: { schema: petSchema } });
    const numberInput = screen.getByLabelText("Age") as HTMLInputElement;
    expect(numberInput).toHaveAttribute("inputmode", "decimal");
    expect(numberInput).toHaveAttribute("min", "0");
    expect(numberInput).toHaveAttribute("max", "30");
  });

  it("maps boolean to a switch", () => {
    render(FormBuilder, { props: { schema: petSchema } });
    expect(screen.getByLabelText("Already adopted")).toBeInTheDocument();
  });

  it("renders object properties inside a nested fieldset group", () => {
    render(FormBuilder, { props: { schema: petSchema } });
    const fieldset = screen.getByRole("group", { name: "Address" });
    expect(fieldset).toBeInTheDocument();
    expect(screen.getByLabelText("Street")).toBeInTheDocument();
  });

  it("seeds initial values from the values prop and defaults", () => {
    render(FormBuilder, { props: { schema: petSchema, values: { age: 7 } } });
    expect(screen.getByLabelText(/Pet name/)).toHaveValue("Rex");
    expect(screen.getByLabelText("Age")).toHaveValue("7");
  });

  it("marks required fields", () => {
    render(FormBuilder, { props: { schema: petSchema } });
    expect(screen.getByLabelText(/Pet name/)).toHaveAttribute("aria-required", "true");
    expect(screen.getByLabelText("Email")).not.toHaveAttribute("aria-required");
  });

  it("renders an explicit fields list over a schema", () => {
    const fields: FormFieldDescriptor[] = [
      { name: "username", label: "Username", type: "text", required: true },
      { name: "role", label: "Role", type: "select", options: ["admin", "user"] },
    ];
    render(FormBuilder, { props: { fields } });
    expect(screen.getByLabelText(/Username/)).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "admin" })).toBeInTheDocument();
  });

  it("fires onchange with the field name and value on input", async () => {
    const onChange = vi.fn();
    render(FormBuilder, { props: { schema: petSchema, onchange: onChange } });
    await fireEvent.input(screen.getByLabelText(/Pet name/), { target: { value: "Luna" } });
    expect(onChange).toHaveBeenCalledTimes(1);
    const event = onChange.mock.calls[0][0] as CustomEvent<{ name: string; value: string }>;
    expect(event.detail.name).toBe("name");
    expect(event.detail.value).toBe("Luna");
  });

  it("submits the collected data", async () => {
    const onSubmit = vi.fn();
    const { container } = render(FormBuilder, {
      props: { schema: petSchema, values: { name: "Rex" }, onsubmit: onSubmit },
    });
    await fireEvent.submit(container.querySelector("form") as HTMLFormElement);
    expect(onSubmit).toHaveBeenCalledTimes(1);
    const event = onSubmit.mock.calls[0][0] as CustomEvent<{ data: Record<string, unknown> }>;
    expect(event.detail.data.name).toBe("Rex");
  });

  it("hides the submit button when showSubmit is false", () => {
    render(FormBuilder, { props: { schema: petSchema, showSubmit: false } });
    expect(screen.queryByRole("button", { name: "Submit" })).not.toBeInTheDocument();
  });
});

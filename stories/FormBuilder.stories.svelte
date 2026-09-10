<script module>
import { defineMeta } from "@storybook/addon-svelte-csf"
import { expect, userEvent } from "storybook/test"
import FormBuilder from "$lib/components/Form/FormBuilder.svelte"

/** Schema covering every generated control type */
const petSchema = {
  type: "object",
  required: ["name"],
  properties: {
    name: { type: "string", title: "Pet name", description: "The pet's name" },
    email: { type: "string", format: "email", title: "Email" },
    kind: { type: "string", enum: ["dog", "cat", "bird"], title: "Kind of pet" },
    age: { type: "integer", minimum: 0, maximum: 30, title: "Age" },
    adopted: { type: "boolean", title: "Already adopted" },
    tags: { type: "array", items: { type: "string" }, title: "Tags" },
  },
}

const { Story } = defineMeta({
  title: "Form/FormBuilder",
  component: FormBuilder,
  tags: ["autodocs"],
  args: {
    schema: petSchema,
  },
})
</script>

<Story
  name="Default"
  play={async ({ canvas }) => {
    const nameInput = canvas.getByLabelText(/Pet name/);
    await expect(nameInput).toBeInTheDocument();
    await userEvent.type(nameInput, "Rex");
    await expect(nameInput).toHaveValue("Rex");
  }}
/>

<Story
  name="Field Descriptors"
  args={{
    schema: undefined,
    fields: [
      { name: "username", label: "Username", type: "text", required: true },
      { name: "role", label: "Role", type: "select", options: ["admin", "user", "viewer"] },
      { name: "notifications", label: "Enable notifications", type: "boolean" },
    ],
  }}
  play={async ({ canvas }) => {
    await expect(canvas.getByLabelText(/Username/)).toBeInTheDocument();
    const select = canvas.getByLabelText("Role");
    await userEvent.selectOptions(select, "admin");
    await expect(select).toHaveValue("admin");
  }}
/>

<Story
  name="Seeded Values"
  args={{
    schema: petSchema,
    values: { name: "Luna", age: 4, kind: "cat" },
  }}
  play={async ({ canvas }) => {
    await expect(canvas.getByLabelText(/Pet name/)).toHaveValue("Luna");
    await expect(canvas.getByLabelText("Age")).toHaveValue("4");
    await expect(canvas.getByLabelText("Kind of pet")).toHaveValue("cat");
  }}
/>

<Story name="No Submit Button" args={{ showSubmit: false }} />

<Story
  name="References and Composition"
  args={{
    schema: {
      allOf: [
        { $ref: "#/components/schemas/BasePet" },
        {
          type: "object",
          required: ["kind"],
          properties: {
            kind: { type: "string", enum: ["dog", "cat", "bird"], title: "Kind of pet" },
            owner: { $ref: "#/components/schemas/Owner" },
          },
        },
      ],
    },
    components: {
      BasePet: {
        type: "object",
        required: ["name"],
        properties: {
          name: { type: "string", title: "Pet name" },
        },
      },
      Owner: {
        type: "object",
        properties: {
          fullName: { type: "string", title: "Owner name" },
        },
      },
    },
  }}
  play={async ({ canvas }) => {
    // allOf merged the $ref'd base with the inline fields
    await expect(canvas.getByLabelText(/Pet name/)).toHaveAttribute("aria-required", "true");
    await expect(canvas.getByLabelText(/Kind of pet/)).toBeInTheDocument();
    // nested $ref resolves into a fieldset group
    await expect(canvas.getByRole("group", { name: "Owner" })).toBeInTheDocument();
  }}
/>

<Story
  name="Nested Objects"
  args={{
    schema: {
      type: "object",
      properties: {
        name: { type: "string", title: "Name" },
        address: {
          type: "object",
          title: "Address",
          properties: {
            street: { type: "string", title: "Street" },
            zip: { type: "string", title: "ZIP" },
          },
        },
      },
    },
  }}
  play={async ({ canvas }) => {
    await expect(canvas.getByRole("group", { name: "Address" })).toBeInTheDocument();
    await expect(canvas.getByLabelText("Street")).toBeInTheDocument();
  }}
/>
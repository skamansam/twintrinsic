<script module>
import { defineMeta } from "@storybook/addon-svelte-csf"
import { expect, userEvent } from "storybook/test"
import TextInput from "$lib/components/Form/TextInput.svelte"

const { Story } = defineMeta({
  title: "Form/TextInput",
  component: TextInput,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["text", "email", "password", "search", "tel", "url"],
    },
    placeholder: { control: "text" },
    value: { control: "text" },
    required: { control: "boolean" },
    disabled: { control: "boolean" },
    readonly: { control: "boolean" },
    clearable: { control: "boolean" },
    size: { control: { type: "select" }, options: ["sm", "md", "lg"] },
  },
  args: { name: "username", placeholder: "Enter username" },
})
</script>

<Story
  name="Default"
  args={{ ariaLabel: "Username" }}
  play={async ({ canvas }) => {
    const input = canvas.getByRole("textbox", { name: "Username" })
    await expect(input).toHaveValue("")
    await userEvent.type(input, "johndoe")
    await expect(input).toHaveValue("johndoe")
  }}
/>

<Story
  name="With Initial Value"
  args={{ name: "email", type: "email", value: "john@example.com", ariaLabel: "Email" }}
  play={async ({ canvas }) => {
    await expect(canvas.getByRole("textbox", { name: "Email" })).toHaveValue("john@example.com")
  }}
/>

<Story
  name="Clearable"
  args={{ name: "search", clearable: true, value: "query text", ariaLabel: "Search" }}
  play={async ({ canvas }) => {
    const input = canvas.getByRole("textbox", { name: "Search" })
    // The clear button appears when the input has a value.
    await expect(canvas.getByRole("button", { name: "Clear input" })).toBeInTheDocument()
    await userEvent.click(canvas.getByRole("button", { name: "Clear input" }))
    await expect(input).toHaveValue("")
    await expect(canvas.queryByRole("button", { name: "Clear input" })).not.toBeInTheDocument()
  }}
/>

<Story
  name="Password Type"
  args={{ name: "password", type: "password", ariaLabel: "Password" }}
  play={async ({ canvas }) => {
    // Password inputs are matched by label (they are excluded from the
    // textbox role query by testing-library).
    await expect(canvas.getByLabelText("Password")).toHaveAttribute("type", "password")
  }}
/>

<Story
  name="Required"
  args={{ name: "fullname", required: true, ariaLabel: "Full name" }}
  play={async ({ canvas }) => {
    await expect(canvas.getByRole("textbox", { name: "Full name" })).toBeRequired()
  }}
/>

<Story
  name="Disabled"
  args={{ name: "locked", disabled: true, value: "read only", ariaLabel: "Locked" }}
  play={async ({ canvas }) => {
    await expect(canvas.getByRole("textbox", { name: "Locked" })).toBeDisabled()
  }}
/>

<Story
  name="With Icons"
  args={{
    name: "search",
    placeholder: "Search...",
    ariaLabel: "Search",
    startIcon: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>',
    endIcon: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>',
  }}
  play={async ({ canvas }) => {
    const wrapper = canvas.getByRole("textbox", { name: "Search" }).closest(".input-container")
    await expect(wrapper?.querySelector(".input-icon-start")).not.toBeNull()
    await expect(wrapper?.querySelector(".input-icon-end")).not.toBeNull()
  }}
/>

<Story name="Sizes" asChild>
  <div class="space-y-3">
    <TextInput name="small" size="sm" placeholder="Small" ariaLabel="Small" />
    <TextInput name="medium" size="md" placeholder="Medium" ariaLabel="Medium" />
    <TextInput name="large" size="lg" placeholder="Large" ariaLabel="Large" />
  </div>
</Story>

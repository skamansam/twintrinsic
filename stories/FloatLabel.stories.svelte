<script module>
import { defineMeta } from "@storybook/addon-svelte-csf"
import { expect, userEvent } from "storybook/test"
import FloatLabel from "$lib/components/Form/FloatLabel.svelte"
import TextInput from "$lib/components/Form/TextInput.svelte"
import Textarea from "$lib/components/Form/Textarea.svelte"

const { Story } = defineMeta({
  title: "Form/FloatLabel",
  component: FloatLabel,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    required: { control: "boolean" },
    disabled: { control: "boolean" },
    error: { control: "text" },
    helpText: { control: "text" },
  },
  args: { label: "Username" },
})
</script>

<Story
  name="Default"
  play={async ({ canvas }) => {
    // Typing into the child input floats the label and marks the wrapper
    // as having a value (is-floating / has-value classes).
    const input = canvas.getByRole("textbox")
    await expect(input).toHaveValue("")
    const wrapper = input.closest(".float-label-wrapper")
    await expect(wrapper).not.toHaveClass("has-value")

    await userEvent.type(input, "johndoe")
    await expect(wrapper).toHaveClass("is-floating")
    await expect(wrapper).toHaveClass("has-value")

    // Clearing the value removes the has-value state (the label stays
    // floating while the input keeps focus).
    await userEvent.clear(input)
    await expect(wrapper).not.toHaveClass("has-value")
  }}
>
  <TextInput name="username" placeholder="Enter username" />
</Story>

<Story
  name="Required"
  args={{ label: "Email", required: true }}
  play={async ({ canvas }) => {
    // The required indicator is rendered in the label.
    const label = canvas.getByText("Email").closest("label")
    await expect(label).not.toBeNull()
    await expect(label?.querySelector(".required-indicator")).not.toBeNull()
  }}
>
  <TextInput type="email" name="email" placeholder="you@example.com" />
</Story>

<Story
  name="With Help Text"
  args={{ label: "Password", helpText: "Use at least 8 characters" }}
  play={async ({ canvas }) => {
    await expect(canvas.getByText("Use at least 8 characters")).toBeInTheDocument()
  }}
>
  <TextInput type="password" name="password" />
</Story>

<Story
  name="With Error"
  args={{ label: "Email", error: "Please enter a valid email" }}
  play={async ({ canvas }) => {
    // The error replaces help text and is announced via role="alert".
    const alert = await canvas.findByRole("alert")
    await expect(alert).toHaveTextContent("Please enter a valid email")
  }}
>
  <TextInput type="email" name="email" />
</Story>

<Story
  name="With Textarea"
  args={{ label: "Message" }}
  play={async ({ canvas }) => {
    // Works with textarea children too.
    const textarea = canvas.getByRole("textbox")
    await userEvent.type(textarea, "Hello")
    const wrapper = textarea.closest(".float-label-wrapper")
    await expect(wrapper).toHaveClass("is-floating")
  }}
>
  <Textarea name="message" rows={3} />
</Story>

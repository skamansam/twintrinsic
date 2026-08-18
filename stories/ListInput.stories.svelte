<script module>
import { defineMeta } from "@storybook/addon-svelte-csf"
import { expect, userEvent } from "storybook/test"
import ListInput from "$lib/components/Form/ListInput.svelte"

const { Story } = defineMeta({
  title: "Form/ListInput",
  component: ListInput,
  tags: ["autodocs"],
  argTypes: {
    placeholder: { control: "text" },
    values: { control: "object" },
    disabled: { control: "boolean" },
    allowDuplicates: { control: "boolean" },
    maxItems: { control: { type: "number" } },
  },
  args: { name: "tags", placeholder: "Add tag...", ariaLabel: "Tags" },
})
</script>

<Story
  name="Default"
  play={async ({ canvas }) => {
    const input = canvas.getByRole("textbox", { name: "Tags" })
    // Typing a value and pressing Enter adds it as a chip.
    await userEvent.type(input, "svelte{Enter}")
    await expect(canvas.getByText("svelte")).toBeInTheDocument()
    await expect(input).toHaveValue("")

    // Comma also commits the current value.
    await userEvent.type(input, "tailwind,")
    await expect(canvas.getByText("tailwind")).toBeInTheDocument()
  }}
/>

<Story
  name="With Initial Values"
  args={{ name: "tags", values: ["react", "svelte"], ariaLabel: "Tags" }}
  play={async ({ canvas }) => {
    // Pre-filled values render as chips on mount.
    await expect(canvas.getByText("react")).toBeInTheDocument()
    await expect(canvas.getByText("svelte")).toBeInTheDocument()
  }}
/>

<Story
  name="Remove Items"
  args={{ name: "tags", values: ["react", "svelte"], ariaLabel: "Tags" }}
  play={async ({ canvas }) => {
    // Each chip exposes a remove button.
    await userEvent.click(canvas.getByRole("button", { name: "Remove react" }))
    await expect(canvas.queryByText("react")).not.toBeInTheDocument()
    await expect(canvas.getByText("svelte")).toBeInTheDocument()
  }}
/>

<Story
  name="Validation"
  args={{
    name: "emails",
    placeholder: "Add email...",
    ariaLabel: "Emails",
    validator: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    errorMessage: "Please enter a valid email address",
  }}
  play={async ({ canvas }) => {
    const input = canvas.getByRole("textbox", { name: "Emails" })
    // Invalid values are rejected and surfaced as an error.
    await userEvent.type(input, "not-an-email{Enter}")
    await expect(canvas.queryByText("not-an-email")).not.toBeInTheDocument()
    await expect(canvas.getByRole("alert")).toHaveTextContent("Please enter a valid email address")

    // Valid values pass (clear the rejected input first).
    await userEvent.clear(input)
    await userEvent.type(input, "ada@example.com{Enter}")
    await expect(canvas.getByText("ada@example.com")).toBeInTheDocument()
  }}
/>

<Story
  name="Max Items"
  args={{ name: "tags", values: ["one", "two"], maxItems: 3, ariaLabel: "Tags" }}
  play={async ({ canvas }) => {
    const input = canvas.getByRole("textbox", { name: "Tags" })
    await userEvent.type(input, "three{Enter}")
    await expect(canvas.getByText("three")).toBeInTheDocument()
    // The input disables once the max is reached.
    await expect(input).toBeDisabled()
  }}
/>

<Story
  name="Disabled"
  args={{ name: "tags", values: ["frozen"], disabled: true, ariaLabel: "Tags" }}
  play={async ({ canvas }) => {
    await expect(canvas.getByRole("textbox", { name: "Tags" })).toBeDisabled()
  }}
/>

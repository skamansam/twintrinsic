<script module>
import { defineMeta } from "@storybook/addon-svelte-csf"
import { expect, userEvent } from "storybook/test"
import Textarea from "$lib/components/Form/Textarea.svelte"

const { Story } = defineMeta({
  title: "Form/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  argTypes: {
    placeholder: { control: "text" },
    rows: { control: { type: "number", min: 1, max: 12 } },
    required: { control: "boolean" },
    disabled: { control: "boolean" },
    readonly: { control: "boolean" },
    autoResize: { control: "boolean" },
  },
  args: { name: "message", placeholder: "Type your message...", ariaLabel: "Message" },
})
</script>

<Story
  name="Default"
  play={async ({ canvas }) => {
    const textarea = canvas.getByRole("textbox", { name: "Message" })
    await expect(textarea).toHaveValue("")

    // Typing updates the textarea value.
    await userEvent.type(textarea, "Hello, world!")
    await expect(textarea).toHaveValue("Hello, world!")
  }}
/>

<Story
  name="With Value"
  args={{ name: "bio", value: "Initial text", rows: 4, ariaLabel: "Bio" }}
  play={async ({ canvas }) => {
    const textarea = canvas.getByRole("textbox", { name: "Bio" })
    await expect(textarea).toHaveValue("Initial text")
    await expect(textarea).toHaveAttribute("rows", "4")
  }}
/>

<Story
  name="Required"
  args={{ name: "comment", required: true, ariaLabel: "Comment" }}
  play={async ({ canvas }) => {
    await expect(canvas.getByRole("textbox", { name: "Comment" })).toBeRequired()
  }}
/>

<Story
  name="Disabled"
  args={{ name: "readonly-msg", disabled: true, value: "You cannot edit this", ariaLabel: "Message" }}
  play={async ({ canvas }) => {
    await expect(canvas.getByRole("textbox", { name: "Message" })).toBeDisabled()
  }}
/>

<Story
  name="Readonly"
  args={{ name: "readonly-msg", readonly: true, value: "Read-only content", ariaLabel: "Message" }}
  play={async ({ canvas }) => {
    await expect(canvas.getByRole("textbox", { name: "Message" })).toHaveAttribute("readonly")
  }}
/>

<Story
  name="Auto Resize"
  args={{ name: "grow", autoResize: true, rows: 2, ariaLabel: "Growing textarea" }}
  play={async ({ canvas }) => {
    // field-sizing: content CSS auto-grows the textarea height.
    const textarea = canvas.getByRole("textbox", { name: "Growing textarea" })
    const initialHeight = textarea.getBoundingClientRect().height
    await userEvent.type(textarea, "Line one\nLine two\nLine three\nLine four")
    // Allow the browser to reflow after CSS field-sizing recalculates.
    await new Promise(r => setTimeout(r, 100))
    const finalHeight = textarea.getBoundingClientRect().height
    await expect(finalHeight).toBeGreaterThan(initialHeight)
  }}
/>

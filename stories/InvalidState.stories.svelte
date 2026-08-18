<script module>
import { defineMeta } from "@storybook/addon-svelte-csf"
import { expect } from "storybook/test"
import InvalidState from "$lib/components/Form/InvalidState.svelte"

const { Story } = defineMeta({
  title: "Form/InvalidState",
  component: InvalidState,
  tags: ["autodocs"],
  argTypes: {
    message: { control: "text" },
    icon: { control: "text" },
    showIcon: { control: "boolean" },
  },
  args: { message: "This field is required" },
})
</script>

<Story
  name="Default"
  play={async ({ canvas }) => {
    // The error is announced via role="alert" with aria-live="assertive".
    const alert = canvas.getByRole("alert")
    await expect(alert).toHaveAttribute("aria-live", "assertive")
    await expect(alert).toHaveTextContent("This field is required")
    // Default icon renders inside the message.
    await expect(alert.querySelector(".invalid-state-icon")).not.toBeNull()
  }}
/>

<Story
  name="Without Icon"
  args={{ message: "Please correct the errors below", showIcon: false }}
  play={async ({ canvas }) => {
    const alert = canvas.getByRole("alert")
    await expect(alert).toHaveTextContent("Please correct the errors below")
    await expect(alert.querySelector(".invalid-state-icon")).toBeNull()
  }}
/>

<Story
  name="Custom Icon"
  args={{ message: "Email already in use", icon: "alert-triangle" }}
  play={async ({ canvas }) => {
    await expect(canvas.getByRole("alert")).toHaveTextContent("Email already in use")
  }}
/>

<Story
  name="Snippet Content"
  asChild
  play={async ({ canvas }) => {
    // Without a message prop, slot content renders instead.
    await expect(canvas.getByRole("alert")).toHaveTextContent("Passwords do not match")
  }}
>
  <InvalidState>
    Passwords do not match
  </InvalidState>
</Story>

<script module>
import { defineMeta } from "@storybook/addon-svelte-csf"
import { expect, userEvent, waitFor } from "storybook/test"
import Form from "$lib/components/Form/Form.svelte"
import FormField from "$lib/components/Form/FormField.svelte"
import TextInput from "$lib/components/Form/TextInput.svelte"
import Button from "$lib/components/Button/Button.svelte"

const { Story } = defineMeta({
  title: "Form/Form",
  component: Form,
  tags: ["autodocs"],
  argTypes: {
    layout: { control: { type: "select" }, options: ["vertical", "horizontal"] },
    disabled: { control: "boolean" },
    loading: { control: "boolean" },
    validate: { control: "boolean" },
  },
  args: { layout: "vertical" },
})

let submittedData = null

function recordSubmit(event) {
  submittedData = event.detail.data
}
</script>

<Story
  name="Validation and Submit"
  args={{ onsubmit: recordSubmit }}
  play={async ({ canvas }) => {
    submittedData = null
    // Filling the required field and submitting fires onsubmit with the data.
    const input = canvas.getByRole("textbox", { name: /full name/i })
    await expect(input).toBeRequired()
    await userEvent.type(input, "Ada Lovelace")
    await userEvent.click(canvas.getByRole("button", { name: "Submit" }))
    await waitFor(() => {
      expect(submittedData).not.toBeNull()
    })
    await expect(submittedData?.fullName).toBe("Ada Lovelace")
  }}
>
  <FormField label="Full Name" name="fullName" required>
    <TextInput name="fullName" required placeholder="Ada Lovelace" />
  </FormField>
  <Button type="submit" variant="primary">Submit</Button>
</Story>

<Story
  name="Horizontal Layout"
  args={{ layout: "horizontal", onsubmit: recordSubmit }}
  play={async ({ canvas }) => {
    submittedData = null
    // Horizontal layout renders labels beside controls; the form still submits.
    const input = canvas.getByRole("textbox", { name: /email/i })
    await userEvent.type(input, "ada@example.com")
    await userEvent.click(canvas.getByRole("button", { name: "Submit" }))
    await waitFor(() => {
      expect(submittedData?.email).toBe("ada@example.com")
    })
  }}
>
  <FormField label="Email" name="email" required>
    <TextInput type="email" name="email" required placeholder="ada@example.com" />
  </FormField>
  <div class="flex justify-end">
    <Button type="submit" variant="primary">Submit</Button>
  </div>
</Story>

<Story
  name="Disabled"
  args={{ disabled: true, onsubmit: recordSubmit }}
  play={async ({ canvas }) => {
    // The disabled form still renders its fields but inputs are disabled.
    await expect(canvas.getByRole("textbox")).toBeDisabled()
  }}
>
  <FormField label="Full Name" name="fullName" required>
    <TextInput name="fullName" />
  </FormField>
  <Button type="submit" variant="primary">Submit</Button>
</Story>

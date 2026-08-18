<script module>
import { defineMeta } from "@storybook/addon-svelte-csf"
import { expect, userEvent } from "storybook/test"
import FormField from "$lib/components/Form/FormField.svelte"
import InputSwitch from "$lib/components/Form/InputSwitch.svelte"

const { Story } = defineMeta({
  title: "Form/InputSwitch",
  component: InputSwitch,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    checked: { control: "boolean" },
    required: { control: "boolean" },
    disabled: { control: "boolean" },
    name: { control: "text" },
    ariaLabel: { control: "text" },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
  },
  args: {
    checked: false,
    required: false,
    disabled: false,
    size: "md",
  },
})
</script>

<Story
  name="Default"
  args={{ label: "Enable notifications" }}
  play={async ({ canvas }) => {
    // A click on the visible label toggles the sr-only native checkbox, and
    // the internal state is not reverted by the prop-sync effect.
    const switchInput = canvas.getByRole("checkbox", { name: "Enable notifications" })
    await expect(switchInput).not.toBeChecked()
    await userEvent.click(canvas.getByText("Enable notifications"))
    await expect(switchInput).toBeChecked()
    await userEvent.click(canvas.getByText("Enable notifications"))
    await expect(switchInput).not.toBeChecked()
  }}
/>

<Story
  name="Checked"
  args={{ label: "Dark mode", checked: true }}
  play={async ({ canvas }) => {
    // checked={true} must render checked on mount (regression: the initial
    // value used to be ignored).
    await expect(canvas.getByRole("checkbox", { name: "Dark mode" })).toBeChecked()
  }}
/>

<Story name="Sizes">
  <div class="flex flex-col gap-4">
    <InputSwitch label="Small" size="sm" />
    <InputSwitch label="Medium (default)" size="md" />
    <InputSwitch label="Large" size="lg" />
  </div>
</Story>

<Story name="Disabled" args={{ label: "Disabled switch", disabled: true }} />

<Story
  name="Disabled Checked"
  args={{ label: "Disabled (on)", disabled: true, checked: true }}
/>

<Story name="Required" args={{ label: "I agree to the terms", required: true }} />

<Story name="Without Label">
  <div class="flex items-center gap-2">
    <span>Airplane mode</span>
    <InputSwitch ariaLabel="Toggle airplane mode" />
  </div>
</Story>

<Story name="In Form Field">
  <FormField label="Notification settings">
    <div class="flex flex-col gap-2">
      <InputSwitch label="Email notifications" name="email_notifications" />
      <InputSwitch label="SMS notifications" name="sms_notifications" />
      <InputSwitch label="Push notifications" name="push_notifications" />
    </div>
  </FormField>
</Story>

import Checkbox from "../lib/components/Form/Checkbox.svelte"

export default {
  title: "Components/Form/Checkbox",
  component: Checkbox,
  argTypes: {
    label: { control: "text" },
    description: { control: "text" },
    checked: { control: "boolean" },
    indeterminate: { control: "boolean" },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
    error: { control: "text" },
    name: { control: "text" },
    value: { control: "text" },
  },
}

export const Default = {
  args: {
    label: "Accept terms and conditions",
  },
}

export const WithDescription = {
  args: {
    label: "Subscribe to newsletter",
    description: "Receive updates about new features and announcements",
  },
}

export const Checked = {
  args: {
    label: "Remember me",
    checked: true,
  },
}

export const Indeterminate = {
  args: {
    label: "Select all items",
    indeterminate: true,
    description: "Some items are selected",
  },
}

export const Required = {
  args: {
    label: "I agree to the terms",
    required: true,
  },
}

export const WithError = {
  args: {
    label: "Accept privacy policy",
    error: "You must accept the privacy policy",
    required: true,
  },
}

export const Disabled = {
  args: {
    label: "Unavailable option",
    disabled: true,
    description: "This option is currently unavailable",
  },
}

export const DisabledChecked = {
  args: {
    label: "Completed task",
    disabled: true,
    checked: true,
    description: "This task has been completed",
  },
}

export const WithValue = {
  args: {
    label: "Choose option",
    name: "options",
    value: "option1",
  },
}

export const Group = {
  render: () => ({
    Component: Group_,
    props: {},
  }),
}

const Group_ = {
  render: () => `
    <div class="flex flex-col gap-2">
      <Checkbox
        label="Email notifications"
        name="notifications"
        value="email"
      />
      <Checkbox
        label="SMS notifications"
        name="notifications"
        value="sms"
      />
      <Checkbox
        label="Push notifications"
        name="notifications"
        value="push"
      />
    </div>
  `,
}

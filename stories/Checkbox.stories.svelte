<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Checkbox from "../src/lib/components/Form/Checkbox.svelte";

  const { Story } = defineMeta({
    title: "Form/Checkbox",
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
  });
</script>

<Story name="Default" args={{ label: "Accept terms and conditions" }} />

<Story
  name="With Description"
  args={{
    label: "Subscribe to newsletter",
    description: "Receive updates about new features and announcements",
  }}
/>

<Story name="Checked" args={{ label: "Remember me", checked: true }} />

<Story
  name="Indeterminate"
  args={{
    label: "Select all items",
    indeterminate: true,
    description: "Some items are selected",
  }}
/>

<Story name="Required" args={{ label: "I agree to the terms", required: true }} />

<Story
  name="With Error"
  args={{
    label: "Accept privacy policy",
    error: "You must accept the privacy policy",
    required: true,
  }}
/>

<Story
  name="Disabled"
  args={{
    label: "Unavailable option",
    disabled: true,
    description: "This option is currently unavailable",
  }}
/>

<Story
  name="Disabled Checked"
  args={{
    label: "Completed task",
    disabled: true,
    checked: true,
    description: "This task has been completed",
  }}
/>

<Story
  name="With Value"
  args={{
    label: "Choose option",
    name: "options",
    value: "option1",
  }}
/>

<Story name="Group">
  <div class="flex flex-col gap-2">
    <Checkbox label="Email notifications" name="notifications" value="email" />
    <Checkbox label="SMS notifications" name="notifications" value="sms" />
    <Checkbox label="Push notifications" name="notifications" value="push" />
  </div>
</Story>

<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { expect, userEvent } from "storybook/test";
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

<Story
  name="Default"
  args={{ label: "Accept terms and conditions" }}
  play={async ({ canvas }) => {
    const input = canvas.getByRole("checkbox", { name: "Accept terms and conditions" });
    await expect(input).toBeInTheDocument();
    await expect(input).not.toBeChecked();
    await userEvent.click(input);
    await expect(input).toBeChecked();
  }}
/>

<Story
  name="With Description"
  args={{
    label: "Subscribe to newsletter",
    description: "Receive updates about new features and announcements",
  }}
  play={async ({ canvas }) => {
    const input = canvas.getByRole("checkbox", { name: "Subscribe to newsletter" });
    await expect(input).toBeInTheDocument();
    await expect(canvas.getByText("Receive updates about new features and announcements")).toBeVisible();
  }}
/>

<Story
  name="Checked"
  args={{ label: "Remember me", checked: true }}
  play={async ({ canvas }) => {
    await expect(canvas.getByRole("checkbox", { name: "Remember me" })).toBeChecked();
  }}
/>

<Story
  name="Indeterminate"
  args={{
    label: "Select all items",
    indeterminate: true,
    description: "Some items are selected",
  }}
  play={async ({ canvas }) => {
    const input = canvas.getByRole("checkbox", { name: "Select all items" });
    await expect(input).toBeInTheDocument();
    // Indeterminate is a JS-only state, not reflected in ARIA
    await expect(input).not.toBeChecked();
  }}
/>

<Story
  name="Required"
  args={{ label: "I agree to the terms", required: true }}
  play={async ({ canvas }) => {
    await expect(canvas.getByRole("checkbox", { name: "I agree to the terms" })).toHaveAttribute("required");
  }}
/>

<Story
  name="With Error"
  args={{
    label: "Accept privacy policy",
    error: "You must accept the privacy policy",
    required: true,
  }}
  play={async ({ canvas }) => {
    const input = canvas.getByRole("checkbox", { name: "Accept privacy policy" });
    await expect(input).toHaveAttribute("aria-invalid", "true");
    await expect(canvas.getByText("You must accept the privacy policy")).toBeVisible();
  }}
/>

<Story
  name="Disabled"
  args={{
    label: "Unavailable option",
    disabled: true,
    description: "This option is currently unavailable",
  }}
  play={async ({ canvas }) => {
    await expect(canvas.getByRole("checkbox", { name: "Unavailable option" })).toBeDisabled();
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
  play={async ({ canvas }) => {
    const input = canvas.getByRole("checkbox", { name: "Completed task" });
    await expect(input).toBeDisabled();
    await expect(input).toBeChecked();
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

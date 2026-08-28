<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { expect } from "storybook/test";
  import ColorPicker from "../src/lib/components/Form/ColorPicker.svelte";

  const { Story } = defineMeta({
    title: "Form/ColorPicker",
    component: ColorPicker,
    tags: ["autodocs"],
    argTypes: {
      value: { control: "text" },
      label: { control: "text" },
      disabled: { control: "boolean" },
      required: { control: "boolean" },
      error: { control: "text" },
    },
  });
</script>

<Story
  name="Default"
  args={{ label: "Color" }}
  play={async ({ canvas }) => {
    await expect(canvas.getByText("Color")).toBeInTheDocument();
    const hexInput = canvas.getByLabelText("Color hex value");
    await expect(hexInput).toBeInTheDocument();
    await expect(hexInput).toHaveValue("#000000");
  }}
/>

<Story name="With Value" args={{ label: "Color", value: "#FF0000" }} />

<Story
  name="With Error"
  args={{ label: "Color", error: "Please select a valid color" }}
  play={async ({ canvas }) => {
    const hexInput = canvas.getByLabelText("Color hex value");
    await expect(hexInput).toHaveAttribute("aria-invalid", "true");
  }}
/>

<Story
  name="Disabled"
  args={{ label: "Color", value: "#FF0000", disabled: true }}
  play={async ({ canvas }) => {
    const hexInput = canvas.getByLabelText("Color hex value");
    await expect(hexInput).toBeDisabled();
  }}
/>

<Story
  name="Custom Label"
  args={{ label: "Brand Color", value: "#6366F1" }}
/>

<Story name="Theme Colors">
  <div class="flex flex-col gap-4">
    <ColorPicker label="Primary Color" value="#6366F1" />
    <ColorPicker label="Secondary Color" value="#8B5CF6" />
    <ColorPicker label="Accent Color" value="#EC4899" />
  </div>
</Story>

<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { expect } from "storybook/test";
  import ColorPicker from "../src/lib/components/Form/ColorPicker.svelte";

  const { Story } = defineMeta({
    title: "Form/ColorPicker",
    component: ColorPicker,
    argTypes: {
      value: { control: "text" },
      format: {
        control: "select",
        options: ["hex", "rgb", "rgba", "hsl", "hsla"],
      },
      showAlpha: { control: "boolean" },
      label: { control: "text" },
      disabled: { control: "boolean" },
      error: { control: "text" },
    },
  });
</script>

<Story
  name="Default"
  args={{ label: "Color" }}
  play={async ({ canvas }) => {
    await expect(canvas.getByText("Color")).toBeInTheDocument();
    await expect(canvas.getByRole("textbox")).toBeInTheDocument();
  }}
/>

<Story name="With Value" args={{ label: "Color", value: "#FF0000" }} />

<Story
  name="Rgb Format"
  args={{ label: "Color", format: "rgb", value: "rgb(255, 0, 0)" }}
/>

<Story
  name="Rgba Format"
  args={{
    label: "Color",
    format: "rgba",
    showAlpha: true,
    value: "rgba(255, 0, 0, 0.5)",
  }}
/>

<Story
  name="Hsl Format"
  args={{ label: "Color", format: "hsl", value: "hsl(0, 100%, 50%)" }}
/>

<Story
  name="Hsla Format"
  args={{
    label: "Color",
    format: "hsla",
    showAlpha: true,
    value: "hsla(0, 100%, 50%, 0.5)",
  }}
/>

<Story
  name="With Error"
  args={{ label: "Color", error: "Please select a valid color" }}
  play={async ({ canvas }) => {
    const input = canvas.getByRole("textbox");
    await expect(input).toBeInTheDocument();
    await expect(input).toHaveAttribute("aria-invalid", "true");
  }}
/>

<Story
  name="Disabled"
  args={{ label: "Color", value: "#FF0000", disabled: true }}
  play={async ({ canvas }) => {
    await expect(canvas.getByRole("textbox")).toBeDisabled();
  }}
/>

<Story
  name="Custom Label"
  args={{ label: "Brand Color", value: "#6366F1" }}
/>

<Story name="Theme Colors">
  <div class="flex flex-col gap-4">
    <ColorPicker label="Primary Color" value="#6366F1" format="rgb" />
    <ColorPicker label="Secondary Color" value="#8B5CF6" format="rgb" />
    <ColorPicker label="Accent Color" value="#EC4899" format="rgb" />
  </div>
</Story>

<script module>
import { defineMeta } from "@storybook/addon-svelte-csf"
import { expect, fireEvent } from "storybook/test"
import Slider from "$lib/components/Form/Slider.svelte"

const { Story } = defineMeta({
  title: "Form/Slider",
  component: Slider,
  tags: ["autodocs"],
  argTypes: {
    value: { control: { type: "number", min: 0, max: 100 } },
    min: { control: { type: "number" } },
    max: { control: { type: "number" } },
    step: { control: { type: "number" } },
    disabled: { control: "boolean" },
    showValue: { control: "boolean" },
    variant: {
      control: { type: "select" },
      options: ["default", "primary", "secondary", "success", "warning", "error", "info"],
    },
  },
  args: { value: 50, min: 0, max: 100 },
})
</script>

<Story
  name="Default"
  args={{ value: 50, ariaLabel: "Volume" }}
  play={async ({ canvas }) => {
    // The slider is a native range input with an accessible name.
    const slider = canvas.getByRole("slider", { name: "Volume" })
    await expect(slider).toHaveValue("50")
    await expect(slider).toHaveAttribute("min", "0")
    await expect(slider).toHaveAttribute("max", "100")

    // Firing a change event updates the bound value.
    fireEvent.change(slider, { target: { value: "75" } })
    await expect(slider).toHaveValue("75")
  }}
/>

<Story
  name="With Value Display"
  args={{ value: 60, showValue: true, valueFormat: "{value}%", ariaLabel: "Progress" }}
  play={async ({ canvas }) => {
    // The formatted value renders beside the slider.
    await expect(canvas.getByText("60%")).toBeInTheDocument()
  }}
/>

<Story
  name="Custom Range"
  args={{ value: 25, min: 10, max: 90, step: 5, ariaLabel: "Temperature" }}
  play={async ({ canvas }) => {
    const slider = canvas.getByRole("slider", { name: "Temperature" })
    await expect(slider).toHaveAttribute("step", "5")
    await expect(slider).toHaveAttribute("min", "10")
    await expect(slider).toHaveValue("25")
  }}
/>

<Story name="Disabled" args={{ value: 40, disabled: true, ariaLabel: "Disabled slider" }} />

<Story name="Variants" asChild>
  <div class="space-y-4">
    <Slider value={40} variant="primary" ariaLabel="Primary" />
    <Slider value={50} variant="success" ariaLabel="Success" />
    <Slider value={60} variant="error" ariaLabel="Error" />
    <Slider value={70} variant="warning" ariaLabel="Warning" />
  </div>
</Story>

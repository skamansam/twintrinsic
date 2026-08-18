<script module>
import { defineMeta } from "@storybook/addon-svelte-csf"
import { expect, userEvent } from "storybook/test"
import Knob from "$lib/components/Form/Knob.svelte"

const { Story } = defineMeta({
  title: "Form/Knob",
  component: Knob,
  tags: ["autodocs"],
  argTypes: {
    value: { control: { type: "number" } },
    min: { control: { type: "number" } },
    max: { control: { type: "number" } },
    step: { control: { type: "number" } },
    size: { control: { type: "select" }, options: ["sm", "md", "lg", "xl"] },
    showValue: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: { name: "volume", value: 50, min: 0, max: 100, step: 1, ariaLabel: "Volume" },
})
</script>

<Story
  name="Default"
  play={async ({ canvas }) => {
    // The knob is exposed as an accessible slider with min/max/now.
    const slider = canvas.getByRole("slider", { name: "Volume" })
    await expect(slider).toHaveAttribute("aria-valuenow", "50")
    await expect(slider).toHaveAttribute("aria-valuemin", "0")
    await expect(slider).toHaveAttribute("aria-valuemax", "100")
  }}
/>

<Story
  name="Keyboard Control"
  play={async ({ canvas }) => {
    const slider = canvas.getByRole("slider", { name: "Volume" })
    slider.focus()
    await userEvent.keyboard("{ArrowRight}")
    await expect(slider).toHaveAttribute("aria-valuenow", "51")
    await userEvent.keyboard("{ArrowDown}")
    await expect(slider).toHaveAttribute("aria-valuenow", "50")
    await userEvent.keyboard("{Home}")
    await expect(slider).toHaveAttribute("aria-valuenow", "0")
    await userEvent.keyboard("{End}")
    await expect(slider).toHaveAttribute("aria-valuenow", "100")
  }}
/>

<Story
  name="With Value Display"
  args={{ name: "progress", value: 75, showValue: true, valueTemplate: "{value}%", ariaLabel: "Progress" }}
  play={async ({ canvas }) => {
    const slider = canvas.getByRole("slider", { name: "Progress" })
    await expect(slider).toHaveAttribute("aria-valuenow", "75")
    // The templated value renders inside the SVG.
    await expect(canvas.getByText("75%")).toBeInTheDocument()
  }}
/>

<Story
  name="With Ticks"
  args={{ name: "temperature", value: 22, min: 15, max: 30, step: 0.5, showTicks: true, ariaLabel: "Temperature" }}
  play={async ({ canvas }) => {
    const slider = canvas.getByRole("slider", { name: "Temperature" })
    await expect(slider).toHaveAttribute("aria-valuenow", "22")
    // Tick marks render as SVG lines.
    const svg = slider.querySelector("svg")
    await expect(svg?.querySelectorAll(".knob-tick").length).toBe(10)
  }}
/>

<Story
  name="Disabled"
  args={{ name: "locked", value: 10, disabled: true, ariaLabel: "Locked knob" }}
  play={async ({ canvas }) => {
    await expect(canvas.getByRole("slider", { name: "Locked knob" })).toHaveAttribute("aria-disabled", "true")
  }}
/>

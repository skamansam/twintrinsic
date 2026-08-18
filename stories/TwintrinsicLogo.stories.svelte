<script module>
import { defineMeta } from "@storybook/addon-svelte-csf"
import { expect } from "storybook/test"
import TwintrinsicLogo from "$lib/components/icons/TwintrinsicLogo.svelte"

const { Story } = defineMeta({
  title: "Utility/TwintrinsicLogo",
  component: TwintrinsicLogo,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "text" },
  },
  args: { size: "3rem" },
})
</script>

<Story
  name="Default"
  play={async ({ canvas }) => {
    // The logo renders as an SVG with an accessible label.
    const logo = canvas.getByLabelText("Twintrinsic Logo")
    await expect(logo.tagName).toBe("svg")
    await expect(logo).toHaveAttribute("width", "3rem")
    await expect(logo).toHaveAttribute("height", "3rem")
  }}
/>

<Story
  name="Small"
  args={{ size: "1.5rem" }}
  play={async ({ canvas }) => {
    const logo = canvas.getByLabelText("Twintrinsic Logo")
    await expect(logo).toHaveAttribute("width", "1.5rem")
    await expect(logo).toHaveAttribute("height", "1.5rem")
  }}
/>

<Story
  name="With Class"
  args={{ size: "4rem", class: "text-primary-500" }}
  play={async ({ canvas }) => {
    const logo = canvas.getByLabelText("Twintrinsic Logo")
    await expect(logo).toHaveClass("text-primary-500")
  }}
/>

<script module>
import { defineMeta } from "@storybook/addon-svelte-csf"
import { expect } from "storybook/test"
import LocaleSwitcher from "$lib/components/LocaleSwitcher/LocaleSwitcher.svelte"

const { Story } = defineMeta({
  title: "Utility/LocaleSwitcher",
  component: LocaleSwitcher,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: { type: "select" }, options: ["buttons", "select"] },
    locales: { control: "object" },
    ariaLabel: { control: "text" },
  },
  args: {},
})
</script>

<Story
  name="Buttons"
  play={async ({ canvas }) => {
    await expect(canvas.getByRole("button", { name: "English" })).toHaveAttribute("aria-pressed", "true");
    await expect(canvas.getByRole("button", { name: "Español" })).toHaveAttribute("aria-pressed", "false");
    await expect(canvas.getByRole("button", { name: "فارسی" })).toHaveAttribute("aria-pressed", "false");
  }}
/>

<Story
  name="Select"
  args={{ variant: "select" }}
  play={async ({ canvas }) => {
    const select = canvas.getByRole("combobox");
    await expect(select).toBeInTheDocument();
    await expect(select).toHaveValue("en");
  }}
/>

<Story
  name="Custom Locales"
  args={{ locales: ["en", "fa"] }}
  play={async ({ canvas }) => {
    await expect(canvas.getByRole("button", { name: "English" })).toBeInTheDocument();
    await expect(canvas.getByRole("button", { name: "فارسی" })).toBeInTheDocument();
    await expect(canvas.queryByRole("button", { name: "Español" })).not.toBeInTheDocument();
  }}
/>

<Story
  name="Custom Label"
  args={{ ariaLabel: "Pick a language" }}
  play={async ({ canvas }) => {
    await expect(canvas.getByRole("group", { name: "Pick a language" })).toBeInTheDocument();
  }}
/>
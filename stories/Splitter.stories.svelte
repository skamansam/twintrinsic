<script module>
import { defineMeta } from "@storybook/addon-svelte-csf"
import { expect, userEvent } from "storybook/test"
import Splitter from "$lib/components/Splitter/Splitter.svelte"
import SplitterDemo from "./SplitterDemo.svelte"

const { Story } = defineMeta({
  title: "Basic/Splitter",
  component: Splitter,
  tags: ["autodocs"],
  argTypes: {
    orientation: { control: { type: "select" }, options: ["horizontal", "vertical"] },
    initialSize: { control: { type: "number", min: 0, max: 100 } },
    minSize: { control: { type: "number", min: 0, max: 50 } },
    maxSize: { control: { type: "number", min: 50, max: 100 } },
  },
})
</script>

<Story
  name="Default"
  asChild
  play={async ({ canvas }) => {
    // The divider follows the APG window-splitter pattern: role="separator"
    // with a tab stop and aria-valuenow reflecting the split position.
    const divider = canvas.getByRole("separator", { name: "Resize panels left and right" })
    await expect(divider).toHaveAttribute("tabindex", "0")
    await expect(divider).toHaveAttribute("aria-valuenow", "50")
    await expect(canvas.getByText("Live preview")).toBeInTheDocument()

    // Arrow keys resize the split in 5% steps.
    divider.focus()
    await userEvent.keyboard("{ArrowRight}")
    await expect(divider).toHaveAttribute("aria-valuenow", "55")
    await userEvent.keyboard("{ArrowLeft}{ArrowLeft}")
    await expect(divider).toHaveAttribute("aria-valuenow", "45")
  }}
>
  <SplitterDemo />
</Story>

<Story
  name="Vertical"
  asChild
  play={async ({ canvas }) => {
    const divider = canvas.getByRole("separator", { name: "Resize panels up and down" })
    await expect(divider).toHaveAttribute("aria-orientation", "vertical")
    divider.focus()
    await userEvent.keyboard("{ArrowDown}")
    await expect(divider).toHaveAttribute("aria-valuenow", "55")
  }}
>
  <SplitterDemo orientation="vertical" initialSize={50} />
</Story>

<Story
  name="Constrained"
  asChild
  play={async ({ canvas }) => {
    const divider = canvas.getByRole("separator", { name: "Resize panels left and right" })
    // The split is clamped to the min/max range.
    divider.focus()
    for (let i = 0; i < 20; i++) {
      await userEvent.keyboard("{ArrowRight}")
    }
    await expect(divider).toHaveAttribute("aria-valuenow", "80")
    for (let i = 0; i < 20; i++) {
      await userEvent.keyboard("{ArrowLeft}")
    }
    await expect(divider).toHaveAttribute("aria-valuenow", "20")
  }}
>
  <SplitterDemo initialSize={50} minSize={20} maxSize={80} />
</Story>

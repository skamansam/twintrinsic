<script module>
import { defineMeta } from "@storybook/addon-svelte-csf"
import { expect, userEvent } from "storybook/test"
import ThemeToggle from "$lib/components/ThemeToggle/ThemeToggle.svelte"

const { Story } = defineMeta({
  title: "App/ThemeToggle",
  component: ThemeToggle,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A toggle button for switching between light and dark themes.",
      },
    },
  },
})
</script>

<Story
  name="Default"
  play={async ({ canvas }) => {
    const toggle = canvas.getByRole("checkbox");
    await expect(toggle).toBeInTheDocument();
    await expect(toggle).not.toBeChecked();
    await userEvent.click(toggle);
    await expect(toggle).toBeChecked();
  }}
>
  <div class="p-4">
    <ThemeToggle />
  </div>
</Story>

<Story name="In Header">
  <div class="p-4 bg-background border border-border rounded-lg">
    <div class="flex items-center justify-end">
      <ThemeToggle />
    </div>
  </div>
</Story>

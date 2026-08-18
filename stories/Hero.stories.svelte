<script module>
import { defineMeta } from "@storybook/addon-svelte-csf"
import { expect } from "storybook/test"
import Hero from "$lib/components/Panel/Hero/Hero.svelte"

const { Story } = defineMeta({
  title: "Basic/Hero",
  component: Hero,
  tags: ["autodocs"],
  argTypes: {
    type: { control: "text" },
  },
  args: { type: "primary" },
})
</script>

<Story
  name="Default"
  asChild
  play={async ({ canvas }) => {
    // The heading snippet renders as a level-1 heading; the body renders below.
    await expect(canvas.getByRole("heading", { level: 1, name: "Build faster with Twintrinsic" })).toBeInTheDocument()
    await expect(canvas.getByText("Accessible, semantic components for Svelte 5.")).toBeInTheDocument()
  }}
>
  <Hero type="primary">
    {#snippet heading()}
      <h1>Build faster with Twintrinsic</h1>
    {/snippet}
    <p class="text-lg">Accessible, semantic components for Svelte 5.</p>
  </Hero>
</Story>

<Story
  name="Light Background"
  asChild
  play={async ({ canvas }) => {
    await expect(canvas.getByRole("heading", { level: 1, name: "Analytics for modern teams" })).toBeInTheDocument()
  }}
>
  <Hero>
    {#snippet heading()}
      <h1>Analytics for modern teams</h1>
    {/snippet}
    <p>Understand your product and customers with dashboards that ship in minutes.</p>
  </Hero>
</Story>

<Story
  name="Without Heading"
  asChild
  play={async ({ canvas }) => {
    await expect(canvas.getByText("Start a free 14-day trial — no credit card required.")).toBeInTheDocument()
    await expect(canvas.queryByRole("heading")).not.toBeInTheDocument()
  }}
>
  <Hero type="secondary">
    <p>Start a free 14-day trial — no credit card required.</p>
  </Hero>
</Story>

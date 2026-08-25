<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { expect } from "storybook/test";
  import LazyPanel from "../src/lib/components/Panel/LazyPanel.svelte";

  const { Story } = defineMeta({
    title: "Utility/LazyPanel",
    component: LazyPanel,
    argTypes: {
      expanded: { control: "boolean" },
      disabled: { control: "boolean" },
      bordered: { control: "boolean" },
      showIcon: { control: "boolean" },
      rootMargin: { control: "text" },
      threshold: { control: "number", min: 0, max: 1, step: 0.1 },
    },
  });
</script>

<Story
  name="Default"
  play={async ({ canvas }) => {
    await expect(canvas.getByText("Billing FAQ")).toBeInTheDocument();
  }}
>
  <LazyPanel>
    {#snippet header()}Billing FAQ{/snippet}
    {#snippet loading()}
      <div class="p-4">Loading FAQ…</div>
    {/snippet}
    <div class="p-4">
      <p>How do upgrades work? Upgrades take effect immediately and are prorated.</p>
      <p class="mt-2">Scroll the FAQ list below to see more panels load lazily.</p>
    </div>
  </LazyPanel>
</Story>

<Story name="With Custom Loading">
  <LazyPanel>
    {#snippet header()}Account Settings{/snippet}
    {#snippet loading()}
      <div class="p-4 flex items-center justify-center">
        <div
          class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"
        ></div>
      </div>
    {/snippet}
    <div class="p-4">
      <p>Manage your profile, notifications, and security preferences.</p>
    </div>
  </LazyPanel>
</Story>

<Story name="Multiple With Scroll">
  <div class="space-y-4">
    {#each Array(5) as _, i}
      <LazyPanel>
        {#snippet header()}Help section {i + 1}{/snippet}
        {#snippet loading()}
          <div class="p-4">Loading section {i + 1}…</div>
        {/snippet}
        <div class="p-4">
          <p>This help article content loaded when you scrolled to it.</p>
        </div>
      </LazyPanel>
    {/each}
  </div>
</Story>

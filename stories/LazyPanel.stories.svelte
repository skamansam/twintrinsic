<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import LazyPanel from "../src/lib/components/Panel/LazyPanel.svelte";

  const { Story } = defineMeta({
    title: "Components/Panel/LazyPanel",
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

<Story name="Default">
  <LazyPanel>
    <svelte:fragment slot="header">Lazy Content</svelte:fragment>
    <svelte:fragment slot="loading">
      <div class="p-4">Loading...</div>
    </svelte:fragment>
    <div class="p-4">
      <p>This content was loaded lazily when the panel became visible.</p>
      <p>Scroll down to see more lazy panels.</p>
    </div>
  </LazyPanel>
</Story>

<Story name="With Custom Loading">
  <LazyPanel>
    <svelte:fragment slot="header">Custom Loading State</svelte:fragment>
    <svelte:fragment slot="loading">
      <div class="p-4 flex items-center justify-center">
        <div
          class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"
        ></div>
      </div>
    </svelte:fragment>
    <div class="p-4">
      <p>Content loaded!</p>
    </div>
  </LazyPanel>
</Story>

<Story name="Multiple With Scroll">
  <div class="space-y-4">
    {#each Array(5) as _, i}
      <LazyPanel>
        <svelte:fragment slot="header">Panel {i + 1}</svelte:fragment>
        <svelte:fragment slot="loading">
          <div class="p-4">Loading panel {i + 1}...</div>
        </svelte:fragment>
        <div class="p-4">
          <p>Content for panel {i + 1} has loaded!</p>
          <p>This content was loaded because you scrolled down to it.</p>
        </div>
      </LazyPanel>
    {/each}
  </div>
</Story>

<script lang="ts">
  import Splitter from "$lib/components/Splitter/Splitter.svelte"

  let {
    orientation = "horizontal",
    initialSize = 50,
    minSize = 20,
    maxSize = 80,
  }: {
    orientation?: "horizontal" | "vertical"
    initialSize?: number
    minSize?: number
    maxSize?: number
  } = $props()
</script>

<div class={orientation === "vertical" ? "h-[300px]" : ""}>
  <Splitter {orientation} {initialSize} {minSize} {maxSize}>
    {#snippet first()}
      <div class="h-40 p-4 bg-primary-100 dark:bg-primary-900 overflow-hidden">
        <p class="font-mono text-xs">
          <span class="text-primary-700 dark:text-primary-300">&lt;script&gt;</span><br />
          &nbsp;&nbsp;import&#123; Button &#125; from "twintrinsic"<br />
          &nbsp;&nbsp;let count = $state(0)<br />
          <span class="text-primary-700 dark:text-primary-300">&lt;/script&gt;</span><br /><br />
          <span class="text-primary-700 dark:text-primary-300">&lt;Button</span> onclick=&#123;&#123;&#125; =&gt; count++&#125;<span class="text-primary-700 dark:text-primary-300">&gt;</span><br />
          &nbsp;&nbsp;Count: &#123;count&#125;<br />
          <span class="text-primary-700 dark:text-primary-300">&lt;/Button&gt;</span>
        </p>
      </div>
    {/snippet}
    {#snippet second()}
      <div class="h-40 p-4 bg-secondary-100 dark:bg-secondary-900 overflow-hidden">
        <p class="text-sm font-medium">Live preview</p>
        <p class="mt-2 text-xs text-muted">The component renders here as you edit the code on the left.</p>
      </div>
    {/snippet}
  </Splitter>
</div>

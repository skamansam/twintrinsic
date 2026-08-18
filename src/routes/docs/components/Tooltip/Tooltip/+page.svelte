<script lang="ts">
import Button from "$lib/components/Button/Button.svelte"
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
import Container from "$lib/components/Container/Container.svelte"
import Tooltip from "$lib/components/Tooltip/Tooltip.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as TooltipModule from "$lib/components/Tooltip/Tooltip.svelte"
</script>
<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>
<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>Tooltip</h1>
  
  <p>
    The Tooltip component displays additional information when users hover over or focus on an element.
    It provides accessible tooltips with customizable positioning and styling.
  </p>

  <h2>Usage</h2>

  <h3>Save Action</h3>
  <div class="p-4 bg-surface rounded-md mb-4" data-testid="tooltip-basic">
    <Tooltip content="Save changes to your profile">
      <Button>Save</Button>
    </Tooltip>
  </div>

  <CodeBlock language="svelte">{`<Tooltip content="Save changes to your profile">
  <Button>Save</Button>
</Tooltip>`}</CodeBlock>

  <h3>Tooltip Positions</h3>
  <div class="flex gap-4 p-4 bg-surface rounded-md mb-4" data-testid="tooltip-positions">
    <Tooltip content="Save as draft" position="top">
      <Button>Top</Button>
    </Tooltip>
    <Tooltip content="Duplicate this project" position="right">
      <Button>Right</Button>
    </Tooltip>
    <Tooltip content="Archive this document" position="bottom">
      <Button>Bottom</Button>
    </Tooltip>
    <Tooltip content="Export as PDF" position="left">
      <Button>Left</Button>
    </Tooltip>
  </div>

  <h2>Props</h2>
<PropsTable component={TooltipModule} />

  <h2>Accessibility</h2>
  <ul>
    <li>Uses <code>aria-describedby</code> to link tooltip to trigger element</li>
    <li>Keyboard accessible - shows on focus</li>
    <li>Respects <code>prefers-reduced-motion</code> for animations</li>
    <li>Proper ARIA roles and attributes</li>
  </ul>

  <h2>Best Practices</h2>
  <ul>
    <li>Keep tooltip text concise and helpful</li>
    <li>Use tooltips for supplementary information only</li>
    <li>Avoid tooltips on touch devices</li>
    <li>Position tooltips to avoid obscuring important content</li>
    <li>Ensure sufficient contrast for readability</li>
  </ul>
</Container>

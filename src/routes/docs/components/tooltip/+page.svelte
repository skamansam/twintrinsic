<style>
  @reference '$lib/twintrinsic.css';
</style>
<script lang="ts">
import Container from "$lib/components/Container/Container.svelte"
import Tooltip from "$lib/components/Tooltip/Tooltip.svelte"
import Button from "$lib/components/Button/Button.svelte"
</script>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>Tooltip</h1>
  
  <p>
    The Tooltip component displays additional information when users hover over or focus on an element.
    It provides accessible tooltips with customizable positioning and styling.
  </p>

  <h2>Usage</h2>

  <h3>Basic Tooltip</h3>
  <div class="p-4 bg-surface rounded-md mb-4">
    <Tooltip text="This is a helpful tooltip">
      <Button>Hover me</Button>
    </Tooltip>
  </div>

  <pre class="language-svelte"><code>{`<Tooltip text="This is a helpful tooltip">
  <Button>Hover me</Button>
</Tooltip>`}</code></pre>

  <h3>Tooltip Positions</h3>
  <div class="flex gap-4 p-4 bg-surface rounded-md mb-4">
    <Tooltip text="Top tooltip" position="top">
      <Button>Top</Button>
    </Tooltip>
    <Tooltip text="Right tooltip" position="right">
      <Button>Right</Button>
    </Tooltip>
    <Tooltip text="Bottom tooltip" position="bottom">
      <Button>Bottom</Button>
    </Tooltip>
    <Tooltip text="Left tooltip" position="left">
      <Button>Left</Button>
    </Tooltip>
  </div>

  <h2>Props</h2>
  <table>
    <thead>
      <tr>
        <th>Prop</th>
        <th>Type</th>
        <th>Default</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>text</code></td>
        <td><code>string</code></td>
        <td>Required</td>
        <td>Tooltip text content</td>
      </tr>
      <tr>
        <td><code>position</code></td>
        <td><code>"top" | "right" | "bottom" | "left"</code></td>
        <td><code>"top"</code></td>
        <td>Tooltip position relative to trigger</td>
      </tr>
      <tr>
        <td><code>delay</code></td>
        <td><code>number</code></td>
        <td><code>200</code></td>
        <td>Delay in milliseconds before showing tooltip</td>
      </tr>
      <tr>
        <td><code>class</code></td>
        <td><code>string</code></td>
        <td><code>""</code></td>
        <td>Additional CSS classes</td>
      </tr>
    </tbody>
  </table>

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

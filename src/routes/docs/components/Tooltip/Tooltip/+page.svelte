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
    It is built on the native <strong>Popover API</strong> (<code>popover="hint"</code>), the
    <strong><code>interestfor</code></strong> attribute (Interest Invokers API), and
    <strong>CSS Anchor Positioning</strong> for automatic placement with flip behavior.
  </p>

  <p>
    In modern browsers (Chrome 142+), this requires <strong>zero JavaScript</strong> for show/hide,
    positioning, light-dismiss, or accessibility wiring. The browser handles:
  </p>
  <ul>
    <li><strong>Top-layer rendering</strong> — the tooltip renders above all other content</li>
    <li><strong>Light-dismiss</strong> — pressing <kbd>Esc</kbd> closes the tooltip</li>
    <li><strong>Mutual exclusion</strong> — opening one hint tooltip closes others</li>
    <li><strong>ARIA wiring</strong> — <code>aria-describedby</code> (or <code>aria-details</code>) is set automatically</li>
    <li><strong>Hover persistence</strong> — users can move the pointer over the tooltip without it disappearing (WCAG 1.4.13)</li>
    <li><strong>Anchor positioning</strong> — CSS tethers the tooltip to its trigger with viewport-edge flipping</li>
  </ul>

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

  <CodeBlock language="svelte">{`<Tooltip content="Save as draft" position="top">
  <Button>Top</Button>
</Tooltip>
<Tooltip content="Duplicate this project" position="right">
  <Button>Right</Button>
</Tooltip>`}</CodeBlock>

  <h2>How It Works</h2>
  <p>
    The trigger element uses the <code>interestfor</code> attribute to reference the tooltip's ID.
    When the user hovers or focuses the trigger, the browser opens the tooltip as a
    <code>popover="hint"</code> in the top layer. CSS Anchor Positioning (<code>anchor-name</code> /
    <code>position-anchor</code> + <code>anchor()</code> functions) tethers the tooltip to the
    trigger — no <code>getBoundingClientRect()</code> or manual coordinate math.
  </p>
  <p>
    For browsers without native support, the <code>@oddbird/popover-polyfill</code>,
    <code>@oddbird/css-anchor-positioning</code>, and <code>interestfor</code> polyfills are loaded
    automatically via <code>loadPlatformPolyfills()</code>.
  </p>

  <h2>Props</h2>
<PropsTable component={TooltipModule} />

  <h2>Accessibility</h2>
  <ul>
    <li><strong>Automatic ARIA wiring</strong> — <code>interestfor</code> sets <code>aria-describedby</code> (plaintext) or <code>aria-details</code> (interactive content) on the trigger. No manual ARIA needed.</li>
    <li><strong>WCAG 1.4.13 compliant</strong> — Dismissible (Esc), hoverable (pointer can move to tooltip), persistent (stays visible until hover/focus removed)</li>
    <li><strong>Top-layer rendering</strong> — tooltip is never clipped by <code>overflow: hidden</code> ancestors</li>
    <li><strong>Mutual exclusion</strong> — <code>popover="hint"</code> auto-closes other hint popovers, preventing stacked tooltips</li>
    <li><strong>Arrow repositioning</strong> — arrow flips automatically via CSS <code>position-try-fallbacks</code></li>
  </ul>

  <h2>Best Practices</h2>
  <ul>
    <li>Keep tooltip text concise and helpful</li>
    <li>Use tooltips for supplementary information only — critical content should be visible by default</li>
    <li>Avoid tooltips on touch devices — use a popover or detail expansion instead</li>
    <li>Position tooltips to avoid obscuring important content (the CSS flips automatically near viewport edges)</li>
    <li>Ensure sufficient contrast for readability</li>
  </ul>
</Container>

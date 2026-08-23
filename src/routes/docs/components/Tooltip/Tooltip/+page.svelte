<!--
@component
Tooltip documentation page — standardized structure
-->
<script lang="ts">
import Button from "$lib/components/Button/Button.svelte"
import Container from "$lib/components/Container/Container.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
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
  Displays additional information on hover or focus. Built on the native
  <strong>Popover API</strong> (<code>popover="hint"</code>), the
  <strong><code>interestfor</code></strong> attribute, and <strong>CSS Anchor
  Positioning</strong> — requiring zero JavaScript for show/hide, positioning,
  light-dismiss, or accessibility wiring.
</p>

<h2>What, When &amp; Why</h2>

<h3>What is it?</h3>
<p>
  A popup that appears when the user hovers or focuses a trigger element. The
  tooltip renders in the top layer, is positioned automatically via CSS Anchor
  Positioning, and is light-dismissed by pressing <kbd>Esc</kbd>.
</p>

<h3>When should I use it?</h3>
<p>
  Use <code>&lt;Tooltip&gt;</code> for supplementary hints — icon labels,
  button descriptions, truncated text expansion. For rich interactive popups,
  use <code>&lt;Popover&gt;</code>. For persistent information, use
  <code>&lt;Modal&gt;</code>.
</p>

<h3>Why does it exist?</h3>
<ul>
  <li><strong>Zero JS</strong> — browser handles show/hide, positioning, and ARIA wiring.</li>
  <li><strong>Top-layer</strong> — never clipped by <code>overflow: hidden</code> ancestors.</li>
  <li><strong>WCAG 1.4.13</strong> — hoverable, dismissible, persistent (users can move to the tooltip).</li>
  <li><strong>CSS Anchor Positioning</strong> — tethers to the trigger with viewport-edge flipping.</li>
</ul>

<h3>Sources</h3>
<ul>
  <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/">WAI-ARIA APG — Tooltip</a></li>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/popover">MDN — Popover API</a></li>
  <li><a href="https://developer.chrome.com/docs/css-ui/anchor-positioning">Chrome — CSS Anchor Positioning</a></li>
  <li><a href="https://m3.material.io/components/tooltips/overview">Material Design 3 — Tooltips</a></li>
</ul>

<h2>Responsiveness</h2>
<ul>
  <li>Tooltip positions automatically adapt to viewport edges via CSS.</li>
  <li>On touch devices, tooltips are not practical — use a popover or detail expansion.</li>
</ul>

<h2>Customization</h2>
<ul>
  <li><code>position</code> — top, right, bottom, left.</li>
  <li><code>content</code> — text or HTML content.</li>
  <li>Arrow repositioning via CSS <code>position-try-fallbacks</code>.</li>
</ul>

<h2>Examples</h2>

<h3>Basic Tooltip</h3>
<ExampleTabs code={`<Tooltip content="Save changes to your profile">
  <Button>Save</Button>
</Tooltip>`}>
  <div class="p-4 bg-surface rounded-md" data-testid="tooltip-basic">
    <Tooltip content="Save changes to your profile">
      <Button>Save</Button>
    </Tooltip>
  </div>
</ExampleTabs>

<h3>Tooltip Positions</h3>
<ExampleTabs code={`<Tooltip content="Save as draft" position="top">
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
</Tooltip>`}>
  <div class="flex gap-4 p-4 bg-surface rounded-md" data-testid="tooltip-positions">
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
</ExampleTabs>

<h2>How It Works</h2>
<p>
  The trigger uses the <code>interestfor</code> attribute to reference the
  tooltip's ID. On hover/focus, the browser opens the tooltip as a
  <code>popover="hint"</code> in the top layer. CSS Anchor Positioning
  (<code>anchor-name</code> / <code>position-anchor</code> + <code>anchor()</code>
  functions) tethers the tooltip to the trigger — no <code>getBoundingClientRect()</code>
  or manual coordinate math.
</p>
<p>
  For browsers without native support, the <code>@oddbird/popover-polyfill</code>,
  <code>@oddbird/css-anchor-positioning</code>, and <code>interestfor</code>
  polyfills are loaded automatically via <code>loadPlatformPolyfills()</code>.
</p>

<h2>Props</h2>
<PropsTable component={TooltipModule} />

<h2>Accessibility</h2>
<ul>
  <li><strong>Automatic ARIA wiring</strong> — <code>interestfor</code> sets <code>aria-describedby</code> or <code>aria-details</code> on the trigger.</li>
  <li><strong>WCAG 1.4.13</strong> — Dismissible (Esc), hoverable (pointer can move to tooltip), persistent.</li>
  <li><strong>Top-layer rendering</strong> — never clipped by overflow ancestors.</li>
  <li><strong>Mutual exclusion</strong> — <code>popover="hint"</code> auto-closes other hint popovers.</li>
  <li><strong>Arrow repositioning</strong> — flips automatically via CSS <code>position-try-fallbacks</code>.</li>
</ul>

<h2>Keyboard Support</h2>
<table>
  <thead><tr><th>Key</th><th>Function</th></tr></thead>
  <tbody>
    <tr><td><kbd>Esc</kbd></td><td>Close the tooltip</td></tr>
    <tr><td><kbd>Tab</kbd></td><td>Focus the trigger (opens tooltip)</td></tr>
  </tbody>
</table>
</Container>

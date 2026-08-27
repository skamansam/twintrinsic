<!--
@component
Splitter documentation page — standardized structure
-->
<script lang="ts">
import Container from "$lib/components/Container/Container.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import Splitter from "$lib/components/Splitter/Splitter.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as SplitterModule from "$lib/components/Splitter/Splitter.svelte"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>Splitter</h1>

  <p>
    <strong>Splitter</strong> creates a resizable divider between two adjacent containers,
    allowing users to drag and adjust the width or height of each panel. It is ideal for
    layouts like code editors, file explorers, or any interface that needs flexible space
    allocation.
  </p>

  <h2>What, When &amp; Why</h2>

  <h3>What is it?</h3>
  <p>
    A two-panel layout with a draggable divider that follows the
    <a href="https://www.w3.org/WAI/ARIA/apg/patterns/windowsplitter/">W3C APG window-splitter pattern</a>.
    The divider uses <code>role="separator"</code>, <code>tabindex="0"</code>, and
    <code>aria-valuenow/min/max</code> for full keyboard and screen reader support.
  </p>

  <h3>When should I use it?</h3>
  <p>
    Use <code>&lt;Splitter&gt;</code> when users need to adjust the relative size of two
    panels: code editor + preview, file tree + content, inbox + message view. For simple
    side-by-side layouts without resizing, use CSS Grid or Flexbox.
  </p>

  <h3>Why does it exist?</h3>
  <ul>
    <li><strong>User control</strong> — let users customize their workspace layout.</li>
    <li><strong>Keyboard accessible</strong> — arrow keys for fine control, per W3C APG.</li>
    <li><strong>Persistent</strong> — <code>storageKey</code> saves the split position in localStorage.</li>
    <li><strong>Constrained</strong> — min/max size prevents panels from collapsing.</li>
  </ul>

  <h3>Sources</h3>
  <ul>
    <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/windowsplitter/">WAI-ARIA APG — Window Splitter</a></li>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range">MDN — Range input</a></li>
    <li><a href="https://m3.material.io/foundations/layout/applying-layout/window">Material Design 3 — Window</a></li>
    <li><a href="https://ant.design/components/splitter">Ant Design — Splitter</a></li>
    <li><a href="https://primer.style/components/split-page-layout">Primer — SplitPageLayout</a></li>
  </ul>

  
<h2>Twintrinsic Implementation</h2>
<ul>
    <li>WAI-ARIA window splitter pattern</li>
    <li>Keyboard: arrow keys resize, Enter resets</li>
    <li>`aria-valuenow/min/max` for position</li>
    <li>CSS `resize` for basic functionality; custom JS for precise control</li>
</ul>

<h2>Common Mistakes</h2>
<ul>
    <li>Don't use CSS `resize` alone — it doesn't support multi-panel layout</li>
    <li>Don't forget keyboard accessibility — arrow keys must work</li>
</ul>

<h2>Related Components</h2>
<p>Container, Section, Card</p>

<h2>Responsiveness</h2>
  <ul>
    <li>Fills its container's width and height.</li>
    <li>Touch targets on the divider meet 44×44 px minimum.</li>
  </ul>

  <h2>Customization</h2>
  <ul>
    <li><code>orientation</code> — <code>"horizontal"</code> (left/right) or <code>"vertical"</code> (top/bottom).</li>
    <li><code>initialSize</code> — starting percentage for the first panel.</li>
    <li><code>minSize</code> / <code>maxSize</code> — constrain the resize range.</li>
    <li><code>storageKey</code> — persist the position across sessions.</li>
  </ul>

  <h2>Examples</h2>

  <h3>Horizontal Splitter</h3>
  <ExampleTabs code={`<Splitter orientation="horizontal" initialSize={50}>
  {#snippet first()}
    <div class="p-4">Left Panel</div>
  {/snippet}
  {#snippet second()}
    <div class="p-4">Right Panel</div>
  {/snippet}
</Splitter>`}>
    <div class="border border-border rounded-md overflow-hidden" style="height: 300px;" data-testid="splitter-horizontal">
      <Splitter orientation="horizontal" initialSize={50}>
        {#snippet first()}
          <div class="bg-primary-100 dark:bg-primary-900 p-4 h-full overflow-auto">
            <h3 class="font-bold mb-2 font-mono text-sm">&lt;script&gt;</h3>
            <p class="font-mono text-xs">import&#123; Button &#125; from "twintrinsic"<br />let count = $state(0)</p>
          </div>
        {/snippet}
        {#snippet second()}
          <div class="bg-secondary-100 dark:bg-secondary-900 p-4 h-full overflow-auto">
            <h3 class="font-bold mb-2">Live preview</h3>
            <p>The component renders here as you edit the code on the left.</p>
          </div>
        {/snippet}
      </Splitter>
    </div>
  </ExampleTabs>

  <h3>Vertical Splitter</h3>
  <ExampleTabs code={`<Splitter orientation="vertical" initialSize={50}>
  {#snippet first()}
    <div class="p-4">Top content</div>
  {/snippet}
  {#snippet second()}
    <div class="p-4">Bottom content</div>
  {/snippet}
</Splitter>`}>
    <div class="border border-border rounded-md overflow-hidden" style="height: 300px;" data-testid="splitter-vertical">
      <Splitter orientation="vertical" initialSize={50}>
        {#snippet first()}
          <div class="bg-primary-100 dark:bg-primary-900 p-4 h-full overflow-auto">
            <h3 class="font-bold mb-2">Inbox</h3>
            <p>Today's emails and meeting reminders.</p>
          </div>
        {/snippet}
        {#snippet second()}
          <div class="bg-secondary-100 dark:bg-secondary-900 p-4 h-full overflow-auto">
            <h3 class="font-bold mb-2">Message preview</h3>
            <p>The selected email body appears here.</p>
          </div>
        {/snippet}
      </Splitter>
    </div>
  </ExampleTabs>

  <h2>Slots</h2>
  <table>
    <thead><tr><th>Slot</th><th>Description</th></tr></thead>
    <tbody>
      <tr><td><code>first</code></td><td>Content for the first panel (left or top)</td></tr>
      <tr><td><code>second</code></td><td>Content for the second panel (right or bottom)</td></tr>
    </tbody>
  </table>

  <h2>Props</h2>
  <PropsTable component={SplitterModule} />

  <h2>Accessibility</h2>
  <ul>
    <li>Divider uses <code>role="separator"</code> with <code>tabindex="0"</code>.</li>
    <li><code>aria-valuenow</code>, <code>aria-valuemin</code>, <code>aria-valuemax</code> for current state.</li>
    <li><code>aria-orientation</code> matches the <code>orientation</code> prop.</li>
    <li>Visual focus indicators for keyboard users.</li>
    <li>Follows the <a href="https://www.w3.org/WAI/ARIA/apg/patterns/windowsplitter/">W3C APG window-splitter pattern</a>.</li>
  </ul>

  <h2>Keyboard Support</h2>
  <table>
    <thead><tr><th>Key</th><th>Function</th></tr></thead>
    <tbody>
      <tr><td><kbd>Arrow Left</kbd> / <kbd>Arrow Up</kbd></td><td>Decrease first panel size by 5%</td></tr>
      <tr><td><kbd>Arrow Right</kbd> / <kbd>Arrow Down</kbd></td><td>Increase first panel size by 5%</td></tr>
      <tr><td><kbd>Home</kbd></td><td>Set first panel to minimum size</td></tr>
      <tr><td><kbd>End</kbd></td><td>Set first panel to maximum size</td></tr>
    </tbody>
  </table>
</Container>

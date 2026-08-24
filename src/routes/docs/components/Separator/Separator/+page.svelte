<!--
@component
Separator documentation page — standardized structure
-->
<script lang="ts">
import Container from "$lib/components/Container/Container.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import Separator from "$lib/components/Separator/Separator.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as SeparatorModule from "$lib/components/Separator/Separator.svelte"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>Separator</h1>

  <p>
    <strong>Separator</strong> creates a visual divider that can be horizontal or vertical.
    It supports optional content like text or icons and comes with different color variants.
  </p>

  <h2>What, When &amp; Why</h2>

  <h3>What is it?</h3>
  <p>
    A visual divider element that renders as a native <code>&lt;hr&gt;</code> (when empty)
    or a <code>&lt;div&gt;</code> with <code>role="separator"</code> (when it has content).
    Supports horizontal and vertical orientations with optional centered content.
  </p>

  <h3>When should I use it?</h3>
  <p>
    Use <code>&lt;Separator&gt;</code> to visually separate distinct content groups:
    between sections, in forms ("or" dividers), or between list items. For semantic
    section breaks, use <code>&lt;Section&gt;</code>.
  </p>

  <h3>Why does it exist?</h3>
  <ul>
    <li><strong>Semantic HTML</strong> — native <code>&lt;hr&gt;</code> when empty.</li>
    <li><strong>Accessible</strong> — <code>role="separator"</code> + <code>aria-orientation</code> when content is present.</li>
    <li><strong>Flexible</strong> — horizontal/vertical, text/icon content, color variants.</li>
  </ul>

  <h3>Sources</h3>
  <ul>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/hr">MDN — &lt;hr&gt;</a></li>
    <li><a href="https://www.w3.org/TR/wai-aria-1.2/#separator">WAI-ARIA — separator role</a></li>
    <li><a href="https://primer.style/components/leading">Primer — Leading</a></li>
    <li><a href="https://m3.material.io/components/divider/overview">Material Design 3 — Divider</a></li>
    <li><a href="https://ant.design/components/divider">Ant Design — Divider</a></li>
  </ul>

  <h2>Responsiveness</h2>
  <ul>
    <li>Horizontal separator fills container width.</li>
    <li>Vertical separator adapts to container height.</li>
    <li>Content centers automatically within the separator lines.</li>
  </ul>

  <h2>Customization</h2>
  <ul>
    <li><code>vertical</code> — switch to vertical orientation.</li>
    <li><code>color</code> — <code>"default"</code>, <code>"primary"</code>, <code>"success"</code>, <code>"warning"</code>, <code>"error"</code>.</li>
    <li>Default slot for text or icon content in the center.</li>
  </ul>

  <h2>Examples</h2>

  <h3>Basic Separator</h3>
  <ExampleTabs code={`<Separator />`}>
    <div data-testid="separator-basic">
      <p class="mb-4">Content above</p>
      <Separator />
      <p class="mt-4">Content below</p>
    </div>
  </ExampleTabs>

  <h3>With Text</h3>
  <ExampleTabs code={`<Separator>or</Separator>`}>
    <div class="max-w-sm" data-testid="separator-with-text">
      <Separator>or</Separator>
    </div>
  </ExampleTabs>

  <h3>Vertical Separator</h3>
  <ExampleTabs code={`<div class="h-32 flex items-center">
  <span>Left content</span>
  <Separator vertical />
  <span>Right content</span>
</div>`}>
    <div class="h-32 flex items-center" data-testid="separator-vertical">
      <span>Left content</span>
      <Separator vertical />
      <span>Right content</span>
    </div>
  </ExampleTabs>

  <h3>Color Variants</h3>
  <ExampleTabs code={`<Separator color="default">Default</Separator>
<Separator color="primary">Primary</Separator>
<Separator color="success">Success</Separator>
<Separator color="warning">Warning</Separator>
<Separator color="error">Error</Separator>`}>
    <div class="space-y-4" data-testid="separator-color-variants">
      <Separator color="default">Default</Separator>
      <Separator color="primary">Primary</Separator>
      <Separator color="success">Success</Separator>
      <Separator color="warning">Warning</Separator>
      <Separator color="error">Error</Separator>
    </div>
  </ExampleTabs>

  <h2>Slots</h2>
  <table>
    <thead><tr><th>Slot</th><th>Description</th></tr></thead>
    <tbody>
      <tr><td><code>default</code></td><td>Optional content to display in the center of the separator</td></tr>
    </tbody>
  </table>

  <h3>With Content</h3>
  <ExampleTabs code={`<Separator>Or</Separator>`}>
    <div data-testid="separator-with-icon">
      <Separator>Or</Separator>
    </div>
  </ExampleTabs>

  <h2>Props</h2>
  <PropsTable component={SeparatorModule} />

  <h2>Accessibility</h2>
  <ul>
    <li>Renders native <code>&lt;hr&gt;</code> when no content is provided.</li>
    <li>Uses <code>role="separator"</code> with <code>aria-orientation</code> when content is present.</li>
    <li>Supports custom <code>ariaLabel</code> for screen readers.</li>
  </ul>

  <h2>Keyboard Support</h2>
  <p>
    Separator is a static display element and does not require keyboard interaction.
  </p>
</Container>

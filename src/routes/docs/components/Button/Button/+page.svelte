<!--
@component
Button documentation page — standardized structure
-->
<script lang="ts">
import Button from "$lib/components/Button/Button.svelte"
import Container from "$lib/components/Container/Container.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as ButtonModule from "$lib/components/Button/Button.svelte"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>Button</h1>

  <p>
    <strong>Button</strong> is a versatile interactive element that provides consistent
    styling, accessibility features, and various states. It can be rendered as either a
    <code>&lt;button&gt;</code> or an <code>&lt;a&gt;</code> link while maintaining a
    consistent appearance.
  </p>

  <h2>What, When &amp; Why</h2>

  <h3>What is it?</h3>
  <p>
    A styled button component with multiple visual variants, sizes, and states. Renders
    as <code>&lt;button&gt;</code> by default, or <code>&lt;a&gt;</code> when <code>href</code>
    is set. Supports icons, loading states, and form association.
  </p>

  <h3>When should I use it?</h3>
  <p>
    Use <code>&lt;Button&gt;</code> for all user actions: form submissions, navigation,
    toggling state, or triggering operations. Use the <code>primary</code> variant for
    the main CTA, <code>secondary</code> for alternatives, and <code>outline</code>/
    <code>ghost</code> for less prominent actions.
  </p>

  <h3>Why does it exist?</h3>
  <ul>
    <li><strong>Consistent styling</strong> — unified look across the entire UI.</li>
    <li><strong>Accessible</strong> — native <code>&lt;button&gt;</code> with focus styles, ARIA labels, and loading indicators.</li>
    <li><strong>Versatile</strong> — button or link, with icons, loading, and form attributes.</li>
  </ul>

  <h3>Sources</h3>
  <ul>
    <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/button/">WAI-ARIA APG — Button</a></li>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button">MDN — &lt;button&gt;</a></li>
    <li><a href="https://m3.material.io/components/buttons/overview">Material Design 3 — Buttons</a></li>
    <li><a href="https://primer.style/components/button">Primer — Button</a></li>
    <li><a href="https://ant.design/components/button">Ant Design — Button</a></li>
  </ul>

  <h2>Responsiveness</h2>
  <ul>
    <li>Inline by default; use <code>fullWidth</code> for full-width buttons.</li>
    <li>Touch targets meet 44×44 px minimum across all sizes.</li>
  </ul>

  <h2>Customization</h2>
  <ul>
    <li>Variants: <code>default</code>, <code>primary</code>, <code>secondary</code>, <code>outline</code>, <code>ghost</code>, <code>link</code>.</li>
    <li>Sizes: <code>xs</code>, <code>sm</code>, <code>md</code>, <code>lg</code>, <code>xl</code>.</li>
    <li><code>icon</code> / <code>iconPosition</code> — left or right icons.</li>
    <li><code>loading</code> — spinner with "Loading" screen reader text.</li>
    <li><code>href</code> — renders as <code>&lt;a&gt;</code> instead of <code>&lt;button&gt;</code>.</li>
  </ul>

  <h2>Examples</h2>

  <h3>Variants</h3>
  <ExampleTabs code={`<Button variant="default">Default</Button>
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>`}>
    <div class="flex flex-wrap items-center gap-4" data-testid="button-variants">
      <Button variant="default">Default</Button>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  </ExampleTabs>

  <h3>Sizes</h3>
  <ExampleTabs code={`<Button size="xs">Extra Small</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>`}>
    <div class="flex flex-wrap items-center gap-4" data-testid="button-sizes">
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </div>
  </ExampleTabs>

  <h3>States</h3>
  <ExampleTabs code={`<Button disabled>Disabled</Button>
<Button loading>Loading</Button>
<Button fullWidth>Full Width Button</Button>`}>
    <div class="flex flex-wrap items-center gap-4" data-testid="button-states">
      <Button disabled>Disabled</Button>
      <Button loading>Loading</Button>
      <Button fullWidth>Full Width Button</Button>
    </div>
  </ExampleTabs>

  <h3>Link Buttons</h3>
  <ExampleTabs code={`<Button href="/docs">Link Button</Button>
<Button href="https://example.com" target="_blank" variant="primary">External Link</Button>`}>
    <div class="flex flex-wrap items-center gap-4" data-testid="button-link">
      <Button href="/docs">Link Button</Button>
      <Button href="https://example.com" target="_blank" variant="primary">External Link</Button>
    </div>
  </ExampleTabs>

  <h2>Props</h2>
  <PropsTable component={ButtonModule} />

  <h2>Events</h2>
  <EventsTable component={ButtonModule} />

  <h2>Accessibility</h2>
  <ul>
    <li>Uses native <code>&lt;button&gt;</code> element when not a link.</li>
    <li>Uses <code>aria-disabled="true"</code> when disabled or loading.</li>
    <li>Loading state includes a visually hidden "Loading" text for screen readers.</li>
    <li>Icons are marked with <code>aria-hidden="true"</code>.</li>
    <li>Supports custom <code>ariaLabel</code> for icon-only buttons.</li>
  </ul>

  <h2>Keyboard Support</h2>
  <table>
    <thead><tr><th>Key</th><th>Function</th></tr></thead>
    <tbody>
      <tr><td><kbd>Enter</kbd> / <kbd>Space</kbd></td><td>Activate the button</td></tr>
      <tr><td><kbd>Tab</kbd></td><td>Move focus to/from the button</td></tr>
    </tbody>
  </table>
</Container>

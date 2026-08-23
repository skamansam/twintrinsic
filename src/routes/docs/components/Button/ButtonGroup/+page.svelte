<!--
@component
ButtonGroup documentation page — standardized structure
-->
<script lang="ts">
import Button from "$lib/components/Button/Button.svelte"
import ButtonGroup from "$lib/components/Button/ButtonGroup.svelte"
import Container from "$lib/components/Container/Container.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as ButtonGroupModule from "$lib/components/Button/ButtonGroup.svelte"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>ButtonGroup</h1>

  <p>
    <strong>ButtonGroup</strong> groups related Button components together with consistent
    spacing, connected corners, and shared styling. Variant and size can be set once on the
    group and are inherited by every child button.
  </p>

  <h2>What, When &amp; Why</h2>

  <h3>What is it?</h3>
  <p>
    A layout wrapper that groups buttons into a visually connected unit with shared
    variant/size inheritance and connected corners. Uses <code>role="group"</code> with
    <code>aria-label</code> for accessibility.
  </p>

  <h3>When should I use it?</h3>
  <p>
    Use <code>&lt;ButtonGroup&gt;</code> for toolbars (bold/italic/underline), pagination,
    toggle groups, or any set of related buttons that should appear visually connected.
  </p>

  <h3>Why does it exist?</h3>
  <ul>
    <li><strong>Visual grouping</strong> — connected corners and shared styling.</li>
    <li><strong>Variant inheritance</strong> — set variant/size once for all child buttons.</li>
    <li><strong>Accessible</strong> — <code>role="group"</code> with <code>aria-label</code>.</li>
  </ul>

  <h3>Sources</h3>
  <ul>
    <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/button/">WAI-ARIA APG — Button</a></li>
    <li><a href="https://m3.material.io/components/button-groups/overview">Material Design 3 — Button groups</a></li>
    <li><a href="https://primer.style/components/button-group">Primer — ButtonGroup</a></li>
    <li><a href="https://ant.design/components/button">Ant Design — Button</a></li>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/group_role">MDN — group role</a></li>
  </ul>

  <h2>Responsiveness</h2>
  <ul>
    <li>Inline by default; use <code>vertical</code> for stacked layout.</li>
    <li><code>fullWidth</code> stretches buttons to fill the container.</li>
  </ul>

  <h2>Customization</h2>
  <ul>
    <li><code>variant</code> — inherit variant to all child buttons.</li>
    <li><code>size</code> — inherit size to all child buttons.</li>
    <li><code>vertical</code> — stack buttons vertically.</li>
    <li><code>fullWidth</code> — stretch to container width.</li>
  </ul>

  <h2>Examples</h2>

  <h3>Basic Group</h3>
  <ExampleTabs code={`<ButtonGroup ariaLabel="Text alignment">
  <Button>Left</Button>
  <Button>Center</Button>
  <Button>Right</Button>
</ButtonGroup>`}>
    <div data-testid="button-group-basic">
      <ButtonGroup ariaLabel="Text alignment">
        <Button>Left</Button>
        <Button>Center</Button>
        <Button>Right</Button>
      </ButtonGroup>
    </div>
  </ExampleTabs>

  <h3>Shared Variant</h3>
  <ExampleTabs code={`<ButtonGroup ariaLabel="Pagination" variant="outline" size="sm">
  <Button>Previous</Button>
  <Button>1</Button>
  <Button>2</Button>
  <Button>3</Button>
  <Button>Next</Button>
</ButtonGroup>`}>
    <div data-testid="button-group-variant">
      <ButtonGroup ariaLabel="Pagination" variant="outline" size="sm">
        <Button>Previous</Button>
        <Button>1</Button>
        <Button>2</Button>
        <Button>3</Button>
        <Button>Next</Button>
      </ButtonGroup>
    </div>
  </ExampleTabs>

  <h3>Vertical Group</h3>
  <ExampleTabs code={`<ButtonGroup ariaLabel="File actions" vertical>
  <Button>Copy</Button>
  <Button>Move</Button>
  <Button>Delete</Button>
</ButtonGroup>`}>
    <div data-testid="button-group-vertical">
      <ButtonGroup ariaLabel="File actions" vertical>
        <Button>Copy</Button>
        <Button>Move</Button>
        <Button>Delete</Button>
      </ButtonGroup>
    </div>
  </ExampleTabs>

  <h2>Props</h2>
  <PropsTable component={ButtonGroupModule} />

  <h2>Events</h2>
  <EventsTable component={ButtonGroupModule} />

  <h2>Accessibility</h2>
  <ul>
    <li>Uses <code>role="group"</code> with an <code>aria-label</code> describing the group.</li>
    <li>Child buttons remain individually focusable and keyboard operable.</li>
    <li>Connected corners preserve a clean visual group without hiding focus.</li>
  </ul>

  <h2>Keyboard Support</h2>
  <table>
    <thead><tr><th>Key</th><th>Function</th></tr></thead>
    <tbody>
      <tr><td><kbd>Tab</kbd></td><td>Move focus between buttons in the group</td></tr>
      <tr><td><kbd>Enter</kbd> / <kbd>Space</kbd></td><td>Activate the focused button</td></tr>
    </tbody>
  </table>
</Container>

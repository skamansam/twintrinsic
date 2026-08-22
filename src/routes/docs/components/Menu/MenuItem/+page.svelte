<!--
@component
MenuItem documentation page — standardized structure
-->
<script lang="ts">
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import Menu from "$lib/components/Menu/Menu/Menu.svelte"
import MenuItem from "$lib/components/Menu/Menu/MenuItem.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as MenuItemModule from "$lib/components/Menu/Menu/MenuItem.svelte"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<h1>MenuItem</h1>

<p>
  <strong>MenuItem</strong> represents a single item within a Menu. Items can be
  links, buttons, active, disabled, or have nested submenus.
</p>

<h2>What, When &amp; Why</h2>

<h3>What is it?</h3>
<p>
  A clickable list item inside a Menu dropdown. Renders as a link (if <code>href</code>
  is set) or a button. Supports icons, dividers, and nested submenus.
</p>

<h3>When should I use it?</h3>
<p>
  Always inside a <code>&lt;Menu&gt;</code> component. Each action or navigation
  option gets its own <code>&lt;MenuItem&gt;</code>.
</p>

<h3>Why does it exist?</h3>
<ul>
  <li><strong>Semantics</strong> — <code>role="menuitem"</code> announces correctly to screen readers.</li>
  <li><strong>Consistency</strong> — shared styling, spacing, and focus behavior for all menu items.</li>
  <li><strong>Accessibility</strong> — keyboard navigation handled by the parent Menu.</li>
</ul>

<h2>Responsiveness</h2>
<ul>
  <li>Touch targets meet 44×44 px minimum.</li>
  <li>Text truncation on overflow.</li>
</ul>

<h2>Customization</h2>
<ul>
  <li>Icon via <code>icon</code> prop.</li>
  <li>Divider before item via <code>divider</code> prop.</li>
  <li>Disabled state via <code>disabled</code> prop.</li>
  <li>Active state via <code>active</code> prop.</li>
  <li>Nested submenu via <code>value</code> + <code>children</code>.</li>
</ul>

<h2>Examples</h2>

<h3>Basic Items</h3>
<ExampleTabs code={`<Menu>
  {#snippet trigger()}Options{/snippet}
  {#snippet content()}
    <MenuItem icon="edit">Edit</MenuItem>
    <MenuItem icon="copy">Copy</MenuItem>
    <MenuItem icon="trash" divider>Delete</MenuItem>
  {/snippet}
</Menu>`}>
  <div class="p-4 bg-surface rounded-md" data-testid="menuitem-basic">
    <Menu>
      {#snippet trigger()}Options{/snippet}
      {#snippet content()}
        <MenuItem>Edit</MenuItem>
        <MenuItem>Copy</MenuItem>
        <MenuItem divider>Delete</MenuItem>
      {/snippet}
    </Menu>
  </div>
</ExampleTabs>

<h2>Props</h2>
<PropsTable component={MenuItemModule} />

<h2>Accessibility</h2>
<ul>
  <li><code>role="menuitem"</code> on all items.</li>
  <li>Links use native <code>&lt;a&gt;</code>; buttons use native <code>&lt;button&gt;</code>.</li>
  <li>Disabled items use <code>aria-disabled</code>.</li>
  <li>Submenus have <code>aria-haspopup</code>.</li>
</ul>

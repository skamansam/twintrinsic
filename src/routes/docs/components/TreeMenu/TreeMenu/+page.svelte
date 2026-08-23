<!--
@component
TreeMenu documentation page — standardized structure
-->
<script lang="ts">
import type { MenuItem as TreeMenuItem } from "$lib/components/TreeMenu/TreeMenu.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import TreeMenu from "$lib/components/TreeMenu/TreeMenu.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as TreeMenuModule from "$lib/components/TreeMenu/TreeMenu.svelte"
import Container from "$lib/components/Container/Container.svelte"

const basicItems: TreeMenuItem[] = [
  { title: 'Home', icon: 'home', link: '/' },
  { title: 'About', icon: 'info', link: '/about' },
  { title: 'Settings', icon: 'settings', link: '/settings', separator: true },
]

const nestedItems: TreeMenuItem[] = [
  {
    title: 'File', icon: 'folder',
    children: [
      { label: 'New', link: '/file/new' },
      { label: 'Open', link: '/file/open' },
      { label: 'Save', link: '/file/save' },
    ],
  },
  {
    title: 'Edit', icon: 'edit',
    children: [
      { label: 'Undo', link: '/edit/undo' },
      { label: 'Redo', link: '/edit/redo' },
    ],
  },
]

const actionItems: TreeMenuItem[] = [
  {
    title: 'Actions',
    children: [
      { label: 'Create', onClick: () => alert('Create clicked') },
      { label: 'Delete', onClick: () => alert('Delete clicked') },
    ],
  },
]
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
<h1>TreeMenu</h1>

<p>
  <strong>TreeMenu</strong> renders a hierarchical menu as a tree of items.
  Supports nested menus, links, actions, icons, separators, and integration
  with the Sidebar component.
</p>

<h2>What, When &amp; Why</h2>

<h3>What is it?</h3>
<p>
  A tree-structured navigation menu where parent items expand to reveal children.
  Each item can be a link, a button action, or a text-only header.
</p>

<h3>When should I use it?</h3>
<p>
  Use <code>&lt;TreeMenu&gt;</code> for deep navigation hierarchies: admin panels,
  documentation sidebars, file explorers. For flat navigation, use a simple
  <code>&lt;nav&gt;</code> with links. For action menus, use <code>&lt;Menu&gt;</code>.
</p>

<h3>Why does it exist?</h3>
<ul>
  <li><strong>Hierarchical navigation</strong> — expand/collapse reveals nested items.</li>
  <li><strong>Sidebar integration</strong> — passes <code>items</code> directly to Sidebar.</li>
  <li><strong>Flexible</strong> — links, buttons, actions, icons, separators in one component.</li>
</ul>

<h2>Responsiveness</h2>
<ul>
  <li>Scrollable when the menu is taller than the container.</li>
  <li>Touch targets meet 44×44 px minimum.</li>
</ul>

<h2>Customization</h2>
<ul>
  <li>Item structure: <code>title</code>/<code>label</code>, <code>icon</code>, <code>link</code>, <code>onClick</code>, <code>children</code>.</li>
  <li>Separators via <code>separator: true</code>.</li>
  <li>Nested depth is unlimited.</li>
</ul>

<h2>Examples</h2>

<h3>Basic Menu</h3>
<ExampleTabs code={`const items: TreeMenuItem[] = [
  { title: 'Home', icon: 'home', link: '/' },
  { title: 'About', icon: 'info', link: '/about' },
  { title: 'Settings', icon: 'settings', link: '/settings', separator: true },
]

<TreeMenu {items} />`}>
  <div class="max-w-xs border border-border rounded-md p-2" data-testid="treemenu-basic">
    <TreeMenu items={basicItems} />
  </div>
</ExampleTabs>

<h3>Nested Items</h3>
<ExampleTabs code={`const items: TreeMenuItem[] = [
  {
    title: 'File', icon: 'folder',
    children: [
      { label: 'New', link: '/file/new' },
      { label: 'Open', link: '/file/open' },
      { label: 'Save', link: '/file/save' },
    ],
  },
]

<TreeMenu {items} />`}>
  <div class="max-w-xs border border-border rounded-md p-2" data-testid="treemenu-nested">
    <TreeMenu items={nestedItems} />
  </div>
</ExampleTabs>

<h3>With Actions</h3>
<ExampleTabs code={`const items: TreeMenuItem[] = [
  {
    title: 'Actions',
    children: [
      { label: 'Create', onClick: () => alert('Create clicked') },
      { label: 'Delete', onClick: () => alert('Delete clicked') },
    ],
  },
]

<TreeMenu {items} />`}>
  <div class="max-w-xs border border-border rounded-md p-2" data-testid="treemenu-actions">
    <TreeMenu items={actionItems} />
  </div>
</ExampleTabs>

<h2>Props</h2>
<PropsTable component={TreeMenuModule} />

<h2>MenuItem Structure</h2>
<table>
  <thead><tr><th>Property</th><th>Type</th><th>Description</th></tr></thead>
  <tbody>
    <tr><td><code>title</code></td><td><code>string</code></td><td>Main label for top-level items</td></tr>
    <tr><td><code>label</code></td><td><code>string</code></td><td>Alternative label (used in children)</td></tr>
    <tr><td><code>icon</code></td><td><code>string</code></td><td>Icon identifier</td></tr>
    <tr><td><code>link</code></td><td><code>string</code></td><td>Navigation href (renders as anchor)</td></tr>
    <tr><td><code>onClick</code></td><td><code>() =&gt; void</code></td><td>Click handler</td></tr>
    <tr><td><code>separator</code></td><td><code>boolean</code></td><td>Show separator before this item</td></tr>
    <tr><td><code>children</code></td><td><code>MenuItem[]</code></td><td>Nested menu items</td></tr>
  </tbody>
</table>

<h2>Accessibility</h2>
<ul>
  <li>Semantic HTML with proper link and button elements.</li>
  <li>Keyboard navigation (Enter to expand/collapse).</li>
  <li>ARIA labels for screen readers.</li>
  <li>Focus management for keyboard users.</li>
</ul>
</Container>

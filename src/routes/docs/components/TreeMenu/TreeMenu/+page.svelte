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
import { m } from "$lib/paraglide/messages.js"

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
<h1>{m.treemenu_heading()}</h1>

<p>
  <strong>{m.treemenu_heading()}</strong>{m.treemenu_intro_1()}
</p>

<h2>{m.sec_what_when_why()}</h2>

<h3>{m.sec_what()}</h3>
<p>{m.treemenu_what_1()}</p>

<h3>{m.sec_when()}</h3>
<p>
  {m.treemenu_when_1()}<code>&lt;TreeMenu&gt;</code>{m.treemenu_when_2()}<code>&lt;nav&gt;</code>{m.treemenu_when_3()}<code>&lt;Menu&gt;</code>{m.treemenu_when_4()}
</p>

<h3>{m.sec_why()}</h3>
<ul>
  <li><strong>{m.treemenu_why_hierarchy()}</strong>{m.treemenu_why_hierarchy_desc()}</li>
  <li><strong>{m.treemenu_why_sidebar()}</strong>{m.treemenu_why_sidebar_desc_1()}<code>items</code>{m.treemenu_why_sidebar_desc_2()}</li>
  <li><strong>{m.treemenu_why_flexible()}</strong>{m.treemenu_why_flexible_desc()}</li>
</ul>

<h2>{m.sec_implementation()}</h2>
<ul>
  <li>{m.treemenu_impl_1()}</li>
  <li>{m.treemenu_impl_2()}</li>
  <li>{m.treemenu_impl_3()}<code>role="tree"</code> / <code>role="treeitem"</code>{m.treemenu_impl_4()}</li>
  <li><code>...rest</code>{m.treemenu_impl_5()}</li>
</ul>

<h2>{m.sec_mistakes()}</h2>
<ul>
  <li>{m.treemenu_mistake_1()}</li>
  <li>{m.treemenu_mistake_2()}</li>
</ul>

<h2>{m.sec_related()}</h2>
<p>Tree, Menu, Sidebar</p>

<h2>{m.sec_responsiveness()}</h2>
<ul>
  <li>{m.treemenu_responsive_1()}</li>
  <li>{m.treemenu_responsive_2()}</li>
</ul>

<h2>{m.sec_customization()}</h2>
<ul>
  <li>{m.treemenu_custom_1_1()}<code>title</code>{m.treemenu_custom_1_2()}<code>label</code>{m.treemenu_custom_1_3()}<code>icon</code>{m.treemenu_custom_1_4()}<code>link</code>{m.treemenu_custom_1_5()}<code>onClick</code>{m.treemenu_custom_1_6()}<code>children</code>{m.treemenu_custom_1_7()}</li>
  <li>{m.treemenu_custom_2_1()}<code>separator: true</code>{m.treemenu_custom_2_2()}</li>
  <li>{m.treemenu_custom_3()}</li>
</ul>

<h2>{m.sec_examples()}</h2>

<h3>{m.treemenu_ex_basic()}</h3>
<ExampleTabs code={`const items: TreeMenuItem[] = [\n  { title: 'Home', icon: 'home', link: '/' },\n  { title: 'About', icon: 'info', link: '/about' },\n  { title: 'Settings', icon: 'settings', link: '/settings', separator: true },\n]\n\n<TreeMenu {items} />`}>
  <div class="max-w-xs border border-border rounded-md p-2" data-testid="treemenu-basic">
    <TreeMenu items={basicItems} />
  </div>
</ExampleTabs>

<h3>{m.treemenu_ex_nested()}</h3>
<ExampleTabs code={`const items: TreeMenuItem[] = [\n  {\n    title: 'File', icon: 'folder',\n    children: [\n      { label: 'New', link: '/file/new' },\n      { label: 'Open', link: '/file/open' },\n      { label: 'Save', link: '/file/save' },\n    ],\n  },\n]\n\n<TreeMenu {items} />`}>
  <div class="max-w-xs border border-border rounded-md p-2" data-testid="treemenu-nested">
    <TreeMenu items={nestedItems} />
  </div>
</ExampleTabs>

<h3>{m.treemenu_ex_actions()}</h3>
<ExampleTabs code={`const items: TreeMenuItem[] = [\n  {\n    title: 'Actions',\n    children: [\n      { label: 'Create', onClick: () => alert('Create clicked') },\n      { label: 'Delete', onClick: () => alert('Delete clicked') },\n    ],\n  },\n]\n\n<TreeMenu {items} />`}>
  <div class="max-w-xs border border-border rounded-md p-2" data-testid="treemenu-actions">
    <TreeMenu items={actionItems} />
  </div>
</ExampleTabs>

<h2>{m.sec_props()}</h2>
<PropsTable component={TreeMenuModule} />

<h2>{m.treemenu_structure_heading()}</h2>
<table>
  <thead><tr><th>{m.treemenu_th_property()}</th><th>{m.treemenu_th_type()}</th><th>{m.treemenu_th_description()}</th></tr></thead>
  <tbody>
    <tr><td><code>title</code></td><td><code>string</code></td><td>{m.treemenu_row_title()}</td></tr>
    <tr><td><code>label</code></td><td><code>string</code></td><td>{m.treemenu_row_label()}</td></tr>
    <tr><td><code>icon</code></td><td><code>string</code></td><td>{m.treemenu_row_icon()}</td></tr>
    <tr><td><code>link</code></td><td><code>string</code></td><td>{m.treemenu_row_link()}</td></tr>
    <tr><td><code>onClick</code></td><td><code>() =&gt; void</code></td><td>{m.treemenu_row_onclick()}</td></tr>
    <tr><td><code>separator</code></td><td><code>boolean</code></td><td>{m.treemenu_row_separator()}</td></tr>
    <tr><td><code>children</code></td><td><code>MenuItem[]</code></td><td>{m.treemenu_row_children()}</td></tr>
  </tbody>
</table>

<h2>{m.sec_accessibility()}</h2>
<ul>
  <li>{m.treemenu_a11y_1()}</li>
  <li>{m.treemenu_a11y_2_1()}<kbd>Enter</kbd>{m.treemenu_a11y_2_2()}</li>
  <li>{m.treemenu_a11y_3()}</li>
  <li>{m.treemenu_a11y_4()}</li>
</ul>
</Container>

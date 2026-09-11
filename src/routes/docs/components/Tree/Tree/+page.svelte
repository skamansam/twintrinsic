<!--
@component
Tree documentation page — standardized structure
-->
<script lang="ts">
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import Container from "$lib/components/Container/Container.svelte"
import Tree from "$lib/components/Tree/Tree.svelte"
import TreeNode from "$lib/components/Tree/TreeNode.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as TreeModule from "$lib/components/Tree/Tree.svelte"
import * as TreeNodeModule from "$lib/components/Tree/TreeNode.svelte"
import { m } from "$lib/paraglide/messages.js"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>{m.tree_heading()}</h1>

  <p>
    <strong>{m.tree_heading()}</strong>{m.tree_intro_1()}
  </p>

  <h2>{m.sec_what_when_why()}</h2>

  <h3>{m.sec_what()}</h3>
  <p>
    {m.tree_what_1()}<code>role="tree"</code>{m.tree_what_2()}<code>role="treeitem"</code>{m.tree_what_3()}
  </p>

  <h3>{m.sec_when()}</h3>
  <p>
    {m.tree_when_1()}<code>&lt;Tree&gt;</code>{m.tree_when_2()}
  </p>

  <h3>{m.sec_why()}</h3>
  <ul>
    <li><strong>{m.tree_why_hierarchy()}</strong>{m.tree_why_hierarchy_desc()}</li>
    <li><strong>{m.tree_why_keyboard()}</strong>{m.tree_why_keyboard_desc()}</li>
    <li><strong>{m.tree_why_selection()}</strong>{m.tree_why_selection_desc()}</li>
  </ul>

  <h3>{m.sec_sources()}</h3>
  <ul>
    <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/treeview/">WAI-ARIA APG — Tree View</a></li>
    <li><a href="https://primer.style/product/components/TreeView">Primer — TreeView</a></li>
  </ul>

<h2>{m.sec_implementation()}</h2>
<ul>
  <li><code>&lt;details&gt;</code>{m.tree_impl_1_2()}<code>&lt;summary&gt;</code>{m.tree_impl_1_3()}</li>
  <li>{m.tree_impl_2_0()}<code>role=&quot;tree&quot;</code>{m.tree_impl_2_1()}<code>role=&quot;treeitem&quot;</code>{m.tree_impl_2_2()}<code>role=&quot;group&quot;</code></li>
  <li><code>aria-expanded</code>{m.tree_impl_3_1()}<code>aria-selected</code>{m.tree_impl_3_2()}<code>aria-level</code>{m.tree_impl_3_3()}</li>
  <li>{m.tree_impl_4()}</li>
  <li><code>multiSelect</code>{m.tree_impl_5_1()}<code>selectable</code>{m.tree_impl_5_2()}</li>
</ul>

<h2>{m.sec_mistakes()}</h2>
<ul>
  <li>{m.tree_mistake_1_0()}<code>&lt;ul&gt;</code>{m.tree_mistake_1_1()}<code>role=&quot;tree&quot;</code></li>
  <li>{m.tree_mistake_2_0()}<code>aria-level</code>{m.tree_mistake_2_1()}</li>
</ul>

<h2>{m.sec_related()}</h2>
<p>{m.tree_related_1()}</p>

<h2>{m.sec_responsiveness()}</h2>
  <ul>
    <li>{m.tree_responsive_1()}</li>
    <li>{m.tree_responsive_2()}</li>
  </ul>

  <h2>{m.sec_customization()}</h2>
  <ul>
    <li>{m.tree_custom_1_0()}<code>selectable</code>{m.tree_custom_1_1()}<code>multiSelect</code>{m.tree_custom_1_2()}</li>
    <li>{m.tree_custom_2_0()}<code>showLines</code>{m.tree_custom_2_1()}</li>
    <li>{m.tree_custom_3_0()}<code>expandAll</code>{m.tree_custom_3_1()}</li>
    <li>{m.tree_custom_4()}</li>
  </ul>

  <h2>{m.sec_examples()}</h2>

  <h3>{m.tree_ex_basic()}</h3>
  <ExampleTabs code={`<Tree>
  <TreeNode label="Acme Website">
    <TreeNode label="Pages">
      <TreeNode label="Home" />
      <TreeNode label="Pricing" />
    </TreeNode>
    <TreeNode label="Blog">
      <TreeNode label="2026" />
      <TreeNode label="2025" />
    </TreeNode>
  </TreeNode>
</Tree>`}>
    <div class="max-w-md" data-testid="tree-basic">
      <Tree>
        <TreeNode label="Acme Website">
          <TreeNode label="Pages">
            <TreeNode label="Home" />
            <TreeNode label="Pricing" />
            <TreeNode label="Contact" />
          </TreeNode>
          <TreeNode label="Blog">
            <TreeNode label="2026" />
            <TreeNode label="2025" />
          </TreeNode>
          <TreeNode label="Assets" />
        </TreeNode>
      </Tree>
    </div>
  </ExampleTabs>

  <h3>{m.tree_ex_selectable()}</h3>
  <ExampleTabs code={`<Tree selectable>
  <TreeNode label="Projects">
    <TreeNode label="Website" />
    <TreeNode label="Mobile App" />
  </TreeNode>
</Tree>`}>
    <div class="max-w-md" data-testid="tree-selectable">
      <Tree selectable>
        <TreeNode label="Acme Website">
          <TreeNode label="Pages">
            <TreeNode label="Home" />
            <TreeNode label="Pricing" />
          </TreeNode>
          <TreeNode label="Blog" />
        </TreeNode>
      </Tree>
    </div>
  </ExampleTabs>

  <h3>{m.tree_ex_lines()}</h3>
  <ExampleTabs code={`<Tree showLines>
  <TreeNode label="Acme Website">
    <TreeNode label="Pages"><TreeNode label="Home" /><TreeNode label="Pricing" /></TreeNode>
    <TreeNode label="Blog" />
  </TreeNode>
</Tree>`}>
    <div class="max-w-md" data-testid="tree-lines">
      <Tree showLines>
        <TreeNode label="Acme Website">
          <TreeNode label="Pages"><TreeNode label="Home" /><TreeNode label="Pricing" /></TreeNode>
          <TreeNode label="Blog" />
        </TreeNode>
      </Tree>
    </div>
  </ExampleTabs>

  <h3>{m.tree_ex_expanded()}</h3>
  <p>{m.tree_expanded_note_1()}<code>expandAll</code>{m.tree_expanded_note_2()}<code>expanded</code>{m.tree_expanded_note_3()}</p>
  <ExampleTabs code={`<Tree expandAll>
  <TreeNode label="Home">
    <TreeNode label="About" />
    <TreeNode label="Contact" />
  </TreeNode>
</Tree>`}>
    <div data-testid="tree-expanded">
      <Tree expandAll>
        <TreeNode label="Home">
          <TreeNode label="About" />
          <TreeNode label="Contact" />
        </TreeNode>
      </Tree>
    </div>
  </ExampleTabs>

  <h3>{m.tree_ex_multiselect()}</h3>
  <ExampleTabs code={`<Tree multiSelect>
  <TreeNode label="Documents">
    <TreeNode label="readme.md" />
    <TreeNode label="CHANGELOG.md" />
  </TreeNode>
</Tree>`}>
    <div data-testid="tree-multiselect">
      <Tree multiSelect>
        <TreeNode label="Documents">
          <TreeNode label="readme.md" />
          <TreeNode label="CHANGELOG.md" />
        </TreeNode>
      </Tree>
    </div>
  </ExampleTabs>

  <h3>{m.tree_ex_data()}</h3>
  <p>{m.tree_data_note_1()}<code>items</code>{m.tree_data_note_2()}<code>&lt;TreeNode&gt;</code>{m.tree_data_note_3()}<code>key</code>{m.tree_data_note_4()}<code>label</code>{m.tree_data_note_5()}<code>icon</code>{m.tree_data_note_6()}<code>children</code>{m.tree_data_note_7()}<code>expanded</code>{m.tree_data_note_8()}<code>disabled</code>{m.tree_data_note_9()}</p>
  <ExampleTabs code={`<Tree expandAll items={[
  { key: 'src', label: 'src', icon: 'tabler:folder', children: [
    { key: 'lib', label: 'lib', icon: 'tabler:folder', children: [
      { key: 'index', label: 'index.ts', icon: 'tabler:file-code' },
      { key: 'utils', label: 'utils.ts', icon: 'tabler:file-code' },
    ]},
    { key: 'app', label: 'App.svelte', icon: 'tabler:brand-svelte' },
  ]},
  { key: 'pkg', label: 'package.json', icon: 'tabler:json' },
]} />`}>
    <div class="max-w-md" data-testid="tree-data-driven">
      <Tree expandAll items={[
        { key: 'src', label: 'src', icon: 'tabler:folder', children: [
          { key: 'lib', label: 'lib', icon: 'tabler:folder', children: [
            { key: 'index', label: 'index.ts', icon: 'tabler:file-code' },
            { key: 'utils', label: 'utils.ts', icon: 'tabler:file-code' },
          ]},
          { key: 'app', label: 'App.svelte', icon: 'tabler:brand-svelte' },
        ]},
        { key: 'pkg', label: 'package.json', icon: 'tabler:json' },
      ]} />
    </div>
  </ExampleTabs>

  <h3>{m.tree_ex_data_select()}</h3>
  <p>{m.tree_data_select_note_1()}<code>selectable</code>{m.tree_data_select_note_2()}<code>multiSelect</code>{m.tree_data_select_note_3()}</p>
  <ExampleTabs code={`<Tree selectable items={[
  { key: 'dashboard', label: 'Dashboard', icon: 'tabler:layout-dashboard' },
  { key: 'analytics', label: 'Analytics', icon: 'tabler:chart-bar' },
  { key: 'settings', label: 'Settings', icon: 'tabler:settings', disabled: true },
]} />`}>
    <div class="max-w-md" data-testid="tree-data-selectable">
      <Tree selectable items={[
        { key: 'dashboard', label: 'Dashboard', icon: 'tabler:layout-dashboard' },
        { key: 'analytics', label: 'Analytics', icon: 'tabler:chart-bar' },
        { key: 'settings', label: 'Settings', icon: 'tabler:settings', disabled: true },
      ]} />
    </div>
  </ExampleTabs>

  <h2>{m.sec_props()}</h2>
  <PropsTable component={TreeModule} />

  <h2>{m.tree_treenode_props_heading()}</h2>
  <PropsTable component={TreeNodeModule} />

  <h2>{m.sec_events()}</h2>
  <EventsTable component={TreeModule} />

  <h2>{m.sec_accessibility()}</h2>
  <ul>
    <li><code>role="tree"</code>{m.tree_a11y_1_1()}<code>role="treeitem"</code>{m.tree_a11y_1_2()}<code>role="group"</code>{m.tree_a11y_1_3()}</li>
    <li><code>aria-expanded</code>{m.tree_a11y_2_1()}<code>aria-selected</code>{m.tree_a11y_2_2()}<code>aria-level</code>{m.tree_a11y_2_3()}</li>
    <li>{m.tree_a11y_3()}</li>
  </ul>

  <h2>{m.sec_keyboard()}</h2>
  <table>
    <thead><tr><th>{m.sec_key()}</th><th>{m.sec_function()}</th></tr></thead>
    <tbody>
      <tr><td><kbd>Arrow Down</kbd></td><td>{m.tree_kb_1()}</td></tr>
      <tr><td><kbd>Arrow Up</kbd></td><td>{m.tree_kb_2()}</td></tr>
      <tr><td><kbd>Arrow Right</kbd></td><td>{m.tree_kb_3()}</td></tr>
      <tr><td><kbd>Arrow Left</kbd></td><td>{m.tree_kb_4()}</td></tr>
      <tr><td><kbd>Home</kbd> / <kbd>End</kbd></td><td>{m.tree_kb_5()}</td></tr>
      <tr><td><kbd>Enter</kbd> / <kbd>Space</kbd></td><td>{m.tree_kb_6()}</td></tr>
      <tr><td><kbd>*</kbd></td><td>{m.tree_kb_7()}</td></tr>
    </tbody>
  </table>
</Container>

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
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>Tree</h1>

  <p>
    <strong>Tree</strong> displays hierarchical data with expandable/collapsible
    nodes. Ideal for file explorers, org charts, category navigation, and
    document outlines.
  </p>

  <h2>What, When &amp; Why</h2>

  <h3>What is it?</h3>
  <p>
    A nested list of TreeNode elements with expand/collapse controls, selection
    modes, connecting lines, and full keyboard navigation. Uses
    <code>role="tree"</code> / <code>role="treeitem"</code>.
  </p>

  <h3>When should I use it?</h3>
  <p>
    Use <code>&lt;Tree&gt;</code> when data has a parent-child hierarchy: file
    systems, org charts, nested categories, document outlines. For flat lists,
    use a Listbox or Select.
  </p>

  <h3>Why does it exist?</h3>
  <ul>
    <li><strong>Hierarchical navigation</strong> — expand/collapse reveals nested items.</li>
    <li><strong>Keyboard</strong> — arrow keys, Home/End, Enter/Space, type-ahead.</li>
    <li><strong>Selection</strong> — single or multi-select modes.</li>
  </ul>

  <h3>Sources</h3>
  <ul>
    <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/treeview/">WAI-ARIA APG — Tree View</a></li>
    <li><a href="https://primer.style/product/components/TreeView">Primer — TreeView</a></li>
  </ul>

  
<h2>Twintrinsic Implementation</h2>
<ul>
    <li>`&lt;details&gt;` + `&lt;summary&gt;` for expand/collapse — native HTML</li>
    <li>ARIA treeview pattern: `role=&quot;tree&quot;` / `role=&quot;treeitem&quot;` / `role=&quot;group&quot;`</li>
    <li>`aria-expanded`, `aria-selected`, `aria-level` for screen readers</li>
    <li>Arrow keys: Right expands, Left collapses, Up/Down navigate siblings</li>
    <li>`multiSelect` implies `selectable` (fixed in recent commit)</li>
</ul>

<h2>Common Mistakes</h2>
<ul>
    <li>Don't use a nested `&lt;ul&gt;` without ARIA roles — tree semantics require `role=&quot;tree&quot;`</li>
    <li>Don't forget `aria-level` — screen readers need depth information</li>
</ul>

<h2>Related Components</h2>
<p>TreeMenu, Listbox, Menu</p>

<h2>Responsiveness</h2>
  <ul>
    <li>Scrollable when the tree is taller than the container.</li>
    <li>Touch targets meet 44×44 px minimum.</li>
  </ul>

  <h2>Customization</h2>
  <ul>
    <li>Selection: single (<code>selectable</code>) or multi (<code>multiSelect</code>).</li>
    <li>Connecting lines via <code>showLines</code>.</li>
    <li>Expand all by default via <code>expandAll</code>.</li>
    <li>Icons on individual TreeNodes.</li>
  </ul>

  <h2>Examples</h2>

  <h3>Basic Tree</h3>
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

  <h3>Selectable</h3>
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

  <h3>With Lines</h3>
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

  <h3>Expanded by Default</h3>
  <ExampleTabs code={`<Tree>
  <TreeNode label="Home" expanded>
    <TreeNode label="About" />
    <TreeNode label="Contact" />
  </TreeNode>
</Tree>`}>
    <div data-testid="tree-expanded">
      <Tree>
        <TreeNode label="Home" expanded>
          <TreeNode label="About" />
          <TreeNode label="Contact" />
        </TreeNode>
      </Tree>
    </div>
  </ExampleTabs>

  <h3>Multi-Select</h3>
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

  <h2>Props</h2>
  <PropsTable component={TreeModule} />

  <h2>TreeNode Props</h2>
  <PropsTable component={TreeNodeModule} />

  <h2>Events</h2>
  <EventsTable component={TreeModule} />

  <h2>Accessibility</h2>
  <ul>
    <li><code>role="tree"</code>, <code>role="treeitem"</code>, <code>role="group"</code>.</li>
    <li><code>aria-expanded</code>, <code>aria-selected</code>, <code>aria-level</code>.</li>
    <li>Arrow keys, Home/End, Enter/Space, type-ahead.</li>
  </ul>

  <h2>Keyboard Support</h2>
  <table>
    <thead><tr><th>Key</th><th>Function</th></tr></thead>
    <tbody>
      <tr><td><kbd>Arrow Down</kbd></td><td>Next visible node</td></tr>
      <tr><td><kbd>Arrow Up</kbd></td><td>Previous visible node</td></tr>
      <tr><td><kbd>Arrow Right</kbd></td><td>Expand node or move to first child</td></tr>
      <tr><td><kbd>Arrow Left</kbd></td><td>Collapse node or move to parent</td></tr>
      <tr><td><kbd>Home</kbd> / <kbd>End</kbd></td><td>First/last visible node</td></tr>
      <tr><td><kbd>Enter</kbd> / <kbd>Space</kbd></td><td>Select the focused node</td></tr>
      <tr><td><kbd>*</kbd></td><td>Expand all siblings</td></tr>
    </tbody>
  </table>
</Container>

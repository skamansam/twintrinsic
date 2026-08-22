<!--
@component
TreeNode documentation page — standardized structure
-->
<script lang="ts">
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import Container from "$lib/components/Container/Container.svelte"
import Tree from "$lib/components/Tree/Tree.svelte"
import TreeNode from "$lib/components/Tree/TreeNode.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as TreeNodeModule from "$lib/components/Tree/TreeNode.svelte"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>TreeNode</h1>

  <p>
    <strong>TreeNode</strong> is a single node inside a Tree. Renders a
    WAI-ARIA <code>treeitem</code> with expand/collapse controls, selection,
    icons, and custom labels.
  </p>

  <h2>What, When &amp; Why</h2>

  <h3>What is it?</h3>
  <p>
    A collapsible list item within a Tree. Each node can have children (nested
    TreeNodes), an icon, and custom label content.
  </p>

  <h3>When should I use it?</h3>
  <p>
    Always inside a <code>&lt;Tree&gt;</code>. Each item in the hierarchy gets
    its own TreeNode. Leaf nodes have no children; parent nodes expand/collapse.
  </p>

  <h3>Why does it exist?</h3>
  <ul>
    <li><strong>Semantics</strong> — <code>role="treeitem"</code> with <code>aria-expanded</code>.</li>
    <li><strong>Consistency</strong> — shared expand/collapse behavior and focus styling.</li>
    <li><strong>Accessibility</strong> — keyboard navigation handled by parent Tree.</li>
  </ul>

  <h2>Examples</h2>

  <h3>Basic Nodes</h3>
  <ExampleTabs code={`<Tree>
  <TreeNode label="Projects">
    <TreeNode label="Website" />
    <TreeNode label="Mobile App">
      <TreeNode label="iOS" />
      <TreeNode label="Android" />
    </TreeNode>
  </TreeNode>
</Tree>`}>
    <div class="max-w-md" data-testid="tree-node-basic">
      <Tree>
        <TreeNode label="Projects">
          <TreeNode label="Website" />
          <TreeNode label="Mobile App">
            <TreeNode label="iOS" />
            <TreeNode label="Android" />
          </TreeNode>
        </TreeNode>
      </Tree>
    </div>
  </ExampleTabs>

  <h3>Expanded and Selected</h3>
  <ExampleTabs code={`<Tree>
  <TreeNode label="Documents" expanded>
    <TreeNode label="Invoices" selected />
    <TreeNode label="Reports" />
  </TreeNode>
</Tree>`}>
    <div class="max-w-md" data-testid="tree-node-states">
      <Tree>
        <TreeNode label="Documents" expanded>
          <TreeNode label="Invoices" selected />
          <TreeNode label="Reports" />
        </TreeNode>
        <TreeNode label="Images" />
      </Tree>
    </div>
  </ExampleTabs>

  <h3>Disabled Node</h3>
  <ExampleTabs code={`<Tree selectable>
  <TreeNode label="Team">
    <TreeNode label="Alice" />
    <TreeNode label="Bob" disabled />
  </TreeNode>
</Tree>`}>
    <div class="max-w-md" data-testid="tree-node-disabled">
      <Tree selectable>
        <TreeNode label="Team">
          <TreeNode label="Alice" />
          <TreeNode label="Bob" disabled />
        </TreeNode>
      </Tree>
    </div>
  </ExampleTabs>

  <h2>Props</h2>
  <PropsTable component={TreeNodeModule} />

  <h2>Events</h2>
  <EventsTable component={TreeNodeModule} />

  <h2>Accessibility</h2>
  <ul>
    <li><code>role="treeitem"</code> with <code>aria-expanded</code>, <code>aria-selected</code>, <code>aria-disabled</code>.</li>
    <li>Expand/collapse buttons labeled for screen readers.</li>
    <li>Full keyboard navigation via parent Tree.</li>
  </ul>
</Container>

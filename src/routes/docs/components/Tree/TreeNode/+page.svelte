<script lang="ts">
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
import Container from "$lib/components/Container/Container.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import Tree from "$lib/components/Tree/Tree.svelte"
import TreeNode from "$lib/components/Tree/TreeNode.svelte"
import * as TreeNodeModule from "$lib/components/Tree/TreeNode.svelte"
</script>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>TreeNode</h1>

  <p>
    The TreeNode component represents a single node inside a
    <code>Tree</code>. It renders a WAI-ARIA <code>treeitem</code> with
    expand/collapse controls, selection, icons, and custom labels. Nodes
    receive their expand/collapse and selection behavior from the parent
    <code>Tree</code>'s context.
  </p>

  <h2>Examples</h2>

  <h3>Basic Nodes</h3>
  <div class="not-prose mb-8 max-w-md" data-testid="tree-node-basic">
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

  <CodeBlock language="svelte">{`<Tree>
  <TreeNode label="Projects">
    <TreeNode label="Website" />
    <TreeNode label="Mobile App">
      <TreeNode label="iOS" />
      <TreeNode label="Android" />
    </TreeNode>
  </TreeNode>
</Tree>`}</CodeBlock>

  <h3>Expanded and Selected Nodes</h3>
  <div class="not-prose mb-8 max-w-md" data-testid="tree-node-states">
    <Tree>
      <TreeNode label="Documents" expanded>
        <TreeNode label="Invoices" selected />
        <TreeNode label="Reports" />
      </TreeNode>
      <TreeNode label="Images" />
    </Tree>
  </div>

  <CodeBlock language="svelte">{`<Tree>
  <TreeNode label="Documents" expanded>
    <TreeNode label="Invoices" selected />
    <TreeNode label="Reports" />
  </TreeNode>
  <TreeNode label="Images" />
</Tree>`}</CodeBlock>

  <h3>With Icons</h3>
  <div class="not-prose mb-8 max-w-md" data-testid="tree-node-icons">
    <Tree>
      <TreeNode
        label="Files"
        icon='<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>'
      >
        <TreeNode
          label="Notes.txt"
          icon='<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>'
        />
      </TreeNode>
    </Tree>
  </div>

  <CodeBlock language="svelte">{`<Tree>
  <TreeNode
    label="Files"
    icon='<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>'
  >
    <TreeNode label="Notes.txt" icon="<svg ...>" />
  </TreeNode>
</Tree>`}</CodeBlock>

  <h3>Disabled Node</h3>
  <div class="not-prose mb-8 max-w-md" data-testid="tree-node-disabled">
    <Tree selectable>
      <TreeNode label="Team">
        <TreeNode label="Alice" />
        <TreeNode label="Bob" disabled />
      </TreeNode>
    </Tree>
  </div>

  <CodeBlock language="svelte">{`<Tree selectable>
  <TreeNode label="Team">
    <TreeNode label="Alice" />
    <TreeNode label="Bob" disabled />
  </TreeNode>
</Tree>`}</CodeBlock>

  <h2>TreeNode Props</h2>
  <PropsTable component={TreeNodeModule} />

  <h2>TreeNode Events</h2>
  <EventsTable component={TreeNodeModule} />

  <h2>Accessibility</h2>
  <ul>
    <li>Each node renders <code>role="treeitem"</code> with <code>aria-expanded</code>, <code>aria-selected</code>, and <code>aria-disabled</code> as applicable</li>
    <li>Expand/collapse buttons are labeled "Expand"/"Collapse" for screen readers</li>
    <li>Nodes are focusable (<code>tabindex="0"</code>) with full keyboard support: arrows to navigate, Enter/Space to select, Home/End to jump</li>
  </ul>
</Container>

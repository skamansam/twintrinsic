<!--
@component
Tree documentation page
-->
<script lang="ts">
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
import Container from "$lib/components/Container/Container.svelte"
import Tree from "$lib/components/Tree/Tree.svelte"
import TreeNode from "$lib/components/Tree/TreeNode.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as TreeModule from "$lib/components/Tree/Tree.svelte"
import * as TreeNodeModule from "$lib/components/Tree/TreeNode.svelte"
</script>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>Tree</h1>
  
  <p>
    The Tree component displays hierarchical data with expandable and collapsible nodes.
    It's ideal for file explorers, organization charts, category navigation, and other
    hierarchical data structures.
  </p>

  <h2>Examples</h2>

  <h3>Basic Tree</h3>
  <div class="not-prose mb-8 max-w-md">
    <Tree>
      <TreeNode label="Root Node">
        <TreeNode label="Child Node 1">
          <TreeNode label="Grandchild 1.1" />
          <TreeNode label="Grandchild 1.2" />
        </TreeNode>
        <TreeNode label="Child Node 2">
          <TreeNode label="Grandchild 2.1" />
          <TreeNode label="Grandchild 2.2" />
        </TreeNode>
        <TreeNode label="Child Node 3" />
      </TreeNode>
    </Tree>
  </div>

  <CodeBlock language="svelte">{`<Tree>
  <TreeNode label="Root Node">
    <TreeNode label="Child Node 1">
      <TreeNode label="Grandchild 1.1" />
      <TreeNode label="Grandchild 1.2" />
    </TreeNode>
    <TreeNode label="Child Node 2">
      <TreeNode label="Grandchild 2.1" />
      <TreeNode label="Grandchild 2.2" />
    </TreeNode>
    <TreeNode label="Child Node 3" />
  </TreeNode>
</Tree>`}</CodeBlock>

  <h3>With Icons</h3>
  <div class="not-prose mb-8 max-w-md">
    <Tree>
      <TreeNode 
        label="Documents" 
        icon='<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>'
      >
        <TreeNode 
          label="Work Files" 
          icon='<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>'
        >
          <TreeNode 
            label="Quarterly Report.pdf" 
            icon='<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>'
          />
          <TreeNode 
            label="Meeting Notes.docx" 
            icon='<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>'
          />
        </TreeNode>
      </TreeNode>
    </Tree>
  </div>

  <CodeBlock language="svelte">{`<Tree>
  <TreeNode 
    label="Documents" 
    icon='<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>'
  >
    <TreeNode 
      label="Work Files" 
      icon='<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>'
    >
      <TreeNode 
        label="Quarterly Report.pdf" 
        icon='<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>'
      />
    </TreeNode>
  </TreeNode>
</Tree>`}</CodeBlock>

  <h3>Selectable Tree</h3>
  <div class="not-prose mb-8 max-w-md">
    <Tree selectable>
      <TreeNode label="Root Node">
        <TreeNode label="Child Node 1">
          <TreeNode label="Grandchild 1.1" />
          <TreeNode label="Grandchild 1.2" />
        </TreeNode>
        <TreeNode label="Child Node 2">
          <TreeNode label="Grandchild 2.1" />
          <TreeNode label="Grandchild 2.2" />
        </TreeNode>
        <TreeNode label="Child Node 3" />
      </TreeNode>
    </Tree>
  </div>

  <CodeBlock language="svelte">{`<Tree selectable onselect={(e) => console.log(e.detail)}>
  <TreeNode label="Root Node">
    <TreeNode label="Child Node 1">
      <TreeNode label="Grandchild 1.1" />
      <TreeNode label="Grandchild 1.2" />
    </TreeNode>
    <TreeNode label="Child Node 2">
      <TreeNode label="Grandchild 2.1" />
      <TreeNode label="Grandchild 2.2" />
    </TreeNode>
    <TreeNode label="Child Node 3" />
  </TreeNode>
</Tree>`}</CodeBlock>

  <h3>Multi-Select Tree</h3>
  <div class="not-prose mb-8 max-w-md">
    <Tree selectable multiSelect>
      <TreeNode label="Root Node">
        <TreeNode label="Child Node 1">
          <TreeNode label="Grandchild 1.1" />
          <TreeNode label="Grandchild 1.2" />
        </TreeNode>
        <TreeNode label="Child Node 2">
          <TreeNode label="Grandchild 2.1" />
          <TreeNode label="Grandchild 2.2" />
        </TreeNode>
        <TreeNode label="Child Node 3" />
      </TreeNode>
    </Tree>
  </div>

  <CodeBlock language="svelte">{`<Tree selectable multiSelect onselect={(e) => console.log(e.detail)}>
  <TreeNode label="Root Node">
    <!-- Child nodes -->
  </TreeNode>
</Tree>`}</CodeBlock>

  <h3>With Connecting Lines</h3>
  <div class="not-prose mb-8 max-w-md">
    <Tree showLines>
      <TreeNode label="Root Node">
        <TreeNode label="Child Node 1">
          <TreeNode label="Grandchild 1.1" />
          <TreeNode label="Grandchild 1.2" />
        </TreeNode>
        <TreeNode label="Child Node 2">
          <TreeNode label="Grandchild 2.1" />
          <TreeNode label="Grandchild 2.2" />
        </TreeNode>
        <TreeNode label="Child Node 3" />
      </TreeNode>
    </Tree>
  </div>

  <CodeBlock language="svelte">{`<Tree showLines>
  <TreeNode label="Root Node">
    <!-- Child nodes -->
  </TreeNode>
</Tree>`}</CodeBlock>

  <h3>Expanded By Default</h3>
  <div class="not-prose mb-8 max-w-md">
    <Tree expandAll>
      <TreeNode label="Root Node">
        <TreeNode label="Child Node 1">
          <TreeNode label="Grandchild 1.1" />
          <TreeNode label="Grandchild 1.2" />
        </TreeNode>
        <TreeNode label="Child Node 2">
          <TreeNode label="Grandchild 2.1" />
          <TreeNode label="Grandchild 2.2" />
        </TreeNode>
        <TreeNode label="Child Node 3" />
      </TreeNode>
    </Tree>
  </div>

  <CodeBlock language="svelte">{`<Tree expandAll>
  <TreeNode label="Root Node">
    <!-- Child nodes -->
  </TreeNode>
</Tree>`}</CodeBlock>

  <h2>Tree Props</h2>
  <PropsTable component={TreeModule} />

  <h2>TreeNode Props</h2>
  <PropsTable component={TreeNodeModule} />

  <h2>Tree Events</h2>
  <EventsTable component={TreeModule} />

  <h2>TreeNode Events</h2>
  <EventsTable component={TreeNodeModule} />

  <h2>TreeNode Slots</h2>
  <table>
    <thead>
      <tr>
        <th>Slot</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>icon</code></td>
        <td>Custom icon content</td>
      </tr>
      <tr>
        <td><code>label</code></td>
        <td>Custom label content</td>
      </tr>
      <tr>
        <td>default</td>
        <td>Child nodes</td>
      </tr>
    </tbody>
  </table>

  <h2>Accessibility</h2>
  <p>
    The Tree component follows WAI-ARIA guidelines for tree views:
  </p>
  <ul>
    <li>Uses <code>role="tree"</code> for the tree container</li>
    <li>Uses <code>role="treeitem"</code> for each node</li>
    <li>Uses <code>role="group"</code> for child node containers</li>
    <li>Proper <code>aria-expanded</code>, <code>aria-selected</code>, and <code>aria-disabled</code> attributes</li>
    <li>Supports keyboard navigation</li>
    <li>Provides proper focus management</li>
    <li>Uses <code>aria-level</code>, <code>aria-posinset</code>, and <code>aria-setsize</code> for hierarchical information</li>
  </ul>

  <h2>Keyboard Support</h2>
  <table>
    <thead>
      <tr>
        <th>Key</th>
        <th>Function</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><kbd>Tab</kbd></td>
        <td>Moves focus to the tree</td>
      </tr>
      <tr>
        <td><kbd>Up Arrow</kbd></td>
        <td>Moves focus to the previous visible node</td>
      </tr>
      <tr>
        <td><kbd>Down Arrow</kbd></td>
        <td>Moves focus to the next visible node</td>
      </tr>
      <tr>
        <td><kbd>Left Arrow</kbd></td>
        <td>Collapses an expanded node or moves focus to the parent node</td>
      </tr>
      <tr>
        <td><kbd>Right Arrow</kbd></td>
        <td>Expands a collapsed node or moves focus to the first child node</td>
      </tr>
      <tr>
        <td><kbd>Home</kbd></td>
        <td>Moves focus to the first node</td>
      </tr>
      <tr>
        <td><kbd>End</kbd></td>
        <td>Moves focus to the last visible node</td>
      </tr>
      <tr>
        <td><kbd>Enter</kbd> or <kbd>Space</kbd></td>
        <td>Selects the focused node</td>
      </tr>
      <tr>
        <td><kbd>*</kbd></td>
        <td>Expands all siblings of the current node</td>
      </tr>
    </tbody>
  </table>
</Container>

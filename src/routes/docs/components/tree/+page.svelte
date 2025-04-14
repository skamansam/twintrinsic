<!--
@component
Tree documentation page
-->
<script>
import Container from "$lib/components/Container/Container.svelte"
import Tree from "$lib/components/Tree/Tree.svelte"
import TreeNode from "$lib/components/Tree/TreeNode.svelte"
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

  <pre class="language-svelte"><code>{`<Tree>
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
</Tree>`}</code></pre>

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

  <pre class="language-svelte"><code>{`<Tree>
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
</Tree>`}</code></pre>

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

  <pre class="language-svelte"><code>{`<Tree selectable onselect={(e) => console.log(e.detail)}>
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
</Tree>`}</code></pre>

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

  <pre class="language-svelte"><code>{`<Tree selectable multiSelect onselect={(e) => console.log(e.detail)}>
  <TreeNode label="Root Node">
    <!-- Child nodes -->
  </TreeNode>
</Tree>`}</code></pre>

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

  <pre class="language-svelte"><code>{`<Tree showLines>
  <TreeNode label="Root Node">
    <!-- Child nodes -->
  </TreeNode>
</Tree>`}</code></pre>

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

  <pre class="language-svelte"><code>{`<Tree expandAll>
  <TreeNode label="Root Node">
    <!-- Child nodes -->
  </TreeNode>
</Tree>`}</code></pre>

  <h2>Tree Props</h2>
  <table>
    <thead>
      <tr>
        <th>Prop</th>
        <th>Type</th>
        <th>Default</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>selectable</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether nodes can be selected</td>
      </tr>
      <tr>
        <td><code>multiSelect</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether multiple nodes can be selected</td>
      </tr>
      <tr>
        <td><code>showLines</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether to show connecting lines between nodes</td>
      </tr>
      <tr>
        <td><code>expandOnSelect</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether to expand nodes when selected</td>
      </tr>
      <tr>
        <td><code>expandAll</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether to expand all nodes by default</td>
      </tr>
      <tr>
        <td><code>iconSize</code></td>
        <td><code>string</code></td>
        <td><code>"md"</code></td>
        <td>Size of node icons (sm, md, lg)</td>
      </tr>
      <tr>
        <td><code>ariaLabel</code></td>
        <td><code>string</code></td>
        <td><code>"Tree"</code></td>
        <td>ARIA label for the tree</td>
      </tr>
      <tr>
        <td><code>class</code></td>
        <td><code>string</code></td>
        <td><code>""</code></td>
        <td>Additional CSS classes</td>
      </tr>
    </tbody>
  </table>

  <h2>TreeNode Props</h2>
  <table>
    <thead>
      <tr>
        <th>Prop</th>
        <th>Type</th>
        <th>Default</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>label</code></td>
        <td><code>string</code></td>
        <td><code>""</code></td>
        <td>Text label for the node</td>
      </tr>
      <tr>
        <td><code>icon</code></td>
        <td><code>string</code></td>
        <td><code>undefined</code></td>
        <td>Icon to display (HTML or SVG string)</td>
      </tr>
      <tr>
        <td><code>expanded</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether the node is expanded</td>
      </tr>
      <tr>
        <td><code>selected</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether the node is selected</td>
      </tr>
      <tr>
        <td><code>disabled</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether the node is disabled</td>
      </tr>
      <tr>
        <td><code>loading</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether the node is loading</td>
      </tr>
      <tr>
        <td><code>id</code></td>
        <td><code>string</code></td>
        <td><code>random UUID</code></td>
        <td>Unique identifier for the node</td>
      </tr>
      <tr>
        <td><code>class</code></td>
        <td><code>string</code></td>
        <td><code>""</code></td>
        <td>Additional CSS classes</td>
      </tr>
    </tbody>
  </table>

  <h2>Tree Events</h2>
  <table>
    <thead>
      <tr>
        <th>Event</th>
        <th>Detail</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>select</code></td>
        <td><code>{`{ node: TreeNode, selected: boolean, nodes: TreeNode[] }`}</code></td>
        <td>Fired when a node is selected or deselected</td>
      </tr>
      <tr>
        <td><code>expand</code></td>
        <td><code>{`{ node: TreeNode, expanded: boolean }`}</code></td>
        <td>Fired when a node is expanded or collapsed</td>
      </tr>
    </tbody>
  </table>

  <h2>TreeNode Events</h2>
  <table>
    <thead>
      <tr>
        <th>Event</th>
        <th>Detail</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>select</code></td>
        <td><code>{`{ node: TreeNode, selected: boolean }`}</code></td>
        <td>Fired when the node is selected or deselected</td>
      </tr>
      <tr>
        <td><code>expand</code></td>
        <td><code>{`{ node: TreeNode, expanded: boolean }`}</code></td>
        <td>Fired when the node is expanded or collapsed</td>
      </tr>
    </tbody>
  </table>

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

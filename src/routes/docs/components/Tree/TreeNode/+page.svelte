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
import { m } from "$lib/paraglide/messages.js"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <div class="not-prose mb-6 p-4 bg-primary-50 dark:bg-primary-950 border border-primary-200 dark:border-primary-800 rounded-lg">
    <p class="text-sm text-primary-700 dark:text-primary-300 m-0">
      <strong>{m.treenode_heading()}</strong>{m.treenode_note_1()}
      <a href="/docs/components/Tree/Tree" class="underline font-medium">Tree</a>{m.treenode_note_2()}
    </p>
  </div>

  <h1>{m.treenode_heading()}</h1>

  <p>
    <strong>{m.treenode_heading()}</strong>{m.treenode_intro_1()}<code>treeitem</code>{m.treenode_intro_2()}
  </p>

  <h2>{m.sec_what_when_why()}</h2>

  <h3>{m.sec_what()}</h3>
  <p>{m.treenode_what_1()}</p>

  <h3>{m.sec_when()}</h3>
  <p>
    {m.treenode_when_1()}<code>&lt;Tree&gt;</code>{m.treenode_when_2()}
  </p>

  <h3>{m.sec_why()}</h3>
  <ul>
    <li><strong>{m.treenode_why_semantics()}</strong>{m.treenode_why_semantics_desc_1()}<code>role="treeitem"</code>{m.treenode_why_semantics_desc_2()}<code>aria-expanded</code>{m.treenode_why_semantics_desc_3()}</li>
    <li><strong>{m.treenode_why_consistency()}</strong>{m.treenode_why_consistency_desc()}</li>
    <li><strong>{m.treenode_why_a11y()}</strong>{m.treenode_why_a11y_desc()}</li>
  </ul>

  <h2>{m.sec_examples()}</h2>

  <h3>{m.treenode_ex_basic()}</h3>
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

  <h3>{m.treenode_ex_states()}</h3>
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

  <h3>{m.treenode_ex_disabled()}</h3>
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

  <h3>{m.treenode_ex_icons()}</h3>
  <ExampleTabs code={`<TreeNode label="Folder" expanded>
  <TreeNode label="File" />
  <TreeNode label="Settings" />
</TreeNode>`}>
    <div data-testid="tree-node-icons">
      <TreeNode label="Folder" expanded>
        <TreeNode label="File" />
        <TreeNode label="Settings" />
      </TreeNode>
    </div>
  </ExampleTabs>

  <h2>{m.sec_props()}</h2>
  <PropsTable component={TreeNodeModule} />

  <h2>{m.sec_events()}</h2>
  <EventsTable component={TreeNodeModule} />

  <h2>{m.sec_accessibility()}</h2>
  <ul>
    <li><code>role="treeitem"</code>{m.treenode_a11y_1_1()}<code>aria-expanded</code>{m.treenode_a11y_1_2()}<code>aria-selected</code>{m.treenode_a11y_1_3()}<code>aria-disabled</code>{m.treenode_a11y_1_4()}</li>
    <li>{m.treenode_a11y_2()}</li>
    <li>{m.treenode_a11y_3()}</li>
  </ul>
</Container>

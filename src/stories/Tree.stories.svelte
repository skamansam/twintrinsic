<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Tree from "../lib/components/Tree/Tree.svelte";
  import TreeNode from "../lib/components/Tree/TreeNode.svelte";
  import { fn } from "@storybook/test";

  const { Story } = defineMeta({
    title: "Components/Tree",
    component: Tree,
    tags: ["autodocs"],
    argTypes: {
      selectable: { control: "boolean" },
      multiSelect: { control: "boolean" },
      showLines: { control: "boolean" },
      expandOnSelect: { control: "boolean" },
      expandAll: { control: "boolean" },
      iconSize: {
        control: { type: "select" },
        options: ["sm", "md", "lg"],
      },
    },
    args: {
      selectable: true,
      multiSelect: false,
      showLines: true,
      expandOnSelect: false,
      expandAll: false,
      iconSize: "md",
      onSelect: fn(),
      onExpand: fn(),
    },
  });

  // Sample tree data
  const fileSystemData = [
    {
      id: "1",
      label: "Project Root",
      children: [
        {
          id: "2",
          label: "src",
          children: [
            {
              id: "3",
              label: "components",
              children: [
                { id: "4", label: "Button.svelte" },
                { id: "5", label: "Input.svelte" },
                { id: "6", label: "Card.svelte" }
              ]
            },
            {
              id: "7",
              label: "routes",
              children: [
                { id: "8", label: "index.svelte" },
                { id: "9", label: "about.svelte" }
              ]
            }
          ]
        },
        {
          id: "10",
          label: "public",
          children: [
            { id: "11", label: "favicon.ico" },
            { id: "12", label: "robots.txt" }
          ]
        },
        { id: "13", label: "package.json" },
        { id: "14", label: "README.md" }
      ]
    }
  ];
</script>

<Story name="Basic">
  <div class="w-full max-w-md">
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
</Story>

<Story name="With Icons">
  <div class="w-full max-w-md">
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
        <TreeNode 
          label="Personal" 
          icon='<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>'
        >
          <TreeNode 
            label="Vacation Photos" 
            icon='<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>'
          />
        </TreeNode>
      </TreeNode>
    </Tree>
  </div>
</Story>

<Story name="Selectable">
  <div class="w-full max-w-md">
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
</Story>

<Story name="Multi-Select">
  <div class="w-full max-w-md">
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
</Story>

<Story name="File System Example">
  <div class="w-full max-w-md">
    <Tree selectable showLines expandAll>
      {#each fileSystemData as node}
        <TreeNode 
          label={node.label} 
          icon='<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>'
        >
          {#if node.children}
            {#each node.children as child}
              <TreeNode 
                label={child.label} 
                icon={child.children ? '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>' : '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>'}
              >
                {#if child.children}
                  {#each child.children as grandchild}
                    <TreeNode 
                      label={grandchild.label} 
                      icon={grandchild.children ? '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>' : '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>'}
                    />
                  {/each}
                {/if}
              </TreeNode>
            {/each}
          {/if}
        </TreeNode>
      {/each}
    </Tree>
  </div>
</Story>

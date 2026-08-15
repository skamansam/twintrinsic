<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf"
  import Menu from "$lib/components/Menu/Menu/Menu.svelte"
  import MenuItem from "$lib/components/Menu/Menu/MenuItem.svelte"

  const { Story } = defineMeta({
    title: "Components/Menu",
    component: Menu,
    tags: ["autodocs"],
    argTypes: {
      ariaLabel: { control: "text" },
      class: { control: "text" },
    },
  })
</script>

<Story name="Basic">
  <div class="p-8">
    <Menu>
      {#snippet trigger()}Open Menu{/snippet}
      {#snippet content()}
        <MenuItem>Option 1</MenuItem>
        <MenuItem>Option 2</MenuItem>
        <MenuItem>Option 3</MenuItem>
      {/snippet}
    </Menu>
  </div>
</Story>

<Story name="With Icons and Dividers">
  <div class="p-8">
    <Menu ariaLabel="File actions">
      {#snippet trigger()}Actions{/snippet}
      {#snippet content()}
        <MenuItem icon="home">Home</MenuItem>
        <MenuItem icon="settings">Settings</MenuItem>
        <MenuItem icon="info" divider>About</MenuItem>
      {/snippet}
    </Menu>
  </div>
</Story>

<Story name="With Nested Submenu">
  <!--
    Exercises the recursive self-import (`MenuItemSelf`): a parent item's
    `value.children` renders a nested submenu of `MenuItem`s from within the
    item's own markup. `initialOpen` keeps the submenu visible in Storybook;
    without it the submenu is still mounted, just hidden via CSS.
  -->
  <div class="p-8">
    <Menu ariaLabel="File menu">
      {#snippet trigger()}File{/snippet}
      {#snippet content()}
        <MenuItem icon="folder" initialOpen value={{ children: [
          { icon: "folder", children: [{ icon: "document" }, { icon: "document" }] },
          { icon: "settings" },
        ] }}>
          Projects
        </MenuItem>
        <MenuItem icon="info">About</MenuItem>
      {/snippet}
    </Menu>
  </div>
</Story>

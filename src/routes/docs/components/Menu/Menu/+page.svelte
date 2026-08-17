<script lang="ts">
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
import Container from "$lib/components/Container/Container.svelte"
import Menu from "$lib/components/Menu/Menu/Menu.svelte"
import MenuItem from "$lib/components/Menu/Menu/MenuItem.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as MenuModule from "$lib/components/Menu/Menu/Menu.svelte"
import * as MenuItemModule from "$lib/components/Menu/Menu/MenuItem.svelte"
</script>
<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>
<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>Menu</h1>
  
  <p>
    The Menu component displays a list of options or actions in a dropdown. It provides accessible menu navigation
    with keyboard support and various styling options.
  </p>

  <h2>Usage</h2>

  <h3>Basic Menu</h3>
  <div class="p-4 bg-surface rounded-md mb-4" data-testid="menu-basic">
    <Menu>
      {#snippet trigger()}Open Menu{/snippet}
      {#snippet content()}
        <MenuItem>Option 1</MenuItem>
        <MenuItem>Option 2</MenuItem>
        <MenuItem>Option 3</MenuItem>
      {/snippet}
    </Menu>
  </div>

  <CodeBlock language="svelte">{`<Menu>
  {#snippet trigger()}Open Menu{/snippet}
  {#snippet content()}
    <MenuItem>Option 1</MenuItem>
    <MenuItem>Option 2</MenuItem>
    <MenuItem>Option 3</MenuItem>
  {/snippet}
</Menu>`}</CodeBlock>

  <h3>Menu with Dividers</h3>
  <div class="p-4 bg-surface rounded-md mb-4" data-testid="menu-dividers">
    <Menu>
      {#snippet trigger()}Actions{/snippet}
      {#snippet content()}
        <MenuItem>Edit</MenuItem>
        <MenuItem>Copy</MenuItem>
        <MenuItem divider>Delete</MenuItem>
      {/snippet}
    </Menu>
  </div>

  <CodeBlock language="svelte">{`<Menu>
  {#snippet trigger()}Actions{/snippet}
  {#snippet content()}
    <MenuItem>Edit</MenuItem>
    <MenuItem>Copy</MenuItem>
    <MenuItem divider>Delete</MenuItem>
  {/snippet}
</Menu>`}</CodeBlock>

  <h3>Menu with Icons</h3>
  <div class="p-4 bg-surface rounded-md mb-4" data-testid="menu-icons">
    <Menu>
      {#snippet trigger()}More{/snippet}
      {#snippet content()}
        <MenuItem icon="edit">Edit</MenuItem>
        <MenuItem icon="copy">Copy</MenuItem>
        <MenuItem icon="trash">Delete</MenuItem>
      {/snippet}
    </Menu>
  </div>

  <h2>Props</h2>
<PropsTable component={MenuModule} />

  <h2>MenuItem Props</h2>
<PropsTable component={MenuItemModule} />

  <h2>Events</h2>
<EventsTable component={MenuModule} />

  <h2>Keyboard Navigation</h2>
  <ul>
    <li><strong>Enter/Space:</strong> Open menu or select item</li>
    <li><strong>Arrow Up/Down:</strong> Navigate menu items</li>
    <li><strong>Escape:</strong> Close menu</li>
    <li><strong>Home/End:</strong> Jump to first/last item</li>
  </ul>

  <h2>Accessibility</h2>
  <ul>
    <li>Uses <code>role="menu"</code> for the menu container</li>
    <li>Uses <code>role="menuitem"</code> for individual items</li>
    <li>Full keyboard navigation support</li>
    <li>Proper ARIA labels and attributes</li>
    <li>Focus management for keyboard users</li>
  </ul>

  <h2>Best Practices</h2>
  <ul>
    <li>Keep menu items concise and clear</li>
    <li>Use dividers to group related items</li>
    <li>Disable items that are not applicable</li>
    <li>Use icons to improve visual recognition</li>
    <li>Provide keyboard shortcuts in labels when applicable</li>
  </ul>
</Container>

<!--
@component
Menu documentation page — standardized structure
-->
<script lang="ts">
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
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
    <strong>Menu</strong> displays a list of actions or options in a dropdown panel.
    Uses <code>popover="auto"</code> for light-dismiss and top-layer stacking,
    with CSS Anchor Positioning for viewport-aware placement.
  </p>

  <h2>What, When &amp; Why</h2>

  <h3>What is it?</h3>
  <p>
    A button that opens a dropdown menu containing clickable items. Items can
    include icons, dividers, submenus, and keyboard shortcuts.
  </p>

  <h3>When should I use it?</h3>
  <p>
    Use <code>&lt;Menu&gt;</code> for action menus (edit, delete, share),
    context menus (right-click), or navigation menus (settings, account). For
    value selection from a list, use <code>&lt;Select&gt;</code> or
    <code>&lt;Listbox&gt;</code>.
  </p>

  <h3>Why does it exist?</h3>
  <ul>
    <li><strong>Popover API</strong> — light-dismiss, top-layer, and Esc-to-close with zero JS.</li>
    <li><strong>WAI-ARIA menu pattern</strong> — arrow keys, Home/End, type-ahead, focus trapping.</li>
    <li><strong>Rich content</strong> — items can have icons, descriptions, shortcuts, and submenus.</li>
  </ul>

  <h3>Sources</h3>
  <ul>
    <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/">WAI-ARIA APG — Menu Button</a></li>
    <li><a href="https://primer.style/product/components/ActionMenu">Primer — ActionMenu</a></li>
    <li><a href="https://m3.material.io/components/menus/overview">Material Design 3 — Menus</a></li>
  </ul>

  <h2>Responsiveness</h2>
  <ul>
    <li>Dropdown opens in the top layer, so it doesn't clip on overflow.</li>
    <li>Touch targets meet 44×44 px minimum.</li>
  </ul>

  <h2>Customization</h2>
  <ul>
    <li>Trigger content via <code>trigger</code> snippet.</li>
    <li>Menu content via <code>content</code> snippet.</li>
    <li>Icons, dividers, disabled items, and submenus on each MenuItem.</li>
  </ul>

  <h2>Examples</h2>

  <h3>Basic Menu</h3>
  <ExampleTabs code={`<Menu ariaLabel="Account menu">
  {#snippet trigger()}Account{/snippet}
  {#snippet content()}
    <MenuItem>Profile</MenuItem>
    <MenuItem>Billing</MenuItem>
    <MenuItem>Sign out</MenuItem>
  {/snippet}
</Menu>`}>
    <div class="p-4 bg-surface rounded-md" data-testid="menu-basic">
      <Menu ariaLabel="Account menu">
        {#snippet trigger()}Account{/snippet}
        {#snippet content()}
          <MenuItem>Profile</MenuItem>
          <MenuItem>Billing</MenuItem>
          <MenuItem>Sign out</MenuItem>
        {/snippet}
      </Menu>
    </div>
  </ExampleTabs>

  <h3>With Dividers</h3>
  <ExampleTabs code={`<Menu>
  {#snippet trigger()}Actions{/snippet}
  {#snippet content()}
    <MenuItem>Edit</MenuItem>
    <MenuItem>Copy</MenuItem>
    <MenuItem divider>Delete</MenuItem>
  {/snippet}
</Menu>`}>
    <div class="p-4 bg-surface rounded-md" data-testid="menu-dividers">
      <Menu>
        {#snippet trigger()}Actions{/snippet}
        {#snippet content()}
          <MenuItem>Edit</MenuItem>
          <MenuItem>Copy</MenuItem>
          <MenuItem divider>Delete</MenuItem>
        {/snippet}
      </Menu>
    </div>
  </ExampleTabs>

  <h2>Props</h2>
  <PropsTable component={MenuModule} />

  <h2>MenuItem Props</h2>
  <PropsTable component={MenuItemModule} />

  <h2>Events</h2>
  <EventsTable component={MenuModule} />

  <h2>Accessibility</h2>
  <ul>
    <li>Uses <code>popover="auto"</code> for light-dismiss and top-layer.</li>
    <li><code>role="menu"</code> on container, <code>role="menuitem"</code> on items.</li>
    <li>Full keyboard navigation: arrows, Home/End, Enter/Space, Escape.</li>
    <li>Focus trapping within the menu when open.</li>
  </ul>

  <h2>Keyboard Support</h2>
  <table>
    <thead><tr><th>Key</th><th>Function</th></tr></thead>
    <tbody>
      <tr><td><kbd>Enter</kbd> / <kbd>Space</kbd></td><td>Open menu or select item</td></tr>
      <tr><td><kbd>Arrow Up</kbd> / <kbd>Arrow Down</kbd></td><td>Navigate menu items</td></tr>
      <tr><td><kbd>Escape</kbd></td><td>Close menu</td></tr>
      <tr><td><kbd>Home</kbd> / <kbd>End</kbd></td><td>Jump to first/last item</td></tr>
    </tbody>
  </table>
</Container>

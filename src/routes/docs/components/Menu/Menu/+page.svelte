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
import { m } from "$lib/paraglide/messages.js"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>{m.menu_heading()}</h1>

  <p>
    <strong>{m.menu_heading()}</strong>{m.menu_intro_1()}<code>popover="auto"</code>{m.menu_intro_2()}
  </p>

  <h2>{m.sec_what_when_why()}</h2>

  <h3>{m.sec_what()}</h3>
  <p>{m.menu_what_1()}</p>

  <h3>{m.sec_when()}</h3>
  <p>
    {m.menu_when_1()}<code>&lt;Menu&gt;</code>{m.menu_when_2()}<code>&lt;Select&gt;</code>{m.menu_when_3()}<code>&lt;Listbox&gt;</code>{m.menu_when_4()}
  </p>

  <h3>{m.sec_why()}</h3>
  <ul>
    <li><strong>{m.menu_why_popover()}</strong>{m.menu_why_popover_desc()}</li>
    <li><strong>{m.menu_why_aria()}</strong>{m.menu_why_aria_desc()}</li>
    <li><strong>{m.menu_why_rich()}</strong>{m.menu_why_rich_desc()}</li>
  </ul>

  <h3>{m.sec_sources()}</h3>
  <ul>
    <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/">WAI-ARIA APG — Menu Button</a></li>
    <li><a href="https://primer.style/product/components/ActionMenu">Primer — ActionMenu</a></li>
    <li><a href="https://m3.material.io/components/menus/overview">Material Design 3 — Menus</a></li>
  </ul>

  <h2>{m.sec_implementation()}</h2>
  <ul>
    <li>{m.menu_impl_1()}<code>popover="auto"</code>{m.menu_impl_2()}</li>
    <li>{m.menu_impl_3()}</li>
    <li>{m.menu_impl_4()}<code>ArrowDown</code>/<code>ArrowUp</code>{m.menu_impl_5()}</li>
    <li>{m.menu_impl_6()}</li>
  </ul>

  <h2>{m.sec_mistakes()}</h2>
  <ul>
    <li>{m.menu_mistake_1_1()}<code>popover="auto"</code>{m.menu_mistake_1_2()}</li>
    <li>{m.menu_mistake_2_1()}<code>aria-expanded</code>{m.menu_mistake_2_2()}</li>
  </ul>

  <h2>{m.sec_related()}</h2>
  <p>Dropdown, Combobox, TreeMenu</p>

  <h2>{m.sec_responsiveness()}</h2>
  <ul>
    <li>{m.menu_responsive_1()}</li>
    <li>{m.menu_responsive_2()}</li>
  </ul>

  <h2>{m.sec_customization()}</h2>
  <ul>
    <li>{m.menu_custom_1_1()}<code>trigger</code>{m.menu_custom_1_2()}</li>
    <li>{m.menu_custom_2_1()}<code>content</code>{m.menu_custom_2_2()}</li>
    <li>{m.menu_custom_3()}</li>
  </ul>

  <h2>{m.sec_examples()}</h2>

  <h3>{m.menu_ex_datadriven()}</h3>
  <p>
    {m.menu_ex_datadriven_desc_1()}<code>&lt;MenuItem&gt;</code>{m.menu_ex_datadriven_desc_2()}
  </p>
  <ExampleTabs code={`<Menu
  ariaLabel="Actions menu"
  items={[\n    { label: 'Edit', icon: 'tabler:pencil', onClick: () => console.log('edit') },\n    { label: 'Duplicate', icon: 'tabler:copy' },\n    { label: 'Archive', disabled: true },\n    { divider: true },\n    { label: 'Delete', icon: 'tabler:trash', onClick: () => console.log('delete') }\n  ]}
>
  {#snippet trigger()}Actions{/snippet}
</Menu>`}>
    <div class="p-4 bg-surface rounded-md" data-testid="menu-data-driven">
      <Menu ariaLabel="Actions menu" items={[{ label: 'Edit', icon: 'tabler:pencil' }, { label: 'Duplicate', icon: 'tabler:copy' }, { label: 'Archive', disabled: true }, { divider: true }, { label: 'Delete', icon: 'tabler:trash' }]}>
        {#snippet trigger()}Actions{/snippet}
      </Menu>
    </div>
  </ExampleTabs>

  <h3>{m.menu_ex_basic()}</h3>
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

  <h3>{m.menu_ex_dividers()}</h3>
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

  <h3>{m.menu_ex_icons()}</h3>
  <ExampleTabs code={`<Menu>
  {#snippet trigger()}User Menu{/snippet}
  {#snippet content()}
    <MenuItem>Profile</MenuItem>
    <MenuItem>Settings</MenuItem>
    <MenuItem>Sign out</MenuItem>
  {/snippet}
</Menu>`}>
    <div class="p-4 bg-surface rounded-md" data-testid="menu-icons">
      <Menu>
        {#snippet trigger()}User Menu{/snippet}
        {#snippet content()}
          <MenuItem>Profile</MenuItem>
          <MenuItem>Settings</MenuItem>
          <MenuItem>Sign out</MenuItem>
        {/snippet}
      </Menu>
    </div>
  </ExampleTabs>

  <h2>{m.sec_props()}</h2>
  <PropsTable component={MenuModule} />

  <h2>{m.menu_props_item()}</h2>
  <PropsTable component={MenuItemModule} />

  <h2>{m.sec_events()}</h2>
  <EventsTable component={MenuModule} />

  <h2>{m.sec_accessibility()}</h2>
  <ul>
    <li>{m.menu_a11y_1_1()}<code>popover="auto"</code>{m.menu_a11y_1_2()}</li>
    <li><code>role="menu"</code>{m.menu_a11y_2_1()}<code>role="menuitem"</code>{m.menu_a11y_2_2()}</li>
    <li>{m.menu_a11y_3()}</li>
    <li>{m.menu_a11y_4()}</li>
  </ul>

  <h2>{m.sec_keyboard()}</h2>
  <table>
    <thead><tr><th>{m.sec_key()}</th><th>{m.sec_function()}</th></tr></thead>
    <tbody>
      <tr><td><kbd>Enter</kbd> / <kbd>Space</kbd></td><td>{m.menu_kb_1()}</td></tr>
      <tr><td><kbd>Arrow Up</kbd> / <kbd>Arrow Down</kbd></td><td>{m.menu_kb_2()}</td></tr>
      <tr><td><kbd>Escape</kbd></td><td>{m.menu_kb_3()}</td></tr>
      <tr><td><kbd>Home</kbd> / <kbd>End</kbd></td><td>{m.menu_kb_4()}</td></tr>
    </tbody>
  </table>
</Container>

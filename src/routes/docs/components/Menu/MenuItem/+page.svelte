<!--
@component
MenuItem documentation page — standardized structure
-->
<script lang="ts">
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import Menu from "$lib/components/Menu/Menu/Menu.svelte"
import MenuItem from "$lib/components/Menu/Menu/MenuItem.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as MenuItemModule from "$lib/components/Menu/Menu/MenuItem.svelte"
import Container from "$lib/components/Container/Container.svelte"
import { m } from "$lib/paraglide/messages.js"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <div class="not-prose mb-6 p-4 bg-primary-50 dark:bg-primary-950 border border-primary-200 dark:border-primary-800 rounded-lg">
    <p class="text-sm text-primary-700 dark:text-primary-300 m-0">
      <strong>MenuItem</strong>{m.menuitem_note_1()}
      <a href="/docs/components/Menu/Menu" class="underline font-medium">Menu</a>{m.menuitem_note_2()}
    </p>
  </div>

<h1>{m.menuitem_heading()}</h1>

<p>
  <strong>{m.menuitem_heading()}</strong>{m.menuitem_intro_1()}
</p>

<h2>{m.sec_what_when_why()}</h2>

<h3>{m.sec_what()}</h3>
<p>
  {m.menuitem_what_1()}<code>href</code>{m.menuitem_what_2()}
</p>

<h3>{m.sec_when()}</h3>
<p>
  {m.menuitem_when_1()}<code>&lt;Menu&gt;</code>{m.menuitem_when_2()}<code>&lt;MenuItem&gt;</code>{m.menuitem_when_3()}
</p>

<h3>{m.sec_why()}</h3>
<ul>
  <li><strong>{m.menuitem_why_semantics()}</strong>{m.menuitem_why_semantics_desc_1()}<code>role="menuitem"</code>{m.menuitem_why_semantics_desc_2()}</li>
  <li><strong>{m.menuitem_why_consistency()}</strong>{m.menuitem_why_consistency_desc()}</li>
  <li><strong>{m.menuitem_why_a11y()}</strong>{m.menuitem_why_a11y_desc()}</li>
</ul>

<h2>{m.sec_responsiveness()}</h2>
<ul>
  <li>{m.menuitem_responsive_1()}</li>
  <li>{m.menuitem_responsive_2()}</li>
</ul>

<h2>{m.sec_customization()}</h2>
<ul>
  <li>{m.menuitem_custom_1_1()}<code>icon</code>{m.menuitem_custom_1_2()}</li>
  <li>{m.menuitem_custom_2_1()}<code>divider</code>{m.menuitem_custom_2_2()}</li>
  <li>{m.menuitem_custom_3_1()}<code>disabled</code>{m.menuitem_custom_3_2()}</li>
  <li>{m.menuitem_custom_4_1()}<code>active</code>{m.menuitem_custom_4_2()}</li>
  <li>{m.menuitem_custom_5_1()}<code>value</code>{m.menuitem_custom_5_2()}<code>children</code>{m.menuitem_custom_5_3()}</li>
</ul>

<h2>{m.sec_examples()}</h2>

<h3>{m.menuitem_ex_basic()}</h3>
<ExampleTabs code={`<Menu>
  {#snippet trigger()}Options{/snippet}
  {#snippet content()}
    <MenuItem icon="edit">Edit</MenuItem>
    <MenuItem icon="copy">Copy</MenuItem>
    <MenuItem icon="trash" divider>Delete</MenuItem>
  {/snippet}
</Menu>`}>
  <div class="p-4 bg-surface rounded-md" data-testid="menuitem-basic">
    <Menu>
      {#snippet trigger()}Options{/snippet}
      {#snippet content()}
        <MenuItem>Edit</MenuItem>
        <MenuItem>Copy</MenuItem>
        <MenuItem divider>Delete</MenuItem>
      {/snippet}
    </Menu>
  </div>
</ExampleTabs>

<h2>{m.sec_props()}</h2>
<PropsTable component={MenuItemModule} />

<h2>{m.sec_accessibility()}</h2>
<ul>
  <li><code>role="menuitem"</code>{m.menuitem_a11y_1()}</li>
  <li>{m.menuitem_a11y_2_1()}<code>&lt;a&gt;</code>{m.menuitem_a11y_2_2()}<code>&lt;button&gt;</code>{m.menuitem_a11y_2_3()}</li>
  <li>{m.menuitem_a11y_3_1()}<code>aria-disabled</code>{m.menuitem_a11y_3_2()}</li>
  <li>{m.menuitem_a11y_4_1()}<code>aria-haspopup</code>{m.menuitem_a11y_4_2()}</li>
</ul>
</Container>

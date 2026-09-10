<!--
@component
Sidebar documentation page — standardized structure
-->
<script lang="ts">
import { onMount } from "svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import Container from "$lib/components/Container/Container.svelte"
import Sidebar from "$lib/components/Sidebar/Sidebar.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as SidebarModule from "$lib/components/Sidebar/Sidebar.svelte"
import { m } from "$lib/paraglide/messages.js"

let showExamples = $state(false)

onMount(() => {
  setTimeout(() => { showExamples = true }, 100)
})
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>
<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>{m.sidebar_heading()}</h1>

  <!-- ─── Description ───────────────────────────────────── -->
  <p>
    <strong>{m.sidebar_heading()}</strong>{m.sidebar_intro_1()}
  </p>

  <!-- ─── What / When / Why ─────────────────────────────── -->
  <h2>{m.sec_what_when_why()}</h2>

  <h3>{m.sec_what()}</h3>
  <p>
    {m.sidebar_what_1()}
  </p>

  <h3>{m.sec_when()}</h3>
  <p>
    {m.sidebar_when_1()}
  </p>

  <h3>{m.sec_why()}</h3>
  <ul>
    <li><strong>{m.sidebar_why_hierarchy()}</strong> — {m.sidebar_why_hierarchy_desc()}</li>
    <li><strong>{m.sidebar_why_discoverability()}</strong> — {m.sidebar_why_discoverability_desc()}</li>
    <li><strong>{m.sidebar_why_a11y()}</strong> — {m.sidebar_why_a11y_desc_1()}<code>&lt;nav aria-label&gt;</code>{m.sidebar_why_a11y_desc_2()}</li>
  </ul>

  <h3>{m.sec_sources()}</h3>
  <ul>
    <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/">WAI-ARIA APG — Landmarks</a></li>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav">MDN — &lt;nav&gt;</a></li>
    <li><a href="https://primer.style/product/components/NavList">Primer — NavList</a></li>
    <li><a href="https://m3.material.io/components/navigation-rail/overview">Material Design 3 — Navigation rail</a></li>
  </ul>

  <!-- ─── Responsiveness ────────────────────────────────── -->
  <h2>{m.sec_responsiveness()}</h2>
  <ul>
    <li><strong>{m.sidebar_responsive_desktop()}</strong>{m.sidebar_responsive_1_1()}<code>mode</code>{m.sidebar_responsive_1_2()}</li>
    <li><strong>{m.sidebar_responsive_mobile()}</strong>{m.sidebar_responsive_2()}</li>
    <li>{m.sidebar_responsive_3()}</li>
  </ul>

  <!-- ─── Customization ─────────────────────────────────── -->
  <h2>{m.sec_customization()}</h2>
  <ul>
    <li>{m.sidebar_custom_1_1()}<code>left</code>{m.sidebar_custom_1_2()}<code>right</code>{m.sidebar_custom_1_3()}</li>
    <li>{m.sidebar_custom_2_1()}<code>float</code>{m.sidebar_custom_2_2()}<code>inline</code>{m.sidebar_custom_2_3()}</li>
    <li>{m.sidebar_custom_3_1()}<code>header</code>{m.sidebar_custom_3_2()}</li>
    <li>{m.sidebar_custom_4()}</li>
  </ul>

  <!-- ─── Examples ──────────────────────────────────────── -->
  <h2>{m.sec_examples()}</h2>

  <!-- 1. Basic Sidebar — full-height left navigation -->
  <h3>{m.sidebar_ex_basic()}</h3>
  <p>{m.sidebar_ex_basic_desc()}</p>
  <ExampleTabs code={`<div class="flex h-[300px] border border-border rounded-lg overflow-hidden">
  <Sidebar>
    {#snippet header()}Navigation{/snippet}
    <nav class="space-y-2">
      <a href="/home" class="block p-2 rounded hover:bg-hover">Home</a>
      <a href="/about" class="block p-2 rounded hover:bg-hover">About</a>
      <a href="/settings" class="block p-2 rounded hover:bg-hover">Settings</a>
      <a href="/help" class="block p-2 rounded hover:bg-hover">Help</a>
    </nav>
  </Sidebar>
  <div class="flex-1 p-4">
    <p>Main content area</p>
  </div>
</div>`}>
    {#if showExamples}
      <div class="flex h-[300px] border border-border rounded-lg overflow-hidden" data-testid="sidebar-basic">
        <Sidebar>
          {#snippet header()}Navigation{/snippet}
          <nav class="space-y-2">
            <a href="#home" class="block p-2 rounded hover:bg-hover">Home</a>
            <a href="#about" class="block p-2 rounded hover:bg-hover">About</a>
            <a href="#settings" class="block p-2 rounded hover:bg-hover">Settings</a>
            <a href="#help" class="block p-2 rounded hover:bg-hover">Help</a>
          </nav>
        </Sidebar>
        <div class="flex-1 p-4 bg-surface">
          <p class="text-sm text-muted">Main content area</p>
        </div>
      </div>
    {/if}
  </ExampleTabs>

  <!-- 2. Right-positioned Sidebar -->
  <h3>{m.sidebar_ex_right()}</h3>
  <p>{m.sidebar_ex_right_desc()}</p>
  <ExampleTabs code={`<div class="flex h-[300px] border border-border rounded-lg overflow-hidden">
  <div class="flex-1 p-4">
    <p>Main content area</p>
  </div>
  <Sidebar position="right">
    {#snippet header()}Settings{/snippet}
    <div class="space-y-4">
      <div class="space-y-2">
        <label for="theme-select" class="block text-sm font-medium">Theme</label>
        <select id="theme-select" class="w-full rounded-md border border-border bg-background p-1">
          <option>Light</option>
          <option>Dark</option>
          <option>System</option>
        </select>
      </div>
      <div class="space-y-2">
        <label for="lang-select" class="block text-sm font-medium">Language</label>
        <select id="lang-select" class="w-full rounded-md border border-border bg-background p-1">
          <option>English</option>
          <option>Español</option>
          <option>Français</option>
        </select>
      </div>
    </div>
  </Sidebar>
</div>`}>
    {#if showExamples}
      <div class="flex h-[300px] border border-border rounded-lg overflow-hidden" data-testid="sidebar-right">
        <div class="flex-1 p-4 bg-surface">
          <p class="text-sm text-muted">Main content area</p>
        </div>
        <Sidebar position="right">
          {#snippet header()}Settings{/snippet}
          <div class="space-y-4">
            <div class="space-y-2">
              <label for="theme-select" class="block text-sm font-medium">Theme</label>
              <select id="theme-select" class="w-full rounded-md border border-border bg-background p-1">
                <option>Light</option>
                <option>Dark</option>
                <option>System</option>
              </select>
            </div>
            <div class="space-y-2">
              <label for="lang-select" class="block text-sm font-medium">Language</label>
              <select id="lang-select" class="w-full rounded-md border border-border bg-background p-1">
                <option>English</option>
                <option>Español</option>
                <option>Français</option>
              </select>
            </div>
          </div>
        </Sidebar>
      </div>
    {/if}
  </ExampleTabs>

  <!-- 3. Sidebar with Menu Items -->
  <h3>{m.sidebar_ex_menu()}</h3>
  <p>{m.sidebar_ex_menu_desc_1()}<code>menu</code>{m.sidebar_ex_menu_desc_2()}</p>
  <ExampleTabs code={`<div class="flex h-[300px] border border-border rounded-lg overflow-hidden">
  <Sidebar menu={[          { label: 'Dashboard', icon: 'tabler:layout-dashboard', link: '/dashboard' },
          { label: 'Users', icon: 'tabler:users', children: [
            { label: 'All Users', link: '/users' },
            { label: 'Roles', link: '/users/roles' },
            { label: 'Permissions', link: '/users/permissions' },
          ]},
          { label: 'Settings', icon: 'tabler:settings', link: '/settings' },
          { label: 'Help', icon: 'tabler:help', link: '/help' },
  ]} title="My App" />
  <div class="flex-1 p-4">
    <p>Main content area</p>
  </div>
</div>`}>
    {#if showExamples}
      <div class="flex h-[300px] border border-border rounded-lg overflow-hidden" data-testid="sidebar-menu">
        <Sidebar menu={[
          { label: 'Dashboard', icon: 'tabler:layout-dashboard', link: '/dashboard' },
          { label: 'Users', icon: 'tabler:users', children: [
            { label: 'All Users', link: '/users' },
            { label: 'Roles', link: '/users/roles' },
            { label: 'Permissions', link: '/users/permissions' },
          ]},
          { label: 'Settings', icon: 'tabler:settings', link: '/settings' },
          { label: 'Help', icon: 'tabler:help', link: '/help' },
        ]} title="My App" />
        <div class="flex-1 p-4 bg-surface">
          <p class="text-sm text-muted">Main content area</p>
        </div>
      </div>
    {/if}
  </ExampleTabs>

  <!-- ─── Slots ─────────────────────────────────────────── -->
  <h2>{m.sec_slots()}</h2>
  <table>
    <thead>
      <tr><th>{m.sec_slot()}</th><th>{m.sec_description()}</th></tr>
    </thead>
    <tbody>
      <tr><td><code>header</code></td><td>{m.sidebar_slot_header()}</td></tr>
      <tr><td><code>default</code></td><td>{m.sidebar_slot_default()}</td></tr>
    </tbody>
  </table>

  <!-- ─── Props ─────────────────────────────────────────── -->
  <h2>{m.sec_props()}</h2>
  <PropsTable component={SidebarModule} />

  <!-- ─── Events ────────────────────────────────────────── -->
  <h2>{m.sec_events()}</h2>
  <EventsTable component={SidebarModule} />

  <!-- ─── Accessibility ─────────────────────────────────── -->
  <h2>{m.sec_accessibility()}</h2>
  <ul>
    <li>{m.sidebar_a11y_1_1()}<code>role="complementary"</code>{m.sidebar_a11y_1_2()}<code>role="region"</code>{m.sidebar_a11y_1_3()}</li>
    <li>{m.sidebar_a11y_2_1()}<code>aria-expanded</code>{m.sidebar_a11y_2_2()}<code>aria-controls</code>{m.sidebar_a11y_2_3()}</li>
    <li>{m.sidebar_a11y_3()}</li>
    <li>{m.sidebar_a11y_4()}</li>
  </ul>

  <!-- ─── Keyboard Support ──────────────────────────────── -->
  <h2>{m.sec_keyboard()}</h2>
  <table>
    <thead>
      <tr><th>{m.sec_key()}</th><th>{m.sec_function()}</th></tr>
    </thead>
    <tbody>
      <tr><td><kbd>Tab</kbd></td><td>{m.sidebar_kb_1()}</td></tr>
      <tr><td><kbd>Enter</kbd> / <kbd>Space</kbd></td><td>{m.sidebar_kb_2()}</td></tr>
      <tr><td><kbd>Escape</kbd></td><td>{m.sidebar_kb_3()}</td></tr>
    </tbody>
  </table>
</Container>

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

let showExamples = $state(false)

onMount(() => {
  setTimeout(() => { showExamples = true }, 100)
})
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>
<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>Sidebar</h1>

  <!-- ─── Description ───────────────────────────────────── -->
  <p>
    <strong>Sidebar</strong> is a collapsible vertical navigation panel that attaches to
    the left or right edge of its parent container. It provides a persistent home for
    nested navigation links, filters, settings, or secondary content — and collapses
    to a hamburger-triggered overlay on mobile.
  </p>

  <!-- ─── What / When / Why ─────────────────────────────── -->
  <h2>What, When &amp; Why</h2>

  <h3>What is it?</h3>
  <p>
    A vertical panel with an optional header snippet, scrollable body content, and a
    collapsible toggle. It can be positioned on the left (default) or right side, and
    supports two mobile modes: float (overlay with backdrop) and inline (push content).
  </p>

  <h3>When should I use it?</h3>
  <p>
    Use a Sidebar when your app has 5+ top-level navigation items, deeply nested
    navigation hierarchies (admin panels, documentation sites), or persistent
    secondary content (filters, settings panels) that should remain visible while
    the user works.
  </p>

  <h3>Why does it exist?</h3>
  <ul>
    <li><strong>Hierarchical navigation</strong> — vertical lists accommodate nested
      items better than horizontal tabs or top bars.</li>
    <li><strong>Discoverability</strong> — always-visible navigation reduces the
      number of clicks/taps to reach deeply nested pages.</li>
    <li><strong>Accessibility</strong> — uses <code>&lt;nav aria-label&gt;</code> so
      screen-reader users can jump directly to sidebar navigation.</li>
  </ul>

  <h3>Sources</h3>
  <ul>
    <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/">WAI-ARIA APG — Landmarks</a></li>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav">MDN — &lt;nav&gt;</a></li>
    <li><a href="https://primer.style/product/components/NavList">Primer — NavList</a></li>
    <li><a href="https://m3.material.io/components/navigation-rail/overview">Material Design 3 — Navigation rail</a></li>
  </ul>

  <!-- ─── Responsiveness ────────────────────────────────── -->
  <h2>Responsiveness</h2>
  <ul>
    <li><strong>Desktop (≥ 640 px)</strong> — sidebar is visible and pushes or overlays
      main content, depending on the <code>mode</code> prop.</li>
    <li><strong>Mobile (&lt; 640 px)</strong> — sidebar collapses and reappears as a
      slide-in overlay with a backdrop when toggled.</li>
    <li>Touch targets meet 44×44 px minimum for mobile tap areas.</li>
  </ul>

  <!-- ─── Customization ─────────────────────────────────── -->
  <h2>Customization</h2>
  <ul>
    <li>Position: <code>left</code> (default) or <code>right</code>.</li>
    <li>Mode: <code>float</code> (overlay) or <code>inline</code> (push content).</li>
    <li>Custom header via the <code>header</code> snippet.</li>
    <li>Theme colors, borders, and spacing controlled by the Tailwind theme.</li>
  </ul>

  <!-- ─── Examples ──────────────────────────────────────── -->
  <h2>Examples</h2>

  <!-- 1. Basic Sidebar — full-height left navigation -->
  <h3>Basic Sidebar</h3>
  <p>A left-positioned sidebar that fills the full height of its container, with navigation links.</p>
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
  <h3>Right-positioned Sidebar</h3>
  <p>A sidebar positioned on the right side, ideal for settings panels or secondary content.</p>
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
  <h3>Sidebar with TreeMenu</h3>
  <p>Use the <code>menu</code> prop to pass navigation items directly. Supports nested hierarchies and search.</p>
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
  <h2>Slots</h2>
  <table>
    <thead>
      <tr><th>Slot</th><th>Description</th></tr>
    </thead>
    <tbody>
      <tr><td><code>header</code></td><td>Content for the sidebar header area</td></tr>
      <tr><td><code>default</code></td><td>Main scrollable content of the sidebar</td></tr>
    </tbody>
  </table>

  <!-- ─── Props ─────────────────────────────────────────── -->
  <h2>Props</h2>
  <PropsTable component={SidebarModule} />

  <!-- ─── Events ────────────────────────────────────────── -->
  <h2>Events</h2>
  <EventsTable component={SidebarModule} />

  <!-- ─── Accessibility ─────────────────────────────────── -->
  <h2>Accessibility</h2>
  <ul>
    <li>Uses <code>role="complementary"</code> for the sidebar container and
      <code>role="region"</code> for the content area.</li>
    <li>Collapsible toggle uses <code>aria-expanded</code> and <code>aria-controls</code>.</li>
    <li>Keyboard support: Escape closes the sidebar; Enter/Space toggles the header.</li>
    <li>Focus is trapped within the sidebar when it is open in float mode.</li>
  </ul>

  <!-- ─── Keyboard Support ──────────────────────────────── -->
  <h2>Keyboard Support</h2>
  <table>
    <thead>
      <tr><th>Key</th><th>Function</th></tr>
    </thead>
    <tbody>
      <tr><td><kbd>Tab</kbd></td><td>Moves focus through interactive elements in the sidebar</td></tr>
      <tr><td><kbd>Enter</kbd> / <kbd>Space</kbd></td><td>When focus is on the header toggle, expands/collapses the sidebar</td></tr>
      <tr><td><kbd>Escape</kbd></td><td>Closes the sidebar (float mode)</td></tr>
    </tbody>
  </table>
</Container>

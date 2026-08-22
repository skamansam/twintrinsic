<script lang="ts">
import AppHeader from "$lib/components/AppHeader/AppHeader.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
import Container from "$lib/components/Container/Container.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as AppHeaderModule from "$lib/components/AppHeader/AppHeader.svelte"
</script>
<!--
@component
AppHeader documentation page — standardized structure
-->

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>
<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>AppHeader</h1>

  <!-- ─── Description ───────────────────────────────────── -->
  <p>
    <strong>AppHeader</strong> is the persistent top navigation bar for your application.
    It provides a home for your brand identity, primary navigation links, global search,
    notification bell, and user profile menu — all in a single, responsive component
    that collapses to a hamburger menu on mobile.
  </p>

  <!-- ─── What / When / Why ─────────────────────────────── -->
  <h2>What, When &amp; Why</h2>

  <h3>What is it?</h3>
  <p>
    A horizontal bar fixed to the top of the viewport containing (from left to right):
    brand logo/name, primary navigation links, a search input, notification icon, and
    user avatar/menu. On small screens the navigation collapses behind a hamburger button.
  </p>

  <h3>When should I use it?</h3>
  <p>
    Place <code>&lt;AppHeader&gt;</code> inside the <code>header</code> slot of
    <code>&lt;App&gt;</code> on every page. It is the standard entry point for
    top-level navigation, search, and account access.
  </p>

  <h3>Why does it exist?</h3>
  <ul>
    <li><strong>Consistency</strong> — users expect a persistent top bar for orientation
      and navigation across every page (Jakob's Law).</li>
    <li><strong>Discoverability</strong> — search, notifications, and profile are always
      in the same place, reducing cognitive load.</li>
    <li><strong>Accessibility</strong> — uses <code>&lt;header&gt;</code> and
      <code>&lt;nav&gt;</code> landmarks so screen-reader users can jump directly to
      navigation.</li>
  </ul>

  <h3>Sources</h3>
  <ul>
    <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/">WAI-ARIA APG — Landmarks</a></li>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/header">MDN — &lt;header&gt;</a></li>
    <li><a href="https://primer.style/product/components/PageHeader">Primer — PageHeader</a></li>
    <li><a href="https://m3.material.io/components/top-app-bar/overview">Material Design 3 — Top app bar</a></li>
  </ul>

  <!-- ─── Responsiveness ────────────────────────────────── -->
  <h2>Responsiveness</h2>
  <ul>
    <li><strong>Desktop (≥ 640 px)</strong> — full navigation links visible, search input expanded.</li>
    <li><strong>Mobile (&lt; 640 px)</strong> — nav links collapse behind a hamburger menu button,
      search collapses to an icon, notification and user icons remain visible.</li>
    <li>Hamburger button uses <code>aria-expanded</code> and <code>aria-controls</code>
      for screen-reader toggle state.</li>
    <li>Touch targets meet the 44×44 px minimum for mobile tap areas.</li>
  </ul>

  <!-- ─── Customization ─────────────────────────────────── -->
  <h2>Customization</h2>
  <ul>
    <li>Pass a string or a <code>{'{ name, logo, href }'}</code> object as <code>brand</code>.</li>
    <li>Nav items accept <code>label</code>, <code>href</code>, and <code>current</code> properties.</li>
    <li>Override default search and notification behavior via the <code>showSearch</code> and
      <code>showNotifications</code> props.</li>
    <li>Custom content in the notifications and user-menu areas via named slots.</li>
    <li>Theme colors, spacing, and borders are controlled by the Tailwind theme.</li>
  </ul>

  <!-- ─── Examples ──────────────────────────────────────── -->
  <h2>Examples</h2>

  <h3>Basic Header</h3>
  <ExampleTabs code={`<AppHeader
  brand="Acme Suite"
  navItems={[
    { label: 'Home', href: '/', current: true },
    { label: 'Projects', href: '/projects' },
    { label: 'Reports', href: '/reports' }
  ]}
/>`}>
    <div class="-mx-4 sm:-mx-6" data-testid="app-header-basic">
      <AppHeader
        brand="Acme Suite"
        navItems={[
          { label: 'Home', href: '#', current: true },
          { label: 'Projects', href: '#' },
          { label: 'Reports', href: '#' }
        ]}
      />
    </div>
  </ExampleTabs>

  <h3>With Logo</h3>
  <ExampleTabs code={`<AppHeader
  brand={{ name: 'Acme Suite', logo: '/logo.svg', href: '/' }}
  navItems={[
    { label: 'Home', href: '/', current: true },
    { label: 'Projects', href: '/projects' }
  ]}
/>`}>
    <div class="-mx-4 sm:-mx-6" data-testid="app-header-with-logo">
      <AppHeader
        brand={{ name: 'Acme Suite', logo: '/logo.svg', href: '#' }}
        navItems={[
          { label: 'Home', href: '#', current: true },
          { label: 'Projects', href: '#' }
        ]}
      />
    </div>
  </ExampleTabs>

  <h3>Full Featured</h3>
  <ExampleTabs code={`<AppHeader
  brand={{ name: 'Acme Suite', logo: '/logo.svg', href: '/' }}
  user={{ name: 'Sarah Chen', avatar: '/avatar.svg' }}
  showSearch={true}
  showNotifications={true}
  navItems={[
    { label: 'Home', href: '/', current: true },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Projects', href: '/projects' }
  ]}
/>`}>
    <div class="-mx-4 sm:-mx-6" data-testid="app-header-full-featured">
      <AppHeader
        brand={{ name: 'Acme Suite', logo: '/logo.svg', href: '#' }}
        user={{ name: 'Sarah Chen', avatar: '/avatar.svg' }}
        showSearch={true}
        showNotifications={true}
        navItems={[
          { label: 'Home', href: '#', current: true },
          { label: 'Dashboard', href: '#' },
          { label: 'Projects', href: '#' }
        ]}
      />
    </div>
  </ExampleTabs>

  <!-- ─── Slots ─────────────────────────────────────────── -->
  <h2>Slots</h2>
  <table>
    <thead>
      <tr><th>Slot</th><th>Description</th></tr>
    </thead>
    <tbody>
      <tr><td><code>notifications</code></td><td>Custom content for the notifications panel</td></tr>
      <tr><td><code>user-menu</code></td><td>Custom content for the user dropdown menu</td></tr>
    </tbody>
  </table>

  <!-- ─── Props ─────────────────────────────────────────── -->
  <h2>Props</h2>
  <PropsTable component={AppHeaderModule} />

  <h3>Type Definitions</h3>
  <CodeBlock language="typescript">{`interface BrandInfo {
  name: string;
  logo?: string;
  href?: string;
}

interface UserInfo {
  name: string;
  avatar?: string;
  href?: string;
}

interface NavItem {
  label: string;
  href?: string;
  current?: boolean;
}`}</CodeBlock>

  <!-- ─── Events ────────────────────────────────────────── -->
  <h2>Events</h2>
  <EventsTable component={AppHeaderModule} />

  <!-- ─── Accessibility ─────────────────────────────────── -->
  <h2>Accessibility</h2>
  <ul>
    <li>Uses <code>&lt;header&gt;</code> landmark and <code>&lt;nav aria-label&gt;</code>
      for screen-reader navigation.</li>
    <li>Mobile hamburger toggle uses <code>aria-expanded</code> and <code>aria-controls</code>.</li>
    <li>All interactive elements are keyboard-focusable with visible focus rings.</li>
    <li>Dropdown menus trap focus and can be dismissed with Escape.</li>
    <li>Notification and user menu use <code>aria-haspopup</code> and <code>aria-expanded</code>.</li>
  </ul>

  <!-- ─── Keyboard Support ──────────────────────────────── -->
  <h2>Keyboard Support</h2>
  <table>
    <thead>
      <tr><th>Key</th><th>Function</th></tr>
    </thead>
    <tbody>
      <tr><td><kbd>Tab</kbd></td><td>Moves focus through interactive elements in order</td></tr>
      <tr><td><kbd>Enter</kbd> / <kbd>Space</kbd></td><td>Activates buttons, opens/closes dropdowns</td></tr>
      <tr><td><kbd>Escape</kbd></td><td>Closes mobile menu, notifications panel, and user menu</td></tr>
      <tr><td><kbd>Arrow Keys</kbd></td><td>Navigates between nav items and dropdown menu items</td></tr>
    </tbody>
  </table>
</Container>

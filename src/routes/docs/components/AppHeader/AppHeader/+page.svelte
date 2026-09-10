<script lang="ts">
import AppHeader from "$lib/components/AppHeader/AppHeader.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
import Container from "$lib/components/Container/Container.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as AppHeaderModule from "$lib/components/AppHeader/AppHeader.svelte"
import { m } from "$lib/paraglide/messages.js"
</script>
<!--
@component
AppHeader documentation page — standardized structure
-->

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>
<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>{m.appheader_heading()}</h1>

  <!-- ─── Description ───────────────────────────────────── -->
  <p>
    <strong>{m.appheader_heading()}</strong>{m.appheader_intro_1()}
  </p>

  <!-- ─── What / When / Why ─────────────────────────────── -->
  <h2>{m.sec_what_when_why()}</h2>

  <h3>{m.sec_what()}</h3>
  <p>
    {m.appheader_what_1()}
  </p>

  <h3>{m.sec_when()}</h3>
  <p>
    {m.appheader_when_1()}<code>&lt;AppHeader&gt;</code>{m.appheader_when_2()}<code>header</code>{m.appheader_when_3()}<code>&lt;App&gt;</code>{m.appheader_when_4()}
  </p>

  <h3>{m.sec_why()}</h3>
  <ul>
    <li><strong>{m.appheader_why_consistency()}</strong> — {m.appheader_why_consistency_desc()}</li>
    <li><strong>{m.appheader_why_discoverability()}</strong> — {m.appheader_why_discoverability_desc()}</li>
    <li><strong>{m.appheader_why_a11y()}</strong> — {m.appheader_why_a11y_desc_1()}<code>&lt;header&gt;</code>{m.appheader_why_a11y_desc_2()}<code>&lt;nav&gt;</code>{m.appheader_why_a11y_desc_3()}</li>
  </ul>

  <h3>{m.sec_sources()}</h3>
  <ul>
    <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/">WAI-ARIA APG — Landmarks</a></li>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/header">MDN — &lt;header&gt;</a></li>
    <li><a href="https://primer.style/product/components/PageHeader">Primer — PageHeader</a></li>
    <li><a href="https://m3.material.io/components/top-app-bar/overview">Material Design 3 — Top app bar</a></li>
  </ul>

  <!-- ─── Responsiveness ────────────────────────────────── -->
  <h2>{m.sec_responsiveness()}</h2>
  <ul>
    <li><strong>{m.appheader_responsive_desktop()}</strong>{m.appheader_responsive_1()}</li>
    <li><strong>{m.appheader_responsive_mobile()}</strong>{m.appheader_responsive_2()}</li>
    <li>{m.appheader_responsive_3_1()}<code>aria-expanded</code>{m.appheader_responsive_3_2()}<code>aria-controls</code>{m.appheader_responsive_3_3()}</li>
    <li>{m.appheader_responsive_4()}</li>
  </ul>

  <!-- ─── Customization ─────────────────────────────────── -->
  <h2>{m.sec_customization()}</h2>
  <ul>
    <li>{m.appheader_custom_1_1()}<code>&#123; name, logo, href &#125;</code>{m.appheader_custom_1_2()}<code>brand</code>{m.appheader_custom_1_3()}</li>
    <li>{m.appheader_custom_2_1()}<code>label</code>{m.appheader_custom_2_2()}<code>href</code>{m.appheader_custom_2_3()}<code>current</code>{m.appheader_custom_2_4()}</li>
    <li>{m.appheader_custom_3_1()}<code>showSearch</code>{m.appheader_custom_3_2()}<code>showNotifications</code>{m.appheader_custom_3_3()}</li>
    <li>{m.appheader_custom_4()}</li>
    <li>{m.appheader_custom_5()}</li>
  </ul>

  <!-- ─── Examples ──────────────────────────────────────── -->
  <h2>{m.sec_examples()}</h2>

  <h3>{m.appheader_ex_basic()}</h3>
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

  <h3>{m.appheader_ex_logo()}</h3>
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

  <h3>{m.appheader_ex_full()}</h3>
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
  <h2>{m.sec_slots()}</h2>
  <table>
    <thead>
      <tr><th>{m.sec_slot()}</th><th>{m.sec_description()}</th></tr>
    </thead>
    <tbody>
      <tr><td><code>notifications</code></td><td>{m.appheader_slot_notifications()}</td></tr>
      <tr><td><code>user-menu</code></td><td>{m.appheader_slot_user_menu()}</td></tr>
    </tbody>
  </table>

  <!-- ─── Props ─────────────────────────────────────────── -->
  <h2>{m.sec_props()}</h2>
  <PropsTable component={AppHeaderModule} />

  <h3>{m.appheader_typedefs()}</h3>
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
  <h2>{m.sec_events()}</h2>
  <EventsTable component={AppHeaderModule} />

  <!-- ─── Accessibility ─────────────────────────────────── -->
  <h2>{m.sec_accessibility()}</h2>
  <ul>
    <li>{m.appheader_a11y_1_1()}<code>&lt;header&gt;</code>{m.appheader_a11y_1_2()}<code>&lt;nav aria-label&gt;</code>{m.appheader_a11y_1_3()}</li>
    <li>{m.appheader_a11y_2_1()}<code>aria-expanded</code>{m.appheader_a11y_2_2()}<code>aria-controls</code>{m.appheader_a11y_2_3()}</li>
    <li>{m.appheader_a11y_3()}</li>
    <li>{m.appheader_a11y_4()}</li>
    <li>{m.appheader_a11y_5_1()}<code>aria-haspopup</code>{m.appheader_a11y_5_2()}<code>aria-expanded</code>{m.appheader_a11y_5_3()}</li>
  </ul>

  <!-- ─── Keyboard Support ──────────────────────────────── -->
  <h2>{m.sec_keyboard()}</h2>
  <table>
    <thead>
      <tr><th>{m.sec_key()}</th><th>{m.sec_function()}</th></tr>
    </thead>
    <tbody>
      <tr><td><kbd>Tab</kbd></td><td>{m.appheader_kb_1()}</td></tr>
      <tr><td><kbd>Enter</kbd> / <kbd>Space</kbd></td><td>{m.appheader_kb_2()}</td></tr>
      <tr><td><kbd>Escape</kbd></td><td>{m.appheader_kb_3()}</td></tr>
      <tr><td><kbd>Arrow Keys</kbd></td><td>{m.appheader_kb_4()}</td></tr>
    </tbody>
  </table>
</Container>

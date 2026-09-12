<script lang="ts">
import App, * as AppModule from "$lib/components/App/App.svelte"
import BottomBar from "$lib/components/BottomBar/BottomBar.svelte"
import Button from "$lib/components/Button/Button.svelte"
import Container from "$lib/components/Container/Container.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import { m } from "$lib/paraglide/messages.js"

/** Drives the controlled BottomBar in the "App Shell with a BottomBar" example */
let consoleOpen = $state(false)
</script>
<!--
@component
App documentation page — standardized structure
-->

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>
<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>{m.app_heading()}</h1>

  <!-- ─── Description ───────────────────────────────────── -->
  <p>
    <strong>{m.app_heading()}</strong>{m.app_intro_1()}<code>&lt;main&gt;</code>{m.app_intro_2()}<code>&lt;header&gt;</code>{m.app_intro_3()}<code>&lt;footer&gt;</code>{m.app_intro_4()}
  </p>

  <!-- ─── What / When / Why ─────────────────────────────── -->
  <h2>{m.sec_what_when_why()}</h2>

  <h3>{m.sec_what()}</h3>
  <p>
    {m.app_what_1()}
  </p>

  <h3>{m.sec_when()}</h3>
  <p>
    {m.app_when_1()}<code>&lt;App&gt;</code>{m.app_when_2()}
  </p>

  <h3>{m.sec_why()}</h3>
  <ul>
    <li><strong>{m.app_why_jakob()}</strong> — {m.app_why_jakob_desc()}</li>
    <li><strong>{m.app_why_a11y()}</strong> — {m.app_why_a11y_desc_1()}<code>main</code>{m.app_why_a11y_desc_2()}<code>header</code>{m.app_why_a11y_desc_3()}<code>nav</code>{m.app_why_a11y_desc_4()}<code>footer</code>{m.app_why_a11y_desc_5()}</li>
    <li><strong>{m.app_why_responsive()}</strong> — {m.app_why_responsive_desc()}</li>
  </ul>

  <h3>{m.sec_sources()}</h3>
  <ul>
    <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/">WAI-ARIA APG — Landmarks</a></li>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/main">MDN — &lt;main&gt;</a></li>
    <li><a href="https://primer.style/product/components/PageLayout">Primer — PageLayout</a></li>
  </ul>

<h2>{m.sec_implementation()}</h2>
<ul>
    <li>{m.app_impl_1()}</li>
    <li>{m.app_impl_2()}</li>
    <li>{m.app_impl_3()}</li>
    <li>{m.app_impl_4()}</li>
    <li>{m.app_impl_5()}</li>
    <li>{m.app_impl_6()}</li>
</ul>

<h2>{m.sec_mistakes()}</h2>
<ul>
    <li>{m.app_mistake_1()}</li>
    <li>{m.app_mistake_2()}</li>
    <li>{m.app_mistake_3()}</li>
</ul>

<h2>{m.sec_related()}</h2>
<p>AppHeader, Sidebar, Footer, BottomBar, Container</p>

<h2>{m.sec_responsiveness()}</h2>
  <ul>
    <li><strong>{m.app_responsive_desktop()}</strong>{m.app_responsive_1()}</li>
    <li><strong>{m.app_responsive_mobile()}</strong>{m.app_responsive_2()}</li>
    <li>{m.app_responsive_3_1()}<code>leftPanelWidth</code>{m.app_responsive_3_2()}<code>rightPanelWidth</code>{m.app_responsive_3_3()}</li>
  </ul>

  <!-- ─── Customization ─────────────────────────────────── -->
  <h2>{m.sec_customization()}</h2>
  <ul>
    <li>{m.app_custom_1_1()}<code>twintrinsic.css</code>{m.app_custom_1_2()}</li>
    <li>{m.app_custom_2_1()}<code>class</code>{m.app_custom_2_2()}</li>
    <li>{m.app_custom_3()}</li>
    <li>{m.app_custom_locale_1_1()}<code>showLocaleSwitcher</code>{m.app_custom_locale_1_2()}<code>&lt;AppHeader&gt;</code>{m.app_custom_locale_1_3()}<code>locales</code>{m.app_custom_locale_1_4()}</li>
  </ul>

  <!-- ─── Examples ──────────────────────────────────────── -->
  <h2>{m.sec_examples()}</h2>

  <h3>{m.app_ex_basic()}</h3>
  <ExampleTabs code={`<App appName="Acme Suite">
  {#snippet header()}
    <AppHeader brand="Acme Suite" navItems={[{ label: 'Home', href: '/' }]} />
  {/snippet}

  {#snippet leftPanel()}
    <Sidebar>
      <!-- Navigation links -->
    </Sidebar>
  {/snippet}

  <!-- Main content -->
  <div>
    <h1>Projects</h1>
    <p>Track and manage your team's work.</p>
  </div>

  {#snippet footer()}
    <Footer>
      <!-- Company links -->
    </Footer>
  {/snippet}
</App>`}>
    <div class="p-4 bg-surface rounded border border-border text-sm text-muted">
      <p class="font-medium text-default mb-2">App Shell Preview</p>
      <p>This component is a full-page layout wrapper. See the code tab for the
        typical usage pattern.</p>
    </div>
  </ExampleTabs>

  <h3>{m.app_ex_shell()}</h3>
  <p>
    {m.app_shell_desc_1()}<em>{m.app_shell_desc_2()}</em>{m.app_shell_desc_3()}<code>expanded</code>{m.app_shell_desc_4()}
  </p>
  <p>
    {m.app_shell_desc2_1()}<code>&lt;App&gt;</code>{m.app_shell_desc2_2()}<code>docked</code>{m.app_shell_desc2_3()}
  </p>
  <ExampleTabs code={`<script>
  let consoleOpen = false
<\/script>

<App appName="Acme Suite" navItems={[{ label: 'Home', href: '/' }]}>
  <div class="flex items-center justify-between gap-4">
    <h1 class="text-xl font-semibold">Projects</h1>
    <Button onclick={() => (consoleOpen = !consoleOpen)}>
      {consoleOpen ? 'Hide console' : 'Show console'}
    </Button>
  </div>
  <!-- …page content… -->
</App>

<!-- App-level bar, docked to the viewport bottom. Shown and hidden from
     the header action above — the expanded prop is the single source of truth. -->
<BottomBar docked height="12rem" expanded={consoleOpen} ariaLabel="Build console">
  {#snippet header()}Console{/snippet}
  <div class="font-mono text-sm space-y-1">
    <p class="text-success-500">✓ Build completed successfully</p>
    <p class="text-warning-500">⚠ 2 deprecation warnings</p>
  </div>
</BottomBar>`}>
    <div
      class="h-[440px] relative overflow-hidden rounded-lg border border-border bg-surface flex flex-col"
      data-testid="app-shell-console"
    >
      <!-- Shell header — in a real app this is <App>'s header region -->
      <div class="flex items-center justify-between gap-4 px-4 h-14 shrink-0 border-b border-border bg-surface">
        <p class="font-semibold text-default">Acme Suite</p>
        <Button onclick={() => (consoleOpen = !consoleOpen)}>
          {consoleOpen ? "Hide console" : "Show console"}
        </Button>
      </div>
      <!-- Scrollable page content -->
      <div class="flex-1 min-h-0 overflow-auto p-6 space-y-4 bg-background">
        <div class="p-4 rounded-lg border border-border bg-surface">
          <p class="font-medium text-default">Website Redesign</p>
          <p class="text-sm text-muted mt-1">Updated 2 hours ago</p>
        </div>
        <div class="p-4 rounded-lg border border-border bg-surface">
          <p class="font-medium text-default">Mobile App Launch</p>
          <p class="text-sm text-muted mt-1">Updated yesterday</p>
        </div>
      </div>
      <!-- Console overlay — covers the shell's bottom edge while shown -->
      <div
        class="absolute inset-x-0 bottom-0 h-48 pointer-events-none"
        data-testid="app-shell-bottombar"
      >
        <BottomBar height="12rem" expanded={consoleOpen} ariaLabel="Build console">
          {#snippet header()}Console{/snippet}
          <div class="font-mono text-sm space-y-1">
            <p class="text-success-500">✓ Build completed successfully</p>
            <p class="text-warning-500">⚠ 2 deprecation warnings</p>
          </div>
        </BottomBar>
      </div>
    </div>
  </ExampleTabs>

  <!-- ─── Slots ─────────────────────────────────────────── -->
  <h2>{m.sec_slots()}</h2>
  <table>
    <thead>
      <tr><th>{m.sec_slot()}</th><th>{m.sec_description()}</th></tr>
    </thead>
    <tbody>
      <tr><td><code>default</code></td><td>{m.app_slot_default()}</td></tr>
      <tr><td><code>header</code></td><td>{m.app_slot_header()}</td></tr>
      <tr><td><code>leftPanel</code></td><td>{m.app_slot_left()}</td></tr>
      <tr><td><code>rightPanel</code></td><td>{m.app_slot_right()}</td></tr>
      <tr><td><code>footer</code></td><td>{m.app_slot_footer()}</td></tr>
      <tr><td><code>menu</code></td><td>{m.app_slot_menu()}</td></tr>
    </tbody>
  </table>

  <!-- ─── Props ─────────────────────────────────────────── -->
  <h2>{m.sec_props()}</h2>
  <PropsTable component={AppModule} />

  <!-- ─── Accessibility ─────────────────────────────────── -->
  <h2>{m.sec_accessibility()}</h2>
  <ul>
    <li>{m.app_a11y_1_1()}<code>&lt;main&gt;</code>{m.app_a11y_1_2()}<code>role="main"</code>{m.app_a11y_1_3()}</li>
    <li>{m.app_a11y_2_1()}<code>&lt;footer&gt;</code>{m.app_a11y_2_2()}</li>
    <li>{m.app_a11y_3_1()}<code>appName</code>{m.app_a11y_3_2()}</li>
    <li>{m.app_a11y_4()}</li>
  </ul>

  <!-- ─── Keyboard Support ──────────────────────────────── -->
  <h2>{m.sec_keyboard()}</h2>
  <p>
    {m.app_kb_1()}
  </p>
</Container>

<script lang="ts">
import App from "$lib/components/App/App.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import Container from "$lib/components/Container/Container.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as AppModule from "$lib/components/App/App.svelte"
</script>
<!--
@component
App documentation page — standardized structure
-->

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>
<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>App</h1>

  <!-- ─── Description ───────────────────────────────────── -->
  <p>
    <strong>App</strong> is the root layout component that establishes the page shell for
    every screen in your application. It composes a header, optional sidebar(s),
    main content area, and footer into a responsive grid, and sets up the semantic
    landmark structure (<code>&lt;main&gt;</code>, <code>&lt;header&gt;</code>,
    <code>&lt;footer&gt;</code>) that screen readers rely on for navigation.
  </p>

  <!-- ─── What / When / Why ─────────────────────────────── -->
  <h2>What, When &amp; Why</h2>

  <h3>What is it?</h3>
  <p>
    A layout wrapper that provides named slots for header, left panel, right panel,
    main content, footer, and an optional menu bar. It manages the CSS Grid that
    arranges these regions and reflows them for mobile viewports.
  </p>

  <h3>When should I use it?</h3>
  <p>
    Use <code>&lt;App&gt;</code> as the outermost component on every page. It is the
    structural foundation that all other layout components (AppHeader, Sidebar,
    Footer) slot into. If your app has a consistent page skeleton, this is it.
  </p>

  <h3>Why does it exist?</h3>
  <ul>
    <li><strong>Jakob's Law</strong> — users expect your app to work like every other
      app they know. A predictable page skeleton (header top, nav left, content center,
      footer bottom) meets that expectation.</li>
    <li><strong>Accessibility</strong> — proper landmark regions (<code>main</code>,
      <code>header</code>, <code>nav</code>, <code>footer</code>) let screen-reader
      users jump between page sections instantly.</li>
    <li><strong>Responsive</strong> — the grid automatically collapses side panels on
      small screens so you don't have to write breakpoint logic in every page.</li>
  </ul>

  <h3>Sources</h3>
  <ul>
    <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/">WAI-ARIA APG — Landmarks</a></li>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/main">MDN — &lt;main&gt;</a></li>
    <li><a href="https://primer.style/product/components/PageLayout">Primer — PageLayout</a></li>
  </ul>

  <!-- ─── Responsiveness ────────────────────────────────── -->
  
<h2>Twintrinsic Implementation</h2>
<ul>
    <li>Uses CSS Grid with `grid-template-rows` and `grid-template-columns` for the page shell</li>
    <li>Semantic `&lt;main&gt;` element for the content area</li>
    <li>Accepts `header`, `footer`, `leftPanel`, `rightPanel` snippets for flexible composition</li>
    <li>`&lt;svelte:window&gt;` for scroll event handling</li>
    <li>`data-theme` attribute on root for theme propagation</li>
    <li>`...rest` spread for native attribute passthrough (`data-*`, `aria-*`)</li>
</ul>

<h2>Common Mistakes</h2>
<ul>
    <li>Don't put navigation inside `&lt;main&gt;` — it belongs in `&lt;nav&gt;` within the header or sidebar</li>
    <li>Don't use `&lt;div&gt;` for the main content area — always use `&lt;main&gt;` for landmark semantics</li>
    <li>Don't forget `id=&quot;main-content&quot;` for skip-nav links</li>
</ul>

<h2>Related Components</h2>
<p>AppHeader, Sidebar, Footer, BottomBar, Container</p>

<h2>Responsiveness</h2>
  <ul>
    <li><strong>Desktop (≥ 640 px)</strong> — side panels sit beside the main content in a row layout.</li>
    <li><strong>Mobile (&lt; 640 px)</strong> — side panels expand to full width and stack vertically beneath the main content.</li>
    <li>Panel widths are configurable via the <code>leftPanelWidth</code> and <code>rightPanelWidth</code> props.</li>
  </ul>

  <!-- ─── Customization ─────────────────────────────────── -->
  <h2>Customization</h2>
  <ul>
    <li>All spacing, colors, and typography inherit from the Tailwind theme in
      <code>twintrinsic.css</code>.</li>
    <li>Pass additional CSS classes via the <code>class</code> prop.</li>
    <li>Each slot accepts any Svelte content — there are no restrictions on what
      you place in the header, panels, or footer.</li>
  </ul>

  <!-- ─── Examples ──────────────────────────────────────── -->
  <h2>Examples</h2>

  <h3>Basic Layout</h3>
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

  <!-- ─── Slots ─────────────────────────────────────────── -->
  <h2>Slots</h2>
  <table>
    <thead>
      <tr><th>Slot</th><th>Description</th></tr>
    </thead>
    <tbody>
      <tr><td><code>default</code></td><td>Main content area of the application</td></tr>
      <tr><td><code>header</code></td><td>Application header area — typically an AppHeader</td></tr>
      <tr><td><code>leftPanel</code></td><td>Left sidebar panel — typically a Sidebar</td></tr>
      <tr><td><code>rightPanel</code></td><td>Right sidebar panel — optional secondary navigation</td></tr>
      <tr><td><code>footer</code></td><td>Application footer area — typically a Footer</td></tr>
      <tr><td><code>menu</code></td><td>Optional menu area above the header</td></tr>
    </tbody>
  </table>

  <!-- ─── Props ─────────────────────────────────────────── -->
  <h2>Props</h2>
  <PropsTable component={AppModule} />

  <!-- ─── Accessibility ─────────────────────────────────── -->
  <h2>Accessibility</h2>
  <ul>
    <li>Main content area uses the <code>&lt;main&gt;</code> element with
      <code>role="main"</code>.</li>
    <li>Footer uses the <code>&lt;footer&gt;</code> element.</li>
    <li>Document title is set automatically from the <code>appName</code> prop.</li>
    <li>All regions are exposed as ARIA landmarks so screen-reader users can
      jump directly to header, navigation, main content, or footer.</li>
  </ul>

  <!-- ─── Keyboard Support ──────────────────────────────── -->
  <h2>Keyboard Support</h2>
  <p>
    The App component itself does not contain interactive elements. Keyboard
    support is handled by the components placed inside its slots (AppHeader,
    Sidebar, etc.).
  </p>
</Container>

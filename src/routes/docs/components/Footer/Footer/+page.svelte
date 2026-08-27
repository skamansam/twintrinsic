<script lang="ts">
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import Container from "$lib/components/Container/Container.svelte"
import Footer from "$lib/components/Footer/Footer.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as FooterModule from "$lib/components/Footer/Footer.svelte"
</script>
<!--
@component
Footer documentation page — standardized structure
-->

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>
<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>Footer</h1>

  <!-- ─── Description ───────────────────────────────────── -->
  <p>
    <strong>Footer</strong> is a persistent bottom section for your page or application.
    It provides three flexible regions — left, center, and right — for copyright text,
    legal links, secondary navigation, and contact information.
  </p>

  <!-- ─── What / When / Why ─────────────────────────────── -->
  <h2>What, When &amp; Why</h2>

  <h3>What is it?</h3>
  <p>
    A horizontal bar using the native <code>&lt;footer&gt;</code> element with three
    snippet slots (left, center, right) that stack into a single centered column on
    small screens.
  </p>

  <h3>When should I use it?</h3>
  <p>
    Place <code>&lt;Footer&gt;</code> in the <code>footer</code> slot of
    <code>&lt;App&gt;</code> on every page. Use it for copyright notices, legal links,
    social media links, and contact information.
  </p>

  <h3>Why does it exist?</h3>
  <ul>
    <li><strong>Convention</strong> — users expect to find legal info and secondary
      links at the bottom of every page (Jakob's Law).</li>
    <li><strong>Accessibility</strong> — the native <code>&lt;footer&gt;</code> element
      creates a landmark that screen-reader users can jump to directly.</li>
    <li><strong>Consistency</strong> — a single component ensures the same footer
      structure across every page.</li>
  </ul>

  <h3>Sources</h3>
  <ul>
    <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/">WAI-ARIA APG — Landmarks</a></li>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/footer">MDN — &lt;footer&gt;</a></li>
    <li><a href="https://primer.style/product/components/PageLayout">Primer — PageLayout</a></li>
  </ul>

  <!-- ─── Responsiveness ────────────────────────────────── -->
  
<h2>Twintrinsic Implementation</h2>
<ul>
    <li>Semantic `&lt;footer&gt;` element as root</li>
    <li>Three-region layout: `footer-left`, `footer-center`, `footer-right` via CSS flexbox</li>
    <li>Accepts `left`, `center`, `right` snippets for flexible content</li>
    <li>`...rest` spread on `&lt;footer&gt;` for native attributes</li>
</ul>

<h2>Common Mistakes</h2>
<ul>
    <li>Don't put primary navigation in the footer — it belongs in the header or sidebar</li>
    <li>Don't use `&lt;div&gt;` — always `&lt;footer&gt;` for landmark semantics</li>
    <li>Don't forget copyright year can be dynamic via JS</li>
</ul>

<h2>Related Components</h2>
<p>App, AppHeader, Separator</p>

<h2>Responsiveness</h2>
  <ul>
    <li><strong>Desktop</strong> — left, center, and right regions are displayed in a
      horizontal row with appropriate spacing.</li>
    <li><strong>Mobile (&lt; 640 px)</strong> — regions stack vertically into a single
      centered column for readability.</li>
    <li>Empty regions are not rendered, so no stray whitespace appears.</li>
  </ul>

  <!-- ─── Customization ─────────────────────────────────── -->
  <h2>Customization</h2>
  <ul>
    <li>Each region (left, center, right) accepts any Svelte content via snippets.</li>
    <li>Use the <code>class</code> prop to add custom Tailwind classes.</li>
    <li>Theme colors and borders are controlled by the Tailwind theme.</li>
  </ul>

  <!-- ─── Examples ──────────────────────────────────────── -->
  <h2>Examples</h2>

  <h3>Three-Region Footer</h3>
  <ExampleTabs code={`<Footer>
  {#snippet left()}<p>© 2026 Twintrinsic</p>{/snippet}
  {#snippet center()}<p>Privacy Policy · Terms</p>{/snippet}
  {#snippet right()}<p>Contact Us</p>{/snippet}
</Footer>`}>
    <div data-testid="footer-basic">
      <Footer>
        {#snippet left()}<p>© 2026 Twintrinsic</p>{/snippet}
        {#snippet center()}<p>Privacy Policy · Terms</p>{/snippet}
        {#snippet right()}<p>Contact Us</p>{/snippet}
      </Footer>
    </div>
  </ExampleTabs>

  <h3>Center-Only Footer</h3>
  <ExampleTabs code={`<Footer>
  {#snippet center()}<p>Copyright © 2026 Twintrinsic</p>{/snippet}
</Footer>`}>
    <div data-testid="footer-center-only">
      <Footer>
        {#snippet center()}<p>Copyright © 2026 Twintrinsic</p>{/snippet}
      </Footer>
    </div>
  </ExampleTabs>

  <!-- ─── Slots ─────────────────────────────────────────── -->
  <h2>Slots</h2>
  <table>
    <thead>
      <tr><th>Slot</th><th>Description</th></tr>
    </thead>
    <tbody>
      <tr><td><code>left</code></td><td>Left-aligned content (copyright, version info)</td></tr>
      <tr><td><code>center</code></td><td>Center-aligned content (legal links, secondary nav)</td></tr>
      <tr><td><code>right</code></td><td>Right-aligned content (contact info, social links)</td></tr>
    </tbody>
  </table>

  <!-- ─── Props ─────────────────────────────────────────── -->
  <h2>Props</h2>
  <PropsTable component={FooterModule} />

  <!-- ─── Accessibility ─────────────────────────────────── -->
  <h2>Accessibility</h2>
  <ul>
    <li>Uses the native <code>&lt;footer&gt;</code> element, which automatically
      creates an ARIA landmark.</li>
    <li>Screen-reader users can jump directly to the footer using landmark navigation.</li>
    <li>Links inside the footer are standard <code>&lt;a&gt;</code> elements with
      full keyboard support.</li>
  </ul>

  <!-- ─── Keyboard Support ──────────────────────────────── -->
  <h2>Keyboard Support</h2>
  <p>
    The Footer component itself does not contain custom interactive elements.
    Keyboard support is handled by the standard <code>&lt;a&gt;</code> links placed
    inside its slots.
  </p>
</Container>

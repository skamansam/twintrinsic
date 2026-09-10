<script lang="ts">
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import Container from "$lib/components/Container/Container.svelte"
import Footer from "$lib/components/Footer/Footer.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as FooterModule from "$lib/components/Footer/Footer.svelte"
import { m } from "$lib/paraglide/messages.js"
</script>
<!--
@component
Footer documentation page — standardized structure
-->

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>
<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>{m.footer_heading()}</h1>

  <!-- ─── Description ───────────────────────────────────── -->
  <p>
    <strong>{m.footer_heading()}</strong>{m.footer_intro_1()}
  </p>

  <!-- ─── What / When / Why ─────────────────────────────── -->
  <h2>{m.sec_what_when_why()}</h2>

  <h3>{m.sec_what()}</h3>
  <p>
    {m.footer_what_1()}<code>&lt;footer&gt;</code>{m.footer_what_2()}
  </p>

  <h3>{m.sec_when()}</h3>
  <p>
    {m.footer_when_1()}<code>&lt;Footer&gt;</code>{m.footer_when_2()}<code>footer</code>{m.footer_when_3()}<code>&lt;App&gt;</code>{m.footer_when_4()}
  </p>

  <h3>{m.sec_why()}</h3>
  <ul>
    <li><strong>{m.footer_why_convention()}</strong> — {m.footer_why_convention_desc()}</li>
    <li><strong>{m.footer_why_a11y()}</strong> — {m.footer_why_a11y_desc_1()}<code>&lt;footer&gt;</code>{m.footer_why_a11y_desc_2()}</li>
    <li><strong>{m.footer_why_consistency()}</strong> — {m.footer_why_consistency_desc()}</li>
  </ul>

  <h3>{m.sec_sources()}</h3>
  <ul>
    <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/">WAI-ARIA APG — Landmarks</a></li>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/footer">MDN — &lt;footer&gt;</a></li>
    <li><a href="https://primer.style/product/components/PageLayout">Primer — PageLayout</a></li>
  </ul>

<h2>{m.sec_implementation()}</h2>
<ul>
    <li>{m.footer_impl_1()}</li>
    <li>{m.footer_impl_2()}</li>
    <li>{m.footer_impl_3()}</li>
    <li>{m.footer_impl_4()}</li>
</ul>

<h2>{m.sec_mistakes()}</h2>
<ul>
    <li>{m.footer_mistake_1()}</li>
    <li>{m.footer_mistake_2()}</li>
    <li>{m.footer_mistake_3()}</li>
</ul>

<h2>{m.sec_related()}</h2>
<p>App, AppHeader, Separator</p>

<h2>{m.sec_responsiveness()}</h2>
  <ul>
    <li><strong>{m.footer_responsive_desktop()}</strong>{m.footer_responsive_1()}</li>
    <li><strong>{m.footer_responsive_mobile()}</strong>{m.footer_responsive_2()}</li>
    <li>{m.footer_responsive_3()}</li>
  </ul>

  <!-- ─── Customization ─────────────────────────────────── -->
  <h2>{m.sec_customization()}</h2>
  <ul>
    <li>{m.footer_custom_1()}</li>
    <li>{m.footer_custom_2_pre()}<code>class</code>{m.footer_custom_2_post()}</li>
    <li>{m.footer_custom_3()}</li>
  </ul>

  <!-- ─── Examples ──────────────────────────────────────── -->
  <h2>{m.sec_examples()}</h2>

  <h3>{m.footer_ex_basic()}</h3>
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

  <h3>{m.footer_ex_center()}</h3>
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
  <h2>{m.sec_slots()}</h2>
  <table>
    <thead>
      <tr><th>{m.sec_slot()}</th><th>{m.sec_description()}</th></tr>
    </thead>
    <tbody>
      <tr><td><code>left</code></td><td>{m.footer_slot_left()}</td></tr>
      <tr><td><code>center</code></td><td>{m.footer_slot_center()}</td></tr>
      <tr><td><code>right</code></td><td>{m.footer_slot_right()}</td></tr>
    </tbody>
  </table>

  <!-- ─── Props ─────────────────────────────────────────── -->
  <h2>{m.sec_props()}</h2>
  <PropsTable component={FooterModule} />

  <!-- ─── Accessibility ─────────────────────────────────── -->
  <h2>{m.sec_accessibility()}</h2>
  <ul>
    <li>{m.footer_a11y_1_1()}<code>&lt;footer&gt;</code>{m.footer_a11y_1_2()}</li>
    <li>{m.footer_a11y_2()}</li>
    <li>{m.footer_a11y_3_1()}<code>&lt;a&gt;</code>{m.footer_a11y_3_2()}</li>
  </ul>

  <!-- ─── Keyboard Support ──────────────────────────────── -->
  <h2>{m.sec_keyboard()}</h2>
  <p>
    {m.footer_kb_1()}<code>&lt;a&gt;</code>{m.footer_kb_2()}
  </p>
</Container>

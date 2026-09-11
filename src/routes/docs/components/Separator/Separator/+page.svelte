<!--
@component
Separator documentation page — standardized structure
-->
<script lang="ts">
import Container from "$lib/components/Container/Container.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import Separator from "$lib/components/Separator/Separator.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as SeparatorModule from "$lib/components/Separator/Separator.svelte"
import { m } from "$lib/paraglide/messages.js"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>{m.separator_heading()}</h1>

  <p>
    <strong>{m.separator_heading()}</strong>{m.separator_intro_1()}
  </p>

  <h2>{m.sec_what_when_why()}</h2>

  <h3>{m.sec_what()}</h3>
  <p>
    {m.separator_what_1()}<code>&lt;hr&gt;</code>{m.separator_what_2()}<code>&lt;div&gt;</code>{m.separator_what_3()}<code>role="separator"</code>{m.separator_what_4()}
  </p>

  <h3>{m.sec_when()}</h3>
  <p>
    {m.separator_when_1()}<code>&lt;Separator&gt;</code>{m.separator_when_2()}<code>&lt;Section&gt;</code>{m.separator_when_3()}
  </p>

  <h3>{m.sec_why()}</h3>
  <ul>
    <li><strong>{m.separator_why_semantic()}</strong> — {m.separator_why_semantic_desc_1()}<code>&lt;hr&gt;</code>{m.separator_why_semantic_desc_2()}</li>
    <li><strong>{m.separator_why_a11y()}</strong> — {m.separator_why_a11y_desc()}</li>
    <li><strong>{m.separator_why_flexible()}</strong> — {m.separator_why_flexible_desc()}</li>
  </ul>

  <h3>{m.sec_sources()}</h3>
  <ul>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/hr">MDN — &lt;hr&gt;</a></li>
    <li><a href="https://www.w3.org/TR/wai-aria-1.2/#separator">WAI-ARIA — separator role</a></li>
    <li><a href="https://primer.style/components/leading">Primer — Leading</a></li>
    <li><a href="https://m3.material.io/components/divider/overview">Material Design 3 — Divider</a></li>
    <li><a href="https://ant.design/components/divider">Ant Design — Divider</a></li>
  </ul>

  <h2>{m.sec_implementation()}</h2>
  <ul>
    <li>{m.separator_impl_1()}</li>
    <li>{m.separator_impl_2()}</li>
    <li>{m.separator_impl_3()}</li>
    <li>{m.separator_impl_4()}</li>
  </ul>

  <h2>{m.sec_mistakes()}</h2>
  <ul>
    <li>{m.separator_mistake_1()}</li>
    <li>{m.separator_mistake_2()}</li>
  </ul>

  <h2>{m.sec_related()}</h2>
  <p>Container, Section, Card</p>

  <h2>{m.sec_responsiveness()}</h2>
  <ul>
    <li>{m.separator_responsive_1()}</li>
    <li>{m.separator_responsive_2()}</li>
    <li>{m.separator_responsive_3()}</li>
  </ul>

  <h2>{m.sec_customization()}</h2>
  <ul>
    <li><code>vertical</code>{m.separator_custom_1()}</li>
    <li><code>color</code>{m.separator_custom_2_1()}<code>"default"</code>{m.separator_custom_2_2()}<code>"primary"</code>{m.separator_custom_2_3()}<code>"success"</code>{m.separator_custom_2_4()}<code>"warning"</code>{m.separator_custom_2_5()}<code>"error"</code>{m.separator_custom_2_6()}</li>
    <li>{m.separator_custom_3()}</li>
  </ul>

  <h2>{m.sec_examples()}</h2>

  <h3>{m.separator_ex_basic()}</h3>
  <ExampleTabs code={`<Separator />`}>
    <div data-testid="separator-basic">
      <p class="mb-4">Content above</p>
      <Separator />
      <p class="mt-4">Content below</p>
    </div>
  </ExampleTabs>

  <h3>{m.separator_ex_text()}</h3>
  <ExampleTabs code={`<Separator>or</Separator>`}>
    <div data-testid="separator-with-text">
      <Separator>or</Separator>
    </div>
  </ExampleTabs>

  <h3>{m.separator_ex_vertical()}</h3>
  <ExampleTabs code={`<div class="h-32 flex items-center">
  <span>Left content</span>
  <Separator vertical />
  <span>Right content</span>
</div>`}>
    <div class="h-32 flex items-center" data-testid="separator-vertical">
      <span>Left content</span>
      <Separator vertical />
      <span>Right content</span>
    </div>
  </ExampleTabs>

  <h3>{m.separator_ex_colors()}</h3>
  <ExampleTabs code={`<Separator color="default">Default</Separator>
<Separator color="primary">Primary</Separator>
<Separator color="success">Success</Separator>
<Separator color="warning">Warning</Separator>
<Separator color="error">Error</Separator>`}>
    <div class="space-y-4" data-testid="separator-color-variants">
      <Separator color="default">Default</Separator>
      <Separator color="primary">Primary</Separator>
      <Separator color="success">Success</Separator>
      <Separator color="warning">Warning</Separator>
      <Separator color="error">Error</Separator>
    </div>
  </ExampleTabs>

  <h2>{m.sec_slots()}</h2>
  <table>
    <thead><tr><th>{m.sec_slot()}</th><th>{m.sec_description()}</th></tr></thead>
    <tbody>
      <tr><td><code>default</code></td><td>{m.separator_slot_default()}</td></tr>
    </tbody>
  </table>

  <h3>{m.separator_ex_content()}</h3>
  <ExampleTabs code={`<Separator>Or</Separator>`}>
    <div data-testid="separator-with-icon">
      <Separator>Or</Separator>
    </div>
  </ExampleTabs>

  <h2>{m.sec_props()}</h2>
  <PropsTable component={SeparatorModule} />

  <h2>{m.sec_accessibility()}</h2>
  <ul>
    <li>{m.separator_a11y_1_1()}<code>&lt;hr&gt;</code>{m.separator_a11y_1_2()}</li>
    <li>{m.separator_a11y_2_1()}<code>role="separator"</code>{m.separator_a11y_2_2()}<code>aria-orientation</code>{m.separator_a11y_2_3()}</li>
    <li>{m.separator_a11y_3_1()}<code>ariaLabel</code>{m.separator_a11y_3_2()}</li>
  </ul>

  <h2>{m.sec_keyboard()}</h2>
  <p>
    {m.separator_kb_1()}
  </p>
</Container>

<!--
@component
Container documentation page — standardized structure
-->
<script lang="ts">
import Container from "$lib/components/Container/Container.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as ContainerModule from "$lib/components/Container/Container.svelte"
import { m } from "$lib/paraglide/messages.js"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>{m.container_heading()}</h1>

  <p>
    <strong>{m.container_heading()}</strong>{m.container_intro_1()}
  </p>

  <h2>{m.sec_what_when_why()}</h2>

  <h3>{m.sec_what()}</h3>
  <p>
    {m.container_what_1()}<code>&lt;section&gt;</code>{m.container_what_2()}<code>&lt;main&gt;</code>{m.container_what_3()}<code>&lt;article&gt;</code>{m.container_what_4()}
  </p>

  <h3>{m.sec_when()}</h3>
  <p>
    {m.container_when_1()}<code>&lt;Container&gt;</code>{m.container_when_2()}<code>&lt;Card&gt;</code>{m.container_when_3()}<code>&lt;Panel&gt;</code>{m.container_when_4()}
  </p>

  <h3>{m.sec_why()}</h3>
  <ul>
    <li><strong>{m.container_why_spacing()}</strong> — {m.container_why_spacing_desc()}</li>
    <li><strong>{m.container_why_polymorphic()}</strong> — {m.container_why_poly_desc_1()}<code>&lt;main&gt;</code>{m.container_why_poly_desc_2()}<code>&lt;section&gt;</code>{m.container_why_poly_desc_3()}</li>
    <li><strong>{m.container_why_fluid()}</strong> — <code>fluid</code>{m.container_why_fluid_desc()}</li>
  </ul>

  <h3>{m.sec_sources()}</h3>
  <ul>
    <li><a href="https://tailwindcss.com/docs/container">Tailwind CSS — Container</a></li>
    <li><a href="https://primer.style/components/box">Primer — Box</a></li>
    <li><a href="https://m3.material.io/foundations/layout/applying-layout/overview">Material Design 3 — Layout</a></li>
    <li><a href="https://ant.design/components/layout">Ant Design — Layout</a></li>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/section">MDN — &lt;section&gt;</a></li>
  </ul>

  <h2>{m.sec_implementation()}</h2>
  <ul>
    <li>{m.container_impl_1()}</li>
    <li>{m.container_impl_2()}</li>
    <li>{m.container_impl_3()}</li>
    <li>{m.container_impl_4()}</li>
  </ul>

  <h2>{m.sec_mistakes()}</h2>
  <ul>
    <li>{m.container_mistake_1()}</li>
    <li>{m.container_mistake_2()}</li>
  </ul>

  <h2>{m.sec_related()}</h2>
  <p>Card, App, Section</p>

  <h2>{m.sec_responsiveness()}</h2>
  <ul>
    <li>{m.container_responsive_1()}</li>
    <li>{m.container_responsive_2()}</li>
  </ul>

  <h2>{m.sec_customization()}</h2>
  <ul>
    <li><code>as</code>{m.container_custom_1_1()}{m.container_custom_1_2()}</li>
    <li><code>fluid</code>{m.container_custom_2()}</li>
    <li><code>role</code>{m.container_custom_3_1()}<code>ariaLabel</code>{m.container_custom_3_2()}</li>
  </ul>

  <h2>{m.sec_examples()}</h2>

  <h3>{m.container_ex_basic()}</h3>
  <ExampleTabs code={`<Container class="bg-surface p-4">
  <div class="bg-primary-100 dark:bg-primary-800 p-4 rounded">
    <p>Content in a basic container</p>
  </div>
</Container>`}>
    <div data-testid="container-basic">
      <Container class="bg-surface p-4">
        <div class="bg-primary-100 dark:bg-primary-800 p-4 rounded">
          <p>Content in a basic container</p>
        </div>
      </Container>
    </div>
  </ExampleTabs>

  <h3>{m.container_ex_fluid()}</h3>
  <ExampleTabs code={`<Container fluid class="bg-surface p-4">
  <div class="bg-primary-100 dark:bg-primary-800 p-4 rounded">
    <p>Content in a fluid container</p>
  </div>
</Container>`}>
    <div data-testid="container-fluid">
      <Container fluid class="bg-surface p-4">
        <div class="bg-primary-100 dark:bg-primary-800 p-4 rounded">
          <p>Content in a fluid container</p>
        </div>
      </Container>
    </div>
  </ExampleTabs>

  <h3>{m.container_ex_semantic()}</h3>
  <ExampleTabs code={`<Container as="main" role="main" ariaLabel="Main content">
  <!-- Content -->
</Container>`}>
    <div data-testid="container-semantic">
      <Container as="main" role="main" ariaLabel="Main content" class="bg-surface p-4 rounded">
        <p>This renders as a <code>&lt;main&gt;</code> element with <code>role="main"</code>.</p>
      </Container>
    </div>
  </ExampleTabs>

  <h2>{m.container_compare_heading()}</h2>
  <table>
    <thead><tr><th>{m.container_compare_component()}</th><th>{m.container_compare_when()}</th><th>{m.container_compare_el()}</th></tr></thead>
    <tbody>
      <tr><td><strong>Container</strong></td><td>{m.container_compare_container()}</td><td><code>&lt;div&gt;</code> / semantic</td></tr>
      <tr><td><strong>Card</strong></td><td>{m.container_compare_card()}</td><td><code>&lt;article&gt;</code></td></tr>
      <tr><td><strong>Panel</strong></td><td>{m.container_compare_panel()}</td><td><code>&lt;details&gt;</code></td></tr>
    </tbody>
  </table>

  <h2>{m.sec_props()}</h2>
  <PropsTable component={ContainerModule} />

  <h2>{m.sec_accessibility()}</h2>
  <ul>
    <li>{m.container_a11y_1_1()}<code>as</code>{m.container_a11y_1_2()}<code>&lt;main&gt;</code>{m.container_a11y_1_3()}<code>&lt;section&gt;</code>{m.container_a11y_1_4()}</li>
    <li>{m.container_a11y_2_1()}<code>role</code>{m.container_a11y_2_2()}<code>ariaLabel</code>{m.container_a11y_2_3()}</li>
    <li>{m.container_a11y_3()}</li>
  </ul>

  <h2>{m.sec_keyboard()}</h2>
  <p>
    {m.container_kb_1()}
  </p>
</Container>

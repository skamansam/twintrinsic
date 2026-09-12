<!--
@component
Slider documentation page — standardized structure
-->
<script lang="ts">
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import Container from "$lib/components/Container/Container.svelte"
import Slider from "$lib/components/Form/Slider.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as SliderModule from "$lib/components/Form/Slider.svelte"
import { m } from "$lib/paraglide/messages.js"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>{m.slider_heading()}</h1>

  <p>
    <strong>{m.slider_heading()}</strong>{m.slider_lede_1()}
  </p>

  <h2>{m.sec_what_when_why()}</h2>

  <h3>{m.sec_what()}</h3>
  <p>{m.slider_what_1()}</p>

  <h3>{m.sec_when()}</h3>
  <p>
    {m.slider_when_1()}<code>&lt;Slider&gt;</code>{m.slider_when_2()}<code>&lt;NumberInput&gt;</code>{m.slider_when_3()}
  </p>

  <h3>{m.sec_why()}</h3>
  <ul>
    <li><strong>{m.slider_why_intuitive()}</strong>{m.slider_why_intuitive_1()}</li>
    <li><strong>{m.slider_why_efficient()}</strong>{m.slider_why_efficient_1()}</li>
    <li><strong>{m.slider_why_accessible()}</strong>{m.slider_why_accessible_1()}</li>
  </ul>

  <h3>{m.sec_sources()}</h3>
  <ul>
    <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/slider/">WAI-ARIA APG — Slider</a></li>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range">MDN — range input</a></li>
    <li><a href="https://m3.material.io/components/sliders/overview">Material Design 3 — Sliders</a></li>
  </ul>

  <h2>{m.sec_implementation()}</h2>
  <ul>
    <li>{m.slider_impl_1()}</li>
    <li>{m.slider_impl_2()}</li>
    <li>{m.slider_impl_3()}</li>
    <li>{m.slider_impl_4()}</li>
    <li>{m.slider_impl_5()}</li>
  </ul>

  <h2>{m.sec_mistakes()}</h2>
  <ul>
    <li>{m.slider_mistake_1()}</li>
    <li>{m.slider_mistake_2()}</li>
  </ul>

  <h2>{m.sec_related()}</h2>
  <p>{m.slider_related_1()}</p>

  <h2>{m.sec_responsiveness()}</h2>
  <ul>
    <li>{m.slider_responsive_1()}</li>
    <li>{m.slider_responsive_2()}</li>
    <li>{m.slider_responsive_3()}</li>
  </ul>

  <h2>{m.sec_customization()}</h2>
  <ul>
    <li>{m.slider_custom_1_1()}<code>primary</code>, <code>secondary</code>, <code>success</code>, <code>warning</code>, <code>error</code>, <code>info</code>{m.slider_custom_1_2()}</li>
    <li>{m.slider_custom_2()}</li>
    <li>{m.slider_custom_3_1()}<code>valueFormat</code>{m.slider_custom_3_2()}</li>
  </ul>

  <h2>{m.sec_examples()}</h2>

  <h3>{m.slider_ex_basic()}</h3>
  <ExampleTabs code={`<Slider value={50} min={0} max={100} />`}>
    <div class="max-w-xl" data-testid="slider-basic">
      <Slider value={50} min={0} max={100} />
    </div>
  </ExampleTabs>

  <h3>{m.slider_ex_ticks()}</h3>
  <ExampleTabs code={`<Slider value={50} min={0} max={100} step={10} showTicks showValue />`}>
    <div class="max-w-xl" data-testid="slider-ticks">
      <Slider value={50} min={0} max={100} step={10} showTicks showValue />
    </div>
  </ExampleTabs>

  <h3>{m.slider_ex_tooltip()}</h3>
  <ExampleTabs code={`<Slider value={50} min={0} max={100} showTooltip />`}>
    <div class="max-w-xl" data-testid="slider-tooltip">
      <Slider value={50} min={0} max={100} showTooltip />
    </div>
  </ExampleTabs>

  <h3>{m.slider_ex_variants()}</h3>
  <ExampleTabs code={`<Slider value={30} min={0} max={100} variant="primary" />
<Slider value={40} min={0} max={100} variant="secondary" />
<Slider value={50} min={0} max={100} variant="success" />
<Slider value={60} min={0} max={100} variant="warning" />
<Slider value={70} min={0} max={100} variant="error" />
<Slider value={80} min={0} max={100} variant="info" />`}>
    <div class="max-w-xl space-y-4" data-testid="slider-variants">
      <Slider value={30} min={0} max={100} variant="primary" />
      <Slider value={40} min={0} max={100} variant="secondary" />
      <Slider value={50} min={0} max={100} variant="success" />
      <Slider value={60} min={0} max={100} variant="warning" />
      <Slider value={70} min={0} max={100} variant="error" />
      <Slider value={80} min={0} max={100} variant="info" />
    </div>
  </ExampleTabs>

  <h3>{m.slider_ex_vertical()}</h3>
  <ExampleTabs code={`<Slider value={50} min={0} max={100} orientation="vertical" />`}>
    <div class="flex items-center space-x-8 h-48" data-testid="slider-vertical">
      <Slider value={50} min={0} max={100} orientation="vertical" />
      <Slider value={70} min={0} max={100} orientation="vertical" showTicks showValue />
    </div>
  </ExampleTabs>

  <h3>{m.slider_ex_disabled()}</h3>
  <ExampleTabs code={`<Slider value={50} min={0} max={100} disabled />`}>
    <div class="max-w-xl" data-testid="slider-disabled">
      <Slider value={50} min={0} max={100} disabled />
    </div>
  </ExampleTabs>

  <h2>{m.sec_props()}</h2>
  <PropsTable component={SliderModule} />

  <h2>{m.sec_events()}</h2>
  <EventsTable component={SliderModule} />

  <h2>{m.sec_accessibility()}</h2>
  <ul>
    <li>{m.slider_a11y_1_1()}<code>role="slider"</code>{m.slider_a11y_1_2()}<code>aria-valuemin</code>{m.slider_a11y_1_3()}<code>aria-valuemax</code>, <code>aria-valuenow</code>{m.slider_a11y_1_4()}</li>
    <li><code>aria-orientation</code>{m.slider_a11y_2_2()}</li>
    <li>{m.slider_a11y_3()}</li>
  </ul>

  <h2>{m.sec_keyboard()}</h2>
  <table>
    <thead><tr><th>{m.sec_key()}</th><th>{m.sec_function()}</th></tr></thead>
    <tbody>
      <tr><td><kbd>Arrow Right</kbd> / <kbd>Arrow Up</kbd></td><td>{m.slider_kb_right()}</td></tr>
      <tr><td><kbd>Arrow Left</kbd> / <kbd>Arrow Down</kbd></td><td>{m.slider_kb_left()}</td></tr>
      <tr><td><kbd>Page Up</kbd></td><td>{m.slider_kb_pgup()}</td></tr>
      <tr><td><kbd>Page Down</kbd></td><td>{m.slider_kb_pgdn()}</td></tr>
      <tr><td><kbd>Home</kbd></td><td>{m.slider_kb_home()}</td></tr>
      <tr><td><kbd>End</kbd></td><td>{m.slider_kb_end()}</td></tr>
    </tbody>
  </table>
</Container>

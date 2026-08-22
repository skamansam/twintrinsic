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
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>Slider</h1>

  <p>
    <strong>Slider</strong> is an input for selecting a value or range from within a
    given minimum and maximum. It supports horizontal and vertical orientations,
    tick marks, tooltips, and multiple visual variants.
  </p>

  <h2>What, When &amp; Why</h2>

  <h3>What is it?</h3>
  <p>
    A draggable thumb along a track that maps position to a numeric value. Supports
    single-thumb (discrete value) and multi-thumb (range) modes.
  </p>

  <h3>When should I use it?</h3>
  <p>
    Use <code>&lt;Slider&gt;</code> for approximate values on a continuous range:
    volume, brightness, price range, filter thresholds. For exact numeric input,
    use <code>&lt;NumberInput&gt;</code> instead.
  </p>

  <h3>Why does it exist?</h3>
  <ul>
    <li><strong>Intuitive</strong> — the spatial metaphor (left = less, right = more) is universally understood.</li>
    <li><strong>Efficient</strong> — one drag gesture covers the full range faster than typing.</li>
    <li><strong>Accessible</strong> — follows WAI-ARIA slider pattern with arrow key support.</li>
  </ul>

  <h3>Sources</h3>
  <ul>
    <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/slider/">WAI-ARIA APG — Slider</a></li>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range">MDN — range input</a></li>
    <li><a href="https://m3.material.io/components/sliders/overview">Material Design 3 — Sliders</a></li>
  </ul>

  <h2>Responsiveness</h2>
  <ul>
    <li>Horizontal sliders fill their container width by default.</li>
    <li>Vertical sliders require an explicit height on the parent.</li>
    <li>Touch targets meet 44×44 px minimum for mobile drag areas.</li>
  </ul>

  <h2>Customization</h2>
  <ul>
    <li>Variants: <code>primary</code>, <code>secondary</code>, <code>success</code>, <code>warning</code>, <code>error</code>, <code>info</code>.</li>
    <li>Show tick marks, value labels, and tooltips via props.</li>
    <li>Custom value formatting via <code>valueFormat</code>.</li>
  </ul>

  <h2>Examples</h2>

  <h3>Basic Slider</h3>
  <ExampleTabs code={`<Slider value={50} min={0} max={100} />`}>
    <div class="max-w-xl" data-testid="slider-basic">
      <Slider value={50} min={0} max={100} />
    </div>
  </ExampleTabs>

  <h3>With Ticks and Value</h3>
  <ExampleTabs code={`<Slider value={50} min={0} max={100} step={10} showTicks showValue />`}>
    <div class="max-w-xl" data-testid="slider-ticks">
      <Slider value={50} min={0} max={100} step={10} showTicks showValue />
    </div>
  </ExampleTabs>

  <h3>With Tooltip</h3>
  <ExampleTabs code={`<Slider value={50} min={0} max={100} showTooltip />`}>
    <div class="max-w-xl" data-testid="slider-tooltip">
      <Slider value={50} min={0} max={100} showTooltip />
    </div>
  </ExampleTabs>

  <h3>Variants</h3>
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

  <h3>Vertical Orientation</h3>
  <ExampleTabs code={`<Slider value={50} min={0} max={100} orientation="vertical" />`}>
    <div class="flex items-center space-x-8 h-48" data-testid="slider-vertical">
      <Slider value={50} min={0} max={100} orientation="vertical" />
      <Slider value={70} min={0} max={100} orientation="vertical" showTicks showValue />
    </div>
  </ExampleTabs>

  <h3>Disabled</h3>
  <ExampleTabs code={`<Slider value={50} min={0} max={100} disabled />`}>
    <div class="max-w-xl" data-testid="slider-disabled">
      <Slider value={50} min={0} max={100} disabled />
    </div>
  </ExampleTabs>

  <h2>Props</h2>
  <PropsTable component={SliderModule} />

  <h2>Events</h2>
  <EventsTable component={SliderModule} />

  <h2>Accessibility</h2>
  <ul>
    <li>Uses <code>role="slider"</code> with <code>aria-valuemin</code>,
      <code>aria-valuemax</code>, <code>aria-valuenow</code>.</li>
    <li><code>aria-orientation</code> indicates horizontal or vertical.</li>
    <li>Visible focus ring on the thumb.</li>
  </ul>

  <h2>Keyboard Support</h2>
  <table>
    <thead><tr><th>Key</th><th>Function</th></tr></thead>
    <tbody>
      <tr><td><kbd>Arrow Right</kbd> / <kbd>Arrow Up</kbd></td><td>Increase value by one step</td></tr>
      <tr><td><kbd>Arrow Left</kbd> / <kbd>Arrow Down</kbd></td><td>Decrease value by one step</td></tr>
      <tr><td><kbd>Page Up</kbd></td><td>Increase by 10 steps</td></tr>
      <tr><td><kbd>Page Down</kbd></td><td>Decrease by 10 steps</td></tr>
      <tr><td><kbd>Home</kbd></td><td>Set to minimum</td></tr>
      <tr><td><kbd>End</kbd></td><td>Set to maximum</td></tr>
    </tbody>
  </table>
</Container>

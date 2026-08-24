<!--
@component
Knob documentation page — standardized structure
-->
<script lang="ts">
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import FormField from "$lib/components/Form/FormField.svelte"
import Knob from "$lib/components/Form/Knob.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as KnobModule from "$lib/components/Form/Knob.svelte"
import Container from "$lib/components/Container/Container.svelte"

const valueDisplayCode = `<Knob name="progress" value={75} showValue={true} valueTemplate="{value}%" />`
const sizesCode = `<Knob size="sm" value={25} />
<Knob size="md" value={50} />
<Knob size="lg" value={75} />`
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
<h1>Knob</h1>

<p>
  <strong>Knob</strong> is a circular rotary control for selecting a value within a
  range. Common in audio/video production, IoT dashboards, and industrial control UIs.
</p>

<h2>What, When &amp; Why</h2>

<h3>What is it?</h3>
<p>
  A circular SVG-based control with a draggable thumb that maps angle to value.
  Supports keyboard navigation (arrows, Home/End) and touch drag interaction.
</p>

<h3>When should I use it?</h3>
<p>
  Use <code>&lt;Knob&gt;</code> in domain-specific UIs that mimic physical hardware
  (audio mixers, light controls, scientific instruments). For general-purpose forms,
  use <code>&lt;Slider&gt;</code> instead.
</p>

<h3>Why does it exist?</h3>
<ul>
  <li><strong>Domain familiarity</strong> — audio engineers expect knobs for volume/pan controls.</li>
  <li><strong>Compact form factor</strong> — occupies less space than a horizontal slider.</li>
  <li><strong>WAI-ARIA slider pattern</strong> — full keyboard support with screen reader announcements.</li>
</ul>

<h2>Responsiveness</h2>
<ul>
  <li>Sizes: <code>sm</code> (48px), <code>md</code> (72px), <code>lg</code> (96px).</li>
  <li>Touch drag works on mobile; keyboard fallback always available.</li>
</ul>

<h2>Customization</h2>
<ul>
  <li>Custom color, thickness, tick marks.</li>
  <li>Value display with custom template.</li>
  <li>Min/max/step configuration.</li>
</ul>

<h2>Examples</h2>

<h3>Basic Usage</h3>
<ExampleTabs code={`<Knob name="volume" value={50} min={0} max={100} />`}>
  <div class="max-w-md flex justify-center" data-testid="knob-basic-usage">
    <Knob name="volume" value={50} min={0} max={100} />
  </div>
</ExampleTabs>

<h3>With Value Display</h3>
<ExampleTabs code={valueDisplayCode}>
  <div class="max-w-md flex justify-center" data-testid="knob-value-display">
    <Knob name="progress" value={75} showValue={true} valueTemplate="{75}%" />
  </div>
</ExampleTabs>

<h3>Different Sizes</h3>
<ExampleTabs code={sizesCode}>
  <div class="max-w-md flex items-center justify-center gap-8" data-testid="knob-sizes">
    <div class="flex flex-col items-center"><span class="text-sm mb-2">Small</span><Knob size="sm" value={25} /></div>
    <div class="flex flex-col items-center"><span class="text-sm mb-2">Medium</span><Knob size="md" value={50} /></div>
    <div class="flex flex-col items-center"><span class="text-sm mb-2">Large</span><Knob size="lg" value={75} /></div>
  </div>
</ExampleTabs>

<h3>Disabled</h3>
<ExampleTabs code={`<Knob value={65} disabled={true} />`}>
  <div class="max-w-md flex justify-center" data-testid="knob-disabled-state">
    <Knob value={65} disabled={true} />
  </div>
</ExampleTabs>

  <h3>With FormField</h3>
  <ExampleTabs code={`<FormField label="Volume">
  <Knob min={0} max={100} value={50} />
</FormField>`}>
    <div data-testid="knob-formfield">
      <FormField label="Volume">
        <Knob min={0} max={100} value={50} />
      </FormField>
    </div>
  </ExampleTabs>

<h2>Props</h2>
<PropsTable component={KnobModule} />

<h2>Events</h2>
<EventsTable component={KnobModule} />

<h2>Accessibility</h2>
<ul>
  <li><code>role="slider"</code> with <code>aria-valuemin</code>, <code>aria-valuemax</code>, <code>aria-valuenow</code>.</li>
  <li>Arrow keys increment/decrement; Home/End for min/max.</li>
  <li>Visible focus ring.</li>
</ul>

<h2>Keyboard Support</h2>
<table>
  <thead><tr><th>Key</th><th>Function</th></tr></thead>
  <tbody>
    <tr><td><kbd>Arrow Up</kbd> / <kbd>Arrow Right</kbd></td><td>Increase value</td></tr>
    <tr><td><kbd>Arrow Down</kbd> / <kbd>Arrow Left</kbd></td><td>Decrease value</td></tr>
    <tr><td><kbd>Home</kbd></td><td>Set to minimum</td></tr>
    <tr><td><kbd>End</kbd></td><td>Set to maximum</td></tr>
  </tbody>
</table>
</Container>

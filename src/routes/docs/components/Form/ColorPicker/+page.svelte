<!--
@component
ColorPicker documentation page — standardized structure
-->
<script lang="ts">
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import ColorPicker from "$lib/components/Form/ColorPicker.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as ColorPickerModule from "$lib/components/Form/ColorPicker.svelte"
import Container from "$lib/components/Container/Container.svelte"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
<h1>ColorPicker</h1>

<p>
  <strong>ColorPicker</strong> provides an intuitive interface for color selection with
  a color wheel, hue/lightness sliders, and alpha channel support. Outputs in HEX,
  RGB, or HSL formats. Uses <code>popover="auto"</code> for the popup panel.
</p>

<h2>What, When &amp; Why</h2>

<h3>What is it?</h3>
<p>
  A color selection widget with a visual color wheel for hue/saturation, sliders for
  lightness and opacity, and a text input for direct color value entry.
</p>

<h3>When should I use it?</h3>
<p>
  Use <code>&lt;ColorPicker&gt;</code> when users need to select a custom color: theme
  customization, chart colors, design tools. For simple predefined color selection,
  use a set of radio buttons or swatches.
</p>

<h3>Why does it exist?</h3>
<ul>
  <li><strong>Visual selection</strong> — the color wheel is more intuitive than typing hex values.</li>
  <li><strong>Multiple formats</strong> — supports HEX, RGB, RGBA, HSL, HSLA output.</li>
  <li><strong>Alpha channel</strong> — optional opacity slider for transparent colors.</li>
</ul>

<h3>Sources</h3>
<ul>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/color">MDN — color input</a></li>
  <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/">WAI-ARIA APG — Forms</a></li>
</ul>

<h2>Responsiveness</h2>
<ul>
  <li>Color wheel and sliders adapt to container width.</li>
  <li>On mobile, the picker opens as a full-width overlay.</li>
  <li>Touch targets meet 44×44 px minimum.</li>
</ul>

<h2>Customization</h2>
<ul>
  <li>Output format: <code>hex</code>, <code>rgb</code>, <code>rgba</code>, <code>hsl</code>, <code>hsla</code>.</li>
  <li>Alpha channel via <code>showAlpha={true}</code>.</li>
  <li>Error state for invalid colors.</li>
</ul>

<h2>Examples</h2>

<h3>Basic Usage</h3>
<ExampleTabs code={`<ColorPicker label="Color" />`}>
  <div class="max-w-md" data-testid="colorpicker-basic">
    <ColorPicker label="Color" />
  </div>
</ExampleTabs>

<h3>With Initial Value</h3>
<ExampleTabs code={`<ColorPicker label="Color" value="#FF0000" />`}>
  <div class="max-w-md" data-testid="colorpicker-value">
    <ColorPicker label="Color" value="#FF0000" />
  </div>
</ExampleTabs>

<h3>RGB Format</h3>
<ExampleTabs code={`<ColorPicker label="Color" format="rgb" value="rgb(255, 0, 0)" />`}>
  <div class="max-w-md" data-testid="colorpicker-rgb">
    <ColorPicker label="Color" format="rgb" value="rgb(255, 0, 0)" />
  </div>
</ExampleTabs>

<h3>With Alpha Channel</h3>
<ExampleTabs code={`<ColorPicker label="Color" format="rgba" showAlpha={true} value="rgba(255, 0, 0, 0.5)" />`}>
  <div class="max-w-md" data-testid="colorpicker-rgba">
    <ColorPicker label="Color" format="rgba" showAlpha={true} value="rgba(255, 0, 0, 0.5)" />
  </div>
</ExampleTabs>

<h3>Error State</h3>
<ExampleTabs code={`<ColorPicker label="Color" error="Please select a valid color" />`}>
  <div class="max-w-md" data-testid="colorpicker-error">
    <ColorPicker label="Color" error="Please select a valid color" />
  </div>
</ExampleTabs>

  <h3>HSL Format</h3>
  <ExampleTabs code={`<ColorPicker format="hsl" />`}>
    <div class="max-w-md" data-testid="colorpicker-hsl">
      <ColorPicker format="hsl" />
    </div>
  </ExampleTabs>

<h2>Props</h2>
<PropsTable component={ColorPickerModule} />

<h2>Events</h2>
<EventsTable component={ColorPickerModule} />

<h2>Accessibility</h2>
<ul>
  <li>Color wheel uses proper ARIA roles and labels.</li>
  <li>Sliders have descriptive labels.</li>
  <li>Color values displayed in text format.</li>
  <li>Keyboard: arrow keys adjust sliders, Tab navigates controls.</li>
</ul>

<h2>Keyboard Support</h2>
<table>
  <thead><tr><th>Key</th><th>Function</th></tr></thead>
  <tbody>
    <tr><td><kbd>Enter</kbd> / <kbd>Space</kbd></td><td>Open/close color picker</td></tr>
    <tr><td><kbd>Tab</kbd></td><td>Navigate through controls</td></tr>
    <tr><td><kbd>Arrow Keys</kbd></td><td>Adjust slider values</td></tr>
    <tr><td><kbd>Escape</kbd></td><td>Close color picker</td></tr>
  </tbody>
</table>
</Container>

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
  <strong>ColorPicker</strong> is a color selection component built on the native
  <code>&lt;input type="color"&gt;</code> element. It uses the browser's built-in
  color picker for accessibility and cross-platform consistency, with a hex text
  input for precise value entry.
</p>

<h2>What, When &amp; Why</h2>

<h3>What is it?</h3>
<p>
  A form control that lets users pick a color using the browser's native color
  picker dialog. A companion hex text input allows direct entry of color values.
</p>

<h3>When should I use it?</h3>
<p>
  Use <code>&lt;ColorPicker&gt;</code> when users need to select a custom color:
  theme customization, chart colors, design tools. The native picker provides
  ARIA support and keyboard navigation for free. For predefined color selection,
  use a set of radio buttons or color swatches.
</p>

<h3>Why does it exist?</h3>
<ul>
  <li><strong>Accessible by default</strong> — native color pickers have built-in ARIA and keyboard support.</li>
  <li><strong>Cross-platform</strong> — the browser provides a consistent color picker experience.</li>
  <li><strong>Precise entry</strong> — the hex text input allows exact color values.</li>
  <li><strong>Lightweight</strong> — no custom color wheel JavaScript needed.</li>
</ul>

<h3>Sources</h3>
<ul>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/color">MDN — color input</a></li>
  <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/">WAI-ARIA APG — Forms</a></li>
</ul>

<h2>Twintrinsic Implementation</h2>
<ul>
    <li>Wraps native `&lt;input type="color"&gt;` with a hex text input</li>
    <li>Color swatch button shows the current color as the native picker's preview</li>
    <li>Hex input allows direct value entry with normalization (e.g., `#RGB` → `#RRGGBB`)</li>
    <li>Form context integration via `getContext('form')`</li>
</ul>

<h2>Common Mistakes</h2>
<ul>
    <li>Don't use `&lt;input type="text"&gt;` with a color pattern — `type="color"` gives you the native picker for free</li>
    <li>Don't forget `aria-label` when the input has no visible label</li>
</ul>

<h2>Related Components</h2>
<p>Input, Calendar, Slider</p>

<h2>Responsiveness</h2>
<ul>
  <li>Fills container width by default (<code>w-full</code>).</li>
  <li>On mobile, the native color picker opens as a system-native overlay.</li>
  <li>The hex input and color swatch sit side by side.</li>
</ul>

<h2>Customization</h2>
<ul>
  <li>Disabled state via <code>disabled</code>.</li>
  <li>Required validation via <code>required</code>.</li>
  <li>Error state via <code>error</code> prop.</li>
  <li>The color format is always hex (the native input's format).</li>
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

<h3>Error State</h3>
<ExampleTabs code={`<ColorPicker label="Color" error="Please select a valid color" />`}>
  <div class="max-w-md" data-testid="colorpicker-error">
    <ColorPicker label="Color" error="Please select a valid color" />
  </div>
</ExampleTabs>

<h3>Disabled</h3>
<ExampleTabs code={`<ColorPicker label="Color" value="#FF0000" disabled={true} />`}>
  <div class="max-w-md" data-testid="colorpicker-disabled">
    <ColorPicker label="Color" value="#FF0000" disabled={true} />
  </div>
</ExampleTabs>

<h3>Theme Colors</h3>
<ExampleTabs code={`<ColorPicker label="Primary" value="#6366F1" />\n<ColorPicker label="Secondary" value="#8B5CF6" />\n<ColorPicker label="Accent" value="#EC4899" />`}>
  <div class="max-w-md space-y-4" data-testid="colorpicker-theme">
    <ColorPicker label="Primary" value="#6366F1" />
    <ColorPicker label="Secondary" value="#8B5CF6" />
    <ColorPicker label="Accent" value="#EC4899" />
  </div>
</ExampleTabs>

<h2>Props</h2>
<PropsTable component={ColorPickerModule} />

<h2>Events</h2>
<EventsTable component={ColorPickerModule} />

<h2>Accessibility</h2>
<ul>
  <li>Uses native <code>&lt;input type="color"&gt;</code> which provides built-in ARIA support.</li>
  <li>The native color picker includes keyboard navigation and screen reader announcements.</li>
  <li>Hex input is labeled separately for direct value entry.</li>
  <li>Error messages are linked via <code>aria-describedby</code>.</li>
</ul>

<h2>Keyboard Support</h2>
<p>
  The native color picker provides full keyboard support automatically:
</p>
<table>
  <thead><tr><th>Key</th><th>Function</th></tr></thead>
  <tbody>
    <tr><td><kbd>Enter</kbd> / <kbd>Space</kbd></td><td>Open the color picker dialog</td></tr>
    <tr><td><kbd>Arrow Keys</kbd></td><td>Navigate the color spectrum</td></tr>
    <tr><td><kbd>Tab</kbd></td><td>Move between color channels</td></tr>
    <tr><td><kbd>Escape</kbd></td><td>Close the color picker</td></tr>
  </tbody>
</table>

<h2>Output Format</h2>
<p>
  The native <code>&lt;input type="color"&gt;</code> always outputs hex values
  (<code>#RRGGBB</code>). For RGB, HSL, or alpha channel support, convert the
  hex value in your application code:
</p>
<pre><code>{"// Hex to RGB\nfunction hexToRgb(hex) {\n  const r = parseInt(hex.slice(1, 3), 16)\n  const g = parseInt(hex.slice(3, 5), 16)\n  const b = parseInt(hex.slice(5, 7), 16)\n  return `rgb(${r}, ${g}, ${b})`\n}"}</code></pre>
</Container>

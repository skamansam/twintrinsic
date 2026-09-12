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
import { m } from "$lib/paraglide/messages.js"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
<h1>{m.colorpicker_heading()}</h1>

<p>
  <strong>{m.colorpicker_heading()}</strong>{m.colorpicker_lede_1()}<code>&lt;input type="color"&gt;</code>{m.colorpicker_lede_2()}
</p>

<h2>{m.sec_what_when_why()}</h2>

<h3>{m.sec_what()}</h3>
<p>{m.colorpicker_what_1()}</p>

<h3>{m.sec_when()}</h3>
<p>
  {m.colorpicker_when_1()}<code>&lt;ColorPicker&gt;</code>{m.colorpicker_when_2()}
</p>

<h3>{m.sec_why()}</h3>
<ul>
  <li><strong>{m.colorpicker_why_accessible()}</strong>{m.colorpicker_why_accessible_1()}</li>
  <li><strong>{m.colorpicker_why_cross()}</strong>{m.colorpicker_why_cross_1()}</li>
  <li><strong>{m.colorpicker_why_precise()}</strong>{m.colorpicker_why_precise_1()}</li>
  <li><strong>{m.colorpicker_why_lightweight()}</strong>{m.colorpicker_why_lightweight_1()}</li>
</ul>

<h3>{m.sec_sources()}</h3>
<ul>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/color">MDN — color input</a></li>
  <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/">WAI-ARIA APG — Forms</a></li>
</ul>

<h2>{m.sec_implementation()}</h2>
<ul>
    <li>{m.colorpicker_impl_1()}</li>
    <li>{m.colorpicker_impl_2()}</li>
    <li>{m.colorpicker_impl_3()}</li>
    <li>{m.colorpicker_impl_4()}</li>
</ul>

<h2>{m.sec_mistakes()}</h2>
<ul>
    <li>{m.colorpicker_mistake_1()}</li>
    <li>{m.colorpicker_mistake_2()}</li>
</ul>

<h2>{m.sec_related()}</h2>
<p>{m.colorpicker_related_1()}</p>

<h2>{m.sec_responsiveness()}</h2>
<ul>
  <li>{m.colorpicker_responsive_1_1()}<code>w-full</code>{m.colorpicker_responsive_1_2()}</li>
  <li>{m.colorpicker_responsive_2()}</li>
  <li>{m.colorpicker_responsive_3()}</li>
</ul>

<h2>{m.sec_customization()}</h2>
<ul>
  <li>{m.colorpicker_custom_1_1()}<code>disabled</code>{m.colorpicker_custom_1_2()}</li>
  <li>{m.colorpicker_custom_2_1()}<code>required</code>{m.colorpicker_custom_2_2()}</li>
  <li>{m.colorpicker_custom_3_1()}<code>error</code>{m.colorpicker_custom_3_2()}</li>
  <li>{m.colorpicker_custom_4()}</li>
</ul>

<h2>{m.sec_examples()}</h2>

<h3>{m.colorpicker_ex_basic()}</h3>
<ExampleTabs code={`<ColorPicker label="Color" />`}>
  <div class="max-w-md" data-testid="colorpicker-basic">
    <ColorPicker label="Color" />
  </div>
</ExampleTabs>

<h3>{m.colorpicker_ex_value()}</h3>
<ExampleTabs code={`<ColorPicker label="Color" value="#FF0000" />`}>
  <div class="max-w-md" data-testid="colorpicker-value">
    <ColorPicker label="Color" value="#FF0000" />
  </div>
</ExampleTabs>

<h3>{m.colorpicker_ex_error()}</h3>
<ExampleTabs code={`<ColorPicker label="Color" error="Please select a valid color" />`}>
  <div class="max-w-md" data-testid="colorpicker-error">
    <ColorPicker label="Color" error="Please select a valid color" />
  </div>
</ExampleTabs>

<h3>{m.colorpicker_ex_disabled()}</h3>
<ExampleTabs code={`<ColorPicker label="Color" value="#FF0000" disabled={true} />`}>
  <div class="max-w-md" data-testid="colorpicker-disabled">
    <ColorPicker label="Color" value="#FF0000" disabled={true} />
  </div>
</ExampleTabs>

<h3>{m.colorpicker_ex_theme()}</h3>
<ExampleTabs code={`<ColorPicker label="Primary" value="#6366F1" />\\n<ColorPicker label="Secondary" value="#8B5CF6" />\\n<ColorPicker label="Accent" value="#EC4899" />`}>
  <div class="max-w-md space-y-4" data-testid="colorpicker-theme">
    <ColorPicker label="Primary" value="#6366F1" />
    <ColorPicker label="Secondary" value="#8B5CF6" />
    <ColorPicker label="Accent" value="#EC4899" />
  </div>
</ExampleTabs>

<h2>{m.sec_props()}</h2>
<PropsTable component={ColorPickerModule} />

<h2>{m.sec_events()}</h2>
<EventsTable component={ColorPickerModule} />

<h2>{m.sec_accessibility()}</h2>
<ul>
  <li>{m.colorpicker_a11y_1_1()}<code>&lt;input type="color"&gt;</code>{m.colorpicker_a11y_1_2()}</li>
  <li>{m.colorpicker_a11y_2()}</li>
  <li>{m.colorpicker_a11y_3()}</li>
  <li>{m.colorpicker_a11y_4_1()}<code>aria-describedby</code>{m.colorpicker_a11y_4_2()}</li>
</ul>

<h2>{m.sec_keyboard()}</h2>
<p>{m.colorpicker_kb_intro()}</p>
<table>
  <thead><tr><th>{m.sec_key()}</th><th>{m.sec_function()}</th></tr></thead>
  <tbody>
    <tr><td><kbd>Enter</kbd> / <kbd>Space</kbd></td><td>{m.colorpicker_kb_enter()}</td></tr>
    <tr><td><kbd>Arrow Keys</kbd></td><td>{m.colorpicker_kb_arrows()}</td></tr>
    <tr><td><kbd>Tab</kbd></td><td>{m.colorpicker_kb_tab()}</td></tr>
    <tr><td><kbd>Escape</kbd></td><td>{m.colorpicker_kb_escape()}</td></tr>
  </tbody>
</table>

<h2>{m.colorpicker_fmt_heading()}</h2>
<p>
  {m.colorpicker_fmt_1_1()}<code>&lt;input type="color"&gt;</code>{m.colorpicker_fmt_1_2()}<code>#RRGGBB</code>{m.colorpicker_fmt_1_3()}
</p>
<pre><code>{"// Hex to RGB\\nfunction hexToRgb(hex) {\\n  const r = parseInt(hex.slice(1, 3), 16)\\n  const g = parseInt(hex.slice(3, 5), 16)\\n  const b = parseInt(hex.slice(5, 7), 16)\\n  return `rgb(${r}, ${g}, ${b})`\\n}"}</code></pre>
</Container>

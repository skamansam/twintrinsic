<!--
@component
Documentation page for the ColorPicker component.
-->
<script lang="ts">
import { ColorPicker, v } from "$lib/index.js"
import { PropsTable, EventsTable } from "$lib/docs/index.js"
</script>

<h1>ColorPicker</h1>

<p>
  The ColorPicker component provides an intuitive interface for color selection,
  supporting multiple color formats (HEX, RGB, HSL) with optional alpha channel.
  It includes a color wheel for hue and saturation selection, sliders for lightness
  and alpha, and direct color value input.
</p>

<h2>Examples</h2>

<h3>Basic Usage</h3>
<div class="example">
  <ColorPicker label="Color" />
</div>
<CodeBlock>
  {`<ColorPicker label="Color" />`}
</CodeBlock>

<h3>With Initial Value</h3>
<div class="example">
  <ColorPicker
    label="Color"
    value="#FF0000"
  />
</div>
<CodeBlock>
  {`<ColorPicker
  label="Color"
  value="#FF0000"
/>`}
</CodeBlock>

<h3>RGB Format</h3>
<div class="example">
  <ColorPicker
    label="Color"
    format="rgb"
    value="rgb(255, 0, 0)"
  />
</div>
<CodeBlock>
  {`<ColorPicker
  label="Color"
  format="rgb"
  value="rgb(255, 0, 0)"
/>`}
</CodeBlock>

<h3>With Alpha Channel</h3>
<div class="example">
  <ColorPicker
    label="Color"
    format="rgba"
    showAlpha={true}
    value="rgba(255, 0, 0, 0.5)"
  />
</div>
<CodeBlock>
  {`<ColorPicker
  label="Color"
  format="rgba"
  showAlpha={true}
  value="rgba(255, 0, 0, 0.5)"
/>`}
</CodeBlock>

<h3>HSL Format</h3>
<div class="example">
  <ColorPicker
    label="Color"
    format="hsl"
    value="hsl(0, 100%, 50%)"
  />
</div>
<CodeBlock>
  {`<ColorPicker
  label="Color"
  format="hsl"
  value="hsl(0, 100%, 50%)"
/>`}
</CodeBlock>

<h3>With Error</h3>
<div class="example">
  <ColorPicker
    label="Color"
    error="Please select a valid color"
  />
</div>
<CodeBlock>
  {`<ColorPicker
  label="Color"
  error="Please select a valid color"
/>`}
</CodeBlock>

<h3>Theme Colors</h3>
<div class="example">
  <div class="flex flex-col gap-4">
    <ColorPicker
      label="Primary Color"
      value="rgb(var(--color-primary-500))"
      format="rgb"
    />
    <ColorPicker
      label="Secondary Color"
      value="rgb(var(--color-secondary-500))"
      format="rgb"
    />
  </div>
</div>
<CodeBlock>
  {`<ColorPicker
  label="Primary Color"
  value="rgb(var(--color-primary-500))"
  format="rgb"
/>
<ColorPicker
  label="Secondary Color"
  value="rgb(var(--color-secondary-500))"
  format="rgb"
/>`}
</CodeBlock>

<h2>Props</h2>
<PropsTable
  props={[
    {
      name: 'value',
      type: 'string',
      default: "'#000000'",
      description: 'Color value in current format'
    },
    {
      name: 'format',
      type: "'hex' | 'rgb' | 'rgba' | 'hsl' | 'hsla'",
      default: "'hex'",
      description: 'Color format'
    },
    {
      name: 'showAlpha',
      type: 'boolean',
      default: 'false',
      description: 'Whether to show alpha channel'
    },
    {
      name: 'label',
      type: 'string',
      default: "'Color'",
      description: 'Input label'
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Whether the picker is disabled'
    },
    {
      name: 'error',
      type: 'string',
      default: "''",
      description: 'Error message'
    },
    {
      name: 'class',
      type: 'string',
      default: "''",
      description: 'Additional CSS classes'
    }
  ]}
/>

<h2>Events</h2>
<EventsTable
  events={[
    {
      name: 'change',
      type: '{ value: string }',
      description: 'Fired when color value changes'
    }
  ]}
/>

<h2>Color Formats</h2>
<p>
  The ColorPicker supports the following color formats:
</p>
<ul>
  <li><code>hex</code> - #RRGGBB</li>
  <li><code>rgb</code> - rgb(r, g, b)</li>
  <li><code>rgba</code> - rgba(r, g, b, a)</li>
  <li><code>hsl</code> - hsl(h, s%, l%)</li>
  <li><code>hsla</code> - hsla(h, s%, l%, a)</li>
</ul>

<h2>Accessibility</h2>
<p>
  The ColorPicker follows accessibility best practices:
</p>
<ul>
  <li>Color wheel uses proper ARIA roles and labels</li>
  <li>Sliders have descriptive labels</li>
  <li>Color values are displayed in text format</li>
  <li>Keyboard navigation support</li>
  <li>High contrast color preview</li>
  <li>Error states are properly indicated</li>
</ul>

<h2>Keyboard Interaction</h2>
<ul>
  <li><code>Enter</code> or <code>Space</code> - Open/close color picker</li>
  <li><code>Tab</code> - Navigate through controls</li>
  <li><code>Arrow keys</code> - Adjust slider values</li>
  <li><code>Escape</code> - Close color picker</li>
</ul>

<style>
  @reference '$lib/twintrinsic.css';
  .example {
    @apply my-4 p-4 border border-border rounded-md;
    @apply flex flex-col gap-4 max-w-md;
  }
</style>

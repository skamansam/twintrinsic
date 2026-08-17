<!--
@component
Documentation page for the Switch component.
-->
<script>
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
import Switch from "$lib/components/Form/Switch.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as SwitchModule from "$lib/components/Form/Switch.svelte"
</script>

<h1>Switch</h1>

<p>
  The Switch component provides a toggle switch alternative to checkboxes with support for
  labels, different sizes, and form integration. It's designed for binary choices where
  the user can toggle between enabled and disabled states.
</p>

<h2>Examples</h2>

<h3>Basic Usage</h3>
<div class="example">
  <Switch label="Enable notifications" />
</div>
<CodeBlock>
  {`<Switch label="Enable notifications" />`}
</CodeBlock>

<h3>With Initial Value</h3>
<div class="example">
  <Switch 
    label="Dark mode" 
    checked={true}
  />
</div>
<CodeBlock>
  {`<Switch 
  label="Dark mode" 
  checked={true}
/>`}
</CodeBlock>

<h3>Different Sizes</h3>
<div class="example">
  <div class="flex flex-col gap-4">
    <Switch 
      label="Small" 
      size="sm"
    />
    <Switch 
      label="Medium (default)" 
      size="md"
    />
    <Switch 
      label="Large" 
      size="lg"
    />
  </div>
</div>
<CodeBlock>
  {`<Switch 
  label="Small" 
  size="sm"
/>
<Switch 
  label="Medium (default)" 
  size="md"
/>
<Switch 
  label="Large" 
  size="lg"
/>`}
</CodeBlock>

<h3>Disabled State</h3>
<div class="example">
  <div class="flex flex-col gap-4">
    <Switch 
      label="Disabled (off)" 
      disabled={true}
    />
    <Switch 
      label="Disabled (on)" 
      checked={true}
      disabled={true}
    />
  </div>
</div>
<CodeBlock>
  {`<Switch 
  label="Disabled (off)" 
  disabled={true}
/>
<Switch 
  label="Disabled (on)" 
  checked={true}
  disabled={true}
/>`}
</CodeBlock>

<h3>Required Field</h3>
<div class="example">
  <Switch 
    label="I agree to the terms" 
    required={true}
  />
</div>
<CodeBlock>
  {`<Switch 
  label="I agree to the terms" 
  required={true}
/>`}
</CodeBlock>

<h3>Without Label</h3>
<div class="example">
  <div class="flex items-center gap-2">
    <span>Airplane mode</span>
    <Switch ariaLabel="Toggle airplane mode" />
  </div>
</div>
<CodeBlock>
  {`<div class="flex items-center gap-2">
  <span>Airplane mode</span>
  <Switch ariaLabel="Toggle airplane mode" />
</div>`}
</CodeBlock>

<h2>Props</h2>
<PropsTable component={SwitchModule} />

<h2>Events</h2>
<EventsTable component={SwitchModule} />

<h2>Accessibility</h2>
<p>
  The Switch component follows accessibility best practices:
</p>
<ul>
  <li>Uses a native <code>&lt;input type="checkbox"&gt;</code> for best compatibility</li>
  <li>Proper focus states with visible indicators</li>
  <li>Labels are properly associated with inputs</li>
  <li>ARIA labels for switches without visible labels</li>
  <li>Proper disabled states with visual indicators</li>
  <li>High color contrast between track and thumb</li>
  <li>Smooth transitions for state changes</li>
</ul>

<h2>Keyboard Interaction</h2>
<ul>
  <li><code>Tab</code> - Move focus to the switch</li>
  <li><code>Space</code> - Toggle the switch state</li>
</ul>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
  .example {
    @apply my-4 p-4 border border-border rounded-md;
    @apply flex flex-col gap-4 max-w-md;
  }
</style>

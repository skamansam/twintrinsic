<!--
@component
RadioGroup documentation page — standardized structure
-->
<script lang="ts">
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import Radio from "$lib/components/Form/Radio.svelte"
import RadioGroup from "$lib/components/Form/RadioGroup.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as RadioGroupModule from "$lib/components/Form/RadioGroup.svelte"
import Container from "$lib/components/Container/Container.svelte"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
<h1>RadioGroup</h1>

<p>
  <strong>RadioGroup</strong> wraps related radio buttons with a shared legend,
  layout control, and validation. Uses native <code>&lt;fieldset&gt;</code> +
  <code>&lt;legend&gt;</code> for proper semantics.
</p>

<h2>What, When &amp; Why</h2>

<h3>What is it?</h3>
<p>
  A container that groups mutually exclusive radio options with a visible legend,
  consistent spacing, and support for horizontal/vertical layouts.
</p>

<h3>When should I use it?</h3>
<p>
  Use <code>&lt;RadioGroup&gt;</code> whenever you have multiple
  <code>&lt;Radio&gt;</code> options that share a label (e.g., "Select theme",
  "Choose plan"). For standalone radios, use <code>&lt;Radio&gt;</code> directly.
</p>

<h3>Why does it exist?</h3>
<ul>
  <li><strong>Semantics</strong> — <code>&lt;fieldset&gt;</code> + <code>&lt;legend&gt;</code> announces the group label to screen readers.</li>
  <li><strong>Consistency</strong> — shared spacing and layout for all radios in the group.</li>
  <li><strong>Accessibility</strong> — arrow keys navigate between options within the group.</li>
</ul>

<h2>Responsiveness</h2>
<ul>
  <li>Vertical layout (default) stacks radios vertically.</li>
  <li>Horizontal layout (<code>layout="horizontal"</code>) wraps radios in a row.</li>
</ul>

<h2>Customization</h2>
<ul>
  <li>Layout: <code>vertical</code> (default) or <code>horizontal</code>.</li>
  <li>Sizes: <code>sm</code>, <code>md</code>, <code>lg</code>.</li>
  <li>Disabled state for the entire group.</li>
  <li>Initial value via <code>value</code> prop.</li>
</ul>

<h2>Examples</h2>

<h3>Basic Usage</h3>
<ExampleTabs code={`<RadioGroup name="theme" legend="Select theme">
  <Radio value="light" label="Light" />
  <Radio value="dark" label="Dark" />
  <Radio value="system" label="System" />
</RadioGroup>`}>
  <div class="max-w-md" data-testid="radiogroup-basic">
    <RadioGroup name="theme" legend="Select theme">
      <Radio value="light" label="Light" />
      <Radio value="dark" label="Dark" />
      <Radio value="system" label="System" />
    </RadioGroup>
  </div>
</ExampleTabs>

<h3>Horizontal Layout</h3>
<ExampleTabs code={`<RadioGroup name="alignment" legend="Text alignment" layout="horizontal">
  <Radio value="left" label="Left" />
  <Radio value="center" label="Center" />
  <Radio value="right" label="Right" />
</RadioGroup>`}>
  <div class="max-w-md" data-testid="radiogroup-horizontal">
    <RadioGroup name="alignment" legend="Text alignment" layout="horizontal">
      <Radio value="left" label="Left" />
      <Radio value="center" label="Center" />
      <Radio value="right" label="Right" />
    </RadioGroup>
  </div>
</ExampleTabs>

<h3>Disabled Group</h3>
<ExampleTabs code={`<RadioGroup name="disabled" legend="Unavailable" disabled={true}>
  <Radio value="basic" label="Basic" />
  <Radio value="plus" label="Plus" />
  <Radio value="premium" label="Premium" />
</RadioGroup>`}>
  <div class="max-w-md" data-testid="radiogroup-disabled">
    <RadioGroup name="disabled" legend="Unavailable" disabled={true}>
      <Radio value="basic" label="Basic" />
      <Radio value="plus" label="Plus" />
      <Radio value="premium" label="Premium" />
    </RadioGroup>
  </div>
</ExampleTabs>

<h2>Props</h2>
<PropsTable component={RadioGroupModule} />

<h2>Events</h2>
<EventsTable component={RadioGroupModule} />

<h2>Accessibility</h2>
<ul>
  <li>Uses <code>&lt;fieldset&gt;</code> + <code>&lt;legend&gt;</code> for group labeling.</li>
  <li>Arrow keys navigate between options.</li>
  <li>Visible focus indicators on all radios.</li>
</ul>

<h2>Keyboard Support</h2>
<table>
  <thead><tr><th>Key</th><th>Function</th></tr></thead>
  <tbody>
    <tr><td><kbd>Tab</kbd></td><td>Move focus to the radio group</td></tr>
    <tr><td><kbd>Space</kbd></td><td>Select the focused radio</td></tr>
    <tr><td><kbd>Arrow Up</kbd> / <kbd>Arrow Left</kbd></td><td>Previous radio</td></tr>
    <tr><td><kbd>Arrow Down</kbd> / <kbd>Arrow Right</kbd></td><td>Next radio</td></tr>
  </tbody>
</table>
</Container>

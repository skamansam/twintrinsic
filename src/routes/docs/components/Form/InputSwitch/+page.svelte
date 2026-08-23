<!--
@component
InputSwitch documentation page — standardized structure
-->
<script lang="ts">
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import FormField from "$lib/components/Form/FormField.svelte"
import InputSwitch from "$lib/components/Form/InputSwitch.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as InputSwitchModule from "$lib/components/Form/InputSwitch.svelte"
import Container from "$lib/components/Container/Container.svelte"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
<h1>InputSwitch</h1>

<p>
  <strong>InputSwitch</strong> is a toggle control that switches between on/off
  states. Identical to <code>&lt;Switch&gt;</code> — this is an alias for
  backward compatibility.
</p>

<h2>What, When &amp; Why</h2>

<h3>What is it?</h3>
<p>
  A binary toggle with a sliding animation. Represents "on/off" semantics — the
  setting takes effect immediately.
</p>

<h3>When should I use it?</h3>
<p>
  Use for settings that activate/deactivate immediately: dark mode, notifications,
  auto-save. Prefer <code>&lt;Switch&gt;</code> (the canonical name) for new code.
  Use <code>&lt;InputSwitch&gt;</code> only for backward compatibility with existing code.
</p>

<h3>Why does it exist?</h3>
<ul>
  <li><strong>Backward compatibility</strong> — alias for <code>&lt;Switch&gt;</code>.</li>
  <li><strong>Better semantics</strong> — screen readers announce "on/off" instead of "checked/unchecked".</li>
  <li><strong>Platform familiarity</strong> — switches are the standard toggle in iOS/Android settings.</li>
</ul>

<h2>Responsiveness</h2>
<ul>
  <li>Inline elements that sit naturally alongside labels.</li>
  <li>Sizes: <code>sm</code>, <code>md</code>, <code>lg</code>.</li>
  <li>Touch targets meet 44×44 px minimum.</li>
</ul>

<h2>Customization</h2>
<ul>
  <li>Size: <code>sm</code>, <code>md</code>, <code>lg</code>.</li>
  <li>Label-less switches via <code>ariaLabel</code>.</li>
  <li>Wrap with <code>&lt;FormField&gt;</code> for grouped settings.</li>
</ul>

<h2>Examples</h2>

<h3>Basic Usage</h3>
<ExampleTabs code={`<InputSwitch label="Enable notifications" />`}>
  <div class="max-w-md" data-testid="input-switch-basic"><InputSwitch label="Enable notifications" /></div>
</ExampleTabs>

<h3>With Initial Value</h3>
<ExampleTabs code={`<InputSwitch label="Dark mode" checked={true} />`}>
  <div class="max-w-md" data-testid="input-switch-initial"><InputSwitch label="Dark mode" checked={true} /></div>
</ExampleTabs>

<h3>Different Sizes</h3>
<ExampleTabs code={`<InputSwitch label="Small" size="sm" />
<InputSwitch label="Medium (default)" size="md" />
<InputSwitch label="Large" size="lg" />`}>
  <div class="max-w-md flex flex-col gap-4" data-testid="input-switch-sizes">
    <InputSwitch label="Small" size="sm" />
    <InputSwitch label="Medium (default)" size="md" />
    <InputSwitch label="Large" size="lg" />
  </div>
</ExampleTabs>

<h3>With FormField</h3>
<ExampleTabs code={`<FormField label="Notification settings">
  <InputSwitch label="Email notifications" name="email" />
  <InputSwitch label="SMS notifications" name="sms" />
  <InputSwitch label="Push notifications" name="push" />
</FormField>`}>
  <div class="max-w-md" data-testid="input-switch-formfield">
    <FormField label="Notification settings">
      <div class="flex flex-col gap-2">
        <InputSwitch label="Email notifications" name="email_notifications" />
        <InputSwitch label="SMS notifications" name="sms_notifications" />
        <InputSwitch label="Push notifications" name="push_notifications" />
      </div>
    </FormField>
  </div>
</ExampleTabs>

<h2>Props</h2>
<PropsTable component={InputSwitchModule} />

<h2>Events</h2>
<EventsTable component={InputSwitchModule} />

<h2>Accessibility</h2>
<ul>
  <li>Uses native <code>&lt;input type="checkbox" role="switch"&gt;</code>.</li>
  <li>Screen readers announce "on/off".</li>
  <li>Visible focus indicators.</li>
  <li>Labels properly associated.</li>
</ul>

<h2>Keyboard Support</h2>
<table>
  <thead><tr><th>Key</th><th>Function</th></tr></thead>
  <tbody>
    <tr><td><kbd>Space</kbd></td><td>Toggle the switch state</td></tr>
    <tr><td><kbd>Tab</kbd></td><td>Move focus to the switch</td></tr>
  </tbody>
</table>
</Container>

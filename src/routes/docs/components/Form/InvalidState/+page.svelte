<!--
@component
InvalidState documentation page — standardized structure
-->
<script lang="ts">
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import FormField from "$lib/components/Form/FormField.svelte"
import InvalidState from "$lib/components/Form/InvalidState.svelte"
import TextInput from "$lib/components/Form/TextInput.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as InvalidStateModule from "$lib/components/Form/InvalidState.svelte"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<h1>InvalidState</h1>

<p>
  <strong>InvalidState</strong> displays validation error messages with consistent
  styling, icons, and accessibility attributes.
</p>

<h2>What, When &amp; Why</h2>

<h3>What is it?</h3>
<p>
  An error message component with <code>role="alert"</code> and
  <code>aria-live="assertive"</code> so screen readers announce it immediately.
  Includes a warning icon and red styling by default.
</p>

<h3>When should I use it?</h3>
<p>
  Use <code>&lt;InvalidState&gt;</code> inside <code>&lt;FormField&gt;</code> to
  display validation errors. Show it conditionally when a field fails validation.
</p>

<h3>Why does it exist?</h3>
<ul>
  <li><strong>Accessibility</strong> — <code>role="alert"</code> announces errors to screen readers.</li>
  <li><strong>Consistency</strong> — all error messages share the same icon, color, and spacing.</li>
  <li><strong>Visibility</strong> — red color + icon draws attention without being disruptive.</li>
</ul>

<h2>Responsiveness</h2>
<ul>
  <li>Fills container width; text wraps naturally on narrow screens.</li>
</ul>

<h2>Customization</h2>
<ul>
  <li>Message via <code>message</code> prop or default slot.</li>
  <li>Hide icon via <code>showIcon={false}</code>.</li>
  <li>Custom icon via <code>icon</code> prop.</li>
</ul>

<h2>Examples</h2>

<h3>Basic Usage</h3>
<ExampleTabs code={`<InvalidState message="This field is required" />`}>
  <div class="max-w-md" data-testid="invalidstate-basic-usage">
    <InvalidState message="This field is required" />
  </div>
</ExampleTabs>

<h3>With FormField</h3>
<ExampleTabs code={`<FormField label="Email">
  <TextInput type="email" name="email" />
  <InvalidState message="Please enter a valid email address" />
</FormField>`}>
  <div class="max-w-md" data-testid="invalidstate-formfield">
    <FormField label="Email">
      <TextInput type="email" name="email" />
      <InvalidState message="Please enter a valid email address" />
    </FormField>
  </div>
</ExampleTabs>

<h3>Multiple Errors</h3>
<ExampleTabs code={`<div class="flex flex-col gap-1">
  <InvalidState message="Password must be at least 8 characters" />
  <InvalidState message="Password must include a number" />
  <InvalidState message="Password must include a special character" />
</div>`}>
  <div class="max-w-md flex flex-col gap-1" data-testid="invalidstate-multiple">
    <InvalidState message="Password must be at least 8 characters" />
    <InvalidState message="Password must include a number" />
    <InvalidState message="Password must include a special character" />
  </div>
</ExampleTabs>

<h2>Props</h2>
<PropsTable component={InvalidStateModule} />

<h2>Accessibility</h2>
<ul>
  <li><code>role="alert"</code> ensures screen readers announce the error.</li>
  <li><code>aria-live="assertive"</code> for immediate announcement.</li>
  <li>Red color + icon for visual indication.</li>
  <li>Sufficient color contrast (WCAG AA).</li>
</ul>

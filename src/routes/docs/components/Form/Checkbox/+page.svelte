<!--
@component
Documentation page for the Checkbox component.
-->
<script lang="ts">
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
import Checkbox from "$lib/components/Form/Checkbox.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as CheckboxModule from "$lib/components/Form/Checkbox.svelte"
</script>

<h1>Checkbox</h1>

<p>
  The Checkbox component is a form control for boolean or indeterminate input with support
  for labels, descriptions, validation states, and full accessibility features.
</p>

<h2>Examples</h2>

<h3>Basic Usage</h3>
<div class="example" data-testid="checkbox-basic">
  <Checkbox label="Accept terms and conditions" />
</div>
<CodeBlock>
  {`<Checkbox label="Accept terms and conditions" />`}
</CodeBlock>

<h3>With Description</h3>
<div class="example" data-testid="checkbox-description">
  <Checkbox
    label="Subscribe to newsletter"
    description="Receive updates about new features and announcements"
  />
</div>
<CodeBlock>
  {`<Checkbox
  label="Subscribe to newsletter"
  description="Receive updates about new features and announcements"
/>`}
</CodeBlock>

<h3>Indeterminate State</h3>
<div class="example" data-testid="checkbox-indeterminate">
  <Checkbox
    label="Select all items"
    indeterminate={true}
    description="Some items are selected"
  />
</div>
<CodeBlock>
  {`<Checkbox
  label="Select all items"
  indeterminate={true}
  description="Some items are selected"
/>`}
</CodeBlock>

<h3>Required Field</h3>
<div class="example" data-testid="checkbox-required">
  <Checkbox
    label="I agree to the terms"
    required={true}
  />
</div>
<CodeBlock>
  {`<Checkbox
  label="I agree to the terms"
  required={true}
/>`}
</CodeBlock>

<h3>With Error</h3>
<div class="example" data-testid="checkbox-error">
  <Checkbox
    label="Accept privacy policy"
    error="You must accept the privacy policy"
    required={true}
  />
</div>
<CodeBlock>
  {`<Checkbox
  label="Accept privacy policy"
  error="You must accept the privacy policy"
  required={true}
/>`}
</CodeBlock>

<h3>Disabled States</h3>
<div class="example" data-testid="checkbox-disabled">
  <div class="flex flex-col gap-4">
    <Checkbox
      label="Unavailable option"
      disabled={true}
      description="This option is currently unavailable"
    />
    <Checkbox
      label="Completed task"
      disabled={true}
      checked={true}
      description="This task has been completed"
    />
  </div>
</div>
<CodeBlock>
  {`<Checkbox
  label="Unavailable option"
  disabled={true}
  description="This option is currently unavailable"
/>
<Checkbox
  label="Completed task"
  disabled={true}
  checked={true}
  description="This task has been completed"
/>`}
</CodeBlock>

<h3>Checkbox Group</h3>
<div class="example" data-testid="checkbox-group">
  <div class="flex flex-col gap-2">
    <Checkbox
      label="Email notifications"
      name="notifications"
      value="email"
    />
    <Checkbox
      label="SMS notifications"
      name="notifications"
      value="sms"
    />
    <Checkbox
      label="Push notifications"
      name="notifications"
      value="push"
    />
  </div>
</div>
<CodeBlock>
  {`<div class="flex flex-col gap-2">
  <Checkbox
    label="Email notifications"
    name="notifications"
    value="email"
  />
  <Checkbox
    label="SMS notifications"
    name="notifications"
    value="sms"
  />
  <Checkbox
    label="Push notifications"
    name="notifications"
    value="push"
  />
</div>`}
</CodeBlock>

<h2>Props</h2>
<PropsTable component={CheckboxModule} />

<h2>Events</h2>
<EventsTable component={CheckboxModule} />

<h2>Accessibility</h2>
<p>
  The Checkbox component follows WAI-ARIA guidelines for checkboxes:
</p>
<ul>
  <li>Uses native <code>&lt;input type="checkbox"&gt;</code> for best compatibility</li>
  <li>Labels are properly associated with inputs</li>
  <li>Required fields are marked with both visual and ARIA indicators</li>
  <li>Error messages are linked using <code>aria-describedby</code></li>
  <li>Invalid states are indicated with <code>aria-invalid</code></li>
  <li>Proper focus management and keyboard interaction</li>
  <li>Support for indeterminate state</li>
</ul>

<h2>Keyboard Interaction</h2>
<ul>
  <li><code>Space</code> - Toggle checkbox state</li>
  <li><code>Tab</code> - Move focus to checkbox</li>
</ul>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
  .example {
    @apply my-4 p-4 border border-border rounded-md;
    @apply flex flex-col gap-4 max-w-md;
  }
</style>

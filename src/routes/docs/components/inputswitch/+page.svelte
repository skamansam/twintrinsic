<!--
@component
Documentation page for the InputSwitch component.
-->
<script lang="ts">
import { InputSwitch, FormField, CodeBlock } from "$lib/index.js"
import { PropsTable, EventsTable } from "$lib/docs/index.js"
</script>

<h1>InputSwitch</h1>

<p>
  The InputSwitch component provides a toggle switch alternative to checkboxes with support for
  labels, different sizes, and form integration. It's designed for binary choices where
  the user can toggle between enabled and disabled states.
</p>

<h2>Examples</h2>

<h3>Basic Usage</h3>
<div class="example">
  <InputSwitch label="Enable notifications" />
</div>
<CodeBlock>
  {`<InputSwitch label="Enable notifications" />`}
</CodeBlock>

<h3>With Initial Value</h3>
<div class="example">
  <InputSwitch 
    label="Dark mode" 
    checked={true}
  />
</div>
<CodeBlock>
  {`<InputSwitch 
  label="Dark mode" 
  checked={true}
/>`}
</CodeBlock>

<h3>Different Sizes</h3>
<div class="example">
  <div class="flex flex-col gap-4">
    <InputSwitch 
      label="Small" 
      size="sm"
    />
    <InputSwitch 
      label="Medium (default)" 
      size="md"
    />
    <InputSwitch 
      label="Large" 
      size="lg"
    />
  </div>
</div>
<CodeBlock>
  {`<InputSwitch 
  label="Small" 
  size="sm"
/>
<InputSwitch 
  label="Medium (default)" 
  size="md"
/>
<InputSwitch 
  label="Large" 
  size="lg"
/>`}
</CodeBlock>

<h3>Disabled State</h3>
<div class="example">
  <div class="flex flex-col gap-4">
    <InputSwitch 
      label="Disabled (off)" 
      disabled={true}
    />
    <InputSwitch 
      label="Disabled (on)" 
      checked={true}
      disabled={true}
    />
  </div>
</div>
<CodeBlock>
  {`<InputSwitch 
  label="Disabled (off)" 
  disabled={true}
/>
<InputSwitch 
  label="Disabled (on)" 
  checked={true}
  disabled={true}
/>`}
</CodeBlock>

<h3>Required Field</h3>
<div class="example">
  <InputSwitch 
    label="I agree to the terms" 
    required={true}
  />
</div>
<CodeBlock>
  {`<InputSwitch 
  label="I agree to the terms" 
  required={true}
/>`}
</CodeBlock>

<h3>Without Label</h3>
<div class="example">
  <div class="flex items-center gap-2">
    <span>Airplane mode</span>
    <InputSwitch ariaLabel="Toggle airplane mode" />
  </div>
</div>
<CodeBlock>
  {`<div class="flex items-center gap-2">
  <span>Airplane mode</span>
  <InputSwitch ariaLabel="Toggle airplane mode" />
</div>`}
</CodeBlock>

<h3>With Form Field</h3>
<div class="example">
  <FormField label="Notification settings">
    <div class="flex flex-col gap-2">
      <InputSwitch label="Email notifications" name="email_notifications" />
      <InputSwitch label="SMS notifications" name="sms_notifications" />
      <InputSwitch label="Push notifications" name="push_notifications" />
    </div>
  </FormField>
</div>
<CodeBlock>
  {`<FormField label="Notification settings">
  <div class="flex flex-col gap-2">
    <InputSwitch label="Email notifications" name="email_notifications" />
    <InputSwitch label="SMS notifications" name="sms_notifications" />
    <InputSwitch label="Push notifications" name="push_notifications" />
  </div>
</FormField>`}
</CodeBlock>

<h2>Props</h2>
<PropsTable
  props={[
    {
      name: 'checked',
      type: 'boolean',
      default: 'false',
      description: 'Whether the switch is checked'
    },
    {
      name: 'label',
      type: 'string',
      description: 'Label text for the switch'
    },
    {
      name: 'name',
      type: 'string',
      description: 'Name attribute for the input'
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Whether the switch is disabled'
    },
    {
      name: 'required',
      type: 'boolean',
      default: 'false',
      description: 'Whether the switch is required'
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description: 'Size of the switch'
    },
    {
      name: 'ariaLabel',
      type: 'string',
      description: 'ARIA label for accessibility (used when no visible label is provided)'
    },
    {
      name: 'id',
      type: 'string',
      default: 'auto-generated',
      description: 'HTML id for accessibility'
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
      type: '{ checked: boolean }',
      description: 'Fired when the switch state changes'
    }
  ]}
/>

<h2>Accessibility</h2>
<p>
  The InputSwitch component follows accessibility best practices:
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

<h2>Form Integration</h2>
<p>
  The InputSwitch component integrates with the Form component for validation and submission:
</p>
<CodeBlock>
  {`<Form onSubmit={handleSubmit}>
  <FormField label="Preferences">
    <div class="flex flex-col gap-2">
      <InputSwitch 
        label="Subscribe to newsletter" 
        name="newsletter"
      />
      <InputSwitch 
        label="Enable notifications" 
        name="notifications"
      />
    </div>
  </FormField>
  
  <Button type="submit">Save Preferences</Button>
</Form>`}
</CodeBlock>

<style>
  @reference '$lib/twintrinsic.css';
  .example {
    @apply my-4 p-4 border border-border rounded-md;
    @apply flex flex-col gap-4 max-w-md;
  }
</style>

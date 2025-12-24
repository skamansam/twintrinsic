<!--
@component
Documentation page for the Radio component.
-->
<script lang="ts">
import { Radio, FormField, CodeBlock } from "$lib/index.js"
import { PropsTable, EventsTable } from "$lib/docs/index.js"

// Sample data for examples
let theme = $state("light")
let size = $state("md")
let fruit = $state("apple")
</script>

<h1>Radio</h1>

<p>
  The Radio component provides a styled radio button for selecting a single option from a group.
  It ensures consistent styling, accessibility features, and seamless integration with the Form component.
</p>

<h2>Examples</h2>

<h3>Basic Usage</h3>
<div class="example">
  <Radio 
    name="theme" 
    value="light"
    label="Light theme" 
    checked={theme === 'light'} 
  />
</div>
<CodeBlock>
  {`<script>
  let theme = 'light'
</script>

<Radio 
  name="theme" 
  value="light"
  label="Light theme" 
  checked={theme === 'light'} 
/>`}
</CodeBlock>

<h3>Radio Group</h3>
<div class="example">
  <div class="flex flex-col gap-2">
    <Radio name="theme-group" value="light" label="Light" checked={theme === 'light'} onchange={() => theme = 'light'} />
    <Radio name="theme-group" value="dark" label="Dark" checked={theme === 'dark'} onchange={() => theme = 'dark'} />
    <Radio name="theme-group" value="system" label="System" checked={theme === 'system'} onchange={() => theme = 'system'} />
  </div>
  <p class="text-sm text-muted mt-2">Selected theme: {theme}</p>
</div>
<CodeBlock>
  {`<script>
  let theme = 'light'
</script>

<div class="flex flex-col gap-2">
  <Radio 
    name="theme-group" 
    value="light" 
    label="Light" 
    checked={theme === 'light'} 
    onchange={() => theme = 'light'} 
  />
  <Radio 
    name="theme-group" 
    value="dark" 
    label="Dark" 
    checked={theme === 'dark'} 
    onchange={() => theme = 'dark'} 
  />
  <Radio 
    name="theme-group" 
    value="system" 
    label="System" 
    checked={theme === 'system'} 
    onchange={() => theme = 'system'} 
  />
</div>
<p class="text-sm text-muted mt-2">Selected theme: {theme}</p>`}
</CodeBlock>

<h3>Horizontal Layout</h3>
<div class="example">
  <div class="flex gap-4">
    <Radio name="fruit" value="apple" label="Apple" checked={fruit === 'apple'} onchange={() => fruit = 'apple'} />
    <Radio name="fruit" value="banana" label="Banana" checked={fruit === 'banana'} onchange={() => fruit = 'banana'} />
    <Radio name="fruit" value="cherry" label="Cherry" checked={fruit === 'cherry'} onchange={() => fruit = 'cherry'} />
  </div>
  <p class="text-sm text-muted mt-2">Selected fruit: {fruit}</p>
</div>
<CodeBlock>
  {`<script>
  let fruit = 'apple'
</script>

<div class="flex gap-4">
  <Radio 
    name="fruit" 
    value="apple" 
    label="Apple" 
    checked={fruit === 'apple'} 
    onchange={() => fruit = 'apple'} 
  />
  <Radio 
    name="fruit" 
    value="banana" 
    label="Banana" 
    checked={fruit === 'banana'} 
    onchange={() => fruit = 'banana'} 
  />
  <Radio 
    name="fruit" 
    value="cherry" 
    label="Cherry" 
    checked={fruit === 'cherry'} 
    onchange={() => fruit = 'cherry'} 
  />
</div>
<p class="text-sm text-muted mt-2">Selected fruit: {fruit}</p>`}
</CodeBlock>

<h3>Different Sizes</h3>
<div class="example">
  <div class="flex flex-col gap-4">
    <Radio name="size-sm" value="sm" label="Small" size="sm" checked={size === 'sm'} onchange={() => size = 'sm'} />
    <Radio name="size-md" value="md" label="Medium (default)" size="md" checked={size === 'md'} onchange={() => size = 'md'} />
    <Radio name="size-lg" value="lg" label="Large" size="lg" checked={size === 'lg'} onchange={() => size = 'lg'} />
  </div>
</div>
<CodeBlock>
  {`<Radio name="size-sm" value="sm" label="Small" size="sm" />
<Radio name="size-md" value="md" label="Medium (default)" size="md" />
<Radio name="size-lg" value="lg" label="Large" size="lg" />`}
</CodeBlock>

<h3>With Form Field</h3>
<div class="example">
  <FormField label="Select theme" required={true}>
    <div class="flex gap-4">
      <Radio name="theme-required" value="light" label="Light" required={true} />
      <Radio name="theme-required" value="dark" label="Dark" required={true} />
    </div>
  </FormField>
</div>
<CodeBlock>
  {`<FormField label="Select theme" required={true}>
  <div class="flex gap-4">
    <Radio name="theme-required" value="light" label="Light" required={true} />
    <Radio name="theme-required" value="dark" label="Dark" required={true} />
  </div>
</FormField>`}
</CodeBlock>

<h3>Disabled State</h3>
<div class="example">
  <Radio 
    name="disabled" 
    value="disabled" 
    label="Disabled option" 
    disabled={true}
  />
</div>
<CodeBlock>
  {`<Radio 
  name="disabled" 
  value="disabled" 
  label="Disabled option" 
  disabled={true}
/>`}
</CodeBlock>

<h2>Props</h2>
<PropsTable
  props={[
    {
      name: 'name',
      type: 'string',
      description: 'Radio name for grouping radio buttons'
    },
    {
      name: 'value',
      type: 'string',
      description: 'Value of the radio button'
    },
    {
      name: 'label',
      type: 'string',
      description: 'Label text displayed next to the radio button'
    },
    {
      name: 'checked',
      type: 'boolean',
      default: 'false',
      description: 'Whether the radio button is checked'
    },
    {
      name: 'required',
      type: 'boolean',
      default: 'false',
      description: 'Whether the radio button is required in a form'
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Whether the radio button is disabled'
    },
    {
      name: 'size',
      type: 'string',
      default: "'md'",
      description: 'Size of the radio button (sm, md, lg)'
    },
    {
      name: 'ariaLabel',
      type: 'string',
      description: 'ARIA label for accessibility (defaults to label if not provided)'
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
      type: '{ checked: boolean, value: string }',
      description: 'Fired when the radio button is checked or unchecked'
    }
  ]}
/>

<h2>Accessibility</h2>
<p>
  The Radio component follows accessibility best practices:
</p>
<ul>
  <li>Uses native <code>&lt;input type="radio"&gt;</code> for proper semantics and keyboard interaction</li>
  <li>Provides visible focus indicators</li>
  <li>Includes proper disabled states with visual indicators</li>
  <li>Supports ARIA labels for better screen reader announcements</li>
  <li>Maintains proper color contrast ratios for all states</li>
</ul>

<h2>Keyboard Interaction</h2>
<ul>
  <li><code>Tab</code> - Move focus to the radio button</li>
  <li><code>Space</code> - Select the focused radio button</li>
  <li><code>Arrow Up/Down</code> - When in a radio group, move to and select the previous/next radio button</li>
  <li><code>Arrow Left/Right</code> - When in a radio group, move to and select the previous/next radio button</li>
</ul>

<h2>Form Integration</h2>
<p>
  The Radio component integrates with the Form component for validation and submission:
</p>
<CodeBlock>
  {`<Form onSubmit={handleSubmit}>
  <FormField label="Select theme">
    <div class="flex gap-4">
      <Radio name="theme" value="light" label="Light" />
      <Radio name="theme" value="dark" label="Dark" />
      <Radio name="theme" value="system" label="System" />
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

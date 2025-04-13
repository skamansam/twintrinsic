<!--
@component
Documentation page for the FormField component.
-->
<script>
import { FormField, TextInput, Textarea, Select, CodeBlock } from "$lib/index.js"
import { PropsTable, EventsTable } from "$lib/docs/index.js"
</script>

<h1>FormField</h1>

<p>
  The FormField component creates a consistent container for form inputs with support for
  labels, validation, help text, and accessibility features. It provides a standardized way
  to structure form elements across your application.
</p>

<h2>Examples</h2>

<h3>Basic Usage</h3>
<div class="example">
  <FormField label="Username">
    <TextInput name="username" />
  </FormField>
</div>
<CodeBlock>
  {`<FormField label="Username">
  <TextInput name="username" />
</FormField>`}
</CodeBlock>

<h3>With Different Input Types</h3>
<div class="example">
  <div class="flex flex-col gap-4">
    <FormField label="Email">
      <TextInput type="email" name="email" />
    </FormField>
    
    <FormField label="Message">
      <Textarea name="message" rows={3} />
    </FormField>
    
    <FormField label="Country">
      <Select 
        name="country"
        options={[
          { label: 'United States', value: 'us' },
          { label: 'Canada', value: 'ca' },
          { label: 'United Kingdom', value: 'uk' }
        ]}
      />
    </FormField>
  </div>
</div>
<CodeBlock>
  {`<FormField label="Email">
  <TextInput type="email" name="email" />
</FormField>

<FormField label="Message">
  <Textarea name="message" rows={3} />
</FormField>

<FormField label="Country">
  <Select 
    name="country"
    options={[
      { label: 'United States', value: 'us' },
      { label: 'Canada', value: 'ca' },
      { label: 'United Kingdom', value: 'uk' }
    ]}
  />
</FormField>`}
</CodeBlock>

<h3>Required Field</h3>
<div class="example">
  <FormField label="Email" required={true}>
    <TextInput type="email" name="email" required={true} />
  </FormField>
</div>
<CodeBlock>
  {`<FormField label="Email" required={true}>
  <TextInput type="email" name="email" required={true} />
</FormField>`}
</CodeBlock>

<h3>With Help Text</h3>
<div class="example">
  <FormField 
    label="Password" 
    helpText="Password must be at least 8 characters long"
  >
    <TextInput type="password" name="password" />
  </FormField>
</div>
<CodeBlock>
  {`<FormField 
  label="Password" 
  helpText="Password must be at least 8 characters long"
>
  <TextInput type="password" name="password" />
</FormField>`}
</CodeBlock>

<h3>With Error Message</h3>
<div class="example">
  <FormField 
    label="Email" 
    error="Please enter a valid email address"
  >
    <TextInput type="email" name="email" />
  </FormField>
</div>
<CodeBlock>
  {`<FormField 
  label="Email" 
  error="Please enter a valid email address"
>
  <TextInput type="email" name="email" />
</FormField>`}
</CodeBlock>

<h3>Horizontal Layout</h3>
<div class="example">
  <FormField label="Username" layout="horizontal">
    <TextInput name="username" />
  </FormField>
</div>
<CodeBlock>
  {`<FormField label="Username" layout="horizontal">
  <TextInput name="username" />
</FormField>`}
</CodeBlock>

<h3>Hidden Label</h3>
<div class="example">
  <FormField 
    label="Search" 
    hideLabel={true}
    helpText="The label is hidden visually but still accessible to screen readers"
  >
    <TextInput name="search" placeholder="Search..." />
  </FormField>
</div>
<CodeBlock>
  {`<FormField 
  label="Search" 
  hideLabel={true}
  helpText="The label is hidden visually but still accessible to screen readers"
>
  <TextInput name="search" placeholder="Search..." />
</FormField>`}
</CodeBlock>

<h3>Disabled State</h3>
<div class="example">
  <FormField label="Username" disabled={true}>
    <TextInput name="username" disabled={true} />
  </FormField>
</div>
<CodeBlock>
  {`<FormField label="Username" disabled={true}>
  <TextInput name="username" disabled={true} />
</FormField>`}
</CodeBlock>

<h2>Props</h2>
<PropsTable
  props={[
    {
      name: 'label',
      type: 'string',
      description: 'Label text for the field'
    },
    {
      name: 'name',
      type: 'string',
      description: 'Field name (used for form data and validation)'
    },
    {
      name: 'helpText',
      type: 'string',
      description: 'Help text displayed below the field'
    },
    {
      name: 'error',
      type: 'string',
      description: 'Error message to display'
    },
    {
      name: 'required',
      type: 'boolean',
      default: 'false',
      description: 'Whether the field is required (adds an asterisk)'
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Whether the field is disabled'
    },
    {
      name: 'hideLabel',
      type: 'boolean',
      default: 'false',
      description: 'Whether to hide the label visually (still accessible to screen readers)'
    },
    {
      name: 'layout',
      type: "'vertical' | 'horizontal'",
      default: "'vertical'",
      description: 'Layout direction of the field'
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

<h2>Slots</h2>
<table class="props-table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>default</td>
      <td>The form control component to wrap with the field container</td>
    </tr>
  </tbody>
</table>

<h2>Accessibility</h2>
<p>
  The FormField component follows accessibility best practices:
</p>
<ul>
  <li>Associates labels with inputs using proper <code>for</code> attributes</li>
  <li>Supports visually hidden labels with <code>hideLabel</code> prop while maintaining screen reader access</li>
  <li>Properly indicates required fields with both visual and screen reader cues</li>
  <li>Error messages are announced to screen readers using <code>role="alert"</code></li>
  <li>Uses <code>aria-describedby</code> to associate help text and error messages with inputs</li>
  <li>Sets appropriate <code>aria-invalid</code> and <code>aria-required</code> attributes</li>
</ul>

<h2>Form Integration</h2>
<p>
  The FormField component integrates with the Form component for validation and submission:
</p>
<CodeBlock>
  {`<Form onSubmit={handleSubmit}>
  <FormField 
    label="Email" 
    name="email" 
    required={true}
  >
    <TextInput 
      type="email"
      name="email"
      required={true}
    />
  </FormField>
  
  <FormField 
    label="Password" 
    name="password" 
    required={true}
  >
    <TextInput 
      type="password"
      name="password"
      required={true}
    />
  </FormField>
  
  <Button type="submit">Sign In</Button>
</Form>`}
</CodeBlock>

<style>
  @reference '$lib/twintrinsic.css';
  .example {
    @apply my-4 p-4 border border-border rounded-md;
    @apply flex flex-col gap-4 max-w-md;
  }
  
  .props-table {
    @apply w-full border-collapse mb-6;
  }
  
  .props-table th {
    @apply text-left py-2 px-4 bg-surface dark:bg-surface font-medium text-text dark:text-text border-b border-border dark:border-border;
  }
  
  .props-table td {
    @apply py-2 px-4 border-b border-border dark:border-border text-text dark:text-text;
  }
</style>

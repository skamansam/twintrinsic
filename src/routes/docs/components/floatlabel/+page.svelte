<!--
@component
Documentation page for the FloatLabel component.
-->
<script lang="ts">
import { FloatLabel, TextInput, Textarea, Select, CodeBlock } from "$lib/index.js"
import { PropsTable, EventsTable } from "$lib/docs/index.js"
</script>

<h1>FloatLabel</h1>

<p>
  The FloatLabel component creates form inputs with animated floating labels that move out of the way
  when the input is focused or has a value. This provides a modern, space-efficient design while
  maintaining clear labeling for improved user experience.
</p>

<h2>Examples</h2>

<h3>Basic Usage</h3>
<div class="example">
  <FloatLabel label="Username">
    <TextInput name="username" />
  </FloatLabel>
</div>
<CodeBlock>
  {`<FloatLabel label="Username">
  <TextInput name="username" />
</FloatLabel>`}
</CodeBlock>

<h3>With Different Input Types</h3>
<div class="example">
  <div class="flex flex-col gap-4">
    <FloatLabel label="Email">
      <TextInput type="email" name="email" />
    </FloatLabel>
    
    <FloatLabel label="Password">
      <TextInput type="password" name="password" />
    </FloatLabel>
    
    <FloatLabel label="Message">
      <Textarea name="message" rows={3} />
    </FloatLabel>
    
    <FloatLabel label="Country">
      <Select 
        name="country"
        options={[
          { label: 'United States', value: 'us' },
          { label: 'Canada', value: 'ca' },
          { label: 'United Kingdom', value: 'uk' }
        ]}
      />
    </FloatLabel>
  </div>
</div>
<CodeBlock>
  {`<FloatLabel label="Email">
  <TextInput type="email" name="email" />
</FloatLabel>

<FloatLabel label="Password">
  <TextInput type="password" name="password" />
</FloatLabel>

<FloatLabel label="Message">
  <Textarea name="message" rows={3} />
</FloatLabel>

<FloatLabel label="Country">
  <Select 
    name="country"
    options={[
      { label: 'United States', value: 'us' },
      { label: 'Canada', value: 'ca' },
      { label: 'United Kingdom', value: 'uk' }
    ]}
  />
</FloatLabel>`}
</CodeBlock>

<h3>Required Field</h3>
<div class="example">
  <FloatLabel label="Email" required={true}>
    <TextInput type="email" name="email" required={true} />
  </FloatLabel>
</div>
<CodeBlock>
  {`<FloatLabel label="Email" required={true}>
  <TextInput type="email" name="email" required={true} />
</FloatLabel>`}
</CodeBlock>

<h3>With Error Message</h3>
<div class="example">
  <FloatLabel 
    label="Email" 
    error="Please enter a valid email address"
  >
    <TextInput type="email" name="email" />
  </FloatLabel>
</div>
<CodeBlock>
  {`<FloatLabel 
  label="Email" 
  error="Please enter a valid email address"
>
  <TextInput type="email" name="email" />
</FloatLabel>`}
</CodeBlock>

<h3>With Help Text</h3>
<div class="example">
  <FloatLabel 
    label="Password" 
    helpText="Password must be at least 8 characters long"
  >
    <TextInput type="password" name="password" />
  </FloatLabel>
</div>
<CodeBlock>
  {`<FloatLabel 
  label="Password" 
  helpText="Password must be at least 8 characters long"
>
  <TextInput type="password" name="password" />
</FloatLabel>`}
</CodeBlock>

<h3>Disabled State</h3>
<div class="example">
  <FloatLabel label="Username" disabled={true}>
    <TextInput name="username" disabled={true} />
  </FloatLabel>
</div>
<CodeBlock>
  {`<FloatLabel label="Username" disabled={true}>
  <TextInput name="username" disabled={true} />
</FloatLabel>`}
</CodeBlock>

<h3>With Initial Value</h3>
<div class="example">
  <FloatLabel label="Username">
    <TextInput name="username" value="johndoe" />
  </FloatLabel>
</div>
<CodeBlock>
  {`<FloatLabel label="Username">
  <TextInput name="username" value="johndoe" />
</FloatLabel>`}
</CodeBlock>

<h2>Props</h2>
<PropsTable
  props={[
    {
      name: 'label',
      type: 'string',
      description: 'Label text for the input'
    },
    {
      name: 'required',
      type: 'boolean',
      default: 'false',
      description: 'Whether the input is required (adds an asterisk)'
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Whether the input is disabled'
    },
    {
      name: 'error',
      type: 'string',
      description: 'Error message to display below the input'
    },
    {
      name: 'helpText',
      type: 'string',
      description: 'Help text to display below the input (not shown when there is an error)'
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
      <td>The input component to wrap with the floating label</td>
    </tr>
  </tbody>
</table>

<h2>Accessibility</h2>
<p>
  The FloatLabel component follows accessibility best practices:
</p>
<ul>
  <li>Associates labels with inputs using proper <code>for</code> attributes</li>
  <li>Maintains visible labels at all times</li>
  <li>Properly indicates required fields with both visual and screen reader cues</li>
  <li>Error messages are announced to screen readers using <code>role="alert"</code></li>
  <li>Preserves the accessibility features of the wrapped input components</li>
</ul>

<h2>Best Practices</h2>
<ul>
  <li>Use clear, concise labels that describe the input's purpose</li>
  <li>Keep labels short to avoid overflow when floating</li>
  <li>Ensure error messages are descriptive and actionable</li>
  <li>Use help text to provide additional context or requirements</li>
  <li>Maintain consistent styling across your form by using FloatLabel for all inputs</li>
</ul>

<h2>Form Integration</h2>
<p>
  The FloatLabel component works with the Form component for validation and submission:
</p>
<CodeBlock>
  {`<Form onSubmit={handleSubmit}>
  <FloatLabel label="Email" required={true}>
    <TextInput 
      type="email"
      name="email"
      required={true}
    />
  </FloatLabel>
  
  <FloatLabel label="Password" required={true}>
    <TextInput 
      type="password"
      name="password"
      required={true}
    />
  </FloatLabel>
  
  <Button type="submit">Sign In</Button>
</Form>`}
</CodeBlock>

<style lang="postcss">
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

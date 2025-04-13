<!--
@component
Documentation page for the InvalidState component.
-->
<script>
import { InvalidState, TextInput, FormField, CodeBlock } from "$lib/index.js"
import { PropsTable, EventsTable } from "$lib/docs/index.js"
</script>

<h1>InvalidState</h1>

<p>
  The InvalidState component provides a consistent way to display validation errors in forms.
  It includes styling, icons, and proper accessibility attributes to ensure error messages
  are clearly communicated to all users.
</p>

<h2>Examples</h2>

<h3>Basic Usage</h3>
<div class="example">
  <InvalidState message="This field is required" />
</div>
<CodeBlock>
  {`<InvalidState message="This field is required" />`}
</CodeBlock>

<h3>With Form Field</h3>
<div class="example">
  <FormField label="Email">
    <TextInput type="email" name="email" />
    <InvalidState message="Please enter a valid email address" />
  </FormField>
</div>
<CodeBlock>
  {`<FormField label="Email">
  <TextInput type="email" name="email" />
  <InvalidState message="Please enter a valid email address" />
</FormField>`}
</CodeBlock>

<h3>Without Icon</h3>
<div class="example">
  <InvalidState 
    message="This field is required" 
    showIcon={false}
  />
</div>
<CodeBlock>
  {`<InvalidState 
  message="This field is required" 
  showIcon={false}
/>`}
</CodeBlock>

<h3>With Custom Icon</h3>
<div class="example">
  <InvalidState 
    message="Password must be at least 8 characters long" 
    icon='<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m0 0v2m0-2h2m-2 0H9m3-4V7a3 3 0 00-3-3H9a3 3 0 00-3 3v4m9 0h6m-6 0H9"></path></svg>'
  />
</div>
<CodeBlock>
  {`<InvalidState 
  message="Password must be at least 8 characters long" 
  icon='<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m0 0v2m0-2h2m-2 0H9m3-4V7a3 3 0 00-3-3H9a3 3 0 00-3 3v4m9 0h6m-6 0H9"></path></svg>'
/>`}
</CodeBlock>

<h3>With Child Content</h3>
<div class="example">
  <InvalidState>
    <span>This field is <strong>required</strong> and cannot be left empty.</span>
  </InvalidState>
</div>
<CodeBlock>
  {`<InvalidState>
  <span>This field is <strong>required</strong> and cannot be left empty.</span>
</InvalidState>`}
</CodeBlock>

<h3>Multiple Error Messages</h3>
<div class="example">
  <div class="flex flex-col gap-1">
    <InvalidState message="Password must be at least 8 characters long" />
    <InvalidState message="Password must include at least one number" />
    <InvalidState message="Password must include at least one special character" />
  </div>
</div>
<CodeBlock>
  {`<div class="flex flex-col gap-1">
  <InvalidState message="Password must be at least 8 characters long" />
  <InvalidState message="Password must include at least one number" />
  <InvalidState message="Password must include at least one special character" />
</div>`}
</CodeBlock>

<h2>Props</h2>
<PropsTable
  props={[
    {
      name: 'message',
      type: 'string',
      description: 'Error message to display'
    },
    {
      name: 'icon',
      type: 'string',
      description: 'Custom icon to display (HTML or SVG string)'
    },
    {
      name: 'showIcon',
      type: 'boolean',
      default: 'true',
      description: 'Whether to show the default icon'
    },
    {
      name: 'animated',
      type: 'boolean',
      default: 'true',
      description: 'Whether to animate the message when it appears'
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
      <td>Custom content to display instead of the message prop</td>
    </tr>
  </tbody>
</table>

<h2>Accessibility</h2>
<p>
  The InvalidState component follows accessibility best practices:
</p>
<ul>
  <li>Uses <code>role="alert"</code> to ensure screen readers announce the error</li>
  <li>Includes <code>aria-live="assertive"</code> to immediately announce changes</li>
  <li>Provides visual indication with both color and icons</li>
  <li>Maintains sufficient color contrast for visibility</li>
  <li>Animates subtly to draw attention without being distracting</li>
</ul>

<h2>Form Integration</h2>
<p>
  The InvalidState component is typically used within forms to display validation errors:
</p>
<CodeBlock>
  {`<script>
  let errors = {};
  
  function validateForm(values) {
    errors = {};
    
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/^[^@]+@[^@]+\.[^@]+$/.test(values.email)) {
      errors.email = "Please enter a valid email address";
    }
    
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }
    
    return Object.keys(errors).length === 0;
  }
</script>

<Form onSubmit={handleSubmit}>
  <FormField label="Email">
    <TextInput 
      type="email"
      name="email"
      required={true}
    />
    {#if errors.email}
      <InvalidState message={errors.email} />
    {/if}
  </FormField>
  
  <FormField label="Password">
    <TextInput 
      type="password"
      name="password"
      required={true}
    />
    {#if errors.password}
      <InvalidState message={errors.password} />
    {/if}
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

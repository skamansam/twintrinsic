<!--
@component
Documentation page for the Input component.
-->
<script>
  import { Input } from '$lib/components';
  import { CodeBlock, PropsTable, EventsTable } from '$lib/docs';
</script>

<h1>Input</h1>

<p>
  The Input component is a versatile form control that supports validation, floating labels,
  input masking, and icon integration. It's built with accessibility in mind and follows
  modern web best practices.
</p>

<h2>Examples</h2>

<h3>Basic Usage</h3>
<div class="example">
  <Input label="Username" placeholder="Enter username" />
</div>
<CodeBlock>
  {`<Input label="Username" placeholder="Enter username" />`}
</CodeBlock>

<h3>With Icons</h3>
<div class="example">
  <Input
    label="Password"
    type="password"
    leftIcon="lock"
    rightIcon="eye"
    placeholder="Enter password"
  />
</div>
<CodeBlock>
  {`<Input
  label="Password"
  type="password"
  leftIcon="lock"
  rightIcon="eye"
  placeholder="Enter password"
/>`}
</CodeBlock>

<h3>Floating Label</h3>
<div class="example">
  <Input
    label="Email"
    type="email"
    floating={true}
    placeholder="Enter email"
  />
</div>
<CodeBlock>
  {`<Input
  label="Email"
  type="email"
  floating={true}
  placeholder="Enter email"
/>`}
</CodeBlock>

<h3>Validation and Error States</h3>
<div class="example">
  <Input
    label="Email"
    type="email"
    value="invalid-email"
    error="Please enter a valid email address"
    required
  />
</div>
<CodeBlock>
  {`<Input
  label="Email"
  type="email"
  value="invalid-email"
  error="Please enter a valid email address"
  required
/>`}
</CodeBlock>

<h3>Input Masking</h3>
<div class="example">
  <Input
    label="Phone"
    type="tel"
    mask="(###) ###-####"
    placeholder="(555) 555-5555"
  />
</div>
<CodeBlock>
  {`<Input
  label="Phone"
  type="tel"
  mask="(###) ###-####"
  placeholder="(555) 555-5555"
/>`}
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
      name: 'type',
      type: 'string',
      default: 'text',
      description: 'HTML input type (text, email, password, etc.)'
    },
    {
      name: 'value',
      type: 'string',
      default: '""',
      description: 'Input value'
    },
    {
      name: 'placeholder',
      type: 'string',
      default: '""',
      description: 'Placeholder text'
    },
    {
      name: 'name',
      type: 'string',
      default: '""',
      description: 'Name attribute for the input'
    },
    {
      name: 'id',
      type: 'string',
      default: 'auto',
      description: 'Unique identifier for the input'
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Whether the input is disabled'
    },
    {
      name: 'required',
      type: 'boolean',
      default: 'false',
      description: 'Whether the input is required'
    },
    {
      name: 'floating',
      type: 'boolean',
      default: 'false',
      description: 'Whether to use floating labels'
    },
    {
      name: 'readonly',
      type: 'boolean',
      default: 'false',
      description: 'Whether the input is readonly'
    },
    {
      name: 'error',
      type: 'string',
      default: '""',
      description: 'Error message to display'
    },
    {
      name: 'helpText',
      type: 'string',
      default: '""',
      description: 'Help text to display below input'
    },
    {
      name: 'leftIcon',
      type: 'string',
      default: '""',
      description: 'Name of icon to display on the left'
    },
    {
      name: 'rightIcon',
      type: 'string',
      default: '""',
      description: 'Name of icon to display on the right'
    },
    {
      name: 'class',
      type: 'string',
      default: '""',
      description: 'Additional CSS classes'
    },
    {
      name: 'mask',
      type: 'string',
      default: '""',
      description: 'Input mask pattern (# for numbers, A for letters, * for any)'
    }
  ]}
/>

<h2>Events</h2>
<EventsTable
  events={[
    {
      name: 'input',
      type: '{ value: string }',
      description: 'Fired when input value changes'
    },
    {
      name: 'focus',
      type: 'void',
      description: 'Fired when input gains focus'
    },
    {
      name: 'blur',
      type: 'void',
      description: 'Fired when input loses focus'
    },
    {
      name: 'leftIconClick',
      type: 'void',
      description: 'Fired when left icon is clicked'
    },
    {
      name: 'rightIconClick',
      type: 'void',
      description: 'Fired when right icon is clicked'
    }
  ]}
/>

<h2>Accessibility</h2>
<p>
  The Input component follows WAI-ARIA guidelines for form fields:
</p>
<ul>
  <li>Labels are properly associated with inputs using <code>for</code> attributes</li>
  <li>Required fields are marked with both visual and ARIA indicators</li>
  <li>Error messages are linked to inputs using <code>aria-describedby</code></li>
  <li>Invalid states are indicated with <code>aria-invalid</code></li>
  <li>Icons are properly hidden from screen readers when decorative</li>
</ul>

<h2>Input Masking</h2>
<p>
  The mask pattern uses the following special characters:
</p>
<ul>
  <li><code>#</code> - Matches a number (0-9)</li>
  <li><code>A</code> - Matches a letter (a-z, A-Z)</li>
  <li><code>*</code> - Matches any character</li>
  <li>Any other character is treated as a literal</li>
</ul>
<p>Example patterns:</p>
<ul>
  <li>Phone: <code>(###) ###-####</code></li>
  <li>Date: <code>##/##/####</code></li>
  <li>Credit Card: <code>#### #### #### ####</code></li>
  <li>Serial Number: <code>AA-##-**</code></li>
</ul>

<style>
  .example {
    @apply my-4 p-4 border border-border rounded-md;
    @apply flex flex-col gap-4 max-w-md;
  }
</style>

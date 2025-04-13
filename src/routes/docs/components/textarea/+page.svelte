<!--
@component
Documentation page for the Textarea component.
-->
<script>
import { Textarea, CodeBlock } from "$lib/index.js"
import { PropsTable, EventsTable } from "$lib/docs/index.js"
</script>

<h1>Textarea</h1>

<p>
  The Textarea component provides a styled multi-line text input with support for
  auto-resizing, form integration, and accessibility features. It's designed for
  collecting longer text content like descriptions, messages, or comments.
</p>

<h2>Examples</h2>

<h3>Basic Usage</h3>
<div class="example">
  <Textarea 
    placeholder="Enter your message here"
    rows={3}
  />
</div>
<CodeBlock>
  {`<Textarea 
  placeholder="Enter your message here"
  rows={3}
/>`}
</CodeBlock>

<h3>With Initial Value</h3>
<div class="example">
  <Textarea 
    value="This is a pre-filled textarea with some initial content."
    rows={3}
  />
</div>
<CodeBlock>
  {`<Textarea 
  value="This is a pre-filled textarea with some initial content."
  rows={3}
/>`}
</CodeBlock>

<h3>Auto-resize</h3>
<div class="example">
  <Textarea 
    placeholder="This textarea will grow as you type..."
    autoResize={true}
    rows={2}
  />
</div>
<CodeBlock>
  {`<Textarea 
  placeholder="This textarea will grow as you type..."
  autoResize={true}
  rows={2}
/>`}
</CodeBlock>

<h3>Disabled State</h3>
<div class="example">
  <Textarea 
    value="This textarea is disabled and cannot be edited."
    disabled={true}
    rows={3}
  />
</div>
<CodeBlock>
  {`<Textarea 
  value="This textarea is disabled and cannot be edited."
  disabled={true}
  rows={3}
/>`}
</CodeBlock>

<h3>Read-only State</h3>
<div class="example">
  <Textarea 
    value="This textarea is read-only but can still be focused and copied."
    readonly={true}
    rows={3}
  />
</div>
<CodeBlock>
  {`<Textarea 
  value="This textarea is read-only but can still be focused and copied."
  readonly={true}
  rows={3}
/>`}
</CodeBlock>

<h3>With Character Limit</h3>
<div class="example">
  <Textarea 
    placeholder="Maximum 100 characters allowed"
    maxlength="100"
    rows={3}
  />
</div>
<CodeBlock>
  {`<Textarea 
  placeholder="Maximum 100 characters allowed"
  maxlength="100"
  rows={3}
/>`}
</CodeBlock>

<h3>Required Field</h3>
<div class="example">
  <Textarea 
    placeholder="This field is required"
    required={true}
    rows={3}
  />
</div>
<CodeBlock>
  {`<Textarea 
  placeholder="This field is required"
  required={true}
  rows={3}
/>`}
</CodeBlock>

<h2>Props</h2>
<PropsTable
  props={[
    {
      name: 'value',
      type: 'string',
      default: "''",
      description: 'Textarea value'
    },
    {
      name: 'placeholder',
      type: 'string',
      default: "''",
      description: 'Placeholder text'
    },
    {
      name: 'rows',
      type: 'number',
      default: '3',
      description: 'Number of visible text rows'
    },
    {
      name: 'name',
      type: 'string',
      description: 'Name attribute for the textarea'
    },
    {
      name: 'required',
      type: 'boolean',
      default: 'false',
      description: 'Whether the textarea is required'
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Whether the textarea is disabled'
    },
    {
      name: 'readonly',
      type: 'boolean',
      default: 'false',
      description: 'Whether the textarea is read-only'
    },
    {
      name: 'autoResize',
      type: 'boolean',
      default: 'false',
      description: 'Whether to automatically resize based on content'
    },
    {
      name: 'minlength',
      type: 'string',
      description: 'Minimum length of text'
    },
    {
      name: 'maxlength',
      type: 'string',
      description: 'Maximum length of text'
    },
    {
      name: 'autocomplete',
      type: 'string',
      description: 'HTML autocomplete attribute'
    },
    {
      name: 'ariaLabel',
      type: 'string',
      description: 'ARIA label for accessibility'
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
      name: 'input',
      type: '{ value: string }',
      description: 'Fired on each keystroke or input'
    },
    {
      name: 'change',
      type: '{ value: string }',
      description: 'Fired when the value changes'
    },
    {
      name: 'focus',
      type: 'Event',
      description: 'Fired when the textarea gains focus'
    },
    {
      name: 'blur',
      type: 'Event',
      description: 'Fired when the textarea loses focus'
    }
  ]}
/>

<h2>Accessibility</h2>
<p>
  The Textarea component follows accessibility best practices:
</p>
<ul>
  <li>Native <code>&lt;textarea&gt;</code> element for best compatibility</li>
  <li>Proper focus states with visible indicators</li>
  <li>Support for ARIA labels</li>
  <li>Proper disabled and readonly states</li>
  <li>Compatible with screen readers</li>
  <li>Integrates with form validation</li>
</ul>

<h2>Form Integration</h2>
<p>
  The Textarea component integrates with the Form component for validation and submission:
</p>
<CodeBlock>
  {`<Form onSubmit={handleSubmit}>
  <FormField label="Message" error={errors.message}>
    <Textarea 
      name="message"
      required={true}
      placeholder="Enter your message"
    />
  </FormField>
  <Button type="submit">Send</Button>
</Form>`}
</CodeBlock>

<style>
  @reference '$lib/twintrinsic.css';
  .example {
    @apply my-4 p-4 border border-border rounded-md;
    @apply flex flex-col gap-4 max-w-md;
  }
</style>

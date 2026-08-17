<!--
@component
Documentation page for the Textarea component.
-->
<script lang="ts">
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import Textarea from "$lib/components/Form/Textarea.svelte"
import * as TextareaModule from "$lib/components/Form/Textarea.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
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
    data-testid="textarea-basic"
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
    data-testid="textarea-prefilled"
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
    data-testid="textarea-autoresize"
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
    data-testid="textarea-disabled"
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
    data-testid="textarea-readonly"
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
    data-testid="textarea-maxlength"
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
    data-testid="textarea-required"
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
<PropsTable component={TextareaModule} />

<h2>Events</h2>
<EventsTable component={TextareaModule} />

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

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
  .example {
    @apply my-4 p-4 border border-border rounded-md;
    @apply flex flex-col gap-4 max-w-md;
  }
</style>

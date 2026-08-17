<!--
@component
Documentation page for the Input component.
-->
<script lang="ts">
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
import Input from "$lib/components/Form/Input.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as InputModule from "$lib/components/Form/Input.svelte"
</script>

<h1>Input</h1>

<p>
  The Input component is a versatile form control that supports validation, floating labels,
  input masking, and icon integration. It's built with accessibility in mind and follows
  modern web best practices.
</p>

<h2>Examples</h2>

<h3>Basic Usage</h3>
<div class="example" data-testid="input-basic">
  <Input label="Username" placeholder="Enter username" />
</div>
<CodeBlock>
  {`<Input label="Username" placeholder="Enter username" />`}
</CodeBlock>

<h3>With Icons</h3>
<div class="example" data-testid="input-icons">
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
<div class="example" data-testid="input-floating">
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
<div class="example" data-testid="input-error">
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
<div class="example" data-testid="input-mask">
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
<PropsTable component={InputModule} />

<h2>Events</h2>
<EventsTable component={InputModule} />

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

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
  .example {
    @apply my-4 p-4 border border-border rounded-md;
    @apply flex flex-col gap-4 max-w-md;
  }
</style>

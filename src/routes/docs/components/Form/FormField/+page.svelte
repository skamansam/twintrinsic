<!--
@component
FormField documentation page — standardized structure
-->
<script lang="ts">
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import FormField from "$lib/components/Form/FormField.svelte"
import Select from "$lib/components/Form/Select.svelte"
import Textarea from "$lib/components/Form/Textarea.svelte"
import TextInput from "$lib/components/Form/TextInput.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as FormFieldModule from "$lib/components/Form/FormField.svelte"
import Container from "$lib/components/Container/Container.svelte"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
<h1>FormField</h1>

<p>
  <strong>FormField</strong> wraps form inputs with a consistent label, help text,
  error message, and required indicator. It provides the standard structure that
  every form field needs.
</p>

<h2>What, When &amp; Why</h2>

<h3>What is it?</h3>
<p>
  A container that associates a label with an input, displays help text below the
  field, and shows error messages when validation fails. Uses <code>:has(:user-valid)</code>
  and <code>:has(:user-invalid)</code> CSS for validation styling.
</p>

<h3>When should I use it?</h3>
<p>
  Wrap every form input in <code>&lt;FormField&gt;</code> — even simple fields
  benefit from consistent label positioning and error display. For complex field
  groups (radio groups, checkbox groups), use <code>&lt;fieldset&gt;</code> +
  <code>&lt;legend&gt;</code>.
</p>

<h3>Why does it exist?</h3>
<ul>
  <li><strong>Consistency</strong> — all fields share the same label position, error style, and spacing.</li>
  <li><strong>Accessibility</strong> — proper <code>&lt;label&gt;</code> association, <code>aria-describedby</code> for help/error text.</li>
  <li><strong>Validation CSS</strong> — <code>:has(:user-valid)</code> / <code>:has(:user-invalid)</code> shows validation only after user interaction.</li>
</ul>

<h2>Responsiveness</h2>
<ul>
  <li>Fills container width by default.</li>
  <li>Horizontal layout places labels beside inputs on desktop.</li>
</ul>

<h2>Customization</h2>
<ul>
  <li>Layout: <code>vertical</code> (default) or <code>horizontal</code>.</li>
  <li>Help text via <code>helpText</code> prop.</li>
  <li>Error message via <code>error</code> prop.</li>
  <li>Required indicator via <code>required</code> prop.</li>
  <li>Visually hidden label via <code>hideLabel</code> prop.</li>
</ul>

<h2>Examples</h2>

<h3>Basic Usage</h3>
<ExampleTabs code={`<FormField label="Username">
  <TextInput name="username" />
</FormField>`}>
  <div class="max-w-md" data-testid="formfield-basic-usage">
    <FormField label="Username"><TextInput name="username" /></FormField>
  </div>
</ExampleTabs>

<h3>With Help Text</h3>
<ExampleTabs code={`<FormField label="Password" helpText="Must be at least 8 characters">
  <TextInput type="password" name="password" />
</FormField>`}>
  <div class="max-w-md" data-testid="formfield-help">
    <FormField label="Password" helpText="Must be at least 8 characters"><TextInput type="password" name="password" /></FormField>
  </div>
</ExampleTabs>  <h3>Required</h3>
  <ExampleTabs code={`<FormField label="Email" required>
  <TextInput type="email" name="email" required />
</FormField>`}>
    <div class="max-w-md" data-testid="formfield-required">
      <FormField label="Email" required><TextInput type="email" name="email" required /></FormField>
    </div>
  </ExampleTabs>

  <h3>Different Input Types</h3>
  <ExampleTabs code={`<FormField label="Email">
  <TextInput type="email" name="email" />
</FormField>

<FormField label="Message">
  <Textarea name="message" rows={3} />
</FormField>`}>
    <div class="max-w-md flex flex-col gap-4" data-testid="formfield-types">
      <FormField label="Email"><TextInput type="email" name="email" /></FormField>
      <FormField label="Message"><Textarea name="message" rows={3} /></FormField>
    </div>
  </ExampleTabs>

  <h3>Hidden Label</h3>
  <ExampleTabs code={`<FormField label="Search" hideLabel>
  <TextInput name="search" placeholder="Search..." />
</FormField>`}>
    <div class="max-w-md" data-testid="formfield-hidden-label">
      <FormField label="Search" hideLabel><TextInput name="search" placeholder="Search..." /></FormField>
    </div>
  </ExampleTabs>

  <h3>Error State</h3>
<ExampleTabs code={`<FormField label="Email" error="Please enter a valid email address">
  <TextInput type="email" name="email" />
</FormField>`}>
  <div class="max-w-md" data-testid="formfield-error">
    <FormField label="Email" error="Please enter a valid email address"><TextInput type="email" name="email" /></FormField>
  </div>
</ExampleTabs>

<h3>Horizontal Layout</h3>
<ExampleTabs code={`<FormField label="Username" layout="horizontal">
  <TextInput name="username" />
</FormField>`}>
  <div class="max-w-md" data-testid="formfield-horizontal">
    <FormField label="Username" layout="horizontal"><TextInput name="username" /></FormField>
  </div>
</ExampleTabs>

<h3>Disabled</h3>
<ExampleTabs code={`<FormField label="Username" disabled={true}>
  <TextInput name="username" disabled={true} />
</FormField>`}>
  <div class="max-w-md" data-testid="formfield-disabled-state">
    <FormField label="Username" disabled={true}><TextInput name="username" disabled={true} /></FormField>
  </div>
</ExampleTabs>

<h2>Props</h2>
<PropsTable component={FormFieldModule} />

<h2>Accessibility</h2>
<ul>
  <li>Labels associated via <code>for</code>/<code>id</code>.</li>
  <li>Hidden labels still accessible to screen readers.</li>
  <li>Error messages use <code>role="alert"</code>.</li>
  <li><code>aria-describedby</code> links help text and errors to the input.</li>
  <li><code>aria-invalid</code> and <code>aria-required</code> set appropriately.</li>
</ul>
</Container>

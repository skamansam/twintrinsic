<!--
@component
FloatLabel documentation page — standardized structure
-->
<script lang="ts">
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import FloatLabel from "$lib/components/Form/FloatLabel.svelte"
import Select from "$lib/components/Form/Select.svelte"
import Textarea from "$lib/components/Form/Textarea.svelte"
import TextInput from "$lib/components/Form/TextInput.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as FloatLabelModule from "$lib/components/Form/FloatLabel.svelte"
import Container from "$lib/components/Container/Container.svelte"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
<h1>FloatLabel</h1>

<p>
  <strong>FloatLabel</strong> wraps form inputs with an animated label that floats
  above the field when focused or filled, saving vertical space while maintaining
  clear context.
</p>

<h2>What, When &amp; Why</h2>

<h3>What is it?</h3>
<p>
  A form field wrapper that positions the label inside the input when empty, then
  animates it above the input when focused or filled. Uses CSS <code>:has()</code>
  for the float animation — no JavaScript needed.
</p>

<h3>When should I use it?</h3>
<p>
  Use <code>&lt;FloatLabel&gt;</code> for dense forms where vertical space is at a
  premium: mobile forms, side panels, modal forms. For standard forms with ample
  space, prefer <code>&lt;FormField&gt;</code> with a separate label above.
</p>

<h3>Why does it exist?</h3>
<ul>
  <li><strong>Space efficiency</strong> — combines label and placeholder into one element.</li>
  <li><strong>Persistent context</strong> — the floating label is always visible, even after typing.</li>
  <li><strong>Modern CSS</strong> — <code>:has()</code> enables the float animation without JS.</li>
</ul>

<h2>Responsiveness</h2>
<ul>
  <li>Fills container width by default.</li>
  <li>Works with any input type (text, email, password, textarea, select).</li>
</ul>

<h2>Customization</h2>
<ul>
  <li>Wrap any input component (TextInput, Textarea, Select).</li>
  <li>Add help text, error messages, required indicators via props.</li>
  <li>Disabled state via prop.</li>
</ul>

<h2>Examples</h2>

<h3>Basic Usage</h3>
<ExampleTabs code={`<FloatLabel label="Username">
  <TextInput name="username" />
</FloatLabel>`}>
  <div class="max-w-md" data-testid="floatlabel-basic-usage">
    <FloatLabel label="Username"><TextInput name="username" /></FloatLabel>
  </div>
</ExampleTabs>

<h3>With Different Input Types</h3>
<ExampleTabs code={`<FloatLabel label="Email">
  <TextInput type="email" name="email" />
</FloatLabel>

<FloatLabel label="Password">
  <TextInput type="password" name="password" />
</FloatLabel>

<FloatLabel label="Message">
  <Textarea name="message" rows={3} />
</FloatLabel>`}>
  <div class="max-w-md flex flex-col gap-4" data-testid="floatlabel-types">
    <FloatLabel label="Email"><TextInput type="email" name="email" /></FloatLabel>
    <FloatLabel label="Password"><TextInput type="password" name="password" /></FloatLabel>
    <FloatLabel label="Message"><Textarea name="message" rows={3} /></FloatLabel>
  </div>
</ExampleTabs>

<h3>With Error &amp; Help Text</h3>
<ExampleTabs code={`<FloatLabel label="Email" error="Please enter a valid email">
  <TextInput type="email" name="email" />
</FloatLabel>

<FloatLabel label="Password" helpText="At least 8 characters">
  <TextInput type="password" name="password" />
</FloatLabel>`}>
  <div class="max-w-md flex flex-col gap-4" data-testid="floatlabel-error">
    <FloatLabel label="Email" error="Please enter a valid email"><TextInput type="email" name="email" /></FloatLabel>
    <FloatLabel label="Password" helpText="At least 8 characters"><TextInput type="password" name="password" /></FloatLabel>
  </div>
</ExampleTabs>

<h2>Props</h2>
<PropsTable component={FloatLabelModule} />

<h2>Accessibility</h2>
<ul>
  <li>Labels are properly associated via <code>for</code>/<code>id</code>.</li>
  <li>Labels remain visible at all times (never hidden).</li>
  <li>Error messages use <code>role="alert"</code> for screen reader announcements.</li>
  <li>Preserves accessibility features of wrapped input components.</li>
</ul>
</Container>

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
import { m } from "$lib/paraglide/messages.js"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
<h1>{m.floatlabel_heading()}</h1>

<p>
  <strong>{m.floatlabel_heading()}</strong>{m.floatlabel_lede_1()}
</p>

<h2>{m.sec_what_when_why()}</h2>

<h3>{m.sec_what()}</h3>
<p>
  {m.floatlabel_what_1()}<code>:has()</code>{m.floatlabel_what_2()}
</p>

<h3>{m.sec_when()}</h3>
<p>
  {m.floatlabel_when_1()}<code>&lt;FloatLabel&gt;</code>{m.floatlabel_when_2()}<code>&lt;FormField&gt;</code>{m.floatlabel_when_3()}
</p>

<h3>{m.sec_why()}</h3>
<ul>
  <li><strong>{m.floatlabel_why_space()}</strong>{m.floatlabel_why_space_1()}</li>
  <li><strong>{m.floatlabel_why_context()}</strong>{m.floatlabel_why_context_1()}</li>
  <li><strong>{m.floatlabel_why_css()}</strong>{m.floatlabel_why_css_1()}<code>:has()</code>{m.floatlabel_why_css_2()}</li>
</ul>

<h3>{m.sec_sources()}</h3>
<ul>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/:has">MDN — :has()</a></li>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/:placeholder-shown">MDN — :placeholder-shown</a></li>
</ul>

<h2>{m.sec_implementation()}</h2>
<ul>
    <li>{m.floatlabel_impl_1()}</li>
    <li>{m.floatlabel_impl_2()}</li>
    <li>{m.floatlabel_impl_3()}</li>
</ul>

<h2>{m.sec_mistakes()}</h2>
<ul>
    <li>{m.floatlabel_mistake_1()}</li>
    <li>{m.floatlabel_mistake_2()}</li>
</ul>

<h2>{m.sec_related()}</h2>
<p>{m.floatlabel_related_1()}</p>

<h2>{m.sec_responsiveness()}</h2>
<ul>
  <li>{m.floatlabel_responsive_1()}</li>
  <li>{m.floatlabel_responsive_2()}</li>
</ul>

<h2>{m.sec_customization()}</h2>
<ul>
  <li>{m.floatlabel_custom_1_1()}<code>TextInput</code>, <code>Textarea</code>, <code>Select</code>{m.floatlabel_custom_1_2()}</li>
  <li>{m.floatlabel_custom_2()}</li>
  <li>{m.floatlabel_custom_3_1()}</li>
</ul>

<h2>{m.sec_examples()}</h2>

<h3>{m.floatlabel_ex_basic()}</h3>
<ExampleTabs code={`<FloatLabel label="Username">
  <TextInput name="username" />
</FloatLabel>`}>
  <div class="max-w-md" data-testid="floatlabel-basic-usage">
    <FloatLabel label="Username"><TextInput name="username" /></FloatLabel>
  </div>
</ExampleTabs>

<h3>{m.floatlabel_ex_types()}</h3>
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
</ExampleTabs>  <h3>{m.floatlabel_ex_required()}</h3>
  <ExampleTabs code={`<FloatLabel label="Email" required>
  <TextInput type="email" name="email" required />
</FloatLabel>`}>
    <div class="max-w-md" data-testid="floatlabel-required">
      <FloatLabel label="Email" required><TextInput type="email" name="email" required /></FloatLabel>
    </div>
  </ExampleTabs>

  <h3>{m.floatlabel_ex_help()}</h3>
  <ExampleTabs code={`<FloatLabel label="Password" helpText="Password must be at least 8 characters long">
  <TextInput type="password" name="password" />
</FloatLabel>`}>
    <div class="max-w-md" data-testid="floatlabel-help">
      <FloatLabel label="Password" helpText="Password must be at least 8 characters long"><TextInput type="password" name="password" /></FloatLabel>
    </div>
  </ExampleTabs>

  <h3>{m.floatlabel_ex_initial()}</h3>
  <ExampleTabs code={`<FloatLabel label="Username">
  <TextInput name="username" value="johndoe" />
</FloatLabel>`}>
    <div class="max-w-md" data-testid="floatlabel-initial-value">
      <FloatLabel label="Username"><TextInput name="username" value="johndoe" /></FloatLabel>
    </div>
  </ExampleTabs>

  <h3>{m.floatlabel_ex_error()}</h3>
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

<h2>{m.sec_props()}</h2>
<PropsTable component={FloatLabelModule} />

<h2>{m.sec_accessibility()}</h2>
<ul>
  <li>{m.floatlabel_a11y_1_1()}<code>for</code>/<code>id</code>{m.floatlabel_a11y_1_2()}</li>
  <li>{m.floatlabel_a11y_2()}</li>
  <li>{m.floatlabel_a11y_3_1()}<code>role="alert"</code>{m.floatlabel_a11y_3_2()}</li>
  <li>{m.floatlabel_a11y_4()}</li>
</ul>
</Container>

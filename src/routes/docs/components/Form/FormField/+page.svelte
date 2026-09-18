<!--
@component
FormField documentation page — standardized structure
-->
<script lang="ts">
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import { docsIcon } from "../../../componentIcons"
import Icon from "$lib/components/Icon/Icon.svelte"
import FormField from "$lib/components/Form/FormField.svelte"
import Select from "$lib/components/Form/Select.svelte"
import Textarea from "$lib/components/Form/Textarea.svelte"
import TextInput from "$lib/components/Form/TextInput.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as FormFieldModule from "$lib/components/Form/FormField.svelte"
import Container from "$lib/components/Container/Container.svelte"
import { m } from "$lib/paraglide/messages.js"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
<div class="flex flex-wrap items-center gap-3">
  <Icon name={docsIcon("FormField")} class="h-8 w-8 shrink-0 text-primary" aria-hidden="true" />
  <h1>{m.ff_heading()}</h1>
</div>

<p>
  <strong>{m.ff_heading()}</strong>{m.ff_intro()}
</p>

<h2>{m.sec_what_when_why()}</h2>

<h3>{m.sec_what()}</h3>
<p>
  {m.ff_what_1()}<code>:has(:user-valid)</code>{m.ff_what_2()}<code>:has(:user-invalid)</code>{m.ff_what_3()}
</p>

<h3>{m.sec_when()}</h3>
<p>
  {m.ff_when_1()}<code>&lt;FormField&gt;</code>{m.ff_when_2()}<code>&lt;fieldset&gt;</code>{m.ff_when_3()}<code>&lt;legend&gt;</code>{m.ff_when_4()}
</p>

<h3>{m.sec_why()}</h3>
<ul>
  <li><strong>{m.ff_why_consistency()}</strong>{m.ff_why_consistency_desc()}</li>
  <li><strong>{m.ff_why_a11y()}</strong>{m.ff_why_a11y_1()}<code>&lt;label&gt;</code>{m.ff_why_a11y_2()}<code>aria-describedby</code>{m.ff_why_a11y_3()}</li>
  <li><strong>{m.ff_why_validation()}</strong>{m.ff_why_validation_1()}<code>:has(:user-valid)</code>{m.ff_why_validation_2()}<code>:has(:user-invalid)</code>{m.ff_why_validation_3()}</li>
</ul>

<h2>{m.sec_responsiveness()}</h2>
<ul>
  <li>{m.ff_responsive_1()}</li>
  <li>{m.ff_responsive_2()}</li>
</ul>

<h2>{m.sec_customization()}</h2>
<ul>
  <li>{m.ff_custom_1_1()}<code>vertical</code>{m.ff_custom_1_2()}<code>horizontal</code>{m.ff_custom_1_3()}</li>
  <li>{m.ff_custom_2_1()}<code>helpText</code>{m.ff_custom_2_2()}</li>
  <li>{m.ff_custom_3_1()}<code>error</code>{m.ff_custom_3_2()}</li>
  <li>{m.ff_custom_4_1()}<code>required</code>{m.ff_custom_4_2()}</li>
  <li>{m.ff_custom_5_1()}<code>hideLabel</code>{m.ff_custom_5_2()}</li>
</ul>

<h2>{m.sec_examples()}</h2>

<h3>{m.ff_ex_basic()}</h3>
<ExampleTabs code={`<FormField label="Username">
  <TextInput name="username" />
</FormField>`}>
  <div class="max-w-md" data-testid="formfield-basic-usage">
    <FormField label="Username"><TextInput name="username" /></FormField>
  </div>
</ExampleTabs>

<h3>{m.ff_ex_help()}</h3>
<ExampleTabs code={`<FormField label="Password" helpText="Must be at least 8 characters">
  <TextInput type="password" name="password" />
</FormField>`}>
  <div class="max-w-md" data-testid="formfield-help">
    <FormField label="Password" helpText="Must be at least 8 characters"><TextInput type="password" name="password" /></FormField>
  </div>
</ExampleTabs>

  <h3>{m.ff_ex_required()}</h3>
  <ExampleTabs code={`<FormField label="Email" required>
  <TextInput type="email" name="email" required />
</FormField>`}>
    <div class="max-w-md" data-testid="formfield-required">
      <FormField label="Email" required><TextInput type="email" name="email" required /></FormField>
    </div>
  </ExampleTabs>

  <h3>{m.ff_ex_types()}</h3>
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

  <h3>{m.ff_ex_hidden()}</h3>
  <ExampleTabs code={`<FormField label="Search" hideLabel>
  <TextInput name="search" placeholder="Search..." />
</FormField>`}>
    <div class="max-w-md" data-testid="formfield-hidden-label">
      <FormField label="Search" hideLabel><TextInput name="search" placeholder="Search..." /></FormField>
    </div>
  </ExampleTabs>

  <h3>{m.ff_ex_error()}</h3>
<ExampleTabs code={`<FormField label="Email" error="Please enter a valid email address">
  <TextInput type="email" name="email" />
</FormField>`}>
  <div class="max-w-md" data-testid="formfield-error">
    <FormField label="Email" error="Please enter a valid email address"><TextInput type="email" name="email" /></FormField>
  </div>
</ExampleTabs>

<h3>{m.ff_ex_horizontal()}</h3>
<ExampleTabs code={`<FormField label="Username" layout="horizontal">
  <TextInput name="username" />
</FormField>

<FormField label="Email" layout="horizontal">
  <TextInput type="email" name="email" placeholder="you@example.com" />
</FormField>`}>
  <div class="max-w-md space-y-4" data-testid="formfield-horizontal">
    <FormField label="Username" layout="horizontal"><TextInput name="username" /></FormField>
    <FormField label="Email" layout="horizontal"><TextInput type="email" name="email" placeholder="you@example.com" /></FormField>
  </div>
</ExampleTabs>

<h3>{m.ff_ex_icons()}</h3>
<ExampleTabs code={`<FormField label="Search" layout="horizontal">
  <TextInput name="search" placeholder="Search components..." startIcon="search" />
</FormField>

<FormField label="URL" layout="horizontal">
  <TextInput name="url" placeholder="https://example.com" startIcon="link" />
</FormField>`}>
  <div class="max-w-md space-y-4" data-testid="formfield-horizontal-icons">
    <FormField label="Search" layout="horizontal"><TextInput name="search" placeholder="Search components..." startIcon="search" /></FormField>
    <FormField label="URL" layout="horizontal"><TextInput name="url" placeholder="https://example.com" startIcon="link" /></FormField>
  </div>
</ExampleTabs>

<h3>{m.ff_ex_disabled()}</h3>
<ExampleTabs code={`<FormField label="Username" disabled={true}>
  <TextInput name="username" disabled={true} />
</FormField>`}>
  <div class="max-w-md" data-testid="formfield-disabled-state">
    <FormField label="Username" disabled={true}><TextInput name="username" disabled={true} /></FormField>
  </div>
</ExampleTabs>

<h2>{m.sec_props()}</h2>
<PropsTable component={FormFieldModule} />

<h2>{m.sec_accessibility()}</h2>
<ul>
  <li>{m.ff_a11y_1_1()}<code>for</code>{m.ff_a11y_1_2()}<code>id</code>{m.ff_a11y_1_3()}</li>
  <li>{m.ff_a11y_2()}</li>
  <li>{m.ff_a11y_3_1()}<code>role="alert"</code>{m.ff_a11y_3_2()}</li>
  <li>{m.ff_a11y_4_1()}<code>aria-describedby</code>{m.ff_a11y_4_2()}</li>
  <li>{m.ff_a11y_5_1()}<code>aria-invalid</code>{m.ff_a11y_5_2()}<code>aria-required</code>{m.ff_a11y_5_3()}</li>
</ul>
</Container>

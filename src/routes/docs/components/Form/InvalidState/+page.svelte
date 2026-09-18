<!--
@component
InvalidState documentation page — standardized structure
-->
<script lang="ts">
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import { docsIcon } from "../../../componentIcons"
import Icon from "$lib/components/Icon/Icon.svelte"
import FormField from "$lib/components/Form/FormField.svelte"
import InvalidState from "$lib/components/Form/InvalidState.svelte"
import TextInput from "$lib/components/Form/TextInput.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as InvalidStateModule from "$lib/components/Form/InvalidState.svelte"
import Container from "$lib/components/Container/Container.svelte"
import { m } from "$lib/paraglide/messages.js"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
<div class="flex flex-wrap items-center gap-3">
  <Icon name={docsIcon("InvalidState")} class="h-8 w-8 shrink-0 text-primary" aria-hidden="true" />
  <h1>{m.invalid_heading()}</h1>
</div>

<p>
  <strong>{m.invalid_heading()}</strong>{m.invalid_intro()}
</p>

<h2>{m.sec_what_when_why()}</h2>

<h3>{m.sec_what()}</h3>
<p>
  {m.invalid_what_1()}<code>role="alert"</code>{m.invalid_what_2()}<code>aria-live="assertive"</code>{m.invalid_what_3()}
</p>

<h3>{m.sec_when()}</h3>
<p>
  {m.invalid_when_1()}<code>&lt;InvalidState&gt;</code>{m.invalid_when_2()}<code>&lt;FormField&gt;</code>{m.invalid_when_3()}
</p>

<h3>{m.sec_why()}</h3>
<ul>
  <li><strong>{m.invalid_why_a11y()}</strong>{m.invalid_why_a11y_1()}<code>role="alert"</code>{m.invalid_why_a11y_2()}</li>
  <li><strong>{m.invalid_why_consistency()}</strong>{m.invalid_why_consistency_desc()}</li>
  <li><strong>{m.invalid_why_visibility()}</strong>{m.invalid_why_visibility_desc()}</li>
</ul>

<h2>{m.sec_responsiveness()}</h2>
<ul>
  <li>{m.invalid_responsive()}</li>
</ul>

<h2>{m.sec_customization()}</h2>
<ul>
  <li>{m.invalid_custom_1_1()}<code>message</code>{m.invalid_custom_1_2()}</li>
  <li>{m.invalid_custom_2_1()}<code>showIcon={false}</code>{m.invalid_custom_2_2()}</li>
  <li>{m.invalid_custom_3_1()}<code>icon</code>{m.invalid_custom_3_2()}</li>
</ul>

<h2>{m.sec_examples()}</h2>

<h3>{m.invalid_ex_basic()}</h3>
<ExampleTabs code={`<InvalidState message="This field is required" />`}>
  <div class="max-w-md" data-testid="invalidstate-basic-usage">
    <InvalidState message="This field is required" />
  </div>
</ExampleTabs>

<h3>{m.invalid_ex_formfield()}</h3>
<ExampleTabs code={`<FormField label="Email">
  <TextInput type="email" name="email" />
  <InvalidState message="Please enter a valid email address" />
</FormField>`}>
  <div class="max-w-md" data-testid="invalidstate-formfield">
    <FormField label="Email">
      <TextInput type="email" name="email" />
      <InvalidState message="Please enter a valid email address" />
    </FormField>
  </div>
</ExampleTabs>

<h3>{m.invalid_ex_multiple()}</h3>
<ExampleTabs code={`<div class="flex flex-col gap-1">
  <InvalidState message="Password must be at least 8 characters" />
  <InvalidState message="Password must include a number" />
  <InvalidState message="Password must include a special character" />
</div>`}>
  <div class="max-w-md flex flex-col gap-1" data-testid="invalidstate-multiple">
    <InvalidState message="Password must be at least 8 characters" />
    <InvalidState message="Password must include a number" />
    <InvalidState message="Password must include a special character" />
  </div>
</ExampleTabs>

  <h3>{m.invalid_ex_noicon()}</h3>
  <ExampleTabs code={`<InvalidState message="This field is required" showIcon={false} />`}>
    <div class="max-w-md" data-testid="invalidstate-no-icon">
      <InvalidState message="This field is required" showIcon={false} />
    </div>
  </ExampleTabs>

  <h3>{m.invalid_ex_children()}</h3>
  <ExampleTabs code={`<InvalidState><strong>required</strong> — please fill in this field</InvalidState>`}>
    <div class="max-w-md" data-testid="invalidstate-children">
      <InvalidState><strong>{m.invalid_children_required()}</strong>{m.invalid_children_rest()}</InvalidState>
    </div>
  </ExampleTabs>

<h2>{m.sec_props()}</h2>
<PropsTable component={InvalidStateModule} />

<h2>{m.sec_accessibility()}</h2>
<ul>
  <li><code>role="alert"</code>{m.invalid_a11y_1_2()}</li>
  <li><code>aria-live="assertive"</code>{m.invalid_a11y_2_2()}</li>
  <li>{m.invalid_a11y_3()}</li>
  <li>{m.invalid_a11y_4()}</li>
</ul>
</Container>

<!--
@component
TextInput documentation page — standardized structure
-->
<script lang="ts">
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import { docsIcon } from "../../../componentIcons"
import Icon from "$lib/components/Icon/Icon.svelte"
import Container from "$lib/components/Container/Container.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import TextInput from "$lib/components/Form/TextInput.svelte"
import * as TextInputModule from "$lib/components/Form/TextInput.svelte"
import { m } from "$lib/paraglide/messages.js"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <div class="flex flex-wrap items-center gap-3">
  <Icon name={docsIcon("TextInput")} class="h-8 w-8 shrink-0 text-primary" aria-hidden="true" />
    <h1>{m.ti_heading()}</h1>
  </div>

  <p>
    <strong>{m.ti_heading()}</strong>{m.ti_intro_1()}<code>&lt;input&gt;</code>{m.ti_intro_2()}
  </p>

  <h2>{m.sec_what_when_why()}</h2>

  <h3>{m.sec_what()}</h3>
  <p>
    {m.ti_what_1()}<code>&lt;input&gt;</code>{m.ti_what_2()}
  </p>

  <h3>{m.sec_when()}</h3>
  <p>
    {m.ti_when_1()}<code>&lt;TextInput&gt;</code>{m.ti_when_2()}<code>&lt;Input&gt;</code>{m.ti_when_3()}<code>&lt;Textarea&gt;</code>{m.ti_when_4()}
  </p>

  <h3>{m.sec_why()}</h3>
  <ul>
    <li><strong>{m.ti_why_simplicity()}</strong>{m.ti_why_simplicity_desc()}</li>
    <li><strong>{m.ti_why_icons()}</strong>{m.ti_why_icons_desc()}</li>
    <li><strong>{m.ti_why_clearable()}</strong>{m.ti_why_clearable_desc()}</li>
  </ul>

  <h2>{m.sec_responsiveness()}</h2>
  <ul>
    <li>{m.ti_responsive_1()}</li>
    <li>{m.ti_responsive_2()}</li>
  </ul>

  <h2>{m.sec_customization()}</h2>
  <ul>
    <li>{m.ti_custom_1_1()}<code>&lt;input&gt;</code>{m.ti_custom_1_2()}</li>
    <li>{m.ti_custom_2_1()}<code>sm</code>{m.ti_custom_2_2()}<code>md</code>{m.ti_custom_2_3()}<code>lg</code>{m.ti_custom_2_4()}</li>
    <li>{m.ti_custom_3_1()}<code>startIcon</code>{m.ti_custom_3_2()}<code>endIcon</code>{m.ti_custom_3_3()}</li>
    <li>{m.ti_custom_4_1()}<code>clearable</code>{m.ti_custom_4_2()}</li>
  </ul>

  <h2>{m.sec_examples()}</h2>

  <h3>{m.ti_ex_basic()}</h3>
  <ExampleTabs code={`<TextInput name="username" placeholder="Enter your username" />`}>
    <div class="max-w-md" data-testid="textinput-basic"><TextInput name="username" placeholder="Enter your username" /></div>
  </ExampleTabs>

  <h3>{m.ti_ex_icons()}</h3>
  <ExampleTabs code={`<TextInput name="search" placeholder="Search..." startIcon="tabler:search" />
<TextInput name="password" type="password" placeholder="Password" endIcon="tabler:eye" />`}>
    <div class="max-w-md flex flex-col gap-4" data-testid="textinput-icons">
      <TextInput name="search" placeholder="Search..." />
      <TextInput name="password" type="password" placeholder="Password" />
    </div>
  </ExampleTabs>

  <h3>{m.ti_ex_clearable()}</h3>
  <ExampleTabs code={`<TextInput name="search" placeholder="Type then clear..." clearable />`}>
    <div class="max-w-md" data-testid="textinput-clearable"><TextInput name="search" placeholder="Type then clear..." clearable /></div>
  </ExampleTabs>

  <h3>{m.ti_ex_sizes()}</h3>
  <ExampleTabs code={`<TextInput name="small" size="sm" placeholder="Small" />
<TextInput name="medium" size="md" placeholder="Medium (default)" />
<TextInput name="large" size="lg" placeholder="Large" />`}>
    <div class="max-w-md flex flex-col gap-4" data-testid="textinput-sizes">
      <TextInput name="small" size="sm" placeholder="Small" />
      <TextInput name="medium" size="md" placeholder="Medium (default)" />
      <TextInput name="large" size="lg" placeholder="Large" />
    </div>
  </ExampleTabs>

  <h3>{m.ti_ex_disabled()}</h3>
  <ExampleTabs code={`<TextInput name="disabled" value="Cannot edit" disabled />`}>
    <div class="max-w-md" data-testid="textinput-disabled"><TextInput name="disabled" value="Cannot edit" disabled /></div>
  </ExampleTabs>

  <h3>{m.ti_ex_value()}</h3>
  <ExampleTabs code={`<TextInput value="hello@world.com" />`}>
    <div data-testid="textinput-value">
      <TextInput value="hello@world.com" />
    </div>
  </ExampleTabs>

  <h2>{m.sec_props()}</h2>
  <PropsTable component={TextInputModule} />

  <h2>{m.sec_accessibility()}</h2>
  <ul>
    <li>{m.ti_a11y_1()}<code>&lt;input&gt;</code>{m.ti_a11y_2()}</li>
    <li>{m.ti_a11y_3()}</li>
    <li>{m.ti_a11y_4_1()}<code>aria-label</code>{m.ti_a11y_4_2()}</li>
  </ul>
</Container>

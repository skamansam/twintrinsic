<!--
@component
ListInput documentation page — standardized structure
-->
<script lang="ts">
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import { docsIcon } from "../../../componentIcons"
import Icon from "$lib/components/Icon/Icon.svelte"
import Container from "$lib/components/Container/Container.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import FormField from "$lib/components/Form/FormField.svelte"
import ListInput from "$lib/components/Form/ListInput.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as ListInputModule from "$lib/components/Form/ListInput.svelte"
import { m } from "$lib/paraglide/messages.js"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <div class="flex flex-wrap items-center gap-3">
  <Icon name={docsIcon("ListInput")} class="h-8 w-8 shrink-0 text-primary" aria-hidden="true" />
    <h1>{m.listinput_heading()}</h1>
  </div>

  <p>
    <strong>{m.listinput_heading()}</strong>{m.listinput_lede_1()}
  </p>

  <h2>{m.sec_what_when_why()}</h2>

  <h3>{m.sec_what()}</h3>
  <p>{m.listinput_what_1()}</p>

  <h3>{m.sec_when()}</h3>
  <p>
    {m.listinput_when_1()}<code>&lt;ListInput&gt;</code>{m.listinput_when_2()}<code>&lt;Listbox&gt;</code>{m.listinput_when_3()}
  </p>

  <h3>{m.sec_why()}</h3>
  <ul>
    <li><strong>{m.listinput_why_discrete()}</strong>{m.listinput_why_discrete_1()}</li>
    <li><strong>{m.listinput_why_validation()}</strong>{m.listinput_why_validation_1()}</li>
    <li><strong>{m.listinput_why_keyboard()}</strong>{m.listinput_why_keyboard_1()}</li>
  </ul>

  <h3>{m.sec_sources()}</h3>
  <ul>
    <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/tag/">WAI-ARIA APG — Tag/Chip patterns</a></li>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/list_role">MDN — list role</a></li>
  </ul>

  <h2>{m.sec_implementation()}</h2>
  <ul>
    <li>{m.listinput_impl_1()}</li>
    <li>{m.listinput_impl_2()}</li>
    <li>{m.listinput_impl_3()}</li>
    <li>{m.listinput_impl_4()}</li>
  </ul>

  <h2>{m.sec_mistakes()}</h2>
  <ul>
    <li>{m.listinput_mistake_1()}</li>
    <li>{m.listinput_mistake_2()}</li>
  </ul>

  <h2>{m.sec_related()}</h2>
  <p>{m.listinput_related_1()}</p>

  <h2>{m.sec_responsiveness()}</h2>
  <ul>
    <li>{m.listinput_responsive_1()}</li>
    <li>{m.listinput_responsive_2()}</li>
  </ul>

  <h2>{m.sec_customization()}</h2>
  <ul>
    <li>{m.listinput_custom_1_1()}<code>validator</code>{m.listinput_custom_1_2()}</li>
    <li>{m.listinput_custom_2_1()}<code>errorMessage</code>{m.listinput_custom_2_2()}</li>
    <li>{m.listinput_custom_3_1()}<code>&lt;FormField&gt;</code>{m.listinput_custom_3_2()}</li>
  </ul>

  <h2>{m.sec_examples()}</h2>

  <h3>{m.listinput_ex_basic()}</h3>
  <ExampleTabs code={`<ListInput name="tags" ariaLabel="Add a tag" placeholder="Type and press Enter..." values={['svelte', 'typescript']} />`}>
    <div class="max-w-md" data-testid="list-input-basic">
      <ListInput name="tags" ariaLabel="Add a tag" placeholder="Type and press Enter..." values={["svelte", "typescript"]} />
    </div>
  </ExampleTabs>

  <h3>{m.listinput_ex_validation()}</h3>
  <ExampleTabs code={`<ListInput
  name="emails"
  ariaLabel="Add an email"
  placeholder="Type an email and press Enter..."
  values={['ada@example.com']}
  validator={(value) => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value)}
  errorMessage="Please enter a valid email address"
/>`}>
    <div class="max-w-md" data-testid="list-input-validated">
      <ListInput name="emails" ariaLabel="Add an email" placeholder="Type an email and press Enter..." values={["ada@example.com"]}
        validator={(value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)} errorMessage="Please enter a valid email address" />
    </div>
  </ExampleTabs>

  <h3>{m.listinput_ex_disabled()}</h3>
  <ExampleTabs code={`<ListInput name="readonly" ariaLabel="Readonly tags" values={['locked', 'frozen']} disabled />`}>
    <div class="max-w-md" data-testid="list-input-disabled">
      <ListInput name="readonly" ariaLabel="Readonly tags" values={["locked", "frozen"]} disabled />
    </div>
  </ExampleTabs>

  <h3>{m.listinput_ex_formfield()}</h3>
  <ExampleTabs code={`<FormField label="Tags">
  <ListInput name="tags" placeholder="Add a tag" />
</FormField>`}>
    <div data-testid="list-input-formfield">
      <FormField label="Tags">
        <ListInput name="tags" placeholder="Add a tag" />
      </FormField>
    </div>
  </ExampleTabs>

  <h2>{m.sec_props()}</h2>
  <PropsTable component={ListInputModule} />

  <h2>{m.sec_events()}</h2>
  <EventsTable component={ListInputModule} />

  <h2>{m.sec_accessibility()}</h2>
  <ul>
    <li>{m.listinput_a11y_1_1()}<code>role="button"</code>{m.listinput_a11y_1_2()}<code>aria-label</code>{m.listinput_a11y_1_3()}</li>
    <li>{m.listinput_a11y_2_1()}<code>ariaLabel</code>{m.listinput_a11y_2_2()}</li>
    <li>{m.listinput_a11y_3_1()}<code>role="alert"</code>{m.listinput_a11y_3_2()}</li>
    <li>{m.listinput_a11y_4()}</li>
  </ul>
</Container>

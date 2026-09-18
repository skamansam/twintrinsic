<!--
@component
Combobox documentation page — standardized structure
-->
<script lang="ts">
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import { docsIcon } from "../../../componentIcons"
import Icon from "$lib/components/Icon/Icon.svelte"
import Container from "$lib/components/Container/Container.svelte"
import Combobox from "$lib/components/Form/Combobox.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as ComboboxModule from "$lib/components/Form/Combobox.svelte"
import { m } from "$lib/paraglide/messages.js"

const cities = [
  "New York", "Los Angeles", "Chicago", "Houston", "Phoenix",
  "Philadelphia", "San Antonio", "San Diego",
]

const countries = [
  { name: "United States", code: "US", flag: "🇺🇸" },
  { name: "Canada", code: "CA", flag: "🇨🇦" },
  { name: "United Kingdom", code: "GB", flag: "🇬🇧" },
  { name: "Germany", code: "DE", flag: "🇩🇪" },
  { name: "France", code: "FR", flag: "🇫🇷" },
]
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <div class="flex flex-wrap items-center gap-3">
  <Icon name={docsIcon("Combobox")} class="h-8 w-8 shrink-0 text-primary" aria-hidden="true" />
    <h1>{m.combobox_heading()}</h1>
  </div>

  <p>
    <strong>{m.combobox_heading()}</strong>{m.combobox_lede_1()}<code>popover="auto"</code>{m.combobox_lede_2()}
  </p>

  <h2>{m.sec_what_when_why()}</h2>

  <h3>{m.sec_what()}</h3>
  <p>{m.combobox_what_1()}</p>

  <h3>{m.sec_when()}</h3>
  <p>
    {m.combobox_when_1()}<code>&lt;Combobox&gt;</code>{m.combobox_when_2()}<code>&lt;Select&gt;</code>{m.combobox_when_3()}<code>&lt;Dropdown&gt;</code>{m.combobox_when_4()}
  </p>

  <h3>{m.sec_why()}</h3>
  <ul>
    <li><strong>{m.combobox_why_typeahead()}</strong>{m.combobox_why_typeahead_1()}</li>
    <li><strong>{m.combobox_why_rich()}</strong>{m.combobox_why_rich_1()}</li>
    <li><strong>{m.combobox_why_popover()}</strong>{m.combobox_why_popover_1()}</li>
  </ul>

  <h3>{m.sec_sources()}</h3>
  <ul>
    <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/combobox/">WAI-ARIA APG — Combobox</a></li>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/API/Popover_API">MDN — Popover API</a></li>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning">MDN — CSS Anchor Positioning</a></li>
  </ul>

  <h2>{m.sec_implementation()}</h2>
  <ul>
    <li>{m.combobox_impl_1()}</li>
    <li>{m.combobox_impl_2()}</li>
    <li>{m.combobox_impl_3()}</li>
    <li>{m.combobox_impl_4()}</li>
    <li>{m.combobox_impl_5()}</li>
  </ul>

  <h2>{m.sec_mistakes()}</h2>
  <ul>
    <li>{m.combobox_mistake_1()}</li>
    <li>{m.combobox_mistake_2()}</li>
  </ul>

  <h2>{m.sec_related()}</h2>
  <p>{m.combobox_related_1()}</p>

  <h2>{m.sec_responsiveness()}</h2>
  <ul>
    <li>{m.combobox_responsive_1_1()}<code>anchor-size()</code>{m.combobox_responsive_1_2()}</li>
    <li>{m.combobox_responsive_2()}</li>
    <li>{m.combobox_responsive_3()}</li>
  </ul>

  <h2>{m.sec_customization()}</h2>
  <ul>
    <li>{m.combobox_custom_1_1()}<code>optionTemplate</code>{m.combobox_custom_1_2()}</li>
    <li>{m.combobox_custom_2_1()}<code>optionLabel</code>{m.combobox_custom_2_2()}<code>optionValue</code>{m.combobox_custom_2_3()}</li>
    <li>{m.combobox_custom_3()}</li>
    <li>{m.combobox_custom_4()}</li>
  </ul>

  <h2>{m.sec_examples()}</h2>

  <h3>{m.combobox_ex_basic()}</h3>
  <ExampleTabs code={`<Combobox
  options={['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix']}
  placeholder="Select a city"
/>`}>
    <div class="max-w-md" data-testid="combobox-basic">
      <Combobox options={cities} placeholder="Select a city" />
    </div>
  </ExampleTabs>

  <h3>{m.combobox_ex_object()}</h3>
  <ExampleTabs code={`<Combobox
  options={countries}
  optionLabel="name"
  optionValue="code"
  placeholder="Select a country"
/>`}>
    <div class="max-w-md" data-testid="combobox-object">
      <Combobox options={countries} optionLabel="name" optionValue="code" placeholder="Select a country" />
    </div>
  </ExampleTabs>

  <h3>{m.combobox_ex_template()}</h3>
  <ExampleTabs code={`<Combobox options={countries} optionLabel="name" optionValue="code" placeholder="Select a country">
  {#snippet optionTemplate(option)}
    <div class="flex items-center">
      <span class="mr-2 text-lg">{option.flag}</span>
      <span>{option.name}</span>
      <span class="ml-2 text-xs text-muted">({option.code})</span>
    </div>
  {/snippet}
</Combobox>`}>
    <div class="max-w-md" data-testid="combobox-template">
      <Combobox options={countries} optionLabel="name" optionValue="code" placeholder="Select a country">
        {#snippet optionTemplate(option: { flag: string; name: string; code: string })}
          <div class="flex items-center">
            <span class="mr-2 text-lg">{option.flag}</span>
            <span>{option.name}</span>
            <span class="ml-2 text-xs text-muted">({option.code})</span>
          </div>
        {/snippet}
      </Combobox>
    </div>
  </ExampleTabs>

  <h3>{m.combobox_ex_disabled()}</h3>
  <ExampleTabs code={`<Combobox options={cities} placeholder="Select a city" disabled />`}>
    <div class="max-w-md" data-testid="combobox-disabled">
      <Combobox options={cities} placeholder="Select a city" disabled />
    </div>
  </ExampleTabs>

  <h3>{m.combobox_ex_loading()}</h3>
  <ExampleTabs code={`<Combobox options={[]} placeholder="Loading options..." loading />`}>
    <div class="max-w-md" data-testid="combobox-loading">
      <Combobox options={[]} placeholder="Loading options..." loading />
    </div>
  </ExampleTabs>

  <h2>{m.sec_slots()}</h2>
  <table>
    <thead><tr><th>{m.sec_slot()}</th><th>{m.sec_props()}</th><th>{m.sec_description()}</th></tr></thead>
    <tbody>
      <tr><td><code>optionTemplate</code></td><td><code>{'{ option }'}</code></td><td>{m.combobox_slots_1_1()}</td></tr>
    </tbody>
  </table>

  <h3>{m.combobox_ex_initial()}</h3>
  <ExampleTabs code={`<Combobox options={[...]} value="apple" />`}>
    <div class="max-w-md" data-testid="combobox-initial">
      <Combobox options={[{value: "apple", label: "Apple"}, {value: "banana", label: "Banana"}, {value: "cherry", label: "Cherry"}]} value="apple" />
    </div>
  </ExampleTabs>

  <h2>{m.combobox_vs_heading()}</h2>
<table>
  <thead>
    <tr><th>{m.combobox_vs_feature()}</th><th>Select</th><th>Combobox</th></tr>
  </thead>
  <tbody>
    <tr><td>{m.combobox_vs_types()}</td><td>{m.combobox_vs_no()}</td><td>{m.combobox_vs_yes()}</td></tr>
    <tr><td>{m.combobox_vs_editable()}</td><td>{m.combobox_vs_no()}</td><td>{m.combobox_vs_yes()}</td></tr>
    <tr><td>{m.combobox_vs_native()}</td><td>{@html m.combobox_vs_native_select()}</td><td>{@html m.combobox_vs_native_combo()}</td></tr>
    <tr><td>{m.combobox_vs_best()}</td><td>{m.combobox_vs_best_select()}</td><td>{m.combobox_vs_best_combo()}</td></tr>
    <tr><td>{m.combobox_vs_templates()}</td><td>{m.combobox_vs_templates_select()}</td><td>{m.combobox_vs_templates_combo()}</td></tr>
    <tr><td>{m.combobox_vs_async()}</td><td>{m.combobox_vs_no()}</td><td>{m.combobox_vs_yes()}</td></tr>
  </tbody>
</table>
<p>
  <strong>{m.combobox_vs_rule_label()}</strong>
  {m.combobox_vs_rule_1()}<code>&lt;Combobox&gt;</code>{m.combobox_vs_rule_2()}<code>&lt;Select&gt;</code>{m.combobox_vs_rule_3()}<code>&lt;Dropdown&gt;</code>{m.combobox_vs_rule_4()}
</p>

<h2>{m.sec_props()}</h2>
  <PropsTable component={ComboboxModule} />

  <h2>{m.sec_events()}</h2>
  <EventsTable component={ComboboxModule} />

  <h2>{m.sec_accessibility()}</h2>
  <ul>
    <li>{m.combobox_a11y_1_1()}<code>role="combobox"</code>{m.combobox_a11y_1_2()}<code>role="listbox"</code>{m.combobox_a11y_1_3()}<code>role="option"</code>{m.combobox_a11y_1_4()}</li>
    <li>{m.combobox_a11y_2_1()}<code>aria-expanded</code>{m.combobox_a11y_2_2()}<code>aria-controls</code>{m.combobox_a11y_2_3()}<code>aria-activedescendant</code>{m.combobox_a11y_2_4()}<code>aria-selected</code>{m.combobox_a11y_2_5()}</li>
    <li>{m.combobox_a11y_3()}</li>
  </ul>

  <h2>{m.sec_keyboard()}</h2>
  <table>
    <thead><tr><th>{m.sec_key()}</th><th>{m.sec_function()}</th></tr></thead>
    <tbody>
      <tr><td><kbd>Arrow Down</kbd></td><td>{m.combobox_kb_down()}</td></tr>
      <tr><td><kbd>Arrow Up</kbd></td><td>{m.combobox_kb_up()}</td></tr>
      <tr><td><kbd>Enter</kbd></td><td>{m.combobox_kb_enter()}</td></tr>
      <tr><td><kbd>Escape</kbd></td><td>{m.combobox_kb_escape()}</td></tr>
      <tr><td><kbd>Type</kbd></td><td>{m.combobox_kb_type()}</td></tr>
    </tbody>
  </table>
</Container>

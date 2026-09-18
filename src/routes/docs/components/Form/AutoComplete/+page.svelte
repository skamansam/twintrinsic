<!--
@component
AutoComplete documentation page — standardized structure
-->
<script lang="ts">
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import { docsIcon } from "../../../componentIcons"
import Icon from "$lib/components/Icon/Icon.svelte"
import AutoComplete from "$lib/components/Form/AutoComplete.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as AutoCompleteModule from "$lib/components/Form/AutoComplete.svelte"
import Container from "$lib/components/Container/Container.svelte"
import { m } from "$lib/paraglide/messages.js"

const countries = [
  { label: "United States", value: "US" },
  { label: "United Kingdom", value: "UK" },
  { label: "Canada", value: "CA" },
  { label: "Australia", value: "AU" },
  { label: "Germany", value: "DE" },
]

const users = [
  { label: "Sarah Chen", value: "1", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=faces" },
  { label: "Marcus Webb", value: "2", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=faces" },
  { label: "Priya Patel", value: "3", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=faces" },
]

/** Renders an avatar row for the custom template example */
function renderAvatar(item: (typeof users)[number]): string {
  return (
    `<span class="flex items-center gap-2">` +
    `<img src="${item.avatar}" width="28" height="28" class="rounded-full" />` +
    `<span>${item.label}</span></span>`
  )
}
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
<div class="flex flex-wrap items-center gap-3">
  <Icon name={docsIcon("AutoComplete")} class="h-8 w-8 shrink-0 text-primary" aria-hidden="true" />
  <h1>{m.autocomplete_heading()}</h1>
</div>

<p>
  <strong>{m.autocomplete_heading()}</strong>{m.autocomplete_lede_1()}<code>popover="auto"</code>{m.autocomplete_lede_2()}
</p>

<h2>{m.sec_what_when_why()}</h2>

<h3>{m.sec_what()}</h3>
<p>{m.autocomplete_what_1()}</p>

<h3>{m.sec_when()}</h3>
<p>
  {m.autocomplete_when_1()}<code>&lt;AutoComplete&gt;</code>{m.autocomplete_when_2()}<code>&lt;Combobox&gt;</code>{m.autocomplete_when_3()}<code>&lt;Select&gt;</code>{m.autocomplete_when_4()}
</p>

<h3>{m.sec_why()}</h3>
<ul>
  <li><strong>{m.autocomplete_why_speed()}</strong>{m.autocomplete_why_speed_1()}</li>
  <li><strong>{m.autocomplete_why_rich()}</strong>{m.autocomplete_why_rich_1()}</li>
  <li><strong>{m.autocomplete_why_popover()}</strong>{m.autocomplete_why_popover_1()}</li>
</ul>

<h3>{m.sec_sources()}</h3>
<ul>
  <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/combobox/">WAI-ARIA APG — Combobox</a></li>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/API/Popover_API">MDN — Popover API</a></li>
</ul>

<h2>{m.sec_implementation()}</h2>
<ul>
    <li>{m.autocomplete_impl_1()}</li>
    <li>{m.autocomplete_impl_2()}</li>
    <li>{m.autocomplete_impl_3()}</li>
    <li>{m.autocomplete_impl_4()}</li>
    <li>{m.autocomplete_impl_5()}</li>
</ul>

<h2>{m.sec_mistakes()}</h2>
<ul>
    <li>{m.autocomplete_mistake_1()}</li>
    <li>{m.autocomplete_mistake_2_1()}<code>multiple=&#123;true&#125;</code>{m.autocomplete_mistake_2_2()}</li>
</ul>

<h2>{m.sec_related()}</h2>
<p>{m.autocomplete_related_1()}</p>

<h2>{m.sec_responsiveness()}</h2>
<ul>
  <li>{m.autocomplete_responsive_1()}</li>
  <li>{m.autocomplete_responsive_2()}</li>
</ul>

<h2>{m.sec_customization()}</h2>
<ul>
  <li>{m.autocomplete_custom_1_1()}<code>itemTemplate</code>{m.autocomplete_custom_1_2()}</li>
  <li>{m.autocomplete_custom_2()}</li>
  <li>{m.autocomplete_custom_3()}</li>
</ul>

<h2>{m.sec_examples()}</h2>

<h3>{m.autocomplete_ex_basic()}</h3>
<ExampleTabs code={`<AutoComplete label="Country" items={countries} placeholder="Select a country" />`}>
  <div class="max-w-md" data-testid="autocomplete-basic">
    <AutoComplete label="Country" items={countries} placeholder="Select a country" />
  </div>
</ExampleTabs>

<h3>{m.autocomplete_ex_multiple()}</h3>
<ExampleTabs code={`<AutoComplete label="Countries" items={countries} multiple={true} placeholder="Select countries" />`}>
  <div class="max-w-md" data-testid="autocomplete-multiple">
    <AutoComplete label="Countries" items={countries} multiple={true} placeholder="Select countries" />
  </div>
</ExampleTabs>

  <h3>{m.autocomplete_ex_chip()}</h3>
  <p>{m.autocomplete_ex_chip_intro_1()}<code>chipPlacement="top"</code>{m.autocomplete_ex_chip_intro_2()}</p>
  <ExampleTabs code={`<AutoComplete label="Tags" items={countries} multiple={true} chipPlacement="top" placeholder="Select tags" />`}>
    <div class="max-w-md" data-testid="autocomplete-chip-top">
      <AutoComplete label="Tags" items={countries} multiple={true} chipPlacement="top" placeholder="Select tags" />
    </div>
  </ExampleTabs>

  <h3>{m.autocomplete_ex_template()}</h3>
  <ExampleTabs code={"<AutoComplete label=\"Team Member\" items={users} placeholder=\"Search by name...\" itemTemplate={renderAvatar} />"}>
    <div class="max-w-md" data-testid="autocomplete-custom-template">
      <AutoComplete
        label="Team Member"
        items={users}
        placeholder="Search by name..."
        itemTemplate={renderAvatar}
      />
    </div>
  </ExampleTabs>

<h2>{m.sec_props()}</h2>
<PropsTable component={AutoCompleteModule} />

<h2>{m.sec_events()}</h2>
<EventsTable component={AutoCompleteModule} />

<h2>{m.sec_accessibility()}</h2>
<ul>
  <li>{m.autocomplete_a11y_1()}</li>
  <li>{m.autocomplete_a11y_2()}</li>
  <li>{m.autocomplete_a11y_3()}</li>
</ul>

<h2>{m.sec_keyboard()}</h2>
<table>
  <thead><tr><th>{m.sec_key()}</th><th>{m.sec_function()}</th></tr></thead>
  <tbody>
    <tr><td><kbd>Arrow Down</kbd></td><td>{m.autocomplete_kb_down()}</td></tr>
    <tr><td><kbd>Arrow Up</kbd></td><td>{m.autocomplete_kb_up()}</td></tr>
    <tr><td><kbd>Enter</kbd></td><td>{m.autocomplete_kb_enter()}</td></tr>
    <tr><td><kbd>Escape</kbd></td><td>{m.autocomplete_kb_escape()}</td></tr>
  </tbody>
</table>
</Container>

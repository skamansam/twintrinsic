<script lang="ts">
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
import Container from "$lib/components/Container/Container.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import Input from "$lib/components/Form/Input.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as InputModule from "$lib/components/Form/Input.svelte"
import { m } from "$lib/paraglide/messages.js"

const propsData = {
  component: {
    type: "{ propsMetadata?: PropMetadata[] }",
    description: "Component module (namespace import) whose `propsMetadata` export to derive events from",
    optional: true,
  },
  data: {
    type: "EventDataHash",
    description: "Explicit hash of event name → descriptor (fallback when `component` has none)",
    optional: true,
  },
}
</script>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>{m.events_heading()}</h1>

  <p>
    {m.events_lede_1()}<code>PropsTable</code>{m.events_lede_2()}<code>propsMetadata</code>{m.events_lede_3()}<code>CustomEvent</code>{m.events_lede_4()}<code>data</code>{m.events_lede_5()}
  </p>

  <h2>{m.events_usage()}</h2>

  <h3>{m.events_auto_1()}<code>on*</code>{m.events_auto_2()}<code>CustomEvent</code>{m.events_auto_3()}</h3>

  <div class="not-prose" data-testid="eventstable-auto">
    <EventsTable component={InputModule} />
  </div>

  <CodeBlock language="svelte">{`\u003Cscript>
  import * as Input from "twintrinsic/components/Input"
  import EventsTable from "twintrinsic/components/EventsTable"
\u003C/script>

<EventsTable component={Input} />`}</CodeBlock>

  <h3>{m.events_explicit_1()}<code>propsMetadata</code>{m.events_explicit_2()}<code>data</code>{m.events_explicit_3()}<code>on</code>{m.events_explicit_4()}</h3>

  <div class="not-prose" data-testid="eventstable-explicit">
    <EventsTable
      data={{
        change: { type: "{ value: string }", description: "Fired when the value changes" },
      }}
    />
  </div>

  <CodeBlock language="svelte">{`<EventsTable
  data={{
    change: { type: "{ value: string }", description: "Fired when the value changes" },
  }}
/>`}</CodeBlock>

  <h2>{m.sec_implementation()}</h2>
<ul>
    <li>{m.events_impl_1()}</li>
    <li>{m.events_impl_2()}</li>
    <li>{m.events_impl_3()}</li>
    <li>{m.events_impl_4()}</li>
</ul>

<h2>{m.sec_mistakes()}</h2>
<ul>
    <li>{m.events_mistake_1()}</li>
    <li>{m.events_mistake_2()}</li>
</ul>

<h2>{m.sec_related()}</h2>
<p>{m.events_related_1()}</p>  <h2>{m.sec_props()}</h2>
  <PropsTable data={propsData} />

  <h2>{m.sec_accessibility()}</h2>
  <ul>
    <li>{m.events_a11y_1()}<code>&lt;table&gt;</code>{m.events_a11y_2()}</li>
    <li>{m.events_a11y_3()}<code>on*</code>{m.events_a11y_4()}</li>
    <li>{m.events_a11y_5()}</li>
  </ul>
</Container>

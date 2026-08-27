<script lang="ts">
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
import Container from "$lib/components/Container/Container.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import Input from "$lib/components/Form/Input.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as InputModule from "$lib/components/Form/Input.svelte"

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
  <h1>EventsTable</h1>

  <p>
    A utility component that renders a component's events (Svelte 5 callback
    props) as a documentation table. Like <code>PropsTable</code>, it reads the
    events directly from a component module's <code>propsMetadata</code> export
    (keeping the entries that dispatch a <code>CustomEvent</code>), or renders a
    <code>data</code> hash as a fallback.
  </p>

  <h2>Usage</h2>

  <h3>Auto-derived events</h3>
  <p>
    Pass the component module to list its <code>on*</code> callback props that
    dispatch a <code>CustomEvent</code>:
  </p>

  <div class="not-prose" data-testid="eventstable-auto">
    <EventsTable component={InputModule} />
  </div>

  <CodeBlock language="svelte">{`\u003Cscript>
  import * as Input from "twintrinsic/components/Input"
  import EventsTable from "twintrinsic/components/EventsTable"
\u003C/script>

<EventsTable component={Input} />`}</CodeBlock>

  <h3>Explicit data hash</h3>
  <p>
    When a component doesn't export <code>propsMetadata</code>, pass a plain
    <code>data</code> hash of event name → descriptor (names are written without
    the <code>on</code> prefix):
  </p>

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

  
<h2>Twintrinsic Implementation</h2>
<ul>
    <li>Native `&lt;table&gt;` with `&lt;th scope=&quot;col&quot;&gt;` for headers</li>
    <li>Auto-generated from TypeScript types via `propsMetadata`</li>
    <li>`&lt;caption&gt;` for table title</li>
    <li>`content-visibility: auto` for large tables</li>
</ul>

<h2>Common Mistakes</h2>
<ul>
    <li>Don't use `&lt;div&gt;` — always `&lt;table&gt;` for semantic data display</li>
    <li>Don't forget `&lt;th scope=&quot;col&quot;&gt;` for column header associations</li>
</ul>

<h2>Related Components</h2>
<p>DataTable, CompatibilityMatrix</p>

<h2>Props</h2>
  <PropsTable data={propsData} />

  <h2>Accessibility</h2>
  <ul>
    <li>Uses a semantic <code>&lt;table&gt;</code> with header cells for each column</li>
    <li>Event names are rendered as their <code>on*</code> callback prop form</li>
    <li>The table scrolls horizontally on narrow viewports instead of overflowing</li>
  </ul>
</Container>

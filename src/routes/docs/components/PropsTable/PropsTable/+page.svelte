<script lang="ts">
import Button from "$lib/components/Button/Button.svelte"
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
import Container from "$lib/components/Container/Container.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as ButtonModule from "$lib/components/Button/Button.svelte"

const propsData = {
  component: {
    type: "{ propsMetadata?: PropMetadata[] }",
    description: "Component module (namespace import) whose `propsMetadata` export to render",
    optional: true,
  },
  data: {
    type: "PropDataHash",
    description: "Explicit hash of prop name → descriptor (fallback when `component` has none)",
    optional: true,
  },
}
</script>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>PropsTable</h1>

  <p>
    A utility component that renders a component's props as a documentation
    table. It reads the props directly from a component module that exports
    <code>propsMetadata</code>, or renders a <code>data</code> hash as a
    fallback. If neither is available, it logs a <code>console.warn</code>.
  </p>

  <h2>Usage</h2>

  <h3>Auto-derived props</h3>
  <p>
    Pass the component module (namespace import) to render its
    <code>propsMetadata</code> export:
  </p>

  <div class="not-prose" data-testid="propstable-auto">
    <PropsTable component={ButtonModule} />
  </div>

  <CodeBlock language="svelte">{`\u003Cscript>
  import * as Button from "twintrinsic/components/Button"
  import PropsTable from "twintrinsic/components/PropsTable"
\u003C/script>

<PropsTable component={Button} />`}</CodeBlock>

  <h3>Explicit data hash</h3>
  <p>
    When a component doesn't export <code>propsMetadata</code>, pass a plain
    <code>data</code> hash of prop name → descriptor:
  </p>

  <div class="not-prose" data-testid="propstable-explicit">
    <PropsTable
      data={{
        value: { type: "string", description: "Current value" },
        disabled: { type: "boolean", default: "false", optional: true, description: "Whether disabled" },
      }}
    />
  </div>

  <CodeBlock language="svelte">{`<PropsTable
  data={{
    value: { type: "string", description: "Current value" },
    disabled: { type: "boolean", default: "false", optional: true, description: "Whether disabled" },
  }}
/>`}</CodeBlock>

  <h2>Props</h2>
  <PropsTable data={propsData} />

  <h2>Accessibility</h2>
  <ul>
    <li>Uses a semantic <code>&lt;table&gt;</code> with header cells for each column</li>
    <li>Prop names and types are rendered in <code>&lt;code&gt;</code> for clarity</li>
    <li>The table scrolls horizontally on narrow viewports instead of overflowing</li>
  </ul>
</Container>

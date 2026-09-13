<script lang="ts">
import Button from "$lib/components/Button/Button.svelte"
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
import Container from "$lib/components/Container/Container.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as ButtonModule from "$lib/components/Button/Button.svelte"
import { m } from "$lib/paraglide/messages.js"

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
  <h1>{m.pt_heading()}</h1>

  <p>
    {m.pt_lede_1()}<code>propsMetadata</code>{m.pt_lede_2()}<code>data</code>{m.pt_lede_3()}<code>console.warn</code>{m.pt_lede_4()}
  </p>

  <h2>{m.pt_usage()}</h2>

  <h3>{m.pt_usage_auto_h()}</h3>
  <p>
    {m.pt_usage_auto_1()}<code>propsMetadata</code>{m.pt_usage_auto_2()}
  </p>

  <div class="not-prose" data-testid="propstable-auto">
    <PropsTable component={ButtonModule} />
  </div>

  <CodeBlock language="svelte">{`\u003Cscript>
  import * as Button from "twintrinsic/components/Button"
  import PropsTable from "twintrinsic/components/PropsTable"
\u003C/script>

<PropsTable component={Button} />`}</CodeBlock>

  <h3>{m.pt_usage_explicit_h()}</h3>
  <p>
    {m.pt_usage_explicit_1()}<code>propsMetadata</code>{m.pt_usage_explicit_2()}<code>data</code>{m.pt_usage_explicit_3()}
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

  <h2>{m.sec_props()}</h2>
  <PropsTable data={propsData} />

  <h2>{m.sec_accessibility()}</h2>
  <ul>
    <li>{m.pt_a11y_1()}<code>&lt;table&gt;</code>{m.pt_a11y_2()}</li>
    <li>{m.pt_a11y_3()}<code>&lt;code&gt;</code>{m.pt_a11y_4()}</li>
    <li>{m.pt_a11y_5()}</li>
  </ul>
</Container>

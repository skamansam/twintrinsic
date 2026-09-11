<!--
@component
Utilities documentation page — shared helper functions exported from the public barrel.
-->
<script lang="ts">
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
import Container from "$lib/components/Container/Container.svelte"
import Panel from "$lib/components/Panel/Panel.svelte"
import Separator from "$lib/components/Separator/Separator.svelte"
import { m } from "$lib/paraglide/messages.js"
</script>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>{m.link_utilities()}</h1>

  <p>{m.util_intro()}</p>

  <CodeBlock language="typescript">
{`import { getItemLabel, getItemValue, dispatchGroupRemove } from "twintrinsic"`}
  </CodeBlock>

  <p>{m.util_intro2()}</p>

  <Separator>{m.util_label_extraction()}</Separator>

  <h2>getItemLabel</h2>

  <Panel>
    {#snippet header()}
      getItemLabel(item, labelField = "label") → string
    {/snippet}
    <p>{m.util_getitemlabel_body()}</p>
  </Panel>

  <CodeBlock language="svelte">
{`\u003Cscript>
  import { getItemLabel } from "twintrinsic"

  const users = [
    { id: 1, fullName: "Ada Lovelace" },
    { id: 2, fullName: "Grace Hopper" },
  ]
\u003C/script>

<ul>
  {#each users as user}
    <!-- custom labelField resolves: fullName, not "label" -->
    <li>{getItemLabel(user, "fullName")}</li>
  {/each}
</ul>`}
  </CodeBlock>

  <Separator>{m.util_value_extraction()}</Separator>

  <h2>getItemValue</h2>

  <Panel>
    {#snippet header()}
      getItemValue(item, valueField = "value") → unknown
    {/snippet}
    <p>{m.util_getitemvalue_body()}</p>
  </Panel>

  <CodeBlock language="typescript">
{`import { getItemValue } from "twintrinsic"

const selected = [{ id: 7, name: "Seven" }]
const ids = selected.map((item) => getItemValue(item, "id"))
// → [7]`}
  </CodeBlock>

  <Separator>{m.util_group_removal()}</Separator>

  <h2>dispatchGroupRemove</h2>

  <Panel>
    {#snippet header()}
      dispatchGroupRemove(items, index, eventName, handler?)
    {/snippet}
    <p>{m.util_dispatchgroupremove_body()}</p>
  </Panel>

  <CodeBlock language="typescript">
{`import { dispatchGroupRemove } from "twintrinsic"

const items = ["alpha", "beta", "gamma"]

dispatchGroupRemove(items, 1, "remove", (event) => {
  console.log(event.detail) // { item: "beta", index: 1 }
})`}
  </CodeBlock>

  <Separator>{m.util_language_detection()}</Separator>

  <h2>detectLanguage</h2>

  <Panel>
    {#snippet header()}
      detectLanguage(content: string) → string
    {/snippet}
    <p>{m.util_detectlanguage_body()}</p>
  </Panel>

  <CodeBlock language="typescript">
{`import { detectLanguage } from "twintrinsic"

detectLanguage("function greet() { return 'hi' }") // "javascript"
detectLanguage("@media (max-width: 600px) { }")    // "css"
detectLanguage("<div>hello</div>")                  // "markup"
detectLanguage("key: value")                        // "yaml"`}
  </CodeBlock>

  <Separator>{m.util_docs_tables()}</Separator>

  <h2>PropsTable & EventsTable</h2>

  <Panel>
    <p>
      {m.util_propstable_body()}
      <a href="/docs/components/PropsTable/PropsTable">PropsTable</a> {m.util_and()}
      <a href="/docs/components/EventsTable/EventsTable">EventsTable</a>.
    </p>
  </Panel>
</Container>

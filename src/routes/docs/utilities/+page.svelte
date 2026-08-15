<!--
@component
Utilities documentation page — shared helper functions exported from the public barrel.
-->
<script lang="ts">
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
import Container from "$lib/components/Container/Container.svelte"
import Panel from "$lib/components/Panel/Panel.svelte"
import Separator from "$lib/components/Separator/Separator.svelte"
</script>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>Utilities</h1>

  <p>
    Twintrinsic ships a small set of shared helper functions used by the Form
    select family (<code>AutoComplete</code>, <code>Listbox</code>,
    <code>Combobox</code>) and the group components (<code>TagGroup</code>,
    <code>ChipGroup</code>). They are re-exported from the package entry point,
    so you can import them alongside components:
  </p>

  <CodeBlock language="typescript">
{`import { getItemLabel, getItemValue, dispatchGroupRemove } from "twintrinsic"`}
  </CodeBlock>

  <p>
    All helpers accept an item plus an optional <em>field name</em> used to
    derive the label or value when the item is an object. Always pass the field
    name explicitly when your objects use a custom key — the helpers default to
    <code>"label"</code> / <code>"value"</code>.
  </p>

  <Separator>Label Extraction</Separator>

  <h2>getItemLabel</h2>

  <Panel>
    {#snippet header()}
      getItemLabel(item, labelField = "label") → string
    {/snippet}
    <p>
      Derives a display label for an item. Primitives are stringified as-is;
      objects yield <code>item[labelField]</code>, with null/undefined field
      values collapsing to <code>""</code>. This unifies the former
      per-component <code>?.toString() || ""</code> label pattern.
    </p>
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

  <Separator>Value Extraction</Separator>

  <h2>getItemValue</h2>

  <Panel>
    {#snippet header()}
      getItemValue(item, valueField = "value") → unknown
    {/snippet}
    <p>
      Derives a comparison/submission value for an item. Objects yield
      <code>item[valueField]</code>; primitives pass through unchanged. Falsy
      primitives (<code>""</code>, <code>0</code>, <code>false</code>,
      <code>null</code>, <code>undefined</code>) are intentionally <em>not</em>
      collapsed — so a numeric option <code>0</code> survives selection
      comparison.
    </p>
  </Panel>

  <CodeBlock language="typescript">
{`import { getItemValue } from "twintrinsic"

const selected = [{ id: 7, name: "Seven" }]
const ids = selected.map((item) => getItemValue(item, "id"))
// → [7]`}
  </CodeBlock>

  <Separator>Group Removal</Separator>

  <h2>dispatchGroupRemove</h2>

  <Panel>
    {#snippet header()}
      dispatchGroupRemove(items, index, eventName, handler?)
    {/snippet}
    <p>
      Resolves the item at <code>index</code> from the items array and invokes
      the group's remove/dismiss callback with a <code>CustomEvent</code> whose
      detail carries <code>{"{ item, index }"}</code>. Shared by
      <code>TagGroup</code> (<code>"dismiss"</code>) and <code>ChipGroup</code>
      (<code>"remove"</code>).
    </p>
  </Panel>

  <CodeBlock language="typescript">
{`import { dispatchGroupRemove } from "twintrinsic"

const items = ["alpha", "beta", "gamma"]

dispatchGroupRemove(items, 1, "remove", (event) => {
  console.log(event.detail) // { item: "beta", index: 1 }
})`}
  </CodeBlock>

  <Separator>Language Detection</Separator>

  <h2>detectLanguage</h2>

  <Panel>
    {#snippet header()}
      detectLanguage(content: string) → string
    {/snippet}
    <p>
      Heuristically detects a code language from content patterns (HTML, CSS,
      JavaScript/TypeScript, JSON, YAML, Markdown, Svelte, shell). Used by
      <code>CodeBlock</code> when no <code>language</code> prop is provided.
    </p>
  </Panel>

  <CodeBlock language="typescript">
{`import { detectLanguage } from "twintrinsic"

detectLanguage("function greet() { return 'hi' }") // "javascript"
detectLanguage("@media (max-width: 600px) { }")    // "css"
detectLanguage("<div>hello</div>")                  // "markup"
detectLanguage("key: value")                        // "yaml"`}
  </CodeBlock>
</Container>

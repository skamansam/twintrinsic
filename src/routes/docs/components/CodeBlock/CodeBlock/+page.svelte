<!--
@component
CodeBlock documentation page — standardized structure
-->
<script lang="ts">
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
import Container from "$lib/components/Container/Container.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as CodeBlockModule from "$lib/components/CodeBlock/CodeBlock.svelte"
import { m } from "$lib/paraglide/messages.js"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
<h1>{m.codeblock_heading()}</h1>

<p>
  <strong>{m.codeblock_heading()}</strong>{m.codeblock_intro_1()}
</p>

<h2>{m.sec_what_when_why()}</h2>

<h3>{m.sec_what()}</h3>
<p>{m.codeblock_what_1()}</p>

<h3>{m.sec_when()}</h3>
<p>
  {m.codeblock_when_1()}<code>&lt;CodeBlock&gt;</code>{m.codeblock_when_2()}<code>&lt;CodeEditor&gt;</code>{m.codeblock_when_3()}
</p>

<h3>{m.sec_why()}</h3>
<ul>
  <li><strong>{m.codeblock_why_highlight()}</strong>{m.codeblock_why_highlight_desc()}</li>
  <li><strong>{m.codeblock_why_auto()}</strong>{m.codeblock_why_auto_desc()}</li>
  <li><strong>{m.codeblock_why_copy()}</strong>{m.codeblock_why_copy_desc()}</li>
  <li><strong>{m.codeblock_why_plugins()}</strong>{m.codeblock_why_plugins_desc()}</li>
</ul>

<h3>{m.sec_sources()}</h3>
  <ul>
    <li><a href="https://prismjs.com/">Prism.js</a></li>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/code">MDN — &lt;code&gt;</a></li>
    <li><a href="https://primer.style/components/markdown">Primer — Markdown</a></li>
    <li><a href="https://m3.material.io/components/code-blocks">Material Design 3 — Code</a></li>
    <li><a href="https://ant.design/components/typography">Ant Design — Typography</a></li>
  </ul>

  
<h2>{m.sec_implementation()}</h2>
<ul>
  <li><code>&lt;pre&gt;&lt;code&gt;</code>{m.codeblock_impl_1_2()}<code>class=&quot;language-[lang]&quot;</code>{m.codeblock_impl_1_3()}</li>
  <li>{m.codeblock_impl_2()}</li>
  <li>{m.codeblock_impl_3_0()}<code>aria-label=&quot;Copy code&quot;</code></li>
  <li><code>content-visibility: auto</code>{m.codeblock_impl_4_2()}</li>
</ul>

<h2>{m.sec_mistakes()}</h2>
<ul>
  <li>{m.codeblock_mistake_1_0()}<code>&lt;div&gt;</code>{m.codeblock_mistake_1_1()}<code>white-space: pre</code>{m.codeblock_mistake_1_2()}<code>&lt;pre&gt;&lt;code&gt;</code></li>
  <li>{m.codeblock_mistake_2()}</li>
</ul>

<h2>{m.sec_related()}</h2>
<p>{m.codeblock_related_1()}</p>

<h2>{m.sec_responsiveness()}</h2>
  <ul>
    <li>{m.codeblock_responsive_1_0()}<code>overflow-x-auto</code>{m.codeblock_responsive_1_1()}</li>
    <li>{m.codeblock_responsive_2()}</li>
    <li>{m.codeblock_responsive_3()}</li>
  </ul>

  <h2>{m.sec_customization()}</h2>
  <ul>
    <li><code>language</code>{m.codeblock_custom_1_1()}</li>
    <li><code>title</code>{m.codeblock_custom_2_1()}</li>
    <li><code>pluginSource</code>{m.codeblock_custom_3_1()}<code>&quot;unpkg&quot;</code>{m.codeblock_custom_3_2()}<code>&quot;esm.sh&quot;</code>{m.codeblock_custom_3_3()}<code>&quot;jsdelivr&quot;</code>{m.codeblock_custom_3_4()}</li>
    <li><code>plugins</code>{m.codeblock_custom_4_1()}</li>
  </ul>

  <h2>{m.sec_examples()}</h2>

  <h3>{m.codeblock_ex_js()}</h3>
  <ExampleTabs code={`<CodeBlock language="javascript">
  {function greet(name) {
    return \`Hello, \${name}!\`;
  }
  const result = greet('world');
  console.log(result); // Hello, world!}
</CodeBlock>`}>
    <CodeBlock language="javascript">{`function greet(name) {
  return \`Hello, \${name}!\`;
}

const result = greet('world');
console.log(result); // Hello, world!`}</CodeBlock>
  </ExampleTabs>

  <h3>{m.codeblock_ex_ts()}</h3>
  <ExampleTabs code={`<CodeBlock language="ts">
  interface Person {
    name: string;
    age: number;
  }

  function greet(person: Person): string {
    return \`Hello, \${person.name}!\`;
  }
</CodeBlock>`}>
    <CodeBlock language="ts">{`interface Person {
  name: string;
  age: number;
}

function greet(person: Person): string {
  return \`Hello, \${person.name}! You are \${person.age} years old.\`;
}

const person: Person = { name: 'John', age: 30 };
console.log(greet(person));`}</CodeBlock>
  </ExampleTabs>

  <h3>{m.codeblock_ex_svelte()}</h3>
  <ExampleTabs code={`<CodeBlock language="svelte">
  <script>
    let count = $state(0);
    let { onchange } = $props();
  <\\/script>
  <button onclick={increment}>Count: {count}</button>
</CodeBlock>`}>
    <CodeBlock language="svelte">{`<script>
  let count = $state(0);
  let { onchange } = $props();

  function increment() {
    count += 1;
    onchange?.(new CustomEvent('change', \u007B detail: \u007B count \u007D \u007D));
  }
\u003C/script>

<button onclick={increment}>
  Count: \u007Bcount\u007D
</button>

\u003Cstyle lang="postcss">
  button {
    @apply px-4 py-2 bg-primary text-white rounded;
  }
\u003C/style>`}</CodeBlock>
  </ExampleTabs>

  <h3>{m.codeblock_ex_shell()}</h3>
  <ExampleTabs code={`<CodeBlock language="bash">
  npm install
  npm run dev
  npm test
</CodeBlock>`}>
    <CodeBlock language="bash">{`#!/bin/bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm test`}</CodeBlock>
  </ExampleTabs>

  <h3>{m.codeblock_ex_json()}</h3>
  <ExampleTabs code={`<CodeBlock language="json">
  { "name": "my-app", "version": "1.0.0" }
</CodeBlock>`}>
    <CodeBlock language="json">{`{
  "name": "my-app",
  "version": "1.0.0",
  "dependencies": {
    "svelte": "^5.0.0",
    "tailwindcss": "^4.0.0"
  }
}`}</CodeBlock>
  </ExampleTabs>

  <h2>{m.sec_props()}</h2>
  <PropsTable component={CodeBlockModule} />

  <h2>{m.sec_accessibility()}</h2>
  <ul>
    <li>{m.codeblock_a11y_1_0()}<code>aria-label</code>{m.codeblock_a11y_1_1()}</li>
    <li>{m.codeblock_a11y_2_0()}<code>&lt;pre&gt;&lt;code&gt;</code>{m.codeblock_a11y_2_1()}</li>
    <li>{m.codeblock_a11y_3()}</li>
  </ul>

  <h2>{m.sec_keyboard()}</h2>
  <table>
    <thead><tr><th>{m.sec_key()}</th><th>{m.sec_function()}</th></tr></thead>
    <tbody>
      <tr><td><kbd>Tab</kbd></td><td>{m.codeblock_kb_1()}</td></tr>
      <tr><td><kbd>Enter</kbd> / <kbd>Space</kbd></td><td>{m.codeblock_kb_2()}</td></tr>
      <tr><td><kbd>Ctrl</kbd>+<kbd>C</kbd></td><td>{m.codeblock_kb_3()}</td></tr>
    </tbody>
  </table>
</Container>

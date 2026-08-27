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
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>CodeBlock</h1>

  <p>
    <strong>CodeBlock</strong> displays code snippets with syntax highlighting and copy
    functionality. It supports multiple programming languages, auto-detection, and
    Prism.js plugins.
  </p>

  <h2>What, When &amp; Why</h2>

  <h3>What is it?</h3>
  <p>
    A code display component with Prism.js-powered syntax highlighting, automatic language
    detection, a copy-to-clipboard button, and configurable CDN sources. Languages are
    loaded on-demand via the Prism autoloader plugin.
  </p>

  <h3>When should I use it?</h3>
  <p>
    Use <code>&lt;CodeBlock&gt;</code> whenever you need to display code snippets to users:
    documentation, tutorials, blog posts, or developer tools. For code editing, use
    <code>&lt;CodeEditor&gt;</code>.
  </p>

  <h3>Why does it exist?</h3>
  <ul>
    <li><strong>Syntax highlighting</strong> — Prism.js with on-demand grammar loading.</li>
    <li><strong>Auto-detection</strong> — infers language from content when not specified.</li>
    <li><strong>Copy button</strong> — one-click clipboard access.</li>
    <li><strong>Plugin system</strong> — line numbers, toolbar, and more.</li>
  </ul>

  <h3>Sources</h3>
  <ul>
    <li><a href="https://prismjs.com/">Prism.js</a></li>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/code">MDN — &lt;code&gt;</a></li>
    <li><a href="https://primer.style/components/markdown">Primer — Markdown</a></li>
    <li><a href="https://m3.material.io/components/code-blocks">Material Design 3 — Code</a></li>
    <li><a href="https://ant.design/components/typography">Ant Design — Typography</a></li>
  </ul>

  
<h2>Twintrinsic Implementation</h2>
<ul>
    <li>`&lt;pre&gt;&lt;code&gt;` with `class=&quot;language-[lang]&quot;` for semantics</li>
    <li>Prism.js for syntax highlighting</li>
    <li>Copy-to-clipboard button with `aria-label=&quot;Copy code&quot;`</li>
    <li>`content-visibility: auto` for large code blocks</li>
</ul>

<h2>Common Mistakes</h2>
<ul>
    <li>Don't use `&lt;div&gt;` with `white-space: pre` — always `&lt;pre&gt;&lt;code&gt;`</li>
    <li>Don't forget the copy button — developers expect it</li>
</ul>

<h2>Related Components</h2>
<p>CodeEditor, CodeBlockSpeed, Icon</p>

<h2>Responsiveness</h2>
  <ul>
    <li>Horizontal scrolling for long lines via <code>overflow-x-auto</code>.</li>
    <li>Fills container width by default.</li>
    <li>Font size scales appropriately for mobile.</li>
  </ul>

  <h2>Customization</h2>
  <ul>
    <li><code>language</code> — explicit syntax language (or auto-detect).</li>
    <li><code>title</code> — optional title in the code header.</li>
    <li><code>pluginSource</code> — CDN choice: <code>"unpkg"</code>, <code>"esm.sh"</code>, <code>"jsdelivr"</code>, or custom path.</li>
    <li><code>plugins</code> — array of Prism.js plugin names.</li>
  </ul>

  <h2>Examples</h2>

  <h3>JavaScript</h3>
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

  <h3>TypeScript</h3>
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

  <h3>Svelte</h3>
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

  <h3>Shell</h3>
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

  <h3>JSON</h3>
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

  <h2>Props</h2>
  <PropsTable component={CodeBlockModule} />

  <h2>Accessibility</h2>
  <ul>
    <li>Copy button includes <code>aria-label</code> that updates to "Copied!" after copying.</li>
    <li>Code is wrapped in <code>&lt;pre&gt;&lt;code&gt;</code> for proper semantics.</li>
    <li>Focus indicators on the copy button.</li>
  </ul>

  <h2>Keyboard Support</h2>
  <table>
    <thead><tr><th>Key</th><th>Function</th></tr></thead>
    <tbody>
      <tr><td><kbd>Tab</kbd></td><td>Move focus to the copy button</td></tr>
      <tr><td><kbd>Enter</kbd> / <kbd>Space</kbd></td><td>Copy code to clipboard</td></tr>
      <tr><td><kbd>Ctrl</kbd>+<kbd>C</kbd></td><td>Copy selected text (browser native)</td></tr>
    </tbody>
  </table>
</Container>

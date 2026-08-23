<!--
@component
Documentation page for the CodeBlock component.
-->
<script lang="ts">
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as CodeBlockModule from "$lib/components/CodeBlock/CodeBlock.svelte"
import Container from "$lib/components/Container/Container.svelte"
</script>

<Container as="article" class="prose dark:prose-invert max-w-none">
<h1>CodeBlock</h1>

<p>
  The CodeBlock component displays code snippets with syntax highlighting and copy functionality.
  It supports multiple programming languages and can auto-detect the language based on content.
</p>

<h2>Examples</h2>

<h3>Basic Usage</h3>
<CodeBlock>{`\
function greet(name) {
  return \`Hello, \${name}!\`;
}

const result = greet('world');
console.log(result); // Hello, world!
`}</CodeBlock>
<CodeBlock language="svelte">
  {`<CodeBlock>
  function greet(name) {
    return \`Hello, \${name}!\`;
  }

  const result = greet('world');
  console.log(result); // Hello, world!
</CodeBlock>`}
</CodeBlock>

<h3>TypeScript</h3>
<CodeBlock language="ts">{`
  interface Person {
    name: string;
    age: number;
  }

  function greet(person: Person): string {
    return \`Hello, \${person.name}! You are \${person.age} years old.\`;
  }

  const person: Person = {
    name: 'John',
    age: 30
  };

  console.log(greet(person));
`}</CodeBlock>

<h3>Svelte</h3>
<CodeBlock language="svelte">{`
  \u003Cscript>
    let count = $state(0);
    let { onchange } = $props();

    function increment() {
      count += 1;
      onchange?.(new CustomEvent('change', { detail: { count } }));
    }
  \u003C/script>

  <button onclick={increment}>
    Count: {count}
  </button>

  \u003Cstyle lang="postcss">
    button {
      @apply px-4 py-2 bg-primary text-white rounded;
    }
  \u003C/style>
`}</CodeBlock>

<h3>HTML</h3>
<CodeBlock language="markup">{`
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Hello World</title>
  </head>
  <body>
    <h1>Hello, world!</h1>
    <p>This is a paragraph.</p>
  </body>
  </html>
`}`</CodeBlock>

<h3>CSS</h3>
<CodeBlock language="css">{`
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    margin: 0 auto;
    max-width: 1200px;
  }

  @media (max-width: 768px) {
    .container {
      flex-direction: column;
      padding: 0.5rem;
    }
  }
`}</CodeBlock>

<h3>JSON</h3>
<CodeBlock language="json">{`
  {
    "name": "my-app",
    "version": "1.0.0",
    "dependencies": {
      "svelte": "^5.0.0",
      "tailwindcss": "^4.0.0"
    },
    "scripts": {
      "dev": "vite",
      "build": "vite build",
      "test": "playwright test"
    }
  }
`}</CodeBlock>

<h3>Shell</h3>
<CodeBlock language="bash">
  #!/bin/bash
  # Install dependencies
  npm install

  # Run development server
  npm run dev

  # Run tests
  npm test
</CodeBlock>

<h3>Custom CDN</h3>
<CodeBlock language="javascript" pluginSource="esm.sh">{`
const message = 'Using esm.sh CDN for language components';
console.log(message);
`}</CodeBlock>

<h3>With Plugins</h3>
<CodeBlock language="javascript" plugins={["line-numbers"]}>{`
function example() {
  console.log('Line numbers plugin loaded');
  return true;
}
`}</CodeBlock>

<CodeBlock language="javascript" plugins={["line-numbers", "toolbar", "show-language"]}>{`
function example() {
  console.log('Line numbers and language plugins loaded');
  return true;
}
`}</CodeBlock>

<h2>Props</h2>
<PropsTable component={CodeBlockModule} />

<h2>Supported Languages</h2>
<p>
  The CodeBlock component supports syntax highlighting for the following languages:
</p>
<ul>
  <li>JavaScript</li>
  <li>TypeScript</li>
  <li>JSX/TSX</li>
  <li>CSS/SCSS</li>
  <li>HTML/XML</li>
  <li>Shell/Bash</li>
  <li>JSON</li>
  <li>YAML</li>
  <li>Markdown</li>
  <li>Svelte</li>
</ul>

<h2>Features</h2>
<ul>
  <li>Syntax highlighting using Prism.js</li>
  <li>Copy to clipboard functionality</li>
  <li>Language auto-detection</li>
  <li>Dark mode support</li>
  <li>Accessible copy button</li>
  <li>Responsive design</li>
</ul>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>
</Container>

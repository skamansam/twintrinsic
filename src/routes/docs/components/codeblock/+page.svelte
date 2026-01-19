<!--
@component
Documentation page for the CodeBlock component.
-->
<script lang="ts">
import { PropsTable } from "$lib/docs/index.js"
import { CodeBlock } from "$lib/index.js"
</script>

<h1>CodeBlock</h1>

<p>
  The CodeBlock component displays code snippets with syntax highlighting and copy functionality.
  It supports multiple programming languages and can auto-detect the language based on content.
</p>

<h2>Examples</h2>

<h3>Basic Usage</h3>
<CodeBlock>{`
  function greet(name) {
    return \`Hello, \${name}!\`;
  }

  const result = greet('world');
  console.log(result); // Hello, world!
`}</CodeBlock>
<CodeBlock>
  {`<CodeBlock>
  function greet(name) {
    return \`Hello, \${name}!\`;
  }

  const result = greet('world');
  console.log(result); // Hello, world!
</CodeBlock>`}
</CodeBlock>

<h3>TypeScript</h3>
<CodeBlock language="typescript">{`
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
  <script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    const { count = 0 } = $props();
    
    function increment() {
      dispatch('change', { count: count + 1 });
    }
  </script>

  <button onclick={increment}>
    Count: {count}
  </button>

  <style lang="postcss">
    button {
      @apply px-4 py-2 bg-primary text-white rounded;
    }
  </style>
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

<h2>Props</h2>
<PropsTable
  props={[
    {
      name: 'language',
      type: 'string',
      default: "''",
      description: 'Programming language for syntax highlighting. If not provided, will attempt to auto-detect.'
    },
    {
      name: 'class',
      type: 'string',
      default: "''",
      description: 'Additional CSS classes'
    }
  ]}
/>

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

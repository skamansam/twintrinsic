<script module>
import { defineMeta } from "@storybook/addon-svelte-csf"
import { expect } from "storybook/test"
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"

const { Story } = defineMeta({
  title: "Data Display/CodeBlock",
  component: CodeBlock,
  tags: ["autodocs"],
  argTypes: {
    language: {
      control: "select",
      options: ["", "javascript", "typescript", "jsx", "tsx", "css", "scss", "markup", "bash", "json", "yaml", "markdown", "svelte"],
    },
  },
})
</script>

<Story
  name="JavaScript"
  args={{ language: "javascript" }}
>
{`function greet(name) {
  return \`Hello, \${name}!\`;
}

const result = greet('world');
console.log(result); // Hello, world!`}
</Story>

<Story name="TypeScript" args={{ language: "typescript" }}>
{`interface Person {
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

console.log(greet(person));`}
</Story>

<Story name="Svelte" args={{ language: "svelte" }}>
{`<script>
  let count = $state(0);
  let { onchange } = $props();
</script>

<button onclick={() => count += 1}>
  Count: {count}
</button>`}
</Story>

<Story name="HTML" args={{ language: "markup" }}>
{`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Hello World</title>
</head>
<body>
  <h1>Hello, world!</h1>
  <p>This is a paragraph.</p>
</body>
</html>`}
</Story>

<Story name="CSS" args={{ language: "css" }}>
{`.container {
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
}`}
</Story>

<Story name="JSON" args={{ language: "json" }}>
{`{
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
}`}
</Story>

<Story name="Shell" args={{ language: "bash" }}>
{`#!/bin/bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm test`}
</Story>

<Story name="Auto Detect" args={{ language: "" }}>
{`// Language will be auto-detected as JavaScript
function add(a, b) {
  return a + b;
}

console.log(add(1, 2)); // 3`}
</Story>

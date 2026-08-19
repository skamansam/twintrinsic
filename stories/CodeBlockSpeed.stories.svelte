<script module>
import { defineMeta } from "@storybook/addon-svelte-csf"
import CodeBlockSpeed from "$lib/components/CodeBlockSpeed/CodeBlockSpeed.svelte"

const { Story } = defineMeta({
  title: "Data Display/CodeBlockSpeed",
  component: CodeBlockSpeed,
  tags: ["autodocs"],
  argTypes: {
    language: {
      control: "select",
      options: ["", "js", "ts", "jsx", "tsx", "python", "html", "css", "scss", "json", "yaml", "md", "bash", "svelte"],
      description: "Programming language for syntax highlighting",
    },
    class: { control: "text", description: "Additional CSS classes" },
    showRenderTime: { control: "boolean", description: "Whether to show rendering time in milliseconds" },
  },
})
</script>

<Story name="Default" args={{ language: "js" }}>
{`const greeting = "Hello, Speed Highlight!";
console.log(greeting);`}
</Story>

<Story name="JavaScript" args={{ language: "js" }}>
{`function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));`}
</Story>

<Story name="TypeScript" args={{ language: "ts" }}>
{`interface User {
  id: number;
  name: string;
  email: string;
}

const user: User = {
  id: 1,
  name: "Sarah Chen",
  email: "sarah.chen@acme.io"
};`}
</Story>

<Story name="Python" args={{ language: "python" }}>
{`def hello_world():
    print("Hello, World!")

if __name__ == "__main__":
    hello_world()`}
</Story>

<Story name="HTML" args={{ language: "html" }}>
{`<!DOCTYPE html>
<html>
  <head>
    <title>Example</title>
  </head>
  <body>
    <h1>Hello World</h1>
  </body>
</html>`}
</Story>

<Story name="CSS" args={{ language: "css" }}>
{`.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}`}
</Story>

<Story name="JSON" args={{ language: "json" }}>
{`{
  "name": "CodeBlockSpeed",
  "version": "1.0.0",
  "description": "A code block component using Speed Highlight",
  "features": [
    "syntax highlighting",
    "copy to clipboard",
    "language detection"
  ]
}`}
</Story>

<Story name="Bash" args={{ language: "bash" }}>
{`#!/bin/bash
echo "Hello, World!"
for i in {1..5}; do
  echo "Count: $i"
done`}
</Story>

<Story name="Markdown" args={{ language: "md" }}>
{`# Heading 1

## Heading 2

This is a **bold** text and this is *italic* text.

\`\`\`javascript
const x = 1;
\`\`\``}
</Story>

<Story name="Auto Detect" args={{ language: "" }}>
{`const greeting = "Hello, Speed Highlight!";
console.log(greeting);`}
</Story>

<Story name="With Custom Class" args={{ language: "js", class: "custom-code-block" }}>
{`const x = 1;
const y = 2;
const z = x + y;`}
</Story>

<Story name="With Render Time" args={{ language: "js", showRenderTime: true }}>
{`function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));`}
</Story>

<Story name="Large Code With Render Time" args={{ language: "js", showRenderTime: true }}>
{`class DataProcessor {
  constructor(data) {
    this.data = data;
    this.cache = new Map();
  }

  process() {
    return this.data
      .map(item => this.transform(item))
      .filter(item => this.validate(item))
      .reduce((acc, item) => acc + item.value, 0);
  }

  transform(item) {
    if (this.cache.has(item.id)) {
      return this.cache.get(item.id);
    }
    const transformed = { ...item, value: item.value * 2 };
    this.cache.set(item.id, transformed);
    return transformed;
  }

  validate(item) {
    return item.value > 0 && item.active;
  }
}`}
</Story>

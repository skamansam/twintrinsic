import { CodeBlock } from "$lib/components/CodeBlock"

export default {
  title: "Components/CodeBlock",
  component: CodeBlock,
  argTypes: {
    language: {
      control: "select",
      options: [
        "",
        "javascript",
        "typescript",
        "jsx",
        "tsx",
        "css",
        "scss",
        "markup",
        "bash",
        "json",
        "yaml",
        "markdown",
        "svelte",
      ],
    },
  },
}

export const JavaScript = {
  args: {
    language: "javascript",
  },
  render: () => ({
    Component: CodeBlock,
    props: {
      language: "javascript",
    },
    slots: {
      default: `function greet(name) {
  return \`Hello, \${name}!\`;
}

const result = greet('world');
console.log(result); // Hello, world!`,
    },
  }),
}

export const TypeScript = {
  args: {
    language: "typescript",
  },
  render: () => ({
    Component: CodeBlock,
    props: {
      language: "typescript",
    },
    slots: {
      default: `interface Person {
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

console.log(greet(person));`,
    },
  }),
}

export const Svelte = {
  args: {
    language: "svelte",
  },
  render: () => ({
    Component: CodeBlock,
    props: {
      language: "svelte",
    },
    slots: {
      default: `<script>
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

<style>
  button {
    @apply px-4 py-2 bg-primary text-white rounded;
  }
</style>`,
    },
  }),
}

export const HTML = {
  args: {
    language: "markup",
  },
  render: () => ({
    Component: CodeBlock,
    props: {
      language: "markup",
    },
    slots: {
      default: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Hello World</title>
</head>
<body>
  <h1>Hello, world!</h1>
  <p>This is a paragraph.</p>
</body>
</html>`,
    },
  }),
}

export const CSS = {
  args: {
    language: "css",
  },
  render: () => ({
    Component: CodeBlock,
    props: {
      language: "css",
    },
    slots: {
      default: `.container {
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
}`,
    },
  }),
}

export const JSON = {
  args: {
    language: "json",
  },
  render: () => ({
    Component: CodeBlock,
    props: {
      language: "json",
    },
    slots: {
      default: `{
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
}`,
    },
  }),
}

export const Shell = {
  args: {
    language: "bash",
  },
  render: () => ({
    Component: CodeBlock,
    props: {
      language: "bash",
    },
    slots: {
      default: `#!/bin/bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm test`,
    },
  }),
}

export const AutoDetect = {
  render: () => ({
    Component: CodeBlock,
    slots: {
      default: `// Language will be auto-detected as JavaScript
function add(a, b) {
  return a + b;
}

console.log(add(1, 2)); // 3`,
    },
  }),
}

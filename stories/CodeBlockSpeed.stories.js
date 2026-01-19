import CodeBlockSpeed from '$lib/components/CodeBlockSpeed/CodeBlockSpeed.svelte';

const meta = {
	title: 'Components/CodeBlockSpeed',
	component: CodeBlockSpeed,
	tags: ['autodocs'],
	argTypes: {
		language: {
			control: 'select',
			options: [
				'',
				'js',
				'ts',
				'jsx',
				'tsx',
				'python',
				'html',
				'css',
				'scss',
				'json',
				'yaml',
				'md',
				'bash',
				'svelte',
			],
			description: 'Programming language for syntax highlighting',
		},
		class: {
			control: 'text',
			description: 'Additional CSS classes',
		},
		showRenderTime: {
			control: 'boolean',
			description: 'Whether to show rendering time in milliseconds',
		},
	},
};

export default meta;

export const Default = {
	args: {
		language: 'js',
	},
	render: (args) => ({
		Component: CodeBlockSpeed,
		props: args,
		slots: {
			default: `const greeting = "Hello, Speed Highlight!";
console.log(greeting);`,
		},
	}),
};

export const JavaScript = {
	args: {
		language: 'js',
	},
	render: (args) => ({
		Component: CodeBlockSpeed,
		props: args,
		slots: {
			default: `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));`,
		},
	}),
};

export const TypeScript = {
	args: {
		language: 'ts',
	},
	render: (args) => ({
		Component: CodeBlockSpeed,
		props: args,
		slots: {
			default: `interface User {
  id: number;
  name: string;
  email: string;
}

const user: User = {
  id: 1,
  name: "John Doe",
  email: "john@example.com"
};`,
		},
	}),
};

export const Python = {
	args: {
		language: 'python',
	},
	render: (args) => ({
		Component: CodeBlockSpeed,
		props: args,
		slots: {
			default: `def hello_world():
    print("Hello, World!")

if __name__ == "__main__":
    hello_world()`,
		},
	}),
};

export const HTML = {
	args: {
		language: 'html',
	},
	render: (args) => ({
		Component: CodeBlockSpeed,
		props: args,
		slots: {
			default: `<!DOCTYPE html>
<html>
  <head>
    <title>Example</title>
  </head>
  <body>
    <h1>Hello World</h1>
  </body>
</html>`,
		},
	}),
};

export const CSS = {
	args: {
		language: 'css',
	},
	render: (args) => ({
		Component: CodeBlockSpeed,
		props: args,
		slots: {
			default: `.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}`,
		},
	}),
};

export const JSON = {
	args: {
		language: 'json',
	},
	render: (args) => ({
		Component: CodeBlockSpeed,
		props: args,
		slots: {
			default: `{
  "name": "CodeBlockSpeed",
  "version": "1.0.0",
  "description": "A code block component using Speed Highlight",
  "features": [
    "syntax highlighting",
    "copy to clipboard",
    "language detection"
  ]
}`,
		},
	}),
};

export const Bash = {
	args: {
		language: 'bash',
	},
	render: (args) => ({
		Component: CodeBlockSpeed,
		props: args,
		slots: {
			default: `#!/bin/bash
echo "Hello, World!"
for i in {1..5}; do
  echo "Count: $i"
done`,
		},
	}),
};

export const Markdown = {
	args: {
		language: 'md',
	},
	render: (args) => ({
		Component: CodeBlockSpeed,
		props: args,
		slots: {
			default: `# Heading 1

## Heading 2

This is a **bold** text and this is *italic* text.

\`\`\`javascript
const x = 1;
\`\`\``,
		},
	}),
};

export const AutoDetect = {
	args: {
		language: '',
	},
	render: (args) => ({
		Component: CodeBlockSpeed,
		props: args,
		slots: {
			default: `const greeting = "Hello, Speed Highlight!";
console.log(greeting);`,
		},
	}),
};

export const WithCustomClass = {
	args: {
		language: 'js',
		class: 'custom-code-block',
	},
	render: (args) => ({
		Component: CodeBlockSpeed,
		props: args,
		slots: {
			default: `const x = 1;
const y = 2;
const z = x + y;`,
		},
	}),
};

export const WithRenderTime = {
	args: {
		language: 'js',
		showRenderTime: true,
	},
	render: (args) => ({
		Component: CodeBlockSpeed,
		props: args,
		slots: {
			default: `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));`,
		},
	}),
};

export const LargeCodeWithRenderTime = {
	args: {
		language: 'js',
		showRenderTime: true,
	},
	render: (args) => ({
		Component: CodeBlockSpeed,
		props: args,
		slots: {
			default: `class DataProcessor {
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
}`,
		},
	}),
};

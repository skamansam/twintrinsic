import CodeEditor from '$lib/components/CodeEditor/CodeEditor.svelte';

const meta = {
	title: 'Components/CodeEditor',
	component: CodeEditor,
	tags: ['autodocs'],
	argTypes: {
		code: {
			control: 'text',
			description: 'Initial code content',
		},
		language: {
			control: 'select',
			options: [
				'javascript',
				'typescript',
				'python',
				'html',
				'css',
				'json',
				'xml',
				'markdown',
				'sql',
				'java',
				'cpp',
				'rust',
				'go',
				'php',
				'vue',
				'svelte',
			],
			description: 'Language to use for syntax highlighting',
		},
		theme: {
			control: 'select',
			options: [
				'light',
				'one-dark',
				'dracula',
				'material-dark',
				'nord',
				'solarized-light',
				'solarized-dark',
				'sublime',
				'ayu-light',
				'ayu-dark',
			],
			description: 'Theme name to apply',
		},
		cdnSource: {
			control: 'select',
			options: ['jsdelivr', 'esm.sh', 'unpkg'],
			description: 'CDN source for loading extensions',
		},
		height: {
			control: 'text',
			description: 'Height of the editor',
		},
		extensions: {
			control: 'object',
			description: 'Array of extension URLs to load dynamically',
		},
		onchange: {
			action: 'change',
			description: 'Callback when code changes',
		},
	},
};

export default meta;

export const Default = {
	args: {
		code: 'const greeting = "Hello, CodeMirror!";\nconsole.log(greeting);',
		language: 'javascript',
		theme: 'light',
		height: '400px',
	},
};

export const Python = {
	args: {
		code: 'def hello():\n    print("Hello, World!")\n\nhello()',
		language: 'python',
		theme: 'light',
		height: '400px',
	},
};

export const HTML = {
	args: {
		code: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>Example</title>\n  </head>\n  <body>\n    <h1>Hello World</h1>\n  </body>\n</html>',
		language: 'html',
		theme: 'light',
		height: '400px',
	},
};

export const DarkTheme = {
	args: {
		code: 'const greeting = "Hello, CodeMirror!";\nconsole.log(greeting);',
		language: 'javascript',
		theme: 'one-dark',
		height: '400px',
	},
};

export const Dracula = {
	args: {
		code: 'function fibonacci(n) {\n  if (n <= 1) return n;\n  return fibonacci(n - 1) + fibonacci(n - 2);\n}',
		language: 'javascript',
		theme: 'dracula',
		height: '400px',
	},
};

export const JSON = {
	args: {
		code: JSON.stringify(
			{
				name: 'CodeEditor',
				version: '1.0.0',
				description: 'A CodeMirror-based code editor component',
				features: ['syntax highlighting', 'dynamic extensions', 'multiple themes'],
			},
			null,
			2
		),
		language: 'json',
		theme: 'light',
		height: '400px',
	},
};

export const CustomHeight = {
	args: {
		code: 'const x = 1;\nconst y = 2;\nconst z = x + y;',
		language: 'javascript',
		theme: 'light',
		height: '600px',
	},
};

export const WithExtensions = {
	args: {
		code: 'const greeting = "Hello with extensions!";\nconsole.log(greeting);',
		language: 'javascript',
		theme: 'light',
		height: '400px',
		extensions: [],
		cdnSource: 'esm.sh',
	},
};

export const JSXCode = {
	args: {
		code: 'export default function App() {\n  return (\n    <div>\n      <h1>Hello React</h1>\n    </div>\n  );\n}',
		language: 'javascript',
		theme: 'light',
		height: '400px',
	},
};

export const SvelteCode = {
	args: {
		code: '<script>\n  let count = 0;\n</script>\n\n<button on:click={() => count++}>\n  Count: {count}\n</button>',
		language: 'javascript',
		theme: 'light',
		height: '400px',
	},
};

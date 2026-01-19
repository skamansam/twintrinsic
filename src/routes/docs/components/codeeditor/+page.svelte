<script>
	import CodeBlock from '$lib/components/CodeBlock/CodeBlock.svelte';
	import CodeEditor from '$lib/components/CodeEditor/CodeEditor.svelte';
</script>

<div class="space-y-8">
	<section>
		<h1 class="text-4xl font-bold mb-4">CodeEditor</h1>
		<p class="text-lg text-gray-600 dark:text-gray-400">
			A powerful code editor component powered by CodeMirror 6. Supports dynamic extension loading
			from multiple CDNs, syntax highlighting for 15+ languages, and customizable themes.
		</p>
	</section>

	<section>
		<h2 class="text-2xl font-bold mb-4">Features</h2>
		<ul class="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
			<li>
				<strong>Dynamic Extension Loading:</strong> Load CodeMirror extensions from jsdelivr, esm.sh, or unpkg
			</li>
			<li>
				<strong>Multiple Languages:</strong> Built-in support for JavaScript, TypeScript, Python, HTML, CSS, JSON, XML, Markdown, SQL, Java, C++, Rust, Go, PHP, Vue, and Svelte
			</li>
			<li>
				<strong>Theme Support:</strong> 9+ pre-configured themes including One Dark, Dracula, Nord, Solarized, and more
			</li>
			<li>
				<strong>Syntax Highlighting:</strong> Automatic syntax highlighting based on selected language
			</li>
			<li>
				<strong>Line Numbers:</strong> Built-in line number gutter
			</li>
			<li>
				<strong>Code Folding:</strong> Fold/unfold code blocks
			</li>
			<li>
				<strong>Active Line Highlighting:</strong> Visual feedback for the current line
			</li>
		</ul>
	</section>

	<section>
		<h2 class="text-2xl font-bold mb-4">Basic Usage</h2>
		<CodeBlock
			code={`<script>
  import { CodeEditor } from 'twintrinsic';
</script>

<CodeEditor
  code="const greeting = 'Hello, World!';"
  language="javascript"
  theme="light"
  height="400px"
/>`}
			language="svelte"
		/>
	</section>

	<section>
		<h2 class="text-2xl font-bold mb-4">Examples</h2>

		<div class="space-y-8">
			<div>
				<h3 class="text-xl font-semibold mb-3">JavaScript Editor</h3>
				<CodeEditor
					code={`function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));`}
					language="javascript"
					theme="light"
					height="300px"
				/>
			</div>

			<div>
				<h3 class="text-xl font-semibold mb-3">Python Editor</h3>
				<CodeEditor
					code={`def hello_world():
    print("Hello, World!")

if __name__ == "__main__":
    hello_world()`}
					language="python"
					theme="light"
					height="300px"
				/>
			</div>

			<div>
				<h3 class="text-xl font-semibold mb-3">HTML Editor</h3>
				<CodeEditor
					code={`<!DOCTYPE html>
<html>
  <head>
    <title>Example</title>
  </head>
  <body>
    <h1>Hello World</h1>
  </body>
</html>`}
					language="html"
					theme="light"
					height="300px"
				/>
			</div>

			<div>
				<h3 class="text-xl font-semibold mb-3">Dark Theme (One Dark)</h3>
				<CodeEditor
					code={`const greeting = "Hello, CodeMirror!";
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log(doubled);`}
					language="javascript"
					theme="one-dark"
					height="300px"
				/>
			</div>

			<div>
				<h3 class="text-xl font-semibold mb-3">Dracula Theme</h3>
				<CodeEditor
					code={`interface User {
  id: number;
  name: string;
  email: string;
}

const user: User = {
  id: 1,
  name: "John Doe",
  email: "john@example.com"
};`}
					language="typescript"
					theme="dracula"
					height="300px"
				/>
			</div>
		</div>
	</section>

	<section>
		<h2 class="text-2xl font-bold mb-4">Props</h2>
		<div class="overflow-x-auto">
			<table class="w-full border-collapse border border-gray-300 dark:border-gray-700">
				<thead class="bg-gray-100 dark:bg-gray-800">
					<tr>
						<th class="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Prop</th>
						<th class="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Type</th>
						<th class="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Default</th>
						<th class="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Description</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono">code</td>
						<td class="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono">string</td>
						<td class="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono">''</td>
						<td class="border border-gray-300 dark:border-gray-700 px-4 py-2">Initial code content</td>
					</tr>
					<tr>
						<td class="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono">language</td>
						<td class="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono">string</td>
						<td class="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono">'javascript'</td>
						<td class="border border-gray-300 dark:border-gray-700 px-4 py-2">Programming language for syntax highlighting</td>
					</tr>
					<tr>
						<td class="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono">theme</td>
						<td class="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono">string</td>
						<td class="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono">'light'</td>
						<td class="border border-gray-300 dark:border-gray-700 px-4 py-2">Theme name (light, one-dark, dracula, etc.)</td>
					</tr>
					<tr>
						<td class="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono">height</td>
						<td class="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono">string</td>
						<td class="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono">'400px'</td>
						<td class="border border-gray-300 dark:border-gray-700 px-4 py-2">Height of the editor</td>
					</tr>
					<tr>
						<td class="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono">cdnSource</td>
						<td class="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono">string</td>
						<td class="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono">'esm.sh'</td>
						<td class="border border-gray-300 dark:border-gray-700 px-4 py-2">CDN source for loading extensions (jsdelivr, esm.sh, unpkg)</td>
					</tr>
					<tr>
						<td class="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono">extensions</td>
						<td class="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono">string[]</td>
						<td class="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono">[]</td>
						<td class="border border-gray-300 dark:border-gray-700 px-4 py-2">Array of extension URLs to load dynamically</td>
					</tr>
					<tr>
						<td class="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono">onchange</td>
						<td class="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono">function</td>
						<td class="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono">undefined</td>
						<td class="border border-gray-300 dark:border-gray-700 px-4 py-2">Callback when code changes</td>
					</tr>
				</tbody>
			</table>
		</div>
	</section>

	<section>
		<h2 class="text-2xl font-bold mb-4">Supported Languages</h2>
		<div class="grid grid-cols-2 md:grid-cols-3 gap-4">
			<div class="p-3 bg-gray-100 dark:bg-gray-800 rounded">JavaScript</div>
			<div class="p-3 bg-gray-100 dark:bg-gray-800 rounded">TypeScript</div>
			<div class="p-3 bg-gray-100 dark:bg-gray-800 rounded">Python</div>
			<div class="p-3 bg-gray-100 dark:bg-gray-800 rounded">HTML</div>
			<div class="p-3 bg-gray-100 dark:bg-gray-800 rounded">CSS</div>
			<div class="p-3 bg-gray-100 dark:bg-gray-800 rounded">JSON</div>
			<div class="p-3 bg-gray-100 dark:bg-gray-800 rounded">XML</div>
			<div class="p-3 bg-gray-100 dark:bg-gray-800 rounded">Markdown</div>
			<div class="p-3 bg-gray-100 dark:bg-gray-800 rounded">SQL</div>
			<div class="p-3 bg-gray-100 dark:bg-gray-800 rounded">Java</div>
			<div class="p-3 bg-gray-100 dark:bg-gray-800 rounded">C++</div>
			<div class="p-3 bg-gray-100 dark:bg-gray-800 rounded">Rust</div>
			<div class="p-3 bg-gray-100 dark:bg-gray-800 rounded">Go</div>
			<div class="p-3 bg-gray-100 dark:bg-gray-800 rounded">PHP</div>
			<div class="p-3 bg-gray-100 dark:bg-gray-800 rounded">Vue</div>
			<div class="p-3 bg-gray-100 dark:bg-gray-800 rounded">Svelte</div>
		</div>
	</section>

	<section>
		<h2 class="text-2xl font-bold mb-4">Supported Themes</h2>
		<div class="grid grid-cols-2 md:grid-cols-3 gap-4">
			<div class="p-3 bg-gray-100 dark:bg-gray-800 rounded">light (default)</div>
			<div class="p-3 bg-gray-100 dark:bg-gray-800 rounded">one-dark</div>
			<div class="p-3 bg-gray-100 dark:bg-gray-800 rounded">dracula</div>
			<div class="p-3 bg-gray-100 dark:bg-gray-800 rounded">material-dark</div>
			<div class="p-3 bg-gray-100 dark:bg-gray-800 rounded">nord</div>
			<div class="p-3 bg-gray-100 dark:bg-gray-800 rounded">solarized-light</div>
			<div class="p-3 bg-gray-100 dark:bg-gray-800 rounded">solarized-dark</div>
			<div class="p-3 bg-gray-100 dark:bg-gray-800 rounded">sublime</div>
			<div class="p-3 bg-gray-100 dark:bg-gray-800 rounded">ayu-light</div>
			<div class="p-3 bg-gray-100 dark:bg-gray-800 rounded">ayu-dark</div>
		</div>
	</section>

	<section>
		<h2 class="text-2xl font-bold mb-4">CDN Sources</h2>
		<p class="text-gray-700 dark:text-gray-300 mb-4">
			The CodeEditor component can load extensions from three different CDN sources:
		</p>
		<div class="space-y-4">
			<div>
				<h3 class="font-semibold mb-2">esm.sh (default)</h3>
				<p class="text-gray-600 dark:text-gray-400 text-sm">
					Fast and reliable ESM CDN. Recommended for most use cases.
				</p>
				<CodeBlock code="cdnSource='esm.sh'" language="javascript" />
			</div>
			<div>
				<h3 class="font-semibold mb-2">jsdelivr</h3>
				<p class="text-gray-600 dark:text-gray-400 text-sm">
					Popular CDN with global distribution and good performance.
				</p>
				<CodeBlock code="cdnSource='jsdelivr'" language="javascript" />
			</div>
			<div>
				<h3 class="font-semibold mb-2">unpkg</h3>
				<p class="text-gray-600 dark:text-gray-400 text-sm">
					Fast, global content delivery network for npm packages.
				</p>
				<CodeBlock code="cdnSource='unpkg'" language="javascript" />
			</div>
		</div>
	</section>

	<section>
		<h2 class="text-2xl font-bold mb-4">Accessibility</h2>
		<ul class="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
			<li>Keyboard navigation support through CodeMirror</li>
			<li>Screen reader compatible</li>
			<li>Proper semantic HTML structure</li>
			<li>High contrast theme options available</li>
		</ul>
	</section>
</div>

<style lang="postcss">
	@reference "$lib/twintrinsic.css";

	section {
		@apply py-6;
	}

	h1 {
		@apply text-gray-900 dark:text-white;
	}

	h2 {
		@apply text-gray-900 dark:text-white;
	}

	h3 {
		@apply text-gray-900 dark:text-white;
	}
</style>

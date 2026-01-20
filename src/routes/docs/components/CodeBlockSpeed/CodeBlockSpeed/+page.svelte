<!--
@component
CodeBlockSpeed documentation page
-->
<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock/CodeBlock.svelte';
	import CodeBlockSpeed from '$lib/components/CodeBlockSpeed/CodeBlockSpeed.svelte';
</script>

<div class="space-y-8">
	<section>
		<h1 class="text-4xl font-bold mb-4">CodeBlockSpeed</h1>
		<p class="text-lg text-gray-600 dark:text-gray-400">
			A lightweight code block component powered by Speed Highlight. Faster and smaller than Prism,
			with support for 13+ languages, automatic language detection, and optional rendering time display.
		</p>
	</section>

	<section>
		<h2 class="text-2xl font-bold mb-4">Features</h2>
		<ul class="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
			<li>
				<strong>Speed Highlight Integration:</strong> Lightweight syntax highlighter with minimal bundle size
			</li>
			<li>
				<strong>Multiple Languages:</strong> Support for JavaScript, TypeScript, Python, HTML, CSS, JSON, YAML, Markdown, Bash, and more
			</li>
			<li>
				<strong>Auto Language Detection:</strong> Automatically detects code language based on content
			</li>
			<li>
				<strong>Copy to Clipboard:</strong> Built-in copy button with visual feedback
			</li>
			<li>
				<strong>Rendering Time Display:</strong> Optional performance metrics showing syntax highlighting duration
			</li>
			<li>
				<strong>Dark Mode Support:</strong> Full light and dark theme support
			</li>
		</ul>
	</section>

	<section>
		<h2 class="text-2xl font-bold mb-4">Basic Usage</h2>
		<CodeBlock language="svelte">
			{`
<script>
	import { CodeBlockSpeed } from 'twintrinsic';
</script>

<CodeBlockSpeed language="javascript">
	const greeting = 'Hello, Speed Highlight!';
	console.log(greeting);
</CodeBlockSpeed>
		`}
		</CodeBlock>
	</section>

	<section>
		<h2 class="text-2xl font-bold mb-4">Examples</h2>

		<div class="space-y-8">
			<div>
				<h3 class="text-xl font-semibold mb-3">JavaScript</h3>
				<CodeBlockSpeed language="js">
					{`function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));`}
				</CodeBlockSpeed>
			</div>

			<div>
				<h3 class="text-xl font-semibold mb-3">TypeScript</h3>
				<CodeBlockSpeed language="ts">
					{`interface User {
  id: number;
  name: string;
  email: string;
}

const user: User = {
  id: 1,
  name: "John Doe",
  email: "john@example.com"
};`}
				</CodeBlockSpeed>
			</div>

			<div>
				<h3 class="text-xl font-semibold mb-3">Python</h3>
				<CodeBlockSpeed language="python">
					{`def hello_world():
    print("Hello, World!")

if __name__ == "__main__":
    hello_world()`}
				</CodeBlockSpeed>
			</div>

			<div>
				<h3 class="text-xl font-semibold mb-3">HTML</h3>
				<CodeBlockSpeed language="html">
					{`<!DOCTYPE html>
<html>
  <head>
    <title>Example</title>
  </head>
  <body>
    <h1>Hello World</h1>
  </body>
</html>`}
				</CodeBlockSpeed>
			</div>

			<div>
				<h3 class="text-xl font-semibold mb-3">CSS</h3>
				<CodeBlockSpeed language="css">
					{`.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}`}
				</CodeBlockSpeed>
			</div>

			<div>
				<h3 class="text-xl font-semibold mb-3">JSON</h3>
				<CodeBlockSpeed language="json">
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
				</CodeBlockSpeed>
			</div>

			<div>
				<h3 class="text-xl font-semibold mb-3">With Rendering Time</h3>
				<CodeBlockSpeed language="js" showRenderTime={true}>
					{`const greeting = "Hello, Speed Highlight!";
console.log(greeting);`}
				</CodeBlockSpeed>
			</div>

			<div>
				<h3 class="text-xl font-semibold mb-3">Auto Language Detection</h3>
				<CodeBlockSpeed>
					{`const greeting = "Hello, Speed Highlight!";
console.log(greeting);`}
				</CodeBlockSpeed>
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
						<td class="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono">language</td>
						<td class="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono">string</td>
						<td class="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono">''</td>
						<td class="border border-gray-300 dark:border-gray-700 px-4 py-2">Programming language for syntax highlighting</td>
					</tr>
					<tr>
						<td class="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono">class</td>
						<td class="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono">string</td>
						<td class="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono">''</td>
						<td class="border border-gray-300 dark:border-gray-700 px-4 py-2">Additional CSS classes</td>
					</tr>
					<tr>
						<td class="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono">showRenderTime</td>
						<td class="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono">boolean</td>
						<td class="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono">false</td>
						<td class="border border-gray-300 dark:border-gray-700 px-4 py-2">Display syntax highlighting rendering time in milliseconds</td>
					</tr>
				</tbody>
			</table>
		</div>
	</section>

	<section>
		<h2 class="text-2xl font-bold mb-4">Supported Languages</h2>
		<div class="grid grid-cols-2 md:grid-cols-3 gap-4">
			<div class="p-3 bg-gray-100 dark:bg-gray-800 rounded">JavaScript (js)</div>
			<div class="p-3 bg-gray-100 dark:bg-gray-800 rounded">TypeScript (ts)</div>
			<div class="p-3 bg-gray-100 dark:bg-gray-800 rounded">JSX (jsx)</div>
			<div class="p-3 bg-gray-100 dark:bg-gray-800 rounded">TSX (tsx)</div>
			<div class="p-3 bg-gray-100 dark:bg-gray-800 rounded">Python</div>
			<div class="p-3 bg-gray-100 dark:bg-gray-800 rounded">HTML</div>
			<div class="p-3 bg-gray-100 dark:bg-gray-800 rounded">CSS</div>
			<div class="p-3 bg-gray-100 dark:bg-gray-800 rounded">SCSS</div>
			<div class="p-3 bg-gray-100 dark:bg-gray-800 rounded">JSON</div>
			<div class="p-3 bg-gray-100 dark:bg-gray-800 rounded">YAML</div>
			<div class="p-3 bg-gray-100 dark:bg-gray-800 rounded">Markdown (md)</div>
			<div class="p-3 bg-gray-100 dark:bg-gray-800 rounded">Bash</div>
			<div class="p-3 bg-gray-100 dark:bg-gray-800 rounded">Svelte</div>
		</div>
	</section>

	<section>
		<h2 class="text-2xl font-bold mb-4">Rendering Time Feature</h2>
		<p class="text-gray-700 dark:text-gray-300 mb-4">
			The <code class="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">showRenderTime</code> prop displays the time
			(in milliseconds) it takes for Speed Highlight to syntax highlight the code. This is useful for performance
			monitoring and benchmarking.
		</p>
		<CodeBlock
			language="svelte"
			code={`<CodeBlockSpeed 
  language="javascript" 
  showRenderTime={true}
>
  const greeting = "Hello, Speed Highlight!";
</CodeBlockSpeed>`}
		/>
		<p class="text-gray-700 dark:text-gray-300 mt-4">
			The rendering time appears as a badge in the code block header, showing the exact duration of the syntax
			highlighting operation.
		</p>
	</section>

	<section>
		<h2 class="text-2xl font-bold mb-4">Auto Language Detection</h2>
		<p class="text-gray-700 dark:text-gray-300 mb-4">
			If you don't specify a language, CodeBlockSpeed will attempt to detect it automatically based on code patterns:
		</p>
		<ul class="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
			<li>HTML/SVG detection for tags</li>
			<li>CSS/SCSS detection for style rules</li>
			<li>JavaScript/TypeScript detection for functions and arrow functions</li>
			<li>JSON detection for valid JSON structures</li>
			<li>YAML detection for key-value pairs</li>
			<li>Markdown detection for headers and code blocks</li>
			<li>Svelte detection for script tags and reactive declarations</li>
			<li>Bash detection for shell commands</li>
		</ul>
		<CodeBlock
			language="svelte"
			code={`<!-- Auto-detection will identify this as JavaScript -->
<CodeBlockSpeed>
  const greeting = "Hello, World!";
  console.log(greeting);
</CodeBlockSpeed>`}
		/>
	</section>

	<section>
		<h2 class="text-2xl font-bold mb-4">Comparison with CodeBlock</h2>
		<div class="overflow-x-auto">
			<table class="w-full border-collapse border border-gray-300 dark:border-gray-700">
				<thead class="bg-gray-100 dark:bg-gray-800">
					<tr>
						<th class="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Feature</th>
						<th class="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">CodeBlock (Prism)</th>
						<th class="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">CodeBlockSpeed</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="border border-gray-300 dark:border-gray-700 px-4 py-2">Bundle Size</td>
						<td class="border border-gray-300 dark:border-gray-700 px-4 py-2">Larger</td>
						<td class="border border-gray-300 dark:border-gray-700 px-4 py-2">Smaller ✓</td>
					</tr>
					<tr>
						<td class="border border-gray-300 dark:border-gray-700 px-4 py-2">Performance</td>
						<td class="border border-gray-300 dark:border-gray-700 px-4 py-2">Good</td>
						<td class="border border-gray-300 dark:border-gray-700 px-4 py-2">Faster ✓</td>
					</tr>
					<tr>
						<td class="border border-gray-300 dark:border-gray-700 px-4 py-2">Language Support</td>
						<td class="border border-gray-300 dark:border-gray-700 px-4 py-2">Extensive</td>
						<td class="border border-gray-300 dark:border-gray-700 px-4 py-2">Core languages</td>
					</tr>
					<tr>
						<td class="border border-gray-300 dark:border-gray-700 px-4 py-2">Copy Button</td>
						<td class="border border-gray-300 dark:border-gray-700 px-4 py-2">✓</td>
						<td class="border border-gray-300 dark:border-gray-700 px-4 py-2">✓</td>
					</tr>
					<tr>
						<td class="border border-gray-300 dark:border-gray-700 px-4 py-2">Rendering Time</td>
						<td class="border border-gray-300 dark:border-gray-700 px-4 py-2">-</td>
						<td class="border border-gray-300 dark:border-gray-700 px-4 py-2">✓</td>
					</tr>
				</tbody>
			</table>
		</div>
	</section>

	<section>
		<h2 class="text-2xl font-bold mb-4">Accessibility</h2>
		<ul class="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
			<li>Semantic HTML structure</li>
			<li>Accessible copy button with proper aria-labels</li>
			<li>Keyboard navigation support</li>
			<li>Screen reader friendly</li>
			<li>High contrast support</li>
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

	code {
		@apply bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded font-mono text-sm;
	}
</style>

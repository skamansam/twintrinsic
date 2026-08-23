<!--
@component
CodeBlockSpeed documentation page — standardized structure
-->
<script lang="ts">
import CodeBlock from '$lib/components/CodeBlock/CodeBlock.svelte'
import CodeBlockSpeed from '$lib/components/CodeBlockSpeed/CodeBlockSpeed.svelte'
import Container from "$lib/components/Container/Container.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as CodeBlockSpeedModule from "$lib/components/CodeBlockSpeed/CodeBlockSpeed.svelte"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
<h1>CodeBlockSpeed</h1>

<p>
  A lightweight code block component powered by Speed Highlight. Faster and
  smaller than Prism, with support for 13+ languages, automatic language
  detection, and optional rendering time display.
</p>

<h2>What, When &amp; Why</h2>

<h3>What is it?</h3>
<p>
  A read-only code display widget that uses Speed Highlight for syntax
  highlighting. It loads the highlighter on demand, keeping the bundle size
  minimal compared to Prism-based alternatives.
</p>

<h3>When should I use it?</h3>
<p>
  Use <code>&lt;CodeBlockSpeed&gt;</code> for read-only code samples in documentation,
  blog posts, or tutorials where bundle size and rendering speed matter. For a
  full code editor, use <code>&lt;CodeEditor&gt;</code>.
</p>

<h3>Why does it exist?</h3>
<ul>
  <li><strong>Smaller bundle</strong> — Speed Highlight is significantly lighter than Prism.</li>
  <li><strong>Faster rendering</strong> — optimized for quick syntax highlighting.</li>
  <li><strong>Auto detection</strong> — can detect the language automatically from code patterns.</li>
  <li><strong>Render time display</strong> — optional badge showing highlighting duration.</li>
</ul>

<h3>Sources</h3>
<ul>
  <li><a href="https://SpeedHighlight.dev/">Speed Highlight</a></li>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/pre">MDN — pre element</a></li>
</ul>

<h2>Responsiveness</h2>
<ul>
  <li>Code block fills container width with horizontal scroll for long lines.</li>
  <li>Copy button is accessible on touch devices.</li>
</ul>

<h2>Customization</h2>
<ul>
  <li>Language via <code>language</code> prop (js, ts, python, html, css, json, etc.).</li>
  <li>Auto detection when language is omitted.</li>
  <li>Render time display via <code>showRenderTime</code> prop.</li>
</ul>

<h2>Examples</h2>

<h3>JavaScript</h3>
<ExampleTabs code={`<CodeBlockSpeed language="js">
  const greeting = 'Hello, Speed Highlight!';
  console.log(greeting);
</CodeBlockSpeed>`}>
  <CodeBlockSpeed language="js" data-testid="codeblockspeed-js">
    {`function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));`}
  </CodeBlockSpeed>
</ExampleTabs>

<h3>TypeScript</h3>
<ExampleTabs code={`<CodeBlockSpeed language="ts">
  interface User { id: number; name: string; }
</CodeBlockSpeed>`}>
  <CodeBlockSpeed language="ts" data-testid="codeblockspeed-ts">
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
  </CodeBlockSpeed>
</ExampleTabs>

<h3>Python</h3>
<ExampleTabs code={`<CodeBlockSpeed language="python">
  def hello_world(): print("Hello!")
</CodeBlockSpeed>`}>
  <CodeBlockSpeed language="python" data-testid="codeblockspeed-python">
    {`def hello_world():
    print("Hello, World!")

if __name__ == "__main__":
    hello_world()`}
  </CodeBlockSpeed>
</ExampleTabs>

<h3>With Rendering Time</h3>
<ExampleTabs code={`<CodeBlockSpeed language="js" showRenderTime={true}>
  const greeting = "Hello!";
</CodeBlockSpeed>`}>
  <CodeBlockSpeed language="js" showRenderTime={true} data-testid="codeblockspeed-render-time">
    {`const greeting = "Hello, Speed Highlight!";
console.log(greeting);`}
  </CodeBlockSpeed>
</ExampleTabs>

<h3>Auto Language Detection</h3>
<ExampleTabs code={`<CodeBlockSpeed>
  // Language auto-detected from code patterns
  const greeting = "Hello!";
</CodeBlockSpeed>`}>
  <CodeBlockSpeed data-testid="codeblockspeed-auto-detect">
    {`const greeting = "Hello, Speed Highlight!";
console.log(greeting);`}
  </CodeBlockSpeed>
</ExampleTabs>

<h2>Supported Languages</h2>
<p>JavaScript, TypeScript, JSX, TSX, Python, HTML, CSS, SCSS, JSON, YAML, Markdown, Bash, and Svelte.</p>

<h2>Rendering Time Feature</h2>
<p>
  The <code>showRenderTime</code> prop displays the time (in milliseconds) it
  takes for Speed Highlight to syntax highlight the code. The rendering time
  appears as a badge in the code block header.
</p>

<h2>Comparison with CodeBlock</h2>
<table>
  <thead><tr><th>Feature</th><th>CodeBlock (Prism)</th><th>CodeBlockSpeed</th></tr></thead>
  <tbody>
    <tr><td>Bundle Size</td><td>Larger</td><td>Smaller ✓</td></tr>
    <tr><td>Performance</td><td>Good</td><td>Faster ✓</td></tr>
    <tr><td>Language Support</td><td>Extensive</td><td>Core languages</td></tr>
    <tr><td>Copy Button</td><td>✓</td><td>✓</td></tr>
    <tr><td>Rendering Time</td><td>—</td><td>✓</td></tr>
  </tbody>
</table>

<h2>Props</h2>
<PropsTable component={CodeBlockSpeedModule} />

<h2>Accessibility</h2>
<ul>
  <li>Semantic HTML structure with <code>&lt;pre&gt;</code> and <code>&lt;code&gt;</code>.</li>
  <li>Accessible copy button with proper <code>aria-label</code>.</li>
  <li>Keyboard navigation support.</li>
  <li>Screen reader friendly.</li>
  <li>High contrast support.</li>
</ul>
</Container>

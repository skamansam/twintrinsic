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

<h2>Comparison: CodeBlockSpeed vs CodeBlock</h2>

<p>
  Both components render syntax-highlighted, read-only code blocks. Below is a
  side-by-side comparison with the same code sample rendered by each. Notice the
  render time badge on CodeBlockSpeed — CodeBlock (Prism) does not expose this
  metric.
</p>

<h3>Side-by-Side Comparison</h3>
<ExampleTabs code={`<CodeBlockSpeed language="javascript" showRenderTime={true}>
  {sampleCode}
</CodeBlockSpeed>

<CodeBlock language="javascript">
  {sampleCode}
</CodeBlock>`}>
  {@const sampleCode = `// Fibonacci with memoization
function fibonacci(n, memo = {}) {
  if (n <= 1) return n;
  if (memo[n]) return memo[n];
  memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
  return memo[n];
}

// Generate first 15 numbers
const sequence = Array.from({ length: 15 }, (_, i) => fibonacci(i));
console.log(sequence);
// → [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377]`}
  <div class="comparison-grid">
    <div>
      <h4>CodeBlockSpeed <span class="badge-inline badge-info">Speed Highlight</span></h4>
      <CodeBlockSpeed language="javascript" showRenderTime={true} data-testid="comparison-speed">
        {sampleCode}
      </CodeBlockSpeed>
    </div>
    <div>
      <h4>CodeBlock <span class="badge-inline badge-warning">Prism</span></h4>
      <CodeBlock language="javascript" data-testid="comparison-prism">
        {sampleCode}
      </CodeBlock>
    </div>
  </div>
</ExampleTabs>

<h3>Feature Comparison</h3>
<table>
  <thead><tr><th>Feature</th><th>CodeBlock (Prism)</th><th>CodeBlockSpeed</th></tr></thead>
  <tbody>
    <tr><td>Bundle Size</td><td>Larger</td><td>Smaller ✓</td></tr>
    <tr><td>Performance</td><td>Good</td><td>Faster ✓</td></tr>
    <tr><td>Language Support</td><td>Extensive (150+)</td><td>Core languages (13)</td></tr>
    <tr><td>Copy Button</td><td>✓</td><td>✓</td></tr>
    <tr><td>Render Time Badge</td><td>—</td><td>✓</td></tr>
    <tr><td>Auto Language Detection</td><td>✓ (autoloader)</td><td>✓</td></tr>
    <tr><td>Line Numbers</td><td>Plugin required</td><td>—</td></tr>
  </tbody>
</table>

<h3>When to Use Which</h3>
<ul>
  <li><strong>CodeBlockSpeed</strong> — Documentation, blog posts, tutorials where fast loading and small bundle size matter. Perfect for static code samples.</li>
  <li><strong>CodeBlock</strong> — Projects already using Prism, or when you need extensive language coverage (150+ languages) or Prism plugins.</li>
</ul>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';

  .comparison-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  @media (max-width: 768px) {
    .comparison-grid {
      grid-template-columns: 1fr;
    }
  }

  .comparison-grid h4 {
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
    font-weight: 600;
  }

  .badge-inline {
    display: inline-block;
    font-size: 0.7rem;
    padding: 0.1rem 0.4rem;
    border-radius: 9999px;
    font-weight: 500;
    vertical-align: middle;
  }

  .badge-info {
    background-color: var(--color-info, #3b82f6);
    color: white;
  }

  .badge-warning {
    background-color: var(--color-warning, #f59e0b);
    color: white;
  }
</style>

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

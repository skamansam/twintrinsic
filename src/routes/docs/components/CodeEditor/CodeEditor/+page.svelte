<!--
@component
CodeEditor documentation page — standardized structure
-->
<script lang="ts">
import CodeBlock from '$lib/components/CodeBlock/CodeBlock.svelte'
import CodeEditor from '$lib/components/CodeEditor/CodeEditor.svelte'
import Container from "$lib/components/Container/Container.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as CodeEditorModule from "$lib/components/CodeEditor/CodeEditor.svelte"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
<h1>CodeEditor</h1>

<p>
  A powerful code editor component powered by CodeMirror 6. Supports dynamic
  extension loading from multiple CDNs, syntax highlighting for 15+ languages,
  and customizable themes.
</p>

<h2>What, When &amp; Why</h2>

<h3>What is it?</h3>
<p>
  A full-featured code editing widget built on CodeMirror 6. It loads extensions
  dynamically from CDNs (esm.sh, jsdelivr, unpkg), providing syntax highlighting,
  line numbers, code folding, and active line highlighting without bundling the
  entire CodeMirror library.
</p>

<h3>When should I use it?</h3>
<p>
  Use <code>&lt;CodeEditor&gt;</code> when users need to write or edit code directly
  in the browser — configuration editors, code playgrounds, CMS code fields. For
  read-only code display, use <code>&lt;CodeBlock&gt;</code> instead.
</p>

<h3>Why does it exist?</h3>
<ul>
  <li><strong>Dynamic loading</strong> — extensions load from CDN on demand, keeping the initial bundle small.</li>
  <li><strong>15+ languages</strong> — JavaScript, TypeScript, Python, HTML, CSS, JSON, and more.</li>
  <li><strong>9+ themes</strong> — One Dark, Dracula, Nord, Solarized, and others.</li>
  <li><strong>Full editor features</strong> — line numbers, code folding, active line highlighting.</li>
</ul>

<h3>Sources</h3>
<ul>
  <li><a href="https://codemirror.net/">CodeMirror 6</a></li>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea">MDN — textarea element</a></li>
</ul>

<h2>Responsiveness</h2>
<ul>
  <li>Editor fills container width; height is configurable via the <code>height</code> prop.</li>
  <li>Line wrapping can be enabled for narrow viewports.</li>
  <li>Touch input supported on mobile devices.</li>
</ul>

<h2>Customization</h2>
<ul>
  <li>Theme selection via <code>theme</code> prop (light, one-dark, dracula, nord, etc.).</li>
  <li>Language via <code>language</code> prop.</li>
  <li>CDN source via <code>cdnSource</code> prop (esm.sh, jsdelivr, unpkg).</li>
  <li>Height via <code>height</code> prop.</li>
</ul>

<h2>Examples</h2>

<h3>JavaScript Editor</h3>
<ExampleTabs code={`<CodeEditor
  code="const greeting = 'Hello, World!';"
  language="javascript"
  theme="light"
  height="300px"
/>`}>
  <div data-testid="code-editor-javascript">
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
</ExampleTabs>

<h3>Python Editor</h3>
<ExampleTabs code={`<CodeEditor
  code="def hello_world(): print('Hello!')"
  language="python"
  theme="light"
  height="300px"
/>`}>
  <div data-testid="code-editor-python">
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
</ExampleTabs>

<h3>Dark Theme (One Dark)</h3>
<ExampleTabs code={`<CodeEditor
  code="const x = 42;"
  language="javascript"
  theme="one-dark"
  height="300px"
/>`}>
  <div data-testid="code-editor-one-dark">
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
</ExampleTabs>

<h3>Dracula Theme (TypeScript)</h3>
<ExampleTabs code={`<CodeEditor
  code="interface User { id: number; name: string; }"
  language="typescript"
  theme="dracula"
  height="300px"
/>`}>
  <div data-testid="code-editor-dracula">
    <CodeEditor
      code={`interface User {
  id: number;
  name: string;
  email: string;
}

const user: User = {
  id: 1,
  name: "Sarah Chen",
  email: "sarah.chen@acme.io"
};`}
      language="typescript"
      theme="dracula"
      height="300px"
    />
  </div>
</ExampleTabs>

<h2>Supported Languages</h2>
<p>JavaScript, TypeScript, Python, HTML, CSS, JSON, XML, Markdown, SQL, Java, C++, Rust, Go, PHP, Vue, and Svelte.</p>

<h2>Supported Themes</h2>
<p>light (default), one-dark, dracula, material-dark, nord, solarized-light, solarized-dark, sublime, ayu-light, ayu-dark.</p>

<h2>CDN Sources</h2>
<ul>
  <li><strong>esm.sh</strong> (default) — fast and reliable ESM CDN.</li>
  <li><strong>jsdelivr</strong> — popular CDN with global distribution.</li>
  <li><strong>unpkg</strong> — fast global content delivery for npm packages.</li>
</ul>

<h2>Props</h2>
<PropsTable component={CodeEditorModule} />

<h2>Accessibility</h2>
<ul>
  <li>Keyboard navigation support through CodeMirror.</li>
  <li>Screen reader compatible.</li>
  <li>Proper semantic HTML structure.</li>
  <li>High contrast theme options available.</li>
</ul>
</Container>

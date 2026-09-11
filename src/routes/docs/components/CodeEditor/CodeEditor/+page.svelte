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
import { m } from "$lib/paraglide/messages.js"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
<h1>{m.ce_heading()}</h1>

<p>{m.ce_intro_1()}</p>

<h2>{m.sec_what_when_why()}</h2>

<h3>{m.sec_what()}</h3>
<p>{m.ce_what_1()}</p>

<h3>{m.sec_when()}</h3>
<p>
  {m.ce_when_1()}<code>&lt;CodeEditor&gt;</code>{m.ce_when_2()}<code>&lt;CodeBlock&gt;</code>{m.ce_when_3()}
</p>

<h3>{m.sec_why()}</h3>
<ul>
  <li><strong>{m.ce_why_dynamic()}</strong>{m.ce_why_dynamic_desc()}</li>
  <li><strong>{m.ce_why_langs()}</strong>{m.ce_why_langs_desc()}</li>
  <li><strong>{m.ce_why_themes()}</strong>{m.ce_why_themes_desc()}</li>
  <li><strong>{m.ce_why_features()}</strong>{m.ce_why_features_desc()}</li>
</ul>

<h3>{m.sec_sources()}</h3>
<ul>
  <li><a href="https://codemirror.net/">CodeMirror 6</a></li>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea">MDN — textarea element</a></li>
</ul>


<h2>{m.sec_implementation()}</h2>
<ul>
  <li>{m.ce_impl_1()}</li>
  <li>{m.ce_impl_2()}</li>
  <li>{m.ce_impl_3()}</li>
</ul>

<h2>{m.sec_mistakes()}</h2>
<ul>
  <li>{m.ce_mistake_1()}</li>
</ul>

<h2>{m.sec_related()}</h2>
<p>{m.ce_related_1()}</p>

<h2>{m.sec_responsiveness()}</h2>
<ul>
  <li>{m.ce_responsive_1_1()}<code>height</code>{m.ce_responsive_1_2()}</li>
  <li>{m.ce_responsive_2()}</li>
  <li>{m.ce_responsive_3()}</li>
</ul>

<h2>{m.sec_customization()}</h2>
<ul>
  <li>{m.ce_custom_1_1()}<code>theme</code>{m.ce_custom_1_2()}</li>
  <li>{m.ce_custom_2_1()}<code>language</code>{m.ce_custom_2_2()}</li>
  <li>{m.ce_custom_3_1()}<code>cdnSource</code>{m.ce_custom_3_2()}</li>
  <li>{m.ce_custom_4_1()}<code>height</code>{m.ce_custom_4_2()}</li>
</ul>

<h2>{m.sec_examples()}</h2>

<h3>{m.ce_ex_js()}</h3>
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

<h3>{m.ce_ex_python()}</h3>
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

<h3>{m.ce_ex_one_dark()}</h3>
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

<h3>{m.ce_ex_dracula()}</h3>
<p>{m.ce_dracula_note()}</p>
<ExampleTabs code={`<CodeEditor
  code="const x = 42;"
  language="javascript"
  theme="dracula"
  height="300px"
/>`}>
  <div data-testid="code-editor-dracula-builtin">
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

<h3>{m.ce_ex_auto_dark()}</h3>
<p>
  {m.ce_auto_dark_note_1()}<code>.dark</code>{m.ce_auto_dark_note_2()}<code>&lt;html&gt;</code>{m.ce_auto_dark_note_3()}<code>theme=&quot;light&quot;</code>{m.ce_auto_dark_note_4()}
</p>
<ExampleTabs code={`<CodeEditor
  code="const x = 42;"
  language="javascript"
  theme="light"
  height="300px"
/>`}>
  <div data-testid="code-editor-auto-dark">
    <CodeEditor
      code={`// This editor auto-adapts to dark mode
function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet('World'));`}
      language="javascript"
      theme="light"
      height="300px"
    />
  </div>
</ExampleTabs>



<h2>{m.ce_supported_heading()}</h2>
<p>{m.ce_supported_body()}</p>

<h2>{m.ce_themes_heading()}</h2>
<table>
  <thead><tr><th>{m.ce_themes_th_theme()}</th><th>{m.ce_themes_th_type()}</th><th>{m.ce_themes_th_notes()}</th></tr></thead>
  <tbody>
    <tr><td><code>light</code></td><td>{m.ce_theme_type_default()}</td><td>{m.ce_theme_light_notes()}</td></tr>
    <tr><td><code>one-dark</code></td><td>{m.ce_theme_type_local()}</td><td>{m.ce_theme_one_dark_notes_1()}<code>@codemirror/theme-one-dark</code>{m.ce_theme_one_dark_notes_2()}</td></tr>
    <tr><td><code>dracula</code></td><td>{m.ce_theme_type_builtin()}</td><td>{m.ce_theme_dracula_notes()}</td></tr>
    <tr><td><code>material-dark</code></td><td>{m.ce_theme_type_builtin()}</td><td>{m.ce_theme_material_notes()}</td></tr>
    <tr><td><code>nord</code></td><td>{m.ce_theme_type_builtin()}</td><td>{m.ce_theme_nord_notes()}</td></tr>
    <tr><td><code>solarized-dark</code></td><td>{m.ce_theme_type_builtin()}</td><td>{m.ce_theme_solarized_notes()}</td></tr>
    <tr><td><code>ayu-dark</code></td><td>{m.ce_theme_type_builtin()}</td><td>{m.ce_theme_ayu_notes()}</td></tr>
  </tbody>
</table>
<p>
  {m.ce_themes_footnote_1()}<code>@codemirror/state</code>{m.ce_themes_footnote_2()}<code>one-dark</code>{m.ce_themes_footnote_3()}
</p>

<h2>{m.ce_cdn_heading()}</h2>
<ul>
  <li><strong>esm.sh</strong>{m.ce_cdn_1()}</li>
  <li><strong>jsdelivr</strong>{m.ce_cdn_2()}</li>
  <li><strong>unpkg</strong>{m.ce_cdn_3()}</li>
</ul>

<h2>{m.sec_props()}</h2>
<PropsTable component={CodeEditorModule} />

<h2>{m.sec_accessibility()}</h2>
<ul>
  <li>{m.ce_a11y_1()}</li>
  <li>{m.ce_a11y_2()}</li>
  <li>{m.ce_a11y_3()}</li>
  <li>{m.ce_a11y_4()}</li>
</ul>
</Container>

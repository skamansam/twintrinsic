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
import { m } from "$lib/paraglide/messages.js"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
<h1>{m.cbs_heading()}</h1>

<p>{m.cbs_intro_1()}</p>

<h2>{m.sec_what_when_why()}</h2>

<h3>{m.sec_what()}</h3>
<p>{m.cbs_what_1()}</p>

<h3>{m.sec_when()}</h3>
<p>
  {m.cbs_when_1()}<code>&lt;CodeBlockSpeed&gt;</code>{m.cbs_when_2()}<code>&lt;CodeEditor&gt;</code>{m.cbs_when_3()}
</p>

<h3>{m.sec_why()}</h3>
<ul>
  <li><strong>{m.cbs_why_bundle()}</strong>{m.cbs_why_bundle_desc()}</li>
  <li><strong>{m.cbs_why_faster()}</strong>{m.cbs_why_faster_desc()}</li>
  <li><strong>{m.cbs_why_auto()}</strong>{m.cbs_why_auto_desc()}</li>
  <li><strong>{m.cbs_why_time()}</strong>{m.cbs_why_time_desc()}</li>
</ul>

<h3>{m.sec_sources()}</h3>
<ul>
  <li><a href="https://SpeedHighlight.dev/">Speed Highlight</a></li>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/pre">MDN — pre element</a></li>
</ul>

<h2>{m.sec_responsiveness()}</h2>
<ul>
  <li>{m.cbs_responsive_1()}</li>
  <li>{m.cbs_responsive_2()}</li>
</ul>

<h2>{m.sec_customization()}</h2>
<ul>
  <li>{m.cbs_custom_1_1()}<code>language</code>{m.cbs_custom_1_2()}</li>
  <li>{m.cbs_custom_2()}</li>
  <li>{m.cbs_custom_3_1()}<code>showRenderTime</code>{m.cbs_custom_3_2()}</li>
</ul>

<h2>{m.sec_examples()}</h2>

<h3>{m.cbs_ex_js()}</h3>
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

<h3>{m.cbs_ex_ts()}</h3>
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

<h3>{m.cbs_ex_python()}</h3>
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

<h3>{m.cbs_ex_render_time()}</h3>
<ExampleTabs code={`<CodeBlockSpeed language="js" showRenderTime={true}>
  const greeting = "Hello!";
</CodeBlockSpeed>`}>
  <CodeBlockSpeed language="js" showRenderTime={true} data-testid="codeblockspeed-render-time">
    {`const greeting = "Hello, Speed Highlight!";
console.log(greeting);`}
  </CodeBlockSpeed>
</ExampleTabs>

<h3>{m.cbs_ex_auto()}</h3>
<ExampleTabs code={`<CodeBlockSpeed>
  // Language auto-detected from code patterns
  const greeting = "Hello!";
</CodeBlockSpeed>`}>
  <CodeBlockSpeed data-testid="codeblockspeed-auto-detect">
    {`const greeting = "Hello, Speed Highlight!";
console.log(greeting);`}
  </CodeBlockSpeed>
</ExampleTabs>

<h2>{m.cbs_supported_heading()}</h2>
<p>{m.cbs_supported_body()}</p>

<h2>{m.cbs_render_heading()}</h2>
<p>
  {m.cbs_render_body_1()}<code>showRenderTime</code>{m.cbs_render_body_2()}
</p>

<h2>{m.cbs_comparison_heading()}</h2>

<p>{m.cbs_comparison_lead()}</p>

<h3>{m.cbs_ex_side_by_side()}</h3>
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

<h3>{m.cbs_ex_feature_compare()}</h3>
<table>
  <thead><tr><th>{m.cbs_table_th_feature()}</th><th>{m.cbs_table_th_prism()}</th><th>{m.cbs_table_th_speed()}</th></tr></thead>
  <tbody>
    <tr><td>{m.cbs_row_bundle()}</td><td>{m.cbs_row_bundle_prism()}</td><td>{m.cbs_row_bundle_speed()}</td></tr>
    <tr><td>{m.cbs_row_perf()}</td><td>{m.cbs_row_perf_prism()}</td><td>{m.cbs_row_perf_speed()}</td></tr>
    <tr><td>{m.cbs_row_lang()}</td><td>{m.cbs_row_lang_prism()}</td><td>{m.cbs_row_lang_speed()}</td></tr>
    <tr><td>{m.cbs_row_copy()}</td><td>✓</td><td>✓</td></tr>
    <tr><td>{m.cbs_row_time()}</td><td>{m.cbs_row_grid()}</td><td>✓</td></tr>
    <tr><td>{m.cbs_row_auto()}</td><td>{m.cbs_row_auto_prism()}</td><td>✓</td></tr>
    <tr><td>{m.cbs_row_lines()}</td><td>{m.cbs_row_lines_prism()}</td><td>{m.cbs_row_grid_speed()}</td></tr>
  </tbody>
</table>

<h3>{m.cbs_ex_when_which()}</h3>
<ul>
  <li><strong>CodeBlockSpeed</strong> — {m.cbs_when_which_speed()}</li>
  <li><strong>CodeBlock</strong> — {m.cbs_when_which_prism()}</li>
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

<h2>{m.sec_props()}</h2>
<PropsTable component={CodeBlockSpeedModule} />

<h2>{m.sec_accessibility()}</h2>
<ul>
  <li>{m.cbs_a11y_1_0()}<code>&lt;pre&gt;</code>{m.cbs_a11y_1_1()}<code>&lt;code&gt;</code>{m.cbs_a11y_1_2()}</li>
  <li>{m.cbs_a11y_2_0()}<code>aria-label</code>{m.cbs_a11y_2_1()}</li>
  <li>{m.cbs_a11y_3()}</li>
  <li>{m.cbs_a11y_4()}</li>
  <li>{m.cbs_a11y_5()}</li>
</ul>
</Container>

<!--
@component
Progress documentation page — standardized structure
-->
<script lang="ts">
import Container from "$lib/components/Container/Container.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import Progress from "$lib/components/Progress/Progress.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as ProgressModule from "$lib/components/Progress/Progress.svelte"
import { m } from "$lib/paraglide/messages.js"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>{m.progress_heading()}</h1>

  <p>
    <strong>{m.progress_heading()}</strong>{m.progress_intro_1()}<code>&lt;progress&gt;</code>{m.progress_intro_2()}
  </p>

  <h2>{m.sec_what_when_why()}</h2>

  <h3>{m.sec_what()}</h3>
  <p>
    {m.progress_what_1()}<code>&lt;progress&gt;</code>{m.progress_what_2()}
  </p>

  <h3>{m.sec_when()}</h3>
  <p>
    {m.progress_when_1()}<code>&lt;Progress&gt;</code>{m.progress_when_2()}<code>indeterminate</code>{m.progress_when_3()}<code>&lt;Skeleton&gt;</code>{m.progress_when_4()}
  </p>

  <h3>{m.sec_why()}</h3>
  <ul>
    <li><strong>{m.progress_why_native_1()}<code>&lt;progress&gt;</code></strong>{m.progress_why_native_2()}<code>role="progressbar"</code>{m.progress_why_native_3()}<code>aria-valuenow</code>{m.progress_why_native_4()}<code>aria-valuemin</code>{m.progress_why_native_5()}<code>aria-valuemax</code>{m.progress_why_native_6()}</li>
    <li><strong>{m.progress_why_variants()}</strong>{m.progress_why_variants_desc()}</li>
    <li><strong>{m.progress_why_indeterminate()}</strong>{m.progress_why_indeterminate_desc()}</li>
  </ul>

  <h3>{m.sec_sources()}</h3>
  <ul>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress">MDN — &lt;progress&gt; element</a></li>
    <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/meter/">WAI-ARIA APG — Meter</a></li>
    <li><a href="https://m3.material.io/components/progress-indicators/overview">Material Design 3 — Linear progress</a></li>
    <li><a href="https://primer.style/components/progress">Primer — ProgressBar</a></li>
    <li><a href="https://ant.design/components/progress">Ant Design — Progress</a></li>
  </ul>

<h2>{m.sec_implementation()}</h2>
<ul>
  <li>{m.progress_impl_1_1()}<code>&lt;progress&gt;</code>{m.progress_impl_1_2()}<code>aria-valuenow/min/max</code></li>
  <li>{m.progress_impl_2_1()}<code>accent-color</code></li>
  <li>{m.progress_impl_3_1()}<code>value</code>{m.progress_impl_3_2()}</li>
  <li><code>&lt;meter&gt;</code>{m.progress_impl_4_2()}</li>
</ul>

<h2>{m.sec_mistakes()}</h2>
<ul>
  <li>{m.progress_mistake_1_0()}<code>&lt;div&gt;</code>{m.progress_mistake_1_1()}<code>&lt;progress&gt;</code>{m.progress_mistake_1_2()}</li>
  <li>{m.progress_mistake_2_0()}<code>&lt;progress&gt;</code>{m.progress_mistake_2_1()}<code>&lt;meter&gt;</code>{m.progress_mistake_2_2()}</li>
</ul>

<h2>{m.sec_related()}</h2>
<p>{m.progress_related_1()}</p>

<h2>{m.sec_responsiveness()}</h2>
  <ul>
    <li>{m.progress_responsive_1()}</li>
    <li>{m.progress_responsive_2()}</li>
    <li>{m.progress_responsive_3()}</li>
  </ul>

  <h2>{m.sec_customization()}</h2>
  <ul>
    <li>{m.progress_custom_1_1()}<code>primary</code>{m.progress_custom_1_2()}<code>success</code>{m.progress_custom_1_3()}<code>warning</code>{m.progress_custom_1_4()}<code>error</code>{m.progress_custom_1_5()}<code>info</code>{m.progress_custom_1_6()}<code>default</code>{m.progress_custom_1_7()}</li>
    <li>{m.progress_custom_2_1()}<code>sm</code>{m.progress_custom_2_2()}<code>md</code>{m.progress_custom_2_3()}<code>lg</code>{m.progress_custom_2_4()}</li>
    <li>{m.progress_custom_3()}</li>
    <li>{m.progress_custom_4_1()}<code>format</code>{m.progress_custom_4_2()}</li>
  </ul>

  <h2>{m.sec_examples()}</h2>

  <h3>{m.progress_ex_basic()}</h3>
  <ExampleTabs code={`<Progress value={75} />`}>
    <div data-testid="progress-basic">
      <Progress value={75} />
    </div>
  </ExampleTabs>

  <h3>{m.progress_ex_value()}</h3>
  <ExampleTabs code={`<Progress value={42} showValue />`}>
    <div data-testid="progress-with-value">
      <Progress value={42} showValue />
    </div>
  </ExampleTabs>

  <h3>{m.progress_ex_variants()}</h3>
  <ExampleTabs code={`<Progress value={60} variant="primary" />
<Progress value={80} variant="success" />
<Progress value={50} variant="warning" />
<Progress value={30} variant="error" />`}>
    <div class="space-y-4" data-testid="progress-variants">
      <div>
        <p class="text-sm font-medium mb-2">Primary</p>
        <Progress value={60} variant="primary" />
      </div>
      <div>
        <p class="text-sm font-medium mb-2">Success</p>
        <Progress value={80} variant="success" />
      </div>
      <div>
        <p class="text-sm font-medium mb-2">Warning</p>
        <Progress value={50} variant="warning" />
      </div>
      <div>
        <p class="text-sm font-medium mb-2">Error</p>
        <Progress value={30} variant="error" />
      </div>
    </div>
  </ExampleTabs>

  <h3>{m.progress_ex_sizes()}</h3>
  <ExampleTabs code={`<Progress value={70} size="sm" />
<Progress value={70} size="md" />
<Progress value={70} size="lg" />`}>
    <div class="space-y-4" data-testid="progress-sizes">
      <div>
        <p class="text-sm font-medium mb-2">Small</p>
        <Progress value={70} size="sm" />
      </div>
      <div>
        <p class="text-sm font-medium mb-2">Medium</p>
        <Progress value={70} size="md" />
      </div>
      <div>
        <p class="text-sm font-medium mb-2">Large</p>
        <Progress value={70} size="lg" />
      </div>
    </div>
  </ExampleTabs>

  <h3>{m.progress_ex_striped()}</h3>
  <ExampleTabs code={`<Progress value={65} striped />
<Progress value={65} striped animated />`}>
    <div class="space-y-4" data-testid="progress-striped">
      <Progress value={65} striped />
      <Progress value={65} striped animated />
    </div>
  </ExampleTabs>

  <h3>{m.progress_ex_indeterminate()}</h3>
  <ExampleTabs code={`<Progress indeterminate />`}>
    <div data-testid="progress-indeterminate">
      <Progress indeterminate />
    </div>
  </ExampleTabs>

  <h3>{m.progress_ex_custom()}</h3>
  <ExampleTabs code={`<Progress
  value={0.8}
  max={1}
  showValue
  format={(v) => \`\${Math.round(v * 100)}%\`}
/>`}>
    <div data-testid="progress-custom-format">
      <Progress
        value={0.8}
        max={1}
        showValue
        format={(v: number) => `${Math.round(v * 100)}%`}
      />
    </div>
  </ExampleTabs>

  <h2>{m.sec_props()}</h2>
  <PropsTable component={ProgressModule} />

  <h2>{m.sec_accessibility()}</h2>
  <ul>
    <li>{m.progress_a11y_1_0()}<code>&lt;progress&gt;</code>{m.progress_a11y_1_1()}<code>role="progressbar"</code>{m.progress_a11y_1_2()}</li>
    <li>{m.progress_a11y_2_0()}<code>aria-valuenow</code>{m.progress_a11y_2_1()}<code>aria-valuemin</code>{m.progress_a11y_2_2()}<code>aria-valuemax</code>{m.progress_a11y_2_3()}</li>
    <li>{m.progress_a11y_3_0()}<code>aria-label</code>{m.progress_a11y_3_1()}</li>
    <li>{m.progress_a11y_4()}</li>
  </ul>

  <h2>{m.sec_keyboard()}</h2>
  <p>{m.progress_kb_note()}</p>
</Container>

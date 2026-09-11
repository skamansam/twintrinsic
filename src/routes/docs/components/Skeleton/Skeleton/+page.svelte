<!--
@component
Skeleton documentation page — standardized structure
-->
<script lang="ts">
import Container from "$lib/components/Container/Container.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import Skeleton from "$lib/components/Skeleton/Skeleton.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as SkeletonModule from "$lib/components/Skeleton/Skeleton.svelte"
import { m } from "$lib/paraglide/messages.js"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>{m.skeleton_heading()}</h1>

  <p>
    <strong>{m.skeleton_heading()}</strong>{m.skeleton_intro_1()}<code>@starting-style</code>{m.skeleton_intro_2()}
  </p>

  <h2>{m.sec_what_when_why()}</h2>

  <h3>{m.sec_what()}</h3>
  <p>{m.skeleton_what_1()}</p>

  <h3>{m.sec_when()}</h3>
  <p>
    {m.skeleton_when_1()}<code>&lt;Skeleton&gt;</code>{m.skeleton_when_2()}<code>&lt;Progress&gt;</code>{m.skeleton_when_3()}
  </p>

  <h3>{m.sec_why()}</h3>
  <ul>
    <li><strong>{m.skeleton_why_stability()}</strong>{m.skeleton_why_stability_desc()}</li>
    <li><strong>{m.skeleton_why_perceived()}</strong>{m.skeleton_why_perceived_desc()}</li>
    <li><strong>{m.skeleton_why_css()}</strong>{m.skeleton_why_css_desc_1()}<code>@starting-style</code>{m.skeleton_why_css_desc_2()}</li>
    <li><strong>{m.skeleton_why_render()}</strong> — <code>content-visibility: auto</code>{m.skeleton_why_render_desc()}</li>
  </ul>

  <h3>{m.sec_sources()}</h3>
  <ul>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/Performance/Cumulative_layout_shift">MDN — CLS</a></li>
    <li><a href="https://m3.material.io/components/skeleton/overview">Material Design 3 — Skeleton</a></li>
    <li><a href="https://primer.style/components/skeleton-loader">Primer — SkeletonLoader</a></li>
    <li><a href="https://ant.design/components/skeleton">Ant Design — Skeleton</a></li>
    <li><a href="https://web.dev/articles/content-visibility">web.dev — content-visibility</a></li>
  </ul>

<h2>{m.sec_implementation()}</h2>
<ul>
  <li>{m.skeleton_impl_1_1()}<code>@keyframes</code>{m.skeleton_impl_1_2()}<code>@property</code>{m.skeleton_impl_1_3()}</li>
  <li><code>@starting-style</code>{m.skeleton_impl_2_1()}</li>
  <li><code>content-visibility: auto</code>{m.skeleton_impl_3_1()}</li>
  <li><code>aria-busy=&quot;true&quot;</code>{m.skeleton_impl_4_1()}<code>aria-live=&quot;polite&quot;</code>{m.skeleton_impl_4_2()}</li>
  <li><code>transition-behavior: allow-discrete</code>{m.skeleton_impl_5_1()}</li>
</ul>

<h2>{m.sec_mistakes()}</h2>
<ul>
  <li>{m.skeleton_mistake_1()}</li>
  <li>{m.skeleton_mistake_2_0()}<code>aria-busy=&quot;true&quot;</code>{m.skeleton_mistake_2_1()}</li>
</ul>

<h2>{m.sec_related()}</h2>
<p>{m.skeleton_related_1()}</p>

<h2>{m.sec_responsiveness()}</h2>
  <ul>
    <li>{m.skeleton_responsive_1_0()}<code>100%</code>{m.skeleton_responsive_1_1()}</li>
    <li>{m.skeleton_responsive_2_0()}<code>size</code>{m.skeleton_responsive_2_1()}</li>
    <li>{m.skeleton_responsive_3()}</li>
  </ul>

  <h2>{m.sec_customization()}</h2>
  <ul>
    <li>{m.skeleton_custom_1_1()}<code>text</code>{m.skeleton_custom_1_2()}<code>rectangle</code>{m.skeleton_custom_1_3()}<code>circle</code>{m.skeleton_custom_1_4()}<code>rounded</code>{m.skeleton_custom_1_5()}</li>
    <li>{m.skeleton_custom_2()}</li>
    <li>{m.skeleton_custom_3_0()}<code>lines</code>{m.skeleton_custom_3_1()}</li>
    <li>{m.skeleton_custom_4_0()}<code>animated=&#123;false&#125;</code>{m.skeleton_custom_4_1()}</li>
  </ul>

  <h2>{m.sec_examples()}</h2>

  <h3>{m.skeleton_ex_basic()}</h3>
  <ExampleTabs code={`<Skeleton width="100%" height="20px" />`}>
    <div data-testid="skeleton-basic">
      <Skeleton width="100%" height="20px" />
    </div>
  </ExampleTabs>

  <h3>{m.skeleton_ex_variants()}</h3>
  <ExampleTabs code={`<Skeleton variant="rectangle" width="100%" height="100px" />
<Skeleton variant="circle" size="48px" />
<Skeleton variant="rounded" width="100%" height="60px" />
<Skeleton variant="text" width="100%" />`}>
    <div class="space-y-4" data-testid="skeleton-variants">
      <div>
        <p class="text-sm text-muted mb-2">Rectangle (default)</p>
        <Skeleton variant="rectangle" width="100%" height="100px" />
      </div>
      <div>
        <p class="text-sm text-muted mb-2">Circle</p>
        <Skeleton variant="circle" size="48px" />
      </div>
      <div>
        <p class="text-sm text-muted mb-2">Rounded</p>
        <Skeleton variant="rounded" width="100%" height="60px" />
      </div>
      <div>
        <p class="text-sm text-muted mb-2">Text</p>
        <Skeleton variant="text" width="100%" />
      </div>
    </div>
  </ExampleTabs>

  <h3>{m.skeleton_ex_multiline()}</h3>
  <ExampleTabs code={`<Skeleton variant="text" lines={3} />`}>
    <div data-testid="skeleton-multi-line">
      <Skeleton variant="text" lines={3} />
    </div>
  </ExampleTabs>

  <h3>{m.skeleton_ex_pattern()}</h3>
  <ExampleTabs code={`<div class="flex gap-4">
  <Skeleton variant="circle" size="48px" />
  <div class="flex-1">
    <Skeleton variant="text" width="60%" />
    <Skeleton variant="text" width="80%" />
  </div>
</div>`}>
    <div class="flex gap-4" data-testid="skeleton-loading-pattern">
      <Skeleton variant="circle" size="48px" />
      <div class="flex-1">
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" width="80%" />
      </div>
    </div>
  </ExampleTabs>

  <h3>{m.skeleton_ex_static()}</h3>
  <ExampleTabs code={`<Skeleton width="100%" height="20px" animated={false} />`}>
    <div data-testid="skeleton-static">
      <Skeleton width="100%" height="20px" animated={false} />
    </div>
  </ExampleTabs>

  <h2>{m.sec_props()}</h2>
  <PropsTable component={SkeletonModule} />

  <h2>{m.sec_accessibility()}</h2>
  <ul>
    <li>{m.skeleton_a11y_1_0()}<code>role="status"</code>{m.skeleton_a11y_1_1()}</li>
    <li>{m.skeleton_a11y_2_0()}<code>aria-label</code>{m.skeleton_a11y_2_1()}</li>
    <li>{m.skeleton_a11y_3()}</li>
    <li>{m.skeleton_a11y_4_0()}<code>aria-hidden="true"</code>{m.skeleton_a11y_4_1()}</li>
  </ul>

  <h2>{m.sec_keyboard()}</h2>
  <p>{m.skeleton_kb_note()}</p>
</Container>

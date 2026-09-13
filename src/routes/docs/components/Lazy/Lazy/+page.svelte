<!--
@component
Lazy documentation page — standardized structure
-->
<script lang="ts">
import Container from "$lib/components/Container/Container.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import Lazy from "$lib/components/Lazy/Lazy.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as LazyModule from "$lib/components/Lazy/Lazy.svelte"
import { m } from "$lib/paraglide/messages.js"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>{m.lazy_heading()}</h1>

  <p>
    <strong>{m.lazy_heading()}</strong>{m.lazy_intro_1()}<code>IntersectionObserver</code>{m.lazy_intro_2()}
  </p>

  <h2>{m.sec_what_when_why()}</h2>

  <h3>{m.sec_what()}</h3>
  <p>
    {m.lazy_what_1()}<code>IntersectionObserver</code>{m.lazy_what_2()}<code>IntersectionObserver</code>{m.lazy_what_3()}
  </p>

  <h3>{m.sec_when()}</h3>
  <p>
    {m.lazy_when_1()}<code>&lt;Lazy&gt;</code>{m.lazy_when_2()}<code>&lt;LazyPanel&gt;</code>{m.lazy_when_3()}
  </p>

  <h3>{m.sec_why()}</h3>
  <ul>
    <li><strong>{m.lazy_why_perf()}</strong>{m.lazy_why_perf_desc()}</li>
    <li><strong>{m.lazy_why_scroll()}</strong>{m.lazy_why_scroll_desc()}</li>
    <li><strong>{m.lazy_why_fallback()}</strong>{m.lazy_why_fallback_desc()}</li>
  </ul>

  <h3>{m.sec_sources()}</h3>
  <ul>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API">MDN — IntersectionObserver</a></li>
    <li><a href="https://web.dev/articles/content-visibility">web.dev — content-visibility</a></li>
    <li><a href="https://primer.style/components/blankslate">Primer — Blankslate</a></li>
    <li><a href="https://ant.design/components/skeleton">Ant Design — Skeleton</a></li>
    <li><a href="https://www.w3.org/TR/intersection-observer/">W3C — IntersectionObserver</a></li>
  </ul>

<h2>{m.sec_implementation()}</h2>
<ul>
  <li>{m.lazy_impl_1()}</li>
  <li>{m.lazy_impl_2_1()}<code>&lt;img loading="lazy"&gt;</code>{m.lazy_impl_2_2()}</li>
  <li>{m.lazy_impl_3_1()}<code>content-visibility: auto</code>{m.lazy_impl_3_2()}</li>
  <li>{m.lazy_impl_4()}</li>
</ul>

<h2>{m.sec_mistakes()}</h2>
<ul>
  <li>{m.lazy_mistake_1_0()}<code>Intersection Observer</code>{m.lazy_mistake_1_1()}</li>
  <li>{m.lazy_mistake_2_0()}<code>content-visibility: auto</code>{m.lazy_mistake_2_1()}</li>
</ul>

<h2>{m.sec_related()}</h2>
<p>{m.lazy_related()}</p>

<h2>{m.sec_responsiveness()}</h2>
  <ul>
    <li>{m.lazy_responsive_1()}</li>
    <li>{m.lazy_responsive_2()}</li>
  </ul>

  <h2>{m.sec_customization()}</h2>
  <ul>
    <li>{m.lazy_custom_1_1()}<code>placeholder</code>{m.lazy_custom_1_2()}</li>
    <li>{m.lazy_custom_2_1()}<code>rootMargin</code>{m.lazy_custom_2_2()}</li>
  </ul>

  <h2>{m.sec_examples()}</h2>

  <h3>{m.lazy_ex_basic()}</h3>
  <ExampleTabs code={`<Lazy>
  <div class="p-8 bg-surface rounded-lg">
    <h3 class="font-medium">Monthly revenue chart</h3>
    <p class="mt-1 text-sm text-muted">Only rendered once it scrolls into view.</p>
  </div>
</Lazy>`}>
    <div class="border border-border rounded-md p-4" data-testid="lazy-basic">
      <Lazy>
        <div class="p-8 bg-surface rounded-lg">
          <h3 class="font-medium">Monthly revenue chart</h3>
          <p class="mt-1 text-sm text-muted">Only rendered once it scrolls into view.</p>
        </div>
      </Lazy>
    </div>
  </ExampleTabs>

  <h3>{m.lazy_ex_placeholder()}</h3>
  <ExampleTabs code={`<Lazy>
  {#snippet placeholder()}
    <p class="text-muted">Loading chart…</p>
  {/snippet}
  <div class="p-8 bg-surface rounded-lg">
    <h3 class="font-medium">Live analytics widget</h3>
    <p class="mt-1 text-sm text-muted">Deferred until visible.</p>
  </div>
</Lazy>`}>
    <div class="border border-border rounded-md p-4" data-testid="lazy-placeholder">
      <Lazy>
        {#snippet placeholder()}
          <p class="text-muted">Loading chart…</p>
        {/snippet}
        <div class="p-8 bg-surface rounded-lg">
          <h3 class="font-medium">Live analytics widget</h3>
          <p class="mt-1 text-sm text-muted">Deferred until visible to keep the page fast.</p>
        </div>
      </Lazy>
    </div>
  </ExampleTabs>

  <h2>{m.sec_props()}</h2>
  <PropsTable component={LazyModule} />

  <h2>{m.sec_accessibility()}</h2>
  <ul>
    <li>{m.lazy_a11y_1()}<code>IntersectionObserver</code>{m.lazy_a11y_2()}</li>
    <li>{m.lazy_a11y_3()}<code>aria-live="polite"</code>{m.lazy_a11y_4()}<code>aria-busy</code>{m.lazy_a11y_5()}</li>
    <li>{m.lazy_a11y_6()}</li>
  </ul>

  <h2>{m.sec_keyboard()}</h2>
  <p>{m.lazy_kb()}</p>
</Container>

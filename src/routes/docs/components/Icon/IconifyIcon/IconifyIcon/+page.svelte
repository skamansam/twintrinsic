<!--
@component
IconifyIcon documentation page — standardized structure
-->
<script lang="ts">
import Container from "$lib/components/Container/Container.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import Icon from "$lib/components/Icon/Icon.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as IconModule from "$lib/components/Icon/Icon.svelte"
import { m } from "$lib/paraglide/messages.js"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>{m.iconify_heading()}</h1>

  <p>
    <strong>{m.iconify_heading()}</strong>{m.iconify_lede_1()}<code>&lt;Icon&gt;</code>{m.iconify_lede_2()}
  </p>

  <h2>{m.sec_what_when_why()}</h2>

  <h3>{m.sec_what()}</h3>
  <p>
    {m.iconify_what_1()}<code>&lt;Icon&gt;</code>{m.iconify_what_2()}<code>&lt;Icon&gt;</code>{m.iconify_what_3()}
  </p>

  <h3>{m.sec_when()}</h3>
  <p>
    {m.iconify_when_1()}<code>&lt;Icon&gt;</code>{m.iconify_when_2()}<code>IconifyIcon</code>{m.iconify_when_3()}
  </p>

  <h3>{m.sec_why()}</h3>
  <ul>
    <li><strong>{m.iconify_why_cdn()}</strong>{m.iconify_why_cdn_1()}</li>
    <li><strong>{m.iconify_why_cache()}</strong>{m.iconify_why_cache_1()}</li>
    <li><strong>{m.iconify_why_config()}</strong>{m.iconify_why_config_1()}</li>
  </ul>

  <h3>{m.sec_sources()}</h3>
  <ul>
    <li><a href="https://iconify.design/">Iconify</a></li>
    <li><a href="https://iconify.design/docs/api/">Iconify API</a></li>
    <li><a href="https://icon-sets.iconify.design/">Icon Sets Browser</a></li>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Basic_Shapes">MDN — SVG</a></li>
    <li><a href="https://primer.style/components/octicon">Primer — Octicon</a></li>
  </ul>

  <h2>{m.sec_responsiveness()}</h2>
  <ul>
    <li>{m.iconify_responsive_1_1()}<code>width</code>{m.iconify_responsive_1_2()}<code>height</code>{m.iconify_responsive_1_3()}</li>
    <li>{m.iconify_responsive_2()}</li>
  </ul>

  <h2>{m.sec_customization()}</h2>
  <ul>
    <li>{m.iconify_custom_1_1()}<code>name</code>{m.iconify_custom_1_2()}</li>
    <li>{m.iconify_custom_2_1()}<code>iconset</code>{m.iconify_custom_2_2()}</li>
    <li>{m.iconify_custom_3_1()}<code>color</code>{m.iconify_custom_3_2()}</li>
    <li>{m.iconify_custom_4_1()}<code>rotate</code>{m.iconify_custom_4_2()}</li>
    <li>{m.iconify_custom_5_1()}<code>hFlip</code>{m.iconify_custom_5_2()}<code>vFlip</code>{m.iconify_custom_5_3()}</li>
  </ul>

  <h2>{m.sec_examples()}</h2>

  <h3>{m.iconify_ex_basic()}</h3>
  <ExampleTabs code={`<Icon name="home" />
<Icon name="settings" />
<Icon name="star" />`}>
    <div class="flex gap-4 items-center text-2xl" data-testid="iconify-basic">
      <Icon name="home" />
      <Icon name="settings" />
      <Icon name="star" />
    </div>
  </ExampleTabs>

  <h3>{m.iconify_ex_iconsets()}</h3>
  <ExampleTabs code={`<Icon name="home" />
<Icon name="star" iconset="fa" />
<Icon name="heart" iconset="heroicons" />
<Icon name="search" iconset="tabler" />`}>
    <div class="flex gap-6 items-center flex-wrap text-2xl" data-testid="iconify-iconsets">
      <div class="flex flex-col items-center gap-2">
        <Icon name="home" width="32px" height="32px" />
        <span class="text-xs text-muted">Default (mdi)</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <Icon name="star" iconset="fa" width="32px" height="32px" />
        <span class="text-xs text-muted">Font Awesome</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <Icon name="heart" iconset="heroicons" width="32px" height="32px" />
        <span class="text-xs text-muted">Heroicons</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <Icon name="search" iconset="tabler" width="32px" height="32px" />
        <span class="text-xs text-muted">Tabler</span>
      </div>
    </div>
  </ExampleTabs>

  <h2>{m.iconify_available()}</h2>
  <ul>
    <li><strong>mdi</strong> — Material Design Icons (4000+ icons)</li>
    <li><strong>mdi-light</strong> — Material Design Light Icons</li>
    <li><strong>fa</strong> — Font Awesome (1500+ icons)</li>
    <li><strong>heroicons</strong> — Heroicons (292 icons)</li>
    <li><strong>tabler</strong> — Tabler Icons (4000+ icons)</li>
    <li><strong>feather</strong> — Feather Icons (286 icons)</li>
    <li><strong>bi</strong> — Bootstrap Icons (2000+ icons)</li>
  </ul>
  <p>
    {m.iconify_browse_1()}
    <a href="https://icon-sets.iconify.design/" target="_blank">icon-sets.iconify.design</a>{m.iconify_browse_2()}
  </p>

  <h2>{m.sec_props}</h2>
  <PropsTable component={IconModule} />

  <h2>{m.sec_accessibility()}</h2>
  <ul>
    <li>{m.iconify_a11y_1()}</li>
    <li>{m.iconify_a11y_2()}</li>
    <li>{m.iconify_a11y_3()}</li>
    <li>{m.iconify_a11y_4()}</li>
  </ul>

  <h2>{m.sec_keyboard()}</h2>
  <p>{m.iconify_kb_1()}</p>
</Container>

<!--
@component
Icon documentation page — standardized structure
-->
<script lang="ts">
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
import { docsIcon } from "../../../componentIcons"
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
  <div class="flex flex-wrap items-center gap-3">
  <Icon name={docsIcon("Icon")} class="h-8 w-8 shrink-0 text-primary" aria-hidden="true" />
    <h1>{m.icon_heading()}</h1>
  </div>

  <p>
    <strong>{m.icon_heading()}</strong>{m.icon_lede_1()}
  </p>

  <h2>{m.sec_what_when_why()}</h2>

  <h3>{m.sec_what()}</h3>
  <p>
    {m.icon_what_1()}<code>setIconset()</code>{m.icon_what_2()}
  </p>

  <h3>{m.sec_when()}</h3>
  <p>
    {m.icon_when_1()}<code>&lt;Icon&gt;</code>{m.icon_when_2()}
  </p>

  <h3>{m.sec_why()}</h3>
  <ul>
    <li><strong>{m.icon_why_icons()}</strong>{m.icon_why_icons_1()}</li>
    <li><strong>{m.icon_why_ondemand()}</strong>{m.icon_why_ondemand_1()}</li>
    <li><strong>{m.icon_why_config()}</strong>{m.icon_why_config_1()}</li>
    <li><strong>{m.icon_why_preload()}</strong>{m.icon_why_preload_1()}<code>preloadIcons()</code>{m.icon_why_preload_2()}</li>
  </ul>

  <h3>{m.sec_sources()}</h3>
  <ul>
    <li><a href="https://iconify.design/">Iconify</a></li>
    <li><a href="https://icon-sets.iconify.design/">Icon Sets Browser</a></li>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Basic_Shapes">MDN — SVG</a></li>
    <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/">WAI-ARIA APG</a></li>
    <li><a href="https://primer.style/components/octicon">Primer — Octicon</a></li>
  </ul>

  <h2>{m.sec_implementation()}</h2>
  <ul>
    <li>{m.icon_impl_1()}</li>
    <li>{m.icon_impl_2()}</li>
    <li>{m.icon_impl_3()}</li>
    <li>{m.icon_impl_4()}</li>
    <li>{m.icon_impl_5()}</li>
  </ul>

  <h2>{m.sec_mistakes()}</h2>
  <ul>
    <li>{m.icon_mistake_1()}</li>
    <li>{m.icon_mistake_2()}</li>
  </ul>

  <h2>{m.sec_related()}</h2>
  <p>{m.icon_related_1()}</p>

  <h2>{m.sec_responsiveness()}</h2>
  <ul>
    <li>{m.icon_responsive_1_1()}<code>width</code>{m.icon_responsive_1_2()}<code>height</code>{m.icon_responsive_1_3()}</li>
    <li>{m.icon_responsive_2()}</li>
  </ul>

  <h2>{m.sec_customization()}</h2>
  <ul>
    <li>{m.icon_custom_1_1()}<code>name</code>{m.icon_custom_1_2()}</li>
    <li>{m.icon_custom_2_1()}<code>iconset</code>{m.icon_custom_2_2()}</li>
    <li>{m.icon_custom_3_1()}<code>color</code>{m.icon_custom_3_2()}</li>
    <li>{m.icon_custom_4_1()}<code>width</code>{m.icon_custom_4_2()}<code>height</code>{m.icon_custom_4_3()}</li>
    <li>{m.icon_custom_5_1()}<code>rotate</code>{m.icon_custom_5_2()}</li>
    <li>{m.icon_custom_6_1()}<code>hFlip</code>{m.icon_custom_6_2()}<code>vFlip</code>{m.icon_custom_6_3()}</li>
  </ul>

  <h2>{m.sec_examples()}</h2>

  <h3>{m.icon_ex_basic()}</h3>
  <ExampleTabs code={`<Icon name="home" />
<Icon name="settings" />
<Icon name="star" />`}>
    <div class="flex gap-4 items-center text-2xl" data-testid="icon-basic">
      <Icon name="home" />
      <Icon name="settings" />
      <Icon name="star" />
    </div>
  </ExampleTabs>

  <h3>{m.icon_ex_iconsets()}</h3>
  <ExampleTabs code={`<Icon name="home" />
<Icon name="fa:home" />
<Icon name="heroicons:home" />
<Icon name="home" iconset="tabler" />`}>
    <div class="flex gap-6 items-center flex-wrap text-2xl" data-testid="icon-different-iconsets">
      <div class="flex flex-col items-center gap-2">
        <Icon name="home" width="32px" height="32px" />
        <span class="text-xs text-muted">Default (tabler)</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <Icon name="fa:home" width="32px" height="32px" />
        <span class="text-xs text-muted">Font Awesome</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <Icon name="heroicons:home" width="32px" height="32px" />
        <span class="text-xs text-muted">Heroicons</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <Icon name="home" iconset="tabler" width="32px" height="32px" />
        <span class="text-xs text-muted">Tabler</span>
      </div>
    </div>
  </ExampleTabs>

  <h3>{m.icon_ex_styled()}</h3>
  <ExampleTabs code={`<Icon name="home" color="red" />
<Icon name="settings" color="blue" width="32px" height="32px" />
<Icon name="star" color="var(--color-warning)" />
<Icon name="heart" color="pink" class="hover:scale-110 transition-transform" />`}>
    <div class="flex gap-6 items-center flex-wrap" data-testid="icon-styled">
      <div class="flex flex-col items-center gap-2">
        <Icon name="home" color="red" width="32px" height="32px" />
        <span class="text-xs text-muted">Red</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <Icon name="settings" color="blue" width="32px" height="32px" />
        <span class="text-xs text-muted">Blue</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <Icon name="star" color="var(--color-warning)" width="32px" height="32px" />
        <span class="text-xs text-muted">Yellow</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <Icon name="heart" color="pink" width="32px" height="32px" />
        <span class="text-xs text-muted">Pink</span>
      </div>
    </div>
  </ExampleTabs>

  <h3>{m.icon_ex_transforms()}</h3>
  <ExampleTabs code={`<Icon name="arrow-right" />
<Icon name="arrow-right" rotate={1} />
<Icon name="arrow-right" rotate={2} />
<Icon name="arrow-right" hFlip={true} />`}>
    <div class="flex gap-6 items-center flex-wrap text-2xl" data-testid="icon-transformations">
      <div class="flex flex-col items-center gap-2">
        <Icon name="arrow-right" width="32px" height="32px" />
        <span class="text-xs text-muted">Normal</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <Icon name="arrow-right" rotate={1} width="32px" height="32px" />
        <span class="text-xs text-muted">Rotate 90°</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <Icon name="arrow-right" rotate={2} width="32px" height="32px" />
        <span class="text-xs text-muted">Rotate 180°</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <Icon name="arrow-right" hFlip={true} width="32px" height="32px" />
        <span class="text-xs text-muted">H-Flip</span>
      </div>
    </div>
  </ExampleTabs>

  <h2>{m.sec_setup()}</h2>
  <p>{m.icon_setup_1()}</p>
  <CodeBlock language="svelte">{`\\u003Cscript>
  import { setIconset } from 'twintrinsic'
  setIconset('mdi-light')
\\u003C/script>`}</CodeBlock>

  <h2>{m.icon_preload_heading()}</h2>
  <p>
    {m.icon_preload_1()}<code>preloadIcons()</code>{m.icon_preload_2()}
  </p>
  <CodeBlock language="svelte">{`\\u003Cscript>
  import { preloadIcons, DEFAULT_PRELOAD_ICONS } from 'twintrinsic'
  preloadIcons()
  preloadIcons([...DEFAULT_PRELOAD_ICONS, 'shopping-cart', 'heart'])
\\u003C/script>`}</CodeBlock>

  <h3>{m.icon_ex_switcher()}</h3>
  <ExampleTabs code={`<Icon name="check" />`}>
    <div data-testid="icon-iconset-changer">
      <Icon name="check" />
    </div>
  </ExampleTabs>

  <h2>{m.sec_props()}</h2>
  <PropsTable component={IconModule} />

  <h2>{m.sec_accessibility()}</h2>
  <ul>
    <li>{m.icon_a11y_1()}</li>
    <li>{m.icon_a11y_2()}</li>
    <li>{m.icon_a11y_3()}</li>
    <li>{m.icon_a11y_4()}</li>
  </ul>

  <h2>{m.sec_keyboard()}</h2>
  <p>{m.icon_kb_1()}</p>
</Container>

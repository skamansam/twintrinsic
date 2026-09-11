<!--
@component
Tooltip documentation page — standardized structure
-->
<script lang="ts">
import Button from "$lib/components/Button/Button.svelte"
import Container from "$lib/components/Container/Container.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import Tooltip from "$lib/components/Tooltip/Tooltip.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as TooltipModule from "$lib/components/Tooltip/Tooltip.svelte"
import { m } from "$lib/paraglide/messages.js"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
<h1>{m.tooltip_heading()}</h1>

<p>
  {m.tooltip_intro_1()}<strong>Popover API</strong>{m.tooltip_intro_2()}<code>popover="hint"</code>{m.tooltip_intro_3()}<strong><code>interestfor</code></strong>{m.tooltip_intro_4()}<strong>CSS Anchor Positioning</strong>{m.tooltip_intro_5()}
</p>

<h2>{m.sec_what_when_why()}</h2>

<h3>{m.sec_what()}</h3>
<p>
  {m.tooltip_what_1()}<kbd>Esc</kbd>{m.tooltip_what_2()}
</p>

<h3>{m.sec_when()}</h3>
<p>
  {m.tooltip_when_1()}<code>&lt;Tooltip&gt;</code>{m.tooltip_when_2()}<code>&lt;Popover&gt;</code>{m.tooltip_when_3()}<code>&lt;Modal&gt;</code>{m.tooltip_when_4()}
</p>

<h3>{m.sec_why()}</h3>
<ul>
  <li><strong>{m.tooltip_why_zero_js()}</strong> — {m.tooltip_why_zero_js_desc()}</li>
  <li><strong>{m.tooltip_why_top_layer()}</strong> — {m.tooltip_why_top_layer_desc_1()}<code>overflow: hidden</code>{m.tooltip_why_top_layer_desc_2()}</li>
  <li><strong>{m.tooltip_why_wcag()}</strong> — {m.tooltip_why_wcag_desc()}</li>
  <li><strong>{m.tooltip_why_anchor()}</strong> — {m.tooltip_why_anchor_desc()}</li>
</ul>

<h3>{m.sec_sources()}</h3>
<ul>
  <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/">WAI-ARIA APG — Tooltip</a></li>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/popover">MDN — Popover API</a></li>
  <li><a href="https://developer.chrome.com/docs/css-ui/anchor-positioning">Chrome — CSS Anchor Positioning</a></li>
  <li><a href="https://m3.material.io/components/tooltips/overview">Material Design 3 — Tooltips</a></li>
</ul>

<h2>{m.sec_implementation()}</h2>
<ul>
    <li>{m.tooltip_impl_1()}</li>
    <li>{m.tooltip_impl_2()}</li>
    <li>{m.tooltip_impl_3()}</li>
    <li>{m.tooltip_impl_4()}</li>
</ul>

<h2>{m.sec_mistakes()}</h2>
<ul>
    <li>{m.tooltip_mistake_1()}</li>
    <li>{m.tooltip_mistake_2()}</li>
</ul>

<h2>{m.sec_related()}</h2>
<p>Menu, Popover, Modal</p>

<h2>{m.sec_responsiveness()}</h2>
<ul>
  <li>{m.tooltip_responsive_1()}</li>
  <li>{m.tooltip_responsive_2()}</li>
</ul>

<h2>{m.sec_customization()}</h2>
<ul>
  <li><code>position</code>{m.tooltip_custom_1()}</li>
  <li><code>content</code>{m.tooltip_custom_2()}</li>
  <li>{m.tooltip_custom_3_1()}<code>position-try-fallbacks</code>{m.tooltip_custom_3_2()}</li>
</ul>

<h2>{m.sec_examples()}</h2>

<h3>{m.tooltip_ex_basic()}</h3>
<ExampleTabs code={`<Tooltip content="Save changes to your profile">
  <Button>Save</Button>
</Tooltip>`}>
  <div class="p-4 bg-surface rounded-md" data-testid="tooltip-basic">
    <Tooltip content="Save changes to your profile">
      <Button>Save</Button>
    </Tooltip>
  </div>
</ExampleTabs>

<h3>{m.tooltip_ex_positions()}</h3>
<ExampleTabs code={`<Tooltip content="Save as draft" position="top">
  <Button>Top</Button>
</Tooltip>
<Tooltip content="Duplicate this project" position="right">
  <Button>Right</Button>
</Tooltip>
<Tooltip content="Archive this document" position="bottom">
  <Button>Bottom</Button>
</Tooltip>
<Tooltip content="Export as PDF" position="left">
  <Button>Left</Button>
</Tooltip>`}>
  <div class="flex gap-4 p-4 bg-surface rounded-md" data-testid="tooltip-positions">
    <Tooltip content="Save as draft" position="top">
      <Button>Top</Button>
    </Tooltip>
    <Tooltip content="Duplicate this project" position="right">
      <Button>Right</Button>
    </Tooltip>
    <Tooltip content="Archive this document" position="bottom">
      <Button>Bottom</Button>
    </Tooltip>
    <Tooltip content="Export as PDF" position="left">
      <Button>Left</Button>
    </Tooltip>
  </div>
</ExampleTabs>

<h2>{m.tooltip_how_heading()}</h2>
<p>
  {m.tooltip_how_1()}<code>interestfor</code>{m.tooltip_how_2()}<code>popover="hint"</code>{m.tooltip_how_3()}<code>anchor-name</code>{m.tooltip_how_4()}<code>position-anchor</code>{m.tooltip_how_5()}<code>anchor()</code>{m.tooltip_how_6()}<code>getBoundingClientRect()</code>{m.tooltip_how_7()}
</p>
<p>
  {m.tooltip_poly_1()}<code>@oddbird/popover-polyfill</code>{m.tooltip_poly_2()}<code>@oddbird/css-anchor-positioning</code>{m.tooltip_poly_3()}<code>interestfor</code>{m.tooltip_poly_4()}<code>loadPlatformPolyfills()</code>{m.tooltip_poly_5()}
</p>

<h2>{m.sec_props()}</h2>
<PropsTable component={TooltipModule} />

<h2>{m.sec_accessibility()}</h2>
<ul>
  <li><strong>{m.tooltip_a11y_1_label()}</strong> — <code>interestfor</code>{m.tooltip_a11y_1_desc_1()}<code>aria-describedby</code>{m.tooltip_a11y_1_desc_2()}<code>aria-details</code>{m.tooltip_a11y_1_desc_3()}</li>
  <li><strong>{m.tooltip_a11y_2_label()}</strong> — {m.tooltip_a11y_2_desc()}</li>
  <li><strong>{m.tooltip_a11y_3_label()}</strong> — {m.tooltip_a11y_3_desc()}</li>
  <li><strong>{m.tooltip_a11y_4_label()}</strong> — <code>popover="hint"</code>{m.tooltip_a11y_4_desc()}</li>
  <li><strong>{m.tooltip_a11y_5_label()}</strong> — {m.tooltip_a11y_5_desc_1()}<code>position-try-fallbacks</code>{m.tooltip_a11y_5_desc_2()}</li>
</ul>

<h2>{m.sec_keyboard()}</h2>
<table>
  <thead><tr><th>{m.sec_key()}</th><th>{m.sec_function()}</th></tr></thead>
  <tbody>
    <tr><td><kbd>Esc</kbd></td><td>{m.tooltip_kb_1()}</td></tr>
    <tr><td><kbd>Tab</kbd></td><td>{m.tooltip_kb_2()}</td></tr>
  </tbody>
</table>
</Container>

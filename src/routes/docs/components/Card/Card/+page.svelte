<!--
@component
Card documentation page — standardized structure
-->
<script lang="ts">
import Card from "$lib/components/Card/Card.svelte"
import Container from "$lib/components/Container/Container.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as CardModule from "$lib/components/Card/Card.svelte"
import { m } from "$lib/paraglide/messages.js"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>{m.card_heading()}</h1>

  <p>
    <strong>{m.card_heading()}</strong>{m.card_intro_1()}<code>&lt;article&gt;</code>{m.card_intro_2()}
  </p>

  <h2>{m.sec_what_when_why()}</h2>

  <h3>{m.sec_what()}</h3>
  <p>
    {m.card_what_1()}<code>&lt;article&gt;</code>{m.card_what_2()}<code>&lt;a&gt;</code>{m.card_what_3()}<code>href</code>{m.card_what_4()}
  </p>

  <h3>{m.sec_when()}</h3>
  <p>
    {m.card_when_1()}<code>&lt;Card&gt;</code>{m.card_when_2()}<code>&lt;Container&gt;</code>{m.card_when_3()}<code>&lt;Panel&gt;</code>{m.card_when_4()}
  </p>

  <h3>{m.sec_why()}</h3>
  <ul>
    <li><strong>{m.card_why_semantic()}</strong> — <code>&lt;article&gt;</code>{m.card_why_semantic_desc()}</li>
    <li><strong>{m.card_why_slots()}</strong> — {m.card_why_slots_desc()}</li>
    <li><strong>{m.card_why_interactive()}</strong> — <code>hoverable</code>{m.card_why_interactive_desc_1()}<code>href</code>{m.card_why_interactive_desc_2()}</li>
  </ul>

  <h3>{m.sec_sources()}</h3>
  <ul>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/article">MDN — &lt;article&gt;</a></li>
    <li><a href="https://m3.material.io/components/card/overview">Material Design 3 — Card</a></li>
    <li><a href="https://primer.style/components/blankslate">Primer — Blankslate</a></li>
    <li><a href="https://ant.design/components/card">Ant Design — Card</a></li>
    <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/">WAI-ARIA APG</a></li>
  </ul>

  <h2>{m.sec_implementation()}</h2>
  <ul>
    <li>{m.card_impl_1()}</li>
    <li>{m.card_impl_2()}</li>
    <li>{m.card_impl_3()}<code>on$&#123;string&#125;</code>{m.card_impl_4()}</li>
    <li>{m.card_impl_5()}</li>
  </ul>

  <h2>{m.sec_mistakes()}</h2>
  <ul>
    <li>{m.card_mistake_1()}</li>
    <li>{m.card_mistake_2()}</li>
  </ul>

  <h2>{m.sec_related()}</h2>
  <p>Container, Section, Button</p>

  <h2>{m.sec_responsiveness()}</h2>
  <ul>
    <li>{m.card_responsive_1()}</li>
    <li>{m.card_responsive_2()}</li>
  </ul>

  <h2>{m.sec_customization()}</h2>
  <ul>
    <li><code>hoverable</code>{m.card_custom_1()}</li>
    <li><code>href</code>{m.card_custom_2_1()}<code>&lt;a&gt;</code>{m.card_custom_2_2()}</li>
    <li><code>image</code>{m.card_custom_3_1()}<code>imageAlt</code>{m.card_custom_3_2()}<code>media</code>{m.card_custom_3_3()}</li>
    <li><code>bordered</code>{m.card_custom_4_1()}<code>shadowed</code>{m.card_custom_4_2()}<code>compact</code>{m.card_custom_4_3()}</li>
  </ul>

  <h2>{m.sec_examples()}</h2>

  <h3>{m.card_ex_basic()}</h3>
  <ExampleTabs code={`<Card>
  {#snippet header()}Product Details{/snippet}
  <div class="p-4">
    <p class="font-medium text-lg">Wireless Noise-Cancelling Headphones</p>
    <p class="text-muted mt-1">Up to 30 hours of battery life.</p>
    <p class="mt-3 text-lg font-semibold">$199.99</p>
  </div>
</Card>`}>
    <div data-testid="card-basic">
      <Card>
        {#snippet header()}Product Details{/snippet}
        <div class="p-4">
          <p class="font-medium text-lg">Wireless Noise-Cancelling Headphones</p>
          <p class="text-muted mt-1">Up to 30 hours of battery life with active noise cancelling.</p>
          <p class="mt-3 text-lg font-semibold">$199.99</p>
        </div>
      </Card>
    </div>
  </ExampleTabs>

  <h3>{m.card_ex_media()}</h3>
  <ExampleTabs code={`<Card hoverable>
  {#snippet media()}
    <img src="image.jpg" alt="Blog post cover" class="w-full h-48 object-cover" />
  {/snippet}
  {#snippet header()}Announcing Twintrinsic 2.0{/snippet}
  <div class="p-4">
    <p class="text-muted">Faster, more accessible, 20+ new components.</p>
    <p class="mt-3 text-sm text-primary-600 font-medium">Read more →</p>
  </div>
</Card>`}>
    <div data-testid="card-with-media">
      <Card hoverable>
        {#snippet media()}
          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop"
            alt="Featured blog post cover"
            class="w-full h-48 object-cover"
          />
        {/snippet}
        {#snippet header()}Announcing Twintrinsic 2.0{/snippet}
        <div class="p-4">
          <p class="text-muted">A faster, more accessible release with 20+ new components.</p>
          <p class="mt-3 text-sm text-primary-600 font-medium">Read more →</p>
        </div>
      </Card>
    </div>
  </ExampleTabs>

  <h3>{m.card_ex_footer()}</h3>
  <ExampleTabs code={`<Card>
  {#snippet header()}Monthly Report — August 2026{/snippet}
  <div class="p-4">
    <p class="text-muted">Revenue grew 18% month over month.</p>
  </div>
  {#snippet footer()}
    <div class="flex justify-end space-x-2">
      <button class="px-4 py-2 bg-primary text-white rounded">View report</button>
    </div>
  {/snippet}
</Card>`}>
    <div data-testid="card-with-footer">
      <Card>
        {#snippet header()}Monthly Report — August 2026{/snippet}
        <div class="p-4">
          <p class="text-muted">Revenue grew 18% month over month, driven by the new Pro tier.</p>
          <div class="mt-3 flex gap-4 text-sm">
            <span class="text-success-600">↑ $42,300 revenue</span>
            <span class="text-muted">1,204 active users</span>
          </div>
        </div>
        {#snippet footer()}
          <div class="flex justify-end space-x-2">
            <button class="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark">View report</button>
          </div>
        {/snippet}
      </Card>
    </div>
  </ExampleTabs>

  <h3>{m.card_ex_rest()}</h3>
  <ExampleTabs
    code={`<Card
  data-rest-pass="card"
  onclick={(event) =>
    event.currentTarget.setAttribute("data-clicked", "true")
  }
>
  Click me — the native onclick handler is forwarded via rest props.
</Card>`}
  >
    <div data-testid="card-rest-props">
      <Card
        data-rest-pass="card"
        onclick={(event) =>
          (event.currentTarget as HTMLElement).setAttribute("data-clicked", "true")
        }
      >
        <div class="p-4">
          {m.card_rest_desc_1()}<code>&lt;article&gt;</code>{m.card_rest_desc_2()}
        </div>
      </Card>
    </div>
  </ExampleTabs>

  <h2>{m.sec_slots()}</h2>
  <table>
    <thead><tr><th>{m.sec_slot()}</th><th>{m.sec_description()}</th></tr></thead>
    <tbody>
      <tr><td><code>default</code></td><td>{m.card_slot_default()}</td></tr>
      <tr><td><code>header</code></td><td>{m.card_slot_header()}</td></tr>
      <tr><td><code>media</code></td><td>{m.card_slot_media()}</td></tr>
      <tr><td><code>footer</code></td><td>{m.card_slot_footer()}</td></tr>
    </tbody>
  </table>

  <h2>{m.sec_props()}</h2>
  <PropsTable component={CardModule} />

  <h2>{m.sec_events()}</h2>
  <EventsTable component={CardModule} />

  <h2>{m.sec_accessibility()}</h2>
  <ul>
    <li>{m.card_a11y_1_1()}<code>&lt;article&gt;</code>{m.card_a11y_1_2()}</li>
    <li>{m.card_a11y_2_1()}<code>href</code>{m.card_a11y_2_2()}<code>&lt;a&gt;</code>{m.card_a11y_2_3()}</li>
    <li>{m.card_a11y_3()}</li>
    <li>{m.card_a11y_4()}</li>
  </ul>

  <h2>{m.sec_keyboard()}</h2>
  <table>
    <thead><tr><th>{m.sec_key()}</th><th>{m.sec_function()}</th></tr></thead>
    <tbody>
      <tr><td><kbd>Tab</kbd></td><td>{m.card_kb_1()}</td></tr>
      <tr><td><kbd>Enter</kbd></td><td>{m.card_kb_2_1()}<code>href</code>{m.card_kb_2_2()}</td></tr>
    </tbody>
  </table>
</Container>

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
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>Card</h1>

  <p>
    <strong>Card</strong> is a styled container for self-contained content with optional
    header, media, and footer sections. It renders as an <code>&lt;article&gt;</code>
    element, indicating that its content is independently meaningful.
  </p>

  <h2>What, When &amp; Why</h2>

  <h3>What is it?</h3>
  <p>
    A content container that groups related information — headers, images, text, and
    actions — into a visually cohesive unit. Renders as <code>&lt;article&gt;</code>
    (or <code>&lt;a&gt;</code> when <code>href</code> is set) for correct semantics.
  </p>

  <h3>When should I use it?</h3>
  <p>
    Use <code>&lt;Card&gt;</code> for self-contained content that could stand alone:
    blog posts, product listings, user profiles, testimonials, dashboard widgets.
    For layout wrapping, use <code>&lt;Container&gt;</code>. For collapsible content,
    use <code>&lt;Panel&gt;</code>.
  </p>

  <h3>Why does it exist?</h3>
  <ul>
    <li><strong>Semantic HTML</strong> — <code>&lt;article&gt;</code> signals self-contained content.</li>
    <li><strong>Flexible slots</strong> — header, media, body, and footer for diverse content.</li>
    <li><strong>Interactive</strong> — <code>hoverable</code> and <code>href</code> for clickable cards.</li>
  </ul>

  <h3>Sources</h3>
  <ul>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/article">MDN — &lt;article&gt;</a></li>
    <li><a href="https://m3.material.io/components/card/overview">Material Design 3 — Card</a></li>
    <li><a href="https://primer.style/components/blankslate">Primer — Blankslate</a></li>
    <li><a href="https://ant.design/components/card">Ant Design — Card</a></li>
    <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/">WAI-ARIA APG</a></li>
  </ul>

  <h2>Responsiveness</h2>
  <ul>
    <li>Full-width by default; set max-width via <code>class</code> or parent Container.</li>
    <li>Media images use <code>object-cover</code> for consistent aspect ratios.</li>
  </ul>

  <h2>Customization</h2>
  <ul>
    <li><code>hoverable</code> — add hover effects for interactive cards.</li>
    <li><code>href</code> — make the entire card a link (renders as <code>&lt;a&gt;</code>).</li>
    <li><code>image</code> / <code>imageAlt</code> — simple image prop (or use <code>media</code> snippet).</li>
    <li><code>bordered</code>, <code>shadowed</code>, <code>compact</code>.</li>
  </ul>

  <h2>Examples</h2>

  <h3>Basic Card</h3>
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

  <h3>Card with Media</h3>
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

  <h3>Card with Footer</h3>
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

  <h3>Rest Props Passthrough</h3>
  <ExampleTabs code={`<Card data-rest-pass="card">Card content</Card>`}>
    <div data-testid="card-rest-props">
      <Card data-rest-pass="card">
        <div class="p-4">Rest props land on the root <code>&lt;article&gt;</code> element.</div>
      </Card>
    </div>
  </ExampleTabs>

  <h2>Slots</h2>
  <table>
    <thead><tr><th>Slot</th><th>Description</th></tr></thead>
    <tbody>
      <tr><td><code>default</code></td><td>Main card body content</td></tr>
      <tr><td><code>header</code></td><td>Card header content</td></tr>
      <tr><td><code>media</code></td><td>Media content (images, video)</td></tr>
      <tr><td><code>footer</code></td><td>Card footer content</td></tr>
    </tbody>
  </table>

  <h2>Props</h2>
  <PropsTable component={CardModule} />

  <h2>Events</h2>
  <EventsTable component={CardModule} />

  <h2>Accessibility</h2>
  <ul>
    <li>Renders as <code>&lt;article&gt;</code> for self-contained content semantics.</li>
    <li>Clickable cards (with <code>href</code>) render as <code>&lt;a&gt;</code> with proper keyboard support.</li>
    <li>Media content requires proper alt text.</li>
    <li>Interactive elements maintain focus states.</li>
  </ul>

  <h2>Keyboard Support</h2>
  <table>
    <thead><tr><th>Key</th><th>Function</th></tr></thead>
    <tbody>
      <tr><td><kbd>Tab</kbd></td><td>Move focus to the card (when clickable)</td></tr>
      <tr><td><kbd>Enter</kbd></td><td>Follow the card link (when <code>href</code> is set)</td></tr>
    </tbody>
  </table>
</Container>

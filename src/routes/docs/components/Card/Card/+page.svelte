<script lang="ts">
import Card from "$lib/components/Card/Card.svelte"
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as CardModule from "$lib/components/Card/Card.svelte"
import Container from "$lib/components/Container/Container.svelte"
</script>
<!--
@component
Documentation page for the Card component
-->

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>
<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>Card</h1>
  <p>
    A styled container for content with optional header, media, and footer sections.
    Built on top of the Panel component with additional card-specific styling.
  </p>

  <h2>Usage</h2>
  <p>
    Cards are versatile containers that can be used to group related content.
    They support various configurations including media sections, headers, and footers.
  </p>

  <CodeBlock title="Basic Usage">{`
<Card>
  {#snippet header()}Product Details{/snippet}
  <p>Wireless noise-cancelling headphones — $199.99</p>
</Card>

<Card hoverable>
  {#snippet media()}
    <img src="image.jpg" alt="Featured blog post cover" />
  {/snippet}
  <h3>Announcing Twintrinsic 2.0</h3>
  <p>Faster, more accessible, 20+ new components.</p>
</Card>
    `}
  </CodeBlock>

  <h2>Examples</h2>

  <h3>Basic Card</h3>
  <div class="not-prose mb-8" data-testid="card-basic">
    <Card>
      {#snippet header()}Product Details{/snippet}
      <div class="p-4">
        <p class="font-medium text-lg">Wireless Noise-Cancelling Headphones</p>
        <p class="text-muted mt-1">Up to 30 hours of battery life with active noise cancelling.</p>
        <p class="mt-3 text-lg font-semibold">$199.99</p>
      </div>
    </Card>
  </div>

  <h3>Card with Media</h3>
  <div class="not-prose mb-8" data-testid="card-with-media">
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
        <p class="text-muted">A faster, more accessible release with 20+ new components and a fully revamped theming system.</p>
        <p class="mt-3 text-sm text-primary-600 font-medium">Read more →</p>
      </div>
    </Card>
  </div>

  <h3>Card with Footer</h3>
  <div class="not-prose mb-8" data-testid="card-with-footer">
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
          <button class="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark">
            View report
          </button>
        </div>
      {/snippet}
    </Card>
  </div>

  <h2>Props</h2>
  <div class="overflow-x-auto">
    <PropsTable component={CardModule} />
  </div>

  <h2>Slots</h2>
  <div class="overflow-x-auto">
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>default</code></td>
          <td>Main content of the card</td>
        </tr>
        <tr>
          <td><code>header</code></td>
          <td>Card header content</td>
        </tr>
        <tr>
          <td><code>media</code></td>
          <td>Media content (images, video, etc.)</td>
        </tr>
        <tr>
          <td><code>footer</code></td>
          <td>Card footer content</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h2>Events</h2>
  <div class="overflow-x-auto">
    <EventsTable component={CardModule} />
  </div>

  <h2>When to Use Card vs Container vs Panel</h2>
  <p>
    Twintrinsic provides three distinct layout components. Choose based on your use case:
  </p>
  <table>
    <thead>
      <tr>
        <th>Component</th>
        <th>Use When</th>
        <th>HTML Element</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Card</strong></td>
        <td>Displaying self-contained, reusable content that could stand alone (blog post, product listing, user profile, testimonial)</td>
        <td><code>&lt;article&gt;</code></td>
      </tr>
      <tr>
        <td><strong>Container</strong></td>
        <td>Creating page/section layout structure with responsive max-width constraints</td>
        <td><code>&lt;div&gt;</code></td>
      </tr>
      <tr>
        <td><strong>Panel</strong></td>
        <td>Content should be collapsible/expandable to save vertical space (FAQ, settings, advanced options)</td>
        <td><code>&lt;details&gt;</code></td>
      </tr>
    </tbody>
  </table>

  <h3>Card-Specific Guidelines</h3>
  <ul>
    <li><strong>Use for independent content:</strong> Blog posts, product cards, team member profiles, testimonials</li>
    <li><strong>Semantic HTML:</strong> Card renders as <code>&lt;article&gt;</code>, indicating self-contained content</li>
    <li><strong>Always visible:</strong> Cards are not collapsible; content is always displayed</li>
    <li><strong>Nest in Container:</strong> Use Container to wrap multiple Cards for layout control</li>
    <li><strong>Not for layout:</strong> Don't use Card as a general layout wrapper; use Container instead</li>
  </ul>

  <h2>Best Practices</h2>
  <ul>
    <li>Use cards to group related content and actions</li>
    <li>Keep card content concise and focused</li>
    <li>Use the media slot for visual content that enhances the card's message</li>
    <li>Consider using hoverable cards for interactive content</li>
    <li>Place primary actions in the footer for consistency</li>
  </ul>

  <h2>Accessibility</h2>
  <ul>
    <li>Cards use semantic HTML structure</li>
    <li>Clickable cards have proper keyboard support</li>
    <li>Media content requires proper alt text</li>
    <li>Interactive elements maintain proper focus states</li>
  </ul>
</Container>

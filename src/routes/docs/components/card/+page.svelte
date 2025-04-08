<!--
@component
Documentation page for the Card component
-->

<style>
  @reference '$lib/twintrinsic.css';
</style>
<script>
import Card from "$lib/components/Panel/Card.svelte"
import { CodeBlock } from "$lib/components/CodeBlock"
</script>

<article class="prose dark:prose-invert max-w-none">
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

  <CodeBlock
    title="Basic Usage"
    code={`
<Card>
  <svelte:fragment slot="header">Card Title</svelte:fragment>
  <p>Card content goes here</p>
</Card>

<Card hoverable>
  <svelte:fragment slot="media">
    <img src="image.jpg" alt="Card image" />
  </svelte:fragment>
  <h3>Title</h3>
  <p>Content with hover effect</p>
</Card>
    `}
  />

  <h2>Examples</h2>

  <h3>Basic Card</h3>
  <div class="not-prose mb-8">
    <Card>
      <svelte:fragment slot="header">Basic Example</svelte:fragment>
      <div class="p-4">
        <p>A simple card with header and content.</p>
      </div>
    </Card>
  </div>

  <h3>Card with Media</h3>
  <div class="not-prose mb-8">
    <Card hoverable>
      <svelte:fragment slot="media">
        <img
          src="https://picsum.photos/600/300"
          alt="Sample image"
          class="w-full h-48 object-cover"
        />
      </svelte:fragment>
      <svelte:fragment slot="header">Media Card</svelte:fragment>
      <div class="p-4">
        <p>A card with media content and hover effect.</p>
      </div>
    </Card>
  </div>

  <h3>Card with Footer</h3>
  <div class="not-prose mb-8">
    <Card>
      <svelte:fragment slot="header">Footer Example</svelte:fragment>
      <div class="p-4">
        <p>A card with a footer containing actions.</p>
      </div>
      <svelte:fragment slot="footer">
        <div class="flex justify-end space-x-2">
          <button class="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark">
            Action
          </button>
        </div>
      </svelte:fragment>
    </Card>
  </div>

  <h2>Props</h2>
  <div class="overflow-x-auto">
    <table>
      <thead>
        <tr>
          <th>Prop</th>
          <th>Type</th>
          <th>Default</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>hoverable</code></td>
          <td><code>boolean</code></td>
          <td><code>false</code></td>
          <td>Adds hover effect to the card</td>
        </tr>
        <tr>
          <td><code>shadow</code></td>
          <td><code>boolean</code></td>
          <td><code>true</code></td>
          <td>Adds shadow to the card</td>
        </tr>
        <tr>
          <td><code>shadowSize</code></td>
          <td><code>"none" | "sm" | "md" | "lg" | "xl"</code></td>
          <td><code>"md"</code></td>
          <td>Size of the shadow when enabled</td>
        </tr>
        <tr>
          <td><code>clickable</code></td>
          <td><code>boolean</code></td>
          <td><code>false</code></td>
          <td>Makes the entire card clickable</td>
        </tr>
      </tbody>
    </table>
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
    <table>
      <thead>
        <tr>
          <th>Event</th>
          <th>Detail</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>click</code></td>
          <td><code>{`{ originalEvent: Event }`}</code></td>
          <td>Fired when a clickable card is activated</td>
        </tr>
      </tbody>
    </table>
  </div>

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
</article>

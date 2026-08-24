<!--
@component
Carousel documentation page — standardized structure
-->
<script lang="ts">
import Carousel from "$lib/components/Carousel/Carousel.svelte"
import CarouselItem from "$lib/components/Carousel/CarouselItem.svelte"
import Container from "$lib/components/Container/Container.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as CarouselModule from "$lib/components/Carousel/Carousel.svelte"
import * as CarouselItemModule from "$lib/components/Carousel/CarouselItem.svelte"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>Carousel</h1>

  <p>
    <strong>Carousel</strong> is a slideshow for cycling through elements — images, cards,
    text, or custom markup. It supports various transition effects, navigation controls,
    and touch interactions.
  </p>

  <h2>What, When &amp; Why</h2>

  <h3>What is it?</h3>
  <p>
    A content carousel with slide/fade transitions, prev/next arrows, dot indicators, and
    autoplay support. Uses CSS Scroll Snap for smooth swiping and ARIA tablist for
    accessibility.
  </p>

  <h3>When should I use it?</h3>
  <p>
    Use <code>&lt;Carousel&gt;</code> for image galleries, feature highlights, testimonials,
    or any content that benefits from sequential browsing. For data grids, use
    <code>&lt;DataTable&gt;</code>.
  </p>

  <h3>Why does it exist?</h3>
  <ul>
    <li><strong>Touch-friendly</strong> — swipe gestures on mobile.</li>
    <li><strong>Accessible</strong> — ARIA tablist with keyboard navigation.</li>
    <li><strong>Flexible</strong> — slide or fade transitions, autoplay, custom arrows.</li>
  </ul>

  <h3>Sources</h3>
  <ul>
    <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/carousel/">WAI-ARIA APG — Carousel</a></li>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-type">MDN — CSS Scroll Snap</a></li>
    <li><a href="https://m3.material.io/components/carousel/overview">Material Design 3 — Carousel</a></li>
    <li><a href="https://primer.style/components/overlay">Primer — Overlay</a></li>
    <li><a href="https://ant.design/components/carousel">Ant Design — Carousel</a></li>
  </ul>

  <h2>Responsiveness</h2>
  <ul>
    <li>Fills container width; items scale responsively.</li>
    <li>Touch gestures for swipe on mobile.</li>
    <li>Autoplay pauses on hover and keyboard interaction.</li>
  </ul>

  <h2>Customization</h2>
  <ul>
    <li><code>transition</code> — <code>"slide"</code> or <code>"fade"</code>.</li>
    <li><code>autoplay</code> / <code>interval</code> — auto-advance with configurable delay.</li>
    <li><code>showArrows</code> / <code>showIndicators</code> — show/hide controls.</li>
    <li>Custom arrow and indicator snippets.</li>
  </ul>

  <h2>Examples</h2>

  <h3>Basic Carousel</h3>
  <ExampleTabs code={`<Carousel>
  {#snippet items()}
    <CarouselItem>
      <div class="h-64 bg-primary-100 flex items-center justify-center rounded-lg">
        <h2 class="text-2xl font-bold">Unlimited projects</h2>
      </div>
    </CarouselItem>
    <CarouselItem>
      <div class="h-64 bg-secondary-100 flex items-center justify-center rounded-lg">
        <h2 class="text-2xl font-bold">Real-time collaboration</h2>
      </div>
    </CarouselItem>
  {/snippet}
</Carousel>`}>
    <div class="max-w-2xl" data-testid="carousel-basic">
      <Carousel>
        {#snippet items()}
          <CarouselItem>
            <div class="h-64 bg-primary-100 dark:bg-primary-900 flex flex-col items-center justify-center rounded-lg text-center px-8">
              <h2 class="text-2xl font-bold">Unlimited projects</h2>
              <p class="mt-2">Create as many workspaces and boards as you need.</p>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div class="h-64 bg-secondary-100 dark:bg-secondary-900 flex flex-col items-center justify-center rounded-lg text-center px-8">
              <h2 class="text-2xl font-bold">Real-time collaboration</h2>
              <p class="mt-2">Invite teammates and edit together, live.</p>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div class="h-64 bg-success-100 dark:bg-success-900 flex flex-col items-center justify-center rounded-lg text-center px-8">
              <h2 class="text-2xl font-bold">Enterprise-grade security</h2>
              <p class="mt-2">SOC 2, SSO, and granular role-based access control.</p>
            </div>
          </CarouselItem>
        {/snippet}
      </Carousel>
    </div>
  </ExampleTabs>

  <h3>Autoplay with Fade</h3>
  <ExampleTabs code={`<Carousel autoplay interval={5000} >
  {#snippet items()}
    <CarouselItem><!-- slide 1 --></CarouselItem>
    <CarouselItem><!-- slide 2 --></CarouselItem>
  {/snippet}
</Carousel>`}>
    <div class="max-w-2xl" data-testid="carousel-autoplay">
      <Carousel autoplay interval={5000}  class="h-64">
        {#snippet items()}
          <CarouselItem>
            <div class="h-64 bg-primary-100 dark:bg-primary-900 flex flex-col items-center justify-center rounded-lg text-center px-8">
              <h2 class="text-2xl font-bold">Announcing Acme 3.0</h2>
              <p class="mt-2">A faster, more accessible platform is here.</p>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div class="h-64 bg-secondary-100 dark:bg-secondary-900 flex flex-col items-center justify-center rounded-lg text-center px-8">
              <h2 class="text-2xl font-bold">New pricing plans</h2>
              <p class="mt-2">Save 20% when you switch to yearly billing.</p>
            </div>
          </CarouselItem>
        {/snippet}
      </Carousel>
    </div>
  </ExampleTabs>

  <h3>Fade Transition</h3>
  <ExampleTabs code={`<Carousel>
  {#snippet items()}
    <CarouselItem><div class="h-48 bg-primary-100 flex items-center justify-center">Slide 1</div></CarouselItem>
    <CarouselItem><div class="h-48 bg-secondary-100 flex items-center justify-center">Slide 2</div></CarouselItem>
  {/snippet}
</Carousel>`}>
    <div class="max-w-2xl" data-testid="carousel-fade">
      <Carousel>
        {#snippet items()}
          <CarouselItem><div class="h-48 bg-primary-100 flex items-center justify-center">Slide 1</div></CarouselItem>
          <CarouselItem><div class="h-48 bg-secondary-100 flex items-center justify-center">Slide 2</div></CarouselItem>
        {/snippet}
      </Carousel>
    </div>
  </ExampleTabs>

  <h3>No Indicators</h3>
  <ExampleTabs code={`<Carousel showIndicators={false}>
  {#snippet items()}
    <CarouselItem><div class="h-48 bg-primary-100 flex items-center justify-center">Slide 1</div></CarouselItem>
    <CarouselItem><div class="h-48 bg-secondary-100 flex items-center justify-center">Slide 2</div></CarouselItem>
  {/snippet}
</Carousel>`}>
    <div class="max-w-2xl" data-testid="carousel-no-indicators">
      <Carousel showIndicators={false}>
        {#snippet items()}
          <CarouselItem><div class="h-48 bg-primary-100 flex items-center justify-center">Slide 1</div></CarouselItem>
          <CarouselItem><div class="h-48 bg-secondary-100 flex items-center justify-center">Slide 2</div></CarouselItem>
        {/snippet}
      </Carousel>
    </div>
  </ExampleTabs>

  <h2>Carousel Props</h2>
  <PropsTable component={CarouselModule} />

  <h2>CarouselItem Props</h2>
  <PropsTable component={CarouselItemModule} />

  <h2>Events</h2>
  <EventsTable component={CarouselModule} />

  <h2>Accessibility</h2>
  <ul>
    <li>Uses <code>role="region"</code> with <code>aria-label</code>.</li>
    <li>Indicators use <code>role="tablist"</code> with <code>aria-controls</code>.</li>
    <li><code>aria-live="polite"</code> announces slide changes.</li>
    <li>Autoplay pauses on user interaction.</li>
  </ul>

  <h2>Keyboard Support</h2>
  <table>
    <thead><tr><th>Key</th><th>Function</th></tr></thead>
    <tbody>
      <tr><td><kbd>Left Arrow</kbd></td><td>Previous slide</td></tr>
      <tr><td><kbd>Right Arrow</kbd></td><td>Next slide</td></tr>
      <tr><td><kbd>Home</kbd></td><td>First slide</td></tr>
      <tr><td><kbd>End</kbd></td><td>Last slide</td></tr>
      <tr><td><kbd>Enter</kbd> / <kbd>Space</kbd></td><td>Activate indicator</td></tr>
    </tbody>
  </table>
</Container>

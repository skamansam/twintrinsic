<!--
@component
CarouselItem documentation page — standardized structure
-->
<script lang="ts">
import Carousel from "$lib/components/Carousel/Carousel.svelte"
import CarouselItem from "$lib/components/Carousel/CarouselItem.svelte"
import Container from "$lib/components/Container/Container.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as CarouselItemModule from "$lib/components/Carousel/CarouselItem.svelte"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>CarouselItem</h1>

  <p>
    <strong>CarouselItem</strong> is a single slide inside a <code>&lt;Carousel&gt;</code>.
    It registers itself with the parent carousel and renders as a
    <code>role="tabpanel"</code> with <code>aria-roledescription="slide"</code>.
  </p>

  <h2>What, When &amp; Why</h2>

  <h3>What is it?</h3>
  <p>
    A single slide within a Carousel. Each CarouselItem is a content panel that can contain
    images, text, cards, or any markup. The parent Carousel manages transitions, navigation,
    and active state.
  </p>

  <h3>When should I use it?</h3>
  <p>
    Always use <code>&lt;CarouselItem&gt;</code> inside a <code>&lt;Carousel&gt;</code>.
    Each slide in your carousel gets its own <code>&lt;CarouselItem&gt;</code>.
  </p>

  <h3>Why does it exist?</h3>
  <ul>
    <li><strong>Self-contained slides</strong> — each item is an independent content panel.</li>
    <li><strong>Accessible</strong> — <code>role="tabpanel"</code> with <code>aria-roledescription="slide"</code>.</li>
    <li><strong>Flexible</strong> — accepts any content as children.</li>
  </ul>

  <h3>Sources</h3>
  <ul>
    <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/carousel/">WAI-ARIA APG — Carousel</a></li>
    <li><a href="https://m3.material.io/components/carousel/overview">Material Design 3 — Carousel</a></li>
    <li><a href="https://ant.design/components/carousel">Ant Design — Carousel</a></li>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/tabpanel_role">MDN — tabpanel role</a></li>
    <li><a href="https://primer.style/components/overlay">Primer — Overlay</a></li>
  </ul>

  <h2>Responsiveness</h2>
  <ul>
    <li>Fills the carousel container width.</li>
    <li>Content scales naturally within the slide.</li>
  </ul>

  <h2>Customization</h2>
  <ul>
    <li>Accepts any content as children.</li>
    <li>Parent Carousel controls transition, arrows, and indicators.</li>
  </ul>

  <h2>Examples</h2>

  <h3>Basic Slides</h3>
  <ExampleTabs code={`<Carousel>
  {#snippet items()}
    <CarouselItem>
      <div class="h-48 bg-primary-100 flex items-center justify-center rounded-lg">
        <h2 class="text-xl font-bold">Unlimited projects</h2>
      </div>
    </CarouselItem>
    <CarouselItem>
      <div class="h-48 bg-secondary-100 flex items-center justify-center rounded-lg">
        <h2 class="text-xl font-bold">Real-time collaboration</h2>
      </div>
    </CarouselItem>
  {/snippet}
</Carousel>`}>
    <div data-testid="carousel-item-basic">
      <Carousel>
        {#snippet items()}
          <CarouselItem>
            <div class="h-48 bg-primary-100 dark:bg-primary-900 flex flex-col items-center justify-center rounded-lg text-center px-8">
              <h2 class="text-xl font-bold">Unlimited projects</h2>
              <p class="mt-1 text-sm">Create as many workspaces as you need.</p>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div class="h-48 bg-secondary-100 dark:bg-secondary-900 flex flex-col items-center justify-center rounded-lg text-center px-8">
              <h2 class="text-xl font-bold">Real-time collaboration</h2>
              <p class="mt-1 text-sm">Edit together with your team, live.</p>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div class="h-48 bg-success-100 dark:bg-success-900 flex flex-col items-center justify-center rounded-lg text-center px-8">
              <h2 class="text-xl font-bold">Enterprise security</h2>
              <p class="mt-1 text-sm">SOC 2, SSO, and role-based access.</p>
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
    <div data-testid="carousel-item-fade">
      <Carousel>
        {#snippet items()}
          <CarouselItem><div class="h-48 bg-primary-100 flex items-center justify-center">Slide 1</div></CarouselItem>
          <CarouselItem><div class="h-48 bg-secondary-100 flex items-center justify-center">Slide 2</div></CarouselItem>
        {/snippet}
      </Carousel>
    </div>
  </ExampleTabs>

  <h3>No Controls</h3>
  <ExampleTabs code={`<Carousel showArrows={false} showIndicators={false}>
  {#snippet items()}
    <CarouselItem><div class="h-48 bg-primary-100 flex items-center justify-center">Slide 1</div></CarouselItem>
    <CarouselItem><div class="h-48 bg-secondary-100 flex items-center justify-center">Slide 2</div></CarouselItem>
  {/snippet}
</Carousel>`}>
    <div data-testid="carousel-item-no-controls">
      <Carousel showArrows={false} showIndicators={false}>
        {#snippet items()}
          <CarouselItem><div class="h-48 bg-primary-100 flex items-center justify-center">Slide 1</div></CarouselItem>
          <CarouselItem><div class="h-48 bg-secondary-100 flex items-center justify-center">Slide 2</div></CarouselItem>
        {/snippet}
      </Carousel>
    </div>
  </ExampleTabs>

  <h2>Props</h2>
  <PropsTable component={CarouselItemModule} />

  <h2>Events</h2>
  <EventsTable component={CarouselItemModule} />

  <h2>Accessibility</h2>
  <ul>
    <li>Each slide renders <code>role="tabpanel"</code> with <code>aria-roledescription="slide"</code>.</li>
    <li>Inactive slides are hidden from assistive technology with <code>aria-hidden</code>.</li>
    <li>Keyboard users navigate with Arrow keys, Home, and End on the carousel region.</li>
  </ul>

  <h2>Keyboard Support</h2>
  <p>
    CarouselItem is a content panel and does not require direct keyboard interaction.
    Navigation is handled by the parent Carousel.
  </p>
</Container>

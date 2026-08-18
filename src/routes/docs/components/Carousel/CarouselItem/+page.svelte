<script lang="ts">
import Carousel from "$lib/components/Carousel/Carousel.svelte"
import CarouselItem from "$lib/components/Carousel/CarouselItem.svelte"
import * as CarouselItemModule from "$lib/components/Carousel/CarouselItem.svelte"
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
import Container from "$lib/components/Container/Container.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
</script>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>CarouselItem</h1>

  <p>
    The CarouselItem component is a single slide inside a
    <code>Carousel</code>. It registers itself with the parent carousel and
    renders as a <code>role="tabpanel"</code> with
    <code>aria-roledescription="slide"</code>, applying the active state and
    the configured slide/fade transition.
  </p>

  <h2>Examples</h2>

  <h3>Basic Slides</h3>
  <div class="not-prose mb-8" data-testid="carousel-item-basic">
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

  <CodeBlock language="svelte">{`<Carousel>
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
</Carousel>`}</CodeBlock>

  <h3>Fade Transition</h3>
  <div class="not-prose mb-8" data-testid="carousel-item-fade">
    <Carousel transition="fade" class="h-48">
      {#snippet items()}
        <CarouselItem>
          <div class="h-48 bg-primary-100 dark:bg-primary-900 flex flex-col items-center justify-center rounded-lg text-center px-8">
            <h2 class="text-xl font-bold">Design</h2>
            <p class="mt-1 text-sm">Craft pixel-perfect interfaces.</p>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div class="h-48 bg-secondary-100 dark:bg-secondary-900 flex flex-col items-center justify-center rounded-lg text-center px-8">
            <h2 class="text-xl font-bold">Build</h2>
            <p class="mt-1 text-sm">Ship accessible components faster.</p>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div class="h-48 bg-success-100 dark:bg-success-900 flex flex-col items-center justify-center rounded-lg text-center px-8">
            <h2 class="text-xl font-bold">Scale</h2>
            <p class="mt-1 text-sm">Grow without rewrites.</p>
          </div>
        </CarouselItem>
      {/snippet}
    </Carousel>
  </div>

  <CodeBlock language="svelte">{`<Carousel transition="fade">
  {#snippet items()}
    <CarouselItem>…</CarouselItem>
    <CarouselItem>…</CarouselItem>
    <CarouselItem>…</CarouselItem>
  {/snippet}
</Carousel>`}</CodeBlock>

  <h3>Without Controls</h3>
  <div class="not-prose mb-8" data-testid="carousel-item-no-controls">
    <Carousel showArrows={false} showIndicators={false}>
      {#snippet items()}
        <CarouselItem>
          <div class="h-40 bg-warning-100 dark:bg-warning-900 flex flex-col items-center justify-center rounded-lg text-center px-8">
            <h2 class="text-xl font-bold">Built for teams</h2>
            <p class="mt-1 text-sm">Shared workspaces and roles.</p>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div class="h-40 bg-info-100 dark:bg-info-900 flex flex-col items-center justify-center rounded-lg text-center px-8">
            <h2 class="text-xl font-bold">24/7 support</h2>
            <p class="mt-1 text-sm">Help whenever you need it.</p>
          </div>
        </CarouselItem>
      {/snippet}
    </Carousel>
  </div>

  <CodeBlock language="svelte">{`<Carousel showArrows={false} showIndicators={false}>
  {#snippet items()}
    <CarouselItem>
      <div class="h-40 bg-warning-100 dark:bg-warning-900 flex flex-col items-center justify-center rounded-lg text-center px-8">
        <h2 class="text-xl font-bold">Built for teams</h2>
        <p class="mt-1 text-sm">Shared workspaces and roles.</p>
      </div>
    </CarouselItem>
    <CarouselItem>
      <div class="h-40 bg-info-100 dark:bg-info-900 flex flex-col items-center justify-center rounded-lg text-center px-8">
        <h2 class="text-xl font-bold">24/7 support</h2>
        <p class="mt-1 text-sm">Help whenever you need it.</p>
      </div>
    </CarouselItem>
  {/snippet}
</Carousel>`}</CodeBlock>

  <h2>CarouselItem Props</h2>
  <PropsTable component={CarouselItemModule} />

  <h2>CarouselItem Events</h2>
  <EventsTable component={CarouselItemModule} />

  <h2>Accessibility</h2>
  <ul>
    <li>Each slide renders <code>role="tabpanel"</code> with <code>aria-roledescription="slide"</code></li>
    <li>Inactive slides are hidden from assistive technology with <code>aria-hidden</code></li>
    <li>The parent carousel ties slide indicators to the slides via <code>aria-selected</code></li>
    <li>Keyboard users can navigate with Arrow keys, Home, and End on the carousel region</li>
  </ul>
</Container>

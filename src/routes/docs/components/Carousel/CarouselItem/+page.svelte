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
          <div class="h-48 bg-primary-100 dark:bg-primary-900 flex items-center justify-center rounded-lg">
            <h2 class="text-xl font-bold">Slide 1</h2>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div class="h-48 bg-secondary-100 dark:bg-secondary-900 flex items-center justify-center rounded-lg">
            <h2 class="text-xl font-bold">Slide 2</h2>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div class="h-48 bg-success-100 dark:bg-success-900 flex items-center justify-center rounded-lg">
            <h2 class="text-xl font-bold">Slide 3</h2>
          </div>
        </CarouselItem>
      {/snippet}
    </Carousel>
  </div>

  <CodeBlock language="svelte">{`<Carousel>
  {#snippet items()}
    <CarouselItem>
      <div class="h-48 bg-primary-100 dark:bg-primary-900 flex items-center justify-center rounded-lg">
        <h2 class="text-xl font-bold">Slide 1</h2>
      </div>
    </CarouselItem>
    <CarouselItem>
      <div class="h-48 bg-secondary-100 dark:bg-secondary-900 flex items-center justify-center rounded-lg">
        <h2 class="text-xl font-bold">Slide 2</h2>
      </div>
    </CarouselItem>
    <CarouselItem>
      <div class="h-48 bg-success-100 dark:bg-success-900 flex items-center justify-center rounded-lg">
        <h2 class="text-xl font-bold">Slide 3</h2>
      </div>
    </CarouselItem>
  {/snippet}
</Carousel>`}</CodeBlock>

  <h3>Fade Transition</h3>
  <div class="not-prose mb-8" data-testid="carousel-item-fade">
    <Carousel transition="fade" class="h-48">
      {#snippet items()}
        <CarouselItem>
          <div class="h-48 bg-primary-100 dark:bg-primary-900 flex items-center justify-center rounded-lg">
            <h2 class="text-xl font-bold">First</h2>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div class="h-48 bg-secondary-100 dark:bg-secondary-900 flex items-center justify-center rounded-lg">
            <h2 class="text-xl font-bold">Second</h2>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div class="h-48 bg-success-100 dark:bg-success-900 flex items-center justify-center rounded-lg">
            <h2 class="text-xl font-bold">Third</h2>
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
          <div class="h-40 bg-warning-100 dark:bg-warning-900 flex items-center justify-center rounded-lg">
            <h2 class="text-xl font-bold">One</h2>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div class="h-40 bg-info-100 dark:bg-info-900 flex items-center justify-center rounded-lg">
            <h2 class="text-xl font-bold">Two</h2>
          </div>
        </CarouselItem>
      {/snippet}
    </Carousel>
  </div>

  <CodeBlock language="svelte">{`<Carousel showArrows={false} showIndicators={false}>
  {#snippet items()}
    <CarouselItem>
      <div class="h-40 bg-warning-100 dark:bg-warning-900 flex items-center justify-center rounded-lg">
        <h2 class="text-xl font-bold">One</h2>
      </div>
    </CarouselItem>
    <CarouselItem>
      <div class="h-40 bg-info-100 dark:bg-info-900 flex items-center justify-center rounded-lg">
        <h2 class="text-xl font-bold">Two</h2>
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

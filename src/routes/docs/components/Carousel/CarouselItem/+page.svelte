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
import { m } from "$lib/paraglide/messages.js"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <div class="not-prose mb-6 p-4 bg-primary-50 dark:bg-primary-950 border border-primary-200 dark:border-primary-800 rounded-lg">
    <p class="text-sm text-primary-700 dark:text-primary-300 m-0">
      <strong>{m.carouselitem_heading()}</strong>{m.carouselitem_note_1()}
      <a href="/docs/components/Carousel/Carousel" class="underline font-medium">Carousel</a>{m.carouselitem_note_2()}
    </p>
  </div>

  <h1>{m.carouselitem_heading()}</h1>

  <p>
    <strong>{m.carouselitem_heading()}</strong>{m.carouselitem_intro_1()}<code>&lt;Carousel&gt;</code>{m.carouselitem_intro_2()}<code>role="tabpanel"</code>{m.carouselitem_intro_3()}<code>aria-roledescription="slide"</code>{m.carouselitem_intro_4()}
  </p>

  <h2>{m.sec_what_when_why()}</h2>

  <h3>{m.sec_what()}</h3>
  <p>{m.carouselitem_what_1()}</p>

  <h3>{m.sec_when()}</h3>
  <p>
    {m.carouselitem_when_1()}<code>&lt;CarouselItem&gt;</code>{m.carouselitem_when_2()}<code>&lt;Carousel&gt;</code>{m.carouselitem_when_3()}<code>&lt;CarouselItem&gt;</code>{m.carouselitem_when_4()}
  </p>

  <h3>{m.sec_why()}</h3>
  <ul>
    <li><strong>{m.carouselitem_why_slides()}</strong>{m.carouselitem_why_slides_desc()}</li>
    <li><strong>{m.carouselitem_why_a11y()}</strong>{m.carouselitem_why_a11y_desc_1()}<code>role="tabpanel"</code>{m.carouselitem_why_a11y_desc_2()}<code>aria-roledescription="slide"</code>{m.carouselitem_why_a11y_desc_3()}</li>
    <li><strong>{m.carouselitem_why_flexible()}</strong>{m.carouselitem_why_flexible_desc()}</li>
  </ul>

  <h3>{m.sec_sources()}</h3>
  <ul>
    <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/carousel/">WAI-ARIA APG — Carousel</a></li>
    <li><a href="https://m3.material.io/components/carousel/overview">Material Design 3 — Carousel</a></li>
    <li><a href="https://ant.design/components/carousel">Ant Design — Carousel</a></li>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/tabpanel_role">MDN — tabpanel role</a></li>
    <li><a href="https://primer.style/components/overlay">Primer — Overlay</a></li>
  </ul>

  <h2>{m.sec_responsiveness()}</h2>
  <ul>
    <li>{m.carouselitem_responsive_1()}</li>
    <li>{m.carouselitem_responsive_2()}</li>
  </ul>

  <h2>{m.sec_customization()}</h2>
  <ul>
    <li>{m.carouselitem_custom_1()}</li>
    <li>{m.carouselitem_custom_2()}</li>
  </ul>

  <h2>{m.sec_examples()}</h2>

  <h3>{m.carouselitem_ex_basic()}</h3>
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

  <h3>{m.carouselitem_ex_fade()}</h3>
  <ExampleTabs code={`<Carousel transition="fade">
  {#snippet items()}
    <CarouselItem><div class="h-48 bg-primary-100 flex items-center justify-center">Slide 1</div></CarouselItem>
    <CarouselItem><div class="h-48 bg-secondary-100 flex items-center justify-center">Slide 2</div></CarouselItem>
  {/snippet}
</Carousel>`}>
    <div data-testid="carousel-item-fade">
      <Carousel transition="fade">
        {#snippet items()}
          <CarouselItem><div class="h-48 bg-primary-100 flex items-center justify-center">Slide 1</div></CarouselItem>
          <CarouselItem><div class="h-48 bg-secondary-100 flex items-center justify-center">Slide 2</div></CarouselItem>
        {/snippet}
      </Carousel>
    </div>
  </ExampleTabs>

  <h3>{m.carouselitem_ex_nocontrols()}</h3>
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

  <h2>{m.sec_props()}</h2>
  <PropsTable component={CarouselItemModule} />

  <h2>{m.sec_events()}</h2>
  <EventsTable component={CarouselItemModule} />

  <h2>{m.sec_accessibility()}</h2>
  <ul>
    <li>{m.carouselitem_a11y_1_0()}<code>role="tabpanel"</code>{m.carouselitem_a11y_1_1()}<code>aria-roledescription="slide"</code>{m.carouselitem_a11y_1_2()}</li>
    <li>{m.carouselitem_a11y_2_0()}<code>aria-hidden</code>{m.carouselitem_a11y_2_1()}</li>
    <li>{m.carouselitem_a11y_3()}</li>
  </ul>

  <h2>{m.sec_keyboard()}</h2>
  <p>{m.carouselitem_kb_note()}</p>
</Container>

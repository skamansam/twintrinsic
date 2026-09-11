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
import { m } from "$lib/paraglide/messages.js"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>{m.carousel_heading()}</h1>

  <p>
    <strong>{m.carousel_heading()}</strong>{m.carousel_intro_1()}
  </p>

  <h2>{m.sec_what_when_why()}</h2>

  <h3>{m.sec_what()}</h3>
  <p>{m.carousel_what_1()}</p>

  <h3>{m.sec_when()}</h3>
  <p>
    {m.carousel_when_1()}<code>&lt;Carousel&gt;</code>{m.carousel_when_2()}<code>&lt;DataTable&gt;</code>{m.carousel_when_3()}
  </p>

  <h3>{m.sec_why()}</h3>
  <ul>
    <li><strong>{m.carousel_why_touch()}</strong>{m.carousel_why_touch_desc()}</li>
    <li><strong>{m.carousel_why_a11y()}</strong>{m.carousel_why_a11y_desc()}</li>
    <li><strong>{m.carousel_why_flexible()}</strong>{m.carousel_why_flexible_desc()}</li>
  </ul>

  <h3>{m.sec_sources()}</h3>
  <ul>
    <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/carousel/">WAI-ARIA APG — Carousel</a></li>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-type">MDN — CSS Scroll Snap</a></li>
    <li><a href="https://m3.material.io/components/carousel/overview">Material Design 3 — Carousel</a></li>
    <li><a href="https://primer.style/components/overlay">Primer — Overlay</a></li>
    <li><a href="https://ant.design/components/carousel">Ant Design — Carousel</a></li>
  </ul>

  <h2>{m.sec_responsiveness()}</h2>
  <ul>
    <li>{m.carousel_responsive_1()}</li>
    <li>{m.carousel_responsive_2()}</li>
    <li>{m.carousel_responsive_3()}</li>
  </ul>

  <h2>{m.sec_customization()}</h2>
  <ul>
    <li><code>transition</code>{m.carousel_custom_1_1()}<code>&quot;slide&quot;</code>{m.carousel_custom_1_2()}<code>&quot;fade&quot;</code>{m.carousel_custom_1_3()}</li>
    <li><code>autoplay</code>{m.carousel_custom_2_1()}<code>interval</code>{m.carousel_custom_2_2()}</li>
    <li><code>showArrows</code>{m.carousel_custom_3_1()}<code>showIndicators</code>{m.carousel_custom_3_2()}</li>
    <li>{m.carousel_custom_4_1()}<code>text-text dark:text-white</code>{m.carousel_custom_4_2()}</li>
  </ul>

  <h2>{m.sec_examples()}</h2>

  <h3>{m.carousel_ex_gallery()}</h3>
  <ExampleTabs code={`<Carousel>
  {#snippet items()}
    <CarouselItem>
      <img src="https://picsum.photos/id/10/800/400" alt="Forest" class="w-full h-64 object-cover rounded-lg" />
    </CarouselItem>
    <CarouselItem>
      <img src="https://picsum.photos/id/20/800/400" alt="Beach" class="w-full h-64 object-cover rounded-lg" />
    </CarouselItem>
    <CarouselItem>
      <img src="https://picsum.photos/id/30/800/400" alt="Mountain" class="w-full h-64 object-cover rounded-lg" />
    </CarouselItem>
  {/snippet}
</Carousel>`}>
    <div class="max-w-2xl" data-testid="carousel-basic">
      <Carousel>
        {#snippet items()}
          <CarouselItem>
            <div class="h-64 bg-primary-100 dark:bg-primary-900 flex flex-col items-center justify-center rounded-lg text-center px-8">
              <h2 class="text-2xl font-bold text-text dark:text-white">Unlimited projects</h2>
              <p class="mt-2 text-text dark:text-gray-300">Create as many workspaces and boards as you need.</p>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div class="h-64 bg-secondary-100 dark:bg-secondary-900 flex flex-col items-center justify-center rounded-lg text-center px-8">
              <h2 class="text-2xl font-bold text-text dark:text-white">Real-time collaboration</h2>
              <p class="mt-2 text-text dark:text-gray-300">Invite teammates and edit together, live.</p>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div class="h-64 bg-success-100 dark:bg-success-900 flex flex-col items-center justify-center rounded-lg text-center px-8">
              <h2 class="text-2xl font-bold text-text dark:text-white">Enterprise-grade security</h2>
              <p class="mt-2 text-text dark:text-gray-300">SOC 2, SSO, and granular role-based access control.</p>
            </div>
          </CarouselItem>
        {/snippet}
      </Carousel>
    </div>
  </ExampleTabs>

  <h3>{m.carousel_ex_features()}</h3>
  <ExampleTabs code={`<Carousel autoplay interval={4000}>
  {#snippet items()}
    <CarouselItem>
      <div class="h-64 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center rounded-lg">
        <div class="text-center text-white">
          <h2 class="text-3xl font-bold">Lightning Fast</h2>
          <p class="mt-2 text-blue-100">Built on modern web standards for peak performance.</p>
        </div>
      </div>
    </CarouselItem>
    <CarouselItem>
      <div class="h-64 bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center rounded-lg">
        <div class="text-center text-white">
          <h2 class="text-3xl font-bold">Fully Accessible</h2>
          <p class="mt-2 text-emerald-100">WCAG 2.1 compliant with keyboard navigation.</p>
        </div>
      </div>
    </CarouselItem>
  {/snippet}
</Carousel>`}>
    <div class="max-w-2xl" data-testid="carousel-features">
      <Carousel autoplay interval={4000}>
        {#snippet items()}
          <CarouselItem>
            <div class="h-64 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center rounded-lg">
              <div class="text-center text-white">
                <h2 class="text-3xl font-bold">Lightning Fast</h2>
                <p class="mt-2 text-blue-100">Built on modern web standards for peak performance.</p>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div class="h-64 bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center rounded-lg">
              <div class="text-center text-white">
                <h2 class="text-3xl font-bold">Fully Accessible</h2>
                <p class="mt-2 text-emerald-100">WCAG 2.1 compliant with keyboard navigation.</p>
              </div>
            </div>
          </CarouselItem>
        {/snippet}
      </Carousel>
    </div>
  </ExampleTabs>

  <h3>{m.carousel_ex_autoplay()}</h3>
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
              <h2 class="text-2xl font-bold text-text dark:text-white">Announcing Acme 3.0</h2>
              <p class="mt-2 text-text dark:text-gray-300">A faster, more accessible platform is here.</p>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div class="h-64 bg-secondary-100 dark:bg-secondary-900 flex flex-col items-center justify-center rounded-lg text-center px-8">
              <h2 class="text-2xl font-bold text-text dark:text-white">New pricing plans</h2>
              <p class="mt-2 text-text dark:text-gray-300">Save 20% when you switch to yearly billing.</p>
            </div>
          </CarouselItem>
        {/snippet}
      </Carousel>
    </div>
  </ExampleTabs>

  <h3>{m.carousel_ex_fade()}</h3>
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

  <h3>{m.carousel_ex_noindicators()}</h3>
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

  <h2>{m.carousel_props_heading()}</h2>
  <PropsTable component={CarouselModule} />

  <h2>{m.carouselitem_props_heading()}</h2>
  <PropsTable component={CarouselItemModule} />

  <h2>{m.carousel_events_heading()}</h2>
  <EventsTable component={CarouselModule} />

  <h2>{m.sec_accessibility()}</h2>
  <ul>
    <li>{m.carousel_a11y_1_0()}<code>role="region"</code>{m.carousel_a11y_1_1()}<code>aria-label</code>{m.carousel_a11y_1_2()}</li>
    <li>{m.carousel_a11y_2_0()}<code>role="tablist"</code>{m.carousel_a11y_2_1()}<code>aria-controls</code>{m.carousel_a11y_2_2()}</li>
    <li><code>aria-live="polite"</code>{m.carousel_a11y_3_1()}</li>
    <li>{m.carousel_a11y_4()}</li>
  </ul>

  <h2>{m.sec_keyboard()}</h2>
  <table>
    <thead><tr><th>{m.sec_key()}</th><th>{m.sec_function()}</th></tr></thead>
    <tbody>
      <tr><td><kbd>Left Arrow</kbd></td><td>{m.carousel_kb_1()}</td></tr>
      <tr><td><kbd>Right Arrow</kbd></td><td>{m.carousel_kb_2()}</td></tr>
      <tr><td><kbd>Home</kbd></td><td>{m.carousel_kb_3()}</td></tr>
      <tr><td><kbd>End</kbd></td><td>{m.carousel_kb_4()}</td></tr>
      <tr><td><kbd>Enter</kbd> / <kbd>Space</kbd></td><td>{m.carousel_kb_5()}</td></tr>
    </tbody>
  </table>
</Container>

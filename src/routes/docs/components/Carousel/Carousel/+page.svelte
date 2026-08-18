<!--
@component
Carousel documentation page
-->
<script lang="ts">
import Carousel from "$lib/components/Carousel/Carousel.svelte"
import CarouselItem from "$lib/components/Carousel/CarouselItem.svelte"
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
import Container from "$lib/components/Container/Container.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as CarouselModule from "$lib/components/Carousel/Carousel.svelte"
import * as CarouselItemModule from "$lib/components/Carousel/CarouselItem.svelte"
</script>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>Carousel</h1>
  
  <p>
    The Carousel component is a slideshow for cycling through elements—images, cards, text, or custom markup.
    It supports various transition effects, navigation controls, and touch interactions.
  </p>

  <h2>Examples</h2>

  <h3>Basic Carousel</h3>
  <div class="not-prose mb-8 max-w-2xl" data-testid="carousel-basic">
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

  <CodeBlock language="svelte">{`<Carousel>
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
</Carousel>`}</CodeBlock>

  <h3>Autoplay Carousel</h3>
  <div class="not-prose mb-8 max-w-2xl" data-testid="carousel-autoplay">
    <Carousel autoplay interval={5000}>
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
        <CarouselItem>
          <div class="h-64 bg-success-100 dark:bg-success-900 flex flex-col items-center justify-center rounded-lg text-center px-8">
            <h2 class="text-2xl font-bold">Upcoming webinar</h2>
            <p class="mt-2">Join us to learn the best workflows for your team.</p>
          </div>
        </CarouselItem>
      {/snippet}
    </Carousel>
  </div>

  <CodeBlock language="svelte">{`<Carousel autoplay interval={5000}>
  {#snippet items()}
    <CarouselItem><!-- content --></CarouselItem>
    <CarouselItem><!-- content --></CarouselItem>
    <CarouselItem><!-- content --></CarouselItem>
  {/snippet}
</Carousel>`}</CodeBlock>

  <h3>Fade Transition</h3>
  <div class="not-prose mb-8 max-w-2xl" data-testid="carousel-fade">
    <Carousel transition="fade" class="h-64">
      {#snippet items()}
        <CarouselItem>
          <div class="h-64 bg-primary-100 dark:bg-primary-900 flex flex-col items-center justify-center rounded-lg text-center px-8">
            <h2 class="text-2xl font-bold">Design</h2>
            <p class="mt-2">Craft pixel-perfect interfaces with our components.</p>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div class="h-64 bg-secondary-100 dark:bg-secondary-900 flex flex-col items-center justify-center rounded-lg text-center px-8">
            <h2 class="text-2xl font-bold">Build</h2>
            <p class="mt-2">Ship accessible, semantic components in record time.</p>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div class="h-64 bg-success-100 dark:bg-success-900 flex flex-col items-center justify-center rounded-lg text-center px-8">
            <h2 class="text-2xl font-bold">Scale</h2>
            <p class="mt-2">Grow from prototype to production without rewrites.</p>
          </div>
        </CarouselItem>
      {/snippet}
    </Carousel>
  </div>

  <CodeBlock language="svelte">{`<Carousel transition="fade">
  {#snippet items()}
    <CarouselItem><!-- content --></CarouselItem>
    <CarouselItem><!-- content --></CarouselItem>
    <CarouselItem><!-- content --></CarouselItem>
  {/snippet}
</Carousel>`}</CodeBlock>

  <h3>Without Indicators</h3>
  <div class="not-prose mb-8 max-w-2xl" data-testid="carousel-no-indicators">
    <Carousel showIndicators={false}>
      {#snippet items()}
        <CarouselItem>
          <div class="h-64 bg-primary-100 dark:bg-primary-900 flex flex-col items-center justify-center rounded-lg text-center px-8">
            <h2 class="text-2xl font-bold">Built for teams</h2>
            <p class="mt-2">Role-based access and shared workspaces.</p>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div class="h-64 bg-secondary-100 dark:bg-secondary-900 flex flex-col items-center justify-center rounded-lg text-center px-8">
            <h2 class="text-2xl font-bold">Integrates with your stack</h2>
            <p class="mt-2">Connect the tools your team already uses.</p>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div class="h-64 bg-success-100 dark:bg-success-900 flex flex-col items-center justify-center rounded-lg text-center px-8">
            <h2 class="text-2xl font-bold">24/7 support</h2>
            <p class="mt-2">Get help whenever you need it.</p>
          </div>
        </CarouselItem>
      {/snippet}
    </Carousel>
  </div>

  <CodeBlock language="svelte">{`<Carousel showIndicators={false}>
  {#snippet items()}
    <CarouselItem><!-- content --></CarouselItem>
    <CarouselItem><!-- content --></CarouselItem>
    <CarouselItem><!-- content --></CarouselItem>
  {/snippet}
</Carousel>`}</CodeBlock>

  <h3>Image Carousel</h3>
  <div class="not-prose mb-8 max-w-2xl" data-testid="carousel-images">
    <Carousel>
      {#snippet items()}
        <CarouselItem>
          <img 
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb" 
            alt="Landscape 1" 
            class="w-full h-64 object-cover rounded-lg"
          />
        </CarouselItem>
        <CarouselItem>
          <img 
            src="https://images.unsplash.com/photo-1511884642898-4c92249e20b6" 
            alt="Landscape 2" 
            class="w-full h-64 object-cover rounded-lg"
          />
        </CarouselItem>
        <CarouselItem>
          <img 
            src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05" 
            alt="Landscape 3" 
            class="w-full h-64 object-cover rounded-lg"
          />
        </CarouselItem>
      {/snippet}
    </Carousel>
  </div>

  <CodeBlock language="svelte">{`<Carousel>
  {#snippet items()}
    <CarouselItem>
      <img 
        src="https://images.unsplash.com/photo-1506744038136-46273834b3fb" 
        alt="Landscape 1" 
        class="w-full h-64 object-cover rounded-lg"
      />
    </CarouselItem>
    <CarouselItem>
      <img 
        src="https://images.unsplash.com/photo-1511884642898-4c92249e20b6" 
        alt="Landscape 2" 
        class="w-full h-64 object-cover rounded-lg"
      />
    </CarouselItem>
    <CarouselItem>
      <img 
        src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05" 
        alt="Landscape 3" 
        class="w-full h-64 object-cover rounded-lg"
      />
    </CarouselItem>
  {/snippet}
</Carousel>`}</CodeBlock>

  <h2>Carousel Props</h2>
  <PropsTable component={CarouselModule} />

  <h2>CarouselItem Props</h2>
  <PropsTable component={CarouselItemModule} />

  <h2>Carousel Events</h2>
  <EventsTable component={CarouselModule} />

  <h2>Carousel Slots</h2>
  <table>
    <thead>
      <tr>
        <th>Slot</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>items</code></td>
        <td>Container for CarouselItem components</td>
      </tr>
      <tr>
        <td><code>prev-arrow</code></td>
        <td>Custom previous arrow button</td>
      </tr>
      <tr>
        <td><code>next-arrow</code></td>
        <td>Custom next arrow button</td>
      </tr>
      <tr>
        <td><code>indicators</code></td>
        <td>Custom indicators</td>
      </tr>
    </tbody>
  </table>

  <h2>Accessibility</h2>
  <p>
    The Carousel component follows accessibility best practices:
  </p>
  <ul>
    <li>Uses <code>role="region"</code> with an appropriate <code>aria-label</code></li>
    <li>Uses <code>role="tablist"</code> for indicators with <code>aria-controls</code> references</li>
    <li>Uses <code>aria-live="polite"</code> to announce slide changes to screen readers</li>
    <li>Provides proper ARIA labels for navigation controls</li>
    <li>Supports keyboard navigation</li>
    <li>Pauses autoplay when the user interacts with controls</li>
  </ul>

  <h2>Keyboard Support</h2>
  <table>
    <thead>
      <tr>
        <th>Key</th>
        <th>Function</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><kbd>Tab</kbd></td>
        <td>Moves focus through interactive elements</td>
      </tr>
      <tr>
        <td><kbd>Left Arrow</kbd></td>
        <td>Moves to the previous slide</td>
      </tr>
      <tr>
        <td><kbd>Right Arrow</kbd></td>
        <td>Moves to the next slide</td>
      </tr>
      <tr>
        <td><kbd>Home</kbd></td>
        <td>Moves to the first slide</td>
      </tr>
      <tr>
        <td><kbd>End</kbd></td>
        <td>Moves to the last slide</td>
      </tr>
      <tr>
        <td><kbd>Enter</kbd> or <kbd>Space</kbd></td>
        <td>When focus is on an indicator, activates the corresponding slide</td>
      </tr>
    </tbody>
  </table>
</Container>

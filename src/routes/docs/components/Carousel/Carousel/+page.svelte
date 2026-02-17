<!--
@component
Carousel documentation page
-->
<script lang="ts">
import Container from "$lib/components/Container/Container.svelte"
import Carousel from "$lib/components/Carousel/Carousel.svelte"
import CarouselItem from "$lib/components/Carousel/CarouselItem.svelte"
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
</script>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>Carousel</h1>
  
  <p>
    The Carousel component is a slideshow for cycling through elements—images, cards, text, or custom markup.
    It supports various transition effects, navigation controls, and touch interactions.
  </p>

  <h2>Examples</h2>

  <h3>Basic Carousel</h3>
  <div class="not-prose mb-8 max-w-2xl">
    <Carousel>
      <div slot="items">
        <CarouselItem>
          <div class="h-64 bg-primary-100 dark:bg-primary-900 flex items-center justify-center rounded-lg">
            <h2 class="text-2xl font-bold">Slide 1</h2>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div class="h-64 bg-secondary-100 dark:bg-secondary-900 flex items-center justify-center rounded-lg">
            <h2 class="text-2xl font-bold">Slide 2</h2>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div class="h-64 bg-success-100 dark:bg-success-900 flex items-center justify-center rounded-lg">
            <h2 class="text-2xl font-bold">Slide 3</h2>
          </div>
        </CarouselItem>
      </div>
    </Carousel>
  </div>

  <CodeBlock language="svelte">{`{`<Carousel>
  <div slot="items">
    <CarouselItem>
      <div class="h-64 bg-primary-100 dark:bg-primary-900 flex items-center justify-center rounded-lg">
        <h2 class="text-2xl font-bold">Slide 1</h2>
      </div>
    </CarouselItem>
    <CarouselItem>
      <div class="h-64 bg-secondary-100 dark:bg-secondary-900 flex items-center justify-center rounded-lg">
        <h2 class="text-2xl font-bold">Slide 2</h2>
      </div>
    </CarouselItem>
    <CarouselItem>
      <div class="h-64 bg-success-100 dark:bg-success-900 flex items-center justify-center rounded-lg">
        <h2 class="text-2xl font-bold">Slide 3</h2>
      </div>
    </CarouselItem>
  </div>
</Carousel>`}</CodeBlock>

  <h3>Autoplay Carousel</h3>
  <div class="not-prose mb-8 max-w-2xl">
    <Carousel autoplay interval={5000}>
      <div slot="items">
        <CarouselItem>
          <div class="h-64 bg-primary-100 dark:bg-primary-900 flex items-center justify-center rounded-lg">
            <h2 class="text-2xl font-bold">Slide 1</h2>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div class="h-64 bg-secondary-100 dark:bg-secondary-900 flex items-center justify-center rounded-lg">
            <h2 class="text-2xl font-bold">Slide 2</h2>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div class="h-64 bg-success-100 dark:bg-success-900 flex items-center justify-center rounded-lg">
            <h2 class="text-2xl font-bold">Slide 3</h2>
          </div>
        </CarouselItem>
      </div>
    </Carousel>
  </div>

  <CodeBlock language="svelte">{`{`<Carousel autoplay interval={5000}>
  <div slot="items">
    <CarouselItem><!-- content --></CarouselItem>
    <CarouselItem><!-- content --></CarouselItem>
    <CarouselItem><!-- content --></CarouselItem>
  </div>
</Carousel>`}</CodeBlock>

  <h3>Fade Transition</h3>
  <div class="not-prose mb-8 max-w-2xl">
    <Carousel transition="fade">
      <div slot="items">
        <CarouselItem>
          <div class="h-64 bg-primary-100 dark:bg-primary-900 flex items-center justify-center rounded-lg">
            <h2 class="text-2xl font-bold">Slide 1</h2>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div class="h-64 bg-secondary-100 dark:bg-secondary-900 flex items-center justify-center rounded-lg">
            <h2 class="text-2xl font-bold">Slide 2</h2>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div class="h-64 bg-success-100 dark:bg-success-900 flex items-center justify-center rounded-lg">
            <h2 class="text-2xl font-bold">Slide 3</h2>
          </div>
        </CarouselItem>
      </div>
    </Carousel>
  </div>

  <CodeBlock language="svelte">{`{`<Carousel transition="fade">
  <div slot="items">
    <CarouselItem><!-- content --></CarouselItem>
    <CarouselItem><!-- content --></CarouselItem>
    <CarouselItem><!-- content --></CarouselItem>
  </div>
</Carousel>`}</CodeBlock>

  <h3>Without Indicators</h3>
  <div class="not-prose mb-8 max-w-2xl">
    <Carousel showIndicators={false}>
      <div slot="items">
        <CarouselItem>
          <div class="h-64 bg-primary-100 dark:bg-primary-900 flex items-center justify-center rounded-lg">
            <h2 class="text-2xl font-bold">Slide 1</h2>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div class="h-64 bg-secondary-100 dark:bg-secondary-900 flex items-center justify-center rounded-lg">
            <h2 class="text-2xl font-bold">Slide 2</h2>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div class="h-64 bg-success-100 dark:bg-success-900 flex items-center justify-center rounded-lg">
            <h2 class="text-2xl font-bold">Slide 3</h2>
          </div>
        </CarouselItem>
      </div>
    </Carousel>
  </div>

  <CodeBlock language="svelte">{`{`<Carousel showIndicators={false}>
  <div slot="items">
    <CarouselItem><!-- content --></CarouselItem>
    <CarouselItem><!-- content --></CarouselItem>
    <CarouselItem><!-- content --></CarouselItem>
  </div>
</Carousel>`}</CodeBlock>

  <h3>Image Carousel</h3>
  <div class="not-prose mb-8 max-w-2xl">
    <Carousel>
      <div slot="items">
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
      </div>
    </Carousel>
  </div>

  <CodeBlock language="svelte">{`{`<Carousel>
  <div slot="items">
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
  </div>
</Carousel>`}</CodeBlock>

  <h2>Carousel Props</h2>
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
        <td><code>activeIndex</code></td>
        <td><code>number</code></td>
        <td><code>0</code></td>
        <td>Index of the active slide</td>
      </tr>
      <tr>
        <td><code>showArrows</code></td>
        <td><code>boolean</code></td>
        <td><code>true</code></td>
        <td>Whether to show navigation arrows</td>
      </tr>
      <tr>
        <td><code>showIndicators</code></td>
        <td><code>boolean</code></td>
        <td><code>true</code></td>
        <td>Whether to show slide indicators</td>
      </tr>
      <tr>
        <td><code>autoplay</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether to automatically cycle through slides</td>
      </tr>
      <tr>
        <td><code>interval</code></td>
        <td><code>number</code></td>
        <td><code>3000</code></td>
        <td>Delay between automatically cycling slides (in ms)</td>
      </tr>
      <tr>
        <td><code>pauseOnHover</code></td>
        <td><code>boolean</code></td>
        <td><code>true</code></td>
        <td>Whether to pause autoplay on hover</td>
      </tr>
      <tr>
        <td><code>circular</code></td>
        <td><code>boolean</code></td>
        <td><code>true</code></td>
        <td>Whether to loop back to the first slide after the last</td>
      </tr>
      <tr>
        <td><code>swipeable</code></td>
        <td><code>boolean</code></td>
        <td><code>true</code></td>
        <td>Whether to enable swipe gestures on touch devices</td>
      </tr>
      <tr>
        <td><code>transition</code></td>
        <td><code>string</code></td>
        <td><code>"slide"</code></td>
        <td>Transition effect ("slide" or "fade")</td>
      </tr>
      <tr>
        <td><code>transitionDuration</code></td>
        <td><code>number</code></td>
        <td><code>300</code></td>
        <td>Duration of transition animations (in ms)</td>
      </tr>
      <tr>
        <td><code>ariaLabel</code></td>
        <td><code>string</code></td>
        <td><code>"Carousel"</code></td>
        <td>ARIA label for the carousel</td>
      </tr>
      <tr>
        <td><code>prevAriaLabel</code></td>
        <td><code>string</code></td>
        <td><code>"Previous slide"</code></td>
        <td>ARIA label for the previous button</td>
      </tr>
      <tr>
        <td><code>nextAriaLabel</code></td>
        <td><code>string</code></td>
        <td><code>"Next slide"</code></td>
        <td>ARIA label for the next button</td>
      </tr>
      <tr>
        <td><code>class</code></td>
        <td><code>string</code></td>
        <td><code>""</code></td>
        <td>Additional CSS classes</td>
      </tr>
    </tbody>
  </table>

  <h2>CarouselItem Props</h2>
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
        <td><code>active</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether the item is active</td>
      </tr>
      <tr>
        <td><code>class</code></td>
        <td><code>string</code></td>
        <td><code>""</code></td>
        <td>Additional CSS classes</td>
      </tr>
    </tbody>
  </table>

  <h2>Carousel Events</h2>
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
        <td><code>change</code></td>
        <td><code>{`{ index: number }`}</code></td>
        <td>Fired when the active slide changes</td>
      </tr>
    </tbody>
  </table>

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

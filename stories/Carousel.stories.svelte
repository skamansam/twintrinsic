<script module>
import { defineMeta } from "@storybook/addon-svelte-csf"
import Carousel from "$lib/components/Carousel/Carousel.svelte"
import CarouselItem from "$lib/components/Carousel/CarouselItem.svelte"

const { Story } = defineMeta({
  title: "Components/Carousel",
  component: Carousel,
  tags: ["autodocs"],
  argTypes: {
    activeIndex: { control: "number" },
    showArrows: { control: "boolean" },
    showIndicators: { control: "boolean" },
    autoplay: { control: "boolean" },
    interval: { control: "number" },
    pauseOnHover: { control: "boolean" },
    circular: { control: "boolean" },
    swipeable: { control: "boolean" },
    transition: {
      control: { type: "select" },
      options: ["slide", "fade"],
    },
    transitionDuration: { control: "number" },
  },
  args: {
    activeIndex: 0,
    showArrows: true,
    showIndicators: true,
    autoplay: false,
    interval: 3000,
    pauseOnHover: true,
    circular: true,
    swipeable: true,
    transition: "slide",
    transitionDuration: 300,
  },
})
</script>

<Story name="Basic">
  <div class="w-full max-w-2xl mx-auto">
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
</Story>

<Story name="Autoplay">
  <div class="w-full max-w-2xl mx-auto">
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
</Story>

<Story name="Fade Transition">
  <div class="w-full max-w-2xl mx-auto">
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
</Story>

<Story name="With Images">
  <div class="w-full max-w-2xl mx-auto">
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
</Story>

<script module>
import { defineMeta } from "@storybook/addon-svelte-csf"
import { expect } from "storybook/test"
import Carousel from "$lib/components/Carousel/Carousel.svelte"
import CarouselItem from "$lib/components/Carousel/CarouselItem.svelte"

const { Story } = defineMeta({
  title: "Data Display/Carousel",
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

<Story
  name="Basic"
  play={async ({ canvas }) => {
    await expect(canvas.getByText("Unlimited projects")).toBeInTheDocument();
    await expect(canvas.getByRole("button", { name: /previous/i })).toBeInTheDocument();
    await expect(canvas.getByRole("button", { name: /next/i })).toBeInTheDocument();
  }}
>
  <div class="w-full max-w-2xl mx-auto">
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
</Story>

<Story name="Autoplay">
  <div class="w-full max-w-2xl mx-auto">
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
</Story>

<Story name="Fade Transition">
  <div class="w-full max-w-2xl mx-auto">
    <Carousel transition="fade">
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
</Story>

<Story name="With Images">
  <div class="w-full max-w-2xl mx-auto">
    <Carousel>
      {#snippet items()}
        <CarouselItem>
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
            alt="Mountain landscape at sunrise"
            class="w-full h-64 object-cover rounded-lg"
          />
        </CarouselItem>
        <CarouselItem>
          <img
            src="https://images.unsplash.com/photo-1511884642898-4c92249e20b6"
            alt="Forest valley"
            class="w-full h-64 object-cover rounded-lg"
          />
        </CarouselItem>
        <CarouselItem>
          <img
            src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05"
            alt="Misty green hills"
            class="w-full h-64 object-cover rounded-lg"
          />
        </CarouselItem>
      {/snippet}
    </Carousel>
  </div>
</Story>

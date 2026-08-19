<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Card from "../src/lib/components/Card/Card.svelte";

  const { Story } = defineMeta({
    title: "Basic/Card",
    component: Card,
    tags: ["autodocs"],
    argTypes: {
      hoverable: { control: "boolean" },
      bordered: { control: "boolean" },
      shadowed: { control: "boolean" },
      compact: { control: "boolean" },
      href: { control: "text" },
      image: { control: "text" },
      imageAlt: { control: "text" },
    },
  });
</script>

<Story name="Default">
  <Card>
    {#snippet header()}Product Details{/snippet}
    <p class="font-medium text-lg">Wireless Noise-Cancelling Headphones</p>
    <p class="text-muted mt-1">Up to 30 hours of battery life with active noise cancelling.</p>
    <p class="mt-3 text-lg font-semibold">$199.99</p>
  </Card>
</Story>

<Story name="With Media" args={{ hoverable: true }}>
  <Card hoverable={true}>
    {#snippet media()}
      <img
        src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop"
        alt="Featured blog post cover"
        class="w-full h-48 object-cover"
      />
    {/snippet}
    {#snippet header()}Announcing Twintrinsic 2.0{/snippet}
    <p class="text-muted">We're excited to share a faster, more accessible release with 20+ new components and a fully revamped theming system.</p>
    <p class="mt-3 text-sm text-primary-600 font-medium">Read more →</p>
  </Card>
</Story>

<Story name="With Footer">
  <Card>
    {#snippet header()}Monthly Report — August 2026{/snippet}
    <p class="text-muted">Revenue grew 18% month over month, driven by the new Pro tier and expanded enterprise deals.</p>
    <div class="mt-3 flex gap-4 text-sm">
      <span class="text-success-600">↑ $42,300 revenue</span>
      <span class="text-muted">1,204 active users</span>
    </div>
    {#snippet footer()}
      <div class="flex justify-end space-x-2">
        <button class="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark">
          View report
        </button>
      </div>
    {/snippet}
  </Card>
</Story>

<Story name="Clickable" args={{ href: "#", hoverable: true }}>
  <Card href="#" hoverable={true}>
    {#snippet header()}Open Project{/snippet}
    <p class="font-medium">Website Redesign</p>
    <p class="text-muted mt-1">Last updated 2 hours ago by Sarah Chen</p>
    <div class="mt-3 flex items-center gap-2">
      <span class="px-2 py-1 rounded-full bg-primary-100 text-primary-700 text-xs">In progress</span>
      <span class="text-xs text-muted">12 tasks remaining</span>
    </div>
  </Card>
</Story>

<Story name="Product Grid">
  {@const products = [
      {
        name: "Wireless Noise-Cancelling Headphones",
        price: "$199.99",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop",
        imageAlt: "Wireless over-ear headphones",
      },
      {
        name: "Running Sneakers",
        price: "$89.99",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=400&fit=crop",
        imageAlt: "A pair of running sneakers",
      },
      {
        name: "Automatic Wristwatch",
        price: "$249.00",
        image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600&h=400&fit=crop",
        imageAlt: "Automatic wristwatch with leather strap",
      },
      {
        name: "Canvas Backpack",
        price: "$64.50",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=400&fit=crop",
        imageAlt: "Canvas travel backpack",
      },
      {
        name: "Polarized Sunglasses",
        price: "$39.99",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&h=400&fit=crop",
        imageAlt: "Polarized sunglasses on a flat surface",
      },
      {
        name: "Mirrorless Camera",
        price: "$799.00",
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&h=400&fit=crop",
        imageAlt: "Mirrorless digital camera",
      },
    ]}
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each products as product (product.name)}
        <Card href="#" hoverable image={product.image} imageAlt={product.imageAlt}>
          {#snippet header()}{product.name}{/snippet}
          <p class="text-lg font-semibold">{product.price}</p>
          {#snippet footer()}
            <button class="w-full px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark">
              Add to cart
            </button>
          {/snippet}
        </Card>
      {/each}
    </div>
</Story>

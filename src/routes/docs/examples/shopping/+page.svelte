<script lang="ts">
  import Card from "$lib/components/Card/Card.svelte"
  import Footer from "$lib/components/Footer/Footer.svelte"
  import Checkbox from "$lib/components/Form/Checkbox.svelte"
  import Rating from "$lib/components/Form/Rating.svelte"
  import Slider from "$lib/components/Form/Slider.svelte"
  import MenuItem from "$lib/components/Menu/Menu/MenuItem.svelte"

  // Mega-footer link columns, similar to a large retail site's footer.
  const footerColumns = [
    {
      title: "Get to Know Us",
      links: ["About Us", "Careers", "Press Releases", "Corporate Responsibility"],
    },
    {
      title: "Shop with Us",
      links: ["Your Account", "Your Orders", "Gift Cards", "Registry"],
    },
    {
      title: "Payment Options",
      links: ["Payment Methods", "Shop with Points", "Currency Converter"],
    },
    {
      title: "Let Us Help You",
      links: ["Your Purchases", "Shipping Rates & Policies", "Returns & Replacements", "Help"],
    },
  ]

  // Category nav links rendered just below the hero banner, similar to a
  // retail site's persistent top-level navigation row.
  const categoryLinks = [
    { label: "Today's Deals", href: "#" },
    { label: "Customer Service", href: "#" },
    { label: "Registry", href: "#" },
    { label: "Gift Cards", href: "#" },
    { label: "Sell", href: "#" },
  ]

  const departments = ["Electronics", "Home & Kitchen", "Clothing", "Sports & Outdoors", "Books", "Toys & Games"]
  const brands = ["Acme", "Northwind", "Contoso", "Globex", "Initech"]

  let selectedDepartments = $state<string[]>(["Electronics"])
  let selectedBrands = $state<string[]>([])
  let maxPrice = $state(500)
  let minRating = $state(0)

  function toggleFilter(list: string[], value: string): string[] {
    return list.includes(value) ? list.filter((item) => item !== value) : [...list, value]
  }

  const products = [
    {
      name: "Wireless Noise-Cancelling Headphones",
      price: "$199.99",
      rating: 4.5,
      reviews: 2318,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop",
      imageAlt: "Wireless over-ear headphones",
    },
    {
      name: "Running Sneakers",
      price: "$89.99",
      rating: 4,
      reviews: 842,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=400&fit=crop",
      imageAlt: "A pair of running sneakers",
    },
    {
      name: "Automatic Wristwatch",
      price: "$249.00",
      rating: 5,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600&h=400&fit=crop",
      imageAlt: "Automatic wristwatch with leather strap",
    },
    {
      name: "Canvas Backpack",
      price: "$64.50",
      rating: 4.5,
      reviews: 1023,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=400&fit=crop",
      imageAlt: "Canvas travel backpack",
    },
    {
      name: "Polarized Sunglasses",
      price: "$39.99",
      rating: 3.5,
      reviews: 421,
      image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&h=400&fit=crop",
      imageAlt: "Polarized sunglasses on a flat surface",
    },
    {
      name: "Mirrorless Camera",
      price: "$799.00",
      rating: 5,
      reviews: 289,
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&h=400&fit=crop",
      imageAlt: "Mirrorless digital camera",
    },
  ]
</script>

<!-- Build This Yourself Banner -->
<div id="top" class="mb-8 bg-blue-50 dark:bg-blue-950 border-l-4 border-blue-500 p-4 rounded">
  <div class="flex items-center justify-between">
    <div>
      <h3 class="font-semibold text-blue-900 dark:text-blue-100">Build this yourself!</h3>
      <p class="text-sm text-blue-800 dark:text-blue-200 mt-1">
        An Amazon-style shopping page built from <code>Card</code>, <code>Checkbox</code>,
        <code>Slider</code>, <code>Rating</code>, and <code>MenuItem</code>.
      </p>
    </div>
    <a
      href="/docs/examples/shopping/guide"
      class="ml-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded font-medium whitespace-nowrap transition-colors"
    >
      View Guide
    </a>
  </div>
</div>

<div class="-mx-5">
  <!-- Large hero header with a background image -->
  <header
    class="relative bg-[url('https://images.unsplash.com/photo-1607082349566-187342175e2f?w=1600&h=500&fit=crop')] bg-cover bg-center"
  >
    <div class="bg-black/50">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <h1 class="text-3xl sm:text-5xl font-bold text-white max-w-xl">
          Big Deals on Everything You Need
        </h1>
        <p class="mt-4 text-white/90 max-w-lg">
          Shop electronics, apparel, home goods and more — all in one place.
        </p>
        <a
          href="#products"
          class="inline-block mt-6 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-md font-medium"
        >
          Shop Now
        </a>
      </div>
    </div>
  </header>

  <!-- Category nav row, sitting directly below the hero -->
  <nav
    aria-label="Categories"
    class="bg-surface dark:bg-surface border-b border-border dark:border-border"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap gap-1">
      {#each categoryLinks as link (link.label)}
        <MenuItem href={link.href} class="!inline-block !w-auto">{link.label}</MenuItem>
      {/each}
    </div>
  </nav>
</div>

<!-- Filters + product grid -->
<div id="products" class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
  <div class="grid grid-cols-1 lg:grid-cols-[16rem_1fr] gap-8">
    <!-- Left filter sidebar -->
    <aside aria-label="Filters" class="space-y-8">
      <div>
        <h2 class="font-semibold mb-3">Department</h2>
        <div class="space-y-2">
          {#each departments as department (department)}
            <Checkbox
              label={department}
              checked={selectedDepartments.includes(department)}
              onchange={() => (selectedDepartments = toggleFilter(selectedDepartments, department))}
            />
          {/each}
        </div>
      </div>

      <div>
        <h2 class="font-semibold mb-3">Max Price</h2>
        <Slider
          value={maxPrice}
          min={0}
          max={1000}
          step={10}
          showValue
          valueFormat={"Up to {value}"}
          ariaLabel="Maximum price"
          oninput={(e: CustomEvent<{ value: number }>) => (maxPrice = e.detail.value)}
        />
      </div>

      <div>
        <h2 class="font-semibold mb-3">Customer Rating</h2>
        <Rating
          value={minRating}
          max={5}
          step={0.5}
          showValue
          onchange={(e: CustomEvent<{ value: number }>) => (minRating = e.detail.value)}
        />
      </div>

      <div>
        <h2 class="font-semibold mb-3">Brand</h2>
        <div class="space-y-2">
          {#each brands as brand (brand)}
            <Checkbox
              label={brand}
              checked={selectedBrands.includes(brand)}
              onchange={() => (selectedBrands = toggleFilter(selectedBrands, brand))}
            />
          {/each}
        </div>
      </div>
    </aside>

    <!-- Product grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {#each products as product (product.name)}
        <Card href="#" hoverable image={product.image} imageAlt={product.imageAlt}>
          {#snippet header()}{product.name}{/snippet}
          <Rating value={product.rating} max={5} step={0.5} readonly size="sm" showValue />
          <p class="text-sm text-muted mt-1">{product.reviews.toLocaleString()} reviews</p>
          <p class="text-lg font-semibold mt-2">{product.price}</p>
          {#snippet footer()}
            <button class="w-full px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded font-medium">
              Add to Cart
            </button>
          {/snippet}
        </Card>
      {/each}
    </div>
  </div>
</div>

<!-- Large multi-column footer -->
<div class="-mx-5">
  <a
    href="#top"
    class="block text-center py-4 bg-muted/20 dark:bg-muted/20 hover:bg-muted/30 dark:hover:bg-muted/30 text-sm font-medium"
  >
    Back to top
  </a>
  <Footer class="block! px-0! py-0! bg-gray-900 text-white">
    {#snippet center()}
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
        {#each footerColumns as column (column.title)}
          <div>
            <h3 class="font-semibold mb-3">{column.title}</h3>
            <ul class="space-y-2 text-sm">
              {#each column.links as link (link)}
                <li>
                  <!-- svelte-ignore a11y_invalid_attribute -->
                  <a href="#" class="hover:underline">{link}</a>
                </li>
              {/each}
            </ul>
          </div>
        {/each}
      </div>
      <div class="border-t border-white/10 py-4 text-center text-sm">
        © {new Date().getFullYear()} Twintrinsic Shop Example. For demonstration purposes only.
      </div>
    {/snippet}
  </Footer>
</div>

<style lang="postcss">
  @reference "$lib/twintrinsic.css";
</style>

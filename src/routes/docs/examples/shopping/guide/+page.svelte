<script lang="ts">
	import Card from '$lib/components/Card/Card.svelte'
	import Checkbox from '$lib/components/Form/Checkbox.svelte'
	import Rating from '$lib/components/Form/Rating.svelte'
	import Slider from '$lib/components/Form/Slider.svelte'

	let sampleChecked = $state(true)
	let samplePrice = $state(500)
	let sampleRating = $state(4)
</script>

<div class="space-y-8">
	<div>
		<h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Shopping Page</h1>
		<p class="text-gray-600 dark:text-gray-400">
			A walkthrough of building an e-commerce landing page — hero banner, category navigation,
			filter sidebar, product grid, and a large multi-column footer — using Twintrinsic
			components.
		</p>
	</div>

	<!-- Hero Header Section -->
	<section class="space-y-4">
		<h2 class="text-2xl font-bold text-gray-900 dark:text-white">Hero Header</h2>
		<p class="text-gray-600 dark:text-gray-400">
			A full-bleed banner with a background image sets the tone for the page. Since the docs
			layout's main content area has its own padding, the hero breaks out of it with a negative
			margin that matches that padding exactly (<code>-mx-5</code> cancels <code>App</code>'s
			<code>p-5</code>), then restores its own horizontal padding on the inner content.
		</p>
		<div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 overflow-x-auto">
			<pre class="text-sm"><code
					>{`<div class="-mx-5">
  <header class="relative bg-[url('/banner.jpg')] bg-cover bg-center">
    <div class="bg-black/50">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <h1 class="text-3xl sm:text-5xl font-bold text-white max-w-xl">
          Big Deals on Everything You Need
        </h1>
        <a href="#products" class="inline-block mt-6 px-6 py-3 bg-primary-500 text-white rounded-md">
          Shop Now
        </a>
      </div>
    </div>
  </header>
</div>`}</code
				></pre>
		</div>
	</section>

	<!-- Category Navigation Section -->
	<section class="space-y-4">
		<h2 class="text-2xl font-bold text-gray-900 dark:text-white">Category Navigation</h2>
		<p class="text-gray-600 dark:text-gray-400">
			A row of top-level links sits directly below the hero, similar to a retail site's
			persistent category bar. Each entry is a <code>MenuItem</code>, overriding its default
			block/full-width styling so it lays out inline in a flex row.
		</p>
		<div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 overflow-x-auto">
			<pre class="text-sm"><code
					>{`<nav aria-label="Categories" class="bg-surface border-b border-border">
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap gap-1">
    {#each categoryLinks as link (link.label)}
      <MenuItem href={link.href} class="!inline-block !w-auto">{link.label}</MenuItem>
    {/each}
  </div>
</nav>`}</code
				></pre>
		</div>
	</section>

	<!-- Filter Sidebar Section -->
	<section class="space-y-4">
		<h2 class="text-2xl font-bold text-gray-900 dark:text-white">Filter Sidebar</h2>
		<p class="text-gray-600 dark:text-gray-400">
			<code>Checkbox</code>, <code>Slider</code>, and <code>Rating</code> combine to build a
			typical product-filter panel. None of their <code>value</code>/<code>checked</code> props
			are two-way bindable by design — update your own state from their <code>onchange</code>/<code
			>oninput</code
			> callbacks instead.
		</p>
		<div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 space-y-6">
			<Checkbox
				label="Electronics"
				checked={sampleChecked}
				onchange={() => (sampleChecked = !sampleChecked)}
			/>
			<Slider
				value={samplePrice}
				min={0}
				max={1000}
				step={10}
				showValue
				valueFormat={'Up to {value}'}
				ariaLabel="Maximum price"
				oninput={(e: CustomEvent<{ value: number }>) => (samplePrice = e.detail.value)}
			/>
			<Rating
				value={sampleRating}
				max={5}
				step={0.5}
				showValue
				onchange={(e: CustomEvent<{ value: number }>) => (sampleRating = e.detail.value)}
			/>
		</div>
		<div class="bg-gray-900 dark:bg-gray-950 rounded-lg p-6 overflow-x-auto">
			<pre class="text-gray-100 text-sm"><code
					>{`<Checkbox
  label="Electronics"
  checked={selectedDepartments.includes('Electronics')}
  onchange={() => (selectedDepartments = toggleFilter(selectedDepartments, 'Electronics'))}
/>

<Slider
  value={maxPrice}
  min={0}
  max={1000}
  step={10}
  showValue
  valueFormat={'Up to {value}'}
  oninput={(e) => (maxPrice = e.detail.value)}
/>

<Rating
  value={minRating}
  max={5}
  step={0.5}
  showValue
  onchange={(e) => (minRating = e.detail.value)}
/>`}</code
				></pre>
		</div>
	</section>

	<!-- Product Grid Section -->
	<section class="space-y-4">
		<h2 class="text-2xl font-bold text-gray-900 dark:text-white">Product Grid</h2>
		<p class="text-gray-600 dark:text-gray-400">
			Each product is a <code>Card</code> with an <code>image</code> prop, a <code>header</code>
			snippet for the product name, a readonly <code>Rating</code> and price in the body, and a
			<code>footer</code> snippet holding the "Add to Cart" action. The <code>href</code> prop
			makes the whole card a real link, and <code>hoverable</code> adds the hover affordance.
		</p>
		<div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
			<Card
				href="#"
				hoverable
				image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop"
				imageAlt="Wireless over-ear headphones"
			>
				{#snippet header()}Wireless Noise-Cancelling Headphones{/snippet}
				<Rating value={4.5} max={5} step={0.5} readonly size="sm" showValue />
				<p class="text-lg font-semibold mt-2">$199.99</p>
				{#snippet footer()}
					<button class="w-full px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded font-medium">
						Add to Cart
					</button>
				{/snippet}
			</Card>
		</div>
		<div class="bg-gray-900 dark:bg-gray-950 rounded-lg p-6 overflow-x-auto">
			<pre class="text-gray-100 text-sm"><code
					>{`<Card href="#" hoverable image={product.image} imageAlt={product.imageAlt}>
  {#snippet header()}{product.name}{/snippet}
  <Rating value={product.rating} max={5} step={0.5} readonly size="sm" showValue />
  <p class="text-sm text-muted mt-1">{product.reviews.toLocaleString()} reviews</p>
  <p class="text-lg font-semibold mt-2">{product.price}</p>
  {#snippet footer()}
    <button class="w-full px-4 py-2 bg-primary-500 text-white rounded font-medium">
      Add to Cart
    </button>
  {/snippet}
</Card>`}</code
				></pre>
		</div>
	</section>

	<!-- Mega Footer Section -->
	<section class="space-y-4">
		<h2 class="text-2xl font-bold text-gray-900 dark:text-white">Mega Footer</h2>
		<p class="text-gray-600 dark:text-gray-400">
			Large retail sites often close with a dense, multi-column footer full of department and
			policy links. The <code>Footer</code> component's <code>center</code> snippet is used to hold
			a responsive link grid, while its default background/border are overridden to get a
			deliberately dark band.
		</p>
		<div class="bg-gray-900 dark:bg-gray-950 rounded-lg p-6 overflow-x-auto">
			<pre class="text-gray-100 text-sm"><code
					>{`<Footer class="block! px-0! py-0! bg-gray-900 text-white">
  {#snippet center()}
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {#each footerColumns as column (column.title)}
        <div>
          <h3 class="font-semibold mb-3">{column.title}</h3>
          <ul class="space-y-2 text-sm">
            {#each column.links as link (link)}
              <li><a href="#">{link}</a></li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>
  {/snippet}
</Footer>`}</code
				></pre>
		</div>
	</section>

	<!-- Best Practices Section -->
	<section class="space-y-4">
		<h2 class="text-2xl font-bold text-gray-900 dark:text-white">Best Practices</h2>
		<div class="space-y-3">
			<div class="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
				<h3 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">Breaking Out of Layout Padding</h3>
				<p class="text-blue-800 dark:text-blue-200 text-sm">
					When a section needs to be full-bleed inside a padded layout, use a negative margin
					that exactly matches the parent's padding (e.g. <code>-mx-5</code> for <code>p-5</code>),
					then re-apply your own horizontal padding on the inner content.
				</p>
			</div>
			<div class="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-4">
				<h3 class="font-semibold text-green-900 dark:text-green-100 mb-2">Controlled, Not Bindable</h3>
				<p class="text-green-800 dark:text-green-200 text-sm">
					<code>Slider</code>, <code>Rating</code>, and <code>Checkbox</code> are controlled
					components — pass <code>value</code>/<code>checked</code> down and update your own
					state from their callback props rather than reaching for <code>bind:</code>.
				</p>
			</div>
			<div class="bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
				<h3 class="font-semibold text-purple-900 dark:text-purple-100 mb-2">Real Links for Real Cards</h3>
				<p class="text-purple-800 dark:text-purple-200 text-sm">
					Passing <code>href</code> to <code>Card</code> renders it as a real anchor element
					instead of a non-semantic clickable <code>div</code>, giving you free keyboard and
					screen-reader support.
				</p>
			</div>
			<div class="bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
				<h3 class="font-semibold text-orange-900 dark:text-orange-100 mb-2">Accessible Placeholder Links</h3>
				<p class="text-orange-800 dark:text-orange-200 text-sm">
					Demo footer/category links use <code>href="#"</code> as a stand-in for real destinations.
					In production, always point links at real routes so they're meaningful to assistive
					technology and keyboard users.
				</p>
			</div>
		</div>
	</section>
</div>

<style lang="postcss">
	@reference '$lib/twintrinsic.css';
</style>

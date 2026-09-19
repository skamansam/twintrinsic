<script lang="ts">
	import Card from '$lib/components/Card/Card.svelte'
	import Checkbox from '$lib/components/Form/Checkbox.svelte'
	import Rating from '$lib/components/Form/Rating.svelte'
	import Slider from '$lib/components/Form/Slider.svelte'
	import { m } from '$lib/paraglide/messages.js'

	let sampleChecked = $state(true)
	let samplePrice = $state(500)
	let sampleRating = $state(4)
</script>

<div class="space-y-8">
	<div>
		<h1 class="text-3xl font-bold text-text mb-2">{m.exshopg_h1()}</h1>
		<p class="text-muted">
			{m.exshopg_lede()}
		</p>
	</div>

	<!-- Hero Header Section -->
	<section class="space-y-4">
		<h2 class="text-2xl font-bold text-text">{m.exshopg_hero_h()}</h2>
		<p class="text-muted">
			{m.exshopg_hero_1()}<code>-mx-5</code>{m.exshopg_hero_2()}<code>App</code>{m.exshopg_hero_3()}<code>p-5</code>{m.exshopg_hero_4()}
		</p>
		<div class="bg-surface rounded-lg border border-border p-6 overflow-x-auto">
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
		<h2 class="text-2xl font-bold text-text">{m.exshopg_nav_h()}</h2>
		<p class="text-muted">
			{m.exshopg_nav_1()}<code>MenuItem</code>{m.exshopg_nav_2()}
		</p>
		<div class="bg-surface rounded-lg border border-border p-6 overflow-x-auto">
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
		<h2 class="text-2xl font-bold text-text">{m.exshopg_filters_h()}</h2>
		<p class="text-muted">
			{m.exshopg_filters_1()}<code>Checkbox</code>{m.exshopg_filters_2()}<code>Slider</code>{m.exshopg_filters_3()}<code>Rating</code>{m.exshopg_filters_4()}<code>value</code>{m.exshopg_filters_5()}<code>checked</code>{m.exshopg_filters_6()}<code>onchange</code>{m.exshopg_filters_7()}<code>oninput</code>{m.exshopg_filters_8()}
		</p>
		<div class="bg-surface rounded-lg border border-border p-6 space-y-6">
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
		<div class="bg-inverse text-inverse-text rounded-lg p-6 overflow-x-auto">
			<pre class="text-muted"><code
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
		<h2 class="text-2xl font-bold text-text">{m.exshopg_grid_h()}</h2>
		<p class="text-muted">
			{m.exshopg_grid_1()}<code>Card</code>{m.exshopg_grid_2()}<code>image</code>{m.exshopg_grid_3()}<code>header</code>{m.exshopg_grid_4()}<code>Rating</code>{m.exshopg_grid_5()}<code>footer</code>{m.exshopg_grid_6()}<code>href</code>{m.exshopg_grid_7()}<code>hoverable</code>{m.exshopg_grid_8()}
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
		<div class="bg-inverse text-inverse-text rounded-lg p-6 overflow-x-auto">
			<pre class="text-muted"><code
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
		<h2 class="text-2xl font-bold text-text">{m.exshopg_footer_h()}</h2>
		<p class="text-muted">
			{m.exshopg_footer_1()}<code>Footer</code>{m.exshopg_footer_2()}<code>center</code>{m.exshopg_footer_3()}
		</p>
		<div class="bg-inverse text-inverse-text rounded-lg p-6 overflow-x-auto">
			<pre class="text-muted"><code
					>{`<Footer class="block! px-0! py-0! bg-inverse text-inverse-text">
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
		<h2 class="text-2xl font-bold text-text">{m.ex_bestpractices()}</h2>
		<div class="space-y-3">
			<div class="bg-info-bg border border-info rounded-lg p-4">
				<h3 class="font-semibold text-info-900 dark:text-info-100 mb-2">{m.exshopg_bp_breakout_h()}</h3>
				<p class="text-info-800 dark:text-info-200 text-sm">
					{m.exshopg_bp_breakout_1()}<code>-mx-5</code>{m.exshopg_bp_breakout_2()}<code>p-5</code>{m.exshopg_bp_breakout_3()}
				</p>
			</div>
			<div class="bg-success-bg border border-success rounded-lg p-4">
				<h3 class="font-semibold text-success-900 dark:text-success-100 mb-2">{m.exshopg_bp_controlled_h()}</h3>
				<p class="text-success-800 dark:text-success-200 text-sm">
					{m.exshopg_bp_controlled_1()}<code>Slider</code>{m.exshopg_bp_controlled_2()}<code>Rating</code>{m.exshopg_bp_controlled_3()}<code>Checkbox</code>{m.exshopg_bp_controlled_4()}<code>value</code>{m.exshopg_bp_controlled_5()}<code>checked</code>{m.exshopg_bp_controlled_6()}<code>bind:</code>{m.exshopg_bp_controlled_7()}
				</p>
			</div>
			<div class="bg-secondary-bg border border-secondary rounded-lg p-4">
				<h3 class="font-semibold text-secondary-900 dark:text-secondary-100 mb-2">{m.exshopg_bp_links_h()}</h3>
				<p class="text-secondary-800 dark:text-secondary-200 text-sm">
					{m.exshopg_bp_links_1()}<code>href</code>{m.exshopg_bp_links_2()}<code>Card</code>{m.exshopg_bp_links_3()}<code>div</code>{m.exshopg_bp_links_4()}
				</p>
			</div>
			<div class="bg-warning-bg border border-warning rounded-lg p-4">
				<h3 class="font-semibold text-warning-900 dark:text-warning-100 mb-2">{m.exshopg_bp_placeholder_h()}</h3>
				<p class="text-warning-800 dark:text-warning-200 text-sm">
					{m.exshopg_bp_placeholder_1()}<code>href="#"</code>{m.exshopg_bp_placeholder_2()}
				</p>
			</div>
		</div>
	</section>
</div>

<style lang="postcss">
	@reference '$lib/twintrinsic.css';
</style>

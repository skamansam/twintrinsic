<script lang="ts">
import { fade, fly } from "svelte/transition"
import Container from "$lib/components/Container/Container.svelte"
import Separator from "$lib/components/Separator/Separator.svelte"
import Panel from "$lib/components/Panel/Panel.svelte"
import AppHeader from "$lib/components/AppHeader/AppHeader.svelte"
import TwintrinsicLogo from "$lib/components/icons/TwintrinsicLogo.svelte"
import ThemeToggle from "$lib/components/ThemeToggle/ThemeToggle.svelte"

const features = [
  {
    title: "Modern Stack",
    description:
      "Built with Svelte 5 and Tailwind CSS for a powerful, modern development experience.",
    icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>`,
  },
  {
    title: "Accessible",
    description: "ARIA-compliant components with keyboard navigation and screen reader support.",
    icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path></svg>`,
  },
  {
    title: "Customizable",
    description: "Fully customizable with Tailwind CSS and CSS variables for theming.",
    icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path></svg>`,
  },
  {
    title: "TypeScript Ready",
    description: "Full TypeScript support with type definitions and intellisense.",
    icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>`,
  },
  {
    title: "Responsive",
    description: "Mobile-first design with responsive breakpoints and touch support.",
    icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>`,
  },
  {
    title: "Well Tested",
    description: "Comprehensive test coverage with Playwright and Storybook integration.",
    icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`,
  },
]

const components = [
  { name: "AppHeader", description: "Application header with navigation" },
  { name: "Sidebar", description: "Collapsible side panel" },
  { name: "BottomBar", description: "Collapsible bottom panel" },
  { name: "Panel", description: "Content panel with header and footer" },
  { name: "Container", description: "Responsive container" },
  { name: "Separator", description: "Visual divider with content" },
]
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<!-- Hero Section -->
<Container fluid class="py-16 sm:py-24 relative overflow-hidden bg-gradient-to-b from-primary-500/10 to-transparent" >
  <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
  <div class="flex justify-end" aria-label="Theme toggle">
    <ThemeToggle />
  </div>
  <div class="text-center" transition:fade={{ duration: 500 }}>
    <div class="flex flex-col items-center justify-center gap-6">
      <TwintrinsicLogo size="8rem" class="text-primary-500 hover:text-primary-600" />
      <h1 class="text-5xl sm:text-6xl font-bold bg-gradient-to-b from-primary-600 to-secondary-600 via-primary-500 bg-clip-text text-transparent">
        Twintrinsic
      </h1>
    </div>
    <p class="mt-4 text-xl sm:text-2xl text-muted">
      A modern component library for Svelte 5 and Tailwind CSS
    </p>
    <div class="mt-8 flex justify-center gap-4">
      <a
        href="/docs"
        class="inline-flex items-center px-6 py-3 rounded-lg bg-primary-500 text-white font-medium hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
      >
        Get Started
        <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
        </svg>
      </a>
      <a
        href="https://github.com/skamansam/twintrinsic"
        class="inline-flex items-center px-6 py-3 rounded-lg bg-surface text-text font-medium hover:bg-hover focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
        target="_blank"
        rel="noopener noreferrer"
      >
        View on GitHub
        <svg class="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      </a>
    </div>
  </div>

  <!-- Example Components -->
  <div class="mt-16 grid grid-cols-1 gap-8" transition:fade={{ duration: 500, delay: 200 }} data-themed>
    <div class="bg-surface/50 backdrop-blur-sm border-y border-border">
      <AppHeader
        brand={{
          name: 'Twintrinsic',
          href: '/'
        }}
        class="relative"
        showSearch
        user={{
          name: 'John Doe',
          avatar: 'https://via.placeholder.com/32'
        }}
        navItems={[
          { label: 'Home', href: '#', current: true },
          { label: 'Components', href: '/docs/components' },
          { label: 'Documentation', href: '/docs' }
        ]}
      >
        <div slot="logo" class="flex items-center gap-2">
          <TwintrinsicLogo size="2rem" class="text-primary-500" />
          <span class="font-semibold">Twintrinsic</span>
        </div>
      </AppHeader>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {#each components.slice(0, 3) as component}
        <Panel>
          <svelte:fragment slot="header">
            {component.name}
          </svelte:fragment>
          <p class="text-muted">{component.description}</p>
          <svelte:fragment slot="footer">
            <a
              href="/docs/components/{component.name.toLowerCase()}"
              class="text-sm text-primary-500 hover:text-primary-600 font-medium"
            >
              Learn more →
            </a>
          </svelte:fragment>
        </Panel>
      {/each}
    </div>

    <!-- Nested Theme Test Section -->
    <div class="mt-8 p-6 rounded-lg bg-surface border border-border" data-themed>
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-medium">Nested Theme Test</h3>
        <ThemeToggle />
      </div>
      <p class="text-muted mb-4">Toggle this section's theme independently from the parent</p>
      <div class="p-4 rounded-lg bg-background border border-border">
        <p class="text-text">This nested section inherits the parent's theme unless toggled separately</p>
      </div>
    </div>
  </div>
  </div>
</Container>

<!-- Features Section -->
<Container fluid class="py-16 sm:py-24">
  <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
  <div class="text-center mb-16" transition:fade={{ duration: 500 }}>
    <h2 class="text-3xl sm:text-4xl font-bold">
      Everything you need to build modern web apps
    </h2>
    <p class="mt-4 text-lg text-muted">
      A comprehensive suite of components built with accessibility and customization in mind
    </p>
  </div>

  <div
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    transition:fade={{ duration: 500, delay: 200 }}
  >
    {#each features as feature, i}
      <div
        class="flex gap-4 p-6 rounded-lg bg-background border border-border hover:border-primary-500/50 transition-colors"
        transition:fly={{ y: 20, delay: 300 + i * 100 }}
      >
        <div
          class="flex-shrink-0 w-12 h-12 rounded-lg bg-primary-500/10 text-primary-500 flex items-center justify-center"
        >
          {@html feature.icon}
        </div>
        <div>
          <h3 class="text-lg font-medium mb-2">{feature.title}</h3>
          <p class="text-muted">{feature.description}</p>
        </div>
      </div>
    {/each}
  </div>
  </div>
</Container>

<!-- Components Overview -->
<Container fluid class="py-16 sm:py-24">
  <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
  <div class="text-center mb-16" transition:fade={{ duration: 500 }}>
    <h2 class="text-3xl sm:text-4xl font-bold">
      Powerful components for every need
    </h2>
    <p class="mt-4 text-lg text-muted">
      Start building faster with our growing collection of components
    </p>
  </div>

  <div
    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
    transition:fade={{ duration: 500, delay: 200 }}
  >
    {#each components as component, i}
      <a
        href="/docs/components/{component.name.toLowerCase()}"
        class="block p-4 rounded-lg bg-surface border border-border hover:border-primary-500/50 transition-colors"
        transition:fly={{ y: 20, delay: 300 + i * 100 }}
      >
        <h3 class="font-medium mb-1">{component.name}</h3>
        <p class="text-sm text-muted">{component.description}</p>
      </a>
    {/each}
  </div>
  </div>
</Container>

<!-- CTA Section -->
<Container fluid class="py-16 sm:py-24 bg-gradient-to-b from-transparent to-primary-500/10">
  <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
  <div class="text-center max-w-3xl mx-auto" transition:fade={{ duration: 500 }}>
    <h2 class="text-3xl sm:text-4xl font-bold">
      Ready to get started?
    </h2>
    <p class="mt-4 text-lg text-muted">
      Join the growing community of developers building with Twintrinsic
    </p>
    <div class="mt-8 flex justify-center gap-4">
      <a
        href="/docs"
        class="inline-flex items-center px-6 py-3 rounded-lg bg-primary-500 text-white font-medium hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
      >
        Read the docs
      </a>
      <a
        href="/docs/components"
        class="inline-flex items-center px-6 py-3 rounded-lg bg-surface text-text font-medium hover:bg-hover focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
      >
        Browse components
      </a>
    </div>
  </div>
  </div>
</Container>

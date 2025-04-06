<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';

  const { children } = $props();
  let theme = $state(getInitialTheme());

  // Get initial theme from system preference or localStorage
  function getInitialTheme() {
    if (typeof window === 'undefined') return 'light';
    
    const stored = localStorage.getItem('theme');
    if (stored) return stored;

    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  // Update theme in DOM and localStorage
  $effect(() => {
    if (typeof document === 'undefined') return;
    
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  });

  // Listen for system theme changes
  onMount(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        theme = e.matches ? 'dark' : 'light';
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  });

  // Toggle theme
  function toggleTheme() {
    theme = theme === 'dark' ? 'light' : 'dark';
  }
</script>

<svelte:head>
  <meta name="color-scheme" content={theme} />
</svelte:head>

<!-- Skip to main content link for accessibility -->
<a
  href="#main-content"
  class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-surface focus:text-text focus:outline-none focus:ring-2 focus:ring-primary-500"
>
  Skip to main content
</a>

<!-- Theme toggle button -->
<button
  type="button"
  class="fixed bottom-4 right-4 p-2 rounded-full bg-surface border border-border shadow-lg hover:bg-hover focus:outline-none focus:ring-2 focus:ring-primary-500 z-50"
  onclick={toggleTheme}
  aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
>
  {#if theme === 'dark'}
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  {:else}
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  {/if}
</button>

<div class="min-h-screen">
  <main id="main-content">
    {@render children()}
  </main>
</div>

<!--
@component
ThemeToggle - A toggle button for switching between light and dark themes.
Supports keyboard interaction and ARIA labels.

Usage:
```svelte
<ThemeToggle />
```
-->
<script>
  import { onMount } from 'svelte';

  let theme = $state('light');
  let mounted = false;

  onMount(() => {
    // Get initial theme from data-theme attribute or system preference
    const rootEl = document.documentElement;
    const savedTheme = rootEl.getAttribute('data-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    theme = savedTheme || (prefersDark ? 'dark' : 'light');
    rootEl.setAttribute('data-theme', theme);
    mounted = true;
  });

  function toggleTheme() {
    if (!mounted) return;
    theme = theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
  }
</script>

<button
  type="button"
  class="theme-toggle"
  aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
  onclick={toggleTheme}
>
  {#if theme === 'light'}
    <!-- Moon icon -->
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  {:else}
    <!-- Sun icon -->
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  {/if}
</button>

<style>
  @reference '../../twintrinsic.css';

  .theme-toggle {
    @apply p-2 rounded-md text-muted hover:text-text hover:bg-hover focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors duration-200;
  }
</style>

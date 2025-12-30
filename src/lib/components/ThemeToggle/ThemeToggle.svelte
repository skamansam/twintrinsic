<!--
@component
ThemeToggle - A toggle button for switching between light and dark themes.
Supports keyboard interaction and ARIA labels.

Usage:
```svelte
<ThemeToggle />
```
-->
<script lang="ts">
  import { onMount } from 'svelte';

  let isDarkMode = $state(false);

  onMount(() => {
    // Initialize theme from localStorage or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    isDarkMode = savedTheme ? savedTheme === 'dark' : prefersDark;
    applyTheme(isDarkMode);
  });

  function applyTheme(dark: boolean) {
    const root = document.documentElement;
    if (dark) {
      root.setAttribute('data-theme', 'dark');
      root.classList.add('dark');
    } else {
      root.removeAttribute('data-theme');
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }
</script>

<label class="tw-theme-toggle" data-twintrinsic-theme-toggle aria-label="Toggle theme">
  <input 
    type="checkbox" 
    class="tw-theme"
    checked={isDarkMode}
    onchange={(e) => {
      isDarkMode = e.currentTarget.checked;
      applyTheme(isDarkMode);
    }}
    aria-label={isDarkMode ? 'Switch to light theme' : 'Switch to dark theme'}
  />
  <span class="tw-theme-toggle-button" aria-hidden="true">
    <svg class="tw-theme-toggle-icon tw-theme-toggle-icon-moon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
    <svg class="tw-theme-toggle-icon tw-theme-toggle-icon-sun" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  </span>
</label>

<style lang="postcss">
  @reference '../../twintrinsic.css';

  .tw-theme-toggle {
    @apply inline-flex;
  }

  .tw-theme {
    @apply sr-only;
  }

  .tw-theme-toggle-button {
    @apply p-2 rounded-md text-muted hover:text-text hover:bg-hover focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors duration-200;
  }

  .tw-theme-toggle-icon {
    @apply w-5 h-5;
  }

  .tw-theme-toggle-icon-sun {
    @apply hidden;
  }

  .tw-theme:focus-visible + .tw-theme-toggle-button {
    @apply ring-2 ring-primary-500;
  }

  .tw-theme:checked + .tw-theme-toggle-button .tw-theme-toggle-icon-moon {
    @apply hidden;
  }

  .tw-theme:checked + .tw-theme-toggle-button .tw-theme-toggle-icon-sun {
    @apply inline;
  }
</style>

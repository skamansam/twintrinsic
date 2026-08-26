<!--
@component
ThemeToggle - A toggle button for switching between light and dark themes.
Supports keyboard interaction and ARIA labels.

Usage:
```svelte
<ThemeToggle />
```
-->
<script module lang="ts">
export const propsMetadata = [
  { name: "id", type: "string", description: "HTML id for accessibility", default: "crypto.randomUUID()", optional: true },
];
</script>

<script lang="ts">
  import { onMount } from 'svelte';
  import Icon from '../Icon/Icon.svelte';

  interface Props {
    /** HTML id for accessibility */
    id?: string;
  }

  let { id = crypto.randomUUID() }: Props = $props();

  let isDarkMode = $state(false);

  onMount(() => {
    // Initialize theme from localStorage or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = typeof window !== 'undefined' && typeof window.matchMedia === 'function' && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
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
    {id}
    class="tw-theme"
    checked={isDarkMode}
    onchange={(e) => {
      isDarkMode = e.currentTarget.checked;
      applyTheme(isDarkMode);
    }}
    aria-label={isDarkMode ? 'Switch to light theme' : 'Switch to dark theme'}
  />
  <span class="tw-theme-toggle-button" aria-hidden="true">
    <Icon name="tabler:moon" class="tw-theme-toggle-icon tw-theme-toggle-icon-moon" />
    <Icon name="tabler:sun" class="tw-theme-toggle-icon tw-theme-toggle-icon-sun" />
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

  :global(.tw-theme-toggle-icon) {
    @apply w-5 h-5;
  }

  :global(.tw-theme-toggle-icon-sun) {
    @apply hidden;
  }

  .tw-theme:focus-visible + .tw-theme-toggle-button {
    @apply ring-2 ring-primary-500;
  }

  .tw-theme:checked + .tw-theme-toggle-button :global(.tw-theme-toggle-icon-moon) {
    @apply hidden;
  }

  .tw-theme:checked + .tw-theme-toggle-button :global(.tw-theme-toggle-icon-sun) {
    @apply inline;
  }
</style>

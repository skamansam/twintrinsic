<script lang="ts">
import { setContext } from "svelte"

const props = $props();

const {
  darkMode = false,
  appName = "Twintrinsic App",
  leftPanelWidth = "300px",
  rightPanelWidth = "300px",
  menu = null,
  header = null,
  footer = null,
  leftPanel = null,
  rightPanel = null,
  children,
} = props;

$effect(() => {
  setContext("appDarkMode", {
    getDarkMode: () => darkMode,
  })
})
</script>

<svelte:head>
  <title>{appName}</title>
</svelte:head>
<!-- <svelte:body class="{darkMode ? "dark" : "light"}"/> -->
<div class='app bg-element-100 dark:bg-dark dark:text-light h-screen grid gap-0 grid-rows-[var(--header-height,auto)_1fr_var(--footer-height,auto)] grid-cols-[var(--left-panel-width,300px)_1fr_var(--right-panel-width,300px)]' data-theme style="--left-panel-width: {leftPanelWidth}; --right-panel-width: {rightPanelWidth};">
  {#if header}
    <header class="appHeader col-span-3">
      {#if menu}
        <div class="appMenu">
          {@render menu()}
        </div>
      {/if}
      {@render header()}
    </header>
  {/if}
  {#if leftPanel}
    <aside class="appLeftPanel overflow-y-auto shadow-lg col-span-1">
      {@render leftPanel()}
    </aside>
  {/if}
  <main class="appMain overflow-y-auto col-span-1">
    {@render children?.()}
  </main>
  {#if rightPanel}
    <aside class="appRightPanel overflow-y-auto col-span-1">
      {@render rightPanel()}
    </aside>
  {/if}
  {#if footer}
    <footer class="appFooter col-span-3">
      {@render footer()}
    </footer>
  {/if}
</div>

<style lang="postcss">
  @reference '../../twintrinsic.css';  
</style>

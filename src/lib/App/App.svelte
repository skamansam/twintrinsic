<script lang="ts">
import { setContext } from "svelte"

const {
  darkMode = false,
  appName = "Twintrinsic App",
  leftPanelWidth = "150px",
  rightPanelWidth = "150px",
  menu,
  header,
  leftPanel,
  children,
  rightPanel,
  footer
} = $props()

setContext("appDarkMode", {
  getDarkMode: () => darkMode
})
</script>

<svelte:head>
  <title>{appName}</title>
</svelte:head>

<div class='app bg-element-100 dark:bg-dark dark:text-light min-h-screen grid grid-rows-[auto_1fr_auto]' style="--left-panel-width: {leftPanelWidth}; --right-panel-width: {rightPanelWidth};">
  {#if menu}
    <div class="appMenu">
      {@render menu()}
    </div>
  {/if}
  {#if header}
    <div class="appHeader">
      {@render header()}
    </div>
  {/if}
  <div class="appWrapper w-full grid grid-cols-[auto_1fr_auto] sm:grid-cols-[auto_1fr_auto] py-4 gap-4">
    {#if leftPanel}
      <div class="appLeftPanel px-4 h-full">
        <div class="sticky top-0 p-4 h-full overflow-y-auto">
          {@render leftPanel()}
        </div>
      </div>
    {/if}
    <main class="appMain w-full pt-1 px-3">
      {@render children?.()}
    </main>
    {#if rightPanel}
      <div class="appRightPanel px-2">
        <div class="flex sm:flex-col px-2">
          {@render rightPanel()}
        </div>
      </div>
    {/if}
  </div>
  {#if footer}
    <footer class="bg-black">
      {@render footer()}
    </footer>
  {/if}
</div>

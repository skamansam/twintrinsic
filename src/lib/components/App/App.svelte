<script>
import { setContext } from "svelte"

const {
  darkMode = false,
  appName = "Twintrinsic App",
  leftPanelWidth = "300px",
  rightPanelWidth = "300px",
} = $props()

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
<div class='app bg-element-100 dark:bg-dark dark:text-light min-h-screen' data-theme style="--left-panel-width: {leftPanelWidth}; --right-panel-width: {rightPanelWidth};">
  {#if $$slots.menu}
    <div class="appMenu">
      <slot name="menu"/>
    </div>
  {/if}
  {#if $$slots.header}
    <div class="appHeader">
      <slot name="header"/>
    </div>
  {/if}
  <div class="appWrapper w-full flex flex-col sm:flex-row flex-wrap sm:flex-nowrap py-4 grow">
    {#if $$slots.leftPanel}
      <div class="appLeftPanel shrink-0 px-4">
          <div class="sticky top-0 p-4 w-full h-full">
              <slot name="leftPanel"/>
          </div>
      </div>
    {/if}
    <main role="main" class="appMain w-full grow pt-1 px-3">
      <slot/>
    </main>
    {#if $$slots.rightPanel}
      <div class="appRightPanel shrink-0 px-2">
          <!-- fixed-width -->
          <div class="flex sm:flex-col px-2">
            <slot name="rightPanel"/>
          </div>
      </div>
    {/if}
  </div>
  {#if $$slots.footer}
    <footer class="bg-black mt-auto">
      <slot name="footer"/>
    </footer>
  {/if}
</div>

<style lang="postcss">
  @reference '../../twintrinsic.css';
  
  .appLeftPanel {
    width: var(--left-panel-width);
  }
  
  .appRightPanel {
    width: var(--right-panel-width);
  }
  
  @media (max-width: 640px) {
    .appLeftPanel,
    .appRightPanel {
      width: 100%;
    }
  }
</style>

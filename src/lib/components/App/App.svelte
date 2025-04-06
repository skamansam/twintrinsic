<script>
  import { onDestroy, setContext } from 'svelte';
  export let darkMode = false;

  setContext('appDarkMode', {
	  getDarkMode: () => darkMode,
  });
  export let appName = 'Twintrinsic App';
  export let leftPanelWidth = '300px';
  export let rightPanelWidth = '300px';
</script>

<svelte:head>
  <title>{appName}</title>
</svelte:head>
<!-- <svelte:body class="{darkMode ? "dark" : "light"}"/> -->
<div class='app bg-element-100 dark:bg-dark dark:text-light min-h-screen' style="--left-panel-width: {leftPanelWidth}; --right-panel-width: {rightPanelWidth};">
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
      <div class="appLeftPanel w-fixed w-full shrink grow-0 px-4">
          <div class="sticky top-0 p-4 w-full h-full">
              <slot name="leftPanel"/>
          </div>
      </div>
    {/if}
    <main role="main" class="appMain w-full grow pt-1 px-3">
      <slot/>
    </main>
    {#if $$slots.rightPanel}
      <div class="appRightPanel w-fixed w-full shrink grow-0 px-2">
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


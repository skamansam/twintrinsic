<script module>
import { defineMeta } from "@storybook/addon-svelte-csf"
import BottomBar from "$lib/components/BottomBar/BottomBar.svelte"

const { Story } = defineMeta({
  title: "App/BottomBar",
  component: BottomBar,
  tags: ["autodocs"],
  argTypes: {
    expanded: { control: "boolean", description: "Whether the bottom bar is expanded", defaultValue: true },
    height: { control: "text", description: "Height of the bottom bar when expanded", defaultValue: "16rem" },
    disabled: { control: "boolean", description: "Whether to disable the bottom bar controls", defaultValue: false },
    showBackdrop: { control: "boolean", description: "Whether to show a backdrop when expanded on mobile", defaultValue: true },
    floatOnMobile: { control: "boolean", description: "Whether to float over content on mobile", defaultValue: true },
    docked: { control: "boolean", description: "Whether to dock to viewport instead of parent", defaultValue: false },
    class: { control: "text", description: "Additional CSS classes" },
    ariaLabel: { control: "text", description: "ARIA label" },
  },
  parameters: { layout: "fullscreen" },
})
</script>

<Story name="Default" args={{ expanded: true }}>
  <div class="h-[400px] bg-surface relative">
    <BottomBar expanded>
      {#snippet header()}Details{/snippet}
      <div class="p-4">
        <h3 class="text-lg font-medium mb-2">Project Information</h3>
        <div class="space-y-2">
          <p>Created: April 6, 2025</p>
          <p>Status: In Progress</p>
          <p>Owner: Sarah Chen</p>
        </div>
      </div>
    </BottomBar>
  </div>
</Story>

<Story name="Console" args={{ height: "20rem", expanded: true }}>
  <div class="h-[400px] bg-surface relative">
    <BottomBar height="20rem" expanded>
      {#snippet header()}
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd" />
          </svg>
          Console
        </div>
      {/snippet}
      <div class="font-mono text-sm p-4 space-y-2">
        <p class="text-success-500">✓ Build completed successfully</p>
        <p class="text-warning-500">⚠ Unused variable detected</p>
        <p class="text-error-bold">✕ Failed to load resource</p>
        <p>> Loading dependencies...</p>
        <p>> Starting development server...</p>
        <p class="text-success-500">✓ Server is running on port 3000</p>
      </div>
    </BottomBar>
  </div>
</Story>

<Story name="Collapsed" args={{ expanded: false }}>
  <div class="h-[400px] bg-surface relative">
    <BottomBar>
      {#snippet header()}Details{/snippet}
      <div class="p-4">
        <h3 class="text-lg font-medium mb-2">Project Information</h3>
        <div class="space-y-2">
          <p>Created: April 6, 2025</p>
          <p>Status: In Progress</p>
          <p>Owner: Sarah Chen</p>
        </div>
      </div>
    </BottomBar>
  </div>
</Story>

<Story name="Custom Height" args={{ height: "24rem", expanded: true }}>
  <div class="h-[400px] bg-surface relative">
    <BottomBar height="24rem" expanded>
      {#snippet header()}Details{/snippet}
      <div class="p-4">
        <h3 class="text-lg font-medium mb-2">Project Information</h3>
        <div class="space-y-2">
          <p>Created: April 6, 2025</p>
          <p>Status: In Progress</p>
          <p>Owner: Sarah Chen</p>
        </div>
      </div>
    </BottomBar>
  </div>
</Story>

<Story name="Docked" args={{ docked: true, expanded: true }}>
  <div class="h-[400px] bg-surface relative">
    <BottomBar docked expanded>
      {#snippet header()}Details{/snippet}
      <div class="p-4">
        <h3 class="text-lg font-medium mb-2">Project Information</h3>
        <div class="space-y-2">
          <p>Created: April 6, 2025</p>
          <p>Status: In Progress</p>
          <p>Owner: Sarah Chen</p>
        </div>
      </div>
    </BottomBar>
  </div>
</Story>

<script module>
import { defineMeta } from "@storybook/addon-svelte-csf"
import Tooltip from "$lib/components/Tooltip/Tooltip.svelte"

const { Story } = defineMeta({
  title: "Data Display/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  argTypes: {
    content: { control: "text" },
    position: { control: { type: "select" }, options: ["top", "right", "bottom", "left"] },
    delay: { control: { type: "number", min: 0, max: 2000 } },
    duration: { control: { type: "number", min: 0, max: 10000 } },
    arrow: { control: "boolean" },
    offset: { control: { type: "number", min: 0, max: 32 } },
  },
  args: { content: "More info" },
})
</script>

<Story name="Default">
  <div class="p-32">
    <Tooltip content="Save changes to your profile">
      <button class="px-4 py-2 bg-primary-500 text-white rounded">Save</button>
    </Tooltip>
  </div>
</Story>

<Story name="Icon Actions">
  <div class="p-32 flex gap-8 items-center justify-center">
    <Tooltip content="Edit this document" position="top">
      <button aria-label="Edit" class="p-2 bg-surface border border-border rounded">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
      </button>
    </Tooltip>
    <Tooltip content="Delete permanently" position="top">
      <button aria-label="Delete" class="p-2 bg-surface border border-border rounded">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
      </button>
    </Tooltip>
    <Tooltip content="Copy link to clipboard" position="top">
      <button aria-label="Copy link" class="p-2 bg-surface border border-border rounded">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 010 5.656l-3 3a4 4 0 01-5.656-5.656l1.5-1.5m8.5-8.5a4 4 0 11 0 0l-1.5 1.5"></path></svg>
      </button>
    </Tooltip>
  </div>
</Story>

<Story name="Positions">
  <div class="p-32 flex gap-12 items-center justify-center">
    <Tooltip content="Top — shows above" position="top">
      <button class="px-4 py-2 bg-primary-500 text-white rounded">Top</button>
    </Tooltip>
    <Tooltip content="Right — shows to the side" position="right">
      <button class="px-4 py-2 bg-primary-500 text-white rounded">Right</button>
    </Tooltip>
    <Tooltip content="Bottom — shows below" position="bottom">
      <button class="px-4 py-2 bg-primary-500 text-white rounded">Bottom</button>
    </Tooltip>
    <Tooltip content="Left — shows to the side" position="left">
      <button class="px-4 py-2 bg-primary-500 text-white rounded">Left</button>
    </Tooltip>
  </div>
</Story>

<Story name="Without Arrow" args={{ content: "No arrow here", arrow: false }}>
  <div class="p-32">
    <button class="px-4 py-2 bg-primary-500 text-white rounded">Export report</button>
  </div>
</Story>

<Story name="Delayed" args={{ content: "Shows after you pause", delay: 500 }}>
  <div class="p-32">
    <button class="px-4 py-2 bg-primary-500 text-white rounded">Hover and wait</button>
  </div>
</Story>

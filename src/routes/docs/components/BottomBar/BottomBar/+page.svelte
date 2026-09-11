<script lang="ts">
import { onMount } from "svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import Container from "$lib/components/Container/Container.svelte"
import BottomBar from "$lib/components/BottomBar/BottomBar.svelte"
import Button from "$lib/components/Button/Button.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as BottomBarModule from "$lib/components/BottomBar/BottomBar.svelte"
import { m } from "$lib/paraglide/messages.js"

let showExamples = $state(false)
let barVisible = $state(true)

onMount(() => {
  setTimeout(() => { showExamples = true }, 100)
})
</script>
<!--
@component
BottomBar documentation page — standardized structure
-->

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>
<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>{m.bottombar_heading()}</h1>

  <!-- ─── Description ───────────────────────────────────── -->
  <p>
    <strong>{m.bottombar_heading()}</strong>{m.bottombar_intro_1()}
  </p>

  <!-- ─── What / When / Why ─────────────────────────────── -->
  <h2>{m.sec_what_when_why()}</h2>

  <h3>{m.sec_what()}</h3>
  <p>
    {m.bottombar_what_1()}<code>expanded</code>{m.bottombar_what_2()}<code>collapsible</code>{m.bottombar_what_3()}
  </p>

  <h3>{m.sec_when()}</h3>
  <p>
    {m.bottombar_when_1()}
  </p>

  <h3>{m.sec_why()}</h3>
  <ul>
    <li><strong>{m.bottombar_why_space()}</strong> — {m.bottombar_why_space_desc()}</li>
    <li><strong>{m.bottombar_why_thumb()}</strong> — {m.bottombar_why_thumb_desc()}</li>
    <li><strong>{m.bottombar_why_platform()}</strong> — {m.bottombar_why_platform_desc()}</li>
  </ul>

  <h3>{m.sec_sources()}</h3>
  <ul>
    <li><a href="https://m3.material.io/components/bottom-sheets/overview">Material Design 3 — Bottom sheets</a></li>
    <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/">WAI-ARIA APG — Landmarks</a></li>
    <li><a href="https://primer.style/product/components">Primer — Overlay patterns</a></li>
  </ul>

  <!-- ─── Responsiveness ────────────────────────────────── -->
  <h2>{m.sec_responsiveness()}</h2>
  <ul>
    <li><strong>{m.bottombar_responsive_desktop()}</strong>{m.bottombar_responsive_1()}</li>
    <li><strong>{m.bottombar_responsive_mobile()}</strong>{m.bottombar_responsive_2()}
      <ul>
        <li><strong>{m.bottombar_responsive_float()}</strong>{m.bottombar_responsive_3()}</li>
        <li><strong>{m.bottombar_responsive_inline()}</strong>{m.bottombar_responsive_4()}</li>
      </ul>
    </li>
    <li>{m.bottombar_responsive_5()}</li>
  </ul>

  <!-- ─── Customization ─────────────────────────────────── -->
  <h2>{m.sec_customization()}</h2>
  <ul>
    <li>{m.bottombar_custom_1_1()}<code>header</code>{m.bottombar_custom_1_2()}</li>
    <li>{m.bottombar_custom_2_1()}<code>expanded</code>{m.bottombar_custom_2_2()}</li>
    <li>{m.bottombar_custom_3_1()}<code>collapsible</code>{m.bottombar_custom_3_2()}</li>
    <li>{m.bottombar_custom_4_1()}<code>height</code>{m.bottombar_custom_4_2()}</li>
    <li>{m.bottombar_custom_5()}</li>
    <li>{m.bottombar_custom_6_1()}<code>class</code>{m.bottombar_custom_6_2()}</li>
  </ul>

  <!-- ─── Examples ──────────────────────────────────────── -->
  <h2>{m.sec_examples()}</h2>

  <!-- 1. Basic BottomBar -->
  <h3>{m.bottombar_ex_basic()}</h3>
  <p>{m.bottombar_ex_basic_desc()}</p>
  <ExampleTabs code={`<BottomBar height="14rem" collapsible>
  {#snippet header()}Details{/snippet}
  <div class="p-4">
    <h3 class="text-lg font-medium mb-2">Project Information</h3>
    <div class="space-y-2">
      <p>Created: April 6, 2026</p>
      <p>Status: In Progress</p>
      <p>Owner: Sarah Chen</p>
    </div>
  </div>
</BottomBar>`}>
    {#if showExamples}
      <div class="h-[300px] bg-surface relative border border-border rounded-lg overflow-hidden" data-testid="bottombar-basic">
        <BottomBar height="14rem" collapsible>
          {#snippet header()}Details{/snippet}
          <div class="p-4">
            <h3 class="text-lg font-medium mb-2">Project Information</h3>
            <div class="space-y-2">
              <p>Created: April 6, 2026</p>
              <p>Status: In Progress</p>
              <p>Owner: Sarah Chen</p>
            </div>
          </div>
        </BottomBar>
      </div>
    {/if}
  </ExampleTabs>

  <!-- 2. Controlled Visibility -->
  <h3>{m.bottombar_ex_controlled()}</h3>
  <p>
    {m.bottombar_ex_controlled_desc_1()}<code>expanded</code>{m.bottombar_ex_controlled_desc_2()}<code>collapsible=&#123;false&#125;</code>{m.bottombar_ex_controlled_desc_3()}
  </p>
  <ExampleTabs code={`<script>
  let visible = true
<\/script>

<Button onclick={() => visible = !visible}>
  {visible ? 'Hide bar' : 'Show bar'}
</Button>

<BottomBar expanded={visible}>
  {#snippet header()}Notifications{/snippet}
  <div class="p-4">
    <p>Three new notifications are waiting.</p>
  </div>
</BottomBar>`}>
    {#if showExamples}
      <div class="space-y-4">
        <div data-testid="bottombar-controlled-toggle">
          <Button onclick={() => (barVisible = !barVisible)}>
            {barVisible ? 'Hide bar' : 'Show bar'}
          </Button>
        </div>
        <div class="h-[300px] bg-surface relative border border-border rounded-lg overflow-hidden" data-testid="bottombar-controlled">
          <BottomBar expanded={barVisible}>
            {#snippet header()}
              <span class="text-sm font-medium">Notifications</span>
            {/snippet}
            <div class="p-4">
              <p>Three new notifications are waiting.</p>
            </div>
          </BottomBar>
        </div>
      </div>
    {/if}
  </ExampleTabs>

  <!-- 3. Menu Items -->
  <h3>{m.bottombar_ex_menu()}</h3>
  <p>{m.bottombar_ex_menu_desc()}</p>
  <ExampleTabs code={`<BottomBar height="auto" expanded={false}>
  {#snippet header()}
    <span class="text-sm font-medium">Menu</span>
  {/snippet}
  <nav class="flex justify-around p-2 border-t border-border">
    <a href="#home" class="flex flex-col items-center p-2 text-primary-500">
      <span class="text-xl">🏠</span>
      <span class="text-xs mt-1">Home</span>
    </a>
    <a href="#search" class="flex flex-col items-center p-2 text-muted">
      <span class="text-xl">🔍</span>
      <span class="text-xs mt-1">Search</span>
    </a>
    <a href="#settings" class="flex flex-col items-center p-2 text-muted">
      <span class="text-xl">⚙️</span>
      <span class="text-xs mt-1">Settings</span>
    </a>
  </nav>
</BottomBar>`}>
    {#if showExamples}
      <div class="h-[300px] bg-surface relative border border-border rounded-lg overflow-hidden" data-testid="bottombar-menu">
        <BottomBar height="auto" expanded={false}>
          {#snippet header()}
            <span class="text-sm font-medium">Menu</span>
          {/snippet}
          <nav class="flex justify-around p-2 border-t border-border">
            <a href="#home" class="flex flex-col items-center p-2 text-primary-500">
              <span class="text-xl">🏠</span>
              <span class="text-xs mt-1">Home</span>
            </a>
            <a href="#search" class="flex flex-col items-center p-2 text-muted">
              <span class="text-xl">🔍</span>
              <span class="text-xs mt-1">Search</span>
            </a>
            <a href="#settings" class="flex flex-col items-center p-2 text-muted">
              <span class="text-xl">⚙️</span>
              <span class="text-xs mt-1">Settings</span>
            </a>
          </nav>
        </BottomBar>
      </div>
    {/if}
  </ExampleTabs>

  <!-- 3. Console Panel -->
  <h3>{m.bottombar_ex_console()}</h3>
  <p>{m.bottombar_ex_console_desc()}</p>
  <ExampleTabs code={`<BottomBar height="16rem">
  {#snippet header()}
    <div class="flex items-center gap-2">
      <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd" />
      </svg>
      Console
    </div>
  {/snippet}
  <div class="font-mono text-sm p-4 space-y-1 bg-gray-900 text-gray-100">
    <p><span class="text-green-400">✓</span> Build completed successfully</p>
    <p><span class="text-yellow-400">⚠</span> Unused variable detected</p>
    <p><span class="text-red-400">✕</span> Failed to load resource</p>
    <p class="text-gray-400">> Starting development server...</p>
    <p><span class="text-green-400">✓</span> Server is running on port 3000</p>
  </div>
</BottomBar>`}>
    {#if showExamples}
      <div class="h-[300px] bg-surface relative border border-border rounded-lg overflow-hidden" data-testid="bottombar-console">
        <BottomBar height="16rem">
          {#snippet header()}
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd" />
              </svg>
              Console
            </div>
          {/snippet}
          <div class="font-mono text-sm p-4 space-y-1 bg-gray-900 text-gray-100">
            <p><span class="text-green-400">✓</span> Build completed successfully</p>
            <p><span class="text-yellow-400">⚠</span> Unused variable detected</p>
            <p><span class="text-red-400">✕</span> Failed to load resource</p>
            <p class="text-gray-400">> Starting development server...</p>
            <p><span class="text-green-400">✓</span> Server is running on port 3000</p>
          </div>
        </BottomBar>
      </div>
    {/if}
  </ExampleTabs>

  <!-- 4. Meeting Control Bar -->
  <h3>{m.bottombar_ex_meeting()}</h3>
  <p>{m.bottombar_ex_meeting_desc()}</p>
  <ExampleTabs code={`<BottomBar height="auto" expanded={true}>
  {#snippet header()}
    <span class="text-sm font-medium">Meeting Controls</span>
  {/snippet}
  <div class="flex items-center justify-center gap-4 p-4 border-t border-border">
    <button class="p-3 rounded-full bg-muted hover:bg-muted/80 transition-colors" aria-label="Toggle microphone">
      🎤
    </button>
    <button class="p-3 rounded-full bg-muted hover:bg-muted/80 transition-colors" aria-label="Toggle camera">
      📷
    </button>
    <button class="p-3 rounded-full bg-muted hover:bg-muted/80 transition-colors" aria-label="Share screen">
      🖥️
    </button>
    <button class="p-3 rounded-full bg-muted hover:bg-muted/80 transition-colors" aria-label="Toggle chat">
      💬
    </button>
    <button class="px-6 py-3 rounded-full bg-red-500 hover:bg-red-600 text-white transition-colors" aria-label="Leave meeting">
      Leave
    </button>
  </div>
</BottomBar>`}>
    {#if showExamples}
      <div class="h-[200px] bg-surface relative border border-border rounded-lg overflow-hidden" data-testid="bottombar-meeting">
        <BottomBar height="auto" expanded={true}>
          {#snippet header()}
            <span class="text-sm font-medium">Meeting Controls</span>
          {/snippet}
          <div class="flex items-center justify-center gap-4 p-4 border-t border-border">
            <button class="p-3 rounded-full bg-muted hover:bg-muted/80 transition-colors" aria-label="Toggle microphone">
              🎤
            </button>
            <button class="p-3 rounded-full bg-muted hover:bg-muted/80 transition-colors" aria-label="Toggle camera">
              📷
            </button>
            <button class="p-3 rounded-full bg-muted hover:bg-muted/80 transition-colors" aria-label="Share screen">
              🖥️
            </button>
            <button class="p-3 rounded-full bg-muted hover:bg-muted/80 transition-colors" aria-label="Toggle chat">
              💬
            </button>
            <button class="px-6 py-3 rounded-full bg-red-500 hover:bg-red-600 text-white transition-colors" aria-label="Leave meeting">
              Leave
            </button>
          </div>
        </BottomBar>
      </div>
    {/if}
  </ExampleTabs>

  <!-- 5. Video Player Controls -->
  <h3>{m.bottombar_ex_video()}</h3>
  <p>{m.bottombar_ex_video_desc()}</p>
  <ExampleTabs code={`<BottomBar height="auto" expanded={true}>
  {#snippet header()}
    <span class="text-sm font-medium">Video Player</span>
  {/snippet}
  <div class="p-3 space-y-2 border-t border-border bg-gray-900 text-white">
    <div class="w-full bg-gray-700 rounded-full h-1.5">
      <div class="bg-primary-500 h-1.5 rounded-full" style="width: 45%"></div>
    </div>
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <button class="text-lg" aria-label="Previous">⏮</button>
        <button class="text-xl px-2" aria-label="Play">▶</button>
        <button class="text-lg" aria-label="Next">⏭</button>
        <span class="text-xs text-gray-400">1:23 / 3:05</span>
      </div>
      <div class="flex items-center gap-2">
        <button class="text-sm" aria-label="Volume">🔊</button>
        <button class="text-sm" aria-label="Fullscreen">⛶</button>
      </div>
    </div>
  </div>
</BottomBar>`}>
    {#if showExamples}
      <div class="h-[200px] bg-gray-950 relative border border-border rounded-lg overflow-hidden" data-testid="bottombar-video">
        <BottomBar height="auto" expanded={true}>
          {#snippet header()}
            <span class="text-sm font-medium text-white">Video Player</span>
          {/snippet}
          <div class="p-3 space-y-2 border-t border-gray-700 bg-gray-900 text-white">
            <div class="w-full bg-gray-700 rounded-full h-1.5">
              <div class="bg-primary-500 h-1.5 rounded-full" style="width: 45%"></div>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <button class="text-lg" aria-label="Previous">⏮</button>
                <button class="text-xl px-2" aria-label="Play">▶</button>
                <button class="text-lg" aria-label="Next">⏭</button>
                <span class="text-xs text-gray-400">1:23 / 3:05</span>
              </div>
              <div class="flex items-center gap-2">
                <button class="text-sm" aria-label="Volume">🔊</button>
                <button class="text-sm" aria-label="Fullscreen">⛶</button>
              </div>
            </div>
          </div>
        </BottomBar>
      </div>
    {/if}
  </ExampleTabs>

  <!-- 6. Card with Bottom Bar -->
  <h3>{m.bottombar_ex_card()}</h3>
  <p>{m.bottombar_ex_card_desc()}</p>
  <ExampleTabs code={`<div class="border border-border rounded-lg overflow-hidden">
  <div class="p-4">
    <h3 class="text-lg font-semibold">Project Alpha</h3>
    <p class="text-sm text-muted mt-1">A new initiative to improve performance across all services.</p>
  </div>
  <BottomBar height="8rem">
    {#snippet header()}
      <span class="text-sm font-medium">Actions</span>
    {/snippet}
    <div class="flex gap-2 p-3">
      <button class="px-3 py-1.5 text-sm bg-primary-500 text-white rounded hover:bg-primary-600">Edit</button>
      <button class="px-3 py-1.5 text-sm bg-muted rounded hover:bg-muted/80">Share</button>
      <button class="px-3 py-1.5 text-sm text-red-500 hover:bg-red-50 rounded">Delete</button>
    </div>
  </BottomBar>
</div>`}>
    {#if showExamples}
      <div class="h-[260px] bg-surface relative border border-border rounded-lg overflow-hidden" data-testid="bottombar-card">
        <div class="p-4">
          <h3 class="text-lg font-semibold">Project Alpha</h3>
          <p class="text-sm text-muted mt-1">A new initiative to improve performance across all services.</p>
        </div>
        <BottomBar height="8rem">
          {#snippet header()}
            <span class="text-sm font-medium">Actions</span>
          {/snippet}
          <div class="flex gap-2 p-3">
            <button class="px-3 py-1.5 text-sm bg-primary-500 text-white rounded hover:bg-primary-600">Edit</button>
            <button class="px-3 py-1.5 text-sm bg-muted rounded hover:bg-muted/80">Share</button>
            <button class="px-3 py-1.5 text-sm text-red-500 hover:bg-red-50 rounded">Delete</button>
          </div>
        </BottomBar>
      </div>
    {/if}
  </ExampleTabs>

  <!-- ─── Slots ─────────────────────────────────────────── -->
  <h2>{m.sec_slots()}</h2>
  <table>
    <thead>
      <tr><th>{m.sec_slot()}</th><th>{m.sec_description()}</th></tr>
    </thead>
    <tbody>
      <tr><td><code>header</code></td><td>{m.bottombar_slot_header()}</td></tr>
      <tr><td><code>default</code></td><td>{m.bottombar_slot_default()}</td></tr>
    </tbody>
  </table>

  <!-- ─── Props ─────────────────────────────────────────── -->
  <h2>{m.sec_props()}</h2>
  <PropsTable component={BottomBarModule} />

  <!-- ─── Events ────────────────────────────────────────── -->
  <h2>{m.sec_events()}</h2>
  <EventsTable component={BottomBarModule} />

  <!-- ─── Accessibility ─────────────────────────────────── -->
  <h2>{m.sec_accessibility()}</h2>
  <ul>
    <li>{m.bottombar_a11y_1_1()}<code>role="complementary"</code>{m.bottombar_a11y_1_2()}<code>role="region"</code>{m.bottombar_a11y_1_3()}</li>
    <li>{m.bottombar_a11y_2_1()}<code>collapsible</code>{m.bottombar_a11y_2_2()}<code>aria-expanded</code>{m.bottombar_a11y_2_3()}<code>aria-label="Expand …"</code>{m.bottombar_a11y_2_4()}</li>
    <li>{m.bottombar_a11y_3()}</li>
  </ul>

  <!-- ─── Keyboard Support ──────────────────────────────── -->
  <h2>{m.sec_keyboard()}</h2>
  <table>
    <thead>
      <tr><th>{m.sec_key()}</th><th>{m.sec_function()}</th></tr>
    </thead>
    <tbody>
      <tr><td><kbd>Tab</kbd></td><td>{m.bottombar_kb_1()}</td></tr>
      <tr><td><kbd>Enter</kbd> / <kbd>Space</kbd></td><td>{m.bottombar_kb_2_1()}<code>collapsible</code>{m.bottombar_kb_2_2()}</td></tr>
      <tr><td><kbd>Escape</kbd></td><td>{m.bottombar_kb_3_1()}<code>collapsible</code>{m.bottombar_kb_3_2()}</td></tr>
    </tbody>
  </table>
</Container>

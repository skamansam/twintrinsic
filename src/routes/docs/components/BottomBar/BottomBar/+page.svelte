<script lang="ts">
import { onMount } from "svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import Container from "$lib/components/Container/Container.svelte"
import BottomBar from "$lib/components/BottomBar/BottomBar.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as BottomBarModule from "$lib/components/BottomBar/BottomBar.svelte"

let showExamples = $state(false)

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
  <h1>BottomBar</h1>

  <!-- ─── Description ───────────────────────────────────── -->
  <p>
    <strong>BottomBar</strong> is a bar that attaches to the bottom of its parent
    container. It is ideal for mobile app bars, media player controls, console output,
    detail panels, or any content that should be on hand but not always on screen.
  </p>

  <!-- ─── What / When / Why ─────────────────────────────── -->
  <h2>What, When &amp; Why</h2>

  <h3>What is it?</h3>
  <p>
    A bar anchored to the bottom edge of its parent. Its visibility is driven by the
    <code>expanded</code> prop, so another component's UX (a mobile menu button, a
    “show console” action, media playback state) decides when it appears. Set
    <code>collapsible</code> to let the header itself slide the bar down to a small
    handle and back.
  </p>

  <h3>When should I use it?</h3>
  <p>
    Use BottomBar for content that should be available on demand: a mobile app bar that
    appears when a menu opens, terminal/console output, media player controls, meeting
    control bars, or a collapsible detail panel in an editor.
  </p>

  <h3>Why does it exist?</h3>
  <ul>
    <li><strong>Space efficiency</strong> — secondary content stays off screen until
      needed, maximizing the main content area.</li>
    <li><strong>Thumb zones</strong> — on mobile, bottom-anchored controls are in the
      natural thumb reach zone (Steven Hoober research).</li>
    <li><strong>Platform familiarity</strong> — bottom sheets and control bars are
      standard mobile UI patterns users already know.</li>
  </ul>

  <h3>Sources</h3>
  <ul>
    <li><a href="https://m3.material.io/components/bottom-sheets/overview">Material Design 3 — Bottom sheets</a></li>
    <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/">WAI-ARIA APG — Landmarks</a></li>
    <li><a href="https://primer.style/product/components">Primer — Overlay patterns</a></li>
  </ul>

  <!-- ─── Responsiveness ────────────────────────────────── -->
  <h2>Responsiveness</h2>
  <ul>
    <li><strong>Desktop</strong> — bottom bar sits at the bottom of its parent container.</li>
    <li><strong>Mobile</strong> — provides two modes:
      <ul>
        <li><strong>Float mode</strong> (default) — slides up as an overlay with a backdrop.</li>
        <li><strong>Inline mode</strong> — pushes content up, taking full width.</li>
      </ul>
    </li>
    <li>Touch targets meet 44×44 px minimum for mobile tap areas.</li>
  </ul>

  <!-- ─── Customization ─────────────────────────────────── -->
  <h2>Customization</h2>
  <ul>
    <li>Custom header via the <code>header</code> snippet (text, icons, or any markup).</li>
    <li>Show/hide from another component via the <code>expanded</code> prop.</li>
    <li>Let users collapse the bar to a small handle via <code>collapsible</code>.</li>
    <li>Set the bar height via the <code>height</code> prop.</li>
    <li>Theme colors, borders, and spacing controlled by the Tailwind theme.</li>
    <li>Pass additional CSS classes via the <code>class</code> prop.</li>
  </ul>

  <!-- ─── Examples ──────────────────────────────────────── -->
  <h2>Examples</h2>

  <!-- 1. Basic BottomBar -->
  <h3>Basic BottomBar</h3>
  <p>A simple collapsible detail panel anchored to the bottom. Click the header to toggle.</p>
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

  <!-- 2. Menu Items -->
  <h3>Menu Items</h3>
  <p>A bottom bar with navigation menu items, similar to mobile tab bars.</p>
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
  <h3>Console Panel</h3>
  <p>A developer console with color-coded output lines and a fixed height.</p>
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
  <h3>Meeting Control Bar</h3>
  <p>A meeting/video call control bar with action buttons, similar to Zoom or Teams.</p>
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
  <h3>Video Player Controls</h3>
  <p>Overlay controls for a video player with play/pause, progress, and volume.</p>
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
  <h3>Card with Bottom Bar</h3>
  <p>A card layout where the bottom bar reveals additional card actions or metadata.</p>
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
  <h2>Slots</h2>
  <table>
    <thead>
      <tr><th>Slot</th><th>Description</th></tr>
    </thead>
    <tbody>
      <tr><td><code>header</code></td><td>Content for the bottom bar header row</td></tr>
      <tr><td><code>default</code></td><td>Main content of the bottom bar</td></tr>
    </tbody>
  </table>

  <!-- ─── Props ─────────────────────────────────────────── -->
  <h2>Props</h2>
  <PropsTable component={BottomBarModule} />

  <!-- ─── Events ────────────────────────────────────────── -->
  <h2>Events</h2>
  <EventsTable component={BottomBarModule} />

  <!-- ─── Accessibility ─────────────────────────────────── -->
  <h2>Accessibility</h2>
  <ul>
    <li>Uses <code>role="complementary"</code> for the container and
      <code>role="region"</code> for the content area.</li>
    <li>When <code>collapsible</code>, the header toggle uses
      <code>aria-expanded</code> to communicate state, and the collapsed state
      keeps a small, labeled handle (<code>aria-label="Expand …"</code>) so the
      bar can always be reopened with the mouse or keyboard.</li>
    <li>Keyboard: Enter/Space on the header toggles a collapsible bar; Escape
      collapses it; Tab reaches the expand handle when collapsed.</li>
  </ul>

  <!-- ─── Keyboard Support ──────────────────────────────── -->
  <h2>Keyboard Support</h2>
  <table>
    <thead>
      <tr><th>Key</th><th>Function</th></tr>
    </thead>
    <tbody>
      <tr><td><kbd>Tab</kbd></td><td>Moves focus through interactive elements in the panel</td></tr>
      <tr><td><kbd>Enter</kbd> / <kbd>Space</kbd></td><td>On the header of a <code>collapsible</code> bar, toggles open/closed</td></tr>
      <tr><td><kbd>Escape</kbd></td><td>Collapses a <code>collapsible</code> bar (visibility of non-collapsible bars is prop-driven)</td></tr>
    </tbody>
  </table>
</Container>

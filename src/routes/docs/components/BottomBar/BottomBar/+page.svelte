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
    <strong>BottomBar</strong> is a collapsible panel that attaches to the bottom of its
    parent container. It is ideal for detail panels, console output, media player
    controls, or any content that should be accessible but out of the way until needed.
  </p>

  <!-- ─── What / When / Why ─────────────────────────────── -->
  <h2>What, When &amp; Why</h2>

  <h3>What is it?</h3>
  <p>
    A panel anchored to the bottom edge of its parent with a clickable header snippet
    that toggles the panel open/closed. It supports float mode (overlay with backdrop)
    and inline mode (push content up).
  </p>

  <h3>When should I use it?</h3>
  <p>
    Use BottomBar for secondary content that should be available but not always visible:
    detail panels in editors, terminal/console output, media player controls, meeting
    control bars, or bottom-sheet-style actions on mobile.
  </p>

  <h3>Why does it exist?</h3>
  <ul>
    <li><strong>Space efficiency</strong> — keeps secondary content collapsed until
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
    <li>Set initial height via the <code>height</code> prop.</li>
    <li>Theme colors, borders, and spacing controlled by the Tailwind theme.</li>
    <li>Pass additional CSS classes via the <code>class</code> prop.</li>
  </ul>

  <!-- ─── Examples ──────────────────────────────────────── -->
  <h2>Examples</h2>

  <h3>Basic BottomBar</h3>
  <ExampleTabs code={`<BottomBar>
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
      <div class="h-[300px] bg-surface relative" data-testid="bottombar-basic">
        <BottomBar>
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

  <h3>Console Panel</h3>
  <ExampleTabs code={`<BottomBar height="20rem">
  {#snippet header()}
    <div class="flex items-center gap-2">
      <Icon name="tabler:terminal" />
      Console
    </div>
  {/snippet}
  <div class="font-mono text-sm p-4 space-y-2">
    <p class="text-success-500">✓ Build completed successfully</p>
    <p class="text-warning-500">⚠ Unused variable detected</p>
    <p class="text-error-bold">✕ Failed to load resource</p>
    <p>> Starting development server...</p>
    <p class="text-success-500">✓ Server is running on port 3000</p>
  </div>
</BottomBar>`}>
    {#if showExamples}
      <div class="h-[300px] bg-surface relative" data-testid="bottombar-console">
        <BottomBar height="20rem">
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
    {/if}
  </ExampleTabs>

  <!-- ─── Slots ─────────────────────────────────────────── -->
  <h2>Slots</h2>
  <table>
    <thead>
      <tr><th>Slot</th><th>Description</th></tr>
    </thead>
    <tbody>
      <tr><td><code>header</code></td><td>Content for the bottom bar header / toggle area</td></tr>
      <tr><td><code>default</code></td><td>Main expandable content of the bottom bar</td></tr>
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
    <li>Toggle button uses <code>aria-expanded</code> to communicate open/closed state.</li>
    <li>Keyboard: Enter/Space toggles the panel; Escape closes it.</li>
    <li>Focus is managed so that closing the panel returns focus to the toggle button.</li>
  </ul>

  <!-- ─── Keyboard Support ──────────────────────────────── -->
  <h2>Keyboard Support</h2>
  <table>
    <thead>
      <tr><th>Key</th><th>Function</th></tr>
    </thead>
    <tbody>
      <tr><td><kbd>Tab</kbd></td><td>Moves focus through interactive elements in the panel</td></tr>
      <tr><td><kbd>Enter</kbd> / <kbd>Space</kbd></td><td>When focus is on the header, toggles the bottom bar open/closed</td></tr>
      <tr><td><kbd>Escape</kbd></td><td>Closes the bottom bar</td></tr>
    </tbody>
  </table>
</Container>

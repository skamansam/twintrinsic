<!--
@component
Theme preview page — renders a demo UI inside every built-in theme so the
light/dark variants can be compared side by side.
-->
<script lang="ts">
import Button from "$lib/components/Button/Button.svelte"
import Badge from "$lib/components/Badge/Badge.svelte"
import Container from "$lib/components/Container/Container.svelte"
import Input from "$lib/components/Form/Input.svelte"
import Progress from "$lib/components/Progress/Progress.svelte"
import Separator from "$lib/components/Separator/Separator.svelte"
import Switch from "$lib/components/Form/Switch.svelte"
import { m } from "$lib/paraglide/messages.js"

interface Theme {
  /** Display name */
  name: string
  /** Value for the data-theme attribute */
  value: string
  /** Light or dark */
  mode: "Light" | "Dark"
  /** One-line description */
  blurb: string
}

const themes: Theme[] = [
  { name: "Light", value: "light", mode: "Light", blurb: "Default theme — purple/indigo identity on white." },
  { name: "Dark", value: "dark", mode: "Dark", blurb: "Default dark theme — slate neutrals, lighter accents." },
  { name: "Brand", value: "brand", mode: "Light", blurb: "Teal/cyan accent palette on teal-tinted surfaces." },
  { name: "Brand Dark", value: "brand-dark", mode: "Dark", blurb: "Brand theme in dark mode with teal-tinted neutrals." },
  { name: "High Contrast", value: "high-contrast", mode: "Light", blurb: "WCAG AAA-leaning — pure black on white." },
  { name: "High Contrast Dark", value: "high-contrast-dark", mode: "Dark", blurb: "WCAG AAA-leaning — pure white on black." },
  { name: "Protanopia", value: "protanopia", mode: "Light", blurb: "Red-blind safe — success teal, error vermillion." },
  { name: "Protanopia Dark", value: "protanopia-dark", mode: "Dark", blurb: "Red-blind safe dark variant." },
  { name: "Deuteranopia", value: "deuteranopia", mode: "Light", blurb: "Green-blind safe — success cyan, strong red error." },
  { name: "Deuteranopia Dark", value: "deuteranopia-dark", mode: "Dark", blurb: "Green-blind safe dark variant." },
  { name: "Tritanopia", value: "tritanopia", mode: "Light", blurb: "Blue-yellow blind safe — magenta primary, orange warning." },
  { name: "Tritanopia Dark", value: "tritanopia-dark", mode: "Dark", blurb: "Blue-yellow blind safe dark variant." },
]
</script>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>{m.themepv_heading()}</h1>

  <p>
    {m.themepv_intro_1()}<code>&lt;div data-theme="..."&gt;</code>{m.themepv_intro_2()}<code>-dark</code>{m.themepv_intro_3()}<code>dark:</code>{m.themepv_intro_4()}<code>[data-theme$="-dark"]</code>{m.themepv_intro_5()}
  </p>

  <Separator>{m.themepv_themes()}</Separator>

  <div class="not-prose grid grid-cols-1 lg:grid-cols-2 gap-6">
    {#each themes as theme}
      <!-- svelte-ignore a11y_no_nonnative_element_content -->
      <div data-theme={theme.value} class="rounded-xl border border-border bg-background text-text shadow-sm overflow-hidden">
        <div class="px-5 pt-5 pb-4 border-b border-border">
          <div class="flex items-center justify-between gap-3 flex-wrap">
            <h2 class="text-lg font-semibold m-0">{theme.name}</h2>
            <span class="text-xs font-mono px-2 py-1 rounded-full bg-surface border border-border">
              data-theme="{theme.value}"
            </span>
          </div>
          <p class="text-sm text-muted mt-1 mb-0">{theme.blurb}</p>
        </div>

        <div class="p-5 space-y-5">
          <!-- Buttons -->
          <div class="flex flex-wrap gap-2">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button>Default</Button>
          </div>

          <!-- Badges -->
          <div class="flex flex-wrap gap-2 items-center">
            <Badge>Default</Badge>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
          </div>

          <!-- Form controls -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Name" placeholder="Ada Lovelace" />
            <Switch label="Enabled" checked />
          </div>

          <!-- Progress -->
          <Progress value={75} showValue ariaLabel="Example progress" />

          <!-- Stat card -->
          <div class="rounded-lg bg-surface border border-border p-4 flex items-center justify-between">
            <div>
              <div class="text-sm text-muted">Monthly active users</div>
              <div class="text-2xl font-bold text-text mt-1">12,847</div>
            </div>
            <div class="text-end">
              <div class="text-sm font-medium text-success">▲ 8.2%</div>
              <div class="text-xs text-muted">vs last month</div>
            </div>
          </div>
        </div>
      </div>
    {/each}
  </div>

  <Separator>{m.themepv_usage()}</Separator>

  <p>
    {m.themepv_usage_1()}<code>data-theme</code>{m.themepv_usage_2()}
  </p>

  <pre class="not-prose rounded-md bg-surface border border-border p-4 text-sm overflow-x-auto"><code>{`<!-- Root element of your app -->
<html lang="en" data-theme="high-contrast-dark">
  ...
</html>`}</code></pre>

  <p>
    {m.themepv_outro_1()}<a href="/docs/theming" class="text-primary-500 hover:text-primary-600 underline">Theming</a>{m.themepv_outro_2()}
  </p>
</Container>

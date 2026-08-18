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
  <h1>Theme Preview</h1>

  <p>
    Every built-in theme rendered side by side. Each panel is a self-contained
    <code>&lt;div data-theme="..."&gt;</code> scoping its own token set, so the
    components inside follow that theme exactly — including the
    <code>-dark</code> variants, which engage the <code>dark:</code> custom
    variant via the <code>[data-theme$="-dark"]</code> selector. Apply any of
    these to your root element to theme a whole app.
  </p>

  <Separator>Themes</Separator>

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
            <div class="text-right">
              <div class="text-sm font-medium text-success">▲ 8.2%</div>
              <div class="text-xs text-muted">vs last month</div>
            </div>
          </div>
        </div>
      </div>
    {/each}
  </div>

  <Separator>Usage</Separator>

  <p>
    Apply a theme to an entire app by setting <code>data-theme</code> on the
    root element, exactly like the docs site and Storybook do:
  </p>

  <pre class="not-prose rounded-md bg-surface border border-border p-4 text-sm overflow-x-auto"><code>{`<!-- Root element of your app -->
<html lang="en" data-theme="high-contrast-dark">
  ...
</html>`}</code></pre>

  <p>
    See the <a href="/docs/theming" class="text-primary-500 hover:text-primary-600 underline">Theming</a>
    page for the full token reference and how to add your own themes.
  </p>
</Container>

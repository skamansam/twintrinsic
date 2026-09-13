<!--
@component
Toast documentation page — standardized structure
-->
<script lang="ts">
import Button from "$lib/components/Button/Button.svelte"
import Container from "$lib/components/Container/Container.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import Toast, * as ToastModule from "$lib/components/Toast/Toast.svelte"
import { m } from "$lib/paraglide/messages.js"
import { toastStore } from "$lib/components/Toast/toastStore.js"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>{m.toast_heading()}</h1>

  <p>
    <strong>{m.toast_heading()}</strong>{m.toast_lede_1()}<code>@starting-style</code>{m.toast_lede_2()}<code>transition-behavior: allow-discrete</code>{m.toast_lede_3()}<code>content-visibility: auto</code>{m.toast_lede_4()}
  </p>

  <h2>{m.sec_what_when_why()}</h2>

  <h3>{m.sec_what()}</h3>
  <p>{m.toast_what_1()}</p>

  <h3>{m.sec_when()}</h3>
  <p>
    {m.toast_when_1()}<code>&lt;Toast&gt;</code>{m.toast_when_2()}<code>&lt;Modal&gt;</code>{m.toast_when_3()}
  </p>

  <h3>{m.sec_why()}</h3>
  <ul>
    <li><strong>{m.toast_why_nonblocking()}</strong>{m.toast_why_nonblocking_1()}</li>
    <li><strong>{m.toast_why_store()}</strong>{m.toast_why_store_1()}</li>
    <li><strong>{m.toast_why_css()}</strong>{m.toast_why_css_1()}<code>@starting-style</code>{m.toast_why_css_2()}<code>allow-discrete</code>{m.toast_why_css_3()}</li>
    <li><strong>{m.toast_why_perf()}</strong>{m.toast_why_perf_1()}<code>content-visibility: auto</code>{m.toast_why_perf_2()}</li>
  </ul>

  <h3>{m.sec_sources()}</h3>
  <ul>
    <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/alert/">WAI-ARIA APG — Alert</a></li>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/alert_role">MDN — alert role</a></li>
    <li><a href="https://m3.material.io/components/snackbar/overview">Material Design 3 — Snackbar</a></li>
    <li><a href="https://primer.style/components/toast">Primer — Toast</a></li>
    <li><a href="https://ant.design/components/message">Ant Design — Message</a></li>
  </ul>

  
<h2>{m.sec_implementation()}</h2>
<ul>
    <li>{m.toast_impl_1()}</li>
    <li>{m.toast_impl_2()}</li>
    <li>{m.toast_impl_3()}</li>
    <li>{m.toast_impl_4()}</li>
    <li>{m.toast_impl_5()}</li>
</ul>

<h2>{m.sec_mistakes()}</h2>
<ul>
    <li>{m.toast_mistake_1()}</li>
    <li>{m.toast_mistake_2()}</li>
</ul>

<h2>{m.sec_related()}</h2>
<p>{m.toast_related_1()}</p>  <h2>{m.sec_responsiveness()}</h2>
  <ul>
    <li>{m.toast_responsive_1_1()}<code>max-w-sm</code>{m.toast_responsive_1_2()}</li>
    <li>{m.toast_responsive_2()}</li>
    <li>{m.toast_responsive_3()}</li>
  </ul>

  <h2>{m.sec_customization()}</h2>
  <ul>
    <li>{m.toast_custom_1_1()}<code>default</code>, <code>primary</code>, <code>success</code>, <code>warning</code>, <code>error</code>, <code>info</code>{m.toast_custom_1_2()}</li>
    <li>{m.toast_custom_2_1()}<code>top-right</code>, <code>top-left</code>, <code>top-center</code>, <code>bottom-right</code>, <code>bottom-left</code>, <code>bottom-center</code>, <code>middle-left</code>, <code>middle-right</code>{m.toast_custom_2_2()}</li>
    <li>{m.toast_custom_3()}</li>
    <li>{m.toast_custom_4_1()}<code>progress: false</code>{m.toast_custom_4_2()}</li>
  </ul>

  <h2>{m.sec_examples()}</h2>

  <h3>{m.toast_ex_basic()}</h3>
  <ExampleTabs code={`<script>
  import { toastStore } from "$lib/components/Toast/toastStore.js"
<\/script>

<button onclick={() => toastStore.add({ message: "Profile saved successfully" })}>
  Save Profile
</button>

<Toast />`}>
    <div class="flex flex-wrap gap-4" data-testid="toast-basic">
      <Button onclick={() => toastStore.add({ message: "Profile saved successfully" })}>
        Save Profile
      </Button>
    </div>
  </ExampleTabs>

  <h3>{m.toast_ex_variants()}</h3>
  <ExampleTabs code={`toastStore.add({ message: "Profile saved successfully", variant: "success" })
toastStore.add({ message: "Could not reach server", variant: "error" })
toastStore.add({ message: "Storage almost full — 90% used", variant: "warning" })
toastStore.add({ message: "A new version is available", variant: "info" })`}>
    <div class="flex flex-wrap gap-4" data-testid="toast-variants">
      <Button onclick={() => toastStore.add({ message: "Profile saved successfully", variant: "success" })}>
        Success
      </Button>
      <Button onclick={() => toastStore.add({ message: "Could not reach server", variant: "error" })}>
        Error
      </Button>
      <Button onclick={() => toastStore.add({ message: "Storage almost full — 90% used", variant: "warning" })}>
        Warning
      </Button>
      <Button onclick={() => toastStore.add({ message: "A new version is available", variant: "info" })}>
        Info
      </Button>
    </div>
  </ExampleTabs>

  <h3>{m.toast_ex_title()}</h3>
  <ExampleTabs code={`toastStore.add({
  title: "Payment processed",
  message: "Your invoice has been paid",
  variant: "success"
})`}>
    <div class="flex flex-wrap gap-4" data-testid="toast-with-title">
      <Button onclick={() => toastStore.add({ title: "Payment processed", message: "Your invoice has been paid", variant: "success" })}>
        Payment Success
      </Button>
    </div>
  </ExampleTabs>

  <h3>{m.toast_ex_countdown()}</h3>
  <ExampleTabs code={`toastStore.add({
  title: "Deploying release",
  message: "v0.50 ships in 8 seconds",
  variant: "info",
  duration: 8000
})`}>
    <div class="flex flex-wrap gap-4" data-testid="toast-countdown">
      <Button onclick={() => toastStore.add({ title: "Deploying release", message: "v0.50 ships in 8 seconds", variant: "info", duration: 8000 })}>
        Deploy in 8s
      </Button>
    </div>
  </ExampleTabs>

  <h3>{m.toast_ex_positions()}</h3>
  <ExampleTabs code={`<Toast position="top-right" />
<Toast position="top-left" />
<Toast position="top-center" />
<Toast position="bottom-right" />
<Toast position="bottom-left" />
<Toast position="bottom-center" />
<Toast position="middle-left" />
<Toast position="middle-right" />`}>
    <div class="flex flex-wrap gap-4" data-testid="toast-positions">
      <Button onclick={() => toastStore.add({ message: "Top Right" })}>Top Right</Button>
      <Button onclick={() => toastStore.add({ message: "Top Left" })}>Top Left</Button>
      <Button onclick={() => toastStore.add({ message: "Top Center" })}>Top Center</Button>
      <Button onclick={() => toastStore.add({ message: "Bottom Right" })}>Bottom Right</Button>
      <Button onclick={() => toastStore.add({ message: "Bottom Left" })}>Bottom Left</Button>
      <Button onclick={() => toastStore.add({ message: "Bottom Center" })}>Bottom Center</Button>
      <Button onclick={() => toastStore.add({ message: "Middle Left" })}>Middle Left</Button>
      <Button onclick={() => toastStore.add({ message: "Middle Right" })}>Middle Right</Button>
    </div>
  </ExampleTabs>

  <h2>{m.sec_props()}</h2>
  <PropsTable component={ToastModule} />

  <h2>{m.toast_store_heading()}</h2>
  <table>
    <thead><tr><th>{m.toast_store_method()}</th><th>{m.toast_store_params()}</th><th>{m.sec_description()}</th></tr></thead>
    <tbody>
      <tr><td><code>add()</code></td><td><code>{'{ message, title?, variant?, duration?, icon?, progress? }'}</code></td><td>{m.toast_store_add()}</td></tr>
      <tr><td><code>remove()</code></td><td><code>id: string</code></td><td>{m.toast_store_remove()}</td></tr>
      <tr><td><code>setClosing()</code></td><td><code>id: string</code></td><td>{m.toast_store_closing()}</td></tr>
      <tr><td><code>clear()</code></td><td>{m.sec_none()}</td><td>{m.toast_store_clear()}</td></tr>
      <tr><td><code>pause()</code></td><td><code>id: string</code></td><td>{m.toast_store_pause()}</td></tr>
      <tr><td><code>resume()</code></td><td><code>id: string</code></td><td>{m.toast_store_resume()}</td></tr>
    </tbody>
  </table>

  <h2>{m.sec_accessibility()}</h2>
  <ul>
    <li>{m.toast_a11y_1_1()}<code>role="alert"</code>{m.toast_a11y_1_2()}</li>
    <li>{m.toast_a11y_2_1()}<code>aria-live="polite"</code>{m.toast_a11y_2_2()}</li>
    <li>{m.toast_a11y_3_1()}<code>aria-atomic="true"</code>{m.toast_a11y_3_2()}</li>
    <li>{m.toast_a11y_4_1()}<code>aria-label</code>{m.toast_a11y_4_2()}</li>
    <li>{m.toast_a11y_5()}</li>
  </ul>

  <h2>{m.sec_keyboard()}</h2>
  <table>
    <thead><tr><th>{m.sec_key()}</th><th>{m.sec_function()}</th></tr></thead>
    <tbody>
      <tr><td><kbd>Tab</kbd></td><td>{m.toast_kb_tab()}</td></tr>
      <tr><td><kbd>Enter</kbd> / <kbd>Space</kbd></td><td>{m.toast_kb_enter()}</td></tr>
      <tr><td><kbd>Escape</kbd></td><td>{m.toast_kb_escape()}</td></tr>
    </tbody>
  </table>

  <h2>{m.toast_css_heading()}</h2>
  <ul>
    <li><code>@starting-style</code>{m.toast_css_1_1()}</li>
    <li><code>transition-behavior: allow-discrete</code>{m.toast_css_2_1()}<code>display</code>{m.toast_css_2_2()}</li>
    <li><code>content-visibility: auto</code>{m.toast_css_3_1()}</li>
  </ul>
</Container>

<Toast />

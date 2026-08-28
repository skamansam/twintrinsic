---
title: DocPage Template Reference
description: Reference implementation showing the standardized documentation page structure.
---

This is not a routable page — it documents the **template structure** that all
Twintrinsic component doc pages should follow. See the source file for the
canonical example.

## Required Sections (in order)

| # | Section | Snippet prop | Description |
|---|---------|-------------|-------------|
| 1 | **Name** | `name` | Component name as H1. Passed as a string prop. |
| 2 | **Description** | `description` | 1–2 sentence overview. Explain what, when, why. |
| 3 | **What, When & Why** | `whatWhenWhy` | Subsections: "What is it?", "When should I use it?", "Why does it exist?", "Sources". |
| 4 | **Responsiveness** | `responsiveness` | How the component adapts to different viewports. |
| 5 | **Customization** | `customization` | Available variants, sizes, props for visual control. |
| 6 | **Examples** | `examples` | Live demos wrapped in `<ExampleTabs>` with tabbed code/demo interface. |
| 7 | **Slots** | `slots` | Named slots/snippets table. |
| 8 | **Props** | `props` | `<PropsTable component={Module} />` |
| 9 | **Events** | `events` | `<EventsTable component={Module} />` |
| 10 | **Accessibility** | `accessibility` | ARIA roles, labels, screen reader support. |
| 11 | **Keyboard Support** | `keyboardSupport` | Key → function table. |
| 12 | **Additional** | `children` | Any extra sections (comparison tables, best practices, etc.) |

## Usage Pattern

```svelte
<script lang="ts">
  import DocPage from "$lib/components/DocPage/DocPage.svelte"
  import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
  import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
  import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
  import MyComponent from "$lib/components/MyComponent/MyComponent.svelte"
  import * as MyComponentModule from "$lib/components/MyComponent/MyComponent.svelte"
</script>

<DocPage name="MyComponent">
  {#snippet description()}
    <p>
      <strong>MyComponent</strong> does X. Use it when you need Y.
    </p>
  {/snippet}

  {#snippet whatWhenWhy()}
    <h3>What is it?</h3>
    <p>A component that does X.</p>

    <h3>When should I use it?</h3>
    <p>Use it for Y scenarios.</p>

    <h3>Why does it exist?</h3>
    <ul>
      <li><strong>Reason 1</strong> — explanation.</li>
      <li><strong>Reason 2</strong> — explanation.</li>
    </ul>

    <h3>Sources</h3>
    <ul>
      <li><a href="...">WAI-ARIA APG</a></li>
      <li><a href="...">MDN</a></li>
    </ul>
  {/snippet}

  {#snippet responsiveness()}
    <ul>
      <li>Desktop behavior.</li>
      <li>Mobile behavior.</li>
    </ul>
  {/snippet}

  {#snippet customization()}
    <ul>
      <li>Variants: ...</li>
      <li>Sizes: ...</li>
    </ul>
  {/snippet}

  {#snippet examples()}
    <h3>Basic</h3>
    <ExampleTabs code={`<MyComponent />`}>
      <MyComponent />
    </ExampleTabs>
  {/snippet}

  {#snippet props()}
    <PropsTable component={MyComponentModule} />
  {/snippet}

  {#snippet events()}
    <EventsTable component={MyComponentModule} />
  {/snippet}

  {#snippet accessibility()}
    <ul>
      <li>Uses semantic HTML.</li>
      <li>Supports keyboard navigation.</li>
    </ul>
  {/snippet}

  {#snippet keyboardSupport()}
    <table>
      <thead><tr><th>Key</th><th>Function</th></tr></thead>
      <tbody>
        <tr><td><kbd>Enter</kbd></td><td>Activates the component</td></tr>
      </tbody>
    </table>
  {/snippet}
</DocPage>
```

## Guidelines

- **Every section is optional** — only provide the snippets you need. This
  allows gradual migration.
- **Examples always use `<ExampleTabs>`** — live demo in one tab, source code
  in another. The code string should match the demo.
- **Props and Events use the existing components** — `<PropsTable>` and
  `<EventsTable>` auto-derive data from the component module's `propsMetadata`.
- **Keyboard Support** — use `<kbd>` elements for key names. Include even for
  static components (note "no keyboard interaction required").
- **Description** — write for humans. Explain the problem the component solves,
  not just what it renders.
- **Sources** — link to WAI-ARIA APG, MDN, Material Design, and relevant
  design systems.

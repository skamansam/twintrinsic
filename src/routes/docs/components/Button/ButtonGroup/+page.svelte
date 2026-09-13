<!--
@component
ButtonGroup documentation page — standardized structure
-->
<script lang="ts">
import Button from "$lib/components/Button/Button.svelte"
import ButtonGroup from "$lib/components/Button/ButtonGroup.svelte"
import Container from "$lib/components/Container/Container.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as ButtonGroupModule from "$lib/components/Button/ButtonGroup.svelte"
import { m } from "$lib/paraglide/messages.js"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>{m.buttongroup_heading()}</h1>

  <p>
    <strong>{m.buttongroup_heading()}</strong>{m.buttongroup_lede_1()}
  </p>

  <h2>{m.sec_what_when_why()}</h2>

  <h3>{m.sec_what()}</h3>
  <p>
    {m.buttongroup_what_1()}<code>role="group"</code>{m.buttongroup_what_2()}<code>aria-label</code>{m.buttongroup_what_3()}
  </p>

  <h3>{m.sec_when()}</h3>
  <p>
    {m.buttongroup_when_1()}<code>&lt;ButtonGroup&gt;</code>{m.buttongroup_when_2()}
  </p>

  <h3>{m.sec_why()}</h3>
  <ul>
    <li><strong>{m.buttongroup_why_grouping()}</strong>{m.buttongroup_why_grouping_1()}</li>
    <li><strong>{m.buttongroup_why_inheritance()}</strong>{m.buttongroup_why_inheritance_1()}</li>
    <li><strong>{m.buttongroup_why_accessible()}</strong>{m.buttongroup_why_accessible_1()}<code>role="group"</code>{m.buttongroup_why_accessible_2()}<code>aria-label</code>{m.buttongroup_why_accessible_3()}</li>
  </ul>

  <h3>{m.sec_sources()}</h3>
  <ul>
    <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/button/">WAI-ARIA APG — Button</a></li>
    <li><a href="https://m3.material.io/components/button-groups/overview">Material Design 3 — Button groups</a></li>
    <li><a href="https://primer.style/components/button-group">Primer — ButtonGroup</a></li>
    <li><a href="https://ant.design/components/button">Ant Design — Button</a></li>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/group_role">MDN — group role</a></li>
  </ul>

  <h2>{m.sec_responsiveness()}</h2>
  <ul>
    <li>{m.buttongroup_responsive_1_1()}<code>vertical</code>{m.buttongroup_responsive_1_2()}</li>
    <li>{m.buttongroup_responsive_2_1()}<code>fullWidth</code>{m.buttongroup_responsive_2_2()}</li>
  </ul>

  <h2>{m.sec_customization()}</h2>
  <ul>
    <li>{m.buttongroup_custom_1_1()}<code>variant</code>{m.buttongroup_custom_1_2()}</li>
    <li>{m.buttongroup_custom_2_1()}<code>size</code>{m.buttongroup_custom_2_2()}</li>
    <li>{m.buttongroup_custom_3_1()}<code>vertical</code>{m.buttongroup_custom_3_2()}</li>
    <li>{m.buttongroup_custom_4_1()}<code>fullWidth</code>{m.buttongroup_custom_4_2()}</li>
  </ul>

  <h2>{m.sec_examples()}</h2>

  <h3>{m.buttongroup_ex_basic()}</h3>
  <ExampleTabs code={`<ButtonGroup ariaLabel="Text alignment">
  <Button>Left</Button>
  <Button>Center</Button>
  <Button>Right</Button>
</ButtonGroup>`}>
    <div data-testid="button-group-basic">
      <ButtonGroup ariaLabel="Text alignment">
        <Button>Left</Button>
        <Button>Center</Button>
        <Button>Right</Button>
      </ButtonGroup>
    </div>
  </ExampleTabs>

  <h3>{m.buttongroup_ex_variant()}</h3>
  <ExampleTabs code={`<ButtonGroup ariaLabel="Pagination" variant="outline" size="sm">
  <Button>Previous</Button>
  <Button>1</Button>
  <Button>2</Button>
  <Button>3</Button>
  <Button>Next</Button>
</ButtonGroup>`}>
    <div data-testid="button-group-variant">
      <ButtonGroup ariaLabel="Pagination" variant="outline" size="sm">
        <Button>Previous</Button>
        <Button>1</Button>
        <Button>2</Button>
        <Button>3</Button>
        <Button>Next</Button>
      </ButtonGroup>
    </div>
  </ExampleTabs>

  <h3>{m.buttongroup_ex_vertical()}</h3>
  <ExampleTabs code={`<ButtonGroup ariaLabel="File actions" vertical>
  <Button>Copy</Button>
  <Button>Move</Button>
  <Button>Delete</Button>
</ButtonGroup>`}>
    <div data-testid="button-group-vertical">
      <ButtonGroup ariaLabel="File actions" vertical>
        <Button>Copy</Button>
        <Button>Move</Button>
        <Button>Delete</Button>
      </ButtonGroup>
    </div>
  </ExampleTabs>

  <h3>{m.buttongroup_ex_fullwidth()}</h3>
  <ExampleTabs code={`<ButtonGroup ariaLabel="Sign in options" fullWidth>
  <Button variant="primary">Sign in</Button>
  <Button>Create account</Button>
</ButtonGroup>`}>
    <div data-testid="button-group-fullwidth">
      <ButtonGroup ariaLabel="Sign in options" fullWidth>
        <Button variant="primary">Sign in</Button>
        <Button>Create account</Button>
      </ButtonGroup>
    </div>
  </ExampleTabs>

  <h2>{m.sec_props()}</h2>
  <PropsTable component={ButtonGroupModule} />

  <h2>{m.sec_events()}</h2>
  <EventsTable component={ButtonGroupModule} />

  <h2>{m.sec_accessibility()}</h2>
  <ul>
    <li>{m.buttongroup_a11y_1()}<code>role="group"</code>{m.buttongroup_a11y_2()}<code>aria-label</code>{m.buttongroup_a11y_3()}</li>
    <li>{m.buttongroup_a11y_4()}</li>
    <li>{m.buttongroup_a11y_5()}</li>
  </ul>

  <h2>{m.sec_keyboard()}</h2>
  <table>
    <thead><tr><th>{m.sec_key()}</th><th>{m.sec_function()}</th></tr></thead>
    <tbody>
      <tr><td><kbd>Tab</kbd></td><td>{m.buttongroup_kb_1()}</td></tr>
      <tr><td><kbd>Enter</kbd> / <kbd>Space</kbd></td><td>{m.buttongroup_kb_2()}</td></tr>
    </tbody>
  </table>
</Container>

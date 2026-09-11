<!--
@component
Table documentation page — standardized structure
-->
<script lang="ts">
import Container from "$lib/components/Container/Container.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import Table from "$lib/components/Table/Table.svelte"
import * as TableModule from "$lib/components/Table/Table.svelte"
import { m } from "$lib/paraglide/messages.js"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>{m.table_heading()}</h1>

  <p>
    <strong>{m.table_heading()}</strong>{m.table_intro_1()}
  </p>

  <h2>{m.sec_what_when_why()}</h2>

  <h3>{m.sec_what()}</h3>
  <p>
    {m.table_what_1()}<code>&lt;table&gt;</code>{m.table_what_2()}<code>&lt;thead&gt;</code>{m.table_what_3()}<code>&lt;tbody&gt;</code>{m.table_what_4()}<code>&lt;th&gt;</code>{m.table_what_5()}<code>&lt;td&gt;</code>{m.table_what_6()}
  </p>

  <h3>{m.sec_when()}</h3>
  <p>
    {m.table_when_1()}<code>&lt;Table&gt;</code>{m.table_when_2()}<code>&lt;Card&gt;</code>{m.table_when_3()}<code>&lt;DataTable&gt;</code>{m.table_when_4()}
  </p>

  <h3>{m.sec_why()}</h3>
  <ul>
    <li><strong>{m.table_why_semantic()}</strong>{m.table_why_semantic_desc_1()}<code>&lt;table&gt;</code>{m.table_why_semantic_desc_2()}</li>
    <li><strong>{m.table_why_a11y()}</strong>{m.table_why_a11y_desc()}</li>
    <li><strong>{m.table_why_flexible()}</strong>{m.table_why_flexible_desc()}</li>
  </ul>

  <h3>{m.sec_sources()}</h3>
  <ul>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table">MDN — &lt;table&gt;</a></li>
    <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/table/">WAI-ARIA APG — Table</a></li>
    <li><a href="https://m3.material.io/components/data-tables/overview">Material Design 3 — Data tables</a></li>
    <li><a href="https://primer.style/components/table">Primer — Table</a></li>
    <li><a href="https://ant.design/components/table">Ant Design — Table</a></li>
  </ul>

  <h2>{m.sec_responsiveness()}</h2>
  <ul>
    <li>{m.table_responsive_1_0()}<code>overflow-x-auto</code>{m.table_responsive_1_1()}</li>
    <li>{m.table_responsive_2()}</li>
  </ul>

  <h2>{m.sec_customization()}</h2>
  <ul>
    <li><code>striped</code>{m.table_custom_1_1()}</li>
    <li><code>hoverable</code>{m.table_custom_2_1()}</li>
    <li><code>bordered</code>{m.table_custom_3_1()}</li>
    <li><code>compact</code>{m.table_custom_4_1()}</li>
  </ul>

  <h2>{m.sec_examples()}</h2>

  <h3>{m.table_ex_basic()}</h3>
  <ExampleTabs code={`<Table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Role</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Sarah Chen</td>
      <td>sarah.chen@acme.io</td>
      <td>Admin</td>
    </tr>
    <tr>
      <td>Marcus Webb</td>
      <td>marcus.webb@acme.io</td>
      <td>Editor</td>
    </tr>
  </tbody>
</Table>`}>
    <div class="overflow-x-auto" data-testid="table-basic">
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Sarah Chen</td>
            <td>sarah.chen@acme.io</td>
            <td>Admin</td>
          </tr>
          <tr>
            <td>Marcus Webb</td>
            <td>marcus.webb@acme.io</td>
            <td>Editor</td>
          </tr>
          <tr>
            <td>Priya Patel</td>
            <td>priya.patel@acme.io</td>
            <td>Viewer</td>
          </tr>
        </tbody>
      </Table>
    </div>
  </ExampleTabs>

  <h3>{m.table_ex_striped()}</h3>
  <ExampleTabs code={`<Table striped hoverable>
  <thead>
    <tr><th>Product</th><th>Price</th><th>Stock</th></tr>
  </thead>
  <tbody>
    <tr><td>Laptop</td><td>$999</td><td>45</td></tr>
    <tr><td>Mouse</td><td>$25</td><td>120</td></tr>
  </tbody>
</Table>`}>
    <div class="overflow-x-auto" data-testid="table-striped">
      <Table striped hoverable>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Laptop</td>
            <td>$999</td>
            <td>45</td>
          </tr>
          <tr>
            <td>Mouse</td>
            <td>$25</td>
            <td>120</td>
          </tr>
          <tr>
            <td>Keyboard</td>
            <td>$75</td>
            <td>80</td>
          </tr>
        </tbody>
      </Table>
    </div>
  </ExampleTabs>

  <h3>{m.table_ex_compact()}</h3>
  <ExampleTabs code={`<Table compact bordered>
  <thead>
    <tr><th>Feature</th><th>Status</th></tr>
  </thead>
  <tbody>
    <tr><td>Responsive</td><td>✅</td></tr>
    <tr><td>Accessible</td><td>✅</td></tr>
  </tbody>
</Table>`}>
    <div class="overflow-x-auto" data-testid="table-compact">
      <Table compact bordered>
        <thead>
          <tr>
            <th>Feature</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Responsive</td>
            <td>✅</td>
          </tr>
          <tr>
            <td>Accessible</td>
            <td>✅</td>
          </tr>
        </tbody>
      </Table>
    </div>
  </ExampleTabs>

  <h3>{m.table_ex_bordered()}</h3>
  <ExampleTabs code={`<Table bordered>
  <thead><tr><th>Name</th><th>Role</th></tr></thead>
  <tbody><tr><td>Alice</td><td>Engineer</td></tr></tbody>
</Table>`}>
    <div class="overflow-x-auto" data-testid="table-bordered">
      <Table bordered>
        <thead><tr><th>Name</th><th>Role</th></tr></thead>
        <tbody><tr><td>Alice</td><td>Engineer</td></tr></tbody>
      </Table>
    </div>
  </ExampleTabs>

  <h3>{m.table_ex_hoverable()}</h3>
  <ExampleTabs code={`<Table hoverable>
  <thead><tr><th>Task</th><th>Status</th></tr></thead>
  <tbody>
    <tr><td>Migrate billing API</td><td>Done</td></tr>
    <tr><td>Write integration tests</td><td>In progress</td></tr>
  </tbody>
</Table>`}>
    <div class="overflow-x-auto" data-testid="table-hoverable">
      <Table hoverable>
        <thead><tr><th>Task</th><th>Status</th></tr></thead>
        <tbody>
          <tr><td>Migrate billing API</td><td>Done</td></tr>
          <tr><td>Write integration tests</td><td>In progress</td></tr>
        </tbody>
      </Table>
    </div>
  </ExampleTabs>

  <h2>{m.sec_props()}</h2>
  <PropsTable component={TableModule} />

  <h2>{m.sec_accessibility()}</h2>
  <ul>
    <li>{m.table_a11y_1_0()}<code>&lt;table&gt;</code>{m.table_a11y_1_1()}<code>&lt;thead&gt;</code>{m.table_a11y_1_2()}<code>&lt;tbody&gt;</code>{m.table_a11y_1_3()}<code>&lt;th&gt;</code>{m.table_a11y_1_4()}<code>&lt;td&gt;</code>{m.table_a11y_1_5()}</li>
    <li>{m.table_a11y_2_0()}<code>&lt;th&gt;</code>{m.table_a11y_2_1()}</li>
    <li>{m.table_a11y_3()}</li>
    <li>{m.table_a11y_4()}</li>
  </ul>

  <h2>{m.sec_keyboard()}</h2>
  <p>{m.table_kb_note()}</p>
</Container>

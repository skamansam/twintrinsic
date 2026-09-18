<!--
@component
FileUpload documentation page — standardized structure
-->
<script lang="ts">
import BrowserApiBadge from "$lib/components/BrowserApiBadge/BrowserApiBadge.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import Container from "$lib/components/Container/Container.svelte"
import FileUpload from "$lib/components/Form/FileUpload.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as FileUploadModule from "$lib/components/Form/FileUpload.svelte"
import { m } from "$lib/paraglide/messages.js"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <div class="flex flex-wrap items-center gap-3">
  <h1>{m.fileupload_heading()}</h1>
  <BrowserApiBadge component="FileUpload" />
</div>

  <p>
    <strong>{m.fileupload_heading()}</strong>{m.fileupload_lede_1()}
  </p>

  <h2>{m.sec_what_when_why()}</h2>

  <h3>{m.sec_what()}</h3>
  <p>{m.fileupload_what_1()}</p>

  <h3>{m.sec_when()}</h3>
  <p>
    {m.fileupload_when_1()}<code>&lt;FileUpload&gt;</code>{m.fileupload_when_2()}<code>&lt;input type="file"&gt;</code>{m.fileupload_when_3()}
  </p>

  <h3>{m.sec_why()}</h3>
  <ul>
    <li><strong>{m.fileupload_why_ux()}</strong>{m.fileupload_why_ux_1()}</li>
    <li><strong>{m.fileupload_why_validation()}</strong>{m.fileupload_why_validation_1()}</li>
    <li><strong>{m.fileupload_why_progress()}</strong>{m.fileupload_why_progress_1()}</li>
  </ul>

  <h3>{m.sec_sources()}</h3>
  <ul>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file">MDN — file input</a></li>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/API/FileReader">MDN — FileReader API</a></li>
  </ul>

  <h2>{m.sec_implementation()}</h2>
  <ul>
    <li>{m.fileupload_impl_1()}</li>
    <li>{m.fileupload_impl_2()}</li>
    <li>{m.fileupload_impl_3()}</li>
    <li>{m.fileupload_impl_4()}</li>
    <li>{m.fileupload_impl_5()}</li>
  </ul>

  <h2>{m.sec_mistakes()}</h2>
  <ul>
    <li>{m.fileupload_mistake_1()}</li>
    <li>{m.fileupload_mistake_2()}</li>
    <li>{m.fileupload_mistake_3()}</li>
  </ul>

  <h2>{m.sec_related()}</h2>
  <p>{m.fileupload_related_1()}</p>

  <h2>{m.sec_responsiveness()}</h2>
  <ul>
    <li>{m.fileupload_responsive_1()}</li>
    <li>{m.fileupload_responsive_2()}</li>
    <li>{m.fileupload_responsive_3()}</li>
  </ul>

  <h2>{m.sec_customization()}</h2>
  <ul>
    <li>{m.fileupload_custom_1_1()}<code>accept</code>{m.fileupload_custom_1_2()}</li>
    <li>{m.fileupload_custom_2_1()}<code>maxFiles</code>{m.fileupload_custom_2_2()}<code>maxSize</code>{m.fileupload_custom_2_3()}</li>
    <li>{m.fileupload_custom_3()}</li>
    <li>{m.fileupload_custom_4()}</li>
  </ul>

  <h2>{m.sec_examples()}</h2>

  <h3>{m.fileupload_ex_basic()}</h3>
  <ExampleTabs code={`<FileUpload
  dropzoneLabel="Drop files here or click to browse"
  browseLabel="Select Files"
/>`}>
    <div class="max-w-md" data-testid="fileupload-basic">
      <FileUpload dropzoneLabel="Drop files here or click to browse" browseLabel="Select Files" />
    </div>
  </ExampleTabs>

  <h3>{m.fileupload_ex_image()}</h3>
  <ExampleTabs code={`<FileUpload accept="image/*" dropzoneLabel="Drop images here" browseLabel="Select Images" maxSize={2097152} />`}>
    <div class="max-w-md" data-testid="fileupload-image">
      <FileUpload accept="image/*" dropzoneLabel="Drop images here" browseLabel="Select Images" maxSize={2097152} />
    </div>
  </ExampleTabs>

  <h3>{m.fileupload_ex_disabled()}</h3>
  <ExampleTabs code={`<FileUpload disabled dropzoneLabel="Upload disabled" browseLabel="Cannot select files" />`}>
    <div class="max-w-md" data-testid="fileupload-disabled">
      <FileUpload disabled dropzoneLabel="Upload disabled" browseLabel="Cannot select files" />
    </div>
  </ExampleTabs>

  <h3>{m.fileupload_ex_single()}</h3>
  <ExampleTabs code={`<FileUpload multiple={false} />`}>
    <div class="max-w-md" data-testid="fileupload-single">
      <FileUpload multiple={false} />
    </div>
  </ExampleTabs>

  <h3>{m.fileupload_ex_camera()}</h3>
  <p>{m.fileupload_camera_intro_1()}<code>capture</code>{m.fileupload_camera_intro_2()}</p>
  <ExampleTabs code={`<FileUpload
  accept="image/*"
  capture="environment"
  multiple={false}
  dropzoneLabel="Take a photo"
  browseLabel="Open Camera"
/>`}>
    <div class="max-w-md" data-testid="fileupload-camera">
      <FileUpload accept="image/*" capture="environment" multiple={false} dropzoneLabel="Take a photo" browseLabel="Open Camera" />
    </div>
  </ExampleTabs>

  <h2>{m.sec_props()}</h2>
  <PropsTable component={FileUploadModule} />

  <h2>{m.sec_events()}</h2>
  <EventsTable component={FileUploadModule} />

  <h2>{m.sec_accessibility()}</h2>
  <ul>
    <li>{m.fileupload_a11y_1_1()}<code>&lt;input type="file"&gt;</code>{m.fileupload_a11y_1_2()}</li>
    <li>{m.fileupload_a11y_2()}</li>
    <li>{m.fileupload_a11y_3()}</li>
  </ul>

  <h2>{m.sec_keyboard()}</h2>
  <table>
    <thead><tr><th>{m.sec_key()}</th><th>{m.sec_function()}</th></tr></thead>
    <tbody>
      <tr><td><kbd>Tab</kbd></td><td>{m.fileupload_kb_tab()}</td></tr>
      <tr><td><kbd>Enter</kbd> / <kbd>Space</kbd></td><td>{m.fileupload_kb_enter()}</td></tr>
    </tbody>
  </table>
</Container>

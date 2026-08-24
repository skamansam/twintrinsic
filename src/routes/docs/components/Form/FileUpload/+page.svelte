<!--
@component
FileUpload documentation page — standardized structure
-->
<script lang="ts">
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import Container from "$lib/components/Container/Container.svelte"
import FileUpload from "$lib/components/Form/FileUpload.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as FileUploadModule from "$lib/components/Form/FileUpload.svelte"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>FileUpload</h1>

  <p>
    <strong>FileUpload</strong> provides a drag-and-drop zone and file browser for
    uploading files with validation, preview, and progress tracking.
  </p>

  <h2>What, When &amp; Why</h2>

  <h3>What is it?</h3>
  <p>
    A dropzone area that accepts files via drag-and-drop or click-to-browse. Shows
    file previews, validates file types/sizes, and optionally auto-uploads.
  </p>

  <h3>When should I use it?</h3>
  <p>
    Use <code>&lt;FileUpload&gt;</code> when users need to upload files: profile
    pictures, document attachments, data imports. For simple single-file input,
    use <code>&lt;input type="file"&gt;</code> directly.
  </p>

  <h3>Why does it exist?</h3>
  <ul>
    <li><strong>UX</strong> — drag-and-drop is faster than file browser navigation.</li>
    <li><strong>Validation</strong> — rejects wrong file types and oversized files before upload.</li>
    <li><strong>Progress</strong> — shows upload progress for large files.</li>
  </ul>

  <h2>Responsiveness</h2>
  <ul>
    <li>Dropzone fills its container width.</li>
    <li>On mobile, drag-and-drop is replaced by a prominent browse button.</li>
    <li>Touch targets meet 44×44 px minimum.</li>
  </ul>

  <h2>Customization</h2>
  <ul>
    <li>Accept specific file types via <code>accept</code> prop.</li>
    <li>Limit file count and size via <code>maxFiles</code> and <code>maxSize</code>.</li>
    <li>Custom dropzone and preview templates via snippets.</li>
    <li>Auto-upload to a URL.</li>
  </ul>

  <h2>Examples</h2>

  <h3>Basic Upload</h3>
  <ExampleTabs code={`<FileUpload
  dropzoneLabel="Drop files here or click to browse"
  browseLabel="Select Files"
/>`}>
    <div class="max-w-md" data-testid="fileupload-basic">
      <FileUpload dropzoneLabel="Drop files here or click to browse" browseLabel="Select Files" />
    </div>
  </ExampleTabs>

  <h3>Image Upload</h3>
  <ExampleTabs code={`<FileUpload accept="image/*" dropzoneLabel="Drop images here" browseLabel="Select Images" maxSize={2097152} />`}>
    <div class="max-w-md" data-testid="fileupload-image">
      <FileUpload accept="image/*" dropzoneLabel="Drop images here" browseLabel="Select Images" maxSize={2097152} />
    </div>
  </ExampleTabs>

  <h3>Disabled</h3>
  <ExampleTabs code={`<FileUpload disabled dropzoneLabel="Upload disabled" browseLabel="Cannot select files" />`}>
    <div class="max-w-md" data-testid="fileupload-disabled">
      <FileUpload disabled dropzoneLabel="Upload disabled" browseLabel="Cannot select files" />
    </div>
  </ExampleTabs>

  <h3>Single File</h3>
  <ExampleTabs code={`<FileUpload multiple={false} />`}>
    <div class="max-w-md" data-testid="fileupload-single">
      <FileUpload multiple={false} />
    </div>
  </ExampleTabs>

  <h2>Props</h2>
  <PropsTable component={FileUploadModule} />

  <h2>Events</h2>
  <EventsTable component={FileUploadModule} />

  <h2>Accessibility</h2>
  <ul>
    <li>Uses native <code>&lt;input type="file"&gt;</code> for keyboard/screen reader access.</li>
    <li>Dropzone has clear instructions and visual feedback.</li>
    <li>Errors and validation issues are announced clearly.</li>
  </ul>

  <h2>Keyboard Support</h2>
  <table>
    <thead><tr><th>Key</th><th>Function</th></tr></thead>
    <tbody>
      <tr><td><kbd>Tab</kbd></td><td>Move focus to the file input</td></tr>
      <tr><td><kbd>Enter</kbd> / <kbd>Space</kbd></td><td>Open file browser</td></tr>
    </tbody>
  </table>
</Container>

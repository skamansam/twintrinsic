<!--
@component
FileUpload documentation page
-->
<script lang="ts">
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
import Container from "$lib/components/Container/Container.svelte"
import FileUpload from "$lib/components/Form/FileUpload.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as FileUploadModule from "$lib/components/Form/FileUpload.svelte"
</script>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>FileUpload</h1>
  
  <p>
    The FileUpload component provides a modern interface for uploading files with drag-and-drop support,
    file validation, and progress tracking. It's designed to be user-friendly and accessible.
  </p>

  <h2>Examples</h2>

  <h3>Basic File Upload</h3>
  <div class="not-prose mb-8 max-w-md" data-testid="fileupload-basic">
    <FileUpload 
      dropzoneLabel="Drop files here or click to browse"
      browseLabel="Select Files"
    />
  </div>

  <CodeBlock language="svelte">{`<FileUpload 
  dropzoneLabel="Drop files here or click to browse"
  browseLabel="Select Files"
  onchange={(e) => console.log(e.detail.files)}
/>`}</CodeBlock>

  <h3>Image Upload</h3>
  <div class="not-prose mb-8 max-w-md" data-testid="fileupload-image">
    <FileUpload 
      accept="image/*"
      dropzoneLabel="Drop images here or click to browse"
      browseLabel="Select Images"
      maxSize={2097152}
      onchange={(e) => console.log(e.detail.files)}
    />
  </div>

  <CodeBlock language="svelte">{`<FileUpload 
  accept="image/*"
  dropzoneLabel="Drop images here or click to browse"
  browseLabel="Select Images"
  maxSize={2097152} // 2MB
  onchange={(e) => console.log(e.detail.files)}
/>`}</CodeBlock>

  <h3>Document Upload</h3>
  <div class="not-prose mb-8 max-w-md" data-testid="fileupload-document">
    <FileUpload 
      accept=".pdf,.doc,.docx,.txt"
      dropzoneLabel="Drop documents here or click to browse"
      browseLabel="Select Documents"
    />
  </div>

  <CodeBlock language="svelte">{`<FileUpload 
  accept=".pdf,.doc,.docx,.txt"
  dropzoneLabel="Drop documents here or click to browse"
  browseLabel="Select Documents"
  onchange={(e) => console.log(e.detail.files)}
/>`}</CodeBlock>

  <h3>Single File Upload</h3>
  <div class="not-prose mb-8 max-w-md" data-testid="fileupload-single">
    <FileUpload 
      multiple={false}
      dropzoneLabel="Drop a file here or click to browse"
      browseLabel="Select File"
    />
  </div>

  <CodeBlock language="svelte">{`<FileUpload 
  multiple={false}
  dropzoneLabel="Drop a file here or click to browse"
  browseLabel="Select File"
  onchange={(e) => console.log(e.detail.files)}
/>`}</CodeBlock>

  <h3>With File Validation</h3>
  <div class="not-prose mb-8 max-w-md" data-testid="fileupload-validation">
    <FileUpload 
      accept="image/*"
      maxFiles={3}
      maxSize={1048576}
      dropzoneLabel="Drop up to 3 images (max 1MB each)"
      browseLabel="Select Images"
      onerror={(e) => console.log(e.detail.errors)}
    />
  </div>

  <CodeBlock language="svelte">{`<FileUpload 
  accept="image/*"
  maxFiles={3}
  maxSize={1048576} // 1MB
  dropzoneLabel="Drop up to 3 images (max 1MB each)"
  browseLabel="Select Images"
  onerror={(e) => console.log(e.detail.errors)}
/>`}</CodeBlock>

  <h3>Disabled State</h3>
  <div class="not-prose mb-8 max-w-md" data-testid="fileupload-disabled">
    <FileUpload 
      disabled
      dropzoneLabel="Upload disabled"
      browseLabel="Cannot select files"
    />
  </div>

  <CodeBlock language="svelte">{`<FileUpload 
  disabled
  dropzoneLabel="Upload disabled"
  browseLabel="Cannot select files"
/>`}</CodeBlock>

  <h3>Custom Styling</h3>
  <div class="not-prose mb-8 max-w-md" data-testid="fileupload-styling">
    <FileUpload 
      class="border-2 border-dashed border-primary-500 dark:border-primary-400 rounded-xl p-8"
      dropzoneLabel="Drop files here or click to browse"
      browseLabel="Select Files"
    />
  </div>

  <CodeBlock language="svelte">{`<FileUpload 
  class="border-2 border-dashed border-primary-500 dark:border-primary-400 rounded-xl p-8"
  dropzoneLabel="Drop files here or click to browse"
  browseLabel="Select Files"
/>`}</CodeBlock>

  <h3>With Auto Upload</h3>
  <div class="not-prose mb-8 max-w-md" data-testid="fileupload-auto">
    <FileUpload 
      dropzoneLabel="Drop files here or click to browse"
      browseLabel="Select Files"
      autoUpload
      uploadUrl="/api/upload"
    />
  </div>

  <CodeBlock language="svelte">{`<FileUpload 
  dropzoneLabel="Drop files here or click to browse"
  browseLabel="Select Files"
  autoUpload
  uploadUrl="/api/upload"
  onsuccess={(e) => console.log('Upload successful', e.detail)}
  onerror={(e) => console.log('Upload failed', e.detail.errors)}
  onprogress={(e) => console.log('Progress:', e.detail.progress)}
/>`}</CodeBlock>

  <h2>Props</h2>
<PropsTable component={FileUploadModule} />

  <h2>Events</h2>
<EventsTable component={FileUploadModule} />

  <h2>Snippets</h2>
  <table>
    <thead>
      <tr>
        <th>Snippet</th>
        <th>Props</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>dropzone</code></td>
        <td>None</td>
        <td>Custom dropzone content</td>
      </tr>
      <tr>
        <td><code>previews</code></td>
        <td><code>{`{ files: File[], removeFile: (index: number) => void }`}</code></td>
        <td>Custom file previews template</td>
      </tr>
    </tbody>
  </table>

  <h2>Accessibility</h2>
  <p>
    The FileUpload component follows accessibility best practices:
  </p>
  <ul>
    <li>Uses native <code>&lt;input type="file"&gt;</code> for keyboard and screen reader accessibility</li>
    <li>Provides clear instructions for drag-and-drop and browse options</li>
    <li>Uses proper ARIA attributes for the dropzone</li>
    <li>Provides visual feedback for drag-and-drop interactions</li>
    <li>Communicates errors and validation issues clearly</li>
    <li>Shows progress information during uploads</li>
  </ul>

  <h2>Keyboard Support</h2>
  <table>
    <thead>
      <tr>
        <th>Key</th>
        <th>Function</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><kbd>Tab</kbd></td>
        <td>Moves focus to the file input</td>
      </tr>
      <tr>
        <td><kbd>Enter</kbd> or <kbd>Space</kbd></td>
        <td>When focus is on the dropzone, opens the file browser</td>
      </tr>
      <tr>
        <td><kbd>Enter</kbd> or <kbd>Space</kbd></td>
        <td>When focus is on a file delete button, removes the file</td>
      </tr>
    </tbody>
  </table>
</Container>

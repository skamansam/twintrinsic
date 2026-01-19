<!--
@component
FileUpload documentation page
-->
<script lang="ts">
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
import Container from "$lib/components/Container/Container.svelte"
import FileUpload from "$lib/components/Form/FileUpload.svelte"
</script>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>FileUpload</h1>
  
  <p>
    The FileUpload component provides a modern interface for uploading files with drag-and-drop support,
    file validation, and progress tracking. It's designed to be user-friendly and accessible.
  </p>

  <h2>Examples</h2>

  <h3>Basic File Upload</h3>
  <div class="not-prose mb-8 max-w-xl">
    <FileUpload 
      dropzoneLabel="Drop files here or click to browse"
      browseLabel="Select Files"
    />
  </div>

  <pre class="language-svelte"><code>{`<FileUpload 
  dropzoneLabel="Drop files here or click to browse"
  browseLabel="Select Files"
  onchange={(e) => console.log(e.detail.files)}
/>`}</code></pre>

  <h3>Image Upload</h3>
  <div class="not-prose mb-8 max-w-xl">
    <FileUpload 
      accept="image/*"
      dropzoneLabel="Drop images here or click to browse"
      browseLabel="Select Images"
      maxSize={2097152}
      onchange={(e) => console.log(e.detail.files)}
    />
  </div>

  <pre class="language-svelte"><code>{`<FileUpload 
  accept="image/*"
  dropzoneLabel="Drop images here or click to browse"
  browseLabel="Select Images"
  maxSize={2097152} // 2MB
  onchange={(e) => console.log(e.detail.files)}
/>`}</code></pre>

  <h3>Document Upload</h3>
  <div class="not-prose mb-8 max-w-xl">
    <FileUpload 
      accept=".pdf,.doc,.docx,.txt"
      dropzoneLabel="Drop documents here or click to browse"
      browseLabel="Select Documents"
    />
  </div>

  <pre class="language-svelte"><code>{`<FileUpload 
  accept=".pdf,.doc,.docx,.txt"
  dropzoneLabel="Drop documents here or click to browse"
  browseLabel="Select Documents"
  onchange={(e) => console.log(e.detail.files)}
/>`}</code></pre>

  <h3>Single File Upload</h3>
  <div class="not-prose mb-8 max-w-xl">
    <FileUpload 
      multiple={false}
      dropzoneLabel="Drop a file here or click to browse"
      browseLabel="Select File"
    />
  </div>

  <pre class="language-svelte"><code>{`<FileUpload 
  multiple={false}
  dropzoneLabel="Drop a file here or click to browse"
  browseLabel="Select File"
  onchange={(e) => console.log(e.detail.files)}
/>`}</code></pre>

  <h3>With File Validation</h3>
  <div class="not-prose mb-8 max-w-xl">
    <FileUpload 
      accept="image/*"
      maxFiles={3}
      maxSize={1048576}
      dropzoneLabel="Drop up to 3 images (max 1MB each)"
      browseLabel="Select Images"
      onerror={(e) => console.log(e.detail.errors)}
    />
  </div>

  <pre class="language-svelte"><code>{`<FileUpload 
  accept="image/*"
  maxFiles={3}
  maxSize={1048576} // 1MB
  dropzoneLabel="Drop up to 3 images (max 1MB each)"
  browseLabel="Select Images"
  onerror={(e) => console.log(e.detail.errors)}
/>`}</code></pre>

  <h3>Disabled State</h3>
  <div class="not-prose mb-8 max-w-xl">
    <FileUpload 
      disabled
      dropzoneLabel="Upload disabled"
      browseLabel="Cannot select files"
    />
  </div>

  <pre class="language-svelte"><code>{`<FileUpload 
  disabled
  dropzoneLabel="Upload disabled"
  browseLabel="Cannot select files"
/>`}</code></pre>

  <h3>Custom Styling</h3>
  <div class="not-prose mb-8 max-w-xl">
    <FileUpload 
      class="border-2 border-dashed border-primary-500 dark:border-primary-400 rounded-xl p-8"
      dropzoneLabel="Drop files here or click to browse"
      browseLabel="Select Files"
    />
  </div>

  <pre class="language-svelte"><code>{`<FileUpload 
  class="border-2 border-dashed border-primary-500 dark:border-primary-400 rounded-xl p-8"
  dropzoneLabel="Drop files here or click to browse"
  browseLabel="Select Files"
/>`}</code></pre>

  <h3>With Auto Upload</h3>
  <div class="not-prose mb-8 max-w-xl">
    <FileUpload 
      dropzoneLabel="Drop files here or click to browse"
      browseLabel="Select Files"
      autoUpload
      uploadUrl="/api/upload"
    />
  </div>

  <pre class="language-svelte"><code>{`<FileUpload 
  dropzoneLabel="Drop files here or click to browse"
  browseLabel="Select Files"
  autoUpload
  uploadUrl="/api/upload"
  onsuccess={(e) => console.log('Upload successful', e.detail)}
  onerror={(e) => console.log('Upload failed', e.detail.errors)}
  onprogress={(e) => console.log('Progress:', e.detail.progress)}
/>`}</code></pre>

  <h2>Props</h2>
  <table>
    <thead>
      <tr>
        <th>Prop</th>
        <th>Type</th>
        <th>Default</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>accept</code></td>
        <td><code>string</code></td>
        <td><code>""</code></td>
        <td>File types to accept (e.g., "image/*", ".pdf,.doc")</td>
      </tr>
      <tr>
        <td><code>multiple</code></td>
        <td><code>boolean</code></td>
        <td><code>true</code></td>
        <td>Whether to allow multiple file selection</td>
      </tr>
      <tr>
        <td><code>maxFiles</code></td>
        <td><code>number</code></td>
        <td><code>5</code></td>
        <td>Maximum number of files allowed</td>
      </tr>
      <tr>
        <td><code>maxSize</code></td>
        <td><code>number</code></td>
        <td><code>undefined</code></td>
        <td>Maximum file size in bytes</td>
      </tr>
      <tr>
        <td><code>disabled</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether the upload is disabled</td>
      </tr>
      <tr>
        <td><code>showPreviews</code></td>
        <td><code>boolean</code></td>
        <td><code>true</code></td>
        <td>Whether to show file previews</td>
      </tr>
      <tr>
        <td><code>autoUpload</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether to automatically upload files after selection</td>
      </tr>
      <tr>
        <td><code>uploadUrl</code></td>
        <td><code>string</code></td>
        <td><code>undefined</code></td>
        <td>URL for auto upload functionality</td>
      </tr>
      <tr>
        <td><code>uploadHeaders</code></td>
        <td><code>Object</code></td>
        <td><code>undefined</code></td>
        <td>Custom headers for upload requests</td>
      </tr>
      <tr>
        <td><code>dropzoneLabel</code></td>
        <td><code>string</code></td>
        <td><code>"Drag files here or click to browse"</code></td>
        <td>Text displayed in the dropzone</td>
      </tr>
      <tr>
        <td><code>browseLabel</code></td>
        <td><code>string</code></td>
        <td><code>"Browse"</code></td>
        <td>Text for the browse button</td>
      </tr>
      <tr>
        <td><code>ariaLabel</code></td>
        <td><code>string</code></td>
        <td><code>"File upload"</code></td>
        <td>ARIA label for accessibility</td>
      </tr>
      <tr>
        <td><code>name</code></td>
        <td><code>string</code></td>
        <td><code>undefined</code></td>
        <td>Name attribute for the file input</td>
      </tr>
      <tr>
        <td><code>id</code></td>
        <td><code>string</code></td>
        <td><code>random UUID</code></td>
        <td>HTML id for accessibility</td>
      </tr>
      <tr>
        <td><code>class</code></td>
        <td><code>string</code></td>
        <td><code>""</code></td>
        <td>Additional CSS classes</td>
      </tr>
    </tbody>
  </table>

  <h2>Events</h2>
  <table>
    <thead>
      <tr>
        <th>Event</th>
        <th>Detail</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>change</code></td>
        <td><code>{`{ files: File[] }`}</code></td>
        <td>Fired when selected files change</td>
      </tr>
      <tr>
        <td><code>error</code></td>
        <td><code>{`{ errors: Array }`}</code></td>
        <td>Fired when validation or upload errors occur</td>
      </tr>
      <tr>
        <td><code>progress</code></td>
        <td><code>{`{ progress: number, files: File[] }`}</code></td>
        <td>Fired during upload to indicate progress (0-100)</td>
      </tr>
      <tr>
        <td><code>success</code></td>
        <td><code>{`{ response: any, files: File[] }`}</code></td>
        <td>Fired when upload completes successfully</td>
      </tr>
    </tbody>
  </table>

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

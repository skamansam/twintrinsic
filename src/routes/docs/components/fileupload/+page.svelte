<!--
@component
FileUpload documentation page
-->
<script>
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
      dropzoneText="Drop files here or click to browse"
      browseText="Select Files"
    />
  </div>

  <pre class="language-svelte"><code>{`<FileUpload 
  dropzoneText="Drop files here or click to browse"
  browseText="Select Files"
  onchange={(e) => console.log(e.detail.files)}
/>`}</code></pre>

  <h3>Image Upload</h3>
  <div class="not-prose mb-8 max-w-xl">
    <FileUpload 
      accept="image/*"
      dropzoneText="Drop images here or click to browse"
      browseText="Select Images"
      maxFileSize={2097152}
      onchange={(e) => console.log(e.detail.files)}
    />
  </div>

  <pre class="language-svelte"><code>{`<FileUpload 
  accept="image/*"
  dropzoneText="Drop images here or click to browse"
  browseText="Select Images"
  maxFileSize={2097152} // 2MB
  onchange={(e) => console.log(e.detail.files)}
/>`}</code></pre>

  <h3>Document Upload</h3>
  <div class="not-prose mb-8 max-w-xl">
    <FileUpload 
      accept=".pdf,.doc,.docx,.txt"
      dropzoneText="Drop documents here or click to browse"
      browseText="Select Documents"
    />
  </div>

  <pre class="language-svelte"><code>{`<FileUpload 
  accept=".pdf,.doc,.docx,.txt"
  dropzoneText="Drop documents here or click to browse"
  browseText="Select Documents"
  onchange={(e) => console.log(e.detail.files)}
/>`}</code></pre>

  <h3>Single File Upload</h3>
  <div class="not-prose mb-8 max-w-xl">
    <FileUpload 
      multiple={false}
      dropzoneText="Drop a file here or click to browse"
      browseText="Select File"
    />
  </div>

  <pre class="language-svelte"><code>{`<FileUpload 
  multiple={false}
  dropzoneText="Drop a file here or click to browse"
  browseText="Select File"
  onchange={(e) => console.log(e.detail.files)}
/>`}</code></pre>

  <h3>With File Validation</h3>
  <div class="not-prose mb-8 max-w-xl">
    <FileUpload 
      accept="image/*"
      maxFiles={3}
      maxFileSize={1048576}
      dropzoneText="Drop up to 3 images (max 1MB each)"
      browseText="Select Images"
      validateOnDrop
      onerror={(e) => console.log(e.detail.error)}
    />
  </div>

  <pre class="language-svelte"><code>{`<FileUpload 
  accept="image/*"
  maxFiles={3}
  maxFileSize={1048576} // 1MB
  dropzoneText="Drop up to 3 images (max 1MB each)"
  browseText="Select Images"
  validateOnDrop
  onerror={(e) => console.log(e.detail.error)}
/>`}</code></pre>

  <h3>Disabled State</h3>
  <div class="not-prose mb-8 max-w-xl">
    <FileUpload 
      disabled
      dropzoneText="Upload disabled"
      browseText="Cannot select files"
    />
  </div>

  <pre class="language-svelte"><code>{`<FileUpload 
  disabled
  dropzoneText="Upload disabled"
  browseText="Cannot select files"
/>`}</code></pre>

  <h3>Custom Styling</h3>
  <div class="not-prose mb-8 max-w-xl">
    <FileUpload 
      class="border-2 border-dashed border-primary-500 dark:border-primary-400 rounded-xl p-8"
      dropzoneText="Drop files here or click to browse"
      browseText="Select Files"
    />
  </div>

  <pre class="language-svelte"><code>{`<FileUpload 
  class="border-2 border-dashed border-primary-500 dark:border-primary-400 rounded-xl p-8"
  dropzoneText="Drop files here or click to browse"
  browseText="Select Files"
/>`}</code></pre>

  <h3>With Upload Handler</h3>
  <div class="not-prose mb-8 max-w-xl">
    <FileUpload 
      dropzoneText="Drop files here or click to browse"
      browseText="Select Files"
      showProgress
      autoUpload
    />
  </div>

  <pre class="language-svelte"><code>{`<script>
  // Example upload function
  async function handleUpload(files) {
    // Create FormData
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });
    
    try {
      // Make API request
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        throw new Error('Upload failed');
      }
      
      const result = await response.json();
      return { success: true, urls: result.urls };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
</script>

<FileUpload 
  dropzoneText="Drop files here or click to browse"
  browseText="Select Files"
  showProgress
  autoUpload
  onUpload={handleUpload}
  onupload={(e) => console.log(e.detail)}
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
        <td><code>maxFileSize</code></td>
        <td><code>number</code></td>
        <td><code>5242880</code> (5MB)</td>
        <td>Maximum file size in bytes</td>
      </tr>
      <tr>
        <td><code>disabled</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether the upload is disabled</td>
      </tr>
      <tr>
        <td><code>required</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether file upload is required</td>
      </tr>
      <tr>
        <td><code>dropzoneText</code></td>
        <td><code>string</code></td>
        <td><code>"Drag and drop files here"</code></td>
        <td>Text displayed in the dropzone</td>
      </tr>
      <tr>
        <td><code>browseText</code></td>
        <td><code>string</code></td>
        <td><code>"Browse files"</code></td>
        <td>Text for the browse button</td>
      </tr>
      <tr>
        <td><code>errorText</code></td>
        <td><code>string</code></td>
        <td><code>"Error uploading files"</code></td>
        <td>Default error message</td>
      </tr>
      <tr>
        <td><code>showFileList</code></td>
        <td><code>boolean</code></td>
        <td><code>true</code></td>
        <td>Whether to show the list of selected files</td>
      </tr>
      <tr>
        <td><code>showProgress</code></td>
        <td><code>boolean</code></td>
        <td><code>true</code></td>
        <td>Whether to show upload progress</td>
      </tr>
      <tr>
        <td><code>validateOnDrop</code></td>
        <td><code>boolean</code></td>
        <td><code>true</code></td>
        <td>Whether to validate files on drop</td>
      </tr>
      <tr>
        <td><code>autoUpload</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether to automatically upload files after selection</td>
      </tr>
      <tr>
        <td><code>onUpload</code></td>
        <td><code>Function</code></td>
        <td><code>undefined</code></td>
        <td>Function to handle file uploads</td>
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
        <td><code>upload</code></td>
        <td><code>{`{ success: boolean, urls?: string[], error?: string }`}</code></td>
        <td>Fired when upload completes or fails</td>
      </tr>
      <tr>
        <td><code>error</code></td>
        <td><code>{`{ error: string }`}</code></td>
        <td>Fired when a validation or upload error occurs</td>
      </tr>
      <tr>
        <td><code>progress</code></td>
        <td><code>{`{ progress: number }`}</code></td>
        <td>Fired during upload to indicate progress (0-100)</td>
      </tr>
    </tbody>
  </table>

  <h2>Slots</h2>
  <table>
    <thead>
      <tr>
        <th>Slot</th>
        <th>Props</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>dropzone</code></td>
        <td><code>{`{ dragging: boolean }`}</code></td>
        <td>Custom dropzone content</td>
      </tr>
      <tr>
        <td><code>file-item</code></td>
        <td><code>{`{ file: File, index: number, progress: number }`}</code></td>
        <td>Custom file item template</td>
      </tr>
      <tr>
        <td><code>error</code></td>
        <td><code>{`{ error: string }`}</code></td>
        <td>Custom error message</td>
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

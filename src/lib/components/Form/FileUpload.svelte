<!--
@component
FileUpload - A component for uploading files with drag and drop support.
Provides consistent styling, accessibility features, and various display options.

Usage:
```svelte
<FileUpload 
  onchange={handleFiles} 
  accept="image/*"
  multiple
/>

<FileUpload 
  value={existingFiles}
  maxFiles={5}
  maxSize={5242880}
  onchange={handleFiles}
  onerror={handleError}
>
  <div slot="dropzone">
    <p>Drag files here or click to browse</p>
  </div>
</FileUpload>
```
-->
<script>
import { createEventDispatcher } from "svelte"

const {
  /** @type {string} - Additional CSS classes */
  class: className = "",

  /** @type {string} - HTML id for accessibility */
  id = crypto.randomUUID(),

  /** @type {string} - Name attribute for the input */
  name,

  /** @type {Array} - Current value (array of files) */
  value = [],

  /** @type {string} - Accepted file types */
  accept,

  /** @type {boolean} - Whether multiple files can be selected */
  multiple = false,

  /** @type {boolean} - Whether the upload is disabled */
  disabled = false,

  /** @type {number} - Maximum number of files allowed */
  maxFiles,

  /** @type {number} - Maximum file size in bytes */
  maxSize,

  /** @type {boolean} - Whether to show file previews */
  showPreviews = true,

  /** @type {boolean} - Whether to auto upload files */
  autoUpload = false,

  /** @type {string} - Upload URL for auto upload */
  uploadUrl,

  /** @type {Object} - Upload headers for auto upload */
  uploadHeaders,

  /** @type {string} - Label for the browse button */
  browseLabel = "Browse",

  /** @type {string} - Label for the dropzone */
  dropzoneLabel = "Drag files here or click to browse",

  /** @type {string} - ARIA label for the file input */
  ariaLabel = "File upload",

  dropzone,
  previews,
} = $props()

const dispatch = createEventDispatcher()

// Component state
let files = $state(Array.isArray(value) ? [...value] : [])
let inputElement
let dropzoneElement
let isDragging = $state(false)
let errors = $state([])
let uploading = $state(false)
let uploadProgress = $state({})

// Update files when value prop changes
$effect(() => {
  if (value !== files) {
    files = Array.isArray(value) ? [...value] : []
  }
})

/**
 * Validates files before adding them
 * @param {FileList|Array} newFiles - Files to validate
 * @returns {Array} - Valid files
 */
function validateFiles(newFiles) {
  const fileArray = Array.from(newFiles)
  const validFiles = []
  const newErrors = []

  // Check max files
  if (maxFiles && files.length + fileArray.length > maxFiles) {
    newErrors.push({
      type: "maxFiles",
      message: `Maximum of ${maxFiles} files allowed`,
    })

    // Only take as many files as we can
    fileArray.splice(0, maxFiles - files.length)
  }

  // Validate each file
  for (const file of fileArray) {
    // Check file size
    if (maxSize && file.size > maxSize) {
      newErrors.push({
        type: "maxSize",
        file,
        message: `File "${file.name}" exceeds maximum size of ${formatBytes(maxSize)}`,
      })
      continue
    }

    // Check file type if accept is specified
    if (accept) {
      const acceptTypes = accept.split(",").map((type) => type.trim())
      const fileType = file.type
      const fileExtension = `.${file.name.split(".").pop()}`

      const isAccepted = acceptTypes.some((type) => {
        if (type.startsWith(".")) {
          // Extension match
          return type === fileExtension
        } else if (type.endsWith("/*")) {
          // MIME type category match (e.g., image/*)
          const category = type.replace("/*", "")
          return fileType.startsWith(`${category}/`)
        } else {
          // Exact MIME type match
          return type === fileType
        }
      })

      if (!isAccepted) {
        newErrors.push({
          type: "accept",
          file,
          message: `File "${file.name}" has an invalid file type`,
        })
        continue
      }
    }

    // File is valid
    validFiles.push(file)
  }

  // Dispatch errors if any
  if (newErrors.length > 0) {
    errors = [...errors, ...newErrors]
    dispatch("error", { errors: newErrors })
  }

  return validFiles
}

/**
 * Handles file input change
 * @param {Event} event - Change event
 */
function handleInputChange(event) {
  if (disabled) return

  const inputFiles = event.target.files
  if (!inputFiles || inputFiles.length === 0) return

  addFiles(inputFiles)

  // Reset input value so the same file can be selected again
  if (inputElement) {
    inputElement.value = ""
  }
}

/**
 * Adds files to the current selection
 * @param {FileList|Array} newFiles - Files to add
 */
function addFiles(newFiles) {
  const validFiles = validateFiles(newFiles)

  if (validFiles.length > 0) {
    // Add new files
    const updatedFiles = multiple ? [...files, ...validFiles] : validFiles
    files = updatedFiles

    // Dispatch change event
    dispatch("change", { files: updatedFiles })

    // Auto upload if enabled
    if (autoUpload && uploadUrl) {
      uploadFiles(validFiles)
    }
  }
}

/**
 * Removes a file from the selection
 * @param {number} index - Index of the file to remove
 */
function removeFile(index) {
  if (disabled) return

  const removedFile = files[index]
  files = files.filter((_, i) => i !== index)

  // Dispatch change event
  dispatch("change", { files })

  // Dispatch remove event
  dispatch("remove", { file: removedFile, index })
}

/**
 * Handles drag enter event
 * @param {DragEvent} event - Drag event
 */
function handleDragEnter(event) {
  if (disabled) return

  event.preventDefault()
  event.stopPropagation()
  isDragging = true
}

/**
 * Handles drag over event
 * @param {DragEvent} event - Drag event
 */
function handleDragOver(event) {
  if (disabled) return

  event.preventDefault()
  event.stopPropagation()
  isDragging = true
}

/**
 * Handles drag leave event
 * @param {DragEvent} event - Drag event
 */
function handleDragLeave(event) {
  if (disabled) return

  event.preventDefault()
  event.stopPropagation()

  // Only set isDragging to false if we're leaving the dropzone
  // and not entering a child element
  const rect = dropzoneElement.getBoundingClientRect()
  const x = event.clientX
  const y = event.clientY

  if (x < rect.left || x >= rect.right || y < rect.top || y >= rect.bottom) {
    isDragging = false
  }
}

/**
 * Handles drop event
 * @param {DragEvent} event - Drop event
 */
function handleDrop(event) {
  if (disabled) return

  event.preventDefault()
  event.stopPropagation()
  isDragging = false

  const droppedFiles = event.dataTransfer.files
  if (!droppedFiles || droppedFiles.length === 0) return

  addFiles(droppedFiles)
}

/**
 * Opens the file browser
 */
function browse(evt) {
  evt.stopPropagation()
  if (disabled) return

  if (inputElement) {
    inputElement.click()
  }
}

/**
 * Uploads files to the server
 * @param {Array} filesToUpload - Files to upload
 */
async function uploadFiles(filesToUpload) {
  if (!uploadUrl || !filesToUpload.length) return

  uploading = true

  // Create FormData
  const formData = new FormData()

  // Add files to FormData
  filesToUpload.forEach((file, index) => {
    formData.append(name || "files", file, file.name)
    uploadProgress[file.name] = 0
  })

  try {
    // Create upload request
    const xhr = new XMLHttpRequest()

    // Track progress
    xhr.upload.addEventListener("progress", (event) => {
      if (event.lengthComputable) {
        const progress = Math.round((event.loaded / event.total) * 100)

        // Update progress for all files in this batch
        filesToUpload.forEach((file) => {
          uploadProgress[file.name] = progress
        })

        // Force update
        uploadProgress = { ...uploadProgress }

        // Dispatch progress event
        dispatch("progress", { progress, files: filesToUpload })
      }
    })

    // Set up completion handler
    xhr.addEventListener("load", () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        // Success
        filesToUpload.forEach((file) => {
          uploadProgress[file.name] = 100
        })

        // Force update
        uploadProgress = { ...uploadProgress }

        // Dispatch success event
        dispatch("success", {
          response: xhr.response,
          files: filesToUpload,
        })
      } else {
        // Error
        const error = {
          type: "upload",
          status: xhr.status,
          message: `Upload failed with status ${xhr.status}`,
          response: xhr.response,
        }

        errors = [...errors, error]

        // Dispatch error event
        dispatch("error", { errors: [error] })
      }

      uploading = false
    })

    // Set up error handler
    xhr.addEventListener("error", () => {
      const error = {
        type: "upload",
        message: "Network error during upload",
      }

      errors = [...errors, error]

      // Dispatch error event
      dispatch("error", { errors: [error] })

      uploading = false
    })

    // Open and send request
    xhr.open("POST", uploadUrl)

    // Add headers if provided
    if (uploadHeaders) {
      Object.entries(uploadHeaders).forEach(([key, value]) => {
        xhr.setRequestHeader(key, value)
      })
    }

    xhr.send(formData)
  } catch (error) {
    const errorObj = {
      type: "upload",
      message: error.message || "Error during upload",
    }

    errors = [...errors, errorObj]

    // Dispatch error event
    dispatch("error", { errors: [errorObj] })

    uploading = false
  }
}

/**
 * Formats bytes to human-readable size
 * @param {number} bytes - Bytes to format
 * @returns {string} - Formatted size
 */
function formatBytes(bytes) {
  if (bytes === 0) return "0 Bytes"

  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

/**
 * Gets file icon based on file type
 * @param {File} file - File to get icon for
 * @returns {string} - Icon HTML
 */
function getFileIcon(file) {
  const type = file.type

  if (type.startsWith("image/")) {
    return `
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
      `
  } else if (type.startsWith("video/")) {
    return `
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
        </svg>
      `
  } else if (type.startsWith("audio/")) {
    return `
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
        </svg>
      `
  } else if (type === "application/pdf") {
    return `
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
        </svg>
      `
  } else {
    return `
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
      `
  }
}

/**
 * Creates an image preview URL
 * @param {File} file - File to preview
 * @returns {string} - Preview URL
 */
function createPreviewUrl(file) {
  if (!file) return ""

  if (file.type.startsWith("image/")) {
    return URL.createObjectURL(file)
  }

  return ""
}

// Clean up object URLs on component destroy
onDestroy(() => {
  files.forEach((file) => {
    if (file.preview) {
      URL.revokeObjectURL(file.preview)
    }
  })
})
</script>

<div
  class="
    file-upload
    {isDragging ? 'file-upload-dragging' : ''}
    {disabled ? 'file-upload-disabled' : ''}
    {className}
  "
>
  <div
    class="file-upload-dropzone"
    ondragenter={handleDragEnter}
    ondragover={handleDragOver}
    ondragleave={handleDragLeave}
    ondrop={handleDrop}
    onclick={browse}
    bind:this={dropzoneElement}
    role="button"
    tabindex={disabled ? undefined : 0}
    aria-label={ariaLabel}
  >
    {#if dropzone}
      {@render dropzone?.()}
    {:else}
      <div class="file-upload-content">
        <svg class="file-upload-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
        </svg>
        <div class="file-upload-text">
          <p>{dropzoneLabel}</p>
          {#if maxFiles}
            <p class="file-upload-hint">Maximum {maxFiles} file{maxFiles === 1 ? '' : 's'}</p>
          {/if}
          {#if maxSize}
            <p class="file-upload-hint">Maximum size: {formatBytes(maxSize)}</p>
          {/if}
          {#if accept}
            <p class="file-upload-hint">Accepted types: {accept}</p>
          {/if}
        </div>
        <button 
          type="button" 
          class="file-upload-browse"
          onclick={browse}
          disabled={disabled}
        >
          {browseLabel}
        </button>
      </div>
    {/if}
  </div>
  
  <input
    {id}
    type="file"
    {name}
    {accept}
    {multiple}
    {disabled}
    class="file-upload-input"
    onchange={handleInputChange}
    bind:this={inputElement}
    aria-hidden="true"
    tabindex="-1"
  />
  
  {#if showPreviews && files.length > 0}
    <div class="file-upload-previews">
      {#if previews}
        {@render previews?.({ files, removeFile })}
      {:else}
        <ul class="file-upload-preview-list" role="list">
          {#each files as file, i}
            <li class="file-upload-preview-item">
              <div class="file-upload-preview-content">
                {#if file.type.startsWith('image/')}
                  <div class="file-upload-preview-image">
                    <img src={createPreviewUrl(file)} alt={file.name} />
                  </div>
                {:else}
                  <div class="file-upload-preview-icon">
                    {@html getFileIcon(file)}
                  </div>
                {/if}
                
                <div class="file-upload-preview-info">
                  <div class="file-upload-preview-name" title={file.name}>
                    {file.name}
                  </div>
                  <div class="file-upload-preview-size">
                    {formatBytes(file.size)}
                  </div>
                  
                  {#if uploadProgress[file.name] !== undefined}
                    <div class="file-upload-preview-progress">
                      <div 
                        class="file-upload-preview-progress-bar"
                        style="width: {uploadProgress[file.name]}%"
                      ></div>
                    </div>
                  {/if}
                </div>
                
                <button
                  type="button"
                  class="file-upload-preview-remove"
                  aria-label={`Remove ${file.name}`}
                  onclick={() => removeFile(i)}
                  disabled={disabled || uploading}
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            </li>
          {/each}
        </ul>
      {/if}
    </div>
  {/if}
  
  {#if errors.length > 0}
    <div class="file-upload-errors" role="alert">
      <ul class="file-upload-error-list">
        {#each errors as error}
          <li class="file-upload-error-item">
            {error.message}
          </li>
        {/each}
      </ul>
    </div>
  {/if}
</div>

<style lang="postcss">
  @reference "../../twintrinsic.css";
  
  .file-upload {
    @apply w-full;
  }
  
  .file-upload-dropzone {
    @apply border-2 border-dashed border-border dark:border-border;
    @apply rounded-lg;
    @apply bg-surface dark:bg-surface;
    @apply p-6;
    @apply cursor-pointer;
    @apply transition-colors duration-150;
    @apply focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400;
  }
  
  .file-upload-dragging {
    @apply border-primary-500 dark:border-primary-500;
    @apply bg-primary-50 dark:bg-primary-900/20;
  }
  
  .file-upload-disabled {
    @apply opacity-50 cursor-not-allowed;
    @apply pointer-events-none;
  }
  
  .file-upload-content {
    @apply flex flex-col items-center justify-center;
    @apply text-center;
  }
  
  .file-upload-icon {
    @apply w-12 h-12 mb-4;
    @apply text-muted dark:text-muted;
  }
  
  .file-upload-text {
    @apply mb-4;
    @apply text-text dark:text-text;
  }
  
  .file-upload-hint {
    @apply text-sm text-muted dark:text-muted;
    @apply mt-1;
  }
  
  .file-upload-browse {
    @apply px-4 py-2;
    @apply bg-primary-500 dark:bg-primary-500;
    @apply text-white dark:text-white;
    @apply rounded-md;
    @apply font-medium;
    @apply hover:bg-primary-600 dark:hover:bg-primary-600;
    @apply focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:ring-offset-2;
    @apply transition-colors duration-150;
  }
  
  .file-upload-input {
    @apply hidden;
  }
  
  .file-upload-previews {
    @apply mt-4;
  }
  
  .file-upload-preview-list {
    @apply space-y-2;
  }
  
  .file-upload-preview-item {
    @apply bg-surface dark:bg-surface;
    @apply border border-border dark:border-border;
    @apply rounded-md;
    @apply overflow-hidden;
  }
  
  .file-upload-preview-content {
    @apply flex items-center;
    @apply p-3;
  }
  
  .file-upload-preview-icon {
    @apply flex-shrink-0 mr-3;
    @apply text-muted dark:text-muted;
  }
  
  .file-upload-preview-image {
    @apply w-12 h-12 mr-3;
    @apply rounded-md overflow-hidden;
    @apply bg-muted/10 dark:bg-muted/10;
    @apply flex items-center justify-center;
  }
  
  .file-upload-preview-image img {
    @apply w-full h-full object-cover;
  }
  
  .file-upload-preview-info {
    @apply flex-grow min-w-0;
  }
  
  .file-upload-preview-name {
    @apply font-medium;
    @apply truncate;
    @apply text-text dark:text-text;
  }
  
  .file-upload-preview-size {
    @apply text-sm;
    @apply text-muted dark:text-muted;
  }
  
  .file-upload-preview-progress {
    @apply mt-1 w-full h-1;
    @apply bg-muted/10 dark:bg-muted/10;
    @apply rounded-full overflow-hidden;
  }
  
  .file-upload-preview-progress-bar {
    @apply h-full;
    @apply bg-primary-500 dark:bg-primary-500;
    @apply transition-all duration-150;
  }
  
  .file-upload-preview-remove {
    @apply flex-shrink-0 ml-3;
    @apply p-1 rounded-full;
    @apply text-muted dark:text-muted;
    @apply hover:text-error-500 dark:hover:text-error-500;
    @apply hover:bg-error-50 dark:hover:bg-error-900/20;
    @apply focus:outline-none focus:ring-2 focus:ring-error-500 dark:focus:ring-error-400;
    @apply transition-colors duration-150;
  }
  
  .file-upload-errors {
    @apply mt-4;
    @apply p-3;
    @apply bg-error-50 dark:bg-error-900/20;
    @apply border border-error-200 dark:border-error-800;
    @apply rounded-md;
    @apply text-error-700 dark:text-error-300;
  }
  
  .file-upload-error-list {
    @apply list-disc pl-5;
  }
  
  .file-upload-error-item {
    @apply text-sm;
  }
</style>

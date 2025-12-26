<script lang="ts">
import { createEventDispatcher } from "svelte"

const {
  class: className = "",
  id = crypto.randomUUID(),
  name,
  accept = "",
  multiple = false,
  maxSize,
  disabled = false,
  ariaLabel,
  children,
} = $props()

const dispatch = createEventDispatcher()

let isDragActive = $state(false)
let uploadedFiles = $state([])
let inputElement

const handleDragEnter = (e) => {
  e.preventDefault()
  e.stopPropagation()
  isDragActive = true
}

const handleDragLeave = (e) => {
  e.preventDefault()
  e.stopPropagation()
  isDragActive = false
}

const handleDragOver = (e) => {
  e.preventDefault()
  e.stopPropagation()
}

const handleDrop = (e) => {
  e.preventDefault()
  e.stopPropagation()
  isDragActive = false

  const files = Array.from(e.dataTransfer.files)
  processFiles(files)
}

const handleInputChange = (e) => {
  const files = Array.from(e.target.files || [])
  processFiles(files)
}

const processFiles = (files) => {
  const validFiles = []
  const errors = []

  for (const file of files) {
    if (maxSize && file.size > maxSize) {
      errors.push({
        file: file.name,
        error: `File size exceeds maximum of ${(maxSize / 1024 / 1024).toFixed(2)}MB`,
      })
      continue
    }

    validFiles.push(file)
  }

  if (validFiles.length > 0) {
    uploadedFiles = multiple ? [...uploadedFiles, ...validFiles] : validFiles
    dispatch("change", { files: validFiles, allFiles: uploadedFiles })
  }

  if (errors.length > 0) {
    dispatch("error", { errors })
  }
}

const removeFile = (index) => {
  uploadedFiles = uploadedFiles.filter((_, i) => i !== index)
  dispatch("change", { files: uploadedFiles, allFiles: uploadedFiles })
}

const clearAll = () => {
  uploadedFiles = []
  if (inputElement) {
    inputElement.value = ""
  }
  dispatch("change", { files: [], allFiles: [] })
}
</script>

<style>
  @reference '$lib/twintrinsic.css';

  .file-upload-wrapper {
    width: 100%;
  }

  .file-upload-dropzone {
    position: relative;
    border: 2px dashed var(--color-border);
    border-radius: 0.5rem;
    padding: 2rem;
    text-align: center;
    transition: all 0.2s ease;
    cursor: pointer;
    background-color: var(--color-background);
  }

  .file-upload-dropzone:hover {
    border-color: var(--color-primary);
    background-color: var(--color-hover);
  }

  .file-upload-dropzone.drag-active {
    border-color: var(--color-primary);
    background-color: rgba(59, 130, 246, 0.05);
  }

  .file-upload-input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }

  .file-upload-input:disabled {
    cursor: not-allowed;
  }

  .file-upload-content {
    pointer-events: none;
    color: var(--color-text-secondary);
  }

  .file-upload-content p {
    margin: 0.5rem 0;
  }

  .file-upload-list {
    margin-top: 1.5rem;
  }

  .file-upload-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem;
    background-color: var(--color-hover);
    border-radius: 0.375rem;
    margin-bottom: 0.5rem;
  }

  .file-upload-item-info {
    flex: 1;
    min-width: 0;
  }

  .file-upload-item-name {
    font-weight: 500;
    color: var(--color-text);
    word-break: break-word;
  }

  .file-upload-item-size {
    font-size: 0.875rem;
    color: var(--color-text-secondary);
    margin-top: 0.25rem;
  }

  .file-upload-item-remove {
    background: none;
    border: none;
    color: var(--color-text-secondary);
    cursor: pointer;
    padding: 0.25rem;
    margin-left: 0.5rem;
    transition: color 0.2s ease;
  }

  .file-upload-item-remove:hover {
    color: var(--color-error);
  }

  .file-upload-actions {
    margin-top: 1rem;
    display: flex;
    gap: 0.5rem;
  }

  .file-upload-clear {
    padding: 0.5rem 1rem;
    background-color: var(--color-error);
    color: white;
    border: none;
    border-radius: 0.375rem;
    cursor: pointer;
    font-size: 0.875rem;
    transition: background-color 0.2s ease;
  }

  .file-upload-clear:hover {
    background-color: var(--color-error-dark);
  }
</style>

<div class="file-upload-wrapper {className}" {id}>
  <div
    class="file-upload-dropzone"
    class:drag-active={isDragActive}
    on:dragenter={handleDragEnter}
    on:dragleave={handleDragLeave}
    on:dragover={handleDragOver}
    on:drop={handleDrop}
    role="button"
    tabindex="0"
    aria-label={ariaLabel || "File upload area"}
    aria-description={ariaDescription}
  >
    <input
      bind:this={inputElement}
      type="file"
      class="file-upload-input"
      {accept}
      {multiple}
      {disabled}
      {name}
      on:change={handleInputChange}
      aria-hidden="true"
    />
    <div class="file-upload-content">
      {#if children}
        {@render children({ isDragActive })}
      {:else}
        <p>Drag and drop files here or click to select</p>
        {#if maxSize}
          <p>Maximum file size: {(maxSize / 1024 / 1024).toFixed(2)}MB</p>
        {/if}
      {/if}
    </div>
  </div>

  {#if uploadedFiles.length > 0}
    <div class="file-upload-list">
      {#each uploadedFiles as file, index}
        <div class="file-upload-item">
          <div class="file-upload-item-info">
            <div class="file-upload-item-name">{file.name}</div>
            <div class="file-upload-item-size">
              {(file.size / 1024).toFixed(2)}KB
            </div>
          </div>
          <button
            class="file-upload-item-remove"
            on:click={() => removeFile(index)}
            aria-label="Remove {file.name}"
          >
            ✕
          </button>
        </div>
      {/each}

      <div class="file-upload-actions">
        <button class="file-upload-clear" on:click={clearAll}>
          Clear All
        </button>
      </div>
    </div>
  {/if}
</div>

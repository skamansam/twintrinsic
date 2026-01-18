<script module>
import { defineMeta } from "@storybook/addon-svelte-csf"
import FileUpload from "$lib/components/Form/FileUpload.svelte"

const { Story } = defineMeta({
  title: "Components/Form/FileUpload",
  component: FileUpload,
  tags: ["autodocs"],
  argTypes: {
    accept: { control: "text" },
    multiple: { control: "boolean" },
    maxFiles: { control: "number" },
    maxSize: { control: "number" },
    disabled: { control: "boolean" },
    showPreviews: { control: "boolean" },
    autoUpload: { control: "boolean" },
    dropzoneLabel: { control: "text" },
    browseLabel: { control: "text" },
    ariaLabel: { control: "text" },
  },
  args: {
    accept: "",
    multiple: true,
    maxFiles: 5,
    maxSize: 5242880,
    disabled: false,
    showPreviews: true,
    autoUpload: false,
    dropzoneLabel: "Drag files here or click to browse",
    browseLabel: "Browse",
    ariaLabel: "File upload",
  },
})
</script>

<Story name="Basic">
  <div class="w-full max-w-xl">
    <FileUpload 
      dropzoneLabel="Drop files here or click to browse"
      browseLabel="Select Files"
    />
  </div>
</Story>

<Story name="Image Upload">
  <div class="w-full max-w-xl">
    <FileUpload 
      accept="image/*"
      dropzoneLabel="Drop images here or click to browse"
      browseLabel="Select Images"
      maxSize={2097152}
    />
  </div>
</Story>

<Story name="Document Upload">
  <div class="w-full max-w-xl">
    <FileUpload 
      accept=".pdf,.doc,.docx,.txt"
      dropzoneLabel="Drop documents here or click to browse"
      browseLabel="Select Documents"
    />
  </div>
</Story>

<Story name="Single File Upload">
  <div class="w-full max-w-xl">
    <FileUpload 
      multiple={false}
      dropzoneLabel="Drop a file here or click to browse"
      browseLabel="Select File"
    />
  </div>
</Story>

<Story name="With File Validation">
  <div class="w-full max-w-xl">
    <FileUpload 
      accept="image/*"
      maxFiles={3}
      maxSize={1048576}
      dropzoneLabel="Drop up to 3 images (max 1MB each)"
      browseLabel="Select Images"
      onerror={(e) => console.log(e.detail.errors)}
    />
  </div>
</Story>

<Story name="Disabled">
  <div class="w-full max-w-xl">
    <FileUpload 
      disabled
      dropzoneLabel="Upload disabled"
      browseLabel="Cannot select files"
    />
  </div>
</Story>

<Story name="Custom Styling">
  <div class="w-full max-w-xl">
    <FileUpload 
      class="border-2 border-dashed border-primary-500 dark:border-primary-400 rounded-xl p-8"
      dropzoneLabel="Drop files here or click to browse"
      browseLabel="Select Files"
    />
  </div>
</Story>

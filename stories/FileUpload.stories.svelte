<script module>
import { defineMeta } from "@storybook/addon-svelte-csf"
import FileUpload from "../lib/components/Form/FileUpload.svelte"
import { fn } from "@storybook/test"

const { Story } = defineMeta({
  title: "Components/Form/FileUpload",
  component: FileUpload,
  tags: ["autodocs"],
  argTypes: {
    accept: { control: "text" },
    multiple: { control: "boolean" },
    maxFiles: { control: "number" },
    maxFileSize: { control: "number" },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
    dropzoneText: { control: "text" },
    browseText: { control: "text" },
    errorText: { control: "text" },
    showFileList: { control: "boolean" },
    showProgress: { control: "boolean" },
    validateOnDrop: { control: "boolean" },
    autoUpload: { control: "boolean" },
  },
  args: {
    accept: "",
    multiple: true,
    maxFiles: 5,
    maxFileSize: 5242880, // 5MB
    disabled: false,
    required: false,
    dropzoneText: "Drag and drop files here",
    browseText: "Browse files",
    errorText: "Error uploading files",
    showFileList: true,
    showProgress: true,
    validateOnDrop: true,
    autoUpload: false,
    onUpload: fn(),
    onChange: fn(),
    onError: fn(),
  },
})

// Mock upload function for demo purposes
function mockUpload(files) {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      resolve({ success: true, urls: files.map(() => "https://example.com/file") })
    }, 2000)
  })
}
</script>

<Story name="Basic">
  <div class="w-full max-w-xl">
    <FileUpload 
      dropzoneText="Drop files here or click to browse"
      browseText="Select Files"
    />
  </div>
</Story>

<Story name="Image Upload">
  <div class="w-full max-w-xl">
    <FileUpload 
      accept="image/*"
      dropzoneText="Drop images here or click to browse"
      browseText="Select Images"
      maxFileSize={2097152} // 2MB
    />
  </div>
</Story>

<Story name="Document Upload">
  <div class="w-full max-w-xl">
    <FileUpload 
      accept=".pdf,.doc,.docx,.txt"
      dropzoneText="Drop documents here or click to browse"
      browseText="Select Documents"
    />
  </div>
</Story>

<Story name="With Upload Simulation">
  <div class="w-full max-w-xl">
    <FileUpload 
      dropzoneText="Drop files here or click to browse"
      browseText="Select Files"
      showProgress
      onUpload={mockUpload}
    />
  </div>
</Story>

<Story name="Single File Upload">
  <div class="w-full max-w-xl">
    <FileUpload 
      multiple={false}
      dropzoneText="Drop a file here or click to browse"
      browseText="Select File"
    />
  </div>
</Story>

<Story name="Disabled">
  <div class="w-full max-w-xl">
    <FileUpload 
      disabled
      dropzoneText="Upload disabled"
      browseText="Cannot select files"
    />
  </div>
</Story>

<Story name="Custom Styling">
  <div class="w-full max-w-xl">
    <FileUpload 
      class="border-2 border-dashed border-primary-500 dark:border-primary-400 rounded-xl p-8"
      dropzoneText="Drop files here or click to browse"
      browseText="Select Files"
    />
  </div>
</Story>

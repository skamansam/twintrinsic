<script module>
import { defineMeta } from "@storybook/addon-svelte-csf"
import Alert from "$lib/components/Alert/Alert.svelte"

const { Story } = defineMeta({
  title: "Feedback/Alert",
  component: Alert,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["info", "success", "warning", "error", "default"],
    },
    border: {
      control: { type: "select" },
      options: ["left", "right", "top", "bottom"],
    },
    title: { control: "text" },
    dismissible: { control: "boolean" },
  },
  args: {
    variant: "info",
    border: "left",
  },
})
</script>

<Story name="Info">
  A new version of the app is available for download.
</Story>

<Story name="Success">
  Profile saved successfully.
</Story>

<Story name="Warning" args={{ variant: "warning", title: "Storage almost full" }}>
  Your account has used 95% of its storage quota.
</Story>

<Story name="Error" args={{ variant: "error" }}>
  Unable to connect to the server.
</Story>

<Story name="Dismissible" args={{ dismissible: true }}>
  You have 3 new messages.
</Story>

<Story name="Top Border" args={{ variant: "success", border: "top" }}>
  Top border alert
</Story>

<Story name="All Variants">
  <div class="space-y-3">
    <Alert variant="info">Informational message</Alert>
    <Alert variant="success">Success message</Alert>
    <Alert variant="warning" title="Warning">Warning with title</Alert>
    <Alert variant="error">Error message</Alert>
  </div>
</Story>

<script module>
import { defineMeta } from "@storybook/addon-svelte-csf"
import { expect } from "storybook/test"
import Footer from "$lib/components/Footer/Footer.svelte"
import FooterDemo from "./FooterDemo.svelte"

const { Story } = defineMeta({
  title: "App/Footer",
  component: Footer,
  tags: ["autodocs"],
})
</script>

<Story
  name="All Regions"
  asChild
  play={async ({ canvas }) => {
    // Each region renders its snippet content.
    await expect(canvas.getByText("© 2024 Acme Inc.")).toBeInTheDocument()
    await expect(canvas.getByText("Privacy Policy | Terms of Service")).toBeInTheDocument()
    await expect(canvas.getByText("Contact Us")).toBeInTheDocument()
  }}
>
  <FooterDemo />
</Story>

<Story
  name="Center Only"
  asChild
  play={async ({ canvas }) => {
    await expect(canvas.getByText("Copyright © 2024 Acme Inc.")).toBeInTheDocument()
    // The footer element still renders its three regions.
    await expect(canvas.getByText("Copyright © 2024 Acme Inc.").closest("footer")).toBeInTheDocument()
  }}
>
  <FooterDemo variant="center" />
</Story>

<Story name="With Class" asChild>
  <FooterDemo variant="class" />
</Story>

<script module>
import { defineMeta } from "@storybook/addon-svelte-csf"
import { expect, userEvent, fireEvent, waitFor } from "storybook/test"
import Rating from "$lib/components/Form/Rating.svelte"

const { Story } = defineMeta({
  title: "Form/Rating",
  component: Rating,
  tags: ["autodocs"],
  argTypes: {
    value: { control: { type: "number", min: 0, max: 10 } },
    min: { control: { type: "number" } },
    max: { control: { type: "number" } },
    step: { control: { type: "number", min: 0.5, max: 1 } },
    size: { control: { type: "select" }, options: ["sm", "md", "lg"] },
    readonly: { control: "boolean" },
    disabled: { control: "boolean" },
    showValue: { control: "boolean" },
    showPreview: { control: "boolean" },
  },
  args: { value: 3 },
})
</script>

<Story
  name="Default"
  args={{ value: 3, ariaLabel: "Rate this product" }}
  play={async ({ canvas }) => {
    // The rating is exposed as an accessible slider.
    const slider = canvas.getByRole("slider", { name: "Rate this product" })
    await expect(slider).toHaveAttribute("aria-valuenow", "3")
    await expect(slider).toHaveAttribute("aria-valuemax", "5")

    // Clicking the 5th star sets the value to 5.
    const stars = canvas.getAllByRole("button")
    await userEvent.click(stars[stars.length - 1])
    await expect(slider).toHaveAttribute("aria-valuenow", "5")
  }}
/>

<Story
  name="Keyboard Navigation"
  args={{ value: 2, ariaLabel: "Rating" }}
  play={async ({ canvas }) => {
    const slider = canvas.getByRole("slider", { name: "Rating" })
    slider.focus()
    await userEvent.keyboard("{ArrowRight}")
    await expect(slider).toHaveAttribute("aria-valuenow", "3")
    await userEvent.keyboard("{ArrowLeft}")
    await expect(slider).toHaveAttribute("aria-valuenow", "2")
    await userEvent.keyboard("{Home}")
    await expect(slider).toHaveAttribute("aria-valuenow", "0")
    await userEvent.keyboard("{End}")
    await expect(slider).toHaveAttribute("aria-valuenow", "5")
  }}
/>

<Story
  name="Half Stars"
  args={{ value: 3.5, step: 0.5, showValue: true, ariaLabel: "Half star rating" }}
  play={async ({ canvas }) => {
    const slider = canvas.getByRole("slider", { name: "Half star rating" })
    await expect(slider).toHaveAttribute("aria-valuenow", "3.5")
    // showValue renders the numeric value as text.
    await expect(canvas.getByText("3.5")).toBeInTheDocument()
  }}
/>

<Story name="Readonly" args={{ value: 4, readonly: true, ariaLabel: "Readonly rating" }} />

<Story name="Disabled" args={{ value: 2, disabled: true, ariaLabel: "Disabled rating" }} />

<Story
  name="Toggle Off"
  args={{ value: 3, ariaLabel: "Toggle rating" }}
  play={async ({ canvas }) => {
    // Clicking the currently-set star clears the rating back to min.
    // (fireEvent.click skips the mousedown drag handlers, isolating the
    // click-to-toggle behavior.)
    const slider = canvas.getByRole("slider", { name: "Toggle rating" })
    await expect(slider).toHaveAttribute("aria-valuenow", "3")
    const stars = canvas.getAllByRole("button")
    fireEvent.click(stars[3])
    await waitFor(() => expect(slider).toHaveAttribute("aria-valuenow", "0"))
    fireEvent.click(stars[3])
    await waitFor(() => expect(slider).toHaveAttribute("aria-valuenow", "3"))
  }}
/>

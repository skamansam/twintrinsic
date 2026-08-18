<script module>
import { defineMeta } from "@storybook/addon-svelte-csf"
import { expect, userEvent } from "storybook/test"
import Table from "$lib/components/Table/Table.svelte"
import TableHead from "$lib/components/Table/TableHead.svelte"
import TableBody from "$lib/components/Table/TableBody.svelte"
import TableHeader from "$lib/components/Table/TableHeader.svelte"
import TableRow from "$lib/components/Table/TableRow.svelte"
import TableCell from "$lib/components/Table/TableCell.svelte"

const { Story } = defineMeta({
  title: "Data Display/Table",
  component: Table,
  tags: ["autodocs"],
  argTypes: {
    bordered: { control: "boolean" },
    striped: { control: "boolean" },
    hoverable: { control: "boolean" },
    compact: { control: "boolean" },
    fixed: { control: "boolean" },
    responsive: { control: "boolean" },
  },
  args: { caption: "Team members" },
})

let lastSort = null
function recordSort(event) {
  lastSort = event.detail.direction
}

let clickedRow = null
function recordRowClick(event) {
  clickedRow = event.detail.row
}
</script>

<Story
  name="Default"
  asChild
  play={async ({ canvas }) => {
    // Renders a table with header cells, body cells, and a caption.
    await expect(canvas.getByRole("table")).toBeInTheDocument()
    await expect(canvas.getByRole("caption")).toHaveTextContent("Team members")
    await expect(canvas.getByRole("columnheader", { name: "Name" })).toBeInTheDocument()
    await expect(canvas.getByRole("cell", { name: "Ada Lovelace" })).toBeInTheDocument()
    await expect(canvas.getAllByRole("row").length).toBe(3)
  }}
>
  <Table caption="Team members">
    <TableHead>
      <TableRow>
        <TableHeader>Name</TableHeader>
        <TableHeader>Role</TableHeader>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <TableCell>Ada Lovelace</TableCell>
        <TableCell>Analyst</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Grace Hopper</TableCell>
        <TableCell>Engineer</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</Story>

<Story
  name="Sortable"
  asChild
  play={async ({ canvas }) => {
    // Clicking a sortable header fires onsort with the next direction.
    const header = canvas.getByRole("columnheader", { name: /name/i })
    await userEvent.click(header)
    await expect(lastSort).toBe("asc")
  }}
>
  <Table>
    <TableHead>
      <TableRow>
        <TableHeader sortable onsort={recordSort}>Name</TableHeader>
        <TableHeader sortable sortDirection="desc" onsort={recordSort}>Score</TableHeader>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <TableCell>Alice</TableCell>
        <TableCell numeric>95</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Bob</TableCell>
        <TableCell numeric>80</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</Story>

<Story
  name="Clickable Rows"
  asChild
  play={async ({ canvas }) => {
    // Clicking a clickable row fires onclick with the row's data.
    await userEvent.click(canvas.getByRole("row", { name: /product a/i }))
    await expect(clickedRow).toEqual({ id: 1, name: "Product A" })
  }}
>
  <Table>
    <TableHead>
      <TableRow>
        <TableHeader>Product</TableHeader>
        <TableHeader>Status</TableHeader>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow clickable data={{ id: 1, name: "Product A" }} onclick={recordRowClick}>
        <TableCell>Product A</TableCell>
        <TableCell>Active</TableCell>
      </TableRow>
      <TableRow clickable data={{ id: 2, name: "Product B" }} onclick={recordRowClick}>
        <TableCell>Product B</TableCell>
        <TableCell>Active</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</Story>

<Story
  name="Selected Row"
  asChild
  play={async ({ canvas }) => {
    const row = canvas.getByRole("row", { name: /grace hopper/i })
    await expect(row).toHaveAttribute("aria-selected", "true")
  }}
>
  <Table>
    <TableHead>
      <TableRow>
        <TableHeader>Name</TableHeader>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <TableCell>Ada Lovelace</TableCell>
      </TableRow>
      <TableRow selected>
        <TableCell>Grace Hopper</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</Story>

<Story
  name="Bordered Compact"
  asChild
  play={async ({ canvas }) => {
    await expect(canvas.getByRole("table")).toBeInTheDocument()
    await expect(canvas.getByRole("cell", { name: "Compact" })).toBeInTheDocument()
  }}
>
  <Table bordered compact striped>
    <TableHead>
      <TableRow>
        <TableHeader>Label</TableHeader>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <TableCell>Compact</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</Story>

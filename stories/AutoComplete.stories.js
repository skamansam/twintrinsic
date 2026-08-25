import { expect, userEvent } from "storybook/test"
import AutoComplete from "$lib/components/Form/AutoComplete.svelte"

const countries = [
  { label: "United States", value: "US" },
  { label: "United Kingdom", value: "UK" },
  { label: "Canada", value: "CA" },
  { label: "Australia", value: "AU" },
  { label: "Germany", value: "DE" },
  { label: "France", value: "FR" },
  { label: "Italy", value: "IT" },
  { label: "Spain", value: "ES" },
  { label: "Japan", value: "JP" },
  { label: "China", value: "CN" },
]

const users = [
  { label: "Sarah Chen", value: "1", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=faces" },
  { label: "Marcus Webb", value: "2", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=faces" },
  { label: "Priya Patel", value: "3", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=faces" },
  { label: "Diego Ramírez", value: "4", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=faces" },
  { label: "Emma Lindqvist", value: "5", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=faces" },
]

const UserTemplate = {
  render: ({ item }) => `
    <div class="flex items-center gap-2">
      <img src="${item.avatar}" alt="" class="w-8 h-8 rounded-full" />
      <span>${item.label}</span>
    </div>
  `,
}

export default {
  title: "Form/AutoComplete",
  component: AutoComplete,
  argTypes: {
    label: { control: "text" },
    items: { control: "array" },
    value: { control: "text" },
    minLength: { control: "number" },
    delay: { control: "number" },
    multiple: { control: "boolean" },
    highlight: { control: "boolean" },
    forceSelection: { control: "boolean" },
    maxItems: { control: "number" },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
  },
}

export const Default = {
  args: {
    label: "Country",
    items: countries,
    placeholder: "Select a country",
  },
  play: async ({ canvas }) => {
    const input = canvas.getByPlaceholderText("Select a country");
    await expect(input).toBeInTheDocument();
    await userEvent.type(input, "Unit");
    await expect(input).toHaveValue("Unit");
  },
}

export const Multiple = {
  args: {
    label: "Countries",
    items: countries,
    multiple: true,
    placeholder: "Select countries",
  },
}

export const CustomTemplate = {
  args: {
    label: "User",
    items: users,
    itemTemplate: UserTemplate,
    placeholder: "Select a user",
  },
}

export const WithMinLength = {
  args: {
    label: "Country",
    items: countries,
    minLength: 2,
    placeholder: "Type min. 2 characters",
  },
}

export const WithDelay = {
  args: {
    label: "Country",
    items: countries,
    delay: 500,
    placeholder: "Type to search (500ms delay)",
  },
}

export const WithHighlight = {
  args: {
    label: "Country",
    items: countries,
    highlight: true,
    placeholder: "Type to highlight matches",
  },
}

export const ForceSelection = {
  args: {
    label: "Country",
    items: countries,
    forceSelection: true,
    placeholder: "Must select from list",
  },
}

export const Loading = {
  args: {
    label: "Country",
    items: [],
    loading: true,
    placeholder: "Loading...",
  },
}

export const Disabled = {
  args: {
    label: "Country",
    items: countries,
    disabled: true,
    value: countries[0],
    placeholder: "Disabled",
  },
  play: async ({ canvas }) => {
    const input = canvas.getByPlaceholderText("Disabled");
    await expect(input).toBeDisabled();
  },
}

export const CustomFilter = {
  args: {
    label: "Country",
    items: countries,
    filter: (items, query) =>
      items.filter((item) => item.label.toLowerCase().startsWith(query.toLowerCase())),
    placeholder: "Starts with filter",
  },
}

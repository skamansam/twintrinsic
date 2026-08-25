import { expect, userEvent, within } from "storybook/test"
import Select from "$lib/components/Form/Select.svelte"

export default {
  title: "Form/Select",
  component: Select,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    value: { control: "text" },
    multiple: { control: "boolean" },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    error: { control: "text" },
    required: { control: "boolean" },
  },
}

const countries = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "mx", label: "Mexico" },
  { value: "br", label: "Brazil" },
  { value: "ar", label: "Argentina" },
  { value: "uk", label: "United Kingdom" },
  { value: "fr", label: "France" },
  { value: "de", label: "Germany" },
  { value: "it", label: "Italy" },
  { value: "es", label: "Spain" },
]

const programmingLanguages = [
  {
    group: "Frontend",
    value: "js",
    label: "JavaScript",
  },
  {
    group: "Frontend",
    value: "ts",
    label: "TypeScript",
  },
  {
    group: "Frontend",
    value: "html",
    label: "HTML",
  },
  {
    group: "Frontend",
    value: "css",
    label: "CSS",
  },
  {
    group: "Backend",
    value: "python",
    label: "Python",
  },
  {
    group: "Backend",
    value: "java",
    label: "Java",
  },
  {
    group: "Backend",
    value: "php",
    label: "PHP",
  },
  {
    group: "Backend",
    value: "ruby",
    label: "Ruby",
  },
  {
    group: "Mobile",
    value: "swift",
    label: "Swift",
  },
  {
    group: "Mobile",
    value: "kotlin",
    label: "Kotlin",
  },
  {
    group: "Mobile",
    value: "dart",
    label: "Dart",
  },
]

export const Default = {
  args: {
    label: "Country",
    options: countries,
    placeholder: "Select a country...",
  },
  play: async ({ canvas }) => {
    const select = canvas.getByRole("combobox", { name: /country/i });
    await expect(select).toBeInTheDocument();
  },
}

export const WithValue = {
  args: {
    label: "Country",
    options: countries,
    value: "us",
  },
  play: async ({ canvas }) => {
    const select = canvas.getByRole("combobox", { name: /country/i });
    await expect(select).toHaveValue("us");
  },
}

export const Multiple = {
  args: {
    label: "Programming Languages",
    options: programmingLanguages,
    multiple: true,
    placeholder: "Select languages...",
  },
}

export const WithGroups = {
  args: {
    label: "Programming Languages",
    options: programmingLanguages,
    placeholder: "Select a language...",
  },
}

export const Required = {
  args: {
    label: "Country",
    options: countries,
    required: true,
    placeholder: "Select a country...",
  },
}

export const WithError = {
  args: {
    label: "Country",
    options: countries,
    error: "Please select a country",
    required: true,
  },
  play: async ({ canvas }) => {
    const select = canvas.getByRole("combobox", { name: /country/i });
    await expect(select).toHaveAttribute("aria-invalid", "true");
    await expect(canvas.getByText("Please select a country")).toBeVisible();
  },
}

export const Disabled = {
  args: {
    label: "Country",
    options: countries,
    value: "us",
    disabled: true,
  },
  play: async ({ canvas }) => {
    const select = canvas.getByRole("combobox", { name: /country/i });
    await expect(select).toBeDisabled();
  },
}

export const WithSearch = {
  args: {
    label: "Country",
    options: [
      ...countries,
      { value: "au", label: "Australia" },
      { value: "nz", label: "New Zealand" },
      { value: "jp", label: "Japan" },
      { value: "kr", label: "South Korea" },
      { value: "cn", label: "China" },
      { value: "in", label: "India" },
    ],
    placeholder: "Search countries...",
  },
}

export const MultipleWithSearch = {
  args: {
    label: "Programming Languages",
    options: [
      ...programmingLanguages,
      {
        group: "Database",
        value: "sql",
        label: "SQL",
      },
      {
        group: "Database",
        value: "mongodb",
        label: "MongoDB",
      },
      {
        group: "Cloud",
        value: "aws",
        label: "AWS",
      },
      {
        group: "Cloud",
        value: "azure",
        label: "Azure",
      },
      {
        group: "Cloud",
        value: "gcp",
        label: "Google Cloud",
      },
    ],
    multiple: true,
    placeholder: "Search languages...",
  },
}

export const CustomStyled = {
  name: "Custom Styled (base-select)",
  args: {
    label: "Shipping Method",
    options: [
      { value: "standard", label: "Standard (5-7 days)" },
      { value: "express", label: "Express (2-3 days)" },
      { value: "overnight", label: "Overnight" },
    ],
    placeholder: "Choose shipping...",
  },
  parameters: {
    docs: {
      description: {
        story: "In Chrome 135+ and Edge 135+, the select uses `appearance: base-select` for a customizable picker with styled options, arrow icon, and checkmark. In unsupported browsers, it falls back to the standard OS dropdown.",
      },
    },
  },
}

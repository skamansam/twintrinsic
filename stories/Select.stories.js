import Select from "$lib/components/Form/Select.svelte"

export default {
  title: "Components/Form/Select",
  component: Select,
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
}

export const WithValue = {
  args: {
    label: "Country",
    options: countries,
    value: "us",
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
}

export const Disabled = {
  args: {
    label: "Country",
    options: countries,
    value: "us",
    disabled: true,
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

import Calendar from "$lib/components/Form/Calendar.svelte"

export default {
  title: "Components/Form/Calendar",
  component: Calendar,
  argTypes: {
    value: { control: "date" },
    range: { control: "boolean" },
    minDate: { control: "date" },
    maxDate: { control: "date" },
    showWeekNumbers: { control: "boolean" },
    dayNames: { control: "array" },
    monthNames: { control: "array" },
    label: { control: "text" },
    format: { control: "text" },
    disabled: { control: "boolean" },
  },
}

export const Default = {
  args: {
    label: "Select Date",
  },
}

export const WithValue = {
  args: {
    label: "Date",
    value: new Date("2025-04-07"),
  },
}

export const DateRange = {
  args: {
    label: "Date Range",
    range: true,
    value: [new Date("2025-04-07"), new Date("2025-04-14")],
  },
}

export const WithMinMax = {
  args: {
    label: "Date",
    minDate: new Date("2025-04-01"),
    maxDate: new Date("2025-04-30"),
  },
}

export const WithWeekNumbers = {
  args: {
    label: "Date",
    showWeekNumbers: true,
  },
}

export const CustomDayNames = {
  args: {
    label: "Date",
    dayNames: ["S", "M", "T", "W", "T", "F", "S"],
  },
}

export const CustomMonthNames = {
  args: {
    label: "Date",
    monthNames: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
  },
}

export const CustomFormat = {
  args: {
    label: "Date",
    format: "dd/MM/yyyy",
  },
}

export const Disabled = {
  args: {
    label: "Date",
    disabled: true,
    value: new Date("2025-04-07"),
  },
}

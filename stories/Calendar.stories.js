import { expect } from "storybook/test";
import Calendar from "$lib/components/Form/Calendar.svelte";

export default {
  title: "Form/Calendar",
  component: Calendar,
  tags: ["autodocs"],
  argTypes: {
    value: { control: "date" },
    minDate: { control: "date" },
    maxDate: { control: "date" },
    label: { control: "text" },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
  },
};

export const Default = {
  args: {
    label: "Select Date",
  },
  play: async ({ canvas }) => {
    // input[type="date"] exposes no textbox role in Chromium, so query by label
    const input = canvas.getByLabelText("Select Date");
    await expect(input).toBeInTheDocument();
    await expect(input).toHaveAttribute("type", "date");
  },
};

export const WithValue = {
  args: {
    label: "Date",
    value: new Date("2026-04-07"),
  },
};

export const WithMinMax = {
  args: {
    label: "Date",
    minDate: new Date("2026-04-01"),
    maxDate: new Date("2026-04-30"),
  },
};

export const Disabled = {
  args: {
    label: "Date",
    disabled: true,
    value: new Date("2026-04-07"),
  },
  play: async ({ canvas }) => {
    const input = canvas.getByLabelText("Date");
    await expect(input).toBeDisabled();
  },
};

export const Required = {
  args: {
    label: "Birthday",
    required: true,
  },
};

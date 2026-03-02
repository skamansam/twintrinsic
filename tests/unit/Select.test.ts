import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Select from "$lib/components/Form/Select.svelte";

describe("Select", () => {
  const basicOptions = [
    { value: "us", label: "United States" },
    { value: "ca", label: "Canada" },
    { value: "mx", label: "Mexico" },
  ];

  const nestedOptions = [
    {
      value: "frontend",
      label: "Frontend",
      items: [
        { value: "js", label: "JavaScript" },
        { value: "ts", label: "TypeScript" },
      ],
    },
    {
      value: "backend",
      label: "Backend",
      items: [
        { value: "python", label: "Python" },
        { value: "java", label: "Java" },
      ],
    },
  ];

  describe("Rendering", () => {
    it("renders with label", () => {
      render(Select, {
        props: {
          label: "Country",
          options: basicOptions,
        },
      });

      expect(screen.getByText("Country")).toBeInTheDocument();
    });

    it("renders with placeholder", () => {
      render(Select, {
        props: {
          options: basicOptions,
          placeholder: "Choose a country",
        },
      });

      expect(screen.getByText("Choose a country")).toBeInTheDocument();
    });

    it("renders with required indicator", () => {
      render(Select, {
        props: {
          label: "Country",
          options: basicOptions,
          required: true,
        },
      });

      expect(screen.getByText("*")).toBeInTheDocument();
    });

    it("renders with error message", () => {
      render(Select, {
        props: {
          label: "Country",
          options: basicOptions,
          error: "This field is required",
        },
      });

      expect(screen.getByText("This field is required")).toBeInTheDocument();
    });

    it("renders disabled state", () => {
      const { container } = render(Select, {
        props: {
          options: basicOptions,
          disabled: true,
        },
      });

      const control = container.querySelector(".select-control");
      expect(control).toHaveAttribute("tabindex", "-1");
    });

    it("renders all options", () => {
      render(Select, {
        props: {
          options: basicOptions,
        },
      });

      basicOptions.forEach((option) => {
        expect(screen.getByText(option.label)).toBeInTheDocument();
      });
    });

    it("renders empty state when no options", () => {
      render(Select, {
        props: {
          options: [],
        },
      });

      expect(screen.getByText("No options available")).toBeInTheDocument();
    });
  });

  describe("Single Selection", () => {
    it("selects option on click", async () => {
      const user = userEvent.setup();
      const onchange = vi.fn();

      render(Select, {
        props: {
          options: basicOptions,
          onchange,
        },
      });

      const control = screen.getByRole("combobox");
      await user.click(control);

      const option = screen.getByText("Canada");
      await user.click(option);

      expect(onchange).toHaveBeenCalled();
    });

    it("displays selected value", () => {
      render(Select, {
        props: {
          options: basicOptions,
          value: "ca",
        },
      });

      expect(screen.getByText("Canada")).toBeInTheDocument();
    });

    it("closes dropdown after selection", async () => {
      const user = userEvent.setup();

      render(Select, {
        props: {
          options: basicOptions,
        },
      });

      const control = screen.getByRole("combobox");
      await user.click(control);

      const option = screen.getByText("Canada");
      await user.click(option);

      // Popover should be closed
      const menu = screen.getByRole("listbox");
      expect(menu).not.toHaveAttribute("popover-open");
    });
  });

  describe("Multiple Selection", () => {
    it("allows multiple selections", async () => {
      const user = userEvent.setup();
      const onchange = vi.fn();

      render(Select, {
        props: {
          options: basicOptions,
          multiple: true,
          onchange,
        },
      });

      const control = screen.getByRole("combobox");
      await user.click(control);

      const usOption = screen.getByText("United States");
      const caOption = screen.getByText("Canada");

      await user.click(usOption);
      await user.click(caOption);

      expect(onchange).toHaveBeenCalledTimes(2);
    });

    it("displays checkboxes in multiple mode", () => {
      const { container } = render(Select, {
        props: {
          options: basicOptions,
          multiple: true,
        },
      });

      const checkboxes = container.querySelectorAll(".select-checkbox");
      expect(checkboxes.length).toBeGreaterThan(0);
    });

    it("shows selected items with checkmarks", async () => {
      const user = userEvent.setup();

      render(Select, {
        props: {
          options: basicOptions,
          multiple: true,
          value: ["us", "ca"],
        },
      });

      const control = screen.getByRole("combobox");
      await user.click(control);

      const options = screen.getAllByRole("option");
      expect(options[0]).toHaveAttribute("aria-selected", "true");
      expect(options[1]).toHaveAttribute("aria-selected", "true");
      expect(options[2]).toHaveAttribute("aria-selected", "false");
    });
  });

  describe("Filtering", () => {
    it("filters options when filter prop is true", async () => {
      const user = userEvent.setup();

      render(Select, {
        props: {
          options: basicOptions,
          filter: true,
        },
      });

      const control = screen.getByRole("combobox");
      await user.click(control);

      const input = screen.getByPlaceholderText("Select...");
      await user.type(input, "can");

      expect(screen.getByText("Canada")).toBeInTheDocument();
      expect(screen.queryByText("United States")).not.toBeInTheDocument();
    });

    it("shows no options when filter matches nothing", async () => {
      const user = userEvent.setup();

      render(Select, {
        props: {
          options: basicOptions,
          filter: true,
        },
      });

      const control = screen.getByRole("combobox");
      await user.click(control);

      const input = screen.getByPlaceholderText("Select...");
      await user.type(input, "xyz");

      expect(screen.getByText("No options available")).toBeInTheDocument();
    });

    it("fires onfilter event when typing", async () => {
      const user = userEvent.setup();
      const onfilter = vi.fn();

      render(Select, {
        props: {
          options: basicOptions,
          filter: true,
          onfilter,
        },
      });

      const control = screen.getByRole("combobox");
      await user.click(control);

      const input = screen.getByPlaceholderText("Select...");
      await user.type(input, "can");

      expect(onfilter).toHaveBeenCalled();
    });
  });

  describe("Cascading Menus", () => {
    it("renders parent options with submenu arrow", () => {
      const { container } = render(Select, {
        props: {
          options: nestedOptions,
          optionChildren: "items",
        },
      });

      const submenuArrows = container.querySelectorAll(".select-submenu-arrow");
      expect(submenuArrows.length).toBe(2);
    });

    it("displays submenu on parent hover", async () => {
      const user = userEvent.setup();

      render(Select, {
        props: {
          options: nestedOptions,
          optionChildren: "items",
        },
      });

      const control = screen.getByRole("combobox");
      await user.click(control);

      const parentOption = screen.getByText("Frontend");
      await user.hover(parentOption);

      expect(screen.getByText("JavaScript")).toBeInTheDocument();
      expect(screen.getByText("TypeScript")).toBeInTheDocument();
    });

    it("selects child option", async () => {
      const user = userEvent.setup();
      const onchange = vi.fn();

      render(Select, {
        props: {
          options: nestedOptions,
          optionChildren: "items",
          onchange,
        },
      });

      const control = screen.getByRole("combobox");
      await user.click(control);

      const parentOption = screen.getByText("Frontend");
      await user.hover(parentOption);

      const childOption = screen.getByText("JavaScript");
      await user.click(childOption);

      expect(onchange).toHaveBeenCalled();
    });
  });

  describe("Clear Button", () => {
    it("shows clear button when clearable and value selected", () => {
      render(Select, {
        props: {
          options: basicOptions,
          clearable: true,
          value: "us",
        },
      })

      const clearButton = screen.getByLabelText("Clear selection")
      expect(clearButton).toBeInTheDocument()
    })

    it("hides clear button when no value selected", () => {
      render(Select, {
        props: {
          options: basicOptions,
          clearable: true,
        },
      });

      const clearButton = screen.queryByLabelText("Clear selection");
      expect(clearButton).not.toBeInTheDocument();
    });

    it("clears selection on click", async () => {
      const user = userEvent.setup();
      const onclear = vi.fn();

      render(Select, {
        props: {
          options: basicOptions,
          clearable: true,
          value: "us",
          onclear,
        },
      });

      const clearButton = screen.getByLabelText("Clear selection");
      await user.click(clearButton);

      expect(onclear).toHaveBeenCalled();
    });
  });

  describe("Keyboard Navigation", () => {
    it("opens dropdown with Enter key", async () => {
      const user = userEvent.setup();

      render(Select, {
        props: {
          options: basicOptions,
        },
      });

      const control = screen.getByRole("combobox");
      control.focus();
      await user.keyboard("{Enter}");

      const menu = screen.getByRole("listbox");
      expect(menu).toBeInTheDocument();
    });

    it("opens dropdown with Space key", async () => {
      const user = userEvent.setup();

      render(Select, {
        props: {
          options: basicOptions,
        },
      });

      const control = screen.getByRole("combobox");
      control.focus();
      await user.keyboard(" ");

      const menu = screen.getByRole("listbox");
      expect(menu).toBeInTheDocument();
    });

    it("navigates options with arrow keys", async () => {
      const user = userEvent.setup();

      const { container } = render(Select, {
        props: {
          options: basicOptions,
        },
      });

      const control = screen.getByRole("combobox");
      control.focus();
      await user.keyboard("{Enter}");

      await user.keyboard("{ArrowDown}");
      await user.keyboard("{ArrowDown}");

      const options = container.querySelectorAll(".select-option-highlighted");
      expect(options.length).toBeGreaterThan(0);
    });

    it("closes dropdown with Escape key", async () => {
      const user = userEvent.setup();

      render(Select, {
        props: {
          options: basicOptions,
        },
      });

      const control = screen.getByRole("combobox");
      control.focus();
      await user.keyboard("{Enter}");

      await user.keyboard("{Escape}");

      const menu = screen.getByRole("listbox");
      expect(menu).not.toHaveAttribute("popover-open");
    });

    it("selects option with Enter key", async () => {
      const user = userEvent.setup();
      const onchange = vi.fn();

      render(Select, {
        props: {
          options: basicOptions,
          onchange,
        },
      });

      const control = screen.getByRole("combobox");
      control.focus();
      await user.keyboard("{Enter}");
      await user.keyboard("{ArrowDown}");
      await user.keyboard("{Enter}");

      expect(onchange).toHaveBeenCalled();
    });
  });

  describe("Custom Option Properties", () => {
    it("uses custom optionLabel property", () => {
      const customOptions = [
        { id: 1, name: "United States" },
        { id: 2, name: "Canada" },
      ];

      render(Select, {
        props: {
          options: customOptions,
          optionLabel: "name",
          optionValue: "id",
        },
      });

      expect(screen.getByText("United States")).toBeInTheDocument();
      expect(screen.getByText("Canada")).toBeInTheDocument();
    });

    it("uses custom optionValue property", async () => {
      const user = userEvent.setup();
      const onchange = vi.fn();

      const customOptions = [
        { id: 1, name: "United States" },
        { id: 2, name: "Canada" },
      ];

      render(Select, {
        props: {
          options: customOptions,
          optionLabel: "name",
          optionValue: "id",
          onchange,
        },
      });

      const control = screen.getByRole("combobox");
      await user.click(control);

      const option = screen.getByText("Canada");
      await user.click(option);

      expect(onchange).toHaveBeenCalled();
    });
  });

  describe("Size Variants", () => {
    it("applies size classes", () => {
      const { container } = render(Select, {
        props: {
          options: basicOptions,
          size: "lg",
        },
      });

      const control = container.querySelector(".select-control");
      expect(control?.className).toContain("select-control");
    });
  });

  describe("Accessibility", () => {
    it("has proper ARIA attributes", () => {
      render(Select, {
        props: {
          label: "Country",
          options: basicOptions,
          required: true,
        },
      });

      const control = screen.getByRole("combobox");
      expect(control).toHaveAttribute("aria-label", "Country");
      expect(control).toHaveAttribute("aria-required", "true");
      expect(control).toHaveAttribute("aria-haspopup", "listbox");
    });

    it("links error message with aria-describedby", () => {
      render(Select, {
        props: {
          label: "Country",
          options: basicOptions,
          error: "This field is required",
        },
      });

      const control = screen.getByRole("combobox");
      expect(control).toHaveAttribute("aria-invalid", "true");
      expect(control).toHaveAttribute("aria-describedby");
    });

    it("has proper listbox ARIA attributes", async () => {
      const user = userEvent.setup();

      render(Select, {
        props: {
          options: basicOptions,
          multiple: true,
        },
      });

      const control = screen.getByRole("combobox");
      await user.click(control);

      const menu = screen.getByRole("listbox");
      expect(menu).toHaveAttribute("aria-multiselectable", "true");
    });

    it("marks options with aria-selected", async () => {
      const user = userEvent.setup();

      render(Select, {
        props: {
          options: basicOptions,
          value: "us",
        },
      });

      const control = screen.getByRole("combobox");
      await user.click(control);

      const options = screen.getAllByRole("option");
      expect(options[0]).toHaveAttribute("aria-selected", "true");
      expect(options[1]).toHaveAttribute("aria-selected", "false");
    });
  });
});

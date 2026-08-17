import { render, screen } from "@testing-library/svelte";
import { describe, expect, it, vi } from "vitest";
import Dropdown from "$lib/components/Form/Dropdown.svelte";

/**
 * Find an <option> inside a <select> by its value attribute.
 * (jsdom's `HTMLOptionsCollection.namedItem` matches id/name, not value,
 * so iterate the options directly.)
 */
function optionByValue(select: HTMLSelectElement, value: string): HTMLOptionElement | undefined {
  return Array.from(select.options).find((option) => option.value === value);
}

/**
 * Dropdown is the legacy wrapper around Select. Its defining behavior is the
 * string-option normalization: plain string arrays (e.g. `["Apple", "Banana"]`)
 * must be converted into the `{ label, value }` shape Select expects, so the
 * native `<option>` elements render with visible text instead of being blank.
 */
describe("Dropdown (legacy Select wrapper)", () => {
  describe("String-option normalization", () => {
    it("renders string options as <option> elements with text", () => {
      render(Dropdown, {
        props: { options: ["Apple", "Banana", "Cherry"] },
      });
      const select = screen.getByRole("combobox") as HTMLSelectElement;
      const optionTexts = Array.from(select.options, (option) => option.textContent);
      expect(optionTexts).toEqual(["Select an option", "Apple", "Banana", "Cherry"]);
    });

    it("uses the string as both the option label and value", () => {
      render(Dropdown, {
        props: { options: ["Apple", "Banana"] },
      });
      const select = screen.getByRole("combobox") as HTMLSelectElement;
      const apple = optionByValue(select, "Apple");
      expect(apple?.textContent).toBe("Apple");
      expect(apple?.value).toBe("Apple");
    });

    it("passes object options through unchanged", () => {
      const objectOptions = [
        { label: "United States", value: "us" },
        { label: "Canada", value: "ca" },
      ];
      render(Dropdown, {
        props: { options: objectOptions },
      });
      const select = screen.getByRole("combobox") as HTMLSelectElement;
      expect(optionByValue(select, "us")?.textContent).toBe("United States");
    });

    it("handles a mixed array of strings and objects", () => {
      render(Dropdown, {
        props: {
          options: ["Plain", { label: "Object", value: "obj" }],
        },
      });
      const select = screen.getByRole("combobox") as HTMLSelectElement;
      expect(optionByValue(select, "Plain")?.textContent).toBe("Plain");
      expect(optionByValue(select, "obj")?.textContent).toBe("Object");
    });

    it("renders no options when the array is empty", () => {
      render(Dropdown, {
        props: { options: [] },
      });
      const select = screen.getByRole("combobox") as HTMLSelectElement;
      // Just the placeholder option.
      expect(select.options.length).toBe(1);
    });
  });

  describe("Legacy wrapper behavior", () => {
    it("shows the custom placeholder as the first option", () => {
      render(Dropdown, {
        props: { options: ["A"], placeholder: "Pick one" },
      });
      const select = screen.getByRole("combobox") as HTMLSelectElement;
      expect(select.options[0]?.textContent).toBe("Pick one");
    });

    it("renders nested options as optgroups via optionChildren", () => {
      const categories = [
        {
          label: "Frontend",
          value: "frontend",
          children: [
            { label: "HTML", value: "html" },
            { label: "CSS", value: "css" },
          ],
        },
      ];
      const { container } = render(Dropdown, {
        props: { options: categories, optionChildren: "children" },
      });
      const optgroup = container.querySelector("optgroup");
      expect(optgroup?.getAttribute("label")).toBe("Frontend");
      expect(optgroup?.querySelectorAll("option").length).toBe(2);
    });

    it("fires onchange with the selected value", async () => {
      const onchange = vi.fn();
      render(Dropdown, {
        props: { options: ["Apple", "Banana"], onchange },
      });
      const select = screen.getByRole("combobox") as HTMLSelectElement;
      select.value = "Banana";
      select.dispatchEvent(new Event("change", { bubbles: true }));
      expect(onchange).toHaveBeenCalled();
      const call = onchange.mock.calls[0]?.[0] as CustomEvent;
      expect(call.detail).toEqual({ value: "Banana" });
    });

    it("applies the disabled state to the native select", () => {
      render(Dropdown, {
        props: { options: ["Apple"], disabled: true },
      });
      expect(screen.getByRole("combobox")).toBeDisabled();
    });

    it("forwards ariaLabel as the select's accessible name", () => {
      render(Dropdown, {
        props: { options: ["Apple"], ariaLabel: "Fruit picker" },
      });
      expect(screen.getByRole("combobox")).toHaveAccessibleName("Fruit picker");
    });
  });
});

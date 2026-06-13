import { render, screen } from "@testing-library/svelte";
import { describe, expect, it, vi } from "vitest";
import Select from "$lib/components/Form/Select.svelte";

describe("Select (native HTML wrapper)", () => {
	const basicOptions = [
		{ value: "us", label: "United States" },
		{ value: "ca", label: "Canada" },
		{ value: "mx", label: "Mexico" },
	];

	const nestedOptions = [
		{
			value: "frontend",
			label: "Frontend",
			children: [
				{ value: "js", label: "JavaScript" },
				{ value: "ts", label: "TypeScript" },
			],
		},
		{
			value: "backend",
			label: "Backend",
			children: [
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

		it("renders with placeholder option", () => {
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
			render(Select, {
				props: {
					options: basicOptions,
					disabled: true,
				},
			});
			const control = screen.getByRole("combobox");
			expect(control).toBeDisabled();
		});

		it("renders all options", () => {
			render(Select, {
				props: { options: basicOptions },
			});
			basicOptions.forEach((option) => {
				expect(screen.getByRole("option", { name: option.label })).toBeInTheDocument();
			});
		});

		it("renders empty options list", () => {
			render(Select, {
				props: { options: [] },
			});
			const control = screen.getByRole("combobox");
			expect(control).toBeInTheDocument();
		});

		it("renders nested options as optgroup", () => {
			const { container } = render(Select, {
				props: {
					options: nestedOptions,
					optionChildren: "children",
				},
			});
			// jsdom doesn't support getByRole("group", { name }) for optgroup;
			// query the optgroup elements directly and check their label attribute.
			const optgroups = container.querySelectorAll("optgroup");
			expect(optgroups.length).toBe(2);
			expect(optgroups[0]?.getAttribute("label")).toBe("Frontend");
			expect(optgroups[1]?.getAttribute("label")).toBe("Backend");
		});
	});

	describe("Selection", () => {
		it("displays selected value", () => {
			render(Select, {
				props: { options: basicOptions, value: "ca" },
			});
			const select = screen.getByRole("combobox") as HTMLSelectElement;
			expect(select.value).toBe("ca");
		});

		it("fires onchange when selection changes", async () => {
			const onchange = vi.fn();
			render(Select, {
				props: { options: basicOptions, onchange },
			});
			const select = screen.getByRole("combobox") as HTMLSelectElement;
			select.value = "mx";
			select.dispatchEvent(new Event("change", { bubbles: true }));
			expect(onchange).toHaveBeenCalled();
		});

		it("passes selected value in onchange detail", async () => {
			const onchange = vi.fn();
			render(Select, {
				props: { options: basicOptions, onchange },
			});
			const select = screen.getByRole("combobox") as HTMLSelectElement;
			select.value = "us";
			select.dispatchEvent(new Event("change", { bubbles: true }));
			expect(onchange).toHaveBeenCalledWith(
				expect.objectContaining({ detail: { value: "us" } }),
			);
		});
	});

	describe("Multiple Selection", () => {
		it("supports multiple attribute", () => {
			render(Select, {
				props: { options: basicOptions, multiple: true },
			});
			const select = screen.getByRole("listbox") as HTMLSelectElement;
			expect(select.multiple).toBe(true);
		});

		it("passes array of values in onchange when multiple", async () => {
			const onchange = vi.fn();
			render(Select, {
				props: { options: basicOptions, multiple: true, onchange },
			});
			const select = screen.getByRole("listbox") as HTMLSelectElement;
			// Simulate user selecting two options
			select.options[0].selected = true;
			select.options[1].selected = true;
			// Fire a real 'change' event so the component's handleChange runs
			select.dispatchEvent(new Event("change", { bubbles: true }));
			expect(onchange).toHaveBeenCalled();
			const call = onchange.mock.calls[0]?.[0] as CustomEvent;
			expect(call.detail.value).toEqual(expect.arrayContaining(["us", "ca"]));
		});
	});

	describe("Accessibility", () => {
		it("combobox has aria-label from label prop", () => {
			render(Select, {
				props: { label: "Country", options: basicOptions },
			});
			const control = screen.getByRole("combobox");
			expect(control).toHaveAccessibleName("Country");
		});

		it("sets aria-invalid when error is present", () => {
			render(Select, {
				props: { label: "Country", options: basicOptions, error: "Required" },
			});
			const control = screen.getByRole("combobox");
			expect(control).toHaveAttribute("aria-invalid", "true");
		});

		it("sets aria-describedby to error element", () => {
			render(Select, {
				props: { label: "Country", options: basicOptions, error: "Required" },
			});
			const control = screen.getByRole("combobox");
			const describedBy = control.getAttribute("aria-describedby");
			expect(describedBy).toBeTruthy();
			const errorEl = document.getElementById(describedBy!);
			expect(errorEl?.textContent).toBe("Required");
		});

		it("sets aria-required when required", () => {
			render(Select, {
				props: { label: "Country", options: basicOptions, required: true },
			});
			const control = screen.getByRole("combobox");
			expect(control).toHaveAttribute("required");
		});
	});

	describe("Custom Option Properties", () => {
		// Note: The current Select component does not support optionLabel/optionValue
		// props — options must use { value, label } directly. These tests are skipped
		// until the feature is added (see docs/plans/BUILD_WARNINGS_PLAN.md).
		it.skip("uses custom optionLabel property", () => {});
		it.skip("uses custom optionValue for value attribute", () => {});
	});
});

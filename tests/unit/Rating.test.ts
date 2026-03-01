import { fireEvent, render, screen } from "@testing-library/svelte";
import { describe, expect, it, vi } from "vitest";
import Rating from "../../src/lib/components/Form/Rating.svelte";

describe("Rating", () => {
  // Basic rendering
  it("renders rating element", () => {
    const { container } = render(Rating);
    expect(container.firstChild).toBeTruthy();
  });

  it("renders with default value", () => {
    const { container } = render(Rating, {
      props: { value: 0 },
    });
    expect(container.firstChild).toBeTruthy();
  });

  // Value binding
  it("displays the current value", () => {
    const { container } = render(Rating, {
      props: { value: 3, max: 5 },
    });
    const buttons = container.querySelectorAll(".rating-item");
    expect(buttons.length).toBe(5);
  });

  it("updates when value prop changes", async () => {
    const { component, container } = render(Rating, {
      props: { value: 2, max: 5 },
    });
    expect(container.querySelectorAll(".rating-item-filled").length).toBe(2);

    await component.$set({ value: 4 });
    expect(container.querySelectorAll(".rating-item-filled").length).toBe(4);
  });

  // Min/Max constraints
  it("respects min and max values", () => {
    const { container } = render(Rating, {
      props: { min: 1, max: 10, step: 1 },
    });
    const buttons = container.querySelectorAll(".rating-item");
    expect(buttons.length).toBe(10);
  });

  it("generates correct number of items based on min, max, and step", () => {
    const { container } = render(Rating, {
      props: { min: 0, max: 5, step: 0.5 },
    });
    const buttons = container.querySelectorAll(".rating-item");
    expect(buttons.length).toBe(11); // 0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5
  });

  // Step control (replaces precision)
  it("respects step prop", () => {
    const { container } = render(Rating, {
      props: { min: 0, max: 5, step: 1 },
    });
    const buttons = container.querySelectorAll(".rating-item");
    expect(buttons.length).toBe(5);
  });

  it("generates items with 0.5 step", () => {
    const { container } = render(Rating, {
      props: { min: 0, max: 2, step: 0.5 },
    });
    const buttons = container.querySelectorAll(".rating-item");
    expect(buttons.length).toBe(5); // 0, 0.5, 1, 1.5, 2
  });

  // Step control
  it("respects step prop", () => {
    const { container } = render(Rating, {
      props: { min: 0, max: 5, step: 1 },
    });
    const buttons = container.querySelectorAll(".rating-item");
    expect(buttons.length).toBe(5);
  });

  it("generates items with 0.5 step", () => {
    const { container } = render(Rating, {
      props: { min: 0, max: 2, step: 0.5 },
    });
    const buttons = container.querySelectorAll(".rating-item");
    expect(buttons.length).toBe(5); // 0, 0.5, 1, 1.5, 2
  });

  // Visual customization - Size
  it("applies size classes", () => {
    const { container } = render(Rating, {
      props: { size: "lg" },
    });
    const rating = container.querySelector(".rating");
    expect(rating?.className).toContain("text-lg");
  });

  it("supports different sizes", () => {
    const sizes = ["sm", "md", "lg"];
    sizes.forEach((size) => {
      const { container } = render(Rating, {
        props: { size },
      });
      const rating = container.querySelector(".rating");
      expect(rating).toBeTruthy();
    });
  });

  // Visual customization - Variant
  it("applies variant classes", () => {
    const { container } = render(Rating, {
      props: { variant: "primary" },
    });
    const items = container.querySelectorAll(".rating-item");
    expect(items[0]?.className).toContain("text-primary-500");
  });

  it("supports different variants", () => {
    const variants = ["default", "primary", "secondary", "success", "warning", "error", "info"];
    variants.forEach((variant) => {
      const { container } = render(Rating, {
        props: { variant },
      });
      expect(container.querySelector(".rating")).toBeTruthy();
    });
  });

  // Custom icons
  it("renders custom filled icon", () => {
    const customIcon = '<svg class="custom-icon">test</svg>';
    const { container } = render(Rating, {
      props: { value: 1, max: 1, icon: customIcon },
    });
    expect(container.innerHTML).toContain("custom-icon");
  });

  it("renders custom empty icon", () => {
    const customEmptyIcon = '<svg class="custom-empty">test</svg>';
    const { container } = render(Rating, {
      props: { value: 0, max: 1, emptyIcon: customEmptyIcon },
    });
    expect(container.innerHTML).toContain("custom-empty");
  });

  // Interactive modes
  it("disables interaction when readonly", () => {
    const { container } = render(Rating, {
      props: { readonly: true, value: 0, max: 5 },
    });
    const buttons = container.querySelectorAll(".rating-item");
    buttons.forEach((btn) => {
      expect((btn as HTMLButtonElement).disabled).toBe(true);
    });
  });

  it("sets readonly on hidden input", () => {
    const { container } = render(Rating, {
      props: { readonly: true },
    });
    const input = container.querySelector('input[type="number"]') as HTMLInputElement;
    expect(input.readOnly).toBe(true);
  });

  it("disables interaction when disabled", () => {
    const { container } = render(Rating, {
      props: { disabled: true, value: 0, max: 5 },
    });
    const buttons = container.querySelectorAll(".rating-item");
    buttons.forEach((btn) => {
      expect((btn as HTMLButtonElement).disabled).toBe(true);
    });
  });

  it("applies disabled class when disabled", () => {
    const { container } = render(Rating, {
      props: { disabled: true },
    });
    const rating = container.querySelector(".rating");
    expect(rating?.className).toContain("rating-disabled");
  });

  it("sets disabled on hidden input", () => {
    const { container } = render(Rating, {
      props: { disabled: true },
    });
    const input = container.querySelector('input[type="number"]') as HTMLInputElement;
    expect(input.disabled).toBe(true);
  });

  // Hover preview
  it("disables hover preview when showPreview is false", () => {
    const { container } = render(Rating, {
      props: { showPreview: false, value: 0, max: 5 },
    });
    expect(container.querySelector(".rating")).toBeTruthy();
  });

  it("enables hover preview when showPreview is true", () => {
    const { container } = render(Rating, {
      props: { showPreview: true, value: 0, max: 5 },
    });
    expect(container.querySelector(".rating")).toBeTruthy();
  });

  // Placeholder
  it("sets placeholder on hidden input", () => {
    const { container } = render(Rating, {
      props: { placeholder: "Rate this item" },
    });
    const input = container.querySelector('input[type="number"]') as HTMLInputElement;
    expect(input.placeholder).toBe("Rate this item");
  });

  // Numeric display
  it("shows numeric value when showValue is true", () => {
    const { container } = render(Rating, {
      props: { value: 3, showValue: true },
    });
    const valueSpan = container.querySelector(".rating-value");
    expect(valueSpan?.textContent).toBe("3");
  });

  it("hides numeric value when showValue is false", () => {
    const { container } = render(Rating, {
      props: { value: 3, showValue: false },
    });
    const valueSpan = container.querySelector(".rating-value");
    expect(valueSpan).toBeFalsy();
  });

  // Form integration
  it("includes hidden number input for form submission", () => {
    const { container } = render(Rating, {
      props: { value: 3, name: "rating" },
    });
    const input = container.querySelector('input[type="number"]');
    expect(input).toBeTruthy();
    expect((input as HTMLInputElement)?.name).toBe("rating");
  });

  it("syncs value to hidden input", () => {
    const { container } = render(Rating, {
      props: { value: 4, name: "rating" },
    });
    const input = container.querySelector('input[type="number"]') as HTMLInputElement;
    expect(input.value).toBe("4");
  });

  it("sets min/max/step on hidden input", () => {
    const { container } = render(Rating, {
      props: { min: 1, max: 10, step: 0.5 },
    });
    const input = container.querySelector('input[type="number"]') as HTMLInputElement;
    expect(input.min).toBe("1");
    expect(input.max).toBe("10");
    expect(input.step).toBe("0.5");
  });

  // Accessibility
  it("has proper ARIA attributes", () => {
    const { container } = render(Rating, {
      props: { value: 3, max: 5, ariaLabel: "Product Rating" },
    });
    const rating = container.querySelector(".rating");
    expect(rating?.getAttribute("aria-label")).toBe("Product Rating");
    expect(rating?.getAttribute("role")).toBe("slider");
  });

  it("updates ARIA valuenow", async () => {
    const { component, container } = render(Rating, {
      props: { value: 2, max: 5 },
    });
    const rating = container.querySelector(".rating");
    expect(rating?.getAttribute("aria-valuenow")).toBe("2");

    await component.$set({ value: 4 });
    expect(rating?.getAttribute("aria-valuenow")).toBe("4");
  });

  it("sets aria-valuemin and aria-valuemax", () => {
    const { container } = render(Rating, {
      props: { min: 1, max: 10 },
    });
    const rating = container.querySelector(".rating");
    expect(rating?.getAttribute("aria-valuemin")).toBe("1");
    expect(rating?.getAttribute("aria-valuemax")).toBe("10");
  });

  // Events
  it("fires onchange callback when value changes", async () => {
    const onChange = vi.fn();
    const { container } = render(Rating, {
      props: { value: 0, max: 5, onchange: onChange },
    });
    const input = container.querySelector('input[type="number"]') as HTMLInputElement;
    input.value = "3";
    await fireEvent.change(input);
    expect(onChange).toHaveBeenCalled();
  });

  it("passes correct value in onchange event", async () => {
    const onChange = vi.fn();
    const { container } = render(Rating, {
      props: { value: 0, max: 5, onchange: onChange },
    });
    const input = container.querySelector('input[type="number"]') as HTMLInputElement;
    input.value = "3";
    await fireEvent.change(input);
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: expect.objectContaining({ value: 3 }),
      }),
    );
  });

  // CSS classes
  it("applies custom className prop", () => {
    const { container } = render(Rating, {
      props: { class: "custom-class" },
    });
    const rating = container.querySelector(".rating");
    expect(rating?.className).toContain("custom-class");
  });

  // Edge cases
  it("handles zero value", () => {
    const { container } = render(Rating, {
      props: { value: 0, max: 5 },
    });
    expect(container.querySelectorAll(".rating-item-filled").length).toBe(0);
  });

  it("handles max value", () => {
    const { container } = render(Rating, {
      props: { value: 5, max: 5 },
    });
    expect(container.querySelectorAll(".rating-item-filled").length).toBe(5);
  });

  it("handles min value greater than zero", () => {
    const { container } = render(Rating, {
      props: { value: 1, min: 1, max: 10 },
    });
    const buttons = container.querySelectorAll(".rating-item");
    expect(buttons.length).toBe(10);
  });
});

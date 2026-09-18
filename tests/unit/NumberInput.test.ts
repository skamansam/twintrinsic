import { fireEvent, render } from "@testing-library/svelte";
import { describe, expect, it, vi } from "vitest";
import NumberInput from "../../src/lib/components/Form/NumberInput.svelte";

/**
 * NumberInput renders a text input with inputmode=decimal, optional
 * prefix/suffix, and increment/decrement buttons that clamp to min/max.
 * Callbacks use Svelte-5 callback props (onchange/oninput) carrying
 * { value } in the CustomEvent detail.
 */
describe("NumberInput", () => {
  it("renders with the aria label derived from name and shows the initial value", () => {
    const { getByRole } = render(NumberInput, { props: { name: "quantity", value: 5 } });

    const input = getByRole("textbox", { name: "quantity" });
    expect(input).toHaveValue("5");
    expect(input).toHaveAttribute("inputmode", "decimal");
  });

  it("increments and decrements via the buttons, clamping to min/max", async () => {
    const { getByRole } = render(NumberInput, { props: { name: "qty", value: 1, min: 0, max: 2 } });
    const input = getByRole("textbox", { name: "qty" });
    const increment = getByRole("button", { name: "Increase value" });
    const decrement = getByRole("button", { name: "Decrease value" });

    await fireEvent.click(increment);
    await fireEvent.click(increment);
    expect(input).toHaveValue("2");
    // At max the increment button is disabled
    expect(increment).toBeDisabled();

    await fireEvent.click(decrement);
    expect(input).toHaveValue("1");

    await fireEvent.click(decrement);
    await fireEvent.click(decrement);
    expect(input).toHaveValue("0");
    // At min the decrement button is disabled
    expect(decrement).toBeDisabled();
  });

  it("respects the step prop", async () => {
    const { getByRole } = render(NumberInput, { props: { name: "step", value: 10, step: 5 } });

    await fireEvent.click(getByRole("button", { name: "Increase value" }));

    expect(getByRole("textbox", { name: "step" })).toHaveValue("15");
  });

  it("formats the value with decimalPlaces on blur", async () => {
    const { getByRole } = render(NumberInput, {
      props: { name: "price", value: 0, decimalPlaces: 2 },
    });
    const input = getByRole("textbox", { name: "price" });

    await fireEvent.input(input, { target: { value: "29.9" } });
    await fireEvent.blur(input);

    expect(input).toHaveValue("29.90");
  });

  it("emits onchange with the numeric value when a button is pressed", async () => {
    const onchange = vi.fn();
    const { getByRole } = render(NumberInput, { props: { name: "cb", value: 1, onchange } });

    await fireEvent.click(getByRole("button", { name: "Increase value" }));

    expect(onchange).toHaveBeenCalledTimes(1);
    expect(onchange.mock.calls[0][0].detail).toEqual({ value: 2 });
  });

  it("emits oninput with the parsed numeric value while typing", async () => {
    const oninput = vi.fn();
    const { getByRole } = render(NumberInput, { props: { name: "type", value: 0, oninput } });
    const input = getByRole("textbox", { name: "type" });

    await fireEvent.input(input, { target: { value: "42" } });

    expect(oninput).toHaveBeenCalledTimes(1);
    expect(oninput.mock.calls[0][0].detail).toEqual({ value: 42 });
  });

  it("renders a short suffix as text and a long suffix as an icon", async () => {
    const { container, rerender } = await render(NumberInput, {
      props: { name: "s", value: 0, suffix: "%" },
    });

    expect(container.querySelector(".number-input-suffix")?.textContent?.trim()).toBe("%");

    await rerender({ name: "s", value: 0, suffix: "tabler:currency-dollar" });
    // Long suffixes are treated as icon names and rendered via the Icon
    // component — the raw name must never leak into the text content.
    expect(container.querySelector(".number-input-suffix")?.textContent?.trim()).toBe("");
  });

  it("shows the prefix text before the field", () => {
    const { container } = render(NumberInput, { props: { name: "p", value: 0, prefix: "$" } });

    expect(container.querySelector(".number-input-prefix")).toHaveTextContent("$");
  });
});

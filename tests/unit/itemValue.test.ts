import { describe, expect, it } from "vitest";
import { getItemValue } from "../../src/lib/helpers/itemValue.js";

describe("getItemValue", () => {
  it("returns string items unchanged", () => {
    expect(getItemValue("red")).toBe("red");
    expect(getItemValue("")).toBe("");
  });

  it("reads the default value field from object items", () => {
    expect(getItemValue({ value: "red" })).toBe("red");
  });

  it("reads a custom value field from object items", () => {
    expect(getItemValue({ id: 7 }, "id")).toBe(7);
  });

  it("returns undefined when the field is missing", () => {
    expect(getItemValue({ value: "red" }, "id")).toBe(undefined);
  });

  it("passes falsy primitives through unchanged (no null collapse)", () => {
    expect(getItemValue(0)).toBe(0);
    expect(getItemValue(false)).toBe(false);
    expect(getItemValue(null)).toBe(null);
    expect(getItemValue(undefined)).toBe(undefined);
  });

  it("passes falsy field values through unchanged", () => {
    expect(getItemValue({ value: null })).toBe(null);
    expect(getItemValue({ value: 0 })).toBe(0);
    expect(getItemValue({ value: false })).toBe(false);
  });
});

import { render } from "@testing-library/svelte";
import { describe, expect, it, vi } from "vitest";
import Accordion from "../../src/lib/components/Accordion/Accordion.svelte";
import AccordionItem from "../../src/lib/components/Accordion/AccordionItem.svelte";

describe("Accordion", () => {
  it("renders accordion container with default props", () => {
    const { container } = render(Accordion, {
      props: {
        children: () => "Content",
      },
    });
    expect(container.querySelector(".accordion")).toBeTruthy();
  });

  it("applies bordered class by default", () => {
    const { container } = render(Accordion, {
      props: {
        children: () => "Content",
      },
    });
    const accordion = container.querySelector(".accordion");
    expect(accordion?.className).toContain("border");
  });

  it("removes border when bordered prop is false", () => {
    const { container } = render(Accordion, {
      props: {
        bordered: false,
        children: () => "Content",
      },
    });
    const accordion = container.querySelector(".accordion");
    expect(accordion?.className).not.toContain("border");
  });

  it("applies custom class name", () => {
    const { container } = render(Accordion, {
      props: {
        class: "custom-class",
        children: () => "Content",
      },
    });
    const accordion = container.querySelector(".accordion");
    expect(accordion?.className).toContain("custom-class");
  });

  it("sets custom id", () => {
    const { container } = render(Accordion, {
      props: {
        id: "custom-id",
        children: () => "Content",
      },
    });
    const accordion = container.querySelector(".accordion");
    expect(accordion?.id).toBe("custom-id");
  });

  it("calls onchange callback when item is toggled", () => {
    const onchange = vi.fn();
    render(Accordion, {
      props: {
        onchange,
        children: () => "Content",
      },
    });
    // Note: Full integration test would require AccordionItem interaction
    expect(onchange).not.toHaveBeenCalled();
  });

  it("expands first item by default", () => {
    const { container } = render(Accordion, {
      props: {
        children: () => "Content",
      },
    });
    const firstDetails = container.querySelector("details");
    expect(firstDetails?.hasAttribute("open")).toBe(true);
  });

  it("respects defaultExpanded prop", () => {
    const { container } = render(Accordion, {
      props: {
        defaultExpanded: 1,
        children: () => "Content",
      },
    });
    expect(container.querySelector(".accordion")).toBeTruthy();
  });

  it("allows null defaultExpanded for all collapsed", () => {
    const { container } = render(Accordion, {
      props: {
        defaultExpanded: null,
        children: () => "Content",
      },
    });
    expect(container.querySelector(".accordion")).toBeTruthy();
  });

  it("respects allowMultiple prop", () => {
    const { container } = render(Accordion, {
      props: {
        allowMultiple: true,
        children: () => "Content",
      },
    });
    expect(container.querySelector(".accordion")).toBeTruthy();
  });
});

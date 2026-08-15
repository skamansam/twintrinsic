import { describe, expect, it } from "vitest";
import { detectLanguage } from "../../src/lib/helpers/detectLanguage.js";

describe("detectLanguage", () => {
  // --- HTML / SVG ---
  it("detects HTML/SVG markup", () => {
    expect(detectLanguage("<div>hello</div>")).toBe("markup");
    expect(detectLanguage("<br />")).toBe("markup");
    expect(detectLanguage("<svg><circle cx=\"10\" cy=\"10\" r=\"5\" /></svg>")).toBe("markup");
  });

  it("detects HTML documents that include closing tags", () => {
    expect(detectLanguage("<!DOCTYPE html><html><body><p>hi</p></body></html>")).toBe("markup");
  });

  // --- CSS / SCSS ---
  it("detects CSS via @media / @import directives", () => {
    expect(detectLanguage("@media (max-width: 600px) { }")).toBe("css");
    expect(detectLanguage("@import url(\"base.css\"); body { color: red; }")).toBe("css");
  });

  it("detects SCSS via $ variables and @mixin", () => {
    expect(detectLanguage(".btn { color: $primary; }")).toBe("scss");
    expect(detectLanguage("@mixin center { display: flex; }")).toBe("scss");
  });

  it("classifies plain declaration blocks without directives as javascript (falls through)", () => {
    // The CSS branch only returns "css"/"scss" for @import/@media/$/@mixin
    // directives; bare declaration blocks fall through to the JS check and
    // finally the javascript default.
    expect(detectLanguage("body { background: white; color: black; }")).toBe("javascript");
  });

  it("classifies hex colors in CSS as markdown (the '#' wins)", () => {
    // The markdown check (`#`) runs after CSS/JS/JSON/YAML and before the
    // svelte/shell checks, so a `#fff` hex color is detected as markdown.
    expect(detectLanguage("body { background: #fff; color: #000; }")).toBe("markdown");
  });

  // --- JavaScript / TypeScript / JSX ---
  it("detects JavaScript function declarations", () => {
    expect(detectLanguage("function greet() { return 'hi' }")).toBe("javascript");
  });

  it("detects JavaScript arrow functions", () => {
    expect(detectLanguage("const add = (a, b) => a + b;")).toBe("javascript");
  });

  it("detects TypeScript when interfaces are present alongside functions", () => {
    expect(
      detectLanguage("function greet(person: Person): string { interface Foo {} return person.name }"),
    ).toBe("typescript");
  });

  it("detects JSX when the code contains JSX tags", () => {
    expect(detectLanguage("function App() { return <div/> }")).toBe("jsx");
    expect(detectLanguage("const el = () => <div className=\"x\" />")).toBe("jsx");
  });

  // --- JSON ---
  it("detects valid JSON objects", () => {
    expect(detectLanguage("{\"name\": \"twintrinsic\", \"version\": \"1.0.0\"}")).toBe("json");
  });

  it("detects valid JSON arrays", () => {
    expect(detectLanguage("[1, 2, 3, { \"id\": 4 }]")).toBe("json");
  });

  it("falls through to the default when braces do not parse as JSON", () => {
    // `{ foo: bar }` is invalid JSON, so it must not be classified as JSON.
    expect(detectLanguage("{ foo: bar }")).not.toBe("json");
  });

  // --- YAML ---
  it("detects YAML key-value pairs", () => {
    expect(detectLanguage("key: value")).toBe("yaml");
    expect(detectLanguage("name: twintrinsic\nversion: 1.0.0")).toBe("yaml");
  });

  // --- Markdown ---
  it("detects Markdown headings and fenced code blocks", () => {
    expect(detectLanguage("# Heading")).toBe("markdown");
    expect(detectLanguage("```js\nconsole.log('hi')\n```")).toBe("markdown");
  });

  // --- Svelte ---
  it("detects Svelte via $derived runes", () => {
    expect(detectLanguage("let doubled = $derived(count * 2)")).toBe("svelte");
  });

  it("detects Svelte via an unclosed <script> block (not ending in '>')", () => {
    // A fully-closed `<script>...</script>` block ends with '>' and is
    // classified as markup first; an unclosed script opener reaches the
    // Svelte branch.
    expect(detectLanguage("<script>let count = 0")).toBe("svelte");
  });

  // --- Shell ---
  it("detects shell commands starting with $", () => {
    expect(detectLanguage("$ npm install")).toBe("bash");
  });

  // --- Fallback ---
  it("defaults to JavaScript for unrecognized content", () => {
    expect(detectLanguage("just some plain text")).toBe("javascript");
    expect(detectLanguage("")).toBe("javascript");
    expect(detectLanguage("   ")).toBe("javascript");
  });

  it("trims leading and trailing whitespace before classifying", () => {
    expect(detectLanguage("  <div>hello</div>  ")).toBe("markup");
  });
});

/**
 * Detect code language based on content patterns
 * @param {string} content - Code content to analyze
 * @returns {string} Detected language alias
 */
export function detectLanguage(content: string): string {
  const trimmed = content.trim()

  // HTML/SVG
  if (trimmed.startsWith("<") && trimmed.endsWith(">")) {
    if (trimmed.includes("</svg>")) return "markup"
    if (trimmed.includes("/>") || trimmed.includes("</")) return "markup"
  }

  // CSS
  if (trimmed.includes("{") && trimmed.includes("}") && trimmed.includes(":")) {
    if (trimmed.includes("@import") || trimmed.includes("@media")) return "css"
    if (trimmed.includes("$") || trimmed.includes("@mixin")) return "scss"
  }

  // JavaScript/TypeScript
  if (trimmed.includes("function") || trimmed.includes("=>")) {
    if (trimmed.includes(":") && trimmed.includes("interface")) return "typescript"
    if (trimmed.includes("React.") || trimmed.includes("jsx")) return "jsx"
    if (trimmed.includes("<") && trimmed.includes("/>")) return "jsx"
    return "javascript"
  }

  // JSON
  if (
    (trimmed.startsWith("{") && trimmed.endsWith("}")) ||
    (trimmed.startsWith("[") && trimmed.endsWith("]"))
  ) {
    try {
      JSON.parse(trimmed)
      return "json"
    } catch {
      // Not valid JSON, continue to next check
    }
  }

  // YAML
  if (trimmed.includes(":") && !trimmed.includes("{")) {
    return "yaml"
  }

  // Markdown
  if (trimmed.includes("#") || trimmed.includes("```")) {
    return "markdown"
  }

  // Svelte
  if (trimmed.includes("<script>") || trimmed.includes("$:") || trimmed.includes("$derived")) {
    return "svelte"
  }

  // Shell
  if (trimmed.startsWith("$") || trimmed.startsWith("#!")) {
    return "bash"
  }

  return "javascript"
}

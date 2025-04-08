/**
 * Action that triggers a callback when clicking outside of an element
 * @param node - The element to watch for outside clicks
 * @param callback - Function to call when clicking outside
 * @returns Action object with destroy method
 */
export function clickOutside(node: HTMLElement, callback: () => void) {
  function handleClick(event: MouseEvent) {
    if (node && !node.contains(event.target as Node) && event.target instanceof Node) {
      callback()
    }
  }

  document.addEventListener("click", handleClick, true)

  return {
    destroy() {
      document.removeEventListener("click", handleClick, true)
    },
  }
}

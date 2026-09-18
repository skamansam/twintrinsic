/**
 * Installs the Temporal polyfill as the `Temporal` global when the runtime
 * (Node in SSR, the Storybook iframe in tests) lacks native support.
 *
 * The polyfill's named export does NOT install the global by itself, and
 * Twintrinsic consumes `Temporal` as a typed native global (no runtime
 * dependency — see `docs/plans/CALENDARVIEW_DESIGN.md` §9). Stories that
 * pass Temporal data import this module so the component's bare `Temporal`
 * reference resolves exactly as it would in a consumer's polyfilled app.
 */
import { Temporal as TemporalPolyfill } from "@js-temporal/polyfill"

if (typeof globalThis.Temporal === "undefined") {
  globalThis.Temporal = TemporalPolyfill
}

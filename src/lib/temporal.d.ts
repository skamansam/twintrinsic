// Type declarations for the Temporal API — types only, no runtime import.
//
// Twintrinsic consumes `Temporal` as a native global (plan 11.1 policy: no
// polyfill installed). This reference supplies the type surface from the
// polyfill package's bundled .d.ts while contributing nothing to the
// bundle. When native Temporal support is universal, this file (and the
// dev dependency) can simply be deleted.
/// <reference types="@js-temporal/polyfill" />

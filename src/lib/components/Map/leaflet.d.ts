declare module "leaflet" {
  export * from "leaflet";
}

/**
 * `Map.svelte` imports Leaflet's stylesheet for its side effects. The
 * generated `.d.ts` preserves that import, so declare the module here —
 * otherwise consumers' typecheckers (skipLibCheck: false) fail with
 * TS2882 on `twintrinsic/components/Map`.
 */
declare module "leaflet/dist/leaflet.css";

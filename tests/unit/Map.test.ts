import { render } from "@testing-library/svelte";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import MapComponent from "$lib/components/Map/Map.svelte";

// Mock Leaflet to avoid DOM-related issues in test environment
vi.mock("leaflet", () => ({
  default: {
    map: vi.fn(() => ({
      on: vi.fn(),
      remove: vi.fn(),
      getZoom: vi.fn(() => 13),
      getCenter: vi.fn(() => ({ lat: 51.505, lng: -0.09 })),
    })),
    latLng: vi.fn((lat, lng) => ({ lat, lng })),
    tileLayer: vi.fn(() => ({
      addTo: vi.fn(),
    })),
  },
}));

describe("Map", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should render with default props", () => {
    const { container } = render(MapComponent);
    const mapElement = container.querySelector(".h-full.w-full");
    expect(mapElement).toBeTruthy();
  });

  it("should render with custom center and zoom", () => {
    const { container } = render(MapComponent, {
      props: {
        center: [40.7128, -74.006] as [number, number],
        zoom: 10,
      },
    });
    const mapElement = container.querySelector(".h-full.w-full");
    expect(mapElement).toBeTruthy();
  });

  it("should render with custom tile URL", () => {
    const { container } = render(MapComponent, {
      props: {
        tileUrl: "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png",
      },
    });
    const mapElement = container.querySelector(".h-full.w-full");
    expect(mapElement).toBeTruthy();
  });

  it("should render with zoom controls disabled", () => {
    const { container } = render(MapComponent, {
      props: {
        zoomControl: false,
      },
    });
    const mapElement = container.querySelector(".h-full.w-full");
    expect(mapElement).toBeTruthy();
  });

  it("should render with attribution control disabled", () => {
    const { container } = render(MapComponent, {
      props: {
        attributionControl: false,
      },
    });
    const mapElement = container.querySelector(".h-full.w-full");
    expect(mapElement).toBeTruthy();
  });
});

import { render, waitFor } from "@testing-library/svelte";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import MapComponent from "$lib/components/Map/Map.svelte";

// Mock Leaflet to avoid DOM-related issues in test environment.
// The component uses `new leaflet.Map(...)`, `new leaflet.Icon(...)`,
// `new leaflet.DivIcon(...)`, `new leaflet.ImageOverlay(...)`, and
// `new leaflet.TileLayer(...)` — the mock must provide all of these
// as constructors (capital letters).
const mockMapInstance = {
  on: vi.fn(),
  off: vi.fn(),
  remove: vi.fn(),
  getZoom: vi.fn(() => 13),
  getCenter: vi.fn(() => ({ lat: 51.505, lng: -0.09 })),
  setMaxBounds: vi.fn(),
  fitBounds: vi.fn(),
};
const mockMarkerInstance = {
  on: vi.fn(),
  off: vi.fn(),
  remove: vi.fn(),
  bindPopup: vi.fn(),
  bindTooltip: vi.fn(),
  addTo: vi.fn(),
};
const mockLayerInstance = { addTo: vi.fn() };

vi.mock("leaflet", () => {
  function LMap() {
    return mockMapInstance;
  }
  function Icon() {
    return { options: { iconUrl: "mock-icon" } };
  }
  function DivIcon() {
    return { options: {} };
  }
  function ImageOverlay() {
    return mockLayerInstance;
  }
  function TileLayer() {
    return mockLayerInstance;
  }
  function Marker() {
    return mockMarkerInstance;
  }
  return {
    default: { Map: LMap, Icon, DivIcon, ImageOverlay, TileLayer, Marker, CRS: { Simple: {} } },
    Map: LMap,
    Icon,
    DivIcon,
    ImageOverlay,
    TileLayer,
    Marker,
    CRS: { Simple: {} },
  };
});

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

  // initializeMap() is fire-and-forget: the dynamic `import('leaflet')` and
  // all Leaflet construction happen after the mount tick, so the sync
  // assertions above only prove the wrapper rendered. These tests await the
  // async init through the mocked Leaflet instance.
  it("initializes the map asynchronously and attaches interaction listeners", async () => {
    render(MapComponent);

    await waitFor(() => {
      expect(mockMapInstance.on).toHaveBeenCalledWith("click", expect.any(Function));
      expect(mockMapInstance.on).toHaveBeenCalledWith("zoomend", expect.any(Function));
      expect(mockMapInstance.on).toHaveBeenCalledWith("moveend", expect.any(Function));
    });
  });

  it("adds markers and binds their tooltips after async init", async () => {
    render(MapComponent, {
      props: {
        markers: [{ lat: 51.5, lng: -0.09, tooltip: "Central London" }],
      },
    });

    await waitFor(() => {
      expect(mockMarkerInstance.addTo).toHaveBeenCalled();
      expect(mockMarkerInstance.bindTooltip).toHaveBeenCalledWith("Central London", {
        permanent: false,
      });
    });
  });
});

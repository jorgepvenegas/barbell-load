import type { Gym, UserLocation } from "../types/gym";

let cssLoaded = false;

export const loadLeafletCSS = (): void => {
  if (cssLoaded) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
  document.head.appendChild(link);
  cssLoaded = true;
};

interface OverpassElement {
  id: number;
  lat: number;
  lon: number;
  tags?: {
    name?: string;
    "addr:street"?: string;
    "addr:housenumber"?: string;
    "addr:city"?: string;
    "addr:postcode"?: string;
  };
}

interface OverpassResponse {
  elements: OverpassElement[];
}

export const searchNearbyGyms = async (
  location: UserLocation,
  radiusMeters: number
): Promise<Gym[]> => {
  const timeout = radiusMeters > 10000 ? 60 : 30;
  const query = `
    [out:json][timeout:${timeout}];
    (
      node["leisure"="fitness_centre"](around:${radiusMeters},${location.lat},${location.lng});
      node["amenity"="gym"](around:${radiusMeters},${location.lat},${location.lng});
      way["leisure"="fitness_centre"](around:${radiusMeters},${location.lat},${location.lng});
    );
    out center;
  `;

  const response = await fetch("https://overpass-api.de/api/interpreter", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `data=${encodeURIComponent(query)}`,
  });

  if (!response.ok) throw new Error("Overpass API request failed");

  const data: OverpassResponse = await response.json();

  const gyms: Gym[] = data.elements
    .filter((el) => el.lat && el.lon)
    .map((el) => {
      const tags = el.tags || {};
      const addressParts = [
        tags["addr:street"],
        tags["addr:housenumber"],
        tags["addr:city"],
        tags["addr:postcode"],
      ].filter(Boolean);

      return {
        placeId: String(el.id),
        name: tags.name || "Gym",
        address: addressParts.join(", ") || "Address unavailable",
        location: { lat: el.lat, lng: el.lon },
        distance: calculateDistance(location.lat, location.lng, el.lat, el.lon),
      };
    })
    .sort((a, b) => (a.distance || 0) - (b.distance || 0));

  return gyms;
};

interface NominatimResult {
  lat: string;
  lon: string;
}

export const geocodeAddress = async (address: string): Promise<UserLocation> => {
  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("q", address);
  url.searchParams.set("format", "json");
  url.searchParams.set("limit", "1");

  const response = await fetch(url.toString(), {
    headers: { "User-Agent": "BarbellLoadCalculator/1.0" },
  });

  if (!response.ok) throw new Error("Geocoding failed");

  const data: NominatimResult[] = await response.json();
  if (!data.length) throw new Error("Address not found");

  return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
};

export const calculateDistance = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number => {
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const toRad = (deg: number): number => deg * (Math.PI / 180);

export const getDirectionsUrl = (gym: Gym): string => {
  return `https://www.google.com/maps/dir/?api=1&destination=${gym.location.lat},${gym.location.lng}`;
};

import { Component, onMount, onCleanup, createEffect } from "solid-js";
import L from "leaflet";
import { GymStore } from "../../stores/gymStore";
import { loadLeafletCSS } from "../../utils/osm";
import type { Gym } from "../../types/gym";

const Map: Component = () => {
  let mapContainer!: HTMLDivElement;
  let markers: L.Marker[] = [];
  let userMarker: L.CircleMarker | null = null;

  const clearMarkers = () => {
    markers.forEach((m) => m.remove());
    markers = [];
  };

  onMount(() => {
    const loc = GymStore.userLocation();
    if (!loc) return;

    loadLeafletCSS();

    const map = L.map(mapContainer, {
      center: [loc.lat, loc.lng],
      zoom: 13,
      zoomControl: true,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    GymStore.setMapInstance(map);

    userMarker = L.circleMarker([loc.lat, loc.lng], {
      radius: 10,
      fillColor: "#4285F4",
      fillOpacity: 1,
      color: "#ffffff",
      weight: 3,
    }).addTo(map);
    userMarker.bindTooltip("Your Location");
  });

  createEffect(() => {
    const map = GymStore.mapInstance();
    const gyms = GymStore.gyms();
    if (!map) return;

    clearMarkers();

    const defaultIcon = L.icon({
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    });

    gyms.forEach((gym: Gym) => {
      const marker = L.marker([gym.location.lat, gym.location.lng], { icon: defaultIcon }).addTo(map);

      marker.bindPopup(`
        <div style="padding: 4px;">
          <strong>${gym.name}</strong><br/>
          ${gym.address}
        </div>
      `);

      marker.on("click", () => {
        GymStore.setSelectedGym(gym);
      });

      markers.push(marker);
    });
  });

  createEffect(() => {
    const selected = GymStore.selectedGym();
    const map = GymStore.mapInstance();
    if (!selected || !map) return;

    map.flyTo([selected.location.lat, selected.location.lng], 15);

    const marker = markers.find((m) => {
      const latlng = m.getLatLng();
      return latlng.lat === selected.location.lat && latlng.lng === selected.location.lng;
    });

    if (marker) {
      marker.openPopup();
    }
  });

  onCleanup(() => {
    clearMarkers();
    userMarker?.remove();
    const map = GymStore.mapInstance();
    map?.remove();
    GymStore.setMapInstance(null);
  });

  return (
    <div
      ref={mapContainer}
      class="w-full h-64 sm:h-80 lg:h-96 rounded-lg border border-base-300"
    />
  );
};

export default Map;

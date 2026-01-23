import { Component, Show, createSignal, onMount } from "solid-js";
import Navbar from "../Navbar";
import Map from "./Map";
import GymList from "./GymList";
import { GymStore } from "../../stores/gymStore";
import { searchNearbyGyms, geocodeAddress } from "../../utils/osm";

const FindGym: Component = () => {
  const [addressInput, setAddressInput] = createSignal("");
  const [mapsLoaded, setMapsLoaded] = createSignal(false);

  const radiusOptions = [
    { value: 5000, label: "5 km" },
    { value: 10000, label: "10 km" },
    { value: 25000, label: "25 km" },
  ];

  const initializeAndSearch = async () => {
    try {
      setMapsLoaded(true);
      await GymStore.requestLocation();
      await performSearch();
    } catch {
      // Location error handled by store
    }
  };

  const performSearch = async () => {
    const loc = GymStore.userLocation();
    if (!loc) return;

    GymStore.setIsLoading(true);
    GymStore.clearError();

    try {
      const gyms = await searchNearbyGyms(loc, GymStore.searchRadius());
      GymStore.setGyms(gyms);
    } catch (err) {
      GymStore.setError(err instanceof Error ? err.message : "Search failed");
    } finally {
      GymStore.setIsLoading(false);
    }
  };

  const handleAddressSubmit = async (e: Event) => {
    e.preventDefault();
    if (!addressInput().trim()) return;

    GymStore.setIsLoading(true);
    try {
      const loc = await geocodeAddress(addressInput());
      GymStore.setUserLocation(loc);
      GymStore.setLocationState("granted");

      const map = GymStore.mapInstance();
      if (map) {
        map.flyTo([loc.lat, loc.lng], 13);
      }

      await performSearch();
    } catch {
      GymStore.setError("Could not find address");
    } finally {
      GymStore.setIsLoading(false);
    }
  };

  const handleRadiusChange = (e: Event) => {
    const value = parseInt((e.target as HTMLSelectElement).value);
    GymStore.setSearchRadius(value);
    performSearch();
  };

  const handleRetry = () => {
    GymStore.clearError();
    initializeAndSearch();
  };

  onMount(() => {
    initializeAndSearch();
  });

  return (
    <div class="min-h-screen bg-base-100">
      <Navbar />

      <div class="p-4 max-w-4xl mx-auto space-y-4">
        <h1 class="text-2xl font-bold">Find a Gym</h1>

        <Show when={GymStore.error()}>
          <div class="alert alert-error">
            <span>{GymStore.error()}</span>
            <button class="btn btn-sm" onClick={handleRetry}>
              Retry
            </button>
          </div>
        </Show>

        <Show when={GymStore.locationState() === "denied"}>
          <form onSubmit={handleAddressSubmit} class="flex gap-2">
            <input
              type="text"
              placeholder="Enter address or zip code"
              class="input input-bordered flex-1"
              value={addressInput()}
              onInput={(e) => setAddressInput(e.currentTarget.value)}
            />
            <button type="submit" class="btn btn-primary" disabled={GymStore.isLoading()}>
              Search
            </button>
          </form>
        </Show>

        <Show when={GymStore.locationState() === "requesting"}>
          <div class="flex items-center gap-2">
            <span class="loading loading-spinner loading-sm"></span>
            <span>Requesting location...</span>
          </div>
        </Show>

        <Show when={mapsLoaded() && GymStore.userLocation()}>
          <div class="flex items-center gap-2 mb-2">
            <label class="text-sm">Radius:</label>
            <select
              class="select select-bordered select-sm"
              value={GymStore.searchRadius()}
              onChange={handleRadiusChange}
            >
              {radiusOptions.map((opt) => (
                <option value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <Show when={GymStore.isLoading()}>
              <span class="loading loading-spinner loading-sm"></span>
            </Show>
          </div>

          <Map />

          <div class="mt-4">
            <h2 class="text-lg font-semibold mb-2">
              Nearby Gyms ({GymStore.gyms().length})
            </h2>
            <GymList />
          </div>
        </Show>
      </div>
    </div>
  );
};

export default FindGym;

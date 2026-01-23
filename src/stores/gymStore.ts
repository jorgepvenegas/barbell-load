import { createSignal, createRoot } from "solid-js";
import type { Gym, UserLocation, LocationState } from "../types/gym";
import type L from "leaflet";

const createGymStore = () => {
  const [userLocation, setUserLocation] = createSignal<UserLocation | null>(null);
  const [gyms, setGyms] = createSignal<Gym[]>([]);
  const [selectedGym, setSelectedGym] = createSignal<Gym | null>(null);
  const [searchRadius, setSearchRadius] = createSignal<number>(5000);
  const [isLoading, setIsLoading] = createSignal(false);
  const [error, setError] = createSignal<string | null>(null);
  const [locationState, setLocationState] = createSignal<LocationState>("idle");
  const [mapInstance, setMapInstance] = createSignal<L.Map | null>(null);

  const requestLocation = (): Promise<UserLocation> => {
    return new Promise((resolve, reject) => {
      setLocationState("requesting");
      setError(null);

      if (!navigator.geolocation) {
        setLocationState("error");
        setError("Geolocation not supported");
        reject(new Error("Geolocation not supported"));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const loc = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(loc);
          setLocationState("granted");
          resolve(loc);
        },
        (err) => {
          if (err.code === err.PERMISSION_DENIED) {
            setLocationState("denied");
            setError("Location permission denied");
          } else {
            setLocationState("error");
            setError("Could not get location");
          }
          reject(err);
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    });
  };

  const clearError = () => setError(null);
  const clearGyms = () => setGyms([]);

  return {
    userLocation,
    setUserLocation,
    gyms,
    setGyms,
    selectedGym,
    setSelectedGym,
    searchRadius,
    setSearchRadius,
    isLoading,
    setIsLoading,
    error,
    setError,
    locationState,
    setLocationState,
    mapInstance,
    setMapInstance,
    requestLocation,
    clearError,
    clearGyms,
  };
};

export const GymStore = createRoot(createGymStore);

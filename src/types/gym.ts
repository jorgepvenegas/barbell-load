export interface Gym {
  placeId: string;
  name: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  rating?: number;
  userRatingsTotal?: number;
  isOpen?: boolean;
  distance?: number;
}

export type LocationState = "idle" | "requesting" | "granted" | "denied" | "error";

export interface UserLocation {
  lat: number;
  lng: number;
}

import { Component, For, Show } from "solid-js";
import { GymStore } from "../../stores/gymStore";
import { getDirectionsUrl } from "../../utils/osm";
import type { Gym } from "../../types/gym";

const GymList: Component = () => {
  const handleGymClick = (gym: Gym) => {
    GymStore.setSelectedGym(gym);
  };

  const formatDistance = (km: number | undefined): string => {
    if (!km) return "";
    return km < 1 ? `${Math.round(km * 1000)}m` : `${km.toFixed(1)}km`;
  };

  return (
    <div class="space-y-2 max-h-80 overflow-y-auto">
      <Show
        when={GymStore.gyms().length > 0}
        fallback={
          <Show when={!GymStore.isLoading()}>
            <p class="text-base-content/60 text-center py-4">
              No gyms found within {GymStore.searchRadius() / 1000}km
            </p>
          </Show>
        }
      >
        <For each={GymStore.gyms()}>
          {(gym) => (
            <div
              class="card bg-base-200 cursor-pointer hover:bg-base-300 transition-colors"
              classList={{ "ring-2 ring-primary": GymStore.selectedGym()?.placeId === gym.placeId }}
              onClick={() => handleGymClick(gym)}
            >
              <div class="card-body p-3">
                <div class="flex justify-between items-start gap-2">
                  <div class="flex-1 min-w-0">
                    <h3 class="font-semibold text-sm truncate">{gym.name}</h3>
                    <p class="text-xs text-base-content/60 truncate">{gym.address}</p>
                    <div class="flex items-center gap-2 mt-1">
                      <Show when={gym.rating}>
                        <span class="text-xs">
                          {gym.rating} ★
                          <span class="text-base-content/50"> ({gym.userRatingsTotal})</span>
                        </span>
                      </Show>
                      <Show when={gym.isOpen !== undefined}>
                        <span
                          class="badge badge-xs"
                          classList={{
                            "badge-success": gym.isOpen,
                            "badge-error": !gym.isOpen,
                          }}
                        >
                          {gym.isOpen ? "Open" : "Closed"}
                        </span>
                      </Show>
                    </div>
                  </div>
                  <div class="flex flex-col items-end gap-1">
                    <Show when={gym.distance}>
                      <span class="badge badge-ghost badge-sm">
                        {formatDistance(gym.distance)}
                      </span>
                    </Show>
                    <a
                      href={getDirectionsUrl(gym)}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="btn btn-xs btn-primary"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Directions
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </For>
      </Show>
    </div>
  );
};

export default GymList;

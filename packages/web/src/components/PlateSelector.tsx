import { Component } from "solid-js";
import { useStoreActions } from "../stores/store";
import { useStore } from "../stores/store";

export const PlateSelector: Component = () => {
  const store = useStore();
  const { setSelectedPlates } = useStoreActions();

  const handlePlateCheckbox = (index: number) => {
    const updatedSelectedPlates = store.selectedPlates.map(
      ({ enabled, weight }, i) => ({
        enabled: index === i ? !enabled : enabled,
        weight,
      })
    );
    setSelectedPlates(updatedSelectedPlates);
  };

  return (
    <div class="flex flex-col gap-4 w-full">
      <h3 class="text-xl font-bold font-jakarta text-primary-color">
        Available Plates
      </h3>
      <div class="flex flex-col gap-4 rounded-xl p-6 bg-card">
        {store.selectedPlates.map(({ enabled, weight }, index) => (
          <button
            class="flex items-center gap-4 w-full"
            onClick={() => handlePlateCheckbox(index)}
            aria-pressed={enabled}
          >
            <div
              class="flex items-center justify-center w-7 h-7 rounded-lg shrink-0"
              classList={{
                "bg-purple": enabled,
                "bg-transparent border-[2.5px] border-tertiary": !enabled,
              }}
            >
              {enabled && (
                <svg class="w-4 h-4 text-white-color" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <span class="text-base font-semibold text-left font-inter text-primary-color">
              {weight} lb
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

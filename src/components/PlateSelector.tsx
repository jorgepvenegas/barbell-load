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
    <div class="card card-compact bg-base-200">
      <div class="card-body">
        <h2 class="card-title text-lg">Plates available</h2>
        <div class="grid gap-2 grid-cols-3">
          {store.selectedPlates.map(({ enabled, weight }, index) => (
            <button
              class={`btn btn-sm ${enabled ? "btn-primary" : "btn-outline"}`}
              onClick={() => handlePlateCheckbox(index)}
            >
              {weight} lb
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

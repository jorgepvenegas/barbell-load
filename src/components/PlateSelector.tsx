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
    <div class="collapse collapse-arrow bg-base-200">
      <input type="checkbox" />
      <div class="collapse-title text-xl sm:text-2xl font-bold">
        Plates available
      </div>
      <div class="collapse-content">
        <div class="grid gap-3 sm:gap-4 grid-cols-3 pt-2">
          {store.selectedPlates.map(({ enabled, weight }, index) => (
            <button
              class={`btn btn-md text-base py-8 sm:text-lg ${enabled ? "btn-secondary" : "bg-base-100"}`}
              onClick={() => handlePlateCheckbox(index)}
            >
              {enabled && "✅ "}{weight} lb
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

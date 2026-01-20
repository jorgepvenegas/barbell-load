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
    <div class="collapse collapse-arrow border-2 border-primary">
      <input type="checkbox" />
      <div class="collapse-title text-lg">Plates available</div>
      <div class="collapse-content">
        <div class="grid gap-2 grid-cols-3">
          {store.selectedPlates.map(({ enabled, weight }, index) => (
            <button
              class="btn bg-base btn-block px-3 btn-md h-20 flex justify-center items-center no-animation text-base-content"
              onClick={() => handlePlateCheckbox(index)}
            >
              <input
                class="checkbox checkbox-sm"
                type="checkbox"
                name={`${weight}-plate`}
                checked={enabled}
              />
              <label for={`${weight}-plate`}>{`${weight} lb`}</label>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

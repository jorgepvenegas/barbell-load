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
    <div class="collapse collapse-arrow bg-base-200 rounded">
      <input type="checkbox" />
      <div class="collapse-title text-md font-medium">Plates available</div>
      <div class="collapse-content">
        <div class="grid gap-2 sm:grid-cols-4 grid-cols-4">
          {store.selectedPlates.map(({ enabled, weight }, index) => (
            <button
              class="btn btn-accent border-cyan-900 hover:bg-cyan-700 hover:border-cyan-700 bg-cyan-900 btn-block px-5 btn-lg h-24 flex flex-col justify-center items-center no-animation text-white font-normal"
              onClick={() => handlePlateCheckbox(index)}
            >
              <label for={`${weight}-plate`}>{`${weight} lb`}</label>
              <input
                class="checkbox checkbox-sm"
                type="checkbox"
                name={`${weight}-plate`}
                checked={enabled}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

import { Component } from "solid-js";
import { useStore, useStoreActions } from "../stores/store";

export const BarbellSelector: Component = () => {
  const { setBarWeight } = useStoreActions();
  const store = useStore();

  return (
    <div class="card bg-base-200">
      <div class="card-body flex flex-row gap-10">
        <h2 class="card-title text-xl sm:text-2xl">Barbell</h2>
        <div class="flex gap-6">
          <label class="cursor-pointer gap-3 flex items-center">
            <span class="text-lg sm:text-xl">33lb</span>
            <input
              onClick={() => setBarWeight(33)}
              type="radio"
              name="barbell-weight"
              class="radio radio-primary radio-lg"
              checked={store.barWeight === 33}
            />
          </label>
          <label class="cursor-pointer gap-3 flex items-center">
            <span class="text-lg sm:text-xl">45lb</span>
            <input
              onClick={() => setBarWeight(45)}
              type="radio"
              name="barbell-weight"
              class="radio radio-primary radio-lg"
              checked={store.barWeight === 45}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

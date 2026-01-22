import { Component } from "solid-js";
import { useStore, useStoreActions } from "../stores/store";

export const BarbellSelector: Component = () => {
  const { setBarWeight } = useStoreActions();
  const store = useStore();

  return (
    <div class="card card-compact bg-base-200">
      <div class="card-body">
        <h2 class="card-title text-lg">
          Barbell ({store.barWeight}lb)
        </h2>
        <div class="flex gap-4">
          <div class="form-control">
            <label class="label cursor-pointer">
              <span class="label-text">33lb</span>
              <input
                onClick={() => setBarWeight(33)}
                type="radio"
                name="barbell-weight"
                value="33"
                class="radio radio-primary"
                checked={store.barWeight === 33}
                aria-label="Select 33lb barbell"
              />
            </label>
          </div>
          <div class="form-control">
            <label class="label cursor-pointer">
              <span class="label-text">45lb</span>
              <input
                onClick={() => setBarWeight(45)}
                type="radio"
                name="barbell-weight"
                value="45"
                class="radio radio-primary"
                checked={store.barWeight === 45}
                aria-label="Select 45lb barbell"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

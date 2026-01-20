import { Component } from "solid-js";
import { useStore, useStoreActions } from "../stores/store";

export const BarbellSelector: Component = () => {
  const { setBarWeight } = useStoreActions();
  const store = useStore();

  return (
    <fieldset class="collapse collapse-arrow border-2 border-primary">
      <legend class="sr-only">Barbell Weight Selection</legend>
      <input
        type="checkbox"
        aria-label="Toggle barbell weight options"
        aria-controls="barbell-options"
      />
      <div class="collapse-title text-lg">
        Barbell ({store.barWeight}lb)
      </div>
      <div id="barbell-options" class="collapse-content flex gap-4">
        <div class="form-control">
          <label class="label cursor-pointer">
            <span class="label-text">33lb</span>
            <input
              onClick={() => setBarWeight(33)}
              type="radio"
              name="barbell-weight"
              value="33"
              class="radio checked:bg-red-500"
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
              class="radio checked:bg-blue-500"
              checked={store.barWeight === 45}
              aria-label="Select 45lb barbell"
            />
          </label>
        </div>
      </div>
    </fieldset>
  );
};

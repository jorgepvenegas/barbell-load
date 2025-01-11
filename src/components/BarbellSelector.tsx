import { Component } from "solid-js";
import { useStore, useStoreActions } from "../stores/store";

export const BarbellSelector: Component = () => {
  const { setBarWeight } = useStoreActions();
  const store = useStore();

  return (
    <div class="collapse collapse-arrow bg-base-200 rounded">
      <input type="checkbox" />
      <div class="collapse-title text-md font-medium">
        Barbell ({store.barWeight}lb)
      </div>
      <div class="collapse-content">
        <div class="form-control">
          <label class="label cursor-pointer">
            <span class="label-text">33lb</span>
            <input
              onClick={() => setBarWeight(33)}
              type="radio"
              name="radio-10"
              class="radio checked:bg-red-500"
              checked={store.barWeight === 33}
            />
          </label>
        </div>
        <div class="form-control">
          <label class="label cursor-pointer">
            <span class="label-text">45lb</span>
            <input
              onClick={() => setBarWeight(45)}
              type="radio"
              name="radio-10"
              class="radio checked:bg-blue-500"
              checked={store.barWeight === 45}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

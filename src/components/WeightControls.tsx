import { Component, createEffect, createSignal } from "solid-js";
import {
  MAX_PERCENTAGE,
  MAX_WEIGHT,
  MIN_PERCENTAGE,
  PERCENTAGE_STEP,
} from "../utils/constants";
import { useStore, useStoreActions } from "../stores/store";

export const WeightControls: Component = () => {
  const [decrementButtonDisabled, setDecrementButtonDisabled] =
    createSignal(false);
  const [increaseButtonDisabled, setIncreaseButtonDisabled] =
    createSignal(false);

  const store = useStore();
  const { setWeight, setPercentage, setPercentageWeight } = useStoreActions();

  const handleWeightInputChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const newValue = Number(target.value);
    if (isNaN(newValue)) return;
    const newWeight = Math.min(Math.max(newValue, store.barWeight), MAX_WEIGHT);
    setWeight(newWeight);
  };

  const handlePercentageInputChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const newValue = Number(target.value);
    if (isNaN(newValue)) return;
    const newPercentage = Math.min(
      Math.max(newValue, MIN_PERCENTAGE),
      MAX_PERCENTAGE
    );
    updatePercentageWeight(newPercentage);
  };

  const updatePercentageWeight = (newPercentage: number) => {
    const percentageWeight = (newPercentage / 100) * store.weight;

    setPercentageWeight(percentageWeight);
    setPercentage(newPercentage);
  };

  createEffect(() => {
    setIncreaseButtonDisabled(store.percentage === MAX_PERCENTAGE);
    setDecrementButtonDisabled(store.percentage === MIN_PERCENTAGE);
  });

  return (
    <div class="flex gap-4 w-full">
      <label class="form-control w-2/5">
        <div class="label">
          <span class="label-text text-lg font-semibold">Target weight</span>
        </div>
        <input
          class="input input-bordered input-lg rounded-sm w-full text-2xl px-4 text-center"
          value={store.weight}
          type="number"
          inputmode="numeric"
          pattern="[0-9]*"
          min={store.barWeight}
          max={MAX_WEIGHT}
          onChange={handleWeightInputChange}
        />
      </label>
      <div class="form-control w-3/5">
        <div class="label">
          <span class="label-text text-lg font-semibold">Target %</span>
        </div>
        <div class="join w-full h-12 text-xl">
          <button
            class="btn join-item btn-lg text-xl rounded-sm"
            disabled={decrementButtonDisabled()}
            onClick={() => {
              updatePercentageWeight(store.percentage - PERCENTAGE_STEP);
            }}
          >
            -
          </button>
          <input
            class="input input-lg rounded-sm  flex-1 min-w-0 text-2xl px-4 text-center cursor-default disabled:opacity-100 disabled:bg-white"
            value={store.percentage}
            type="number"
            inputmode="numeric"
            pattern="[0-9]*"
            min={MIN_PERCENTAGE}
            max={MAX_PERCENTAGE}
            onChange={handlePercentageInputChange}
          />
          <button
            disabled={increaseButtonDisabled()}
            class="btn join-item btn-lg text-xl rounded-sm"
            onClick={() => {
              updatePercentageWeight(store.percentage + PERCENTAGE_STEP);
            }}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

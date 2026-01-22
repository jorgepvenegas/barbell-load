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
    <div class="card card-compact bg-base-200">
      <div class="card-body">
        <h2 class="card-title text-lg">Weight controls</h2>
        <div class="flex flex-row gap-5 w-full">
          <div class="form-control w-2/4 flex flex-col gap-3">
            <legend class="label">
              <span class="label-text text-xl font-semibold">Target in lb:</span>
            </legend>
            <input
              class="input input-primary w-full text-xl text-center"
              value={store.weight}
              type="number"
              inputmode="numeric"
              pattern="[0-9]*"
              min={store.barWeight}
              max={MAX_WEIGHT}
              onChange={handleWeightInputChange}
              aria-label="Target weight in pounds"
            />
          </div>
          <div class="form-control w-2/4 flex flex-col gap-3">
            <legend class="label">
              <span class="label-text text-xl font-semibold">Target %</span>
            </legend>
            <div class="join w-full h-12 text-xl">
              <button
                class="btn btn-primary btn-md join-item"
                disabled={decrementButtonDisabled()}
                onClick={() => {
                  updatePercentageWeight(store.percentage - PERCENTAGE_STEP);
                }}
                aria-label="Decrease percentage by 5%"
                title="Decrease percentage"
              >
                -
              </button>
              <input
                class="input input-primary w-full text-2xl text-center join-item"
                value={store.percentage}
                type="number"
                inputmode="numeric"
                pattern="[0-9]*"
                min={MIN_PERCENTAGE}
                max={MAX_PERCENTAGE}
                onChange={handlePercentageInputChange}
                aria-label="Target percentage"
              />
              <button
                disabled={increaseButtonDisabled()}
                class="btn btn-primary join-item"
                onClick={() => {
                  updatePercentageWeight(store.percentage + PERCENTAGE_STEP);
                }}
                aria-label="Increase percentage by 5%"
                title="Increase percentage"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

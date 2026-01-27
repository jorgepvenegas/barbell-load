import { Component, createEffect, createSignal } from "solid-js";
import {
  MAX_PERCENTAGE,
  MAX_WEIGHT,
  MIN_PERCENTAGE,
  PERCENTAGE_STEP,
} from "@barbell/shared";
import { useStore, useStoreActions } from "../stores/store";

export const WeightControls: Component = () => {
  const [decrementButtonDisabled, setDecrementButtonDisabled] =
    createSignal(false);
  const [increaseButtonDisabled, setIncreaseButtonDisabled] =
    createSignal(false);

  const store = useStore();
  const { setWeight, setPercentage, setPercentageWeight } = useStoreActions();

  const updatePercentageWeight = (newPercentage: number) => {
    const percentageWeight = (newPercentage / 100) * store.weight;
    setPercentageWeight(percentageWeight);
    setPercentage(newPercentage);
  };

  const incrementWeight = () => {
    const newWeight = Math.min(store.weight + 5, MAX_WEIGHT);
    setWeight(newWeight);
  };

  const decrementWeight = () => {
    const newWeight = Math.max(store.weight - 5, store.barWeight);
    setWeight(newWeight);
  };

  const incrementPercentage = () => {
    updatePercentageWeight(Math.min(store.percentage + PERCENTAGE_STEP, MAX_PERCENTAGE));
  };

  const decrementPercentage = () => {
    updatePercentageWeight(Math.max(store.percentage - PERCENTAGE_STEP, MIN_PERCENTAGE));
  };

  createEffect(() => {
    setIncreaseButtonDisabled(store.percentage === MAX_PERCENTAGE);
    setDecrementButtonDisabled(store.percentage === MIN_PERCENTAGE);
  });

  return (
    <div class="flex flex-col gap-5">
      <div class="flex flex-col gap-3 w-full">
        <h3 class="text-xl font-bold font-jakarta text-primary-color">
          Target Weight
        </h3>
        <div class="flex items-center justify-between rounded-xl px-5 h-[72px] bg-card">
          <span class="text-4xl font-extrabold font-jakarta text-primary-color">
            {store.weight}
          </span>
          <div class="flex gap-3">
            <button
              class="flex items-center justify-center w-11 h-11 rounded-[22px] bg-elevated"
              onClick={decrementWeight}
              aria-label="Decrease weight"
            >
              <svg class="w-5 h-5 text-primary-color" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
              </svg>
            </button>
            <button
              class="flex items-center justify-center w-11 h-11 rounded-[22px] bg-purple"
              onClick={incrementWeight}
              aria-label="Increase weight"
            >
              <svg class="w-5 h-5 text-white-color" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m7-7H5" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-3 w-full">
        <h3 class="text-xl font-bold font-jakarta text-primary-color">
          Training % of Target
        </h3>
        <div class="flex items-center justify-between rounded-xl px-5 h-[72px] bg-card">
          <span class="text-4xl font-extrabold font-jakarta" style="color: var(--accent-teal);">
            {store.percentage}%
          </span>
          <div class="flex gap-3">
            <button
              class="flex items-center justify-center w-11 h-11 rounded-[22px] bg-elevated"
              onClick={decrementPercentage}
              disabled={decrementButtonDisabled()}
              aria-label="Decrease percentage"
            >
              <svg class="w-5 h-5 text-primary-color" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
              </svg>
            </button>
            <button
              class="flex items-center justify-center w-11 h-11 rounded-[22px] bg-purple"
              onClick={incrementPercentage}
              disabled={increaseButtonDisabled()}
              aria-label="Increase percentage"
            >
              <svg class="w-5 h-5 text-white-color" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m7-7H5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

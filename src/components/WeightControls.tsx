import { Component } from "solid-js";
import { BarWeight } from "../utils/calculators";
import { MAX_PERCENTAGE, MAX_WEIGHT, MIN_PERCENTAGE } from "../utils/constants";

export const WeightControls: Component<{
  weight: () => number;
  percentage: () => number;
  barWeight: () => BarWeight;
  onWeightChange: (event: Event) => void;
  onPercentageChange: (event: Event) => void;
  onPercentageIncrement: () => void;
  onPercentageDecrement: () => void;
  increaseButtonDisabled: () => boolean;
  decrementButtonDisabled: () => boolean;
}> = (props) => {
  return (
    <div class="flex gap-4 w-full">
      <label class="form-control w-2/5">
        <div class="label">
          <span class="label-text text-lg font-semibold">Target weight</span>
        </div>
        <input
          class="input input-bordered input-lg rounded w-full text-2xl px-4 text-center"
          value={props.weight()}
          type="number"
          inputmode="numeric"
          pattern="[0-9]*"
          min={props.barWeight()}
          max={MAX_WEIGHT}
          onChange={props.onWeightChange}
        />
      </label>
      <div class="form-control w-3/5">
        <div class="label">
          <span class="label-text text-lg font-semibold">Target %</span>
        </div>
        <div class="join w-full h-12 text-xl">
          <button
            class="btn join-item btn-lg text-xl rounded"
            onClick={props.onPercentageDecrement}
            disabled={props.decrementButtonDisabled()}
          >
            -
          </button>
          <input
            class="input input-bordered input-lg rounded join-item flex-1 min-w-0 text-2xl px-4 text-center bg-white cursor-default disabled:opacity-100 disabled:bg-white"
            value={props.percentage()}
            type="number"
            inputmode="numeric"
            pattern="[0-9]*"
            min={MIN_PERCENTAGE}
            max={MAX_PERCENTAGE}
            onChange={props.onPercentageChange}
          />
          <button
            disabled={props.increaseButtonDisabled()}
            class="btn join-item btn-lg text-xl rounded"
            onClick={props.onPercentageIncrement}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

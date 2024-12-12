import { Component } from "solid-js";
import { BarWeight } from "../utils/calculators";

export const BarWeightSelector: Component<{
  barWeight: () => BarWeight;
  onBarWeightChange: (weight: BarWeight) => void;
}> = (props) => {
  return (
    <div class="collapse collapse-arrow bg-base-200 rounded">
      <input type="checkbox" />
      <div class="collapse-title text-md font-medium">
        Barbell ({props.barWeight()}lb)
      </div>
      <div class="collapse-content">
        <div class="form-control">
          <label class="label cursor-pointer">
            <span class="label-text">35lb</span>
            <input
              onClick={() => props.onBarWeightChange(35)}
              type="radio"
              name="radio-10"
              class="radio checked:bg-red-500"
              checked={props.barWeight() === 35}
            />
          </label>
        </div>
        <div class="form-control">
          <label class="label cursor-pointer">
            <span class="label-text">45lb</span>
            <input
              onClick={() => props.onBarWeightChange(45)}
              type="radio"
              name="radio-10"
              class="radio checked:bg-blue-500"
              checked={props.barWeight() === 45}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

import { Component, createEffect, createMemo, Show } from "solid-js";
import { PlatePair } from "../utils/calculators";

export const PlateResults: Component<{
  percentageWeight: () => number;
  plates: () => Array<PlatePair> | undefined;
  weight: () => number;
  barWeight: () => number;
}> = (props) => {
  
  const isLessThanTheBarbell = createMemo(() => {
    return props.percentageWeight() < props.barWeight();
  });

  return (
    <div class="p-4 bg-base-200 rounded">
      <h2 class="pb-3 text-xl font-semibold">
        For {props.percentageWeight()}lb you'll need:
      </h2>
      <Show when={props.plates()}>
        <ul class="list-disc px-4 text-md text-lg">
          {props.plates()?.map(({ count, weight }) => (
            <li>
              {count} plate(s) of {weight}lb per side
            </li>
          ))}
        </ul>
      </Show>
      <Show when={props.plates()?.length === 0}>
        <p class="text-lg">
          Just the barbell
          😀
        </p>
      </Show>
      <Show when={isLessThanTheBarbell()}>
        <small>(that's not even the barbell weight but that's okay!)</small>
      </Show>
    </div>
  );
};

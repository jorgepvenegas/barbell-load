import { Component, createMemo, Show } from "solid-js";
import { useStore } from "../stores/store";
import { useWeightCalculator } from "../hooks/useWeightCalculator";

export const PlateResults: Component = () => {
  const store = useStore();
  const { percentageWeight, plates } = useWeightCalculator();

  const isLessThanTheBarbell = createMemo(() => {
    return percentageWeight() < store.barWeight;
  });

  return (
    <div class="p-4 bg-base-200 rounded">
      <h2 class="pb-3 text-xl font-semibold">
        For {percentageWeight()}lb you'll need:
      </h2>
      <Show when={plates()}>
        <ul class="list-disc px-4 text-md text-lg">
          {plates()?.map(({ count, weight }) => (
            <li>
              {count} plate(s) of {weight}lb per side
            </li>
          ))}
        </ul>
      </Show>
      <Show when={plates()?.length === 0}>
        <p class="text-lg">Just the barbell 😀</p>
      </Show>
      <Show when={isLessThanTheBarbell()}>
        <small>(that's not even the barbell weight but that's okay!)</small>
      </Show>
    </div>
  );
};

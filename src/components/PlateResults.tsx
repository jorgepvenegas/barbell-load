import { Component, createMemo, Show } from "solid-js";
import { useStore } from "../stores/store";
import { calculatePlates } from "../utils/calculators";

export const PlateResults: Component = () => {
  const store = useStore();
  const plates = createMemo(() =>
    calculatePlates({
      targetWeight: store.weight * (store.percentage / 100),
      barWeight: store.barWeight,
      selectedPlates: store.selectedPlates,
    })
  );

  const isLessThanTheBarbell = createMemo(() => {
    return store.percentageWeight && store.percentageWeight < store.barWeight;
  });

  return (
    <div class="p-4 bg-base-200 rounded-sm">
      <h2 class="pb-3 text-xl font-semibold">
        For {store.percentageWeight}lb you'll need:
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

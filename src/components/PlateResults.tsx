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
    <div class="card card-compact bg-base-200">
      <div class="card-body">
        <h2 class="card-title text-lg sm:text-xl">
          For {store.percentageWeight.toFixed(2)}lb you'll need:
        </h2>
        <Show when={plates()}>
          <ul class="list-disc pl-4 text-base sm:text-lg">
            {plates()?.map(({ count, weight }) => (
              <li>
                {count} plate(s) of {weight}lb per side
              </li>
            ))}
          </ul>
        </Show>
        <Show when={plates()?.length === 0}>
          <p class="text-base sm:text-lg">Just the barbell 😀</p>
        </Show>
        <Show when={isLessThanTheBarbell()}>
          <small>(that's not even the barbell weight but that's okay!)</small>
        </Show>
      </div>
    </div>
  );
};

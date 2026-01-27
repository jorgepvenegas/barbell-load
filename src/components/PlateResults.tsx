import { Component, createMemo, Show, For } from "solid-js";
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
    <div class="flex flex-col gap-4 w-full">
      <h3 class="text-xl font-bold font-jakarta text-primary-color">
        Calculated Weight
      </h3>
      <div class="flex flex-col gap-4 rounded-xl p-6 bg-purple shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
        <div class="text-4xl font-extrabold font-jakarta text-white-color">
          {store.percentageWeight.toFixed(0)} lb
        </div>

        <div class="text-[15px] font-medium font-inter" style="color: rgba(255, 255, 255, 0.8);">
          {store.barWeight} lb Barbell
        </div>

        <Show when={!isLessThanTheBarbell()}>
          <div class="text-[15px] leading-[1.6] font-inter" style="color: rgba(255, 255, 255, 0.85);">
            <Show when={plates() && plates()!.length > 0}>
              <div>Plates Per Side:</div>
              <For each={plates()}>
                {({ count, weight }) => (
                  <div>{count}× {weight} lb</div>
                )}
              </For>
            </Show>
            <Show when={plates()?.length === 0}>
              <div>Just the barbell!</div>
            </Show>
          </div>
        </Show>

        <Show when={isLessThanTheBarbell()}>
          <div class="text-[15px] font-inter" style="color: rgba(255, 255, 255, 0.85);">
            That's less than the barbell weight
          </div>
        </Show>
      </div>
    </div>
  );
};

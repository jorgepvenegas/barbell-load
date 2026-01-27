import { type Component, For, createSignal, createMemo, createEffect } from "solid-js";
import Layout from "../Layout";
import { useStore } from "../../stores/store";
import type { PlateWeight } from "../../utils/calculators";

const Plates: Component = () => {
  const store = useStore();

  const enabledPlates = createMemo(() =>
    store.selectedPlates.filter(({ enabled }) => enabled)
  );

  const [plateCounts, setPlateCounts] = createSignal(
    Object.fromEntries(enabledPlates().map((plate) => [plate.weight, 0]))
  );

  createEffect(() => {
    const currentEnabledWeights = new Set(
      enabledPlates().map(p => p.weight)
    );
    setPlateCounts(prev => {
      const newCounts = { ...prev };
      Object.keys(newCounts).forEach(weight => {
        const numWeight = Number(weight) as PlateWeight;
        if (!currentEnabledWeights.has(numWeight)) {
          delete newCounts[weight];
        }
      });
      enabledPlates().forEach(plate => {
        if (!(plate.weight in newCounts)) {
          newCounts[plate.weight] = 0;
        }
      });
      return newCounts;
    });
  });

  const totalWeight = () => {
    const plateWeight = Object.entries(plateCounts()).reduce(
      (sum, [weight, count]) => sum + Number(weight) * count * 2,
      0
    );
    return plateWeight + store.barWeight;
  };

  const handleIncrement = (weight: number) => {
    setPlateCounts((prev) => ({ ...prev, [weight]: prev[weight] + 1 }));
  };

  const handleDecrement = (weight: number) => {
    setPlateCounts((prev) => ({
      ...prev,
      [weight]: Math.max(0, prev[weight] - 1),
    }));
  };

  return (
    <Layout>
      <header class="flex items-center justify-between py-4">
        <h1 class="text-4xl font-bold font-jakarta text-primary-color">
          Plate Counter
        </h1>
      </header>

      <section aria-labelledby="result-heading">
        <div class="flex flex-col gap-4 w-full">
          <h2 id="result-heading" class="text-xl font-bold font-jakarta text-primary-color">
            Total Weight
          </h2>
          <div class="flex flex-col gap-1 rounded-xl p-6 bg-teal">
            <div class="text-4xl font-extrabold font-jakarta text-white-color">
              {totalWeight()} lb
            </div>
            <div class="text-[15px] font-medium font-inter" style="color: rgba(255, 255, 255, 0.8);">
              {store.barWeight} lb Olympic Bar + Plates
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="plate-input-heading">
        <div class="flex flex-col gap-4 w-full">
          <h2 id="plate-input-heading" class="text-xl font-bold font-jakarta text-primary-color">
            Plates Per Side
          </h2>
          <div class="flex flex-col gap-5 rounded-xl p-6 bg-card">
            <For each={enabledPlates()}>
              {(plate) => (
                <div class="flex items-center justify-between w-full">
                  <span class="text-base font-semibold font-inter text-primary-color">
                    {plate.weight} lb
                  </span>
                  <div class="flex items-center gap-3">
                    <button
                      class="flex items-center justify-center w-9 h-9 rounded-[18px] bg-elevated"
                      onClick={() => handleDecrement(plate.weight)}
                      disabled={plateCounts()[plate.weight] === 0}
                      aria-label={`Decrease ${plate.weight}lb plates`}
                    >
                      <svg class="w-4 h-4 text-primary-color" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
                      </svg>
                    </button>
                    <span class="text-xl font-bold text-center min-w-[24px] font-jakarta text-primary-color">
                      {plateCounts()[plate.weight]}
                    </span>
                    <button
                      class="flex items-center justify-center w-9 h-9 rounded-[18px] bg-purple"
                      onClick={() => handleIncrement(plate.weight)}
                      aria-label={`Increase ${plate.weight}lb plates`}
                    >
                      <svg class="w-4 h-4 text-white-color" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m7-7H5" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </For>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Plates;

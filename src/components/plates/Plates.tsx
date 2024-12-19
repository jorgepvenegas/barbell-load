import { type Component, For, createSignal } from "solid-js";
import { availablePlates } from "../../utils/calculators";
import Navbar from "../Navbar";

const BARBELL_WEIGHT = 45; // Standard Olympic barbell weight

const Plates: Component = () => {
  // Create a signal for each plate count
  const [plateCounts, setPlateCounts] = createSignal(
    Object.fromEntries(availablePlates.map((plate) => [plate.weight, 0]))
  );

  // Calculate total weight including barbell
  const totalWeight = () => {
    const plateWeight = Object.entries(plateCounts()).reduce(
      (sum, [weight, count]) => sum + Number(weight) * count * 2, // multiply by 2 since plates go on both sides
      0
    );
    return plateWeight + BARBELL_WEIGHT;
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
    <div class="container mx-auto w-full sm:max-w-2xl">
      <div class="mx-4 pt-8 flex flex-col gap-7">
        <Navbar />
        <h1 class="text-3xl mb-5">Plates (experimental)</h1>
        <div class="p-4 bg-blue-100 rounded-lg">
          <p class="text-xl font-bold">Total Weight: {totalWeight()}lbs</p>
          <p class="text-sm text-gray-600">
            (Including {BARBELL_WEIGHT}lb barbell)
          </p>
        </div>
        <div class="flex flex-col gap-4">
          <For each={availablePlates}>
            {(plate) => (
              <div class="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
                <span class="text-lg font-medium">{plate.weight}lb plate</span>
                <div class="flex items-center gap-4">
                  <button
                    onClick={() => handleDecrement(plate.weight)}
                    class="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:opacity-50"
                    disabled={plateCounts()[plate.weight] === 0}
                    aria-label={`Decrease ${plate.weight}lb plates`}
                  >
                    -
                  </button>
                  <span class="w-8 text-center">
                    {plateCounts()[plate.weight]}
                  </span>
                  <button
                    onClick={() => handleIncrement(plate.weight)}
                    class="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
                    aria-label={`Increase ${plate.weight}lb plates`}
                  >
                    +
                  </button>
                </div>
              </div>
            )}
          </For>
        </div>
      </div>
    </div>
  );
};

export default Plates;

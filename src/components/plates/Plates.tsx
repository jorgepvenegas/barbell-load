import { type Component, For, createSignal } from "solid-js";
import { availablePlates } from "../../utils/calculators";
import Navbar from "../Navbar";
import { BarbellSelector } from "../BarbellSelector";
import { useStore } from "../../stores/store";

const Plates: Component = () => {
  const store = useStore();
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
    <>
      <Navbar />
      <div class="container mx-auto max-w-full sm:max-w-2xl min-h-screen">
        <div class="mx-3 sm:mx-4 pt-3 sm:pt-4 pb-6 flex flex-col gap-4 sm:gap-5">
        <h1 class="text-2xl sm:text-3xl">
          Calculate by plate <small class="text-sm">(experimental)</small>
        </h1>
        <BarbellSelector />
        <div class="sticky top-2 z-10">
          <div class="p-3 sm:p-4 rounded-lg bg-base-200 border-2">
            <p class="text-lg sm:text-xl font-bold">Total Weight: {totalWeight()}lbs</p>
            <p class="text-xs sm:text-sm">
              (Including {store.barWeight}lb barbell)
            </p>
          </div>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          <For each={availablePlates}>
            {(plate) => (
              <div class="flex flex-col items-center justify-between px-2 sm:px-3 py-3 sm:py-4 bg-base-300 rounded gap-3 sm:gap-4">
                <span class="text-base sm:text-lg font-medium">{plate.weight}lb plate</span>
                <div class="flex items-center gap-2 sm:gap-3">
                  <button
                    onClick={() => handleDecrement(plate.weight)}
                    class="px-2 sm:px-3 py-1 text-sm sm:text-base bg-warning text-white rounded-md hover:bg-red-600 disabled:opacity-50"
                    disabled={plateCounts()[plate.weight] === 0}
                    aria-label={`Decrease ${plate.weight}lb plates`}
                  >
                    -
                  </button>
                  <span class="w-6 sm:w-8 text-center text-sm sm:text-base">
                    {plateCounts()[plate.weight]}
                  </span>
                  <button
                    onClick={() => handleIncrement(plate.weight)}
                    class="px-2 sm:px-3 py-1 text-sm sm:text-base bg-success text-white rounded-md hover:bg-green-600"
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
    </>
  );
};

export default Plates;

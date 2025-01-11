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
    <div class="container mx-auto w-full sm:max-w-2xl min-h-screen">
      <div class="mx-4 pt-4 flex flex-col gap-5">
        <Navbar />
        <h1 class="text-3xl">
          Calculate by plate <small class="text-sm">(experimental)</small>
        </h1>
        <BarbellSelector />
        <div class="sticky top-2 z-10">
          <div class="p-4 bg-yellow-100 rounded-lg shadow-md backdrop-blur-sm">
            <p class="text-xl font-bold">Total Weight: {totalWeight()}lbs</p>
            <p class="text-sm text-gray-600">
              (Including {store.barWeight}lb barbell)
            </p>
          </div>
        </div>
        <div class="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <For each={availablePlates}>
            {(plate) => (
              <div class="flex flex-col items-center justify-between px-2 py-4 bg-gray-100 rounded-lg gap-5">
                <span class="text-lg font-medium">{plate.weight}lb plate</span>
                <div class="flex items-center gap-1">
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

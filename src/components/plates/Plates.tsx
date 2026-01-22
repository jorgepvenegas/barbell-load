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
          Calculate by plate
        </h1>
        <div class="sticky top-2 z-10">
          <div class="card card-compact bg-base-200">
            <div class="card-body">
              <p class="text-lg sm:text-xl font-bold">Total Weight: {totalWeight()}lbs</p>
              <p class="text-xs sm:text-sm opacity-80">
                (Including {store.barWeight}lb barbell)
              </p>
            </div>
          </div>
        </div>
        <BarbellSelector />
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5">
          <For each={availablePlates}>
            {(plate) => (
              <div class="flex flex-col card bg-base-200">
                <div class="card-body items-center text-center gap-4">
                  <span class="text-xl sm:text-2xl font-semibold">{plate.weight}lb plate</span>
                  <div class="flex items-center gap-3 sm:gap-4">
                    <button
                      onClick={() => handleDecrement(plate.weight)}
                      class="btn btn-md btn-primary"
                      disabled={plateCounts()[plate.weight] === 0}
                      aria-label={`Decrease ${plate.weight}lb plates`}
                    >
                      -
                    </button>
                    <span class="w-10 sm:w-12 text-center text-xl sm:text-2xl font-semibold">
                      {plateCounts()[plate.weight]}
                    </span>
                    <button
                      onClick={() => handleIncrement(plate.weight)}
                      class="btn btn-md btn-primary"
                      aria-label={`Increase ${plate.weight}lb plates`}
                    >
                      +
                    </button>
                  </div>
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

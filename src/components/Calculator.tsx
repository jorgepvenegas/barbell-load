import { type Component } from "solid-js";
import { PlateSelector } from "./PlateSelector";
import { BarbellSelector } from "./BarbellSelector";
import { WeightControls } from "./WeightControls";
import { PlateResults } from "./PlateResults";
import Navbar from "./Navbar";

const Calculator: Component = () => {
  return (
    <>
      <Navbar />
      <div class="container mx-auto max-w-full sm:max-w-2xl min-h-screen">
        <main class="mx-3 sm:mx-4 pt-3 sm:pt-4 pb-6 flex flex-col gap-4 sm:gap-5">
        <h1 class="text-2xl sm:text-3xl">Barbell Load Calculator</h1>
        <section aria-labelledby="plate-selector-heading">
          <h2 id="plate-selector-heading" class="sr-only">
            Plate Selection
          </h2>
          <PlateSelector />
        </section>
        <section aria-labelledby="barbell-selector-heading">
          <h2 id="barbell-selector-heading" class="sr-only">
            Barbell Weight Selection
          </h2>
          <BarbellSelector />
        </section>
        <section aria-labelledby="weight-controls-heading">
          <h2 id="weight-controls-heading" class="sr-only">
            Weight Controls
          </h2>
          <WeightControls />
        </section>
        <section aria-labelledby="results-heading">
          <h2 id="results-heading" class="sr-only">
            Plate Distribution Results
          </h2>
          <PlateResults />
        </section>
        </main>
      </div>
    </>
  );
};

export default Calculator;

import { type Component } from "solid-js";
import { WeightControls } from "./WeightControls";
import { PlateResults } from "./PlateResults";
import { TabBar } from "./TabBar";

const Calculator: Component = () => {
  return (
    <div class="container mx-auto max-w-full sm:max-w-2xl min-h-screen bg-page">
      <main class="mx-6 pt-0 pb-[100px] flex flex-col gap-8">
        <header class="flex items-center justify-between py-4">
          <h1 class="text-[34px] font-bold font-jakarta text-primary-color">
            Barbell Calc
          </h1>
          <button
            class="flex items-center justify-center w-12 h-12 rounded-3xl bg-card"
            aria-label="Settings"
          >
            <svg class="w-[22px] h-[22px] text-primary-color" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </header>

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

      <div class="fixed bottom-0 left-0 right-0 px-6 py-3 pointer-events-none glass border-0">
        <div class="container mx-auto max-w-full sm:max-w-2xl pointer-events-auto">
          <TabBar />
        </div>
      </div>
    </div>
  );
};

export default Calculator;

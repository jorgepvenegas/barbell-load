import { type Component } from "solid-js";
import { PlateSelector } from "./PlateSelector";
import { BarWeightSelector } from "./BarWeightSelector";
import { WeightControls } from "./WeightControls";
import { PlateResults } from "./PlateResults";
import Navbar from "./Navbar";

const Calculator: Component = () => {
  return (
    <div class="container mx-auto w-full sm:max-w-2xl min-h-screen">
      <div class="mx-4 pt-4 flex flex-col gap-7">
        <Navbar />
        <h1 class="text-3xl mb-5">Barbell Load Calculator</h1>
        <PlateSelector />
        <BarWeightSelector />
        <WeightControls />
        <PlateResults />
      </div>
    </div>
  );
};

export default Calculator;

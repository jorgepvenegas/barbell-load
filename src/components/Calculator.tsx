import { type Component } from "solid-js";
import { PlateSelector } from "./PlateSelector";
import { BarbellSelector } from "./BarbellSelector";
import { WeightControls } from "./WeightControls";
import { PlateResults } from "./PlateResults";
import Navbar from "./Navbar";

const Calculator: Component = () => {
  return (
    <div class="container mx-auto w-full sm:max-w-2xl min-h-screen">
      <div class="mx-4 pt-4 flex flex-col gap-5">
        <Navbar />
        <h1 class="text-3xl">Barbell Load Calculator</h1>
        <PlateSelector />
        <BarbellSelector />
        <WeightControls />
        <PlateResults />
      </div>
    </div>
  );
};

export default Calculator;

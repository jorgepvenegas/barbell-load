import { type Component } from "solid-js";
import { WeightControls } from "./WeightControls";
import { PlateResults } from "./PlateResults";
import Layout from "./Layout";
import ThemeToggle from "./ThemeToggle";

const Calculator: Component = () => {
  return (
    <Layout>
      <header class="flex items-center justify-between py-4">
        <h1 class="text-4xl font-bold font-jakarta text-primary-color">
          Barbell Calc
        </h1>
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
    </Layout>
  );
};

export default Calculator;

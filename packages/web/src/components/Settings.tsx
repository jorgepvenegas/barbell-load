import { type Component } from "solid-js";
import { BarbellSelector } from "./BarbellSelector";
import { PlateSelector } from "./PlateSelector";
import Layout from "./Layout";

const Settings: Component = () => {
  return (
    <Layout>
      <header class="flex items-center justify-between py-4">
        <h1 class="text-[34px] font-bold font-jakarta text-primary-color">
          Settings
        </h1>
      </header>

      <section aria-labelledby="barbell-selector-heading">
        <h2 id="barbell-selector-heading" class="sr-only">
          Barbell Selection
        </h2>
        <BarbellSelector />
      </section>

      <section aria-labelledby="plate-selector-heading">
        <h2 id="plate-selector-heading" class="sr-only">
          Plate Selection
        </h2>
        <PlateSelector />
      </section>
    </Layout>
  );
};

export default Settings;

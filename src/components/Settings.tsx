import { type Component } from "solid-js";
import { BarbellSelector } from "./BarbellSelector";
import { PlateSelector } from "./PlateSelector";
import { TabBar } from "./TabBar";

const Settings: Component = () => {
  return (
    <div class="container mx-auto max-w-full sm:max-w-2xl min-h-screen bg-page">
      <main class="mx-6 pt-0 pb-[100px] flex flex-col gap-8">
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
      </main>

      <div class="fixed bottom-0 left-0 right-0 px-6 pb-6 pointer-events-none">
        <div class="container mx-auto max-w-full sm:max-w-2xl pointer-events-auto">
          <TabBar />
        </div>
      </div>
    </div>
  );
};

export default Settings;

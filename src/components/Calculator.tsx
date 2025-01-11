import { type Component } from "solid-js";
import { availablePlates } from "../utils/calculators";
import { STORAGE_KEY } from "../utils/constants";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { PlateSelector } from "./PlateSelector";
import { BarWeightSelector } from "./BarWeightSelector";
import { WeightControls } from "./WeightControls";
import { PlateResults } from "./PlateResults";
import Navbar from "./Navbar";

const Calculator: Component = () => {
  const [selectedPlates, setSelectedPlates] = useLocalStorage(
    STORAGE_KEY,
    availablePlates
  );

  const handlePlateCheckbox = (index: number) => {
    const updatedSelectedPlates = selectedPlates().map(
      ({ enabled, weight }, i) => ({
        enabled: index === i ? !enabled : enabled,
        weight,
      })
    );
    setSelectedPlates(updatedSelectedPlates);
  };

  return (
    <div class="container mx-auto w-full sm:max-w-2xl min-h-screen">
      <div class="mx-4 pt-4 flex flex-col gap-7">
        <Navbar />
        <h1 class="text-3xl mb-5">Barbell Load Calculator</h1>
        <PlateSelector
          selectedPlates={selectedPlates}
          onPlateToggle={handlePlateCheckbox}
        />

        <BarWeightSelector />

        <WeightControls />

        <PlateResults selectedPlates={selectedPlates} />
      </div>
    </div>
  );
};

export default Calculator;

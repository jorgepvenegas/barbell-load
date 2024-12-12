import { createEffect, createSignal, Show, type Component } from "solid-js";
import { availablePlates } from "./utils/calculators";
import { BarWeight } from "./utils/types";
import { useWeightCalculator } from "./hooks/useWeightCalculator";
import {
  MAX_PERCENTAGE,
  MAX_WEIGHT,
  MIN_PERCENTAGE,
  PERCENTAGE_STEP,
  STORAGE_KEY,
} from "./utils/constants";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { PlateSelector } from "./components/PlateSelector";
import { BarWeightSelector } from "./components/BarWeightSelector";
import { WeightControls } from "./components/WeightControls";
import { PlateResults } from "./components/PlateResults";

const App: Component = () => {
  const [weight, setWeight] = createSignal(65);
  const [percentage, setPercentage] = createSignal(100);
  const [barWeight, setBarWeight] = createSignal<BarWeight>(45);
  const [increaseButtonDisabled, setIncreaseButtonDisabled] =
    createSignal(false);
  const [decrementButtonDisabled, setDecrementButtonDisabled] =
    createSignal(false);

  const [selectedPlates, setSelectedPlates] = useLocalStorage(
    STORAGE_KEY,
    availablePlates
  );

  const { percentageWeight, plates } = useWeightCalculator(
    weight,
    percentage,
    barWeight,
    selectedPlates
  );

  createEffect(() => {
    setIncreaseButtonDisabled(percentage() === MAX_PERCENTAGE);
    setDecrementButtonDisabled(percentage() === MIN_PERCENTAGE);
  });

  const handlePercentageInputChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const newValue = Number(target.value);
    if (isNaN(newValue)) return;
    const newPercentage = Math.min(
      Math.max(newValue, MIN_PERCENTAGE),
      MAX_PERCENTAGE
    );
    setPercentage(newPercentage);
  };

  const handleWeightInputChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const newValue = Number(target.value);
    if (isNaN(newValue)) return;
    const newWeight = Math.min(Math.max(newValue, barWeight()), MAX_WEIGHT);
    setWeight(newWeight);
  };

  const handlePlateCheckbox = (index: number) => {
    const updatedSelectedPlates = selectedPlates().map(
      ({ enabled, weight }, i) => ({
        enabled: index === i ? !enabled : enabled,
        weight,
      })
    );
    setSelectedPlates(updatedSelectedPlates);
  };

  const incrementPercentage = () => {
    setPercentage((prev) => Math.min(prev + PERCENTAGE_STEP, MAX_PERCENTAGE));
  };

  const decrementPercentage = () => {
    setPercentage((prev) => Math.max(prev - PERCENTAGE_STEP, MIN_PERCENTAGE));
  };

  return (
    <div class="container mx-auto w-full sm:max-w-2xl min-h-screen">
      <div class="mx-4 pt-8 flex flex-col gap-7">
        <h1 class="text-3xl mb-5">Barbell load calculator</h1>

        <PlateSelector
          selectedPlates={selectedPlates}
          onPlateToggle={handlePlateCheckbox}
        />

        <BarWeightSelector
          barWeight={barWeight}
          onBarWeightChange={setBarWeight}
        />

        <WeightControls
          weight={weight}
          percentage={percentage}
          barWeight={barWeight}
          onWeightChange={handleWeightInputChange}
          onPercentageChange={handlePercentageInputChange}
          onPercentageIncrement={incrementPercentage}
          onPercentageDecrement={decrementPercentage}
          increaseButtonDisabled={increaseButtonDisabled}
          decrementButtonDisabled={decrementButtonDisabled}
        />

        <PlateResults percentageWeight={percentageWeight} plates={plates} />
      </div>
    </div>
  );
};

export default App;

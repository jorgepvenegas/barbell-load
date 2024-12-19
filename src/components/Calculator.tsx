import { createEffect, createSignal, type Component } from "solid-js";
import { availablePlates, BarWeight } from "../utils/calculators";
import { useWeightCalculator } from "../hooks/useWeightCalculator";
import {
  MAX_PERCENTAGE,
  MAX_WEIGHT,
  MIN_PERCENTAGE,
  PERCENTAGE_STEP,
  STORAGE_KEY,
} from "../utils/constants";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { PlateSelector } from "./PlateSelector";
import { BarWeightSelector } from "./BarWeightSelector";
import { WeightControls } from "./WeightControls";
import { PlateResults } from "./PlateResults";
import Navbar from "./Navbar";

const Calculator: Component = () => {
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
      <div class="mx-4 pt-4 flex flex-col gap-7">
        <Navbar />
        <h1 class="text-3xl mb-5">Barbell Load Calculator</h1>
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

export default Calculator;

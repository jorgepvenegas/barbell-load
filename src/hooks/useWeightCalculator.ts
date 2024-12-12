import { createSignal, createEffect } from "solid-js";
import {
  availablePlates,
  BarWeight,
  PlatePair,
  calculatePlates,
} from "../utils/calculators";

export const useWeightCalculator = (
  weight: () => number,
  percentage: () => number,
  barWeight: () => BarWeight,
  selectedPlates: () => typeof availablePlates
) => {
  const [percentageWeight, setPercentageWeight] = createSignal(weight());
  const [plates, setPlates] = createSignal<Array<PlatePair>>();

  createEffect(() => {
    const targetWeight = weight() * (percentage() / 100);
    const calculatedPlates = calculatePlates({
      targetWeight,
      barWeight: barWeight(),
      selectedPlates: selectedPlates(),
    });

    setPercentageWeight(targetWeight);
    setPlates(calculatedPlates);
  });

  return { percentageWeight, plates };
};